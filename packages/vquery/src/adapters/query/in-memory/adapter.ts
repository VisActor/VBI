import { loadRows } from '../../../dataset/source/loadRows'
import type { DataRow } from '../../../dataset/types'
import { executeSQL } from './execute'
import { parseSQL } from '../../../sql/parser'
import type { DatasetColumn, DatasetSource, QueryAdapter } from '../../../types'

class InMemoryTable {
  public readonly numRows: number

  constructor(private readonly rows: DataRow[]) {
    this.numRows = rows.length
  }

  public toArray(): DataRow[] {
    return [...this.rows]
  }
}

type LoadedDataset = { columns: DatasetColumn[]; rows: DataRow[] }

export class InMemoryQueryAdapter implements QueryAdapter {
  private isOpen = false
  private datasets = new Map<string, LoadedDataset>()

  public open = async (): Promise<void> => {
    this.isOpen = true
    this.datasets.clear()
  }

  public close = async (): Promise<void> => {
    this.isOpen = false
    this.datasets.clear()
  }

  private checkOpen(): void {
    if (!this.isOpen) throw new Error('query adapter is not open')
  }

  public loadDataset = async (datasetId: string, columns: DatasetColumn[], source: DatasetSource): Promise<void> => {
    this.checkOpen()
    this.datasets.set(datasetId, { columns, rows: await loadRows(source, columns) })
  }

  public dropDataset = async (datasetId: string): Promise<void> => {
    this.checkOpen()
    this.datasets.delete(datasetId)
  }

  public query = async (sql: string) => {
    this.checkOpen()
    const query = parseSQL(sql)
    let source = query
    while (source.subquery) source = source.subquery
    const rows = source.table ? this.datasets.get(source.table)?.rows : [{}]
    if (!rows) throw new Error(`Dataset ${source.table} is not loaded`)
    const dataset = executeSQL(query, rows)
    return { dataset, table: new InMemoryTable(dataset) }
  }

  public getSchema = async (datasetId: string) => {
    this.checkOpen()
    const dataset = this.datasets.get(datasetId)
    if (!dataset) throw new Error(`Dataset ${datasetId} is not loaded`)
    return dataset.columns.map((column, cid) => ({
      cid,
      name: column.name,
      type: column.type,
      notnull: false,
      dflt_value: null,
      pk: false,
    }))
  }
}
