import { z } from 'zod'
import { zLocale } from '../../i18n'
import {
  zBackgroundColor,
  zColor,
  zDataset,
  zDimensions,
  zEncoding,
  zLegend,
  zMeasures,
  zPieLabel,
  zTheme,
  zTooltip,
  zBrush,
  zPage,
  zPieLikeAnimation,
  zPieGeometry,
  zPieStyle,
} from '../../properties'

export const zPie = z.object({
  chartType: z.literal('pie'),
  ...zPieGeometry.shape,
  pieStyle: zPieStyle.nullish(),
  dataset: zDataset.nullish(),
  encoding: zEncoding.nullish(),
  dimensions: zDimensions.nullish(),
  measures: zMeasures.nullish(),
  page: zPage.nullish(),
  backgroundColor: zBackgroundColor.nullish(),
  color: zColor.nullish(),
  label: zPieLabel.nullish(),
  legend: zLegend.nullish(),
  tooltip: zTooltip.nullish(),
  brush: zBrush.nullish(),
  animation: zPieLikeAnimation.nullish(),
  theme: zTheme.nullish(),
  locale: zLocale.nullish(),
})
