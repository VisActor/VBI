import { VBI, type VBIChartBuilder, type VBIConnector } from '@visactor/vbi'
import { VQuery, type DatasetColumn, type RawDatasetSource, type VQueryDSL } from '@visactor/vquery'
import {
  PROFESSIONAL_DEFAULT_LIMIT,
  PROFESSIONAL_DEFAULT_LOCALE,
  PROFESSIONAL_DEFAULT_THEME,
} from 'src/constants/builder'
import { inferSchema, normalizeDataset, rowsToDataset, type LocalRow } from './localDataset'
import { parseCsv } from './parseCsv'
import { supermarketSchema } from './supermarketSchema'

export const CONNECTOR_ID = 'professionalLocalData'

type QueryValue = string | number

let localData: LocalRow[] = []
let localSchema: DatasetColumn[] | null = null
let datasetNeedsRefresh = true
let demoDataPromise: Promise<void> | null = null
let connectorRegistered = false

export const setLocalDataWithSchema = (data: LocalRow[], schema: DatasetColumn[] | null) => {
  localData = data
  localSchema = schema
  datasetNeedsRefresh = true
  demoDataPromise = null
}

export const getLocalData = () => localData

const loadDemoData = async () => {
  if (localData.length > 0 || localSchema) return
  const response = await fetch('https://visactor.github.io/VBI/dataset/supermarket.csv')
  if (!response.ok) throw new Error(`Failed to fetch demo data: ${response.status}`)
  const [headerRow = [], ...dataRows] = parseCsv(await response.text())
  const headers = headerRow.map((item) => item.trim())
  setLocalDataWithSchema(rowsToDataset(headers, dataRows, supermarketSchema), supermarketSchema)
}

const ensureDemoDataLoaded = async () => {
  if (localData.length > 0) return
  demoDataPromise ??= loadDemoData().finally(() => {
    demoDataPromise = null
  })
  await demoDataPromise
}

export const createLocalConnector = (connectorId = CONNECTOR_ID) => {
  if (connectorRegistered) return connectorId
  connectorRegistered = true
  const vquery = new VQuery()

  VBI.connectors.register(
    connectorId,
    async (): Promise<VBIConnector> => ({
      discoverSchema: async () => localSchema ?? (localData.length ? inferSchema(localData) : []),
      query: async ({ queryDSL, schema }) => {
        if ((await vquery.hasDataset(connectorId)) && datasetNeedsRefresh) await vquery.dropDataset(connectorId)
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

export const createDefaultBuilder = (): VBIChartBuilder => {
  createLocalConnector()
  const builder = VBI.chart.create(VBI.chart.createEmpty(CONNECTOR_ID))
  builder.locale.setLocale(PROFESSIONAL_DEFAULT_LOCALE)
  builder.theme.setTheme(PROFESSIONAL_DEFAULT_THEME)
  builder.limit.setLimit(PROFESSIONAL_DEFAULT_LIMIT)
  return builder
}

export const initVBIConnector = async () => {
  createLocalConnector()
  await ensureDemoDataLoaded()
}
