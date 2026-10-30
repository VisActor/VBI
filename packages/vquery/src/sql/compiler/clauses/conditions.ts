import { sql, type Kysely, type AliasedRawBuilder } from 'kysely'
import type { VQueryDSL, DatasetColumn } from '../../../types'
import type { QueryBuilder, SQLStrategy } from '../types'
import { buildWhere } from './where'

/** Project conditional fields before ordinary aggregation, including window-based aggregates. */
export const prepareConditions = (
  db: Kysely<any>,
  query: QueryBuilder,
  dsl: VQueryDSL,
  strategy: SQLStrategy,
  columns: DatasetColumn[],
) => {
  if (!dsl.select.some((item) => typeof item !== 'string' && item.when)) return { query, dsl }
  const used = new Set([
    ...columns.map((column) => column.name),
    ...dsl.select.flatMap((item) => (typeof item === 'string' ? [item] : [item.field, item.alias])),
  ])
  let serial = 0
  const fields: AliasedRawBuilder<unknown, string>[] = []
  if (!columns.length) throw new Error('Conditional projections require source schema')
  const projections = dsl.select.flatMap((item) => (item === '*' ? columns.map((column) => column.name) : [item]))
  const groups = new Map<string, string>()
  const conditions = new Map<string, string>()
  const select = projections.map((item) => {
    if (typeof item === 'string' || !item.when) return item
    const condition = buildWhere(item.when, strategy)
    const { sql: conditionSQL, parameters } = condition.compile(db)
    const key = JSON.stringify([item.field, conditionSQL, parameters])
    let name = conditions.get(key)
    if (!name) {
      do name = `__vquery_when_${serial++}`
      while (used.has(name))
      used.add(name)
      conditions.set(key, name)
      fields.push(sql`case when ${condition} then ${sql.id(item.field)} end`.as(name))
    }
    if (!item.aggr) groups.set(item.alias ?? item.field, name)
    const { when: _when, ...projection } = item
    return { ...projection, field: name, alias: item.alias ?? item.field }
  })
  return {
    query: db.selectFrom(query.selectAll().select(fields).as('__vquery_conditions')),
    dsl: { ...dsl, select, groupBy: dsl.groupBy?.map((field) => groups.get(field) ?? field) },
  }
}
