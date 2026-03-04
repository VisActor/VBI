import { Having, HavingClause } from 'src/types'
import { sql } from 'kysely'
import type { RawBuilder } from 'kysely'

export const applyHaving = <T>(having: Having<T> | HavingClause<T>): RawBuilder<boolean> => {
  const toRaw = (h: Having<T> | HavingClause<T>): RawBuilder<boolean> => {
    if ('op' in h && 'conditions' in h) {
      const parts: RawBuilder<boolean>[] = (h.conditions as Array<HavingClause<T>>).map((c) => toRaw(c))
      const sep: RawBuilder<unknown> = sql` ${sql.raw(h.op)} `
      return sql<boolean>`(${sql.join(parts, sep)})`
    }
    const leaf = h as unknown as { field: Extract<keyof T, string>; op: string; value?: unknown }
    const field = leaf.field
    const value = leaf.value
    const op = leaf.op

    // Handle aggregation function operators: sum(), avg(), count(), min(), max()
    if (['sum', 'avg', 'count', 'min', 'max'].includes(op)) {
      const aggrExpr = sql`${sql.raw(op.toLowerCase())}(${sql.ref(field)})`
      return sql<boolean>`${aggrExpr} = ${sql.val(value)}`
    }

    // Handle comparison operators
    switch (op) {
      case 'is null':
        return sql<boolean>`${sql.ref(field)} is null`
      case 'is not null':
        return sql<boolean>`${sql.ref(field)} is not null`
      case 'in': {
        const items = Array.isArray(value) ? (value as unknown[]) : [value]
        return sql<boolean>`${sql.ref(field)} in (${sql.join(items.map((v) => sql.val(v)))})`
      }
      case 'not in': {
        const items = Array.isArray(value) ? (value as unknown[]) : [value]
        return sql<boolean>`not ${sql.ref(field)} in (${sql.join(items.map((v) => sql.val(v)))})`
      }
      case 'between': {
        const [a, b] = value as [unknown, unknown]
        return sql<boolean>`${sql.ref(field)} between ${sql.val(a)} and ${sql.val(b)}`
      }
      case 'not between': {
        const [a, b] = value as [unknown, unknown]
        return sql<boolean>`${sql.ref(field)} not between ${sql.val(a)} and ${sql.val(b)}`
      }
    }
    // Default comparison
    return sql<boolean>`${sql.ref(field)} ${sql.raw(op)} ${sql.val(value)}`
  }
  return toRaw(having)
}
