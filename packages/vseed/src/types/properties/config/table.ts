import { z } from 'zod'
import { zBackgroundColor } from './backgroundColor/backgroundColor'

export const zTableConfig = z.object({
  backgroundColor: zBackgroundColor.nullish(),

  // Border
  borderColor: z.string().nullish(),

  // Body
  bodyFontSize: z.number().nullish(),
  bodyFontColor: z.string().nullish(),
  bodyBackgroundColor: z.string().nullish(),
  // Body interaction
  hoverBodyBackgroundColor: z.string().nullish(),
  hoverBodyInlineBackgroundColor: z.string().nullish(),

  // Header
  headerFontSize: z.number().nullish(),
  headerFontColor: z.string().nullish(),
  headerBackgroundColor: z.string().nullish(),
  // Header interaction
  hoverHeaderBackgroundColor: z.string().nullish(),
  hoverHeaderInlineBackgroundColor: z.string().nullish(),

  // Interaction
  selectedBorderColor: z.string().nullish(),
  selectedBackgroundColor: z.string().nullish(),

  // progressbar
  barHeight: z.string().nullish(),
  barMarkInBar: z.boolean().nullish(),
  barMarkWidth: z.number().nullish(),
  barPadding: z.array(z.union([z.number(), z.string()])).nullish(),
  barRightToLeft: z.boolean().nullish(),
  barAxisColor: z.string().nullish(),

  // backgroundColorScale
  backgroundColorScale: z
    .object({
      minColor: z.string().optional(),
      maxColor: z.string().optional(),
    })
    .nullish(),
})

export type TableConfig = z.infer<typeof zTableConfig>
