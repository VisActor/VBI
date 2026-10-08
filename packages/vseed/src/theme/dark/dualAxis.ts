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

export const getDualAxisTheme = () => {
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
    cornerRadius: [4, 4, 0, 0],
    stackCornerRadius: false,
    xAxis: bandAxis,
    primaryYAxis: linearAxis,
    secondaryYAxis: { ...linearAxis, grid: { visible: false } },
    crosshairRect,
    pivotGrid: getDarkPivotChartGridConfig(),
    annotation: getDarkAnnotation(),
  }
}
