import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  markStyle,
  annotationWithRange,
  rejectPivotAnnotationAreaRange,
  sortLegend,
  pivotReshapeWithBoxplotEncoding,
  buildMeasures,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  encodingAdapter,
  pickDimensionsForReshape,
  defaultEncodingForBoxplot,
  encodingForBoxplot,
  reshapeWithBoxplotEncoding,
  boxplotConfig,
  page,
} from '../pipes'

export const boxplotAdvancedPipeline: AdvancedPipeline = [
  page,
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  boxplotConfig,

  encodingAdapter(
    [buildMeasures(['value', 'q1', 'q3', 'min', 'max', 'median', 'outliers']), defaultEncodingForBoxplot],
    [
      buildMeasures(['value', 'q1', 'q3', 'min', 'max', 'median', 'outliers']),
      encodingForBoxplot,
      pickDimensionsForReshape,
    ],
  ),
  pivotAdapter([reshapeWithBoxplotEncoding], [pivotReshapeWithBoxplotEncoding]),

  sortLegend,
  theme,
  markStyle,
  pivotAdapter([annotationWithRange], [annotationWithRange, rejectPivotAnnotationAreaRange]),
]
