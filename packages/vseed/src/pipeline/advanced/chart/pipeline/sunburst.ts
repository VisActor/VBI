import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  annotation,
  rejectUnsupportedAnnotationAreaRange,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  encodingForHierarchy,
  buildMeasures,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  encodingAdapter,
  defaultEncodingForHierarchy,
  pickDimensionsForReshape,
  page,
  sunburstConfig,
} from '../pipes'

export const sunburstAdvancedPipeline: AdvancedPipeline = [
  page,
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [buildMeasures(['size', 'detail']), defaultEncodingForHierarchy],
    [buildMeasures(['size', 'detail']), encodingForHierarchy, pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  sunburstConfig,
  theme,
  annotation,
  rejectUnsupportedAnnotationAreaRange,
]
