import type { IPieChartSpec } from '@visactor/vchart'
import type { Encoding, FoldInfo, PieLabel, VChartSpecPipe } from 'src/types'
import { buildLabel } from './label'

export const labelPie: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as IPieChartSpec
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { chartType, encoding } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { label: PieLabel }
  const foldInfo = datasetReshapeInfo[0].foldInfo as FoldInfo

  const { label } = baseConfig

  result.label = buildLabel(
    label,
    vseed.measures,
    vseed.dimensions,
    advancedVSeed.dimensions!,
    advancedVSeed.measures!,
    encoding as Encoding,
    [foldInfo],
    advancedVSeed?.locale,
  ) as unknown as IPieChartSpec['label']
  if (label.enable !== false && label.labelLayout) {
    ;(result.label as any)!.layout = {
      align: label.labelLayout,
    }
  }
  return result
}
