import { type DatasetColumn } from '@visactor/vquery'
import { type LocalRow } from './localConnector'

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

export function rowsToDataset(headers: string[], rows: string[][], schema: DatasetColumn[]): LocalRow[] {
  return rows
    .map((values) => {
      const row: LocalRow = {}

      headers.forEach((header, index) => {
        const rawValue = values[index]?.trim() ?? ''
        // The schema editor preserves column order while allowing names and types to change.
        const field = schema[index]
        const name = field?.name ?? header
        const fieldType = field?.type

        if (fieldType === 'date') {
          // CSV calendar dates need a comparable representation for date ranges.
          const parts = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.exec(rawValue)
          if (parts) {
            row[name] = `${parts[1]}-${parts[2].padStart(2, '0')}-${parts[3].padStart(2, '0')}`
            return
          }
        }

        if (fieldType === 'number') {
          const numValue = Number(rawValue)
          row[name] = rawValue === '' || !Number.isFinite(numValue) ? null : numValue
          return
        }

        row[name] = rawValue
      })

      return row
    })
    .filter((row) => Object.values(row).some((value) => value !== '' && value !== null))
}
