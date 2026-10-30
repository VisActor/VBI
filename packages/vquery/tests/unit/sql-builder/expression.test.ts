import {
  compileQuery,
  getQuerySchema,
  validateQuery,
  VQuery,
  type DatasetColumn,
  type VQueryDSL,
} from '@visactor/vquery'
import { executeSQL } from '../../../src/adapters/query/in-memory/execute'
import { parseSQL } from '../../../src/sql/parser'
import { parseSQLExpression } from '../../../src/sql/parser'
import { buildNumericExpression } from '../../../src/sql/compiler/expression'
import { mysqlStrategy } from '../../../src/sql/compiler/dialect/mysql'

const columns: DatasetColumn[] = [
  { name: 'x', type: 'number' },
  { name: 'y', type: 'number' },
  { name: 'label', type: 'string' },
]
const projection = (expr: string, parameters?: (number | null)[]): VQueryDSL => ({
  select: [{ expr, alias: 'result', parameters }],
})

it('compiles portable numeric ASTs with parameter binding and dialect identifier quoting', () => {
  for (const dialect of ['mysql', 'duckdb'] as const) {
    const query = projection('-(x-y) + ABS(?) * COALESCE(y, 1) / NULLIF(x, 0)', [-2])
    const compiled = compileQuery(query, { table: 'data', columns, dialect })
    expect(compiled.parameters).toEqual([-2, 1, 0])
    expect(compiled.sql).toContain('nullif(')
    expect(compiled.sql).toContain('cast(')
    expect(compiled.sql).toContain(dialect === 'mysql' ? '`x`' : '"x"')
    expect(getQuerySchema(query, columns)).toEqual([{ name: 'result', type: 'number' }])
    const quoted = compileQuery(projection('"a""b" + "?" + "select"'), { table: 'data', dialect })
    expect(quoted.parameters).toEqual([])
    expect(quoted.sql).toContain(dialect === 'mysql' ? '`a"b`' : '"a""b"')
    const ordered: VQueryDSL = {
      ...projection('x+?', [2]),
      where: { field: 'x', op: '>', value: 1 },
      orderBy: [{ field: 'result' }],
    }
    expect(compileQuery(ordered, { table: 'data', columns, dialect }).parameters).toEqual(
      dialect === 'mysql' ? [2, 1, 2] : [2, 1],
    )
  }
})

it('evaluates precedence, unary signs, NULL and zero denominators through dataset SQL', async () => {
  const engine = new VQuery()
  await engine.createDataset('expressions', columns, {
    type: 'json',
    rawDataset: [
      { x: 8, y: 2 },
      { x: 3, y: 0 },
      { x: null, y: -2 },
      { x: 0, y: null },
    ],
  })
  const dataset = await engine.connectDataset('expressions')
  try {
    const result = await dataset.query({
      select: [
        { expr: '1+2*3-8/4', alias: 'precedence' },
        { expr: '-(-x) + +y', alias: 'signs' },
        { expr: 'x/y', alias: 'ratio' },
        { expr: 'ABS(y)', alias: 'absolute' },
        { expr: 'COALESCE(x, 0) - COALESCE(y, ?)', parameters: [null], alias: 'difference' },
        { expr: 'NULLIF(x, y)', alias: 'distinct' },
        { expr: '.5+1e-2+2E+1', alias: 'scientific' },
      ],
    })
    expect(result.dataset).toEqual([
      { precedence: 5, signs: 10, ratio: 4, absolute: 2, difference: 6, distinct: 8, scientific: 20.51 },
      { precedence: 5, signs: 3, ratio: null, absolute: 0, difference: 3, distinct: 3, scientific: 20.51 },
      { precedence: 5, signs: null, ratio: null, absolute: 2, difference: 2, distinct: null, scientific: 20.51 },
      { precedence: 5, signs: null, ratio: null, absolute: null, difference: null, distinct: 0, scientific: 20.51 },
    ])
    expect((await dataset.query(projection('NULLIF(x,x)'))).dataset).toEqual(
      Array.from({ length: 4 }, () => ({ result: null })),
    )
    const inner: VQueryDSL = {
      select: [
        { field: 'x', alias: 'total', aggr: { func: 'sum' } },
        { field: 'y', alias: 'base', aggr: { func: 'sum' } },
      ],
    }
    const calculated: VQueryDSL = { from: inner, select: [{ expr: '(total-base)/NULLIF(base,0)', alias: 'growth' }] }
    const filtered: VQueryDSL = {
      from: calculated,
      select: ['growth'],
      where: { op: 'and', conditions: [{ field: 'growth', op: 'is null' }] },
    }
    expect((await dataset.query(filtered)).dataset).toEqual([{ growth: null }])
    expect(
      (await dataset.query({ from: projection('x*y'), select: [{ field: 'result', aggr: { func: 'sum' } }] })).dataset,
    ).toEqual([{ result: 16 }])
    expect(
      (
        await dataset.query({
          ...projection('x+1'),
          where: { op: 'and', conditions: [{ field: 'x', op: '>', value: 100 }] },
        })
      ).dataset,
    ).toEqual([])
  } finally {
    await dataset.disconnect()
    await engine.close()
  }
})

it('rejects unsupported SQL syntax, invalid types and incomplete parameter binding before compilation', () => {
  const invalid = [
    '',
    '.',
    ' ',
    'x;',
    'x;select 1',
    'x AS alias',
    'x,y',
    'x +',
    '(x',
    '"x',
    '""',
    'x.y',
    'CAST(x AS DOUBLE)',
    'x::DOUBLE',
    'x COLLATE binary',
    'SUM(x)',
    'ABS()',
    'ABS(x,y)',
    'ABS(DISTINCT x)',
    'COALESCE(x)',
    'NULLIF(x,y,1)',
    'RANDOM()',
    'CASE WHEN x>0 THEN x END',
    '*',
    "'1'",
    'TRUE',
    '1e999',
    'x || y',
    '(SELECT x)',
    'x/*c*/',
    'x @ y',
  ]
  for (const expr of invalid) expect(() => compileQuery(projection(expr), { table: 'data', columns })).toThrow()
  for (const parameters of [null, {}, [Infinity], ['1'], [true]])
    expect(() => validateQuery({ select: [{ expr: '?', alias: 'result', parameters }] })).toThrow(
      'Expression parameters',
    )
  expect(() => compileQuery(projection('?'), { table: 'data' })).toThrow('Missing expression parameter')
  expect(() => compileQuery(projection('1', [2]), { table: 'data' })).toThrow('Unused expression parameters')
  expect(() => compileQuery(projection('label+1'), { table: 'data', columns })).toThrow('number column: label')
  expect(() => compileQuery(projection('unknown+1'), { table: 'data', columns })).toThrow('number column: unknown')
  expect(() => validateQuery({ select: [{ expr: 'x' }] })).toThrow('Invalid expression select item')
  for (const extra of [{ field: 'x' }, { aggr: { func: 'sum' } }, { when: { op: 'and', conditions: [] } }])
    expect(() => validateQuery({ select: [{ expr: 'x', alias: 'result', ...extra }] })).toThrow(
      'Invalid expression select item',
    )
  for (const extra of [
    { groupBy: ['x'] },
    { having: { op: 'and', conditions: [] } },
    {
      select: [
        { expr: 'x', alias: 'result' },
        { field: 'x', aggr: { func: 'sum' } },
      ],
    },
  ])
    expect(() => validateQuery({ ...projection('x'), ...extra })).toThrow('Use FROM')
  expect(() => validateQuery({ select: [{ expr: 2, alias: 'result' }] })).toThrow('Expected numeric expression')
  expect(() => validateQuery({ select: [{ field: 'x', parameters: [1] }] })).toThrow('Parameters require an expression')
  expect(() => parseSQLExpression('?')).toThrow('Missing expression parameter')
  expect(() => buildNumericExpression({ type: 'star' }, mysqlStrategy)).toThrow('Unsupported numeric expression')
})

it('retains a quoted input alias containing a dot as one identifier', async () => {
  const query: VQueryDSL = {
    from: { select: [{ field: 'x', alias: 'a.b' }] },
    select: [{ expr: '"a.b"+1', alias: 'result' }],
  }
  for (const dialect of ['mysql', 'duckdb'] as const)
    expect(compileQuery(query, { table: 'data', columns, dialect }).sql).toContain(
      dialect === 'mysql' ? '`a.b`' : '"a.b"',
    )
  expect(executeSQL(parseSQL('select "a.b"+1 as result from data'), [{ 'a.b': 2 }])).toEqual([{ result: 3 }])
})

it('uses the shared parser for arithmetic around aggregate calls and predicate comparisons', () => {
  const run = (sql: string, rows: Record<string, unknown>[] = [{ x: 2 }, { x: 4 }]) => executeSQL(parseSQL(sql), rows)
  expect(run('select SUM(x)+1 as n, -SUM(x) as m from data')).toEqual([{ n: 7, m: -6 }])
  expect(run('select 1+SUM(x) as n from data')).toEqual([{ n: 7 }])
  expect(run('select -SUM(x) as n from data')).toEqual([{ n: -6 }])
  expect(run('select x as n from data where (x+1) > 3')).toEqual([{ n: 4 }])
  expect(run('select x+1 as n from data where x*2 > 4')).toEqual([{ n: 5 }])
  expect(run('select x / 0 as n from data')).toEqual([{ n: null }, { n: null }])
  expect(() => run('select ? as n')).toThrow('Missing expression parameter')
})

it('normalizes expression operands to DOUBLE and reports numeric overflow', () => {
  for (const dialect of ['mysql', 'duckdb'] as const) {
    const sql = compileQuery(projection('0-x+0.1'), { table: 'data', columns, dialect }).sql
    expect(sql).toContain('cast(')
    expect(sql).toContain('as double)')
  }
  const run = (expr: string) => executeSQL(parseSQL(`select ${expr} as result`), [{}])
  expect(run('1/NULLIF((0.1+0.2)-0.3,0)')).toEqual([{ result: 18014398509481984 }])
  expect(run('(9007199254740992+1)-9007199254740992')).toEqual([{ result: 0 }])
  expect(() => run('1e308*2')).toThrow('out of range')
})

it('keeps structural validation usable when subquery output types are only partially known', () => {
  const query: VQueryDSL = {
    from: { select: ['bucket', { field: 'x', alias: 'total', aggr: { func: 'sum' } }], groupBy: ['bucket'] },
    select: [{ expr: 'bucket+total', alias: 'value' }],
  }
  expect(() => compileQuery(query, { table: 'data' })).not.toThrow()
  expect(() =>
    compileQuery(query, { table: 'data', columns: [...columns, { name: 'bucket', type: 'number' }] }),
  ).not.toThrow()
  expect(() =>
    compileQuery(query, { table: 'data', columns: [...columns, { name: 'bucket', type: 'string' }] }),
  ).toThrow('number column: bucket')
  const text: VQueryDSL = {
    from: { select: [{ field: 'date', alias: 'year', aggr: { func: 'to_year' } }] },
    select: [{ expr: 'year+1', alias: 'value' }],
  }
  expect(() => compileQuery(text, { table: 'data' })).toThrow('number column: year')
  const aggregate: VQueryDSL = {
    from: { from: query.from, select: ['bucket', { expr: 'total+1', alias: 'value' }] },
    select: [{ field: 'bucket', aggr: { func: 'sum' } }],
  }
  expect(() => compileQuery(aggregate, { table: 'data' })).not.toThrow()
  expect(() =>
    compileQuery(aggregate, { table: 'data', columns: [...columns, { name: 'bucket', type: 'string' }] }),
  ).toThrow('number column: bucket')
})
