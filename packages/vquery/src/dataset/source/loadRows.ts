import type { DatasetColumn, DatasetSource } from '../../types'
import type { DataRow } from '../types'

const castValue = (value: unknown, column: DatasetColumn): unknown => {
  if (value === null || value === undefined || value === '') return null
  if (column.type === 'number') {
    const number = Number(value)
    return Number.isNaN(number) ? null : number
  }
  return typeof value === 'string' ? value : String(value)
}

const shapeRows = (rows: DataRow[], columns: DatasetColumn[]): DataRow[] => {
  if (columns.length === 0) return rows
  return rows.map((row) =>
    Object.fromEntries(columns.map((column) => [column.name, castValue(row[column.name], column)])),
  )
}

const parseCsvRows = (text: string): string[][] => {
  const rows: string[][] = []
  let row: string[] = []
  let value = ''
  let quoted = false

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index]
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        value += '"'
        index += 1
      } else if (character === '"') {
        quoted = false
      } else {
        value += character
      }
      continue
    }
    if (character === '"') quoted = true
    else if (character === ',') {
      row.push(value)
      value = ''
    } else if (character === '\n' || character === '\r') {
      if (character === '\r' && text[index + 1] === '\n') index += 1
      row.push(value)
      rows.push(row)
      row = []
      value = ''
    } else value += character
  }

  if (value.length > 0 || row.length > 0) {
    row.push(value)
    rows.push(row)
  }
  return rows
}

const parseCsv = (text: string): DataRow[] => {
  const rows = parseCsvRows(text.replace(/^\uFEFF/, ''))
  const headers = rows.shift() ?? []
  return rows
    .filter((row) => row.some((value) => value.length > 0))
    .map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ''])))
}

const parseJson = (text: string): DataRow[] => {
  const source = text.trim()
  if (!source) return []
  try {
    const value: unknown = JSON.parse(source)
    if (Array.isArray(value)) return value as DataRow[]
    if (value && typeof value === 'object') return [value as DataRow]
  } catch {
    return source
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => JSON.parse(line) as DataRow)
  }
  throw new Error('JSON dataset must contain an object or an array of objects')
}

export const loadRows = async (source: DatasetSource, columns: DatasetColumn[]): Promise<DataRow[]> => {
  const text = await source.blob.text()
  return shapeRows(source.type === 'csv' ? parseCsv(text) : parseJson(text), columns)
}
