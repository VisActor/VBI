import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  buildMeasures,
  pivotAdapter,
  pieConfig,
  annotation,
  rejectUnsupportedAnnotationAreaRange,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  encodingAdapter,
  pickDimensionsForReshape,
  page,
  defaultEncodingForRacePie,
  encodingForRacePie,
} from '../pipes'

export const racePieAdvancedPipeline: AdvancedPipeline = [
  page,
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [buildMeasures(['angle', 'detail']), defaultEncodingForRacePie],
    [buildMeasures(['angle', 'detail']), encodingForRacePie, pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  pieConfig,
  theme,
  annotation,
  rejectUnsupportedAnnotationAreaRange,
]
