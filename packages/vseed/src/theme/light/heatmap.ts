import {
  getLightColor,
  getLightLabel,
  getLightLegend,
  getLightBrushConfig,
  getLightPivotChartGridConfig,
  getLightColorLegend,
} from '../common'
import { getLightTooltip } from '../common/tooltip'
import { getLightBandAxis } from '../common/axes'
import { getLightHeatmapCellTheme } from '../common/heatmapCell'

export const getHeatmapTheme = () => {
  const bandAxis = getLightBandAxis()

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
    legend: getLightColorLegend(),
    xAxis: bandAxis,
    yAxis: bandAxis,
    label: {
      ...baseConfig.label,
      labelColorSmartInvert: true,
    },

    cell: getLightHeatmapCellTheme(),
    pivotGrid: getLightPivotChartGridConfig(),
  }
}
