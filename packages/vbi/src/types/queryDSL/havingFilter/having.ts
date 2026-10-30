import { z } from 'zod'
import { zAggregate } from '../measures/aggregate'

const zHavingLogicalOperator = z.enum(['and', 'or'])
export type VBIHavingAggregate = z.infer<typeof zAggregate>

export const zVBIHavingFilter = z.object({
  id: z.string(),
  field: z.string(),
  aggregate: zAggregate,
  op: z.string(),
  value: z.any().optional(),
})

export type VBIHavingFilter = z.infer<typeof zVBIHavingFilter>

type VBIHavingBranch = {
  id: string
  op: z.infer<typeof zHavingLogicalOperator>
  conditions: VBIHavingClause[]
}

export type VBIHavingGroup = VBIHavingBranch
export type VBIHavingClause = VBIHavingFilter | VBIHavingGroup

export const zVBIHavingGroup: z.ZodType<VBIHavingGroup> = z.lazy(() =>
  z.object({
    id: z.string(),
    op: zHavingLogicalOperator,
    conditions: z.array(zVBIHavingClause),
  }),
)

export const zVBIHavingClause: z.ZodType<VBIHavingClause> = z.lazy(() => z.union([zVBIHavingFilter, zVBIHavingGroup]))
