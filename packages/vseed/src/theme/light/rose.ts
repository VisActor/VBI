import {
  getLightColor,
  getLightLabel,
  getLightLegend,
  getLightBrushConfig,
  getLightPivotChartGridConfig,
} from '../common'
import { getLightTooltip } from '../common/tooltip'

export const getRoseTheme = () => {
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
    label: {
      ...baseConfig.label,
      showValuePercent: true,
      showDimension: true,
    },

    pivotGrid: getLightPivotChartGridConfig(),
  }
}

export const getRoseParallelTheme = () => {
  return getRoseTheme()
}
