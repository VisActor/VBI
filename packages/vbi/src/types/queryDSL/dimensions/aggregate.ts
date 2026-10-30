import { z } from 'zod'

export const VBI_DIMENSION_DATE_AGGREGATE_FUNCS = [
  'toYear',
  'toQuarter',
  'toMonth',
  'toWeek',
  'toDay',
  'toHour',
  'toMinute',
  'toSecond',
] as const

export const zDimensionAggregate = z.object({
  func: z.enum(VBI_DIMENSION_DATE_AGGREGATE_FUNCS),
})

export type VBIDimensionAggregate = z.infer<typeof zDimensionAggregate>
