import { rs } from '@rstest/core'
import { createQuery, createEmptyQuery, createVBI, type VBIQueryProps, type VBIConnector } from '@visactor/vbi'
import { VQuery, type DatasetColumn } from '@visactor/vquery'
import { numericResult, countResult, singleRow } from 'src/query-builder/profile/context'

const schema: DatasetColumn[] = [
  { name: 'n', type: 'number' },
  { name: 's', type: 'string' },
  { name: 'date', type: 'date' },
]
const resources: Array<() => void | Promise<void>> = []
afterEach(async () => {
  for (const close of resources.splice(0).reverse()) await close()
  rs.restoreAllMocks()
})

const setup = async (rows: Record<string, number | string | null>[]) => {
  const engine = new VQuery()
  await engine.createDataset('statistics', schema, { type: 'json', rawDataset: rows })
  const dataset = await engine.connectDataset('statistics')
  const query = rs.fn(async ({ queryDSL }: VBIQueryProps) => ({ dataset: (await dataset.query(queryDSL)).dataset }))
  const connector: VBIConnector = { query, discoverSchema: rs.fn(async () => schema) }
  const resolveConnector = rs.fn(async () => connector)
  const builder = createQuery(createEmptyQuery('statistics'), { resolveConnector })
  builder.adapters.buildVQuery = () => ({ select: ['*'] })
  resources.push(
    () => engine.close(),
    () => dataset.disconnect(),
    () => builder.doc.destroy(),
  )
  return { builder, connector, query, resolveConnector }
}

it('profiles numeric ranges and bounded category frequencies through SQL, with no raw-result adapter', async () => {
  const { builder, query, resolveConnector, connector } = await setup([
    { n: 0, s: 'b' },
    { n: 1, s: 'a' },
    { n: 2, s: 'a' },
    { n: 3, s: '' },
    { n: 4, s: null },
    { n: null, s: 'c' },
  ])
  builder.adapters.query = rs.fn(async () => {
    throw new Error('must not fetch raw rows')
  })
  const stats = await builder.queryProfile({ bins: { maxBins: 2, discreteMax: 1 }, topK: 2, emptyString: 'missing' })
  expect(stats).toEqual({
    rowCount: 6,
    columns: {
      n: {
        type: 'number',
        validCount: 5,
        missingCount: 1,
        min: 0,
        max: 4,
        bins: [
          { min: 0, max: 2, count: 2 },
          { min: 2, max: 4, count: 3 },
        ],
      },
      s: {
        type: 'string',
        validCount: 4,
        missingCount: 2,
        top: [
          { value: 'a', count: 2 },
          { value: 'b', count: 1 },
        ],
        otherCount: 1,
      },
      date: { type: 'unknown', validCount: 0, missingCount: 6 },
    },
  })
  expect(builder.adapters.query).not.toHaveBeenCalled()
  expect(resolveConnector).toHaveBeenCalledTimes(1)
  expect(connector.discoverSchema).toHaveBeenCalledTimes(1)
  expect(query).toHaveBeenCalledTimes(3)
  for (const [request] of query.mock.calls) expect(request.queryDSL.from).toEqual({ select: ['*'] })
})

it('exposes independent numeric bins, retaining discrete values, empty counts and finite extreme boundaries', async () => {
  const { builder, query } = await setup([{ n: 1 }, { n: 1 }, { n: 4 }, { n: null }])
  expect(await builder.queryBins()).toEqual({
    rowCount: 4,
    columns: {
      n: {
        validCount: 3,
        missingCount: 1,
        min: 1,
        max: 4,
        bins: [
          { min: 1, max: 1, count: 2 },
          { min: 4, max: 4, count: 1 },
        ],
      },
    },
  })
  expect(query).toHaveBeenCalledTimes(2)
  expect(await builder.queryBins({ columns: [] })).toEqual({ rowCount: 4, columns: {} })
  await expect(builder.queryBins({ columns: ['s'] })).rejects.toThrow('number columns')
  await expect(builder.queryProfile({ columns: ['typo'] })).rejects.toThrow('Unknown profile column')
  await expect(builder.queryBins({ columns: ['typo'] })).rejects.toThrow('Unknown profile column')
  const empty = await setup([])
  expect((await empty.builder.queryProfile()).columns.n).toEqual({ type: 'unknown', validCount: 0, missingCount: 0 })
  expect((await empty.builder.queryBins({ columns: ['n'] })).columns.n.bins).toEqual([])
  const extreme = await setup([{ n: -Number.MAX_VALUE }, { n: 0 }, { n: Number.MAX_VALUE }])
  expect((await extreme.builder.queryBins({ columns: ['n'], maxBins: 2, discreteMax: 1 })).columns.n.bins).toEqual([
    { min: -Number.MAX_VALUE, max: 0, count: 1 },
    { min: 0, max: Number.MAX_VALUE, count: 2 },
  ])
})

it('snapshots query, connector and mutable options across asynchronous discovery', async () => {
  const { builder, connector, query, resolveConnector } = await setup(
    Array.from({ length: 10 }, (_, n) => ({ n, s: n % 2 ? 'a' : '' })),
  )
  let resume!: () => void
  const waiting = new Promise<void>((resolve) => {
    resume = resolve
  })
  resolveConnector.mockImplementation(async () => {
    await waiting
    return connector
  })
  const source = { select: [{ field: 'n', alias: 'value' }] }
  builder.adapters.buildVQuery = () => source
  const options = { columns: ['value', 'value'], bins: { maxBins: 2, discreteMax: 1 } }
  const pending = builder.queryProfile(options)
  options.columns.push('typo')
  options.bins.maxBins = 4
  source.select[0].alias = 'edited'
  builder.dsl.set('connectorId', 'edited')
  resume()
  const stats = await pending
  expect(Object.keys(stats.columns)).toEqual(['value'])
  expect(stats.columns.value.bins).toHaveLength(2)
  expect(query.mock.calls[0][0].connectorId).toBe('statistics')
  expect(query.mock.calls[0][0].queryDSL.from?.select).toEqual([{ field: 'n', alias: 'value' }])
  builder.dsl.set('connectorId', 'statistics')
  builder.adapters.buildVQuery = () => ({ select: ['n'] })
  const binsOptions = { columns: ['n'], maxBins: 20, discreteMax: 1 }
  const bins = builder.queryBins(binsOptions)
  binsOptions.columns.push('s')
  binsOptions.maxBins = 1
  expect((await bins).columns.n.bins).toHaveLength(10)
})

it('uses declared projection aliases and shares SQL statistics with Chart', async () => {
  const { builder, connector } = await setup([
    { n: 5, s: '' },
    { n: 8, s: 'a' },
  ])
  builder.adapters.buildVQuery = () => ({ select: ['s', { field: 'n', alias: 'value' }] })
  expect(Object.keys((await builder.queryProfile()).columns)).toEqual(['s', 'value'])
  expect((await builder.queryProfile()).columns.s.validCount).toBe(1)
  const vbi = createVBI()
  vbi.connectors.register('statistics', connector)
  resources.push(() => {
    vbi.connectors.unregister('statistics')
  })
  const chart = vbi.chart.create(vbi.chart.createEmpty('statistics'), {
    adapters: { buildVQuery: () => builder.buildVQuery() },
  })
  resources.push(() => chart.doc.destroy())
  expect(await chart.queryProfile()).toEqual(await builder.queryProfile())
  expect(await chart.queryBins()).toEqual(await builder.queryBins())
  const controller = new AbortController()
  controller.abort(new Error('cancelled'))
  await expect(chart.queryBins({ signal: controller.signal })).rejects.toThrow('cancelled')
})

it('validates options and rejects malformed aggregate data without falling back to row reads', async () => {
  const { builder, connector } = await setup([{ n: 1 }])
  for (const options of [{ topK: 0 }, { bins: { maxBins: 1.5 } }, { bins: { discreteMax: -1 } }])
    await expect(builder.queryProfile(options)).rejects.toThrow('positive integer')
  await expect(builder.queryBins({ maxBins: 0 })).rejects.toThrow('positive integer')
  for (const value of [null, undefined, '', ' ', 'NaN', NaN, Infinity, false])
    expect(() => numericResult(value)).toThrow('Invalid statistics')
  expect(numericResult('1.5')).toBe(1.5)
  for (const value of [-1, 1.5, Number.MAX_SAFE_INTEGER + 1])
    expect(() => countResult(value)).toThrow('Invalid statistics count')
  expect(countResult('2')).toBe(2)
  expect(() => singleRow([])).toThrow('one statistics row')
  builder.adapters.buildVQuery = () => ({ select: ['n'] })
  for (const row of [
    { rows: 1, valid_0: 2 },
    { rows: 1, valid_0: 1, min_0: 2, max_0: 1, count_distinct_0: 1 },
    { rows: 1, valid_0: 1, min_0: 1, max_0: 1, count_distinct_0: 0 },
    { rows: 1, valid_0: 1, min_0: 1, max_0: 1, count_distinct_0: 2 },
  ]) {
    connector.query = async () => ({ dataset: [row] })
    await expect(builder.queryProfile()).rejects.toThrow(/Statistics count|Invalid numeric/)
  }
  let call = 0
  builder.adapters.buildVQuery = () => ({ select: ['s'] })
  connector.query = async () => ({ dataset: ++call === 1 ? [{ rows: 1, valid_0: 1 }] : [{ value: 2, count: 1 }] })
  await expect(builder.queryProfile()).rejects.toThrow('Invalid category')
})

it('propagates connector failures and cancellation at discovery and SQL boundaries', async () => {
  const { builder, connector, resolveConnector } = await setup([{ n: 1 }])
  const error = new Error('cancelled')
  const before = new AbortController()
  before.abort(error)
  await expect(builder.queryProfile({ signal: before.signal })).rejects.toBe(error)
  await expect(builder.queryBins({ signal: before.signal })).rejects.toBe(error)
  const resolving = new AbortController()
  resolveConnector.mockImplementationOnce(async () => {
    resolving.abort(error)
    return connector
  })
  await expect(builder.queryBins({ signal: resolving.signal })).rejects.toBe(error)
  const discovering = new AbortController()
  const discover = connector.discoverSchema
  connector.discoverSchema = async () => {
    discovering.abort(error)
    return schema
  }
  await expect(builder.queryProfile({ signal: discovering.signal })).rejects.toBe(error)
  connector.discoverSchema = discover
  const executing = new AbortController()
  connector.query = rs.fn(async () => {
    executing.abort(error)
    return { dataset: [] }
  })
  await expect(builder.queryProfile({ signal: executing.signal })).rejects.toBe(error)
  expect(connector.query).toHaveBeenCalledTimes(1)
  const failure = new Error('SQL failure')
  connector.query = rs.fn(async () => {
    throw failure
  })
  await expect(builder.queryBins()).rejects.toBe(failure)
  expect(connector.query).toHaveBeenCalledTimes(1)
})

it('checks cancellation before delivering assembled profile and bins results', async () => {
  const { builder, connector } = await setup([])
  builder.adapters.buildVQuery = () => ({ select: [] })
  for (const method of ['queryProfile', 'queryBins'] as const) {
    const controller = new AbortController()
    const error = new Error('cancelled after SQL')
    connector.query = async () => {
      queueMicrotask(() => queueMicrotask(() => controller.abort(error)))
      return { dataset: [{ rows: 0, valid_0: 0, valid_1: 0 }] }
    }
    await expect(builder[method]({ columns: [], signal: controller.signal })).rejects.toBe(error)
  }
})

it('rejects inconsistent multi-query statistics rather than returning negative categories or incomplete bins', async () => {
  const { builder, connector } = await setup([{ n: 1, s: 'a' }])
  for (const [field, options, summary, detail] of [
    ['s', {}, { rows: 1, valid_0: 1 }, [{ value: 'a', count: 2 }]],
    ['n', {}, { rows: 2, valid_0: 2, min_0: 1, max_0: 2, count_distinct_0: 2 }, [{ value: 1, count: 1 }]],
    [
      'n',
      { bins: { discreteMax: 1, maxBins: 1 } },
      { rows: 2, valid_0: 2, min_0: 1, max_0: 2, count_distinct_0: 2 },
      [{ bin_0: 1 }],
    ],
  ] as const) {
    builder.adapters.buildVQuery = () => ({ select: [field] })
    let count = 0
    connector.query = async () => ({ dataset: count++ === 0 ? [{ ...summary }] : detail.map((row) => ({ ...row })) })
    await expect(builder.queryProfile(options)).rejects.toThrow('Statistics changed during query')
  }
})
