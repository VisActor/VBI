import type { YBandAxis } from 'src/types'
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

export const getBarTheme = () => {
  const linearAxis = getDarkLinearAxis()
  const bandAxis = getDarkBandAxis()
  const barBandAxis: YBandAxis = {
    ...bandAxis,
    labelAutoHide: false,
    labelAutoHideGap: 1,
    labelAutoLimit: false,
    labelAutoLimitLength: undefined,
    labelAutoRotate: false,
    labelAutoRotateAngleRange: [0, -45, -90],
  }
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

    xAxis: linearAxis,
    yAxis: barBandAxis,
    crosshairRect: crosshairRect,
    cornerRadius: [0, 4, 4, 0],
    stackCornerRadius: false,
    pivotGrid: getDarkPivotChartGridConfig(),
    annotation: getDarkAnnotation(),
  }
}

export const getBarParallelTheme = () => {
  return getBarTheme()
}

export const getBarPercentTheme = () => {
  return getBarTheme()
}
