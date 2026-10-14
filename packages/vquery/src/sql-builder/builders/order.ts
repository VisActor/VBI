import type { SelectQueryBuilder } from 'kysely'
import type { OrderBy } from '../../types'
import type { SQLStrategy } from '../types'

export const applyOrder = <DB, TB extends keyof DB & string, O>(
  qb: SelectQueryBuilder<DB, TB, O>,
  orderBy: OrderBy<any> | undefined,
  strategy: SQLStrategy,
) => {
  for (const item of orderBy ?? []) {
    for (const expression of strategy.order(item.field as string, item.order ?? 'asc', item.nulls ?? 'last')) {
      qb = qb.orderBy(expression)
    }
  }
  return qb
}
