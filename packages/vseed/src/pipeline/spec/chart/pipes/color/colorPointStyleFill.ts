import type { ILineChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'
import { isLinearColor } from './colorAdapter'

export const colorPointStyleFill = (stylePipe: VChartSpecPipe): VChartSpecPipe => {
  return (spec, context) => {
    const result = stylePipe(spec, context) as ILineChartSpec

    const { advancedVSeed, vseed } = context
    const { datasetReshapeInfo } = advancedVSeed
    const { unfoldInfo } = datasetReshapeInfo[0]

    if (isLinearColor(advancedVSeed, vseed)) {
      if (result?.point?.style) {
        result.point.style.fill ??= {
          field: unfoldInfo.encodingColor,
          scale: 'color',
        }
      }
    }

    return result
  }
}
