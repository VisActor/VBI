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
import { zBarGapInGroup, zBarMaxWidth } from './barWidth'
import { zRegressionLine } from '../regressionLine'
import { zDimensionLinkage } from './dimensionLinkage/dimensionLinkage'
import { zRegionPadding } from '../regionPadding'
import { zBarLikeAnimation } from './animation'

import { zBrushConfig } from '../brush/zBrush'

export const zColumnParallelConfig = z.object({
  backgroundColor: zBackgroundColor.nullish(),
  label: zLabel.nullish(),
  color: zColor.nullish(),
  tooltip: zTooltip.nullish(),
  legend: zLegend.nullish(),
  regionPadding: zRegionPadding.nullish(),

  xAxis: zXBandAxis.nullish(),
  yAxis: zYLinearAxis.nullish(),
  crosshairRect: zCrosshairRect.nullish(),
  cornerRadius: zCornerRadius.nullish(),
  stackCornerRadius: zStackCornerRadius.nullish(),
  barMaxWidth: zBarMaxWidth.nullish(),
  barGapInGroup: zBarGapInGroup.nullish(),
  pivotGrid: zPivotChartGridConfig.nullish(),
  annotation: zAnnotationConfig.nullish(),

  dimensionLinkage: zDimensionLinkage.nullish(),

  brush: zBrushConfig.nullish(),
  animation: zBarLikeAnimation.nullish(),
})
export const zColumnConfig = zColumnParallelConfig.extend({
  regressionLine: zRegressionLine.nullish(),
})
export const zColumnPercentConfig = zColumnParallelConfig.extend({})

export type ColumnConfig = z.infer<typeof zColumnConfig>
export type ColumnParallelConfig = z.infer<typeof zColumnParallelConfig>
export type ColumnPercentConfig = z.infer<typeof zColumnPercentConfig>
