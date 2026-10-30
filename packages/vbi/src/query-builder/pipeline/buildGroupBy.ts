import type { buildPipe } from './types'

export const buildGroupBy: buildPipe = (queryDSL, context) => {
  const { vbiDSL } = context
  const dimensions = vbiDSL.dimensions

  return {
    ...queryDSL,
    groupBy: dimensions.map((dimension) => (dimension.aggregate ? dimension.id : dimension.field)),
  }
}
