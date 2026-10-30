import type { ColumnSummary } from './summary'
import { countResult, validValues, type ProfileContext } from './context'

/** @description 分类频次排序和截断均在数据源完成。 */
export const queryCategory = async (
  context: ProfileContext,
  summary: ColumnSummary,
  topK: number,
  emptyString?: 'value' | 'missing',
) => {
  const rows = await context.query({
    select: [
      { field: summary.column.name, alias: 'value' },
      { field: '*', alias: 'count', aggr: { func: 'count' } },
    ],
    where: validValues(summary.column, emptyString),
    groupBy: [summary.column.name],
    orderBy: [
      { field: 'count', order: 'desc' },
      { field: 'value', order: 'asc' },
    ],
    limit: topK,
  })
  const top = rows.map((row) => {
    if (typeof row.value !== 'string') throw new Error('Invalid category statistics')
    return { value: row.value, count: countResult(row.count) }
  })
  const otherCount = summary.validCount - top.reduce((sum, item) => sum + item.count, 0)
  if (otherCount < 0) throw new Error('Statistics changed during query')
  return { top, otherCount }
}
