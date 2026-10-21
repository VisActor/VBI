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

export const getDualAxisTheme = () => {
  const linearAxis = getLightLinearAxis()
  const bandAxis = getLightBandAxis()
  const crosshairRect = getLightCrosshairRect()

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
    cornerRadius: 0,
    stackCornerRadius: false,
    xAxis: bandAxis,
    primaryYAxis: linearAxis,
    secondaryYAxis: { ...linearAxis, grid: { visible: false } },
    crosshairRect,
    pivotGrid: getLightPivotChartGridConfig(),
    annotation: getLightAnnotation(),
  }
}
