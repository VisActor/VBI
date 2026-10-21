import {
  getDarkPivotChartGridConfig,
  getDarkColorLegend,
  getDarkColor,
  getDarkBrushConfig,
  getDarkLabel,
  getDarkLegend,
} from '../common'
import { getDarkTooltip } from '../common/tooltip'
import { getDarkBandAxis } from '../common/axes'
import { getDarkHeatmapCellTheme } from '../common/heatmapCell'

export const getHeatmapTheme = () => {
  const bandAxis = getDarkBandAxis()
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
    legend: getDarkColorLegend(),
    xAxis: bandAxis,
    yAxis: bandAxis,
    label: {
      ...baseConfig.label,
      labelColorSmartInvert: true,
    },

    cell: getDarkHeatmapCellTheme(),
    pivotGrid: getDarkPivotChartGridConfig(),
  }
}
