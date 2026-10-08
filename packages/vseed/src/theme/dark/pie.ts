import { getDarkPivotChartGridConfig, getDarkColor, getDarkBrushConfig, getDarkLabel, getDarkLegend } from '../common'
import { getDarkTooltip } from '../common/tooltip'

import { getDefaultPieGeometry, getDefaultDonutGeometry, getDefaultPieStyle, getDefaultCenterText } from '../common/pie'

export const getPieTheme = () => {
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
    ...getDefaultPieGeometry(),
    pieStyle: getDefaultPieStyle(),
    label: {
      ...baseConfig.label,
      showValuePercent: true,
      labelLayout: 'arc' as const,
      showDimension: true,
    },
    pivotGrid: getDarkPivotChartGridConfig(),
  }
}

export const getDonutTheme = () => {
  return {
    ...getPieTheme(),
    ...getDefaultDonutGeometry(),
    centerText: getDefaultCenterText(),
  }
}
