import {
  getDarkPivotChartGridConfig,
  getDarkColor,
  getDarkCrosshairRect,
  getDarkBrushConfig,
  getDarkLabel,
  getDarkLegend,
} from '../common'
import { getDarkTooltip } from '../common/tooltip'
import { getDarkLinearAxis } from '../common/axes'
import { getDarkAnnotation } from '../common/annotaion'
import { getDarkRegressionLine } from '../common/regressionLine'

export const getHistogramTheme = () => {
  const linearAxis = getDarkLinearAxis()
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
    cornerRadius: [4, 4, 0, 0],
    stackCornerRadius: false,

    xAxis: linearAxis,
    yAxis: linearAxis,
    crosshairRect: crosshairRect,
    pivotGrid: getDarkPivotChartGridConfig(),
    annotation: getDarkAnnotation(),
    regressionLine: getDarkRegressionLine(),
  }
}
