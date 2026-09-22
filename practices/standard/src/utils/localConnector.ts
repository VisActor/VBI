import { VBI, type VBIChartBuilder, type VBIConnector } from '@visactor/vbi'
import { VQuery, type DatasetColumn, type RawDatasetSource, type VQueryDSL } from '@visactor/vquery'
import { supermarketSchema } from './supermarketSchema'

export type LocalValue = string | number | boolean | null | undefined
export type LocalRow = Record<string, LocalValue>
type QueryValue = string | number
type FieldSelection = { alias: string; field: string }

export const CONNECTOR_ID = 'localDataConnector'

let localData: LocalRow[] = []
let localSchema: DatasetColumn[] | null = null
let datasetNeedsRefresh = true
let demoDataPromise: Promise<void> | null = null

export function setLocalDataWithSchema(data: LocalRow[], schema: DatasetColumn[] | null): void {
  localData = data
  localSchema = schema
  datasetNeedsRefresh = true
  demoDataPromise = null
}

function inferSchema(data: LocalRow[]): DatasetColumn[] {
  const firstRow = data[0]
  if (!firstRow) {
    return []
  }

  return Object.entries(firstRow).map(([name, value]) => ({
    name,
    type: typeof value === 'number' ? 'number' : 'string',
  }))
}

function getFieldSelections(queryDSL: VQueryDSL<Record<string, QueryValue>>): {
  dimensionFields: FieldSelection[]
  measureFields: FieldSelection[]
} {
  const dimensionFields: FieldSelection[] = []
  const measureFields: FieldSelection[] = []

  for (const item of queryDSL.select ?? []) {
    if (typeof item === 'string') {
      dimensionFields.push({ alias: item, field: item })
      continue
    }

    if (!item || typeof item !== 'object') {
      continue
    }

    const field = item.field
    const alias = item.alias ?? field

    if (!field || !alias) {
      continue
    }

    if (item.aggr?.func) {
      measureFields.push({ alias, field })
      continue
    }

    dimensionFields.push({ alias, field })
  }

  return { dimensionFields, measureFields }
}

function normalizeMeasureValue(value: unknown): number | null {
  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'bigint') {
    return Number(value)
  }

  if (typeof value === 'string') {
    const nextValue = Number(value)
    return Number.isNaN(nextValue) ? null : nextValue
  }

  return null
}

function normalizeDataset(queryDSL: VQueryDSL<Record<string, QueryValue>>, dataset: LocalRow[]): LocalRow[] {
  const { dimensionFields, measureFields } = getFieldSelections(queryDSL)

  if (dimensionFields.length === 0 && measureFields.length === 0) {
    return dataset
  }

  return dataset.map((row) => {
    const normalizedRow: LocalRow = {}

    for (const { alias, field } of measureFields) {
      const sourceKey = alias || field
      const nextValue = normalizeMeasureValue(row[sourceKey])
      if (nextValue !== null) {
        normalizedRow[sourceKey] = nextValue
      }
    }

    for (const { alias, field } of dimensionFields) {
      const sourceKey = alias || field
      if (sourceKey in row) {
        normalizedRow[sourceKey] = row[sourceKey]
      }
    }

    return normalizedRow
  })
}

async function fetchDemoData(): Promise<void> {
  if (localData.length > 0 || localSchema) return

  const response = await fetch('https://visactor.github.io/VBI/dataset/supermarket.csv')
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const csv = await response.text()
  const { parseCsv } = await import('./parseCsv')
  const { rowsToDataset } = await import('./dataset')
  const [headerRow = [], ...dataRows] = parseCsv(csv)
  const data = rowsToDataset(
    headerRow.map((h) => h.trim()),
    dataRows,
    supermarketSchema,
  )
  setLocalDataWithSchema(data, supermarketSchema)
}

async function ensureDemoDataLoaded(): Promise<void> {
  if (localData.length > 0) return
  if (!demoDataPromise) {
    demoDataPromise = fetchDemoData().finally(() => {
      demoDataPromise = null
    })
  }
  await demoDataPromise
}

export function createLocalConnector(connectorId: string): string {
  const vquery = new VQuery()
  VBI.connectors.register(
    connectorId,
    async (): Promise<VBIConnector> => ({
      discoverSchema: async () => {
        if (localSchema) return localSchema
        return localData.length === 0 ? [] : inferSchema(localData)
      },
      query: async ({ queryDSL, schema }) => {
        if ((await vquery.hasDataset(connectorId)) && datasetNeedsRefresh) {
          await vquery.dropDataset(connectorId)
        }
        if (!(await vquery.hasDataset(connectorId))) {
          if (localData.length === 0) return { dataset: [] }
          await vquery.createDataset(
            connectorId,
            schema as DatasetColumn[],
            { rawDataset: localData, type: 'json' } as RawDatasetSource,
          )
          datasetNeedsRefresh = false
        }
        const dataset = await vquery.connectDataset(connectorId)
        const dsl = queryDSL as VQueryDSL<Record<string, QueryValue>>
        const result = await dataset.query(dsl)
        return { dataset: normalizeDataset(dsl, result.dataset as LocalRow[]) }
      },
    }),
  )
  return connectorId
}

export const createDefaultBuilder = (): VBIChartBuilder => VBI.chart.create(VBI.chart.createEmpty(CONNECTOR_ID))

export async function initVBIConnector() {
  console.log('initVBIConnector')
  await ensureDemoDataLoaded()
  createLocalConnector(CONNECTOR_ID)
}
