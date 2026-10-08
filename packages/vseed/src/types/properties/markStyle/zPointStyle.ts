import { z } from 'zod'
import { zChartDynamicFilter, zSelector, zSelectors } from '../../dataSelector/selector'

export const zPointStyle = z.object({
  selector: z.union([zSelector, zSelectors]).nullish(),
  dynamicFilter: zChartDynamicFilter.optional(),
  pointVisible: z.boolean().nullish(),
  pointSize: z.number().nullish(),
  pointColor: z.string().nullish(),
  pointColorOpacity: z.number().nullish(),
  pointBorderColor: z.string().nullish(),
  pointBorderWidth: z.number().nullish(),
  pointBorderStyle: z.union([z.enum(['solid', 'dashed', 'dotted'])]).nullish(),
})
