import type { YBandAxis } from 'src/types'
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

export const getBarTheme = () => {
  const linearAxis = getLightLinearAxis()
  const bandAxis = getLightBandAxis()
  const barBandAxis: YBandAxis = {
    ...bandAxis,
    labelAutoHide: false,
    labelAutoHideGap: 1,
    labelAutoLimit: false,
    labelAutoLimitLength: undefined,
    labelAutoRotate: false,
    labelAutoRotateAngleRange: [0, -45, -90],
  }
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
    xAxis: linearAxis,
    yAxis: barBandAxis,
    crosshairRect,

    cornerRadius: [0, 4, 4, 0],
    stackCornerRadius: false,
    pivotGrid: getLightPivotChartGridConfig(),
    annotation: getLightAnnotation(),
  }
}

export const getBarParallelTheme = () => {
  return getBarTheme()
}

export const getBarPercentTheme = () => {
  return getBarTheme()
}
