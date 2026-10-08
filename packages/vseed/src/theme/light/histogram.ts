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
import { getLightLinearAxis } from '../common/axes'
import { getLightRegressionLine } from '../common/regressionLine'

export const getHistogramTheme = () => {
  const linearAxis = getLightLinearAxis()
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
    cornerRadius: [4, 4, 0, 0],
    stackCornerRadius: false,
    xAxis: linearAxis,
    yAxis: linearAxis,
    crosshairRect,
    pivotGrid: getLightPivotChartGridConfig(),
    annotation: getLightAnnotation(),
    regressionLine: getLightRegressionLine(),
  }
}
