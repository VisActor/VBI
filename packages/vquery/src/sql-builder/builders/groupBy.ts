import { sql } from 'kysely'
import type { SelectQueryBuilder } from 'kysely'
import type { SelectItem } from 'src/types'

export const applyGroupBy = <DB, TB extends keyof DB & string, O>(
  qb: SelectQueryBuilder<DB, TB, O>,
  fields?: Array<string>,
  select?: Array<string | SelectItem<any>>,
) => {
  // Collect dateFields from period configs
  const periodDateFields = new Set<string>()
  if (select) {
    select.forEach((item) => {
      if (item && typeof item === 'object' && 'period' in item) {
        const period = (item as any).period
        if (period && period.dateField) {
          periodDateFields.add(period.dateField)
        }
      }
    })
  }

  const allFields = [...(fields || [])]
  periodDateFields.forEach((df) => {
    if (!allFields.includes(df)) {
      allFields.push(df)
    }
  })

  if (allFields.length > 0) {
    const exprs = allFields.map((f) => sql.id(f))
    type GroupByParam = Parameters<SelectQueryBuilder<DB, TB, O>['groupBy']>[0]
    qb = qb.groupBy(exprs as GroupByParam)
  }
  return qb
}
