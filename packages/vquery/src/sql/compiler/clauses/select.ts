import type { SelectItem } from '../../../types/dsl/Select'
import { sql } from 'kysely'
import type { AliasedRawBuilder, SelectQueryBuilder } from 'kysely'
import type { SQLStrategy } from '../types'
import { parseNumericExpression } from '../../numericExpression'
import { buildNumericExpression } from '../expression'

/** Build the projected value independently of its output alias. */
const buildSelectExpression = <T>(item: SelectItem<T>, strategy: SQLStrategy) => {
  if (item.expr !== undefined)
    return buildNumericExpression(parseNumericExpression(item.expr, item.parameters), strategy)
  if (item.field === '*' && item.aggr?.func === 'count') return sql`count(*)`
  return item.aggr ? strategy.aggregate(item.field as string, item.aggr) : sql.id(item.field as string)
}

/** Compile projections once so ordering can reuse their values without rebuilding expressions. */
export const prepareSelect = <DB, TB extends keyof DB & string, O, T>(
  qb: SelectQueryBuilder<DB, TB, O>,
  select: Array<keyof T | SelectItem<T>>,
  strategy: SQLStrategy,
) => {
  const projections: AliasedRawBuilder<unknown, string>[] = []
  const selections = select.map((item) => {
    if (item === '*') return sql`*`
    if (typeof item !== 'object') return sql.id(item as string) as any
    const projection = buildSelectExpression(item, strategy).as(
      item.alias ?? (item.field === '*' ? 'count' : (item.field as string)),
    )
    projections.push(projection)
    return projection
  })
  return { query: select.length ? qb.select(selections) : qb.selectAll(), projections }
}
