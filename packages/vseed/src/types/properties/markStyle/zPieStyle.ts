import { z } from 'zod'

export const zPieStyle = z.object({
  pieBorderColor: z.string().nullish(),
  pieBorderWidth: z.number().nonnegative().nullish(),
  pieCornerRadius: z.number().nonnegative().nullish(),
  pieHoverEffect: z.enum(['opacity', 'enlarge', 'none']).nullish(),
})
