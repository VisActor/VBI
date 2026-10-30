import type { DatasetSource, StorageAdapter } from '../../types'
import type { DatasetSchema } from '../../types/DataSet'
import { idbPut, idbGet, idbDelete, idbGetAll } from './idb-helpers'

type StoredDataset = {
  datasetId: string
  datasetSchema: DatasetSchema
  datasetSource?: DatasetSource
}

export class IndexedDBAdapter implements StorageAdapter {
  private db: IDBDatabase | null = null
  private dbName: string
  private datasetStoreName = 'vqueryDatasets'

  constructor(dbName: string = 'vquery') {
    this.dbName = dbName
  }

  public open = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 2)

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(this.datasetStoreName)) {
          db.createObjectStore(this.datasetStoreName, { keyPath: 'datasetId' })
        }
      }

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result
        resolve()
      }

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error)
      }
    })
  }

  public close = async (): Promise<void> => {
    if (this.db) {
      this.db.close()
      this.db = null
    }
  }

  public writeDataset = (
    datasetId: string,
    datasetSchema: DatasetSchema,
    datasetSource?: DatasetSource,
  ): Promise<void> => {
    if (!this.db) {
      return Promise.reject('DB is not open')
    }
    const record: StoredDataset = { datasetId, datasetSchema, datasetSource }
    return idbPut(this.db, this.datasetStoreName, record).then(() => undefined)
  }

  public readDataset = async (
    datasetId: string,
  ): Promise<{ datasetSource?: DatasetSource; datasetSchema: DatasetSchema } | null> => {
    if (!this.db) {
      return Promise.reject('DB is not open')
    }
    const result = await idbGet<StoredDataset>(this.db, this.datasetStoreName, datasetId)
    return result ?? null
  }

  public deleteDataset = (datasetId: string): Promise<void> => {
    if (!this.db) {
      return Promise.reject('DB is not open')
    }
    return idbDelete(this.db, this.datasetStoreName, datasetId).then(() => undefined)
  }

  public listDatasets = async (): Promise<
    { datasetId: string; dataSource?: DatasetSource; datasetSchema: DatasetSchema }[]
  > => {
    if (!this.db) {
      return Promise.reject('DB is not open')
    }
    return idbGetAll<StoredDataset>(this.db, this.datasetStoreName)
  }
}
