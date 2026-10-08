import { z } from 'zod'
import { zBackgroundColor } from './backgroundColor/backgroundColor'
import { zColor } from './color/color'
import { zPieLabel } from './label'
import { zLegend } from './legend/legend'
import { zTooltip } from './tooltip/tooltip'
import { zPivotChartGridConfig } from './pivotGrid'
import { zBrushConfig } from '../brush/zBrush'
import { zPieLikeAnimation, zRadarAnimation } from './animation'
import { zPieGeometry } from './pieGeometry'
import { zPieStyle } from '../markStyle/zPieStyle'
import { zCenterTextConfig } from './centerText'

const zPolarConfig = z.object({
  backgroundColor: zBackgroundColor.nullish(),
  label: zPieLabel.nullish(),
  color: zColor.nullish(),
  tooltip: zTooltip.nullish(),
  legend: zLegend.nullish(),

  pivotGrid: zPivotChartGridConfig.nullish(),
  cornerRadius: z.number().nullish(),
  brush: zBrushConfig.nullish(),
  animation: zPieLikeAnimation.nullish(),
})
export const zPieConfig = zPolarConfig.extend({
  ...zPieGeometry.shape,
  pieStyle: zPieStyle.nullish(),
})
export const zDonutConfig = zPieConfig.extend({ centerText: zCenterTextConfig.nullish() })
export const zRadarConfig = zPolarConfig.extend({
  animation: zRadarAnimation.nullish(),
})

export type PieConfig = z.infer<typeof zPieConfig>
export type DonutConfig = z.infer<typeof zDonutConfig>
export type RadarConfig = z.infer<typeof zRadarConfig>
