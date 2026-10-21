import {
  getLightColor,
  getLightLabel,
  getLightLegend,
  getLightBrushConfig,
  getLightPivotChartGridConfig,
} from '../common'
import { getLightTooltip } from '../common/tooltip'

export const getRadarTheme = () => {
  const baseConfig = {
    animation: { morph: true },
    backgroundColor: 'transparent',
    color: getLightColor(),
    label: getLightLabel(),
    legend: getLightLegend(),
    tooltip: getLightTooltip(),
    brush: getLightBrushConfig(),
  }

  return {
    ...baseConfig,
    pivotGrid: getLightPivotChartGridConfig(),
  }
}
