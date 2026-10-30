import type { VQueryDSL } from '@visactor/vquery'
import type { VBIDimensionAggregate, VBIQueryMeasure } from 'src/types/queryDSL'

type VQueryAggregate = NonNullable<Extract<VQueryDSL['select'][number], { field: unknown }>['aggr']>
type VBIMeasureAggregateInput = VBIQueryMeasure['aggregate']

const VBI_TO_VQUERY_MEASURE_AGGR_FUNC_MAP: Record<VBIMeasureAggregateInput['func'], VQueryAggregate['func']> = {
  count: 'count',
  countDistinct: 'count_distinct',
  sum: 'sum',
  avg: 'avg',
  min: 'min',
  max: 'max',
  variance: 'variance',
  variancePop: 'variance_pop',
  stddev: 'stddev',
  median: 'median',
  quantile: 'quantile',
}

const VBI_TO_VQUERY_DIMENSION_AGGR_FUNC_MAP: Record<VBIDimensionAggregate['func'], VQueryAggregate['func']> = {
  toYear: 'to_year',
  toQuarter: 'to_quarter',
  toMonth: 'to_month',
  toWeek: 'to_week',
  toDay: 'to_day',
  toHour: 'to_hour',
  toMinute: 'to_minute',
  toSecond: 'to_second',
}

export const mapAggregateForVQuery = (aggregate: VBIMeasureAggregateInput | undefined): VQueryAggregate | undefined => {
  if (!aggregate) {
    return aggregate
  }
  const mappedFunc = VBI_TO_VQUERY_MEASURE_AGGR_FUNC_MAP[aggregate.func] ?? aggregate.func
  return { ...aggregate, func: mappedFunc }
}

export const mapDimensionAggregateForVQuery = (
  aggregate: VBIDimensionAggregate | undefined,
): VQueryAggregate | undefined => {
  if (!aggregate) {
    return aggregate
  }
  const mappedFunc = VBI_TO_VQUERY_DIMENSION_AGGR_FUNC_MAP[aggregate.func] ?? aggregate.func
  return { ...aggregate, func: mappedFunc }
}
