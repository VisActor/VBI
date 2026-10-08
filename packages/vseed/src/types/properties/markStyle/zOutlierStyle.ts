import { z } from 'zod'
import { zSelector, zSelectors } from '../../dataSelector/selector'

export const zOutlierStyle = z.object({
  selector: z.union([zSelector, zSelectors]).optional(),
  pointVisible: z.boolean().optional(),
  pointSize: z.number().optional(),
  pointColor: z.string().optional(),
  pointColorOpacity: z.number().min(0).max(1).optional(),
  pointBorderColor: z.string().optional(),
  pointBorderWidth: z.number().min(0).optional(),
  pointBorderStyle: z.enum(['solid', 'dashed', 'dotted']).optional(),
})
