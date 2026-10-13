import { escapeValue } from '../utils'
import type { QueryDialect } from '../types'

export const inlineParameters = (sql: string, params: readonly unknown[], dialect: QueryDialect = 'duckdb'): string => {
  if (params.length === 0) return sql
  let index = 0
  // Match quoted SQL first, and substitute each placeholder only once. Parameter
  // values containing '?' or '$1' must never become new placeholders.
  return sql.replace(/("(?:[^"]|"")*"|'(?:[^']|'')*'|`(?:[^`]|``)*`)|\$(\d+)|\?/g, (match, quoted, numbered) => {
    if (quoted) return match
    const value = params[numbered ? Number(numbered) - 1 : index++]
    return escapeValue(dialect === 'mysql' && typeof value === 'string' ? value.replaceAll('\\', '\\\\') : value)
  })
}
