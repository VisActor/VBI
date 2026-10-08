import {
  getLightColor,
  getLightLabel,
  getLightLegend,
  getLightBrushConfig,
  getLightPivotChartGridConfig,
} from '../common'
import { getLightTooltip } from '../common/tooltip'

import { getDefaultPieGeometry, getDefaultDonutGeometry, getDefaultPieStyle, getDefaultCenterText } from '../common/pie'

export const getPieTheme = () => {
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
    ...getDefaultPieGeometry(),
    pieStyle: getDefaultPieStyle(),
    label: {
      ...baseConfig.label,
      showValuePercent: true,
      labelLayout: 'arc' as const,
      showDimension: true,
    },

    pivotGrid: getLightPivotChartGridConfig(),
  }
}

export const getDonutTheme = () => {
  return {
    ...getPieTheme(),
    ...getDefaultDonutGeometry(),
    centerText: getDefaultCenterText(),
  }
}
