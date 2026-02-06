export type AggregateFunction = 'count' | 'count_distinct' | 'sum' | 'avg' | 'min' | 'max' | 'quantile'
export type SelectItem<T> = {
  field: keyof T
  alias?: string
  func?: AggregateFunction
}

export type Select<T> = Array<keyof T | SelectItem<T>>
