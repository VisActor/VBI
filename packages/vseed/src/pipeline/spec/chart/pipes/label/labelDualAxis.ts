import type { ILineChartSpec } from '@visactor/vchart'
import type { DualAxisOptions, Encoding, Label, VChartSpecPipe } from 'src/types'
import { buildLabel } from './label'
import { DUAL_AXIS_LABEL_Z_INDEX } from 'src/pipeline/utils/constant'

export const labelDualAxis = (options: DualAxisOptions): VChartSpecPipe => {
  return (spec, context) => {
    const result = { ...spec } as ILineChartSpec
    const { advancedVSeed, vseed } = context
    const { encoding } = advancedVSeed
    const { chartType } = advancedVSeed
    const baseConfig = advancedVSeed.config[chartType] as { label: Label }

    result.label = buildLabel(
      baseConfig.label,
      vseed.measures,
      vseed.dimensions,
      advancedVSeed.dimensions!,
      advancedVSeed.measures!,
      encoding as Encoding,
      [options.foldInfo],
      advancedVSeed?.locale,
    ) as unknown as ILineChartSpec['label']
    if (baseConfig.label.enable !== false) {
      ;(result.label as any)!.zIndex = DUAL_AXIS_LABEL_Z_INDEX
    }
    return result
  }
}
