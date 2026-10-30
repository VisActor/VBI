import { escapeValue } from './utils'
import type { QueryDialect } from './types'

export const inlineParameters = (sql: string, params: readonly unknown[], dialect: QueryDialect = 'duckdb'): string => {
  if (params.length === 0) return sql
  let index = 0
  // Match quoted SQL first, and substitute each placeholder only once. Parameter
  // values containing '?' or '$1' must never become new placeholders.
  return sql.replace(/("(?:[^"]|"")*"|'(?:[^']|'')*'|`(?:[^`]|``)*`)|\$(\d+)|\?/g, (match, quoted, numbered) => {
    if (quoted) return match
    const value = params[numbered ? Number(numbered) - 1 : index++]
    if (dialect === 'mysql' && typeof value === 'string' && value.includes('\\')) {
      const hex = Array.from(new TextEncoder().encode(value), (byte) => byte.toString(16).padStart(2, '0')).join('')
      return `convert(0x${hex} using utf8mb4)`
    }
    return escapeValue(value)
  })
}
