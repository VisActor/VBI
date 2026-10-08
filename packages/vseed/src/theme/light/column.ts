import {
  getLightColor,
  getLightLabel,
  getLightLegend,
  getLightBrushConfig,
  getLightPivotChartGridConfig,
  getLightCrosshairRect,
} from '../common'
import { getLightTooltip } from '../common/tooltip'
import { getLightAnnotation } from '../common/annotaion'
import { getLightBandAxis, getLightLinearAxis } from '../common/axes'
import { getLightRegressionLine } from '../common/regressionLine'

export const getColumnTheme = () => {
  const linearAxis = getLightLinearAxis()
  const bandAxis = getLightBandAxis()
  const crosshairRect = getLightCrosshairRect()

  const baseConfig = {
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
    crosshairRect,

    cornerRadius: [4, 4, 0, 0],
    stackCornerRadius: false,
    pivotGrid: getLightPivotChartGridConfig(),
    annotation: getLightAnnotation(),

    regressionLine: getLightRegressionLine(),
  }
}

export const getColumnParallelTheme = () => {
  const linearAxis = getLightLinearAxis()
  const bandAxis = getLightBandAxis()
  const crosshairRect = getLightCrosshairRect()

  const baseConfig = {
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
    crosshairRect,

    cornerRadius: [4, 4, 0, 0],
    stackCornerRadius: false,
    pivotGrid: getLightPivotChartGridConfig(),
    annotation: getLightAnnotation(),
  }
}

export const getColumnPercentTheme = () => {
  return getColumnParallelTheme()
}
