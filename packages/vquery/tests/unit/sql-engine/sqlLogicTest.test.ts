import fs from 'node:fs'
import path from 'node:path'

import { executeSQL, parseSQL } from '../../../src/query-engine/sql'
import type { DataRow } from '../../../src/data-loader'

type SortMode = 'nosort' | 'rowsort' | 'valuesort'

type QueryRecord = {
  expected: string[]
  kind: 'query'
  label?: string
  line: number
  sortMode: SortMode
  sql: string
  types: string[]
}

type StatementRecord = {
  kind: 'statement'
  line: number
  outcome: 'error' | 'ok'
  sql: string
}

type SQLLogicTestRecord = QueryRecord | StatementRecord
type Table = { columns: string[]; rows: DataRow[] }

const compareText = (left: string, right: string): number => (left < right ? -1 : left > right ? 1 : 0)

const parseRecord = (lines: string[], line: number, fileName: string): SQLLogicTestRecord => {
  const header = lines[0].trim().split(/\s+/)
  const separator = lines.indexOf('----')
  const sqlEnd = separator === -1 ? lines.length : separator
  const sql = lines.slice(1, sqlEnd).join('\n').trim()
  if (!sql) throw new Error(`${fileName}:${line}: SQL is empty`)

  if (header[0] === 'statement') {
    if ((header[1] !== 'ok' && header[1] !== 'error') || header.length !== 2) {
      throw new Error(`${fileName}:${line}: invalid statement record`)
    }
    return { kind: 'statement', line, outcome: header[1], sql }
  }
  if (header[0] !== 'query' || !/^[IRT]+$/.test(header[1] ?? '')) {
    throw new Error(`${fileName}:${line}: invalid query record`)
  }

  const sortModes: SortMode[] = ['nosort', 'rowsort', 'valuesort']
  const hasSortMode = sortModes.includes(header[2] as SortMode)
  const sortMode = hasSortMode ? (header[2] as SortMode) : 'nosort'
  const label = header[hasSortMode ? 3 : 2]

  return {
    expected: separator === -1 ? [] : lines.slice(separator + 1),
    kind: 'query',
    label,
    line,
    sortMode,
    sql,
    types: [...header[1]],
  }
}

const parseSQLLogicTest = (source: string, fileName: string): SQLLogicTestRecord[] => {
  const records: SQLLogicTestRecord[] = []
  let record: string[] = []
  let recordLine = 0

  const finishRecord = () => {
    if (record.length) records.push(parseRecord(record, recordLine, fileName))
    record = []
    recordLine = 0
  }

  for (const [index, rawLine] of source.replaceAll('\r\n', '\n').split('\n').entries()) {
    if (rawLine.trimStart().startsWith('#')) continue
    if (rawLine === '') {
      finishRecord()
      continue
    }
    if (!record.length) recordLine = index + 1
    record.push(rawLine)
  }
  finishRecord()
  return records
}

const splitTopLevel = (source: string, separator = ','): string[] => {
  const results: string[] = []
  let depth = 0
  let quoted = false
  let start = 0
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index]
    if (character === "'") {
      if (quoted && source[index + 1] === "'") index += 1
      else quoted = !quoted
      continue
    }
    if (quoted) continue
    if (character === '(') depth += 1
    else if (character === ')') depth -= 1
    else if (character === separator && depth === 0) {
      results.push(source.slice(start, index).trim())
      start = index + 1
    }
  }
  results.push(source.slice(start).trim())
  return results.filter(Boolean)
}

const parseLiteral = (source: string): unknown => {
  const value = source.trim()
  if (/^null$/i.test(value)) return null
  if (/^true$/i.test(value)) return true
  if (/^false$/i.test(value)) return false
  if (value.startsWith("'") && value.endsWith("'")) return value.slice(1, -1).replaceAll("''", "'")
  const number = Number(value)
  if (Number.isFinite(number)) return number
  throw new Error(`Unsupported fixture literal: ${value}`)
}

const parseTuples = (source: string): unknown[][] =>
  splitTopLevel(source).map((tuple) => {
    if (!tuple.startsWith('(') || !tuple.endsWith(')')) throw new Error(`Invalid VALUES tuple: ${tuple}`)
    return splitTopLevel(tuple.slice(1, -1)).map(parseLiteral)
  })

const rowsFromTuples = (columns: string[], tuples: unknown[][]): DataRow[] =>
  tuples.map((values) => {
    if (values.length !== columns.length) throw new Error('VALUES tuple does not match the table schema')
    return Object.fromEntries(columns.map((column, index) => [column, values[index]]))
  })

const identifierPattern = '(?:"(?:[^"]|"")*"|\\w+)'
const unquoteIdentifier = (identifier: string): string =>
  identifier.startsWith('"') ? identifier.slice(1, -1).replaceAll('""', '"') : identifier

const leadingIdentifier = (definition: string): string => {
  const match = new RegExp(`^${identifierPattern}`).exec(definition.trim())
  if (!match) throw new Error(`Invalid fixture column definition: ${definition}`)
  return unquoteIdentifier(match[0])
}

const assignResultAliases = (query: ReturnType<typeof parseSQL>): void => {
  const names = new Set<string>()
  query.select.forEach((item, index) => {
    const name = item.alias ?? (item.expression.type === 'field' ? item.expression.name : undefined)
    if (!name || names.has(name)) item.alias = `__sqllogictest_column_${index + 1}`
    names.add(item.alias ?? name!)
  })
}

class SQLLogicTestDatabase {
  private readonly tables = new Map<string, Table>()

  private table(name: string): Table {
    const table = this.tables.get(name.toLowerCase())
    if (!table) throw new Error(`Unknown fixture table: ${name}`)
    return table
  }

  private executeStatement(statement: string): DataRow[] {
    const sql = statement.trim().replace(/;+$/, '')
    const normalized = sql.replace(/\s+/g, ' ')

    const quantileTable =
      /^CREATE TABLE (\w+) as SELECT range (\w+), random\(\)(?: AS (\w+))? FROM range\((\d+)\) UNION ALL VALUES (.+) ORDER BY 2$/i.exec(
        normalized,
      )
    if (quantileTable) {
      const [, name, rangeColumn, randomAlias, countText, values] = quantileTable
      const randomColumn = randomAlias ?? 'random()'
      const rows: DataRow[] = Array.from({ length: Number(countText) }, (_, value) => ({
        [rangeColumn]: value,
        [randomColumn]: Math.random(),
      }))
      rows.push(...rowsFromTuples([rangeColumn, randomColumn], parseTuples(values)))
      this.tables.set(name.toLowerCase(), { columns: [rangeColumn, randomColumn], rows })
      return []
    }

    const valuesTable = /^CREATE TABLE (\w+) AS SELECT \* FROM \(VALUES (.+)\) \w+\(([^)]+)\)$/i.exec(normalized)
    if (valuesTable) {
      const [, name, values, columnList] = valuesTable
      const columns = splitTopLevel(columnList).map((column) => column.replaceAll('"', ''))
      this.tables.set(name.toLowerCase(), { columns, rows: rowsFromTuples(columns, parseTuples(values)) })
      return []
    }

    const create = new RegExp(`^CREATE TABLE (${identifierPattern})\\s*\\(([\\s\\S]+)\\)$`, 'i').exec(sql)
    if (create) {
      const columns = splitTopLevel(create[2]).map(leadingIdentifier)
      this.tables.set(unquoteIdentifier(create[1]).toLowerCase(), { columns, rows: [] })
      return []
    }

    const insert = new RegExp(
      `^INSERT INTO (${identifierPattern})(?:\\s*\\(([^)]+)\\))? VALUES\\s+([\\s\\S]+)$`,
      'i',
    ).exec(sql)
    if (insert) {
      const table = this.table(unquoteIdentifier(insert[1]))
      const columns = insert[2] ? splitTopLevel(insert[2]).map(leadingIdentifier) : table.columns
      const rows = rowsFromTuples(columns, parseTuples(insert[3]))
      rows.forEach((row, index) => {
        Object.defineProperty(row, 'rowid', { enumerable: false, value: table.rows.length + index })
      })
      table.rows.push(...rows)
      return []
    }

    if (/^PRAGMA default_null_order='NULLS LAST'$/i.test(sql)) return []

    if (/^SELECT\b/i.test(sql)) {
      const inlineValues = /^([\s\S]+) FROM VALUES (.+) AS \w+\(([^)]+)\)$/i.exec(normalized)
      if (inlineValues) {
        const columns = splitTopLevel(inlineValues[3]).map((column) => column.replaceAll('"', ''))
        const query = parseSQL(`${inlineValues[1]} FROM __values`)
        assignResultAliases(query)
        return executeSQL(query, rowsFromTuples(columns, parseTuples(inlineValues[2])))
      }
      const query = parseSQL(sql)
      assignResultAliases(query)
      return executeSQL(query, query.table ? this.table(query.table).rows : [{}])
    }
    throw new Error(`Unsupported upstream fixture statement: ${sql}`)
  }

  public execute(sql: string): DataRow[] {
    let result: DataRow[] = []
    for (const statement of splitTopLevel(sql, ';')) result = this.executeStatement(statement)
    return result
  }
}

const renderValue = (value: unknown): string => {
  if (value === null || value === undefined) return 'NULL'
  if (typeof value === 'boolean') return value ? '1' : '0'
  return String(value)
}

const renderResult = (rows: DataRow[], record: QueryRecord): unknown[] => {
  const renderedRows = rows.map((row) => Object.values(row))
  for (const values of renderedRows) {
    if (values.length !== record.types.length) {
      throw new Error(`Expected ${record.types.length} result columns, received ${values.length}`)
    }
  }
  if (record.sortMode === 'valuesort')
    return renderedRows.flat().sort((a, b) => compareText(renderValue(a), renderValue(b)))
  if (record.sortMode === 'rowsort') {
    renderedRows.sort((left, right) => compareText(left.map(renderValue).join('\n'), right.map(renderValue).join('\n')))
  }
  return renderedRows.flat()
}

const expectedValues = (record: QueryRecord): string[] => record.expected.flatMap((line) => line.split('\t'))

const expectResult = (actual: unknown[], record: QueryRecord, context: string): void => {
  const expected = expectedValues(record)
  expect(actual.length, context).toBe(expected.length)
  for (const [index, expectedValue] of expected.entries()) {
    const value = actual[index]
    const cellContext = `${context}, result ${index + 1}`
    if (expectedValue === 'NULL') expect(value, cellContext).toBeNull()
    else if (typeof value === 'number' && Number.isFinite(Number(expectedValue))) {
      expect(value, cellContext).toBeCloseTo(Number(expectedValue), 10)
    } else if (typeof value === 'boolean' && /^[01]$/.test(expectedValue)) {
      expect(value, cellContext).toBe(expectedValue === '1')
    } else expect(String(value), cellContext).toBe(expectedValue === '(empty)' ? '' : expectedValue)
  }
}

const directory = __dirname
const casesDirectory = path.join(directory, 'cases')
const caseFiles = fs
  .readdirSync(casesDirectory)
  .filter((fileName) => fileName.endsWith('.test'))
  .sort(compareText)

describe('SQL engine DuckDB SQLLogicTest conformance', () => {
  if (!caseFiles.length) throw new Error('No upstream SQLLogicTest cases found')

  for (const fileName of caseFiles) {
    const source = fs.readFileSync(path.join(casesDirectory, fileName), 'utf8')
    const records = parseSQLLogicTest(source, fileName)

    it(fileName, () => {
      const database = new SQLLogicTestDatabase()
      const labels = new Map<string, string>()
      for (const record of records) {
        const context = `${fileName}:${record.line}`
        if (record.kind === 'statement') {
          if (record.outcome === 'error') expect(() => database.execute(record.sql), context).toThrow()
          else expect(() => database.execute(record.sql), context).not.toThrow()
          continue
        }

        const actual = renderResult(database.execute(record.sql), record)
        if (!record.label || record.expected.length) expectResult(actual, record, context)
        if (record.label) {
          const signature = actual.map(renderValue).join('\n')
          const previous = labels.get(record.label)
          if (previous === undefined) labels.set(record.label, signature)
          else expect(signature, context).toBe(previous)
        }
      }
    })
  }
})
