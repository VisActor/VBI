import * as Y from 'yjs'
import { rs } from '@rstest/core'
import { createQuery, createEmptyQuery, createVBI, type VBIQueryProps, type VBIQueryDSL } from '@visactor/vbi'
import { VQuery, type DatasetColumn } from '@visactor/vquery'

const dispose: Array<() => void | Promise<void>> = []
afterEach(async () => {
  for (const close of dispose.splice(0).reverse()) await close()
})
const dsl = (): VBIQueryDSL => ({
  ...createEmptyQuery('calc'),
  dimensions: [{ id: 'region', field: 'region', alias: '地区' }],
  measures: [
    { id: 'sales', field: 'sales', alias: '销售额', aggregate: { func: 'sum' } },
    { id: 'profit', field: 'profit', alias: '利润', aggregate: { func: 'sum' } },
  ],
})
const create = (value = dsl()) => {
  const builder = createQuery(value)
  dispose.push(() => builder.doc.destroy())
  return builder
}
const setup = async () => {
  const engine = new VQuery()
  const schema: DatasetColumn[] = [
    { name: 'region', type: 'string' },
    { name: 'sales', type: 'number' },
    { name: 'profit', type: 'number' },
  ]
  await engine.createDataset('calc', schema, {
    type: 'json',
    rawDataset: [
      { region: 'A', sales: 100, profit: 10 },
      { region: 'A', sales: 100, profit: 30 },
      { region: 'B', sales: 50, profit: 20 },
      { region: 'C', sales: 0, profit: 5 },
    ],
  })
  const dataset = await engine.connectDataset('calc')
  const vbi = createVBI()
  vbi.connectors.register('calc', {
    discoverSchema: async () => schema,
    query: async ({ queryDSL }: VBIQueryProps) => ({ dataset: (await dataset.query(queryDSL)).dataset }),
  })
  dispose.push(
    () => engine.close(),
    () => dataset.disconnect(),
    () => {
      vbi.connectors.unregister('calc')
    },
  )
  return vbi
}

it('owns calculation CRUD in Yjs, restores snapshots and groups edits into undo transactions', () => {
  const builder = create()
  expect(builder.calculations.toJSON()).toEqual([])
  expect(builder.build()).not.toHaveProperty('calculations')
  builder.calculations.remove('missing')
  expect(builder.calculations.find(() => true)).toBeUndefined()
  expect(() => builder.calculations.update('missing', () => {})).toThrow('not found')
  builder.calculations.add('profit/sales', (node) => node.setAlias('利润率').setSort({ order: 'desc' }))
  let node = builder.calculations.findAll()[0]
  expect(node.getExpression()).toBe('profit/sales')
  expect(node.getSort()).toEqual({ order: 'desc' })
  expect(builder.calculations.find((item) => item.getId() === node.getId())?.getId()).toBe(node.getId())
  expect(builder.undoManager.undo()).toBe(true)
  expect(builder.calculations.findAll()).toEqual([])
  expect(builder.undoManager.redo()).toBe(true)
  node = builder.calculations.findAll()[0]
  const peerDoc = new Y.Doc()
  Y.applyUpdate(peerDoc, builder.encodeStateAsUpdate())
  const peer = createQuery(peerDoc)
  dispose.push(() => peerDoc.destroy())
  expect(peer.calculations.toJSON()).toEqual(builder.calculations.toJSON())
  const parameters = [2]
  builder.calculations.update(node.getId(), (item) => item.setExpression('sales * ?', parameters).clearSort())
  parameters[0] = 99
  const snapshot = builder.calculations.toJSON()
  expect(snapshot[0].parameters).toEqual([2])
  snapshot[0].parameters![0] = 55
  expect(node.getSort()).toBeUndefined()
  expect(node.toJSON().parameters).toEqual([2])
  peer.applyUpdate(builder.encodeStateAsUpdate(Y.encodeStateVector(peerDoc)), 'remote')
  expect(peer.calculations.toJSON()).toEqual(builder.calculations.toJSON())
  const restored = create(JSON.parse(JSON.stringify(builder.build())))
  expect(restored.calculations.toJSON()).toEqual(builder.calculations.toJSON())
  expect(restored.undoManager.canUndo()).toBe(false)
  builder.calculations.update(node.getId(), (item) => item.setExpression('sales+1'))
  expect(node.toJSON()).not.toHaveProperty('parameters')
  builder.calculations.remove('unknown').remove(node.getId())
  expect(builder.calculations.toJSON()).toEqual([])
})

it('merges concurrent first additions and keeps remote columns when undoing the local first addition', () => {
  const builder = create()
  const peerDoc = new Y.Doc()
  Y.applyUpdate(peerDoc, builder.encodeStateAsUpdate())
  const peer = createQuery(peerDoc)
  dispose.push(() => peerDoc.destroy())
  builder.calculations.add('sales+1', (node) => node.setAlias('local'))
  peer.calculations.add('profit+1', (node) => node.setAlias('remote'))
  builder.applyUpdate(peer.encodeStateAsUpdate())
  peer.applyUpdate(builder.encodeStateAsUpdate())
  expect(
    builder.calculations
      .toJSON()
      .map((node) => node.alias)
      .sort(),
  ).toEqual(['local', 'remote'])
  expect(peer.calculations.toJSON()).toEqual(builder.calculations.toJSON())
  expect(builder.undoManager.undo()).toBe(true)
  expect(builder.calculations.toJSON().map((node) => node.alias)).toEqual(['remote'])
  peer.applyUpdate(builder.encodeStateAsUpdate())
  expect(peer.calculations.toJSON()).toEqual(builder.calculations.toJSON())
})

it('migrates a legacy document before sharing it and keeps expression edits atomic', () => {
  const original = create()
  original.dsl.delete('calculations')
  const legacy = original.encodeStateAsUpdate()
  const migratedDoc = new Y.Doc()
  Y.applyUpdate(migratedDoc, legacy)
  const migrated = createQuery(migratedDoc)
  dispose.push(() => migratedDoc.destroy())
  expect(migrated.undoManager.canUndo()).toBe(false)
  const undefinedDoc = new Y.Doc()
  Y.applyUpdate(undefinedDoc, migrated.encodeStateAsUpdate())
  undefinedDoc.getMap('dsl').set('calculations', undefined)
  const rebound = createQuery(undefinedDoc)
  dispose.push(() => undefinedDoc.destroy())
  expect(rebound.calculations.toJSON()).toEqual([])
  expect(rebound.undoManager.canUndo()).toBe(false)
  const peerDoc = new Y.Doc()
  Y.applyUpdate(peerDoc, migrated.encodeStateAsUpdate())
  const peer = createQuery(peerDoc)
  dispose.push(() => peerDoc.destroy())
  migrated.calculations.add('sales', (node) => node.setAlias('local'))
  peer.calculations.add('profit', (node) => node.setAlias('remote'))
  migrated.applyUpdate(peer.encodeStateAsUpdate())
  expect(migrated.calculations.findAll()).toHaveLength(2)
  const node = migrated.calculations.find((item) => item.getExpression() === 'sales')!
  migrated.undoManager.clear()
  node.setExpression('sales * ?', [2])
  expect(migrated.undoManager.undo()).toBe(true)
  expect(node.toJSON()).toMatchObject({ expr: 'sales' })
  expect(node.toJSON()).not.toHaveProperty('parameters')
  expect(migrated.undoManager.canUndo()).toBe(false)
})

it('calculates after aggregation, sorts before limit, and exposes calculation outputs to profile and bins', async () => {
  await setup()
  const builder = create({
    ...dsl(),
    calculations: [{ id: 'margin', alias: '利润率', expr: 'profit / NULLIF(sales,0)', sort: { order: 'desc' } }],
    limit: 1,
  })
  const query = builder.buildVQuery()
  expect(query.from?.limit).toBeUndefined()
  expect(query.limit).toBe(1)
  expect(query.orderBy).toEqual([{ field: 'margin', order: 'desc' }])
  expect((await builder.query()).dataset).toEqual([{ region: 'B', sales: 50, profit: 20, margin: 0.4 }])
  const before = builder.build()
  const profile = await builder.queryProfile({ columns: ['margin'] })
  expect(profile.columns.margin).toMatchObject({ type: 'number', validCount: 1, min: 0.4, max: 0.4 })
  expect((await builder.queryBins({ columns: ['margin'] })).columns.margin.bins).toEqual([
    { min: 0.4, max: 0.4, count: 1 },
  ])
  expect(builder.build()).toEqual(before)
  builder.queryMode.setMode('detail')
  expect((await builder.query()).dataset).toEqual([{ region: 'B', sales: 50, profit: 20, margin: 0.4 }])
  builder.calculations.update('margin', (node) => node.setExpression('profit/sales * ?', [2]))
  expect((await builder.query()).dataset[0].margin).toBe(0.8)
  const numericDimension = create({
    ...createEmptyQuery('calc'),
    dimensions: [{ id: 'bucket', field: 'sales', alias: '分组' }],
    measures: [{ id: 'profit', field: 'profit', alias: '利润', aggregate: { func: 'sum' } }],
    calculations: [{ id: 'value', alias: '计算值', expr: 'bucket+profit' }],
  })
  expect((await numericDimension.queryProfile({ columns: ['value'] })).columns.value).toMatchObject({
    validCount: 3,
    min: 5,
    max: 140,
  })
})

it('shares calculation state, query compilation and VSeed measure projection with ChartBuilder', async () => {
  const vbi = await setup()
  const chart = vbi.chart.create({
    ...vbi.chart.createEmpty('calc'),
    chartType: 'table',
    dimensions: dsl().dimensions.map((item) => ({ ...item, encoding: 'column' as const })),
    measures: dsl().measures.map((item) => ({ ...item, encoding: 'column' as const })),
    calculations: [{ id: 'margin', alias: '利润率', expr: 'profit/sales' }],
  })
  dispose.push(() => chart.doc.destroy())
  expect(chart.calculations.toJSON()).toHaveLength(1)
  const result = await chart.query()
  expect(result.dataset).toEqual([
    { region: 'A', sales: 200, profit: 40, margin: 0.2 },
    { region: 'B', sales: 50, profit: 20, margin: 0.4 },
    { region: 'C', sales: 0, profit: 5, margin: null },
  ])
  const seed = await chart.buildVSeed()
  expect(seed.dataset).toEqual(result.dataset)
  expect(seed.measures).toContainEqual({ id: 'margin', alias: '利润率' })
  chart.calculations.add('sales+profit', (node) => node.setAlias('合计'))
  expect(chart.buildVQuery().select).toHaveLength(3)
})

it('rejects duplicate IDs, unsupported references and non-collaborative restored containers', async () => {
  await setup()
  for (const calculations of [
    [{ id: 'sales', alias: '重复', expr: '1' }],
    [
      { id: 'same', alias: 'A', expr: '1' },
      { id: 'same', alias: 'B', expr: '2' },
    ],
  ])
    expect(() => create({ ...dsl(), calculations }).buildVQuery()).toThrow('Duplicate calculation ID')
  const empty = create(createEmptyQuery('calc'))
  empty.calculations.add('1', () => {})
  expect(() => empty.buildVQuery()).toThrow('require dimensions or measures')
  const builder = create({
    ...dsl(),
    calculations: [
      { id: 'first', alias: 'A', expr: '1' },
      { id: 'second', alias: 'B', expr: 'first+1' },
    ],
  })
  await expect(builder.query()).rejects.toThrow('number column: first')
  builder.calculations.update('second', (node) => node.setExpression('region+1'))
  await expect(builder.query()).rejects.toThrow('number column: region')
  expect(() => builder.calculations.add('', () => {})).toThrow()
  expect(() => builder.calculations.update('second', (node) => node.setExpression('?', [Infinity]))).toThrow()
  const valid = create({ ...dsl(), calculations: [] })
  expect(valid.buildVQuery().from).toBeUndefined()
  for (const value of [[{ id: 'x', alias: 'X', expr: '1' }], new Y.Array()]) {
    const doc = new Y.Doc()
    Y.applyUpdate(doc, valid.encodeStateAsUpdate())
    dispose.push(() => doc.destroy())
    if (value instanceof Y.Array) value.push([{ id: 'x', alias: 'X', expr: '1' }] as any)
    doc.getMap('dsl').set('calculations', value)
    expect(() => createQuery(doc)).toThrow()
  }
})

it('rejects malformed expressions before query adapters or connectors receive a request', async () => {
  const query = rs.fn(async () => ({ dataset: [] }))
  const resolveConnector = rs.fn(async () => {
    throw new Error('must not resolve connector')
  })
  for (const [expr, parameters] of [
    ['sales +', undefined],
    ['sales;SELECT 1', undefined],
    ['SUM(sales)', undefined],
    ['ABS()', undefined],
    ['?', undefined],
    ['sales', [1]],
  ] as const) {
    const builder = createQuery(
      {
        ...dsl(),
        calculations: [{ id: 'invalid', alias: '非法表达式', expr, parameters: parameters && [...parameters] }],
      },
      { adapters: { query }, resolveConnector },
    )
    dispose.push(() => builder.doc.destroy())
    const before = builder.build()
    for (const method of ['query', 'queryProfile', 'queryBins'] as const)
      await expect(builder[method]()).rejects.toThrow()
    expect(builder.build()).toEqual(before)
    expect(builder.undoManager.canUndo()).toBe(false)
  }
  expect(query).not.toHaveBeenCalled()
  expect(resolveConnector).not.toHaveBeenCalled()
})

it('validates saved calculations even when custom query and seed adapters replace the execution DSL', async () => {
  const query = rs.fn(async () => ({ dataset: [] }))
  const buildVSeed = rs.fn(async () => ({ custom: true }))
  const calculations = [{ id: 'invalid', alias: '非法表达式', expr: 'sales +' }]
  const builder = createQuery<{ request: string }>(
    { ...dsl(), calculations },
    {
      adapters: { buildVQuery: () => ({ request: 'custom' }), query },
    },
  )
  dispose.push(() => builder.doc.destroy())
  await expect(builder.query()).rejects.toThrow('Unexpected end of SQL expression')
  const doc = new Y.Doc()
  Y.applyUpdate(doc, builder.encodeStateAsUpdate())
  const restored = createQuery(doc, { adapters: { query } })
  dispose.push(() => doc.destroy())
  await expect(restored.query()).rejects.toThrow('Unexpected end of SQL expression')

  const vbi = createVBI<{ request: string }, { custom: boolean }>({
    adapters: { buildVQuery: () => ({ request: 'custom' }), query, buildVSeed },
  })
  const chart = vbi.chart.create({ ...vbi.chart.createEmpty('unused'), calculations })
  dispose.push(() => chart.doc.destroy())
  await expect(chart.query()).rejects.toThrow('Unexpected end of SQL expression')
  await expect(chart.buildVSeed()).rejects.toThrow('Unexpected end of SQL expression')
  expect(query).not.toHaveBeenCalled()
  expect(buildVSeed).not.toHaveBeenCalled()
})

it('keeps the expression snapshot fixed and checks cancellation after asynchronous validation', async () => {
  const builder = create({ ...dsl(), calculations: [{ id: 'value', alias: '值', expr: 'sales +' }] })
  const query = rs.fn(async () => ({ dataset: [] }))
  builder.adapters.query = query
  const pending = builder.query()
  builder.calculations.update('value', (node) => node.setExpression('sales+1'))
  await expect(pending).rejects.toThrow('Unexpected end of SQL expression')
  const controller = new AbortController()
  const cancelled = builder.query({ signal: controller.signal })
  controller.abort(new Error('cancelled during validation'))
  await expect(cancelled).rejects.toThrow('cancelled during validation')
  expect(query).not.toHaveBeenCalled()
})
