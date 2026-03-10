import type { Select, VQueryDSL } from '@visactor/vquery'
import { VBIDSL } from '../../types'
import { DimensionsBuilder, MeasuresBuilder, VBIBuilder } from 'src'
import { pipe } from 'remeda'
import type { WhereFilterConditionOrGroup } from 'src/types/dsl/whereFilters/filters'

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

/**
 * 将 WhereFilterCondition 转换为查询条件
 */
const mapCondition = (filter: { field: string; operator?: string; value?: any }): any => {
  if (
    filter.operator === 'between' &&
    filter.value &&
    typeof filter.value === 'object' &&
    !Array.isArray(filter.value)
  ) {
    const conditions = []
    if (filter.value.min !== undefined && filter.value.min !== null && filter.value.min !== '') {
      conditions.push({
        field: filter.field,
        op: filter.value.leftOp === '<' ? '>' : '>=',
        value: filter.value.min,
      })
    }
    if (filter.value.max !== undefined && filter.value.max !== null && filter.value.max !== '') {
      conditions.push({
        field: filter.field,
        op: filter.value.rightOp === '<' ? '<' : '<=',
        value: filter.value.max,
      })
    }
    return conditions
  }

  let mappedOp = filter.operator ?? '='
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
}

/**
 * 递归转换 WhereFilterConditionOrGroup 为查询条件
 */
const transformFilter = (filter: WhereFilterConditionOrGroup): any[] => {
  // 判断是条件还是条件组
  if ('logic' in filter && 'conditions' in filter) {
    // 条件组，递归处理
    const conditions = filter.conditions.flatMap(transformFilter)
    return conditions
  } else {
    // 条件，转换为查询条件
    return mapCondition(filter as { field: string; operator?: string; value?: any })
  }
}

const buildWhere: buildPipe = (queryDSL, context) => {
  const { vbiDSL } = context
  const whereFilters = vbiDSL.whereFilters

  // 检查是否有条件
  if (!whereFilters || !whereFilters.conditions || whereFilters.conditions.length === 0) {
    return queryDSL
  }

  const result = { ...queryDSL }
  const conditions = transformFilter(whereFilters)

  result.where = {
    op: whereFilters.logic,
    conditions: conditions,
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
