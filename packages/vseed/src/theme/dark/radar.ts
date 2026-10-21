import { getDarkPivotChartGridConfig, getDarkColor, getDarkBrushConfig, getDarkLabel, getDarkLegend } from '../common'
import { getDarkTooltip } from '../common/tooltip'

export const getRadarTheme = () => {
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
    pivotGrid: getDarkPivotChartGridConfig(),
  }
}
