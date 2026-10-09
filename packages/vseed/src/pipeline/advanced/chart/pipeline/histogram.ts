import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  histogramConfig,
  markStyle,
  annotationWithRange,
  rejectPivotAnnotationAreaRange,
  sortLegend,
  pivotReshapeWithHistogramEncoding,
  buildMeasures,
  defaultMeasures,
  defaultDimensions,
  encodingAdapter,
  pickDimensionsForReshape,
  defaultEncodingForHistogram,
  encodingForHistogram,
  reshapeWithHistogramEncoding,
  regressionLine,
  page,
} from '../pipes'
import { histogramXAxisConfig } from '../pipes/config/histogram'

export const histogramAdvancedPipeline: AdvancedPipeline = [
  page,
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  histogramConfig,

  encodingAdapter(
    [buildMeasures(['value', 'x0', 'x1', 'yAxis', 'detail']), defaultEncodingForHistogram],
    [buildMeasures(['value', 'x0', 'x1', 'yAxis', 'detail']), encodingForHistogram, pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithHistogramEncoding], [pivotReshapeWithHistogramEncoding]),

  histogramXAxisConfig,
  sortLegend,
  theme,
  markStyle,
  pivotAdapter([annotationWithRange], [annotationWithRange, rejectPivotAnnotationAreaRange]),
  regressionLine,
]
