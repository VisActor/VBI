import { describe, expect, it, vi } from '@stencil/vitest'
import { VBI } from '@visactor/vbi'
import { type DatasetColumn, type VQueryDSL } from '@visactor/vquery'
import { LocalConnector, type LocalRow } from 'src/utils/data/localConnector'

describe('LocalConnector', () => {
  it('should initialize with a random id or provided id', () => {
    const connector1 = new LocalConnector()
    const connector2 = new LocalConnector('custom_id')

    expect(connector1.id).toMatch(/^local_/)
    expect(connector2.id).toBe('custom_id')
  })

  it('should register connector and discover schema (both inferred and explicit)', async () => {
    const connector = new LocalConnector('conn_discover')
    const registeredId = connector.register()
    expect(registeredId).toBe('conn_discover')

    const connectorImpl = await VBI.connectors.get('conn_discover')
    expect(connectorImpl).toBeDefined()

    // Without data, discoverSchema should return empty schema
    let schema = await connectorImpl.discoverSchema()
    expect(schema).toEqual([])

    // Set data without explicit schema -> inferSchema
    const data: LocalRow[] = [{ id: 1, name: 'Alice', score: 95.5, active: true }]
    connector.setDataWithSchema(data, null)
    schema = await connectorImpl.discoverSchema()
    expect(schema).toEqual([
      { name: 'id', type: 'number' },
      { name: 'name', type: 'string' },
      { name: 'score', type: 'number' },
      { name: 'active', type: 'string' },
    ])

    // Set data with explicit schema -> return explicit schema
    const explicitSchema: DatasetColumn[] = [
      { name: 'id', type: 'number' },
      { name: 'name', type: 'string' },
    ]
    connector.setDataWithSchema(data, explicitSchema)
    schema = await connectorImpl.discoverSchema()
    expect(schema).toEqual(explicitSchema)
  })

  it('should execute query and normalize measure values (e.g. converting BigInt count from DuckDB to Number)', async () => {
    const connector = new LocalConnector('conn_query')
    connector.register()

    const data: LocalRow[] = [
      { category: 'A', value: 10, bonus: 5 },
      { category: 'A', value: 20, bonus: null },
      { category: 'B', value: 15, bonus: 10 },
    ]
    const schema: DatasetColumn[] = [
      { name: 'category', type: 'string' },
      { name: 'value', type: 'number' },
      { name: 'bonus', type: 'number' },
    ]
    connector.setDataWithSchema(data, schema)

    const connectorImpl = await VBI.connectors.get('conn_query')

    const queryDSL: VQueryDSL<any> = {
      select: [
        { field: 'category', alias: 'Cat' },
        { field: 'value', alias: 'TotalValue', aggr: { func: 'sum' } },
        { field: 'category', alias: 'GroupCount', aggr: { func: 'count' } },
        { field: 'bonus', alias: 'AvgBonus', aggr: { func: 'avg' } },
      ],
      groupBy: ['category'],
    }

    const { dataset } = await connectorImpl.query({
      connectorId: 'conn_query',
      queryDSL,
      schema,
    })
    expect(dataset.length).toBe(2)

    // Verify normalizeDataset & normalizeMeasureValue logic:
    // GroupCount returns BigInt in DuckDB, which normalizeMeasureValue must convert to a standard number
    const rowA = dataset.find((r) => r.Cat === 'A')
    expect(rowA?.TotalValue).toBe(30)
    expect(typeof rowA?.GroupCount).toBe('number')
    expect(rowA?.GroupCount).toBe(2)
    expect(rowA?.AvgBonus).toBe(5)

    const rowB = dataset.find((r) => r.Cat === 'B')
    expect(rowB?.TotalValue).toBe(15)
    expect(typeof rowB?.GroupCount).toBe('number')
    expect(rowB?.GroupCount).toBe(1)
    expect(rowB?.AvgBonus).toBe(10)
  }, 30_000)

  it('should return empty dataset when querying connector with empty data', async () => {
    const connector = new LocalConnector('conn_empty')
    connector.register()
    const connectorImpl = await VBI.connectors.get('conn_empty')

    const { dataset } = await connectorImpl.query({
      connectorId: 'conn_empty',
      queryDSL: { select: ['category'] },
      schema: [],
    })
    expect(dataset).toEqual([])
  })

  it('should load CSV data from string url and parse headers and rows correctly', async () => {
    const connector = new LocalConnector('conn_csv')
    connector.register()

    // Mock fetch for URL source
    const csvContent = 'name,age\nAlice,30\nBob,25'
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      text: async () => csvContent,
    } as any)

    await connector.loadCsvData('https://example.com/data.csv')
    expect(fetchSpy).toHaveBeenCalledWith('https://example.com/data.csv')

    const regImpl = await VBI.connectors.get('conn_csv')
    const schema = await regImpl.discoverSchema()
    expect(schema).toEqual([
      { name: 'name', type: 'string' },
      { name: 'age', type: 'number' },
    ])

    const { dataset } = await regImpl.query({
      connectorId: 'conn_csv',
      queryDSL: { select: ['name', 'age'] },
      schema,
    })
    expect(dataset.length).toBe(2)
    expect(dataset[0]).toEqual({ name: 'Alice', age: 30 })

    fetchSpy.mockRestore()
  })

  it('should throw error when loading CSV data from failing URL', async () => {
    const connector = new LocalConnector('conn_csv_fail')
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as any)

    await expect(connector.loadCsvData('https://example.com/notfound.csv')).rejects.toThrow('HTTP 404')
    fetchSpy.mockRestore()
  })

  it('should create a VBI chart builder instance bound to the local connector id', () => {
    const connector = new LocalConnector('conn_builder')
    connector.register()

    const builder = connector.createBuilder()
    expect(builder).toBeDefined()
    expect(builder.dsl.get('connectorId')).toBe('conn_builder')
  })
})
