import { z } from 'zod'

export const zStackCornerRadius = z.boolean()
export type StackCornerRadius = z.infer<typeof zStackCornerRadius>
