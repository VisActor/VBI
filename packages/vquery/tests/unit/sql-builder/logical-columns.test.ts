import { compileQuery, VQuery, type DatasetColumn, type VQueryDSL, type DateAggregateFunction } from '@visactor/vquery'

it('keeps logical column names intact in projection, filtering, grouping, statistics and ordering', async () => {
  const columns: DatasetColumn[] = [
    { name: 'g.name', type: 'string' },
    { name: 'sales.amount', type: 'number' },
  ]
  const queries: VQueryDSL[] = [
    {
      select: ['g.name', { field: 'sales.amount', alias: 'sales.total', aggr: { func: 'sum' } }],
      groupBy: ['g.name'],
      where: { op: 'and', conditions: [{ field: 'sales.amount', op: '>=', value: 1 }] },
      having: { op: 'and', conditions: [{ field: 'sales.amount', aggr: { func: 'sum' }, op: '>', value: 1 }] },
      orderBy: [{ field: 'sales.total', order: 'desc' }],
    },
    {
      select: ['g.name', { field: 'sales.amount', alias: 'sales.median', aggr: { func: 'median' } }],
      groupBy: ['g.name'],
      orderBy: [{ field: 'sales.median' }],
    },
    {
      select: [
        'g.name',
        {
          field: 'sales.amount',
          alias: 'qualified.amount',
          when: { op: 'and', conditions: [{ field: 'sales.amount', op: '>', value: 2 }] },
        },
      ],
      orderBy: [{ field: 'qualified.amount' }, { field: 'g.name' }],
    },
    { select: [{ field: '*', aggr: { func: 'count' } }], orderBy: [{ field: 'count' }] },
  ]
  for (const query of queries) {
    const sql = compileQuery(query, { table: { database: 'data', name: 'sales' }, columns, dialect: 'mysql' }).sql
    expect(sql).toContain('`data`.`sales`')
    expect(sql).not.toContain('`sales`.`amount`')
    expect(sql).not.toContain('`g`.`name`')
  }
  const engine = new VQuery()
  await engine.createDataset('logical', columns, {
    type: 'json',
    rawDataset: [
      { 'g.name': 'A', 'sales.amount': 1 },
      { 'g.name': 'A', 'sales.amount': 3 },
      { 'g.name': 'B', 'sales.amount': null },
    ],
  })
  const dataset = await engine.connectDataset('logical')
  try {
    expect((await dataset.query(queries[0])).dataset).toEqual([{ 'g.name': 'A', 'sales.total': 4 }])
    expect((await dataset.query(queries[1])).dataset).toEqual([
      { 'g.name': 'A', 'sales.median': 2 },
      { 'g.name': 'B', 'sales.median': null },
    ])
    expect((await dataset.query(queries[3])).dataset).toEqual([{ count: 3 }])
  } finally {
    await dataset.disconnect()
    await engine.close()
  }
})

it('uses the projected value for MySQL NULL sorting when an output alias shadows a source column', () => {
  const query: VQueryDSL = {
    select: ['region', { field: 'sales', alias: 'sales', aggr: { func: 'sum' } }],
    groupBy: ['region'],
    orderBy: [{ field: 'sales' }],
  }
  expect(compileQuery(query, { table: 'data' }).sql).toContain('order by sum(`sales`) is null asc, `sales` asc')
  const calculated: VQueryDSL = { select: [{ expr: 'x/NULLIF(y,0)', alias: 'x' }], orderBy: [{ field: 'x' }] }
  expect(compileQuery(calculated, { table: 'data' }).sql).toContain('nullif(')
  expect(compileQuery(calculated, { table: 'data' }).sql).not.toContain('order by `x` is null')
})

it.each<DateAggregateFunction>([
  'to_year',
  'to_quarter',
  'to_month',
  'to_week',
  'to_day',
  'to_hour',
  'to_minute',
  'to_second',
])('keeps the grouped date alias in NULL sorting for %s', (func) => {
  const query: VQueryDSL = {
    select: [
      { field: 'date', alias: 'bucket', aggr: { func } },
      { field: '*', aggr: { func: 'count' } },
    ],
    groupBy: ['bucket'],
    orderBy: [{ field: 'bucket' }],
  }
  expect(compileQuery(query, { table: 'data' }).sql).toContain('order by `bucket` is null asc, `bucket` asc')
})
