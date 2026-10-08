import { z } from 'zod'

export const zCornerRadius = z.number().or(z.array(z.number()))
export type CornerRadius = z.infer<typeof zCornerRadius>
