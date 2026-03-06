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
          // 优先使用用户提供的 alias，其次使用 field，保证唯一性
          const alias = item.alias ?? field

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
          // 优先使用用户提供的 alias，其次使用 field
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
