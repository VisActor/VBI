import { z } from 'zod'

export const zVBISortOrder = z.enum(['asc', 'desc'])
export const zVBISort = z.object({
  order: zVBISortOrder,
})

export type VBISortOrder = z.infer<typeof zVBISortOrder>
export type VBISort = z.infer<typeof zVBISort>
