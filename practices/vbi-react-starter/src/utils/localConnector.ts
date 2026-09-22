import { VBI, type VBIConnector } from '@visactor/vbi'
import { VQuery, type DatasetColumn, type RawDatasetSource, type VQueryDSL } from '@visactor/vquery'

type QueryValue = string | number

export type LocalValue = string | number | boolean | null | undefined
export type LocalRow = Record<string, LocalValue>
type FieldSelection = {
  alias: string
  field: string
}

let localData: LocalRow[] = []
let localSchema: DatasetColumn[] | null = null
let datasetNeedsRefresh = true

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

export function createLocalConnector(connectorId: string) {
  const vquery = new VQuery()

  VBI.connectors.register(
    connectorId,
    async (): Promise<VBIConnector> => ({
      discoverSchema: async () => {
        if (localSchema) {
          return localSchema
        }

        if (localData.length === 0) {
          return []
        }

        return inferSchema(localData)
      },

      query: async ({ queryDSL, schema }) => {
        const hasDataset = await vquery.hasDataset(connectorId)

        if (hasDataset && datasetNeedsRefresh) {
          await vquery.dropDataset(connectorId)
        }

        if (!(await vquery.hasDataset(connectorId))) {
          if (localData.length === 0) {
            return { dataset: [] }
          }

          await vquery.createDataset(
            connectorId,
            schema as DatasetColumn[],
            { rawDataset: localData, type: 'json' } as RawDatasetSource,
          )
          datasetNeedsRefresh = false
        }

        const dataset = await vquery.connectDataset(connectorId)
        const typedQueryDSL = queryDSL as VQueryDSL<Record<string, QueryValue>>
        const queryResult = await dataset.query(typedQueryDSL)

        return {
          dataset: normalizeDataset(typedQueryDSL, queryResult.dataset as LocalRow[]),
        }
      },
    }),
  )

  return connectorId
}

export function setLocalDataWithSchema(data: LocalRow[], schema: DatasetColumn[] | null) {
  localData = data
  localSchema = schema
  datasetNeedsRefresh = true
}
