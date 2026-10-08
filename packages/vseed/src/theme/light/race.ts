import type { Player, YBandAxis } from 'src/types'
import {
  getLightColor,
  getLightLabel,
  getLightLegend,
  getLightBrushConfig,
  getLightPivotChartGridConfig,
  getLightCrosshairRect,
  getLightCrosshairLine,
  getLightPlayer,
} from '../common'
import { getLightTooltip } from '../common/tooltip'
import { getLightAnnotation } from '../common/annotaion'
import { getLightBandAxis, getLightLinearAxis } from '../common/axes'
import { getLightRegressionLine } from '../common/regressionLine'

export const getRaceBarTheme = () => {
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
  const player = getLightPlayer() as Player

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
    legend: {
      ...baseConfig.legend,
      enable: false,
    },
    xAxis: {
      ...linearAxis,
      animation: {
        duration: player.interval,
        easing: 'linear',
      },
      nice: false,
    },
    yAxis: {
      ...barBandAxis,
      animation: {
        duration: player.interval ? player.interval * 0.6 : undefined,
        easing: 'cubicInOut',
      },
    },
    crosshairRect,
    player,

    cornerRadius: [0, 4, 4, 0],
    stackCornerRadius: false,
    pivotGrid: getLightPivotChartGridConfig(),
    annotation: getLightAnnotation(),
  }
}

export const getRaceColumnTheme = () => {
  const linearAxis = getLightLinearAxis()
  const bandAxis = getLightBandAxis()
  const crosshairRect = getLightCrosshairRect()
  const player = getLightPlayer() as Player

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
    legend: {
      ...baseConfig.legend,
      enable: false,
    },
    xAxis: {
      ...bandAxis,
      animation: {
        duration: player.interval ? player.interval * 0.6 : undefined,
        easing: 'cubicInOut',
      },
    },
    yAxis: {
      ...linearAxis,
      animation: {
        duration: player.interval,
        easing: 'linear',
      },
      nice: false,
    },
    crosshairRect,
    player,

    cornerRadius: [4, 4, 0, 0],
    stackCornerRadius: false,
    pivotGrid: getLightPivotChartGridConfig(),
    annotation: getLightAnnotation(),

    regressionLine: getLightRegressionLine(),
  }
}

export const getRaceScatterTheme = () => {
  const linearAxis = getLightLinearAxis()
  const crosshairLine = getLightCrosshairLine()
  const player = getLightPlayer() as Player

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
    legend: {
      ...baseConfig.legend,
      enable: false,
    },
    crosshairLine,
    sizeRange: [8, 24],
    xAxis: {
      ...linearAxis,
      max: true,
      animation: {
        duration: player.interval ? player.interval * 0.6 : undefined,
        easing: 'cubicInOut',
      },
      line: {
        ...linearAxis.line,
        visible: true,
      },
    },
    yAxis: {
      ...linearAxis,
      max: true,
      animation: {
        duration: player.interval ? player.interval * 0.6 : undefined,
        easing: 'cubicInOut',
      },
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
    player,

    pivotGrid: getLightPivotChartGridConfig(),
    annotation: getLightAnnotation(),

    regressionLine: getLightRegressionLine(),
  }
}
