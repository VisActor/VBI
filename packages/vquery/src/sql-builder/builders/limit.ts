import type { SelectQueryBuilder } from 'kysely'
import type { SQLStrategy } from '../types'

export const applyLimit = <DB, TB extends keyof DB & string, O>(
  qb: SelectQueryBuilder<DB, TB, O>,
  limit: number | undefined,
  strategy: SQLStrategy,
) => {
  if (limit !== undefined) {
    qb = qb.limit(strategy.limit(limit))
  }
  return qb
}
