import { Kysely } from 'kysely'
import type { QueryDSL } from '../types'
import type { CompileQueryOptions, CompiledQuery, SQLStrategy } from './types'
import { mysqlStrategy, duckdbStrategy } from './dialect'
import { applyWhere, applyGroupBy, applyHaving, applyLimit, applyOrder, applySelect } from './builders'
import { validateQuery } from './validateQuery'

const strategies = { mysql: mysqlStrategy, duckdb: duckdbStrategy }

export const compileQuery = <T>(dsl: QueryDSL<T>, options: CompileQueryOptions): CompiledQuery => {
  const dialect = options.dialect ?? 'mysql'
  if (!Object.hasOwn(strategies, dialect)) throw new Error(`Unsupported query dialect: ${dialect}`)
  const strategy: SQLStrategy = strategies[dialect]
  validateQuery(dsl, options.columns)
  const db = new Kysely<Record<string, T>>({ dialect: strategy.dialect })
  let qb = strategy.source(db, options.table, options.columns ?? [])
  qb = applyWhere(qb, dsl.where, strategy)
  const prepared = strategy.prepare(qb, dsl, db, options.columns ?? [])
  const preparedStrategy = { ...strategy, aggregate: prepared.aggregate }
  qb = applySelect(prepared.query, dsl.select, preparedStrategy)
  qb = applyGroupBy(qb, dsl.groupBy as string[] | undefined)
  qb = applyHaving(qb, dsl.having, preparedStrategy)
  qb = applyOrder(qb, dsl.orderBy, strategy)
  qb = applyLimit(qb, dsl.limit, strategy)
  const { sql, parameters } = qb.compile()
  return { sql, parameters }
}
