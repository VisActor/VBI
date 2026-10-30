import type { DatasetColumn, VQueryDSL } from '@visactor/vquery'
import { countResult, numericResult, singleRow, validValues, type ProfileContext } from './context'

export interface ColumnSummary {
  column: DatasetColumn
  validCount: number
  missingCount: number
  distinctCount: number
  min?: number
  max?: number
}

/** @description 一次聚合获得行数、有效数和数值范围；不返回明细记录。 */
export const querySummary = async (
  context: ProfileContext,
  columns: DatasetColumn[],
  emptyString?: 'value' | 'missing',
) => {
  const select: VQueryDSL['select'] = [{ field: '*', alias: 'rows', aggr: { func: 'count' } }]
  columns.forEach((column, index) => {
    if (column.type !== 'number' && column.type !== 'string') return
    const item = { field: column.name, when: validValues(column, emptyString) }
    select.push({ ...item, alias: `valid_${index}`, aggr: { func: 'count' } })
    if (column.type === 'number') {
      for (const func of ['min', 'max', 'count_distinct'] as const)
        select.push({ ...item, alias: `${func}_${index}`, aggr: { func } })
    }
  })
  const row = singleRow(await context.query({ select }))
  const rowCount = countResult(row.rows)
  const summaries: ColumnSummary[] = columns.map((column, index) => {
    const supported = column.type === 'number' || column.type === 'string'
    const validCount = supported ? countResult(row[`valid_${index}`]) : 0
    if (validCount > rowCount) throw new Error('Statistics count exceeds row count')
    const summary: ColumnSummary = { column, validCount, missingCount: rowCount - validCount, distinctCount: 0 }
    if (column.type === 'number' && validCount > 0) {
      summary.min = numericResult(row[`min_${index}`])
      summary.max = numericResult(row[`max_${index}`])
      summary.distinctCount = countResult(row[`count_distinct_${index}`])
      if (summary.min > summary.max || summary.distinctCount < 1 || summary.distinctCount > validCount)
        throw new Error('Invalid numeric statistics')
    }
    return summary
  })
  return { rowCount, summaries }
}
