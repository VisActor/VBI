import type { Select, VQueryDSL } from '@visactor/vquery'
import { VBIDSL } from '../../types'
import { DimensionsBuilder, MeasuresBuilder, VBIBuilder } from 'src'
import { pipe } from 'remeda'

type buildPipe = (queryDSL: VQueryDSL, context: { vbiDSL: VBIDSL; builder: VBIBuilder }) => VQueryDSL

export const buildVQuery = (vbiDSL: VBIDSL, builder: VBIBuilder) => {
  const wrapper = (processor: (queryDSL: VQueryDSL, context: { vbiDSL: VBIDSL; builder: VBIBuilder }) => VQueryDSL) => {
    return (queryDSL: VQueryDSL): VQueryDSL => processor(queryDSL, { vbiDSL, builder })
  }

  return pipe(
    {} as VQueryDSL,
    wrapper(buildSelect),
    wrapper(buildGroupBy),
    wrapper(buildWhere),
    wrapper(buildHaving),
    wrapper(buildOrderBy),
    wrapper(buildLimit),
  )
}

const buildWhere: buildPipe = (queryDSL, context) => {
  const { vbiDSL } = context
  const whereFiltersRoot = vbiDSL.whereFilters
  const conditions = whereFiltersRoot?.conditions ?? []

  if (conditions.length === 0) {
    return queryDSL
  }

  // Flatten the nested filter structure for VQuery
  const flattenConditions = (items: typeof conditions): any[] => {
    return items.flatMap((item) => {
      // Check if it's a group (has op and conditions)
      if ('op' in item && 'conditions' in item) {
        return flattenConditions(item.conditions)
      }
      // It's a leaf filter
      const filter = item as { field: string; op?: string; value?: unknown }
      if (filter.op === 'between' && filter.value && typeof filter.value === 'object' && !Array.isArray(filter.value)) {
        const conditionsList = []
        const value = filter.value as { min?: unknown; max?: unknown; leftOp?: string; rightOp?: string }
        if (value.min !== undefined && value.min !== null && value.min !== '') {
          conditionsList.push({
            field: filter.field,
            op: value.leftOp === '<' ? '>' : '>=',
            value: value.min,
          })
        }
        if (value.max !== undefined && value.max !== null && value.max !== '') {
          conditionsList.push({
            field: filter.field,
            op: value.rightOp === '<' ? '<' : '<=',
            value: value.max,
          })
        }
        return conditionsList
      }

      let mappedOp = filter.op ?? '='
      if (Array.isArray(filter.value)) {
        if (mappedOp === '=') mappedOp = 'in'
        if (mappedOp === '!=') mappedOp = 'not in'
      }

      return [
        {
          field: filter.field,
          op: mappedOp,
          value: filter.value,
        },
      ]
    })
  }

  const result = { ...queryDSL }
  result.where = {
    op: 'and',
    conditions: flattenConditions(conditions),
  }

  return result as VQueryDSL
}

const buildOrderBy: buildPipe = (queryDSL, context) => {
  // Order by is now handled separately via having or other mechanisms
  // This function is kept for potential future use
  void context
  return queryDSL
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

const buildLimit: buildPipe = (queryDSL, context) => {
  const result = { ...queryDSL }
  const limit = context.vbiDSL.limit ?? 1000
  result.limit = limit

  return result as VQueryDSL
}

const buildHaving: buildPipe = (queryDSL, context) => {
  const { vbiDSL } = context
  const havingFilters = vbiDSL.havingFilters || []

  if (havingFilters.length === 0) {
    return queryDSL
  }

  const result = { ...queryDSL }
  result.having = {
    op: 'and',
    conditions: havingFilters.map((filter) => {
      const mappedOp = filter.operator ?? '='

      return {
        field: filter.field,
        op: mappedOp,
        value: filter.value,
      } as any
    }),
  }

  return result as VQueryDSL
}
