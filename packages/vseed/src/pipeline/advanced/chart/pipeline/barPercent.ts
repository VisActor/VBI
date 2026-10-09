import type { AdvancedPipeline } from 'src/types'
import {
  buildMeasures,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  barPercentConfig,
  markStyle,
  annotationWithRange,
  rejectPivotAnnotationAreaRange,
  sortYBandAxis,
  sortLegend,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  encodingForBar,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  encodingAdapter,
  defaultEncodingForBar,
  pickDimensionsForReshape,
  page,
} from '../pipes'

export const barPercentAdvancedPipeline: AdvancedPipeline = [
  page,
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [buildMeasures(['xAxis', 'detail']), defaultEncodingForBar],
    [buildMeasures(['xAxis', 'detail']), encodingForBar, pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  sortYBandAxis,
  sortLegend,
  barPercentConfig,
  theme,
  markStyle,
  pivotAdapter([annotationWithRange], [annotationWithRange, rejectPivotAnnotationAreaRange]),
]
