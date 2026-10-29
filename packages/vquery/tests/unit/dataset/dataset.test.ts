import { Dataset } from '@visactor/vquery'
import type { QueryAdapter, StorageAdapter, DatasetSource } from '@visactor/vquery'
import type { QueryResult } from '../../../src/types/DataSet'
import type { DatasetSchema } from '../../../src/types/DataSet'

class MockQueryAdapter implements QueryAdapter {
  open = async () => {}
  close = async () => {}
  loadDataset = async () => {}
  dropDataset = async () => {}
  query = async (): Promise<QueryResult & { table: unknown }> => ({ dataset: [], table: {} })
  getSchema = async () => []
}

class MockStorageAdapter implements StorageAdapter {
  private datasets = new Map<
    string,
    { datasetId: string; datasetSchema: DatasetSchema; datasetSource?: DatasetSource }
  >()
  open = async () => {}
  close = async () => {}
  writeDataset = async (id: string, schema: DatasetSchema, source?: DatasetSource) => {
    this.datasets.set(id, { datasetId: id, datasetSchema: schema, datasetSource: source })
  }
  readDataset = async (id: string) => this.datasets.get(id) || null
  deleteDataset = async (id: string) => {
    this.datasets.delete(id)
  }
  listDatasets = async () => Array.from(this.datasets.values())
}

describe('Dataset', () => {
  let dataset: Dataset
  let queryAdapter: MockQueryAdapter
  let storageAdapter: MockStorageAdapter
  const datasetId = 'test_dataset'

  beforeEach(() => {
    queryAdapter = new MockQueryAdapter()
    storageAdapter = new MockStorageAdapter()
    dataset = new Dataset(queryAdapter, storageAdapter, datasetId)
  })

  it('should throw error when initializing non-existent dataset', async () => {
    await expect(dataset.init()).rejects.toThrow(`Dataset ${datasetId} not found`)
  })

  it('should initialize with existing dataset', async () => {
    await storageAdapter.writeDataset(
      datasetId,
      { datasetId, datasetAlias: datasetId, columns: [] },
      { type: 'csv', blob: new Blob([]) },
    )
    await expect(dataset.init()).resolves.not.toThrow()
  })

  it('should handle unsupported data source type', async () => {
    const source: DatasetSource = { type: 'unknown' as any, blob: new Blob([]) }
    await expect(dataset.createOrReplaceView([], source)).rejects.toThrow('Unsupported dataSource type: unknown')
  })

  it('should skip view creation if source is missing', async () => {
    await expect(dataset.createOrReplaceView([], undefined as any)).resolves.not.toThrow()
  })

  describe('replaceSource', () => {
    const columns = [{ name: 'sales', type: 'number' as const }]
    const prepare = () =>
      storageAdapter.writeDataset(
        datasetId,
        { datasetId, datasetAlias: 'Revenue', columns },
        { type: 'json', blob: new Blob(['[{"sales":10}]']) },
      )

    it('rejects a missing dataset without loading or creating metadata', async () => {
      const load = rstest.spyOn(queryAdapter, 'loadDataset')
      await expect(dataset.replaceSource(columns, { type: 'json', rawDataset: [] })).rejects.toThrow(
        `Dataset ${datasetId} not found`,
      )
      expect(await storageAdapter.readDataset(datasetId)).toBeNull()
      expect(load).not.toHaveBeenCalled()
    })

    it('preserves dataset identity and alias while replacing the schema and loading the source', async () => {
      await prepare()
      const load = rstest.spyOn(queryAdapter, 'loadDataset')
      const nextColumns = [{ name: 'profit', type: 'number' as const }]
      await dataset.replaceSource(nextColumns, { type: 'json', rawDataset: [{ profit: 42 }] })
      const stored = await storageAdapter.readDataset(datasetId)
      expect(stored?.datasetSchema).toEqual({ datasetId, datasetAlias: 'Revenue', columns: nextColumns })
      expect(await stored?.datasetSource?.blob.text()).toBe('[{"profit":42}]')
      expect(load).toHaveBeenCalledWith(datasetId, nextColumns, stored?.datasetSource)
    })

    it('stores empty sources and follows init for an empty schema', async () => {
      await prepare()
      const load = rstest.spyOn(queryAdapter, 'loadDataset')
      await dataset.replaceSource([], { type: 'json', rawDataset: [] })
      expect(await (await storageAdapter.readDataset(datasetId))?.datasetSource?.blob.text()).toBe('[]')
      expect(load).not.toHaveBeenCalled()
    })

    it('retains the previous metadata if conversion or storage fails', async () => {
      await prepare()
      const original = await storageAdapter.readDataset(datasetId)
      const circular: any[] = []
      circular.push(circular)
      await expect(dataset.replaceSource(columns, { type: 'json', rawDataset: circular })).rejects.toThrow()
      expect(await storageAdapter.readDataset(datasetId)).toEqual(original)
      const write = rstest.spyOn(storageAdapter, 'writeDataset').mockRejectedValueOnce(new Error('storage failed'))
      await expect(dataset.replaceSource(columns, { type: 'json', rawDataset: [] })).rejects.toThrow('storage failed')
      expect(await storageAdapter.readDataset(datasetId)).toEqual(original)
      write.mockRestore()
    })

    it('keeps updated metadata after a load failure so init can retry', async () => {
      await prepare()
      const load = rstest.spyOn(queryAdapter, 'loadDataset').mockRejectedValueOnce(new Error('load failed'))
      await expect(dataset.replaceSource(columns, { type: 'csv', rawDataset: 'sales\n42' })).rejects.toThrow(
        'load failed',
      )
      const stored = await storageAdapter.readDataset(datasetId)
      expect(stored?.datasetSource?.type).toBe('csv')
      expect(await stored?.datasetSource?.blob.text()).toBe('sales\n42')
      await dataset.init()
      expect(load).toHaveBeenLastCalledWith(datasetId, columns, stored?.datasetSource)
    })
  })
})
