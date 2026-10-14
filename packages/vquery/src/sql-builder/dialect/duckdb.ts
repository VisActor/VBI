import { PostgresAdapter, PostgresQueryCompiler, sql } from 'kysely'
import { compilationDialect } from './compilationDialect'
import type { SQLStrategy } from '../types'
import { createSource, normalizeValue } from './source'

const formats: Record<string, string> = {
  to_year: '%Y',
  to_month: '%Y-%m',
  to_day: '%Y-%m-%d',
  to_week: '%Y-W%W',
  to_hour: '%Y-%m-%d %H',
  to_minute: '%Y-%m-%d %H:%M',
  to_second: '%Y-%m-%d %H:%M:%S',
}

export const duckdbStrategy: SQLStrategy = {
  dialect: compilationDialect(new PostgresQueryCompiler(), new PostgresAdapter()),
  source: (db, table, columns) => createSource(db, table, columns, (field) => sql`${field} collate "binary"`),
  prepare: (query) => ({ query, aggregate: duckdbStrategy.aggregate }),
  value: (value) => sql.val(normalizeValue(value)),
  limit: (value) => value,
  aggregate: (name, aggr) => {
    const field = sql.ref(name)
    const { func } = aggr
    if (formats[func]) return sql`strftime(CAST(${field} AS TIMESTAMP), ${formats[func]})`
    switch (func) {
      case 'to_quarter':
        return sql`strftime(CAST(${field} AS TIMESTAMP), '%Y') || '-Q' || date_part('quarter', CAST(${field} AS TIMESTAMP))`
      case 'count':
        return sql`count(${field})`
      case 'count_distinct':
        return sql`count(distinct ${field})`
      case 'variance':
        return sql`var_samp(${field})`
      case 'variance_pop':
        return sql`var_pop(${field})`
      case 'quantile':
        return sql`quantile(${field}, CAST(${aggr.quantile ?? 0.5} AS DOUBLE))`
      default:
        return sql`${sql.raw(func)}(${field})`
    }
  },
  like: (field, value, negated, insensitive) =>
    sql<boolean>`${field} ${sql.raw(`${negated ? 'not ' : ''}${insensitive ? 'ilike' : 'like'}`)} ${sql.val(normalizeValue(value))} escape ''`,
  order: (field, direction, nulls) => [sql`${sql.ref(field)} ${sql.raw(direction)} nulls ${sql.raw(nulls)}`],
}
