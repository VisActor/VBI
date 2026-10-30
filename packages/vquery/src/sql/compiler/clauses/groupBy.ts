import { sql } from 'kysely'
import type { SelectQueryBuilder } from 'kysely'

export const applyGroupBy = <DB, TB extends keyof DB & string, O>(
  qb: SelectQueryBuilder<DB, TB, O>,
  fields?: Array<string>,
) => {
  if (fields && fields.length > 0) {
    const exprs = fields.map((f) => sql.id(f))
    type GroupByParam = Parameters<SelectQueryBuilder<DB, TB, O>['groupBy']>[0]
    qb = qb.groupBy(exprs as GroupByParam)
  }
  return qb
}
