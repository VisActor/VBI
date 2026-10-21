import {
  getLightColor,
  getLightLabel,
  getLightLegend,
  getLightBrushConfig,
  getLightPivotChartGridConfig,
  getLightCrosshairLine,
} from '../common'
import { getLightTooltip } from '../common/tooltip'
import { getLightAnnotation } from '../common/annotaion'
import { getLightBandAxis, getLightLinearAxis } from '../common/axes'

export const getAreaTheme = () => {
  const linearAxis = getLightLinearAxis()
  const bandAxis = getLightBandAxis()
  const crosshairLine = getLightCrosshairLine()

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
    xAxis: bandAxis,
    yAxis: linearAxis,
    crosshairLine,

    pivotGrid: getLightPivotChartGridConfig(),
    annotation: getLightAnnotation(),
  }
}

export const getAreaPercentTheme = () => {
  return getAreaTheme()
}
