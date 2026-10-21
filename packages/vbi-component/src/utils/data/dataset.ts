import { type DatasetColumn, type VQueryDSL } from '@visactor/vquery'

export type LocalValue = string | number | boolean | null | undefined
export type LocalRow = Record<string, LocalValue>
export type QueryValue = string | number
export type FieldSelection = { alias: string; field: string }

function isLikelyDate(value: string): boolean {
  if (!value || value.length < 6) return false
  return /[-/]/.test(value) && !Number.isNaN(Date.parse(value))
}

export function inferSchema(headers: string[], rows: string[][]): DatasetColumn[] {
  return headers.map((header, index) => {
    const values = rows
      .map((row) => row[index]?.trim() ?? '')
      .filter((value) => value.length > 0)
      .slice(0, 100) // Sample first 100 rows

    if (values.length > 0 && values.every((value) => Number.isFinite(Number(value)))) {
      return { name: header, type: 'number' }
    }

    if (values.length > 0 && values.every(isLikelyDate)) {
      return { name: header, type: 'date' }
    }

    return { name: header, type: 'string' }
  })
}

export function inferSchemaFromRows(data: LocalRow[]): DatasetColumn[] {
  const firstRow = data[0]
  if (!firstRow) {
    return []
  }

  return Object.entries(firstRow).map(([name, value]) => ({
    name,
    type: typeof value === 'number' ? 'number' : 'string',
  }))
}

export function rowsToDataset(headers: string[], rows: string[][], schema: DatasetColumn[]): LocalRow[] {
  const schemaByName = new Map(schema.map((field) => [field.name, field.type]))

  return rows
    .map((values) => {
      const row: LocalRow = {}

      headers.forEach((header, index) => {
        const rawValue = values[index]?.trim() ?? ''
        const fieldType = schemaByName.get(header)

        if (fieldType === 'number') {
          const numValue = Number(rawValue)
          row[header] = rawValue === '' || Number.isNaN(numValue) ? null : numValue
          return
        }

        row[header] = rawValue
      })

      return row
    })
    .filter((row) => Object.values(row).some((value) => value !== '' && value !== null))
}

// Date aggregations return dimension labels, including numeric-looking years.
const dateAggregateFunctions = new Set([
  'to_year',
  'to_quarter',
  'to_month',
  'to_week',
  'to_day',
  'to_hour',
  'to_minute',
  'to_second',
])

export function getFieldSelections(queryDSL: VQueryDSL<Record<string, QueryValue>>): {
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

    if (item.aggr?.func && !dateAggregateFunctions.has(item.aggr.func)) {
      measureFields.push({ alias, field })
      continue
    }

    dimensionFields.push({ alias, field })
  }

  return { dimensionFields, measureFields }
}

export function normalizeMeasureValue(value: unknown): number | null {
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

export function normalizeDataset(queryDSL: VQueryDSL<Record<string, QueryValue>>, dataset: LocalRow[]): LocalRow[] {
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
