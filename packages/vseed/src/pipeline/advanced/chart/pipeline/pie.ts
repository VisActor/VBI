import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pieGeometryConfig,
  pieStyleConfig,
  pivotAdapter,
  pieConfig,
  annotation,
  rejectUnsupportedAnnotationAreaRange,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  encodingForPie,
  buildMeasures,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  encodingAdapter,
  defaultEncodingForPie,
  pickDimensionsForReshape,
  page,
} from '../pipes'

export const pieAdvancedPipeline: AdvancedPipeline = [
  page,
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [buildMeasures(['angle', 'detail']), defaultEncodingForPie],
    [buildMeasures(['angle', 'detail']), encodingForPie, pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  pieConfig,
  pieGeometryConfig,
  pieStyleConfig,
  theme,
  annotation,
  rejectUnsupportedAnnotationAreaRange,
]
