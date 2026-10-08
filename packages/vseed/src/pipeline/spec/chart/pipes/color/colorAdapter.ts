import type {
  AdvancedVSeed,
  PivotChartSpecPipe,
  VChartSpecPipe,
  VSeed,
  Pipe,
  SpecPipelineContext,
  Measure,
} from 'src/types'

export function colorAdapter(ordinalPipe: PivotChartSpecPipe, linearPipe: PivotChartSpecPipe): PivotChartSpecPipe
export function colorAdapter(ordinalPipe: VChartSpecPipe, linearPipe: VChartSpecPipe): VChartSpecPipe
export function colorAdapter<TSpec>(
  ordinalPipe: Pipe<TSpec, SpecPipelineContext>,
  linearPipe: Pipe<TSpec, SpecPipelineContext>,
) {
  return (spec: Partial<TSpec>, context: SpecPipelineContext) => {
    const { advancedVSeed, vseed } = context
    if (isLinearColor(advancedVSeed, vseed)) {
      return linearPipe(spec, context)
    }
    return ordinalPipe(spec, context)
  }
}

export const isLinearColor = <T extends AdvancedVSeed, U extends VSeed>(advancedVSeed: T, vseed: U) => {
  const { encoding, chartType } = advancedVSeed
  const measureIdList = (vseed.measures || advancedVSeed.measures)!.map((measure: Measure) => measure.id)
  const { color = [] } = encoding
  return chartType === 'heatmap'
    ? color!.length >= 1 && color!.every((c: string) => measureIdList.includes(c))
    : color!.length === 1 && measureIdList.includes(color![0])
}

export const getColorMeasureId = <T extends AdvancedVSeed, U extends VSeed>(
  advancedVSeed: T,
  vseed: U,
): string | undefined => {
  if (isLinearColor(advancedVSeed, vseed)) {
    const { encoding } = advancedVSeed
    const { color } = encoding
    return color?.[0]
  }
  return undefined
}

/** Resolve from the encoding so mark styles do not depend on color-scale pipe order. */
export const getColorField = (advancedVSeed: AdvancedVSeed, vseed: VSeed): string => {
  const { unfoldInfo } = advancedVSeed.datasetReshapeInfo[0]
  return isLinearColor(advancedVSeed, vseed) ? unfoldInfo.encodingColor : unfoldInfo.encodingColorId
}
