import { rs } from '@rstest/core'
import {
  createVBI,
  defaultVBIChartBuilderAdapters,
  type VBIChartBuilderAdapters,
  type VBIChartBuildVQueryContext,
  type VBIChartQueryContext,
  type VBIQueryProps,
  type VBIQueryResult,
} from '@visactor/vbi'
import { VQuery, type DatasetColumn } from '@visactor/vquery'
import type { VSeed } from '@visactor/vseed'

const connectorId = 'unit-chart-query'
const schema: DatasetColumn[] = [
  { name: 'region', type: 'string' },
  { name: 'sales', type: 'number' },
]
const cleanup: Array<() => void> = []

function createChart(adapters?: Partial<VBIChartBuilderAdapters>) {
  const vbi = createVBI()
  const chart = vbi.chart.create(vbi.chart.createEmpty(connectorId), { adapters })
  chart.dimensions.add('region', (node) => node.setAlias('Region').setEncoding('xAxis'))
  chart.measures.add('sales', (node) => node.setAlias('Sales').setAggregate({ func: 'sum' }).setEncoding('yAxis'))
  cleanup.push(() => {
    chart.doc.destroy()
    vbi.connectors.unregister(connectorId)
  })
  return { vbi, chart }
}

function deferred<T>() {
  let resolve!: (value: T) => void
  const promise = new Promise<T>((done) => {
    resolve = done
  })
  return { promise, resolve }
}

afterEach(() => {
  cleanup.splice(0).forEach((dispose) => dispose())
  rs.restoreAllMocks()
})

describe('chart.query', () => {
  it('executes chart filters and aggregates without constructing VSeed or projecting field IDs', async () => {
    const buildVSeed = rs.fn(() => {
      throw new Error('query must not build VSeed')
    })
    const { vbi, chart } = createChart({ buildVSeed })
    chart.measures.add('sales', (node) => node.setAggregate({ func: 'avg' }))
    chart.whereFilter.add('sales', (node) => node.setOperator('>').setValue(100))
    const [sum, avg] = chart.measures.findAll()
    const region = chart.dimensions.findAll()[0]
    const result: VBIQueryResult = {
      dataset: [{ [region.getId()]: 'East', [sum.getId()]: 300, [avg.getId()]: 150 }],
    }
    const query = rs.fn(async () => result)
    const discoverSchema = rs.fn(async () => schema)
    const factory = rs.fn(async () => ({ discoverSchema, query }))
    vbi.connectors.register(connectorId, factory)
    const buildVQuery = rs.spyOn(chart.adapters, 'buildVQuery')

    expect(await chart.query()).toBe(result)
    expect(buildVQuery).toHaveBeenCalledTimes(1)
    expect(factory).toHaveBeenCalledTimes(1)
    expect(discoverSchema).toHaveBeenCalledTimes(1)
    expect(query).toHaveBeenCalledTimes(1)
    expect(query).toHaveBeenCalledWith({
      connectorId,
      schema,
      queryDSL: chart.buildVQuery(),
      signal: undefined,
    })
    expect(buildVSeed).not.toHaveBeenCalled()
    expect(Object.keys(result.dataset[0])).toEqual([region.getId(), sum.getId(), avg.getId()])
  })

  it('queries real data and builds the same VSeed dataset using one query per independent operation', async () => {
    const engine = new VQuery()
    await engine.createDataset(connectorId, schema, {
      type: 'json',
      rawDataset: [
        { region: 'East', sales: 120 },
        { region: 'West', sales: 80 },
        { region: 'East', sales: 180 },
      ],
    })
    const dataset = await engine.connectDataset(connectorId)
    const { vbi, chart } = createChart()
    chart.whereFilter.add('sales', (node) => node.setOperator('>').setValue(100))
    chart.measures.add('sales', (node) => node.setAggregate({ func: 'avg' }))
    const query = rs.fn(async ({ queryDSL }) => ({ dataset: (await dataset.query(queryDSL)).dataset }))
    vbi.connectors.register(connectorId, { discoverSchema: async () => schema, query })

    try {
      const result = await chart.query()
      const [sum, avg] = chart.measures.findAll()
      expect(result.dataset).toEqual([
        { [chart.dimensions.findAll()[0].getId()]: 'East', [sum.getId()]: 300, [avg.getId()]: 150 },
      ])
      expect(query).toHaveBeenCalledTimes(1)

      const execute = rs.spyOn(chart.adapters, 'query')
      const seed = await chart.buildVSeed()
      expect(execute).toHaveBeenCalledTimes(1)
      expect(query).toHaveBeenCalledTimes(2)
      expect(seed.dataset).toEqual(result.dataset)
      expect(seed.measures).toHaveLength(2)
    } finally {
      await dataset.disconnect()
      await engine.close()
    }
  })

  it('forwards cancellation and propagates connector cancellation without retrying', async () => {
    const { vbi, chart } = createChart()
    const reason = new Error('cancelled')
    const controller = new AbortController()
    const query = rs.fn(async ({ signal }) => {
      expect(signal).toBe(controller.signal)
      signal.throwIfAborted()
      return { dataset: [] }
    })
    vbi.connectors.register(connectorId, { discoverSchema: async () => schema, query })
    controller.abort(reason)

    await expect(chart.query({ signal: controller.signal })).rejects.toBe(reason)
    expect(query).toHaveBeenCalledTimes(1)
    await expect(chart.buildVSeed({ signal: controller.signal })).rejects.toBe(reason)
    expect(query).toHaveBeenCalledTimes(2)
  })

  it('keeps concurrent VSeed queries and their visual configuration snapshots separate', async () => {
    const { vbi, chart } = createChart()
    const started = deferred<void>()
    const firstSchema = deferred<DatasetColumn[]>()
    const discoverSchema = rs
      .fn(async () => schema)
      .mockImplementationOnce(() => {
        started.resolve()
        return firstSchema.promise
      })
    const query = rs.fn(async (_request: VBIQueryProps) => ({ dataset: [{ sales: 42 }] }))
    vbi.connectors.register(connectorId, { discoverSchema, query })
    const nextConnectorId = `${connectorId}-next`
    vbi.connectors.register(nextConnectorId, { discoverSchema, query })
    cleanup.push(() => vbi.connectors.unregister(nextConnectorId))

    const first = chart.buildVSeed()
    await started.promise
    const measure = chart.measures.findAll()[0]
    chart.measures.update(measure.getId(), (node) => node.setAlias('Updated').setFormat({ fractionDigits: 1 }))
    chart.theme.setTheme('dark')
    chart.chartType.changeChartType('bar')
    chart.dsl.set('connectorId', nextConnectorId)
    const second = await chart.buildVSeed()
    firstSchema.resolve(schema)
    const original = await first

    expect(original).toMatchObject({ chartType: 'table', theme: 'light', measures: [{ alias: 'Sales' }] })
    expect(original.measures?.[0]).not.toHaveProperty('numFormat')
    expect(second).toMatchObject({
      chartType: 'bar',
      theme: 'dark',
      measures: [{ alias: 'Updated', numFormat: { fractionDigits: 1 } }],
    })
    expect(query).toHaveBeenCalledTimes(2)
    expect(query.mock.calls.map(([request]) => request.connectorId)).toEqual([nextConnectorId, connectorId])
    expect(discoverSchema).toHaveBeenCalledTimes(2)
  })

  it('propagates a missing connector without constructing a visualization', async () => {
    const { chart } = createChart()
    await expect(chart.query()).rejects.toThrow(`connector ${connectorId} not registered`)
    await expect(chart.buildVSeed()).rejects.toThrow(`connector ${connectorId} not registered`)
  })

  for (const stage of ['schema', 'query'] as const) {
    it(`propagates ${stage} errors without retrying or converting them into empty data`, async () => {
      const { vbi, chart } = createChart()
      const error = new Error(`${stage} failed`)
      const discoverSchema = rs.fn(async () => schema)
      const query = rs.fn(async () => ({ dataset: [] }))
      if (stage === 'schema') discoverSchema.mockRejectedValue(error)
      else query.mockRejectedValue(error)
      vbi.connectors.register(connectorId, { discoverSchema, query })

      await expect(chart.query()).rejects.toBe(error)
      expect(discoverSchema).toHaveBeenCalledTimes(1)
      expect(query).toHaveBeenCalledTimes(stage === 'schema' ? 0 : 1)
    })
  }
})

describe('custom adapter compatibility', () => {
  it('shares a custom query adapter between direct queries and default VSeed builds without a connector', async () => {
    const result: VBIQueryResult = { dataset: [] }
    const query = rs.fn((context: VBIChartQueryContext) => {
      expect(context.dsl).toBe(chart.dsl)
      expect(context.builder).toBe(chart)
      expect(context.options).toBe(options)
      expect(context.queryDSL).toEqual(chart.buildVQuery())
      return result
    })
    const { chart } = createChart({ query })
    const options = { signal: new AbortController().signal }
    const region = chart.dimensions.findAll()[0].getId()
    const sales = chart.measures.findAll()[0].getId()
    result.dataset.push({ [region]: 'East', [sales]: 42 })

    expect(await chart.query(options)).toBe(result)
    expect(query).toHaveBeenCalledTimes(1)
    const seed = await chart.buildVSeed(options)
    expect(seed.dataset).toBe(result.dataset)
    expect(query).toHaveBeenCalledTimes(2)
  })

  it('passes custom query DSLs and the compiler snapshot to a custom executor', async () => {
    type CustomQuery = { field: string }
    const result: VBIQueryResult = { dataset: [{ sales: 7 }] }
    let compiled!: VBIChartBuildVQueryContext<CustomQuery>
    const query = rs.fn(async (context: VBIChartQueryContext<CustomQuery>) => {
      expect(context.vbiDSL).toBe(compiled.vbiDSL)
      expect(context.vbiDSL.theme).toBe('dark')
      expect(context.queryDSL).toEqual({ field: 'sales' })
      return result
    })
    const vbi = createVBI<CustomQuery, VSeed>({
      adapters: {
        buildVQuery: (context) => {
          compiled = context
          context.vbiDSL.theme = 'dark'
          return { field: 'sales' }
        },
        query,
      },
    })
    const chart = vbi.chart.create(vbi.chart.createEmpty(connectorId))
    cleanup.push(() => chart.doc.destroy())

    expect(await chart.query()).toBe(result)
    expect((await chart.buildVSeed()).dataset).toBe(result.dataset)
    expect(query).toHaveBeenCalledTimes(2)
    expect(chart.build().theme).toBe('light')
  })

  it('propagates custom query adapter errors without retries in either operation', async () => {
    const error = new Error('custom query failed')
    const query = rs.fn(async () => {
      throw error
    })
    const { chart } = createChart({ query })
    await expect(chart.query()).rejects.toBe(error)
    expect(query).toHaveBeenCalledTimes(1)
    await expect(chart.buildVSeed()).rejects.toBe(error)
    expect(query).toHaveBeenCalledTimes(2)
  })

  it('preserves custom query/seed contexts and supports seed adapters without a connector', async () => {
    type CustomQuery = { request: string }
    type CustomSeed = { custom: boolean }
    const queryDSL: CustomQuery = { request: 'sales' }
    const result: CustomSeed = { custom: true }
    let queryContext!: VBIChartBuildVQueryContext<CustomQuery, CustomSeed>
    const buildVQuery = rs.fn((context: VBIChartBuildVQueryContext<CustomQuery, CustomSeed>) => {
      queryContext = context
      return queryDSL
    })
    const buildVSeed = rs.fn(async (context) => {
      expect(context).toEqual({ ...queryContext, queryDSL, options })
      expect(context.vbiDSL).toBe(queryContext.vbiDSL)
      return result
    })
    const options = { signal: new AbortController().signal }
    const adapters: VBIChartBuilderAdapters<CustomQuery, CustomSeed> = { buildVQuery, buildVSeed }
    const vbi = createVBI<CustomQuery, CustomSeed>({ adapters })
    const chart = vbi.chart.create(vbi.chart.createEmpty(connectorId))
    cleanup.push(() => {
      chart.doc.destroy()
      vbi.connectors.unregister(connectorId)
    })
    const execute = rs.spyOn(chart, 'query')

    expect(await chart.buildVSeed(options)).toBe(result)
    expect(buildVQuery).toHaveBeenCalledTimes(1)
    expect(buildVSeed).toHaveBeenCalledTimes(1)
    expect(execute).not.toHaveBeenCalled()

    const connectorQuery = rs.fn(async () => ({ dataset: [{ sales: 5 }] }))
    vbi.connectors.register(connectorId, { discoverSchema: async () => schema, query: connectorQuery })
    expect(await chart.query(options)).toEqual({ dataset: [{ sales: 5 }] })
    expect(connectorQuery).toHaveBeenCalledWith(expect.objectContaining({ queryDSL, signal: options.signal }))
    expect(buildVSeed).toHaveBeenCalledTimes(1)
  })

  it('keeps a custom compiler snapshot shared with the default seed adapter and queries once', async () => {
    const buildVQuery = rs.fn((context: VBIChartBuildVQueryContext) => {
      context.vbiDSL.theme = 'dark'
      context.vbiDSL.measures[0].alias = 'Adapter alias'
      return defaultVBIChartBuilderAdapters.buildVQuery(context)
    })
    const { vbi, chart } = createChart({ buildVQuery })
    const query = rs.fn(async () => ({ dataset: [] }))
    vbi.connectors.register(connectorId, { discoverSchema: async () => schema, query })
    const seed = await chart.buildVSeed()

    expect(seed).toMatchObject({ theme: 'dark', measures: [{ alias: 'Adapter alias' }] })
    expect(chart.build()).toMatchObject({ theme: 'light', measures: [{ alias: 'Sales' }] })
    expect(buildVQuery).toHaveBeenCalledTimes(1)
    expect(query).toHaveBeenCalledTimes(1)
  })

  it('does not prequery when a custom adapter wraps the published default seed adapter', async () => {
    const buildVSeed = rs.fn(defaultVBIChartBuilderAdapters.buildVSeed)
    const { vbi, chart } = createChart({ buildVSeed })
    const query = rs.fn(async () => ({ dataset: [] }))
    vbi.connectors.register(connectorId, { discoverSchema: async () => schema, query })

    expect((await chart.buildVSeed()).dataset).toEqual([])
    expect(buildVSeed).toHaveBeenCalledTimes(1)
    expect(query).toHaveBeenCalledTimes(1)
  })

  it('honors overrides of the published default adapter object', async () => {
    const custom = rs.spyOn(defaultVBIChartBuilderAdapters, 'buildVSeed').mockResolvedValue({
      chartType: 'table',
      dataset: [],
    })
    const { chart } = createChart()

    expect(await chart.buildVSeed()).toEqual({ chartType: 'table', dataset: [] })
    expect(custom).toHaveBeenCalledTimes(1)
  })
})
