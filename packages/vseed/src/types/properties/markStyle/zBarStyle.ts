import { z } from 'zod'
import { zSelector, zSelectors } from '../../dataSelector/selector'
import { zChartDynamicFilter } from '../../dataSelector/selector'

export const zBarStyle = z.object({
  selector: z.union([zSelector, zSelectors]).nullish(),
  dynamicFilter: zChartDynamicFilter.optional(),
  barVisible: z.boolean().nullish(),
  barColor: z.string().nullish(),
  barGradient: z.boolean().nullish(),
  barColorOpacity: z.number().nullish(),
  barBorderColor: z.string().nullish(),
  barBorderWidth: z.number().nullish(),
  barBorderStyle: z.union([z.literal('solid'), z.literal('dashed'), z.literal('dotted')]).nullish(),
  barRadius: z.union([z.number(), z.array(z.number())]).nullish(),
})
