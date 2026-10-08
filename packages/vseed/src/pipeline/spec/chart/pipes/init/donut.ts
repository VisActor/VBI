import type { IPieChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'

export const initDonut: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as IPieChartSpec
  const { advancedVSeed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { foldInfo, unfoldInfo } = datasetReshapeInfo[0]

  result.type = 'pie'
  result.valueField = foldInfo.measureValue
  result.categoryField = unfoldInfo.encodingColorId

  result.padding = 0
  result.region = [
    {
      clip: true,
    },
  ]

  result.animation = true

  return result
}
