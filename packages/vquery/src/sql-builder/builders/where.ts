import type { Where, WhereClause } from '../../types'
import { sql } from 'kysely'
import type { RawBuilder, SelectQueryBuilder } from 'kysely'
import { toSqlOperator } from '../utils'
import type { SQLStrategy } from '../types'

export const applyWhere = <DB, TB extends keyof DB & string, O, T>(
  qb: SelectQueryBuilder<DB, TB, O>,
  where: Where<T> | WhereClause<T> | undefined,
  strategy: SQLStrategy,
): SelectQueryBuilder<DB, TB, O> => {
  if (!where) {
    return qb
  }

  const toRaw = (w: Where<T> | WhereClause<T>): RawBuilder<boolean> => {
    if ('op' in w && 'conditions' in w) {
      if (w.conditions.length === 0) return w.op === 'and' ? sql<boolean>`1=1` : sql<boolean>`0=1`
      const parts: RawBuilder<boolean>[] = (w.conditions as Array<WhereClause<T>>).map((c) => toRaw(c))
      const sep: RawBuilder<unknown> = sql` ${sql.raw(w.op)} `
      return sql<boolean>`(${sql.join(parts, sep)})`
    }
    const leaf = w as unknown as { field: Extract<keyof T, string>; op: string; value?: unknown }
    const field = leaf.field
    const value = leaf.value
    const sqlOp = toSqlOperator(leaf.op)
    switch (leaf.op) {
      case 'like':
      case 'not like':
      case 'ilike':
      case 'not ilike':
        return strategy.like(sql.ref(field), value, leaf.op.startsWith('not '), leaf.op.includes('ilike'))
      case 'is null':
        return sql<boolean>`${sql.ref(field)} is null`
      case 'is not null':
        return sql<boolean>`${sql.ref(field)} is not null`
      case 'in': {
        const items = Array.isArray(value) ? (value as unknown[]) : [value]
        return sql<boolean>`${sql.ref(field)} in (${sql.join(items.map((v) => strategy.value(v)))})`
      }
      case 'not in': {
        const items = Array.isArray(value) ? (value as unknown[]) : [value]
        return sql<boolean>`not ${sql.ref(field)} in (${sql.join(items.map((v) => strategy.value(v)))})`
      }
      case 'between': {
        const [a, b] = value as [unknown, unknown]
        return sql<boolean>`${sql.ref(field)} between ${strategy.value(a)} and ${strategy.value(b)}`
      }
      case 'not between': {
        const [a, b] = value as [unknown, unknown]
        return sql<boolean>`${sql.ref(field)} not between ${strategy.value(a)} and ${strategy.value(b)}`
      }
      default:
        return sql<boolean>`${sql.ref(field)} ${sql.raw(sqlOp)} ${strategy.value(value)}`
    }
  }
  return qb.where(toRaw(where))
}
