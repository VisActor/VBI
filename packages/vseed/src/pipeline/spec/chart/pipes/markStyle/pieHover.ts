import type { IPieChartSpec } from '@visactor/vchart'
import type { PieStyle, VChartSpecPipe } from 'src/types'
import { getDefaultPieStyle } from 'src/theme/common/pie'

export const pieHover: VChartSpecPipe = (spec, { advancedVSeed }) => {
  const config = advancedVSeed.config[advancedVSeed.chartType] as { pieStyle?: PieStyle }
  const effect = config?.pieStyle?.pieHoverEffect ?? getDefaultPieStyle().pieHoverEffect
  const result = spec as IPieChartSpec
  if (effect === 'enlarge' && !result.outerRadius) return spec
  const style =
    effect === 'none'
      ? {}
      : effect === 'opacity'
        ? { fillOpacity: 0.75 }
        : { outerRadius: (result.outerRadius as number) * 1.1 }

  return {
    ...result,
    pie: { ...result.pie, state: { ...result.pie?.state, hover: style } },
  }
}
