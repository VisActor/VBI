import { SelectItem } from 'src/types/dsl/Select'
import { isSelectItem } from '../utils'
import { sql } from 'kysely'
import type { SelectQueryBuilder } from 'kysely'

const DATE_FORMAT_MAP: Record<string, string> = {
  year: '%Y',
  month: '%Y-%m',
  day: '%Y-%m-%d',
  week: '%Y-W%W',
  hour: '%Y-%m-%d %H',
  minute: '%Y-%m-%d %H:%M',
  second: '%Y-%m-%d %H:%M:%S',
}

const OFFSET_UNIT_MAP: Record<string, number> = {
  year: 1,
  quarter: 3,
  month: 1,
  week: 1,
  day: 1,
}

export const applySelect = <DB, TB extends keyof DB & string, O, T>(
  qb: SelectQueryBuilder<DB, TB, O>,
  select?: Array<keyof T | SelectItem<T>>,
) => {
  if (select && select.length > 0) {
    return qb.select((eb) =>
      select.map((item) => {
        if (isSelectItem(item)) {
          const field = item.field as Extract<keyof T, string>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const expression = eb.ref(field as any)
          const alias = item.alias ?? (field as string)

          // Handle period (YoY/MoM/etc)
          if (item.period && item.aggr) {
            const { dateField, offsetUnit, offset } = item.period
            const { func } = item.aggr

            // Build aggregation expression using original field
            let aggrExpr: any
            if (['avg', 'sum', 'min', 'max', 'variance', 'variancePop', 'stddev', 'median'].includes(func)) {
              if (func === 'variance') {
                aggrExpr = sql`var_samp(${expression})`
              } else if (func === 'variancePop') {
                aggrExpr = sql`var_pop(${expression})`
              } else {
                aggrExpr = sql`${sql.raw(func)}(${expression})`
              }
            } else if (func === 'count') {
              aggrExpr = sql`CAST(count(${expression}) AS INTEGER)`
            } else if (func === 'count_distinct') {
              aggrExpr = sql`CAST(count(distinct ${expression}) AS INTEGER)`
            } else {
              aggrExpr = expression
            }

            // Calculate offset rows
            const offsetRows = Math.abs(offset) * (OFFSET_UNIT_MAP[offsetUnit] || 1)

            // Generate LAG(聚合表达式, offset) OVER (ORDER BY DATE_TRUNC(offsetUnit, dateField))
            // Cast dateField to TIMESTAMP for date_trunc
            return sql`LAG(${aggrExpr}, ${offsetRows}) OVER (ORDER BY DATE_TRUNC(${sql.raw(`'${offsetUnit}'`)}, CAST(${eb.ref(dateField as any)} AS TIMESTAMP)))`.as(
              alias,
            )
          }

          // Handle regular aggregation
          if (item.aggr) {
            const { func } = item.aggr
            if (['avg', 'sum', 'min', 'max', 'variance', 'variancePop', 'stddev', 'median'].includes(func)) {
              if (func === 'variance') {
                return sql`var_samp(${expression})`.as(alias)
              }
              if (func === 'variancePop') {
                return sql`var_pop(${expression})`.as(alias)
              }
              return sql`${sql.raw(func)}(${expression})`.as(alias)
            } else if (func === 'count') {
              return sql`CAST(count(${expression}) AS INTEGER)`.as(alias)
            } else if (func === 'quantile') {
              const q = item.aggr.quantile ?? 0.5
              return sql`quantile(${expression}, ${q})`.as(alias)
            } else if (func === 'count_distinct') {
              return sql`CAST(count(distinct ${expression}) AS INTEGER)`.as(alias)
            } else if (func.startsWith('to_')) {
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
          }
          return expression.as(alias)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return item as any
      }),
    )
  } else {
    return qb.selectAll()
  }
}
