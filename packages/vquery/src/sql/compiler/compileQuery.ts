import { Kysely } from 'kysely'
import type { QueryDSL, VQueryDSL, DatasetColumn } from '../../types'
import type { CompileQueryOptions, CompiledQuery, SQLStrategy, QueryBuilder } from './types'
import { mysqlStrategy, duckdbStrategy } from './dialect'
import { applyWhere, applyGroupBy, applyHaving, applyLimit, applyOrder, prepareSelect } from './clauses'
import { prepareConditions } from './clauses/conditions'
import { getQuerySchema } from './getQuerySchema'
import { validateQuery } from './validateQuery'

const strategies = { mysql: mysqlStrategy, duckdb: duckdbStrategy }

export const compileQuery = <T>(dsl: QueryDSL<T>, options: CompileQueryOptions): CompiledQuery => {
  const dialect = options.dialect ?? 'mysql'
  if (!Object.hasOwn(strategies, dialect)) throw new Error(`Unsupported query dialect: ${dialect}`)
  const strategy: SQLStrategy = strategies[dialect]
  validateQuery(dsl, options.columns)
  const db = new Kysely<Record<string, T>>({ dialect: strategy.dialect })
  const build = (query: VQueryDSL, sourceColumns: DatasetColumn[]): QueryBuilder => {
    const columns = query.from ? getQuerySchema(query.from, sourceColumns) : sourceColumns
    let qb = query.from
      ? db.selectFrom(build(query.from, sourceColumns).as('__vquery_subquery'))
      : strategy.source(db, options.table, columns)
    qb = applyWhere(qb, query.where, strategy)
    const conditional = prepareConditions(db, qb, query, strategy, columns)
    const prepared = strategy.prepare(conditional.query, conditional.dsl, db, columns)
    const preparedStrategy = { ...strategy, aggregate: prepared.aggregate }
    const selection = prepareSelect(prepared.query, conditional.dsl.select, preparedStrategy)
    qb = selection.query
    qb = applyGroupBy(qb, conditional.dsl.groupBy as string[] | undefined)
    qb = applyHaving(qb, query.having, preparedStrategy)
    qb = applyOrder(qb, query.orderBy, preparedStrategy, selection.projections, conditional.dsl.groupBy)
    return applyLimit(qb, query.limit, strategy)
  }
  const qb = build(dsl, options.columns ?? [])
  const { sql, parameters } = qb.compile()
  return { sql, parameters }
}
