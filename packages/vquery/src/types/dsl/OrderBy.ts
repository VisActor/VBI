export type OrderBy<T> = Array<{
  field: string | keyof T
  order?: 'asc' | 'desc'
  /** NULL values sort last by default, independent of direction. */
  nulls?: 'first' | 'last'
}>
