import type { BinsOptions, BinsResult, ColumnBins, ColumnProfile, ProfileOptions, ProfileResult } from '../types'
import { selectColumns, positiveInteger, type ProfileContext } from './context'
import { querySummary } from './summary'
import { queryNumberBins } from './bins'
import { queryCategory } from './category'

export const queryProfile = async (context: ProfileContext, options: ProfileOptions): Promise<ProfileResult> => {
  const maxBins = positiveInteger(options.bins?.maxBins ?? 12, 'maxBins')
  const discreteMax = positiveInteger(options.bins?.discreteMax ?? 20, 'discreteMax')
  const topK = positiveInteger(options.topK ?? 3, 'topK')
  const { rowCount, summaries } = await querySummary(
    context,
    selectColumns(context, options.columns),
    options.emptyString,
  )
  const columns: Record<string, ColumnProfile> = Object.create(null)
  for (const summary of summaries) {
    const { column, validCount, missingCount, min, max } = summary
    if (!validCount) columns[column.name] = { type: 'unknown', validCount, missingCount }
    else if (column.type === 'number') {
      const bins = await queryNumberBins(context, summary, maxBins, discreteMax)
      columns[column.name] = { type: 'number', validCount, missingCount, min, max, bins }
    } else {
      const category = await queryCategory(context, summary, topK, options.emptyString)
      columns[column.name] = { type: 'string', validCount, missingCount, ...category }
    }
  }
  return { rowCount, columns }
}

export const queryBins = async (context: ProfileContext, options: BinsOptions): Promise<BinsResult> => {
  const maxBins = positiveInteger(options.maxBins ?? 12, 'maxBins')
  const discreteMax = positiveInteger(options.discreteMax ?? 20, 'discreteMax')
  const selected = options.columns
    ? selectColumns(context, options.columns)
    : context.columns.filter((column) => column.type === 'number')
  if (selected.some((column) => column.type !== 'number')) throw new Error('queryBins requires number columns')
  const { rowCount, summaries } = await querySummary(context, selected)
  const columns: Record<string, ColumnBins> = Object.create(null)
  for (const summary of summaries) {
    const { column, validCount, missingCount, min, max } = summary
    columns[column.name] = {
      validCount,
      missingCount,
      min,
      max,
      bins: await queryNumberBins(context, summary, maxBins, discreteMax),
    }
  }
  return { rowCount, columns }
}
