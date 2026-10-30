import type { ProfileBin } from '../types'
import type { ColumnSummary } from './summary'
import { countResult, numericResult, singleRow, validValues, type ProfileContext } from './context'

const validateBinCounts = (bins: ProfileBin[], expected: number) => {
  if (bins.reduce((sum, bin) => sum + bin.count, 0) !== expected) throw new Error('Statistics changed during query')
  return bins
}

/** @description 分箱边界在 VBI 计算，箱内计数在数据源聚合；离散值仅返回有界的频次表。 */
export const queryNumberBins = async (
  context: ProfileContext,
  summary: ColumnSummary,
  maxBins: number,
  discreteMax: number,
): Promise<ProfileBin[]> => {
  if (!summary.validCount) return []
  const { column, min, max, distinctCount } = summary
  if (distinctCount <= discreteMax) {
    const rows = await context.query({
      select: [
        { field: column.name, alias: 'value' },
        { field: '*', alias: 'count', aggr: { func: 'count' } },
      ],
      where: validValues(column),
      groupBy: [column.name],
      orderBy: [{ field: 'value', order: 'asc' }],
      limit: discreteMax,
    })
    return validateBinCounts(
      rows.map((row) => ({
        min: numericResult(row.value),
        max: numericResult(row.value),
        count: countResult(row.count),
      })),
      summary.validCount,
    )
  }
  const length = Math.min(maxBins, distinctCount)
  const scale = Math.max(Math.abs(min!), Math.abs(max!))
  const low = min! / scale
  const span = max! / scale - low
  const bounds = Array.from({ length: length + 1 }, (_, index) =>
    index === 0 ? min! : index === length ? max! : (low + (span * index) / length) * scale,
  )
  const row = singleRow(
    await context.query({
      select: bounds.slice(0, -1).map((lower, index) => ({
        field: column.name,
        alias: `bin_${index}`,
        aggr: { func: 'count' },
        when: {
          op: 'and',
          conditions: [
            { field: column.name, op: '>=', value: lower },
            { field: column.name, op: index === length - 1 ? '<=' : '<', value: bounds[index + 1] },
          ],
        },
      })),
    }),
  )
  return validateBinCounts(
    bounds.slice(0, -1).map((min, index) => ({ min, max: bounds[index + 1], count: countResult(row[`bin_${index}`]) })),
    summary.validCount,
  )
}
