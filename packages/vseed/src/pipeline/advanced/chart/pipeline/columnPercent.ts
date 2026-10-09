import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  columnPercentConfig,
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
  page,
} from '../pipes'

export const columnPercentAdvancedPipeline: AdvancedPipeline = [
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
  columnPercentConfig,
  theme,
  markStyle,
  pivotAdapter([annotationWithRange], [annotationWithRange, rejectPivotAnnotationAreaRange]),
]
