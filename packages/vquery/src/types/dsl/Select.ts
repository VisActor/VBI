import type { Where } from './Where'

export type BaseAggregateFunction =
  | 'count'
  | 'count_distinct'
  | 'sum'
  | 'avg'
  | 'min'
  | 'max'
  | 'variance'
  | 'variance_pop'
  | 'stddev'
  | 'median'
  | 'quantile'

export type DateAggregateFunction =
  | 'to_year'
  | 'to_quarter'
  | 'to_month'
  | 'to_week'
  | 'to_day'
  | 'to_hour'
  | 'to_minute'
  | 'to_second'

export type AggregateFunction = BaseAggregateFunction | DateAggregateFunction

export type SelectItem<T> =
  | {
      field: keyof T
      alias?: string
      /** Keep the field value only when the condition holds; otherwise use NULL. */
      when?: Where<T>
      aggr?: {
        func: AggregateFunction
        quantile?: number
      }
      expr?: never
      parameters?: never
    }
  | {
      field: '*'
      alias?: string
      when?: never
      aggr: { func: 'count' }
      expr?: never
      parameters?: never
    }
  | {
      /** Numeric SQL expression over this query's input columns. */
      expr: string
      alias: string
      parameters?: (number | null)[]
      field?: never
      when?: never
      aggr?: never
    }

export type Select<T> = Array<keyof T | '*' | SelectItem<T>>
