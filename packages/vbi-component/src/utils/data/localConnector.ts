import { VBI, type VBIChartBuilder, type VBIConnector } from '@visactor/vbi'
import { VQuery, type DatasetColumn, type RawDatasetSource, type VQueryDSL } from '@visactor/vquery'
import { randomShortId } from '../random'
import {
  inferSchema,
  inferSchemaFromRows,
  normalizeDataset,
  rowsToDataset,
  type LocalRow,
  type QueryValue,
} from './dataset'

export { getFieldSelections, inferSchemaFromRows, normalizeDataset, normalizeMeasureValue } from './dataset'
export type { FieldSelection, LocalRow, LocalValue, QueryValue } from './dataset'

export class LocalConnector {
  public readonly id: string
  private localData: LocalRow[] = []
  private localSchema: DatasetColumn[] | null = null
  private datasetNeedsRefresh = true
  private vquery = new VQuery()

  constructor(id?: string) {
    this.id = id || `local_${randomShortId()}`
  }

  public setDataWithSchema(data: LocalRow[], schema: DatasetColumn[] | null): void {
    this.localData = data
    this.localSchema = schema
    this.datasetNeedsRefresh = true
  }

  public async loadCsvData(source: string | File, schema?: DatasetColumn[] | null): Promise<void> {
    let csv: string

    if (typeof source === 'string') {
      const response = await fetch(source)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      csv = await response.text()
    } else {
      csv = await source.text()
    }

    const { parseCsv } = await import('./parseCsv')
    const [headerRow = [], ...dataRows] = parseCsv(csv)

    const headers = headerRow.map((h) => h.trim())
    const finalSchema = schema || inferSchema(headers, dataRows)

    const data = rowsToDataset(headers, dataRows, finalSchema)
    this.setDataWithSchema(data, finalSchema)
  }

  public register(): string {
    VBI.connectors.register(
      this.id,
      async (): Promise<VBIConnector> => ({
        discoverSchema: async () => {
          if (this.localSchema) return this.localSchema
          return this.localData.length === 0 ? [] : inferSchemaFromRows(this.localData)
        },
        query: async ({ queryDSL, schema }) => {
          if ((await this.vquery.hasDataset(this.id)) && this.datasetNeedsRefresh) {
            await this.vquery.dropDataset(this.id)
          }
          if (!(await this.vquery.hasDataset(this.id))) {
            if (this.localData.length === 0) return { dataset: [] }
            await this.vquery.createDataset(
              this.id,
              schema as DatasetColumn[],
              { rawDataset: this.localData, type: 'json' } as RawDatasetSource,
            )
            this.datasetNeedsRefresh = false
          }
          const dataset = await this.vquery.connectDataset(this.id)
          const dsl = queryDSL as VQueryDSL<Record<string, QueryValue>>
          const result = await dataset.query(dsl)
          return { dataset: normalizeDataset(dsl, result.dataset as LocalRow[]) }
        },
      }),
    )
    return this.id
  }

  public createBuilder(): VBIChartBuilder {
    return VBI.chart.create(VBI.chart.createEmpty(this.id))
  }
}

export async function createDefaultBuilder(): Promise<VBIChartBuilder> {
  const connector = new LocalConnector()

  try {
    const { supermarketSchema } = await import('./supermarketSchema')
    await connector.loadCsvData('https://visactor.github.io/VBI/dataset/supermarket.csv', supermarketSchema)
  } catch (error) {
    console.error(error)
  }

  connector.register()
  return connector.createBuilder()
}
