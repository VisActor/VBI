import { z } from 'zod'
import { zAggregate } from './aggregate'
import { zMeasureExpr } from './expr'

export const zVBIMeasure = z.object({
  expr: zMeasureExpr,
  alias: z.string(),
  encoding: z.literal(['yAxis', 'xAxis', 'color', 'label', 'tooltip', 'size']),
  aggregate: zAggregate,
})
export const zVBIMeasureGroup: z.ZodType<VBIMeasureGroup> = z.object({
  alias: z.string(),
  children: z.lazy(() => z.array(z.union([zVBIMeasure, zVBIMeasureGroup]))),
})
export const zVBIMeasureTree = z.array(z.union([zVBIMeasure, zVBIMeasureGroup]))

export type VBIMeasure = z.infer<typeof zVBIMeasure>
export type VBIMeasureGroup = {
  alias: string
  children: (VBIMeasure | VBIMeasureGroup)[]
}
export type VBIMeasureTree = z.infer<typeof zVBIMeasureTree>
