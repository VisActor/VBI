import { compileQuery, convertDSLToMysql, convertDSLToDuckDB } from '@visactor/vquery'
import type { VQueryDSL, DatasetColumn } from '@visactor/vquery'

const columns: DatasetColumn[] = [
  { name: 'category', type: 'string' },
  { name: 'value', type: 'number' },
  { name: 'date', type: 'datetime' },
]
const compile = (dsl: unknown, dialect: 'mysql' | 'duckdb' = 'mysql', schema = columns) =>
  compileQuery(dsl as VQueryDSL, { table: 'orders', dialect, columns: schema })

it('normalizes source text collations without coercing numeric or temporal columns', () => {
  const dsl = {
    select: ['category', { field: 'value', alias: 'total', aggr: { func: 'sum' } }],
    groupBy: ['category'],
    orderBy: [{ field: 'total', order: 'desc' }],
  }
  expect(compile(dsl).sql).toContain('convert(`category` using utf8mb4) collate utf8mb4_0900_bin as `category`')
  expect(compile(dsl).sql).toContain('`value` as `value`')
  expect(compile(dsl, 'duckdb').sql).toContain('"category" collate "binary" as "category"')
  expect(convertDSLToMysql(dsl as VQueryDSL, 'orders', { columns })).toContain('utf8mb4_0900_bin')
  expect(convertDSLToDuckDB(dsl as VQueryDSL, 'orders', { columns })).toContain('collate "binary"')
})

it('ranks each statistical field within its logical groups and preserves WHERE/HAVING/limit', () => {
  const dsl = {
    select: [
      'category',
      { field: 'value', alias: 'median', aggr: { func: 'median' } },
      { field: 'value', alias: 'q', aggr: { func: 'quantile', quantile: -0.5 } },
      { field: 'value', alias: 'sum', aggr: { func: 'sum' } },
    ],
    where: { op: 'and', conditions: [{ field: 'value', op: '>=', value: 1 }] },
    groupBy: ['category'],
    having: { op: 'and', conditions: [{ field: 'value', aggr: { func: 'quantile' }, op: '>', value: 2 }] },
    orderBy: [{ field: 'median', order: 'desc' }],
    limit: 2,
  }
  const result = compile(dsl)
  expect(result.sql).toContain('row_number() over (partition by `category` order by `value` is null, `value`)')
  expect(result.sql.match(/row_number\(\)/g)).toHaveLength(1)
  expect(result.sql).toContain('avg(case when')
  expect(result.sql).toContain('max(case when')
  expect(result.sql).toContain('having (max(case when')
  expect(result.sql).toContain('limit 2')
  expect(result.parameters).toEqual([0.5, 1, 0.5, 2])
})

it('handles unprojected grouping/sort keys and nested HAVING-only statistics', () => {
  const result = compile({
    select: [{ field: 'value', alias: 'result', aggr: { func: 'median' } }],
    groupBy: ['category'],
    orderBy: [{ field: 'category' }],
    having: {
      op: 'or',
      conditions: [{ op: 'and', conditions: [{ field: 'value', aggr: { func: 'median' }, op: '>', value: 1 }] }],
    },
  })
  expect(result.sql).toContain('partition by `category`')
  expect(result.sql).toContain('having ((avg(case when')
  const date = compile({
    select: [
      { field: 'date', alias: 'day', aggr: { func: 'to_day' } },
      { field: 'value', aggr: { func: 'median' } },
    ],
    groupBy: ['day'],
  })
  expect(date.sql).toContain('partition by date_format(`date`, ?)')
  const collision = compile({
    select: [
      { field: 'value', alias: 'category', aggr: { func: 'sum' } },
      { field: 'value', aggr: { func: 'median' } },
    ],
    groupBy: ['category'],
  })
  expect(collision.sql).toContain('partition by `category`')
  expect(() =>
    compile({ select: [{ field: 'value', alias: 'median', aggr: { func: 'median' } }], groupBy: ['median'] }),
  ).toThrow('Statistical aggregates cannot be used as grouping keys')
})

it('avoids internal name collisions and supports every quantile direction/boundary', () => {
  for (const quantile of [-1, -0.5, 0, 0.5, 1]) {
    const result = compile({
      select: [{ field: 'value', alias: '__vquery_stat_0', aggr: { func: 'quantile', quantile } }],
    })
    expect(result.sql).toContain('as `__vquery_stat_1`')
    expect(result.parameters).toEqual([Math.abs(quantile)])
  }
  expect(compile({ select: [{ field: 'value', aggr: { func: 'quantile' } }] }).parameters).toEqual([0.5])
})

it('validates portable numeric aggregate types identically for both engines', () => {
  for (const dialect of ['mysql', 'duckdb'] as const) {
    for (const func of ['sum', 'avg', 'variance', 'variance_pop', 'stddev', 'median', 'quantile']) {
      expect(() => compile({ select: [{ field: 'category', aggr: { func } }] }, dialect)).toThrow(
        'requires a number column',
      )
      expect(() =>
        compile({ select: ['category'], having: { field: 'category', aggr: { func }, op: '>', value: 1 } }, dialect),
      ).toThrow('requires a number column')
    }
    expect(() => compile({ select: ['value'], orderBy: [{ field: 'value', nulls: 'random' }] }, dialect)).toThrow(
      'Invalid orderBy',
    )
    for (const order of ['asc', 'desc'])
      for (const nulls of ['first', 'last']) {
        const result = compile({ select: ['value'], orderBy: [{ field: 'value', order, nulls }] }, dialect)
        expect(result.sql).toContain(
          dialect === 'mysql' ? `is null ${nulls === 'last' ? 'asc' : 'desc'}` : `nulls ${nulls}`,
        )
      }
  }
})

it('quotes exact string values and fixes LIKE escape semantics in both dialects', () => {
  for (const dialect of ['mysql', 'duckdb'] as const) {
    for (const op of ['like', 'not like', 'ilike', 'not ilike']) {
      const result = compile({ select: ['category'], where: { field: 'category', op, value: 'a\\_b' } }, dialect)
      expect(result.sql).toContain("escape ''")
      expect(result.parameters).toEqual(['a\\_b'])
      for (const value of [1, false])
        expect(() => compile({ select: ['category'], where: { field: 'category', op, value } }, dialect)).toThrow(
          'LIKE requires a string pattern',
        )
    }
    expect(
      compile({ select: ['category'], where: { field: 'category', op: 'like', value: null } }, dialect).parameters,
    ).toEqual([null])
    expect(() => compile({ select: ['value'], where: { field: 'value', op: 'like', value: '%' } }, dialect)).toThrow(
      'LIKE requires a string column',
    )
    const date = new Date('2026-10-13T01:02:03.004Z')
    expect(compile({ select: ['date'], where: { field: 'date', op: '=', value: date } }, dialect).parameters).toEqual([
      '2026-10-13 01:02:03.004',
    ])
  }
  expect(compile({ select: [{ field: 'value', aggr: { func: 'count' } }] }, 'duckdb').sql).not.toContain('AS INTEGER')
})

it('rejects mixed comparison types before native implicit conversions diverge', () => {
  for (const dialect of ['mysql', 'duckdb'] as const) {
    for (const [field, value] of [
      ['value', '2'],
      ['category', 2],
      ['date', 2],
    ]) {
      expect(() => compile({ select: [field], where: { field, op: '=', value } }, dialect)).toThrow(
        'Filter value does not match',
      )
    }
    expect(
      compile({ select: ['value'], where: { field: 'value', op: 'in', value: [1, null] } }, dialect).parameters,
    ).toEqual([1, null])
    expect(
      compile(
        { select: ['category'], having: { field: 'category', aggr: { func: 'count' }, op: '>', value: 1 } },
        dialect,
      ).parameters,
    ).toEqual([1])
    expect(
      compile(
        { select: ['category'], having: { field: 'category', aggr: { func: 'min' }, op: '=', value: 'A' } },
        dialect,
      ).parameters,
    ).toEqual(['A'])
    expect(
      compile({ select: ['category'], having: { field: 'category', aggr: { func: 'max' }, op: 'is null' } }, dialect)
        .parameters,
    ).toEqual([])
    expect(
      compile({ select: ['date'], where: { field: 'date', op: '>=', value: '2026-01-01' } }, dialect).parameters,
    ).toEqual(['2026-01-01'])
    expect(compile({ select: ['date'], where: { field: 'date', op: 'is null' } }, dialect).parameters).toEqual([])
  }
})
