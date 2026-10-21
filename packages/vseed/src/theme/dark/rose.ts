import { getDarkPivotChartGridConfig, getDarkColor, getDarkBrushConfig, getDarkLabel, getDarkLegend } from '../common'
import { getDarkTooltip } from '../common/tooltip'

export const getRoseTheme = () => {
  const baseConfig = {
    animation: { morph: true },
    backgroundColor: 'transparent',
    color: getDarkColor(),
    label: getDarkLabel(),
    legend: getDarkLegend(),
    tooltip: getDarkTooltip(),
    brush: getDarkBrushConfig(),
  }

  return {
    ...baseConfig,
    label: {
      ...baseConfig.label,
      showValuePercent: true,
      showDimension: true,
    },
    pivotGrid: getDarkPivotChartGridConfig(),
  }
}

export const getRoseParallelTheme = () => {
  return getRoseTheme()
}
