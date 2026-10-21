import type {
  ChartType,
  Dataset,
  Dimension,
  Encoding,
  FoldInfo,
  Measure,
  Measures,
  UnfoldInfo,
  Locale,
} from 'src/types'
import { foldMeasures } from './foldMeasures'
import { FoldMeasureId, FoldMeasureName, FoldMeasureValue, Separator } from './constant'
import { unfoldDimensions } from './unfoldDimensions'
import { createFormatterByDimension } from 'src/pipeline/utils/format/createFormatterByDimension'

export const dataReshapeByEncoding = (
  dataset: Dataset,
  dimensions: Dimension[],
  measures: Measure[],
  encoding: Encoding,
  options?: {
    chartType?: ChartType
    foldMeasureId?: string
    foldMeasureName?: string
    foldMeasureValue?: string
    colorItemAsId?: boolean
    colorMeasureId?: string
    omitIds: string[]
    locale?: Locale
  },
): {
  dataset: Dataset
  foldInfo: FoldInfo
  unfoldInfo: UnfoldInfo
} => {
  const {
    chartType,
    foldMeasureId = FoldMeasureId,
    foldMeasureName = FoldMeasureName,
    foldMeasureValue = FoldMeasureValue,
    colorItemAsId = false,
    colorMeasureId,
    locale,
    omitIds,
  } = options || {}

  // 合并所有指标为1个指标
  const { dataset: foldedDataset, foldInfo } = foldMeasures(dataset, measures as Measures, {
    measureId: foldMeasureId,
    measureName: foldMeasureName,
    measureValue: foldMeasureValue,
    colorMeasureId,
    omitIds,
  })

  // 展开指定的维度为指标
  const { dataset: finalDataset, unfoldInfo } = unfoldDimensions(foldedDataset, dimensions, encoding, {
    chartType,
    foldMeasureId,
    separator: Separator,
    colorItemAsId,
    formatDimensionValue: (dimension, value) => {
      const formatter = createFormatterByDimension(dimension, locale)
      return formatter(value as string | number)
    },
  })
  return { dataset: finalDataset, foldInfo, unfoldInfo }
}
