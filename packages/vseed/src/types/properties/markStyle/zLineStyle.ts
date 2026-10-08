import { z } from 'zod'
import { zChartDynamicFilter, zSelector, zSelectors } from '../../dataSelector/selector'

export const zLineStyle = z.object({
  selector: z.union([zSelector, zSelectors]).nullish(),
  dynamicFilter: zChartDynamicFilter.optional(),
  lineVisible: z.boolean().nullish(),
  lineSmooth: z.boolean().nullish(),
  lineColor: z.string().nullish(),
  lineColorOpacity: z.number().nullish(),
  lineWidth: z.number().nullish(),
  lineStyle: z.union([z.enum(['solid', 'dashed', 'dotted'])]).nullish(),
})
