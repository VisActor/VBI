import { DATUM_HIDE_KEY } from 'src/pipeline/utils/constant'
import type { VChartSpecPipe } from 'src/types'
import { isLinearColor } from '../color/colorAdapter'

export const cellStyle: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const cell = advancedVSeed.config?.[chartType as 'heatmap']?.cell
  const { datasetReshapeInfo } = advancedVSeed
  const { unfoldInfo } = datasetReshapeInfo[0]

  return {
    ...spec,
    cell: {
      style: {
        visible: (datum: any) => {
          return datum?.[DATUM_HIDE_KEY] !== true
        },
        shape: 'rect',
        stroke: cell?.stroke,
        lineWidth: cell?.lineWidth ?? 1,
        fill: {
          field: isLinearColor(advancedVSeed, vseed) ? unfoldInfo.encodingColor : unfoldInfo.encodingColorId,
          scale: 'color',
        },
      },
    },
  }
}
