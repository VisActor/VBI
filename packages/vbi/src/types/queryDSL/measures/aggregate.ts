import { z } from 'zod'

export const VBI_MEASURE_SIMPLE_AGGREGATE_FUNCS = [
  'count',
  'countDistinct',
  'sum',
  'avg',
  'min',
  'max',
  'variance',
  'variancePop',
  'stddev',
  'median',
] as const

const zSimpleAggregate = z.object({
  func: z.enum(VBI_MEASURE_SIMPLE_AGGREGATE_FUNCS),
})

const zQuantileAggregate = z.object({
  func: z.literal('quantile'),
  quantile: z.number().min(0).max(1).optional(),
})

export const zAggregate = z.discriminatedUnion('func', [zSimpleAggregate, zQuantileAggregate])
