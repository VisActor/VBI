import type { SelectItem } from '../../types/dsl/Select'
import { isSelectItem } from '../utils'
import { sql } from 'kysely'
import type { SelectQueryBuilder } from 'kysely'
import type { SQLStrategy } from '../types'

export const applySelect = <DB, TB extends keyof DB & string, O, T>(
  qb: SelectQueryBuilder<DB, TB, O>,
  select: Array<keyof T | SelectItem<T>>,
  strategy: SQLStrategy,
) => {
  if (select.length === 0) return qb.selectAll()
  return qb.select(() =>
    select.map((item) => {
      if (!isSelectItem(item)) return item as any
      const field = item.field as string
      const expression = sql.ref(field)
      return (item.aggr ? strategy.aggregate(field, item.aggr) : expression).as(item.alias ?? field)
    }),
  )
}
