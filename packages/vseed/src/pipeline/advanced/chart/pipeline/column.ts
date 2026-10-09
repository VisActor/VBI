import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  columnConfig,
  markStyle,
  annotationWithRange,
  rejectPivotAnnotationAreaRange,
  sortXBandAxis,
  sortLegend,
  encodingForColumn,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  buildMeasures,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  encodingAdapter,
  defaultEncodingForColumn,
  pickDimensionsForReshape,
  regressionLine,
  page,
} from '../pipes'

export const columnAdvancedPipeline: AdvancedPipeline = [
  page,
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [buildMeasures(['yAxis', 'detail']), defaultEncodingForColumn],
    [buildMeasures(['yAxis', 'detail']), encodingForColumn, pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  sortXBandAxis,
  sortLegend,
  columnConfig,
  theme,
  markStyle,
  pivotAdapter([annotationWithRange], [annotationWithRange, rejectPivotAnnotationAreaRange]),
  regressionLine,
]
