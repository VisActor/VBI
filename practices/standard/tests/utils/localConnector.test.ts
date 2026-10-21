import { beforeEach, describe, expect, rs, test } from '@rstest/core'

rs.mock('@visactor/vbi', () => {
  const register = rs.fn()
  return {
    VBI: {
      connectors: {
        register,
      },
      chart: {
        createEmpty: rs.fn((connectorId: string) => ({ connectorId })),
        create: rs.fn((source: unknown) => ({ source })),
      },
    },
    __vbiMockState: { register },
  }
})

rs.mock('@visactor/vquery', () => {
  const state = {
    hasDataset: rs.fn().mockResolvedValue(false),
    dropDataset: rs.fn().mockResolvedValue(undefined),
    createDataset: rs.fn().mockResolvedValue(undefined),
    connectDataset: rs.fn().mockResolvedValue({ query: rs.fn().mockResolvedValue({ dataset: [] }) }),
  }
  class VQuery {
    hasDataset = state.hasDataset
    dropDataset = state.dropDataset
    createDataset = state.createDataset
    connectDataset = state.connectDataset
  }
  return { VQuery, __vqueryMockState: state }
})

import {
  CONNECTOR_ID,
  createDefaultBuilder,
  createLocalConnector,
  initVBIConnector,
  setLocalDataWithSchema,
} from 'src/utils/localConnector'

describe('localConnector', () => {
  beforeEach(() => {
    rs.clearAllMocks()
    setLocalDataWithSchema([], null)
  })

  test('initVBIConnector skips fetch when local data is already set', async () => {
    const fetchMock = rs.fn()
    globalThis.fetch = fetchMock as typeof fetch
    setLocalDataWithSchema([{ city: 'HCM' }], [{ name: 'city', type: 'string' }])

    await initVBIConnector()

    const { __vbiMockState } = (await import('@visactor/vbi')) as any
    expect(fetchMock).not.toHaveBeenCalled()
    expect(__vbiMockState.register).toHaveBeenCalledWith(CONNECTOR_ID, expect.any(Function))
  })

  test('createLocalConnector normalizes measure values to number', async () => {
    setLocalDataWithSchema(
      [{ city: 'HCM', sales: 100 }],
      [
        { name: 'city', type: 'string' },
        { name: 'sales', type: 'number' },
      ],
    )

    const { __vqueryMockState } = (await import('@visactor/vquery')) as any
    __vqueryMockState.connectDataset.mockResolvedValue({
      query: rs.fn().mockResolvedValue({
        dataset: [{ totalSales: '123.5', city: 'HCM', ignored: 'x' }],
      }),
    })

    createLocalConnector('test-connector')
    const { __vbiMockState } = (await import('@visactor/vbi')) as any
    const factory = __vbiMockState.register.mock.calls[0][1]
    const connector = await factory()
    const result = await connector.query({
      queryDSL: {
        select: [{ field: 'sales', alias: 'totalSales', aggr: { func: 'sum' } }, 'city'],
      },
      schema: [],
    })

    expect(result.dataset).toEqual([{ totalSales: 123.5, city: 'HCM' }])
  })

  test('preserves string and date min/max values while count and numeric aggregates stay numeric', async () => {
    const { __vqueryMockState } = (await import('@visactor/vquery')) as any
    __vqueryMockState.connectDataset.mockResolvedValue({
      query: rs.fn().mockResolvedValue({
        dataset: [
          { first: '001', last: 'Retail', day: '2018-01-01', n: '3', amount: '20' },
          { n: '0', amount: 0 },
        ],
      }),
    })
    setLocalDataWithSchema([{ label: '001' }], [{ name: 'label', type: 'string' }])
    createLocalConnector('typed-aggregates')
    const { __vbiMockState } = (await import('@visactor/vbi')) as any
    const connector = await __vbiMockState.register.mock.calls[0][1]()
    const result = await connector.query({
      schema: [
        { name: 'label', type: 'string' },
        { name: 'date', type: 'date' },
        { name: 'value', type: 'number' },
      ],
      queryDSL: {
        select: [
          { field: 'label', alias: 'first', aggr: { func: 'min' } },
          { field: 'label', alias: 'last', aggr: { func: 'max' } },
          { field: 'date', alias: 'day', aggr: { func: 'min' } },
          { field: 'label', alias: 'n', aggr: { func: 'count' } },
          { field: 'value', alias: 'amount', aggr: { func: 'max' } },
        ],
      },
    })
    expect(result.dataset).toEqual([
      { first: '001', last: 'Retail', day: '2018-01-01', n: 3, amount: 20 },
      { n: 0, amount: 0 },
    ])
  })

  test('createDefaultBuilder uses default connector id', () => {
    const builder = createDefaultBuilder() as any
    expect(builder.source.connectorId).toBe(CONNECTOR_ID)
  })
})
