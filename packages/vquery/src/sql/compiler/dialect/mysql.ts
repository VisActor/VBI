import { MysqlAdapter, MysqlQueryCompiler, sql } from 'kysely'
import { compilationDialect } from './compilationDialect'
import type { SQLStrategy } from '../types'
import { createSource, normalizeValue } from './source'
import { prepareMysqlStatistics } from './mysqlStatistics'

const text = (field: ReturnType<typeof sql.ref>) => sql`convert(${field} using utf8mb4) collate utf8mb4_0900_bin`

const formats: Record<string, string> = {
  to_year: '%Y',
  to_month: '%Y-%m',
  to_day: '%Y-%m-%d',
  to_hour: '%Y-%m-%d %H',
  to_minute: '%Y-%m-%d %H:%i',
  to_second: '%Y-%m-%d %H:%i:%s',
}

export const mysqlStrategy: SQLStrategy = {
  dialect: compilationDialect(new MysqlQueryCompiler(), new MysqlAdapter()),
  source: (db, table, columns) => createSource(db, table, columns, text),
  prepare: (query, dsl, db, columns) => prepareMysqlStatistics(query, dsl, db, mysqlStrategy, columns),
  value: (value) => {
    const normalized = normalizeValue(value)
    return typeof normalized === 'string' ? text(sql.val(normalized)) : sql.val(normalized)
  },
  // mysql2 encodes JS numbers as DOUBLE, which some MySQL versions reject
  // for LIMIT placeholders. validateQuery has already checked this integer.
  limit: (value) => sql.lit(value),
  aggregate: (name, aggr) => {
    const field = sql.id(name)
    const { func } = aggr
    if (formats[func]) return sql`date_format(${field}, ${formats[func]})`
    switch (func) {
      case 'to_week':
        return sql`concat(date_format(${field}, '%Y-W'), lpad(week(${field}, 5), 2, '0'))`
      case 'to_quarter':
        return sql`concat(date_format(${field}, '%Y'), '-Q', quarter(${field}))`
      case 'count_distinct':
        return sql`count(distinct ${field})`
      case 'variance':
        return sql`var_samp(${field})`
      case 'variance_pop':
        return sql`var_pop(${field})`
      case 'stddev':
        return sql`stddev_samp(${field})`
      case 'median':
      case 'quantile':
        throw new Error('Statistical aggregates cannot be used as grouping keys')
      default:
        return sql`${sql.raw(func)}(${field})`
    }
  },
  like: (field, value, negated, insensitive) => {
    const normalized = normalizeValue(value)
    const left = text(field),
      right = text(sql.val(typeof normalized === 'string' ? normalized.replaceAll('!', '!!') : normalized))
    return sql<boolean>`${insensitive ? sql`lower(${left})` : left} ${sql.raw(negated ? 'not like' : 'like')} ${insensitive ? sql`lower(${right})` : right} escape '!'`
  },
  order: (field, direction, nulls, value) => [
    sql`${value ?? sql.id(field)} is null ${sql.raw(nulls === 'last' ? 'asc' : 'desc')}`,
    sql`${sql.id(field)} ${sql.raw(direction)}`,
  ],
}
