import type { IBarChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'
import { createBarCornerRadius, createStackCornerRadius } from './stackCornerRadiusUtils'

export const barCornerRadius: VChartSpecPipe = (spec, { advancedVSeed, vseed }) => {
  const config = advancedVSeed.config?.[vseed.chartType as 'column']
  const radius = config?.cornerRadius ?? 0
  const useStackRadius = config?.stackCornerRadius ?? false

  return {
    ...spec,
    stackCornerRadius: useStackRadius ? createStackCornerRadius(radius) : undefined,
    bar: {
      ...(spec as IBarChartSpec).bar,
      style: {
        ...(spec as IBarChartSpec).bar?.style,
        cornerRadius: useStackRadius ? 0 : createBarCornerRadius(radius),
      },
    },
  } as IBarChartSpec
}
