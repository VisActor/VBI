import { z } from 'zod'
import { zYBandAxis, zXLinearAxis } from './axes'
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
import { zDimensionLinkage } from './dimensionLinkage/dimensionLinkage'
import { zRegionPadding } from '../regionPadding'
import { zBarLikeAnimation } from './animation'

import { zBrushConfig } from '../brush/zBrush'

export const zBarConfig = z.object({
  backgroundColor: zBackgroundColor.nullish(),
  label: zLabel.nullish(),
  color: zColor.nullish(),
  tooltip: zTooltip.nullish(),
  legend: zLegend.nullish(),
  regionPadding: zRegionPadding.nullish(),

  xAxis: zXLinearAxis.nullish(),
  yAxis: zYBandAxis.nullish(),
  crosshairRect: zCrosshairRect.nullish(),
  cornerRadius: zCornerRadius.nullish(),
  stackCornerRadius: zStackCornerRadius.nullish(),
  pivotGrid: zPivotChartGridConfig.nullish(),
  annotation: zAnnotationConfig.nullish(),

  dimensionLinkage: zDimensionLinkage.nullish(),

  brush: zBrushConfig.nullish(),
  animation: zBarLikeAnimation.nullish(),
})
export const zBarParallelConfig = zBarConfig
export const zBarPercentConfig = zBarConfig

export type BarConfig = z.infer<typeof zBarConfig>
export type BarParallelConfig = z.infer<typeof zBarParallelConfig>
export type BarPercentConfig = z.infer<typeof zBarPercentConfig>
