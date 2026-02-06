import { z } from 'zod'

const zSimpleAggregate = z.object({
  func: z.enum(['sum', 'avg', 'min', 'max']),
})

const zCountAggregate = z.object({
  func: z.literal('count'),
})

const zCountDistinctAggregate = z.object({
  func: z.literal('count_distinct'),
})

const zQuantileAggregate = z.object({
  func: z.literal('quantile'),
  quantile: z.number().min(0).max(1),
})

export const zAggregate = z.discriminatedUnion('func', [zSimpleAggregate, zCountAggregate, zCountDistinctAggregate, zQuantileAggregate])
