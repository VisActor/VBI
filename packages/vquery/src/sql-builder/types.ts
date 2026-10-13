import type { Dialect, RawBuilder, Kysely, SelectQueryBuilder } from 'kysely'
import type { DatasetColumn, QueryDSL } from '../types'
import type { SelectItem } from '../types/dsl/Select'

export type QueryDialect = 'mysql' | 'duckdb'
export type QueryTable = string | { database: string; name: string }
export type QueryBuilder = SelectQueryBuilder<any, any, any>
export type AggregateBuilder = (field: string, aggr: NonNullable<SelectItem<unknown>['aggr']>) => RawBuilder<unknown>

export interface CompileQueryOptions {
  table: QueryTable
  dialect?: QueryDialect
  /** Full logical source schema, used to align string collations across engines. */
  columns?: DatasetColumn[]
}

export interface CompiledQuery {
  sql: string
  parameters: readonly unknown[]
}

export interface SQLStrategy {
  dialect: Dialect
  source: (db: Kysely<any>, table: QueryTable, columns: DatasetColumn[]) => QueryBuilder
  prepare: (
    query: QueryBuilder,
    dsl: QueryDSL<any>,
    db: Kysely<any>,
    columns: DatasetColumn[],
  ) => { query: QueryBuilder; aggregate: AggregateBuilder }
  limit: (value: number) => number | RawBuilder<number>
  aggregate: AggregateBuilder
  value: (value: unknown) => RawBuilder<unknown>
  like: (field: RawBuilder<unknown>, value: unknown, negated: boolean, insensitive: boolean) => RawBuilder<boolean>
  order: (field: string, direction: 'asc' | 'desc', nulls: 'first' | 'last') => RawBuilder<unknown>[]
}
