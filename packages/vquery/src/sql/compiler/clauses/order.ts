import type { AliasedRawBuilder, SelectQueryBuilder } from 'kysely'
import type { OrderBy } from '../../../types'
import type { SQLStrategy } from '../types'

export const applyOrder = <DB, TB extends keyof DB & string, O>(
  qb: SelectQueryBuilder<DB, TB, O>,
  orderBy: OrderBy<any> | undefined,
  strategy: SQLStrategy,
  projections: readonly AliasedRawBuilder<unknown, string>[],
  groupBy?: string[],
) => {
  for (const item of orderBy ?? []) {
    // Grouped aliases must stay references to the group, including date buckets.
    const value = groupBy?.includes(item.field as string)
      ? undefined
      : projections.find((projection) => projection.alias === item.field)?.rawBuilder
    for (const expression of strategy.order(item.field as string, item.order ?? 'asc', item.nulls ?? 'last', value)) {
      qb = qb.orderBy(expression)
    }
  }
  return qb
}
