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

export type PeriodOffsetUnit = 'year' | 'quarter' | 'month' | 'week' | 'day'

export type Period<T> = {
  /**
   * 偏移量
   * 0 表示当前周期（如当前年份 2024）
   * -1 表示上一个周期（如上一年 2023）
   * 1 表示下一个周期（如下一年 2025）
   */
  offset: number
  /**
   * 偏移单位
   * year: 年
   * quarter: 季度
   * month: 月
   * week: 周
   * day: 日
   */
  offsetUnit: PeriodOffsetUnit
  /**
   * 日期字段名
   * 用于计算周期的日期字段
   */
  dateField: keyof T
}

export type SelectItem<T> = {
  field: keyof T
  alias?: string
  aggr?: {
    func: AggregateFunction
    quantile?: number
  }
  /**
   * 周期配置（同环比）
   * 用于计算同比/环比数据
   */
  period?: Period<T>
}

export type Select<T> = Array<keyof T | SelectItem<T>>
