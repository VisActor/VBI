import { z } from 'zod'
import type { VBIWhereDatePredicate } from './date'
import { zVBIWhereDatePredicate } from './date'

export type {
  VBIWhereDateInput,
  VBIWhereDateUnit,
  VBIWhereDateBounds,
  VBIWhereDatePeriod,
  VBIWhereDatePredicate,
} from './date'
export { zVBIWhereDatePredicate } from './date'

// --- Where filter types ---

const zWhereLogicalOperator = z.enum(['and', 'or'])

export type VBIWhereScalarFilter = {
  id: string
  field: string
  op: string
  value?: unknown
}

export type VBIWhereDateFilter = {
  id: string
  field: string
  op: 'date'
  value: VBIWhereDatePredicate
}

export type VBIWhereFilter = VBIWhereScalarFilter | VBIWhereDateFilter

export const zVBIWhereDateFilter = z.object({
  id: z.string(),
  field: z.string(),
  op: z.literal('date'),
  value: zVBIWhereDatePredicate,
})

export const zVBIWhereScalarFilter = z.object({
  id: z.string(),
  field: z.string(),
  op: z.string().refine((op) => op !== 'date'),
  value: z.any().optional(),
})

export const zVBIWhereFilter = z.union([zVBIWhereDateFilter, zVBIWhereScalarFilter])

type VBIWhereBranch = {
  id: string
  op: z.infer<typeof zWhereLogicalOperator>
  conditions: VBIWhereClause[]
}

export type VBIWhereGroup = VBIWhereBranch
export type VBIWhereClause = VBIWhereFilter | VBIWhereGroup

export const zVBIWhereGroup: z.ZodType<VBIWhereGroup> = z.lazy(() =>
  z.object({
    id: z.string(),
    op: zWhereLogicalOperator,
    conditions: z.array(zVBIWhereClause),
  }),
)

export const zVBIWhereClause: z.ZodType<VBIWhereClause> = z.lazy(() => z.union([zVBIWhereFilter, zVBIWhereGroup]))
