import {
  getDarkPivotChartGridConfig,
  getDarkColor,
  getDarkCrosshairRect,
  getDarkBrushConfig,
  getDarkLabel,
  getDarkLegend,
} from '../common'
import { getDarkTooltip } from '../common/tooltip'
import { getDarkBandAxis, getDarkLinearAxis } from '../common/axes'
import { getDarkAnnotation } from '../common/annotaion'
import { getDarkRegressionLine } from '../common/regressionLine'

export const getColumnTheme = () => {
  const linearAxis = getDarkLinearAxis()
  const bandAxis = getDarkBandAxis()
  const crosshairRect = getDarkCrosshairRect()

  const baseConfig = {
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
    crosshairRect: crosshairRect,
    cornerRadius: [4, 4, 0, 0],
    stackCornerRadius: false,
    pivotGrid: getDarkPivotChartGridConfig(),
    annotation: getDarkAnnotation(),

    regressionLine: getDarkRegressionLine(),
  }
}

export const getColumnParallelTheme = () => {
  const linearAxis = getDarkLinearAxis()
  const bandAxis = getDarkBandAxis()
  const crosshairRect = getDarkCrosshairRect()

  const baseConfig = {
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
    crosshairRect: crosshairRect,
    cornerRadius: [4, 4, 0, 0],
    stackCornerRadius: false,
    pivotGrid: getDarkPivotChartGridConfig(),
    annotation: getDarkAnnotation(),
  }
}

export const getColumnPercentTheme = () => {
  return getColumnParallelTheme()
}
