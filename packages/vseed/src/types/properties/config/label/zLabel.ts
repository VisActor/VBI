import { z } from 'zod'
import { zNumFormat } from '../../format'
import { zChartDynamicFilter, zSelector, zSelectors } from 'src/types/dataSelector'

export const zLabel = z.object({
  enable: z.boolean().nullish(),
  wrap: z.boolean().nullish(),
  showValue: z.boolean().nullish(),
  showValuePercent: z.boolean().nullish(),
  showDimension: z.boolean().nullish(),
  autoFormat: z.boolean().nullish(),
  numFormat: zNumFormat.nullish(),
  labelFontSize: z.number().nullish(),
  labelFontWeight: z.number().or(z.string()).nullish(),
  labelBackgroundColor: z.string().nullish(),
  labelStrokeWidth: z.number().nonnegative().nullish(),
  labelAnimation: z.boolean().nullish(),
  labelColor: z.string().nullish(),
  labelColorSmartInvert: z.boolean().nullish(),
  labelPosition: z.string().nullish(),
  labelOverlap: z.boolean().nullish(),
  selector: z.union([zSelector, zSelectors]).nullish(),
  dynamicFilter: zChartDynamicFilter.optional(),
})
