import { InMemoryAdapter } from '../../../src/adapters/storage/inmemoryAdapter'
import type { DatasetSchema } from '../../../src/types/DataSet'
import type { DatasetSource } from '../../../src/types'

describe('InMemoryAdapter', () => {
  let adapter: InMemoryAdapter
  const datasetId = 'test_dataset'
  const schema: DatasetSchema = {
    datasetId,
    datasetAlias: 'Test Dataset',
    columns: [{ name: 'id', type: 'string' }],
  }
  const source: DatasetSource = {
    type: 'json',
    blob: new Blob([JSON.stringify([{ id: '1' }])]),
  }

  beforeEach(async () => {
    adapter = new InMemoryAdapter()
    await adapter.open()
  })

  afterEach(async () => {
    await adapter.close()
  })

  it('should write and read dataset', async () => {
    await adapter.writeDataset(datasetId, schema, source)
    const result = await adapter.readDataset(datasetId)
    expect(result).toBeDefined()
    expect(result?.datasetSchema).toEqual(schema)
    expect(result?.datasetSource).toEqual(source)
  })

  it('should return null when reading non-existent dataset', async () => {
    const result = await adapter.readDataset('non_existent')
    expect(result).toBeNull()
  })

  it('should list datasets', async () => {
    await adapter.writeDataset(datasetId, schema, source)
    await adapter.writeDataset('other', { ...schema, datasetId: 'other' })

    const list = await adapter.listDatasets()
    expect(list).toHaveLength(2)
    expect(list.find((d) => d.datasetId === datasetId)).toBeDefined()
    expect(list.find((d) => d.datasetId === 'other')).toBeDefined()
  })

  it('should delete dataset', async () => {
    await adapter.writeDataset(datasetId, schema, source)
    await adapter.deleteDataset(datasetId)
    const result = await adapter.readDataset(datasetId)
    expect(result).toBeNull()
  })

  it('should clear datasets on close', async () => {
    await adapter.writeDataset(datasetId, schema, source)
    await adapter.close()

    // Re-open to check if it was cleared (implementation re-initializes map on open)
    await adapter.open()
    const result = await adapter.readDataset(datasetId)
    expect(result).toBeNull()
  })
})
