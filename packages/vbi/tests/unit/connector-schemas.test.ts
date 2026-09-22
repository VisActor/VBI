import { zVBIEncoding } from 'src/types/chartDSL/encoding'
import { zVBIConnector, zVBIConnectorId } from 'src/types/connector/connector'
import { zVBIQueryProps, zVBIQueryResult } from 'src/types/connector/query'
import { zDiscoverSchema, zSchema } from 'src/types/connector/schema'

test('validates connector identifiers, schema columns and supported encodings', () => {
  expect(zVBIConnectorId.parse('sales')).toBe('sales')
  expect(zVBIConnectorId.safeParse(42).success).toBe(false)
  const schema = [{ name: 'sales', type: 'number' }]
  expect(zSchema.parse(schema)).toEqual(schema)
  expect(zSchema.safeParse([{ name: 'sales' }]).success).toBe(false)
  expect(zVBIEncoding.parse('color')).toBe('color')
  expect(zVBIEncoding.safeParse('unsupported').success).toBe(false)
})

test('preserves connector callbacks and query cancellation signals through validation', async () => {
  const schema = [{ name: 'sales', type: 'number' }]
  const discoverSchema = async () => schema
  const query = async () => ({ dataset: [{ sales: 42, missing: null, optional: undefined, active: true }] })
  const connector = zVBIConnector.parse({ discoverSchema, query })
  expect(zDiscoverSchema.parse(discoverSchema)).toBe(discoverSchema)
  await expect(connector.discoverSchema()).resolves.toEqual(schema)
  const props = {
    connectorId: 'sales',
    schema,
    queryDSL: { select: ['sales'] },
    signal: new AbortController().signal,
  }
  expect(zVBIQueryProps.parse(props)).toEqual(props)
  expect(zVBIQueryResult.parse(await connector.query(props))).toEqual(await query())
  expect(zVBIQueryResult.safeParse({ dataset: [{ nested: {} }] }).success).toBe(false)
})
