import type { ILineChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'
import { isLinearColor } from './colorAdapter'

export const colorLineStyleFill = (stylePipe: VChartSpecPipe): VChartSpecPipe => {
  return (spec, context) => {
    const result = stylePipe(spec, context) as ILineChartSpec

    const { advancedVSeed, vseed } = context
    const { datasetReshapeInfo } = advancedVSeed
    const { unfoldInfo } = datasetReshapeInfo[0]

    if (isLinearColor(advancedVSeed, vseed)) {
      if (result?.line?.style) {
        result.line.style.stroke ??= {
          field: unfoldInfo.encodingColor,
          scale: 'color',
        }
      }
    }

    return result
  }
}
