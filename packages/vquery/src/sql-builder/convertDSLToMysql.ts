import type { QueryDSL } from '../types'
import type { QueryTable, CompileQueryOptions } from './types'
import { compileQuery } from './compileQuery'
import { inlineParameters } from './compile'

export const convertDSLToMysql = <T, TableName extends QueryTable = QueryTable>(
  dsl: QueryDSL<T>,
  table: TableName,
  options: Omit<CompileQueryOptions, 'table' | 'dialect'> = {},
): string => {
  const { sql, parameters } = compileQuery(dsl, { ...options, table, dialect: 'mysql' })
  return inlineParameters(sql, parameters, 'mysql')
}
