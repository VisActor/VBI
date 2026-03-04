import type { Select, VQueryDSL, Having } from '@visactor/vquery'
import { VBIDSL } from '../../types'
import { DimensionsBuilder, MeasuresBuilder, VBIBuilder } from 'src'
import { pipe } from 'remeda'

type buildPipe = (queryDSL: VQueryDSL, context: { vbiDSL: VBIDSL; builder: VBIBuilder }) => VQueryDSL

export const buildVQuery = (vbiDSL: VBIDSL, builder: VBIBuilder) => {
  const wrapper = (processor: (queryDSL: VQueryDSL, context: { vbiDSL: VBIDSL; builder: VBIBuilder }) => VQueryDSL) => {
    return (queryDSL: VQueryDSL): VQueryDSL => processor(queryDSL, { vbiDSL, builder })
  }

  return pipe({} as VQueryDSL, wrapper(buildSelect), wrapper(buildGroupBy), wrapper(buildHaving), wrapper(buildLimit))
}

const buildSelect: buildPipe = (queryDSL, context) => {
  const { vbiDSL } = context
  const measures = vbiDSL.measures
  const dimensions = vbiDSL.dimensions

  const result = { ...queryDSL }
  const measureNodes = measures.filter((measure) => MeasuresBuilder.isMeasureNode(measure))
  const measureSelects: Select<Record<string, unknown>> = measureNodes.map((measure) => {
    return {
      field: measure.field,
      alias: measure.alias,
      aggr: measure.aggregate,
    }
  })

  const dimensionNodes = dimensions.filter((dimension) => DimensionsBuilder.isDimensionNode(dimension))
  const dimensionSelects: Select<Record<string, unknown>> = dimensionNodes.map((dimension) => {
    return {
      field: dimension.field,
      alias: dimension.alias,
    }
  })

  result.select = measureSelects.concat(dimensionSelects)

  return result as VQueryDSL
}

const buildGroupBy: buildPipe = (queryDSL, context) => {
  const result = { ...queryDSL }
  const { vbiDSL } = context

  const dimensions = vbiDSL.dimensions
  const dimensionNodes = dimensions.filter((dimension) => DimensionsBuilder.isDimensionNode(dimension))

  result.groupBy = dimensionNodes.map((dimension) => dimension.field)
  return result as VQueryDSL
}

const buildHaving: buildPipe = (queryDSL, context) => {
  const result = { ...queryDSL }
  const { vbiDSL } = context

  const having = vbiDSL.having
  if (!having || having.length === 0) {
    return result as VQueryDSL
  }

  // Convert VBI having filters to VQuery having format
  const havingConditions = having.map((filter): any => {
    // Handle simple filter
    if ('field' in filter && 'operator' in filter && 'value' in filter) {
      return {
        field: filter.field,
        op: filter.operator,
        value: filter.value,
      }
    }
    return filter
  })

  // Wrap in a group with 'and' logic
  result.having = {
    op: 'and',
    conditions: havingConditions,
  } as Having<Record<string, unknown>>

  return result as VQueryDSL
}

const buildLimit: buildPipe = (queryDSL) => {
  const result = { ...queryDSL }

  result.limit = 1000

  return result as VQueryDSL
}
