import { z } from 'zod'
import { zXBandAxis, zYLinearAxis } from './axes'
import { zCornerRadius } from './cornerRadius'
import { zStackCornerRadius } from './stackCornerRadius'
import { zCrosshairRect } from './crosshair'
import { zBackgroundColor } from './backgroundColor/backgroundColor'
import { zColor } from './color/color'
import { zLabel } from './label'
import { zLegend } from './legend/legend'
import { zTooltip } from './tooltip/tooltip'
import { zAnnotationConfig } from './annotation/zAnnotation'
import { zPivotChartGridConfig } from './pivotGrid'
import { zDimensionLinkage } from './dimensionLinkage/dimensionLinkage'
import type { ChartType } from '../chartType'
import type { FoldInfo } from '../datasetReshapeInfo/datasetReshapeInfo'

export const zDualAxisConfig = z.object({
  backgroundColor: zBackgroundColor.nullish(),
  label: zLabel.nullish(),
  color: zColor.nullish(),
  tooltip: zTooltip.nullish(),
  legend: zLegend.nullish(),

  alignTicks: z.array(z.boolean()).or(z.boolean()).nullish(),
  primaryYAxis: z.array(zYLinearAxis).or(zYLinearAxis).nullish(),
  secondaryYAxis: z.array(zYLinearAxis).or(zYLinearAxis).nullish(),

  xAxis: zXBandAxis.nullish(),
  crosshairRect: zCrosshairRect.nullish(),
  cornerRadius: zCornerRadius.nullish(),
  stackCornerRadius: zStackCornerRadius.nullish(),
  pivotGrid: zPivotChartGridConfig.nullish(),
  annotation: zAnnotationConfig.nullish(),

  dimensionLinkage: zDimensionLinkage.nullish(),
})

export type DualAxisConfig = z.infer<typeof zDualAxisConfig>

export type DualAxisOptions = {
  axisType: 'primary' | 'secondary'
  chartType: ChartType
  foldInfo: FoldInfo
}
