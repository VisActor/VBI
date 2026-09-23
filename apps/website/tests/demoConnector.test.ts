import { beforeEach, expect, rs, test } from '@rstest/core'
import type { VBIConnectorFactory } from '@visactor/vbi'

rs.mock('@visactor/vbi', () => ({ VBI: { connectors: { register: rs.fn() } } }))
rs.mock('@visactor/vquery', () => ({ VQuery: rs.fn() }))

beforeEach(() => {
  rs.resetModules()
  rs.resetAllMocks()
})

const setup = async (exists = false) => {
  const { VBI } = await import('@visactor/vbi')
  const { VQuery } = await import('@visactor/vquery')
  const connection = {
    query: rs.fn().mockResolvedValue({ dataset: [{ sales: 42 }] }),
    disconnect: rs.fn().mockResolvedValue(undefined),
  }
  const engine = {
    hasDataset: rs.fn().mockResolvedValue(exists),
    createDataset: rs.fn().mockResolvedValue(undefined),
    connectDataset: rs.fn().mockResolvedValue(connection),
  }
  rs.mocked(VQuery).mockImplementation(function () {
    return engine as unknown as InstanceType<typeof VQuery>
  })
  const { registerDemoConnector, DEMO_CONNECTOR_ID } = await import('../components/demoConnector')
  registerDemoConnector()
  registerDemoConnector()
  expect(VBI.connectors.register).toHaveBeenCalledTimes(1)
  expect(VQuery).not.toHaveBeenCalled()
  const factory = rs.mocked(VBI.connectors.register).mock.calls[0][1] as VBIConnectorFactory
  const props = { queryDSL: { select: ['sales'] }, schema: [], connectorId: DEMO_CONNECTOR_ID }
  return { factory, props, engine, connection, VQuery }
}

test('shares lazy dataset initialization across concurrent connector resolutions', async () => {
  const { factory, props, engine, connection, VQuery } = await setup()
  const [first, second] = await Promise.all([factory(), factory()])
  await expect(Promise.all([first.query(props), second.query(props)])).resolves.toEqual([
    { dataset: [{ sales: 42 }] },
    { dataset: [{ sales: 42 }] },
  ])
  expect(VQuery).toHaveBeenCalledTimes(1)
  expect(engine.createDataset).toHaveBeenCalledTimes(1)
  expect(connection.disconnect).toHaveBeenCalledTimes(2)
  await expect(first.discoverSchema()).resolves.toContainEqual({ name: 'sales', type: 'number' })
})

test('reuses an existing dataset without creating it again', async () => {
  const { factory, props, engine } = await setup(true)
  const connector = await factory()
  await connector.query(props)
  expect(engine.createDataset).not.toHaveBeenCalled()
})

test('retries a failed dataset initialization on the next query', async () => {
  const { factory, props, engine } = await setup()
  engine.createDataset.mockRejectedValueOnce(new Error('Temporary download failure'))
  const connector = await factory()
  await expect(connector.query(props)).rejects.toThrow('Temporary download failure')
  await expect(connector.query(props)).resolves.toEqual({ dataset: [{ sales: 42 }] })
  expect(engine.createDataset).toHaveBeenCalledTimes(2)
})
