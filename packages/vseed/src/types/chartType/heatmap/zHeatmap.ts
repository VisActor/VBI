import { zAnimation } from '../../properties/config/animation'
import { z } from 'zod'
import { zLocale } from '../../i18n'

import {
  zBackgroundColor,
  zColor,
  zColorLegend,
  zDataset,
  zDimensions,
  zLabel,
  zMeasures,
  zTheme,
  zTooltip,
  zBrush,
  zPage,
} from '../../properties'

export const zHeatmap = z.object({
  animation: zAnimation.nullish(),
  chartType: z.literal('heatmap'),
  dataset: zDataset.nullish(),
  dimensions: zDimensions.nullish(),
  measures: zMeasures.nullish(),
  page: zPage.nullish(),

  backgroundColor: zBackgroundColor.nullish(),
  color: zColor.nullish(),
  label: zLabel.nullish(),
  legend: zColorLegend.nullish(),
  tooltip: zTooltip.nullish(),
  brush: zBrush.nullish(),
  theme: zTheme.nullish(),
  locale: zLocale.nullish(),
})
