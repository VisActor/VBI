import {
  getDarkPivotChartGridConfig,
  getDarkColor,
  getDarkCrosshairLine,
  getDarkBrushConfig,
  getDarkLabel,
  getDarkLegend,
} from '../common'
import { getDarkTooltip } from '../common/tooltip'
import { getDarkLinearAxis } from '../common/axes'
import { getDarkAnnotation } from '../common/annotaion'
import { getDarkRegressionLine } from '../common/regressionLine'

export const getScatterTheme = () => {
  const linearAxis = getDarkLinearAxis()
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
    pivotGrid: getDarkPivotChartGridConfig(),
    annotation: getDarkAnnotation(),
    regressionLine: getDarkRegressionLine(),
  }
}
