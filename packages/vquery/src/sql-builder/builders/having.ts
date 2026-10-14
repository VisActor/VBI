import type { RawBuilder, SelectQueryBuilder } from 'kysely'
import type { Having, HavingAggregation, HavingClause } from '../../types'
import { sql } from 'kysely'
import { toSqlOperator } from '../utils'
import type { SQLStrategy } from '../types'

export const applyHaving = <DB, TB extends keyof DB & string, O, T>(
  qb: SelectQueryBuilder<DB, TB, O>,
  having: Having<T> | HavingClause<T> | undefined,
  strategy: SQLStrategy,
): SelectQueryBuilder<DB, TB, O> => {
  if (!having) {
    return qb
  }

  const toRaw = (h: Having<T> | HavingClause<T>): RawBuilder<boolean> => {
    if ('op' in h && 'conditions' in h) {
      if (h.conditions.length === 0) return h.op === 'and' ? sql<boolean>`1=1` : sql<boolean>`0=1`
      const parts: RawBuilder<boolean>[] = (h.conditions as Array<HavingClause<T>>).map((c) => toRaw(c))
      const sep: RawBuilder<unknown> = sql` ${sql.raw(h.op)} `
      return sql<boolean>`(${sql.join(parts, sep)})`
    }
    const leaf = h as unknown as {
      field: Extract<keyof T, string>
      op: string
      value?: unknown
      aggr: HavingAggregation
    }
    const field = leaf.field
    const value = leaf.value
    const compareOp = toSqlOperator(leaf.op.trim().toLowerCase())
    const leftExpr: RawBuilder<unknown> = strategy.aggregate(field, leaf.aggr)

    switch (compareOp) {
      case 'is null':
        return sql<boolean>`${leftExpr} is null`
      case 'is not null':
        return sql<boolean>`${leftExpr} is not null`
      case 'in': {
        const items = Array.isArray(value) ? (value as unknown[]) : [value]
        return sql<boolean>`${leftExpr} in (${sql.join(items.map((v) => strategy.value(v)))})`
      }
      case 'not in': {
        const items = Array.isArray(value) ? (value as unknown[]) : [value]
        return sql<boolean>`not ${leftExpr} in (${sql.join(items.map((v) => strategy.value(v)))})`
      }
      case 'between': {
        const [a, b] = value as [unknown, unknown]
        return sql<boolean>`${leftExpr} between ${strategy.value(a)} and ${strategy.value(b)}`
      }
      case 'not between': {
        const [a, b] = value as [unknown, unknown]
        return sql<boolean>`${leftExpr} not between ${strategy.value(a)} and ${strategy.value(b)}`
      }
      default:
        return sql<boolean>`${leftExpr} ${sql.raw(compareOp)} ${strategy.value(value)}`
    }
  }
  return qb.having(toRaw(having))
}
