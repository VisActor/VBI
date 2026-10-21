import { zAnimation } from './animation'
import { z } from 'zod'
import { zBackgroundColor } from './backgroundColor/backgroundColor'
import { zColor } from './color/color'
import { zLabel } from './label'
import { zColorLegend } from './legend/legend'
import { zTooltip } from './tooltip/tooltip'
import { zPivotChartGridConfig } from './pivotGrid'
import { zHeatmapCell } from './heatmap/zHeatmap'
import { zXBandAxis, zYBandAxis } from './axes/zBandAxis'

import { zBrushConfig } from '../brush/zBrush'

export const zHeatmapConfig = z.object({
  animation: zAnimation.nullish(),
  backgroundColor: zBackgroundColor.nullish(),
  label: zLabel.nullish(),
  color: zColor.nullish(),
  tooltip: zTooltip.nullish(),
  legend: zColorLegend.nullish(),

  pivotGrid: zPivotChartGridConfig.nullish(),
  cell: zHeatmapCell.nullish(),

  xAxis: zXBandAxis.nullish(),
  yAxis: zYBandAxis.nullish(),

  brush: zBrushConfig.nullish(),
})

export type HeatmapConfig = z.infer<typeof zHeatmapConfig>
