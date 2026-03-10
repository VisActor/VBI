import { sql } from 'kysely'
import type { SelectItem } from 'src/types/dsl/Select'

const DATE_FORMAT_MAP: Record<string, string> = {
  year: '%Y',
  month: '%Y-%m',
  day: '%Y-%m-%d',
  week: '%Y-W%W',
  hour: '%Y-%m-%d %H',
  minute: '%Y-%m-%d %H:%M',
  second: '%Y-%m-%d %H:%M:%S',
}

export const buildAggregationExpression = <T, TExpression extends { as: (alias: string) => unknown }>(
  expression: TExpression,
  item: SelectItem<T>,
) => {
  const { func } = item.aggr!
  const alias = item.alias ?? (item.field as string)

  if (['avg', 'sum', 'min', 'max', 'variance', 'variancePop', 'stddev', 'median'].includes(func)) {
    if (func === 'variance') {
      return sql`var_samp(${expression})`.as(alias)
    }
    if (func === 'variancePop') {
      return sql`var_pop(${expression})`.as(alias)
    }
    return sql`${sql.raw(func)}(${expression})`.as(alias)
  }
  if (func === 'count') {
    return sql`CAST(count(${expression}) AS INTEGER)`.as(alias)
  }
  if (func === 'quantile') {
    const q = item.aggr!.quantile ?? 0.5
    return sql`quantile(${expression}, ${q})`.as(alias)
  }
  if (func === 'count_distinct') {
    return sql`CAST(count(distinct ${expression}) AS INTEGER)`.as(alias)
  }
  if (func.startsWith('to_')) {
    const dateTrunc = func.replace('to_', '')
    const format = DATE_FORMAT_MAP[dateTrunc]
    if (format) {
      return sql`strftime(CAST(${expression} AS TIMESTAMP), ${format})`.as(alias)
    }
    if (dateTrunc === 'quarter') {
      return sql`strftime(CAST(${expression} AS TIMESTAMP), '%Y') || '-Q' || date_part('quarter', CAST(${expression} AS TIMESTAMP))`.as(
        alias,
      )
    }
  }
  return null
}
