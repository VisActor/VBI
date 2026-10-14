import { sql } from 'kysely'
import type { Kysely, SelectExpression } from 'kysely'
import type { DatasetColumn, QueryDSL } from '../../types'
import type { AggregateBuilder, QueryBuilder, SQLStrategy } from '../types'

export function prepareMysqlStatistics(
  query: QueryBuilder,
  dsl: QueryDSL<Record<string, unknown>>,
  db: Kysely<any>,
  strategy: SQLStrategy,
  columns: DatasetColumn[],
) {
  const fields = new Set<string>()
  const statistical = new Set<string>()
  const used = new Set<string>()
  const selectItems = dsl.select.map((item) => (typeof item === 'string' ? { field: item } : item))
  for (const item of selectItems) {
    fields.add(item.field)
    used.add(item.alias ?? item.field)
    if (item.aggr?.func === 'median' || item.aggr?.func === 'quantile') statistical.add(item.field)
  }
  const visit = (node: any) => {
    if ('conditions' in node) node.conditions.forEach(visit)
    else {
      fields.add(node.field)
      if (node.aggr?.func === 'median' || node.aggr?.func === 'quantile') statistical.add(node.field)
    }
  }
  if (dsl.having) visit(dsl.having)
  if (!statistical.size) return { query, aggregate: strategy.aggregate }

  const aliases = new Map(selectItems.map((item) => [item.alias ?? item.field, item]))
  const sourceNames = new Set([...fields, ...columns.map((column) => column.name)])
  const groups = (dsl.groupBy ?? []).map((name) => {
    // Both engines resolve source columns before SELECT aliases in GROUP BY.
    const item = sourceNames.has(name) ? undefined : aliases.get(name)
    const field = item?.field ?? name
    fields.add(field)
    return item?.aggr ? strategy.aggregate(field, item.aggr) : sql.ref(field)
  })
  for (const item of dsl.orderBy ?? []) {
    if (!aliases.has(item.field)) fields.add(item.field)
  }
  for (const field of fields) used.add(field)
  let serial = 0
  const unique = () => {
    let name: string
    do name = `__vquery_stat_${serial++}`
    while (used.has(name))
    used.add(name)
    return name
  }
  const partition = groups.length ? sql`partition by ${sql.join(groups)}` : sql``
  const windows = new Map<string, { rank: string; count: string }>()
  const projections: SelectExpression<any, any>[] = [...fields]
  for (const field of statistical) {
    const rank = unique(),
      count = unique()
    windows.set(field, { rank, count })
    projections.push(
      sql`row_number() over (${partition} order by ${sql.ref(field)} is null, ${sql.ref(field)})`.as(rank),
      sql`count(${sql.ref(field)}) over (${partition})`.as(count),
    )
  }
  const ranked = query.select(projections).as('__vquery_ranked')
  const aggregate: AggregateBuilder = (field, aggr) => {
    if (aggr.func !== 'median' && aggr.func !== 'quantile') return strategy.aggregate(field, aggr)
    const names = windows.get(field)!
    const rank = sql.ref(names.rank),
      count = sql.ref(names.count),
      value = sql.ref(field)
    if (aggr.func === 'median') {
      return sql`avg(case when ${rank} in (floor((${count} + 1) / 2), floor((${count} + 2) / 2)) then ${value} end)`
    }
    const quantile = aggr.quantile ?? 0.5
    // Match DuckDB's DOUBLE discrete-quantile index, including rounding at
    // integer boundaries: n - floor(n - n*q), rather than ceil(n*q).
    const position = sql`greatest(${count} - floor(${count} - ${count} * CAST(${Math.abs(quantile)} AS DOUBLE)), 1)`
    const target = quantile < 0 ? sql`${count} + 1 - ${position}` : position
    return sql`max(case when ${rank} = ${target} then ${value} end)`
  }
  return { query: db.selectFrom(ranked), aggregate }
}
