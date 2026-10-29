import { rs } from '@rstest/core'
import {
  createVBI,
  QueryModeBuilder,
  defaultVBIChartBuilderAdapters,
  type VBIChartBuilderAdapters,
  type VBIChartQueryContext,
  type VBIInstance,
} from '@visactor/vbi'
import { VQuery, convertDSLToDuckDB, convertDSLToMysql, type DatasetColumn, type VQueryDSL } from '@visactor/vquery'
import { zVBIChartDSL } from 'src/types/chartDSL/vbi/vbi'

const connectorId = 'unit-query-mode'
const schema: DatasetColumn[] = [
  { name: 'region', type: 'string' },
  { name: 'sales', type: 'number' },
  { name: 'date', type: 'string' },
]
const records = [
  { region: 'East', sales: 10, date: '2026-01-01' },
  { region: 'East', sales: 10, date: '2026-01-01' },
  { region: 'East', sales: 20, date: '2026-01-02' },
  { region: 'West', sales: 0, date: '2026-02-01' },
  { region: 'West', sales: -5, date: '2026-02-02' },
  { region: 'West', sales: null, date: '2026-02-03' },
]
const cleanup: Array<() => void | Promise<void>> = []

function createChart(adapters?: Partial<VBIChartBuilderAdapters>) {
  const vbi = createVBI()
  const chart = vbi.chart.create(vbi.chart.createEmpty(connectorId), { adapters })
  chart.dimensions.add('region', (node) => node.setAlias('Region'))
  chart.measures.add('sales', (node) => node.setAlias('Sales').setAggregate({ func: 'sum' }))
  cleanup.push(() => {
    chart.doc.destroy()
    vbi.connectors.unregister(connectorId)
  })
  return { vbi, chart }
}

async function connect(vbi: VBIInstance) {
  const engine = new VQuery()
  await engine.createDataset(connectorId, schema, { type: 'json', rawDataset: records })
  const dataset = await engine.connectDataset(connectorId)
  const query = rs.fn(async ({ queryDSL }) => ({ dataset: (await dataset.query(queryDSL)).dataset }))
  vbi.connectors.register(connectorId, { discoverSchema: async () => schema, query })
  cleanup.push(async () => {
    await dataset.disconnect()
    await engine.close()
  })
  return { dataset, query }
}

afterEach(async () => {
  for (const dispose of cleanup.splice(0).reverse()) await dispose()
  rs.restoreAllMocks()
})

describe('query mode state', () => {
  it('keeps old DSL unchanged and observes only explicit mode edits', () => {
    const { chart } = createChart()
    expect(chart.queryMode).toBeInstanceOf(QueryModeBuilder)
    expect(chart.queryMode.getMode()).toBe('aggregate')
    expect(chart.queryMode.toJSON()).toBe('aggregate')
    expect(chart.build()).not.toHaveProperty('queryMode')
    expect(zVBIChartDSL.parse(chart.build())).not.toHaveProperty('queryMode')
    const changed = rs.fn()
    const stop = chart.queryMode.observe(changed)
    chart.limit.setLimit(5)
    expect(changed).not.toHaveBeenCalled()
    expect(chart.queryMode.setMode('detail')).toBe(chart.queryMode)
    expect(chart.queryMode.getMode()).toBe('detail')
    expect(changed).toHaveBeenCalledTimes(1)
    stop()
    chart.queryMode.setMode('aggregate')
    expect(chart.queryMode.toJSON()).toBe('aggregate')
    expect(changed).toHaveBeenCalledTimes(1)
  })

  it('preserves mode through JSON, Yjs, resource snapshots, undo and redo', () => {
    const { vbi, chart } = createChart()
    const initial = chart.build()
    chart.queryMode.setMode('detail')
    const saved = chart.build()
    expect(zVBIChartDSL.parse(saved).queryMode).toBe('detail')
    const restored = createVBI().chart.create(JSON.parse(JSON.stringify(saved)))
    const synced = createVBI().chart.create(vbi.chart.createEmpty(connectorId))
    cleanup.push(() => restored.doc.destroy())
    cleanup.push(() => synced.doc.destroy())
    synced.applyUpdate(chart.encodeStateAsUpdate())
    expect(restored.build()).toEqual(saved)
    expect(restored.buildVQuery()).toEqual(chart.buildVQuery())
    expect(synced.queryMode.getMode()).toBe('detail')
    expect(vbi.resources.snapshot().charts[chart.getUUID()].queryMode).toBe('detail')
    expect(chart.undoManager.undo()).toBe(true)
    expect(chart.build()).toEqual(initial)
    expect(chart.queryMode.getMode()).toBe('aggregate')
    expect(chart.undoManager.redo()).toBe(true)
    expect(chart.build()).toEqual(saved)
  })

  it('rejects invalid modes without silently falling back to aggregate', () => {
    const { chart } = createChart()
    expect(() => chart.queryMode.setMode('invalid' as never)).toThrow()
    expect(chart.build()).not.toHaveProperty('queryMode')
    chart.dsl.set('queryMode', 'invalid')
    expect(() => chart.queryMode.getMode()).toThrow()
    expect(() => chart.buildVQuery()).toThrow()
    expect(zVBIChartDSL.safeParse(chart.build()).success).toBe(false)
  })
})

describe('detail query compilation and execution', () => {
  it('keeps duplicate rows and stable IDs while sharing WHERE, source-field sorting and limit', async () => {
    const { vbi, chart } = createChart()
    const { dataset, query } = await connect(vbi)
    chart.measures.add('sales', (node) => node.setAlias('Sales').setAggregate({ func: 'avg' }))
    const region = chart.dimensions.findAll()[0].getId()
    const [sum, avg] = chart.measures.findAll().map((node) => node.getId())
    chart.measures.update(sum, (node) => node.setSort({ order: 'desc' }))
    chart.whereFilter.setOperator('or')
    chart.whereFilter.addGroup('and', (group) => {
      group.add('region', (node) => node.setOperator('eq').setValue('East'))
      group.add('sales', (node) => node.setOperator('between').setValue({ min: 0, max: 20 }))
    })
    chart.limit.setLimit(3)
    const aggregate = chart.buildVQuery()
    expect((await chart.query()).dataset).toEqual([{ [region]: 'East', [sum]: 40, [avg]: 40 / 3 }])
    chart.queryMode.setMode('detail')
    const detail = chart.buildVQuery()
    expect(detail).toEqual({
      select: [
        { field: 'sales', alias: sum },
        { field: 'sales', alias: avg },
        { field: 'region', alias: region },
      ],
      where: aggregate.where,
      orderBy: aggregate.orderBy,
      limit: 3,
    })
    for (const compile of [convertDSLToDuckDB, convertDSLToMysql]) {
      expect(compile(detail, connectorId)).not.toMatch(/group by|having|distinct|sum\(|avg\(/i)
      expect(compile(aggregate, connectorId)).toMatch(/group by/i)
    }
    const expected = [20, 10, 10].map((value) => ({ [region]: 'East', [sum]: value, [avg]: value }))
    expect((await dataset.query(detail as VQueryDSL<Record<string, string | number>>)).dataset).toEqual(expected)
    expect((await chart.query()).dataset).toEqual(expected)
    expect((await chart.buildVSeed()).dataset).toEqual(expected)
    expect(query).toHaveBeenCalledTimes(3)
    chart.queryMode.setMode('aggregate')
    expect(chart.buildVQuery()).toEqual(aggregate)
  })

  it('projects raw date values, zero, negatives and null without date or measure aggregation', async () => {
    const { vbi, chart } = createChart()
    await connect(vbi)
    chart.dimensions.add('date', (node) => node.setAggregate({ func: 'toMonth' }).setSort({ order: 'asc' }))
    chart.queryMode.setMode('detail')
    const [region, date] = chart.dimensions.findAll().map((node) => node.getId())
    const sales = chart.measures.findAll()[0].getId()
    expect((await chart.query()).dataset).toEqual(
      records.map((row) => ({ [region]: row.region, [date]: row.date, [sales]: row.sales })),
    )
    chart.whereFilter.add('sales', (node) => node.setOperator('>').setValue(1000))
    expect((await chart.query()).dataset).toEqual([])
  })

  it('keeps an in-flight VSeed detail snapshot while the next query switches to aggregate', async () => {
    const { vbi, chart } = createChart()
    const { dataset } = await connect(vbi)
    let ready!: () => void
    let resume!: () => void
    const started = new Promise<void>((resolve) => {
      ready = resolve
    })
    const waiting = new Promise<void>((resolve) => {
      resume = resolve
    })
    const discoverSchema = rs
      .fn(async () => schema)
      .mockImplementationOnce(async () => {
        ready()
        await waiting
        return schema
      })
    const query = rs.fn(async ({ queryDSL }) => ({ dataset: (await dataset.query(queryDSL)).dataset }))
    vbi.connectors.register(connectorId, { discoverSchema, query })
    chart.queryMode.setMode('detail')
    const pending = chart.buildVSeed()
    await started
    chart.queryMode.setMode('aggregate')
    const aggregate = await chart.buildVSeed()
    resume()
    const detail = await pending
    expect(detail.dataset).toHaveLength(6)
    expect(aggregate.dataset).toHaveLength(2)
    expect(query).toHaveBeenCalledTimes(2)
    expect(query.mock.calls[0][0].queryDSL).toHaveProperty('groupBy')
    expect(query.mock.calls[1][0].queryDSL).not.toHaveProperty('groupBy')
  })

  for (const type of ['bar', 'pivotTable']) {
    it(`rejects ${type} detail queries before executing a connector`, async () => {
      const { vbi, chart } = createChart()
      const execute = rs.fn(async () => ({ dataset: [] }))
      vbi.connectors.register(connectorId, { discoverSchema: async () => schema, query: execute })
      chart.chartType.changeChartType(type)
      chart.queryMode.setMode('detail')
      expect(() => chart.buildVQuery()).toThrow('only support table')
      await expect(chart.query()).rejects.toThrow('only support table')
      await expect(chart.buildVSeed()).rejects.toThrow('only support table')
      expect(execute).not.toHaveBeenCalled()
    })
  }

  it('rejects HAVING instead of dropping aggregate conditions', async () => {
    const { chart } = createChart()
    chart.havingFilter.add('sales', (node) => node.setAggregate({ func: 'sum' }).setOperator('>').setValue(10))
    chart.queryMode.setMode('detail')
    expect(() => chart.buildVQuery()).toThrow('HAVING')
    await expect(chart.query()).rejects.toThrow('HAVING')
    await expect(chart.buildVSeed()).rejects.toThrow('HAVING')
  })

  it('passes query mode to wrapped compilers without changing their context or call order', async () => {
    const compile = rs.fn(defaultVBIChartBuilderAdapters.buildVQuery)
    const { vbi, chart } = createChart({ buildVQuery: compile })
    await connect(vbi)
    expect(chart.buildVQuery()).toHaveProperty('groupBy')
    expect(compile).toHaveBeenCalledTimes(1)
    chart.queryMode.setMode('detail')
    expect(chart.buildVQuery()).not.toHaveProperty('groupBy')
    expect((await chart.query()).dataset).toHaveLength(6)
    expect((await chart.buildVSeed()).dataset).toHaveLength(6)
    expect(compile).toHaveBeenCalledTimes(4)
    for (const [context] of compile.mock.calls.slice(1)) {
      expect(context.builder).toBe(chart)
      expect(context.dsl).toBe(chart.dsl)
      expect(context.vbiDSL.queryMode).toBe('detail')
    }
  })

  it('passes detail DSL and cancellation to custom query and seed adapters without changing their context', async () => {
    const result = { dataset: [{ value: 7 }] }
    const execute = rs.fn((_context: VBIChartQueryContext) => result)
    const seed = rs.fn(defaultVBIChartBuilderAdapters.buildVSeed)
    const { chart } = createChart({ query: execute, buildVSeed: seed })
    chart.queryMode.setMode('detail')
    const options = { signal: new AbortController().signal }
    expect(await chart.query(options)).toBe(result)
    expect((await chart.buildVSeed(options)).dataset).toBe(result.dataset)
    expect(execute).toHaveBeenCalledTimes(2)
    expect(seed).toHaveBeenCalledTimes(1)
    for (const [context] of execute.mock.calls) {
      expect(context.builder).toBe(chart)
      expect(context.dsl).toBe(chart.dsl)
      expect(context.options).toBe(options)
      expect(context.vbiDSL.queryMode).toBe('detail')
      expect(context.queryDSL).not.toHaveProperty('groupBy')
    }
  })
})
