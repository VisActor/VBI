import { z } from 'zod'
import { zXBandAxis, zYLinearAxis } from './axes'
import { zCrosshairRect } from './crosshair'
import { zCornerRadius } from './cornerRadius'
import { zStackCornerRadius } from './stackCornerRadius/stackCornerRadius'
import { zBackgroundColor } from './backgroundColor/backgroundColor'
import { zColor } from './color/color'
import { zLabel } from './label'
import { zLegend } from './legend/legend'
import { zTooltip } from './tooltip/tooltip'
import { zAnnotationConfig } from './annotation/zAnnotation'
import { zPivotChartGridConfig } from './pivotGrid'
import { zRegressionLine } from '../regressionLine'
import { zDimensionLinkage } from './dimensionLinkage/dimensionLinkage'

import { zBrushConfig } from '../brush/zBrush'

export const zHistogramConfig = z.object({
  backgroundColor: zBackgroundColor.nullish(),
  label: zLabel.nullish(),
  color: zColor.nullish(),
  tooltip: zTooltip.nullish(),
  legend: zLegend.nullish(),

  xAxis: zXBandAxis.nullish(),
  yAxis: zYLinearAxis.nullish(),
  crosshairRect: zCrosshairRect.nullish(),
  cornerRadius: zCornerRadius.nullish(),
  stackCornerRadius: zStackCornerRadius.nullish(),
  pivotGrid: zPivotChartGridConfig.nullish(),
  annotation: zAnnotationConfig.nullish(),
  binCount: z.number().positive().nullish(),
  binStep: z.number().positive().nullish(),
  binValueType: z.literal('count').or(z.literal('percentage')).nullish(),
  regressionLine: zRegressionLine.nullish(),

  dimensionLinkage: zDimensionLinkage.nullish(),

  brush: zBrushConfig.nullish(),
})

export type HistogramConfig = z.infer<typeof zHistogramConfig>
