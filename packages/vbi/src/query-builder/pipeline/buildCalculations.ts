import type { buildPipe } from './types'

/** @description 基础查询外投影计算列，排序和 limit 由后续管道应用。 */
export const buildCalculations: buildPipe = (queryDSL, { vbiDSL }) => {
  const calculations = vbiDSL.calculations
  if (!calculations?.length) return queryDSL
  const used = new Set([...vbiDSL.dimensions, ...vbiDSL.measures].map((node) => node.id))
  if (!used.size) throw new Error('Calculations require dimensions or measures')
  for (const calculation of calculations) {
    if (used.has(calculation.id)) throw new Error(`Duplicate calculation ID: ${calculation.id}`)
    used.add(calculation.id)
  }
  return {
    from: queryDSL,
    select: [
      '*',
      ...calculations.map(({ id, expr, parameters }) => ({
        alias: id,
        expr,
        ...(parameters ? { parameters: parameters.slice() } : {}),
      })),
    ],
  }
}
