export type BaseAggregateFunction =
  | 'count'
  | 'count_distinct'
  | 'sum'
  | 'avg'
  | 'min'
  | 'max'
  | 'variance'
  | 'variancePop'
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

// Period offset unit
export type OffsetUnit = 'year' | 'quarter' | 'month' | 'week' | 'day'

// Period configuration for YoY/MoM/etc
export type PeriodConfig = {
  dateField: string
  offsetUnit: OffsetUnit
  offset: number
}

export type SelectItem<T> = {
  field: keyof T
  alias?: string
  aggr?: {
    func: AggregateFunction
    quantile?: number
  }
  period?: PeriodConfig
}

export type Select<T> = Array<keyof T | SelectItem<T>>
