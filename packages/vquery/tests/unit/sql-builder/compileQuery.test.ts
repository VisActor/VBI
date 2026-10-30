import { compileQuery, convertDSLToMysql, convertDSLToDuckDB, VQuery } from '@visactor/vquery'
import type { VQueryDSL } from '@visactor/vquery'

const invalid: unknown[] = [
  null,
  [],
  {},
  { select: 'id' },
  { select: [''] },
  { select: [null] },
  { select: [{ field: '' }] },
  { select: [{ field: 'id', alias: 1 }] },
  { select: ['id'], sql: 'DROP TABLE orders' },
  ...[
    null,
    { func: 'sleep' },
    { func: 'sum', evil: true },
    { func: 'sum', quantile: 0.5 },
    { func: 'quantile', quantile: '0.5' },
    { func: 'quantile', quantile: Infinity },
    { func: 'quantile', quantile: -2 },
    { func: 'quantile', quantile: 2 },
  ].map((aggr) => ({ select: [{ field: 'id', aggr }] })),
  ...[
    null,
    { op: 'xor', conditions: [] },
    { op: 'and', conditions: {} },
    { field: '' },
    { field: 'id', op: 1 },
    { field: 'id', op: 'sleep' },
    { field: 'id', op: '=', value: {} },
    { field: 'id', op: '=', value: Infinity },
    { field: 'id', op: 'in', value: [] },
    { field: 'id', op: 'in', value: [1, {}] },
    { field: 'id', op: 'in', value: {} },
    { field: 'id', op: 'between', value: 1 },
    { field: 'id', op: 'between', value: [1] },
    { field: 'id', op: 'between', value: [1, {}] },
  ].map((where) => ({ select: ['id'], where })),
  ...[null, { field: 'id', op: '=', value: 1 }, { field: 'id', op: '=', value: 1, aggr: { func: 'to_year' } }].map(
    (having) => ({ select: ['id'], having }),
  ),
  ...['id', [null], ['']].map((groupBy) => ({ select: ['id'], groupBy })),
  ...['id', [null], [{ field: '' }], [{ field: 'id', order: 'evil' }]].map((orderBy) => ({
    select: ['id'],
    orderBy,
  })),
  ...[-1, 1.5, Infinity, '1;DROP'].map((limit) => ({ select: ['id'], limit })),
]

const compile = (dsl: unknown, dialect: 'mysql' | 'duckdb' = 'mysql') =>
  compileQuery(dsl as VQueryDSL, { table: 'orders', dialect })

it('defaults to parameterized MySQL, quotes qualified tables, and preserves parameter order', () => {
  const dsl: VQueryDSL = {
    select: [{ field: 'sales', alias: 'total', aggr: { func: 'sum' } }],
    where: { op: 'and', conditions: [{ field: 'province', op: '=', value: "x\\' OR 1=1; -- ? $1" }] },
    groupBy: ['province'],
    having: { op: 'and', conditions: [{ field: 'sales', aggr: { func: 'sum' }, op: '>', value: 10 }] },
    orderBy: [{ field: 'total', order: 'desc' }],
    limit: 8,
  }
  const result = compileQuery(dsl, { table: { database: 'local_data', name: 'supermarket' } })
  expect(result.sql).toBe(
    'select sum(`sales`) as `total` from `local_data`.`supermarket` where (`province` = convert(? using utf8mb4) collate utf8mb4_0900_bin) group by `province` having (sum(`sales`) > ?) order by sum(`sales`) is null asc, `total` desc limit 8',
  )
  expect(result.parameters).toEqual(["x\\' OR 1=1; -- ? $1", 10])
  expect(result.sql).not.toContain('OR 1=1')
  expect(compile({ select: ['id'], limit: 0 })).toEqual({ sql: 'select `id` from `orders` limit 0', parameters: [] })
  expect(() => compileQuery(dsl, { table: 'orders', dialect: 'postgres' as never })).toThrow(
    'Unsupported query dialect',
  )
})

it('uses distinct date/aggregate expressions for each backend in SELECT and HAVING', () => {
  for (const func of ['to_year', 'to_quarter', 'to_month', 'to_week', 'to_day', 'to_hour', 'to_minute', 'to_second']) {
    const dsl = { select: [{ field: 'date', alias: 'bucket', aggr: { func } }], groupBy: ['bucket'] }
    expect(compile(dsl).sql).toContain(func === 'to_quarter' ? 'quarter(' : 'date_format(')
    expect(compile(dsl, 'duckdb').sql).toContain(func === 'to_quarter' ? 'date_part(' : 'strftime(')
  }
  expect(compile({ select: [{ field: 'date', aggr: { func: 'to_minute' } }] }).parameters).toEqual(['%Y-%m-%d %H:%i'])
  for (const func of ['count', 'count_distinct', 'variance', 'variance_pop', 'stddev', 'sum', 'avg', 'min', 'max']) {
    const dsl = {
      select: [{ field: 'sales', aggr: { func } }],
      having: { field: 'sales', aggr: { func }, op: '>', value: 1 },
    }
    const mysql = compile(dsl)
    expect(mysql.sql).not.toContain('AS INTEGER')
    expect(mysql.parameters).toEqual([1])
    expect(compile(dsl, 'duckdb').parameters).toEqual([1])
  }
  expect(compile({ select: [{ field: 'sales', aggr: { func: 'stddev' } }] }).sql).toContain('stddev_samp(')
  for (const func of ['median', 'quantile']) {
    expect(compile({ select: [{ field: 'sales', aggr: { func } }] }).sql).toContain('row_number() over')
    expect(compile({ select: [{ field: 'sales', aggr: { func } }] }, 'duckdb').sql).toContain(`${func}(`)
    expect(compile({ select: ['sales'], having: { field: 'sales', aggr: { func }, op: '>', value: 1 } }).sql).toContain(
      'row_number() over',
    )
  }
  expect(
    compile({ select: [{ field: 'sales', aggr: { func: 'quantile', quantile: 0.9 } }] }, 'duckdb').parameters,
  ).toEqual([0.9])
})

it('adapts insensitive matches and empty boolean groups to both dialects', () => {
  for (const dialect of ['mysql', 'duckdb'] as const) {
    for (const op of ['ilike', 'not ilike']) {
      const result = compile({ select: ['name'], where: { field: 'name', op, value: 'Ab%' } }, dialect)
      expect(result.sql).toContain(dialect === 'mysql' ? 'lower(convert(' : op)
      expect(result.parameters).toEqual(['Ab%'])
    }
    for (const clause of ['where', 'having']) {
      for (const op of ['and', 'or']) {
        expect(compile({ select: ['id'], [clause]: { op, conditions: [] } }, dialect).sql).toContain(
          op === 'and' ? '1=1' : '0=1',
        )
      }
    }
  }
})

it('renders explicit dialect SQL without replacing placeholders inside identifiers or bound values', () => {
  const dsl: VQueryDSL = {
    select: [{ field: 'name', alias: '? $1' }],
    where: {
      op: 'and',
      conditions: [
        { field: 'name', op: '=', value: "O'Reilly ? $1\\path" },
        { field: 'active', op: '=', value: true },
      ],
    },
    limit: 2,
  }
  expect(convertDSLToMysql(dsl, 'orders')).toBe(
    'select `name` as `? $1` from `orders` where (`name` = convert(convert(0x4f275265696c6c79203f2024315c70617468 using utf8mb4) using utf8mb4) collate utf8mb4_0900_bin and `active` = TRUE) limit 2',
  )
  expect(convertDSLToDuckDB(dsl, 'orders')).toBe(
    'select "name" as "? $1" from "orders" where ("name" = \'O\'\'Reilly ? $1\\path\' and "active" = TRUE) limit 2',
  )
})

it('rejects malformed JSON before producing SQL', () => {
  for (const dsl of invalid) expect(() => compile(dsl)).toThrow()
  expect(compile({ select: ['id'], where: { field: 'id', op: 'in', value: null } }).parameters).toEqual([null])
  expect(compile({ select: ['id'], where: { field: 'id', op: 'in', value: true } }).parameters).toEqual([true])
})

it('retains DuckDB date, median and quantile behavior for in-memory datasets', async () => {
  const vquery = new VQuery()
  await vquery.createDataset(
    'orders',
    [
      { name: 'date', type: 'string' },
      { name: 'sales', type: 'number' },
    ],
    {
      type: 'json',
      rawDataset: [
        { date: '2026-10-13 12:34:56', sales: 3 },
        { date: '2026-10-13 15:00:00', sales: 9 },
      ],
    },
  )
  const dataset = await vquery.connectDataset('orders')
  const result = await dataset.query({
    select: [
      { field: 'date', alias: 'day', aggr: { func: 'to_day' } },
      { field: 'sales', alias: 'median', aggr: { func: 'median' } },
      { field: 'sales', alias: 'quantile', aggr: { func: 'quantile' } },
    ],
    groupBy: ['day'],
  })
  expect(result.dataset).toEqual([{ day: '2026-10-13', median: 6, quantile: 3 }])
  await vquery.close()
})

it('preserves VBI comparison aliases and HAVING lists', () => {
  for (const op of ['gt', 'gte', 'lt', 'lte', 'eq', 'neq']) {
    expect(
      compile({
        select: ['sales'],
        where: { field: 'sales', op, value: 1 },
        having: { field: 'sales', aggr: { func: 'sum' }, op, value: 2 },
      }).parameters,
    ).toEqual([1, 2])
  }
  for (const op of ['in', 'not in']) {
    expect(
      compile({ select: ['sales'], having: { field: 'sales', aggr: { func: 'sum' }, op, value: [1, 2] } }).parameters,
    ).toEqual([1, 2])
  }
  expect(() =>
    compile({ select: ['id'], having: { field: 'id', aggr: { func: 'count' }, op: 'ilike', value: '%' } }),
  ).toThrow('Unsupported filter operator')
})
