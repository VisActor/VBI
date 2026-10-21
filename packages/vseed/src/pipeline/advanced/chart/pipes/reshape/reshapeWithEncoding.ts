import { uniqueBy } from 'remeda'
import { dataReshapeByEncoding } from 'src/dataReshape'
import { getColorMeasureId } from 'src/pipeline/spec/chart/pipes'
import type { ChartType, AdvancedPipe, AdvancedVSeed, ColumnParallel, Dimension, Encoding, Measure } from 'src/types'

// Pass a chart type only when its geometry needs an isolated identity scope.
export const createReshapeWithEncoding =
  (chartType?: ChartType): AdvancedPipe =>
  (advancedVSeed, context) => {
    const result = { ...advancedVSeed }
    const { vseed } = context
    const { dataset } = vseed as ColumnParallel
    const { encoding, reshapeMeasures = [] } = advancedVSeed
    const allMeasuresIds = (reshapeMeasures[0] ?? []).map((m: Measure) => m.id)

    const colorMeasureId = getColorMeasureId(advancedVSeed as AdvancedVSeed, vseed)
    const {
      dataset: newDatasets,
      foldInfo,
      unfoldInfo,
    } = dataReshapeByEncoding(
      dataset,
      uniqueBy(advancedVSeed.reshapeDimensions ?? advancedVSeed.dimensions ?? [], (item: Dimension) => item.id),
      uniqueBy(advancedVSeed.reshapeMeasures?.[0] ?? [], (item: Measure) => item.id),
      encoding as Encoding,
      {
        chartType,
        colorItemAsId: false,
        colorMeasureId,
        omitIds: allMeasuresIds,
        locale: advancedVSeed.locale,
      },
    )

    return {
      ...result,
      dataset: newDatasets,
      datasetReshapeInfo: [
        {
          id: String(vseed.chartType),
          index: 0,
          foldInfo,
          unfoldInfo,
        },
      ],
    }
  }

export const reshapeWithEncoding = createReshapeWithEncoding()
