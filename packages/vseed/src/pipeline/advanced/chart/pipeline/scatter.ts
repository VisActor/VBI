import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  annotationWithRange,
  rejectPivotAnnotationAreaRange,
  markStyle,
  scatterConfig,
  encodingForScatter,
  buildMeasuresForScatter,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  encodingAdapter,
  defaultEncodingForScatter,
  pickDimensionsForReshape,
  regressionLine,
  addPivotDimensionsForScatter,
  page,
  reshapeWithScatterEncoding,
  pivotReshapeWithScatterEncoding,
} from '../pipes'

export const scatterAdvancedPipeline: AdvancedPipeline = [
  page,
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [buildMeasuresForScatter, addPivotDimensionsForScatter, defaultEncodingForScatter],
    [buildMeasuresForScatter, addPivotDimensionsForScatter, encodingForScatter, pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithScatterEncoding], [pivotReshapeWithScatterEncoding]),

  scatterConfig,
  theme,
  markStyle,
  pivotAdapter([annotationWithRange], [annotationWithRange, rejectPivotAnnotationAreaRange]),
  regressionLine,
]
