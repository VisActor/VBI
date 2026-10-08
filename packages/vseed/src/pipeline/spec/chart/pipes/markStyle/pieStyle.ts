import type { IPieChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'

export const pieStyle: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const config = advancedVSeed.config?.[chartType as 'pie']

  const result = {
    ...spec,
    pie: {
      style: {
        stroke: config?.pieStyle?.pieBorderColor ?? config?.backgroundColor ?? '#ffffff',
        lineWidth: config?.pieStyle?.pieBorderWidth ?? (advancedVSeed.dataset.length <= 30 ? 1 : 0),
      },
    },
  } as Required<IPieChartSpec>

  const cornerRadius = config?.pieStyle?.pieCornerRadius ?? (config?.cornerRadius || undefined)
  if (cornerRadius !== undefined && cornerRadius !== null) {
    result.pie.style!.cornerRadius = cornerRadius
  }

  return result
}
