import { z } from 'zod'
import { zSelector, zSelectors } from '../../dataSelector/selector'

export const zBoxPlotStyle = z.object({
  selector: zSelector.or(zSelectors).nullish(),
  boxVisible: z.boolean().nullish(),
  boxColor: z.string().nullish(),
  boxColorOpacity: z.number().min(0).max(1).nullish(),
  boxBorderColor: z.string().nullish(),
  boxBorderWidth: z.number().min(0).nullish(),
  boxBorderOpacity: z.number().min(0).max(1).nullish(),
  boxCornerRadius: z.number().nullish(),
  medianBorderColor: z.string().nullish(),
  whiskerBorderColor: z.string().nullish(),
})
