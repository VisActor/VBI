import {
  getDarkPivotChartGridConfig,
  getDarkColor,
  getDarkCrosshairLine,
  getDarkBrushConfig,
  getDarkLabel,
  getDarkLegend,
} from '../common'
import { getDarkTooltip } from '../common/tooltip'
import { getDarkBandAxis, getDarkLinearAxis } from '../common/axes'
import { getDarkAnnotation } from '../common/annotaion'

export const getAreaTheme = () => {
  const linearAxis = getDarkLinearAxis()
  const bandAxis = getDarkBandAxis()
  const crosshairLine = getDarkCrosshairLine()

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

    xAxis: bandAxis,
    yAxis: linearAxis,
    crosshairLine: crosshairLine,
    pivotGrid: getDarkPivotChartGridConfig(),
    annotation: getDarkAnnotation(),
  }
}

export const getAreaPercentTheme = () => {
  return getAreaTheme()
}
