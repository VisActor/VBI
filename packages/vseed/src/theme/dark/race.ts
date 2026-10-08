import type { Player, YBandAxis } from 'src/types'
import {
  getDarkPivotChartGridConfig,
  getDarkColor,
  getDarkCrosshairRect,
  getDarkCrosshairLine,
  getDarkBrushConfig,
  getDarkLabel,
  getDarkLegend,
  getDarkPlayer,
} from '../common'
import { getDarkTooltip } from '../common/tooltip'
import { getDarkBandAxis, getDarkLinearAxis } from '../common/axes'
import { getDarkAnnotation } from '../common/annotaion'
import { getDarkRegressionLine } from '../common/regressionLine'

export const getRaceBarTheme = () => {
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
  const player = getDarkPlayer() as Player

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
    legend: {
      ...baseConfig.legend,
      enable: false,
    },
    xAxis: linearAxis,
    yAxis: barBandAxis,
    crosshairRect: crosshairRect,
    cornerRadius: [0, 4, 4, 0],
    stackCornerRadius: false,
    pivotGrid: getDarkPivotChartGridConfig(),
    annotation: getDarkAnnotation(),
    player,
  }
}

export const getRaceColumnTheme = () => {
  const linearAxis = getDarkLinearAxis()
  const bandAxis = getDarkBandAxis()
  const crosshairRect = getDarkCrosshairRect()
  const player = getDarkPlayer() as Player

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
    legend: {
      ...baseConfig.legend,
      enable: false,
    },
    xAxis: bandAxis,
    yAxis: linearAxis,
    crosshairRect: crosshairRect,
    cornerRadius: [4, 4, 0, 0],
    stackCornerRadius: false,
    pivotGrid: getDarkPivotChartGridConfig(),
    annotation: getDarkAnnotation(),
    player,

    regressionLine: getDarkRegressionLine(),
  }
}

export const getRaceScatterTheme = () => {
  const linearAxis = getDarkLinearAxis()
  const crosshairLine = getDarkCrosshairLine()
  const player = getDarkPlayer() as Player

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
    legend: {
      ...baseConfig.legend,
      enable: false,
    },
    crosshairLine,
    sizeRange: [8, 24],
    xAxis: {
      ...linearAxis,
      max: true,
      line: {
        ...linearAxis.line,
        visible: true,
      },
    },
    yAxis: {
      ...linearAxis,
      max: true,
      line: {
        ...linearAxis.line,
        visible: true,
      },
    },
    label: {
      ...baseConfig.label,
      showValue: false,
      showValuePercent: false,
    },
    pivotGrid: getDarkPivotChartGridConfig(),
    annotation: getDarkAnnotation(),
    regressionLine: getDarkRegressionLine(),
    player,
  }
}
