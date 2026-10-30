import type { buildPipe } from './types'
import { mapAggregateForVQuery, mapDimensionAggregateForVQuery } from './aggregateMap'

export const buildSelect: buildPipe = (queryDSL, context) => {
  const { vbiDSL } = context
  const measures = vbiDSL.measures
  const dimensions = vbiDSL.dimensions

  const measureSelects = measures.map((measure) => ({
    field: measure.field,
    alias: measure.id,
    aggr: mapAggregateForVQuery(measure.aggregate),
  }))

  const dimensionSelects = dimensions.map((dimension) => {
    const aggregate = mapDimensionAggregateForVQuery(dimension.aggregate)
    if (!aggregate) {
      return {
        field: dimension.field,
        alias: dimension.id,
      }
    }

    return {
      field: dimension.field,
      alias: dimension.id,
      aggr: aggregate,
    }
  })

  return { ...queryDSL, select: [...measureSelects, ...dimensionSelects] }
}
