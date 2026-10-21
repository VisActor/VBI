import { uniqueBy } from 'remeda'
import { dataReshapeByEncoding, FoldMeasureValue } from 'src/dataReshape'
import { getColorMeasureId } from 'src/pipeline/spec/chart/pipes'
import { DEFAULT_PARENT_ID } from 'src/pipeline/utils/constant'
import type {
  ChartType,
  AdvancedPipe,
  AdvancedVSeed,
  ColumnParallel,
  Dataset,
  DatasetReshapeInfo,
  Dimension,
  Encoding,
  Measure,
} from 'src/types'

// Pass a chart type only when its geometry needs an isolated identity scope.
export const createPivotReshapeWithEncoding =
  (chartType?: ChartType): AdvancedPipe =>
  (advancedVSeed, context) => {
    const result = { ...advancedVSeed }
    const { vseed } = context
    const { dataset } = vseed as ColumnParallel
    const { encoding } = advancedVSeed
    const reshapeMeasures = advancedVSeed.reshapeMeasures ?? []
    const dimensions = advancedVSeed.reshapeDimensions ?? advancedVSeed.dimensions ?? []

    const allMeasuresIds = reshapeMeasures.flatMap((measureGroup: Measure[]) => measureGroup.map((m) => m.id))

    const datasets: Dataset = []
    const datasetReshapeInfo: DatasetReshapeInfo = []

    reshapeMeasures.forEach((measures: Measure[], index: number) => {
      if (!measures) {
        return
      }
      const groupId = measures[0].parentId ?? DEFAULT_PARENT_ID
      const {
        dataset: newSubDataset,
        foldInfo,
        unfoldInfo,
      } = dataReshapeByEncoding(
        dataset,
        uniqueBy(dimensions, (item: Dimension) => item.id),
        uniqueBy(measures, (item: Measure) => item.id),
        encoding as Encoding,
        {
          chartType,
          colorItemAsId: false,
          foldMeasureValue: `${FoldMeasureValue}${groupId}`,
          colorMeasureId: getColorMeasureId(advancedVSeed as AdvancedVSeed, vseed),
          omitIds: allMeasuresIds,
          locale: advancedVSeed.locale,
        },
      )

      const reshapeInfo = {
        id: `${groupId}`,
        index,
        foldInfo,
        unfoldInfo,
      }
      datasets.push(newSubDataset)
      datasetReshapeInfo.push(reshapeInfo)
    })

    return {
      ...result,
      dataset: datasets,
      datasetReshapeInfo: datasetReshapeInfo,
    }
  }

export const pivotReshapeWithEncoding = createPivotReshapeWithEncoding()
