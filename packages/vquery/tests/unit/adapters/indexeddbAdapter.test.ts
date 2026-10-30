import { IndexedDBAdapter } from '../../../src/adapters/storage/indexeddbAdapter'
import type { DatasetSchema } from '../../../src/types/DataSet'
import type { DatasetSource } from '../../../src/types'

describe('IndexedDBAdapter', () => {
  let adapter: IndexedDBAdapter
  let mockDB: any
  let mockTransaction: any
  let mockStore: any

  const datasetId = 'test_dataset'
  const schema: DatasetSchema = { datasetId, datasetAlias: 'test_alias', columns: [] }
  const source: DatasetSource = { type: 'json', blob: new Blob([]) }

  beforeEach(() => {
    mockStore = {
      put: rs.fn(),
      get: rs.fn(),
      delete: rs.fn(),
      getAll: rs.fn(),
    }
    mockTransaction = {
      objectStore: rs.fn().mockReturnValue(mockStore),
    }
    mockDB = {
      createObjectStore: rs.fn(),
      transaction: rs.fn().mockReturnValue(mockTransaction),
      close: rs.fn(),
      objectStoreNames: {
        contains: rs.fn().mockReturnValue(false),
      },
    }

    // Mock global indexedDB
    global.indexedDB = {
      open: rs.fn().mockImplementation(() => {
        const request: any = {}
        setTimeout(() => {
          // Simulate upgrade needed first
          if (request.onupgradeneeded) {
            request.result = mockDB
            request.onupgradeneeded({ target: request })
          }
          // Then success
          if (request.onsuccess) {
            request.result = mockDB
            request.onsuccess({ target: request })
          }
        }, 0)
        return request
      }),
    } as any

    adapter = new IndexedDBAdapter()
  })

  afterEach(async () => {
    await adapter.close()
  })

  it('should open database and create object store', async () => {
    await adapter.open()
    expect(global.indexedDB.open).toHaveBeenCalled()
    expect(mockDB.createObjectStore).toHaveBeenCalled()
  })

  it('should not create object store if it already exists', async () => {
    mockDB.objectStoreNames.contains.mockReturnValue(true)
    await adapter.open()
    expect(mockDB.createObjectStore).not.toHaveBeenCalled()
  })

  it('should write dataset', async () => {
    mockStore.put.mockImplementation(() => {
      const req: any = {}
      setTimeout(() => req.onsuccess && req.onsuccess(), 0)
      return req
    })

    await adapter.open()
    await adapter.writeDataset(datasetId, schema, source)
    expect(mockStore.put).toHaveBeenCalledWith({ datasetId, datasetSchema: schema, datasetSource: source })
  })

  it('should read dataset', async () => {
    const expectedRecord = { datasetId, datasetSchema: schema, datasetSource: source }
    mockStore.get.mockImplementation(() => {
      const req: any = { result: expectedRecord }
      setTimeout(() => req.onsuccess && req.onsuccess({ target: req }), 0)
      return req
    })

    await adapter.open()
    const result = await adapter.readDataset(datasetId)
    expect(result).toEqual(expectedRecord)
  })

  it('should return null if dataset not found', async () => {
    mockStore.get.mockImplementation(() => {
      const req: any = { result: undefined }
      setTimeout(() => req.onsuccess && req.onsuccess({ target: req }), 0)
      return req
    })
    await adapter.open()
    const result = await adapter.readDataset(datasetId)
    expect(result).toBeNull()
  })

  it('should delete dataset', async () => {
    mockStore.delete.mockImplementation(() => {
      const req: any = {}
      setTimeout(() => req.onsuccess && req.onsuccess(), 0)
      return req
    })

    await adapter.open()
    await adapter.deleteDataset(datasetId)
    expect(mockStore.delete).toHaveBeenCalledWith(datasetId)
  })

  it('should list datasets', async () => {
    const records = [{ datasetId, datasetSchema: schema }]
    mockStore.getAll.mockImplementation(() => {
      const req: any = { result: records }
      setTimeout(() => req.onsuccess && req.onsuccess({ target: req }), 0)
      return req
    })

    await adapter.open()
    const list = await adapter.listDatasets()
    expect(list).toEqual(records)
  })

  it('should handle open error', async () => {
    ;(global.indexedDB.open as any).mockImplementation(() => {
      const request: any = {}
      setTimeout(() => {
        if (request.onerror) {
          request.error = new Error('Open failed')
          request.onerror({ target: request })
        }
      }, 0)
      return request
    })

    await expect(adapter.open()).rejects.toThrow('Open failed')
  })

  it('should throw error if db is not open', async () => {
    // Don't call open()
    await expect(adapter.writeDataset(datasetId, schema)).rejects.toBe('DB is not open')
  })

  it('should throw error when deleting dataset if db is not open', async () => {
    await expect(adapter.deleteDataset(datasetId)).rejects.toBe('DB is not open')
  })

  it('should handle delete error', async () => {
    mockStore.delete.mockImplementation(() => {
      const req: any = {}
      setTimeout(() => {
        if (req.onerror) {
          req.error = new Error('Delete failed')
          req.onerror({ target: req })
        }
      }, 0)
      return req
    })
    await adapter.open()
    await expect(adapter.deleteDataset(datasetId)).rejects.toThrow('Delete failed')
  })

  it('should throw error when listing datasets if db is not open', async () => {
    await expect(adapter.listDatasets()).rejects.toBe('DB is not open')
  })

  it('should handle list error', async () => {
    mockStore.getAll.mockImplementation(() => {
      const req: any = {}
      setTimeout(() => {
        if (req.onerror) {
          req.error = new Error('List failed')
          req.onerror({ target: req })
        }
      }, 0)
      return req
    })
    await adapter.open()
    await expect(adapter.listDatasets()).rejects.toThrow('List failed')
  })

  it('should handle write error', async () => {
    mockStore.put.mockImplementation(() => {
      const req: any = {}
      setTimeout(() => {
        if (req.onerror) {
          req.error = new Error('Write failed')
          req.onerror({ target: req })
        }
      }, 0)
      return req
    })
    await adapter.open()
    await expect(adapter.writeDataset(datasetId, schema, source)).rejects.toThrow('Write failed')
  })

  it('should throw error when reading dataset if db is not open', async () => {
    await expect(adapter.readDataset(datasetId)).rejects.toBe('DB is not open')
  })

  it('should handle read error', async () => {
    mockStore.get.mockImplementation(() => {
      const req: any = {}
      setTimeout(() => {
        if (req.onerror) {
          req.error = new Error('Read failed')
          req.onerror({ target: req })
        }
      }, 0)
      return req
    })
    await adapter.open()
    await expect(adapter.readDataset(datasetId)).rejects.toThrow('Read failed')
  })
})
