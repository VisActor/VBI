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
import { getLightLinearAxis } from '../common/axes'
import { getLightRegressionLine } from '../common/regressionLine'

export const getScatterTheme = () => {
  const linearAxis = getLightLinearAxis()
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
    crosshairLine,
    sizeRange: [8, 24],
    xAxis: {
      ...linearAxis,
      line: {
        ...linearAxis.line,
        visible: true,
      },
    },
    yAxis: {
      ...linearAxis,
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

    pivotGrid: getLightPivotChartGridConfig(),
    annotation: getLightAnnotation(),

    regressionLine: getLightRegressionLine(),
  }
}
