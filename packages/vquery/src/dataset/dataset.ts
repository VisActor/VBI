import type {
  DatasetColumn,
  DatasetSource,
  RawDatasetSource,
  QueryDSL,
  QueryAdapter,
  StorageAdapter,
  VQueryDSL,
} from '../types'
import { convertDSLToDuckDB } from '../sql-builder'
import { DatasetSourceBuilder } from '../data-source-builder'

export class Dataset {
  private queryAdapter: QueryAdapter
  private storageAdapter: StorageAdapter
  private _datasetId: string

  constructor(queryAdapter: QueryAdapter, storageAdapter: StorageAdapter, datasetId: string) {
    this.queryAdapter = queryAdapter
    this.storageAdapter = storageAdapter
    this._datasetId = datasetId
  }

  public async init(temporaryColumns?: DatasetColumn[], temporaryDatasetSource?: DatasetSource) {
    const datasetInfo = await this.storageAdapter.readDataset(this._datasetId)
    if (!datasetInfo) {
      throw new Error(`Dataset ${this._datasetId} not found`)
    }

    const columns = temporaryColumns ?? datasetInfo.datasetSchema.columns
    const datasetSource = temporaryDatasetSource ?? datasetInfo.datasetSource

    if (columns.length > 0 && datasetSource) {
      await this.createOrReplaceView(columns, datasetSource)
    }
  }

  public async createOrReplaceView(columns: DatasetColumn[], datasetSource: DatasetSource) {
    if (!datasetSource) {
      return
    }

    if (!['csv', 'json'].includes(datasetSource.type)) {
      throw new Error(`Unsupported dataSource type: ${datasetSource.type}`)
    }
    await this.queryAdapter.loadDataset(this._datasetId, columns, datasetSource)
  }

  /**
   * Replace the stored schema/source and reload this connected dataset, preserving its alias.
   * Operations on the connection must be ordered by the caller. If reloading fails, the updated
   * metadata remains stored; call init() to retry. An empty schema follows init() and skips loading.
   */
  public async replaceSource(columns: DatasetColumn[], rawDatasetSource: RawDatasetSource): Promise<void> {
    const datasetInfo = await this.storageAdapter.readDataset(this._datasetId)
    if (!datasetInfo) {
      throw new Error(`Dataset ${this._datasetId} not found`)
    }

    const datasetSource = await DatasetSourceBuilder.from(rawDatasetSource).build()
    await this.storageAdapter.writeDataset(this._datasetId, { ...datasetInfo.datasetSchema, columns }, datasetSource)
    await this.init()
  }

  public async query<T extends Record<string, number | string>>(queryDSL: QueryDSL<T> | VQueryDSL<T>) {
    const sql = convertDSLToDuckDB(queryDSL, this.datasetId)
    return this.queryBySQL(sql)
  }

  public async queryBySQL(sql: string) {
    const start = performance.now()
    const result = await this.queryAdapter.query(sql)
    const end = performance.now()

    return {
      ...result,
      performance: {
        startAt: start.toFixed(3),
        endAt: end.toFixed(3),
        duration: end - start,
      },
    }
  }

  public async disconnect() {
    await this.queryAdapter.dropDataset(this._datasetId)
  }

  get datasetId() {
    return this._datasetId
  }
}
