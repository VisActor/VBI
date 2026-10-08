import type { IAreaChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'
import { isLinearColor } from './colorAdapter'

export const colorAreaStyleFill = (stylePipe: VChartSpecPipe): VChartSpecPipe => {
  return (spec, context) => {
    const result = stylePipe(spec, context) as IAreaChartSpec

    const { advancedVSeed, vseed } = context
    const { datasetReshapeInfo } = advancedVSeed
    const { unfoldInfo } = datasetReshapeInfo[0]

    if (isLinearColor(advancedVSeed, vseed)) {
      if (result?.area?.style) {
        result.area.style.fill ??= {
          field: unfoldInfo.encodingColor,
          scale: 'color',
        }
      }
    }

    return result
  }
}
