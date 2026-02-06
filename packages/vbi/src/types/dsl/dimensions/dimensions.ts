import { z } from 'zod'

export const zVBIDimensionSchema = z.object({
  field: z.string(),
  alias: z.string(),
  encoding: z.string().optional(),
})

export const zVBIDimensionGroupSchema: z.ZodType<VBIDimensionGroup> = z.object({
  alias: z.string(),
  children: z.lazy(() => z.array(z.union([zVBIDimensionSchema, zVBIDimensionGroupSchema]))),
})

export const zVBIDimensionTree = z.array(z.union([zVBIDimensionSchema, zVBIDimensionGroupSchema]))

export type VBIDimension = z.infer<typeof zVBIDimensionSchema>
export type VBIDimensionGroup = {
  alias: string
  children: (VBIDimension | VBIDimensionGroup)[]
}
export type VBIDimensionTree = z.infer<typeof zVBIDimensionTree>
