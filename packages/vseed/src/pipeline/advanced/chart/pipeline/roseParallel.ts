import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  markStyle,
  annotation,
  roseParallelConfig,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  buildMeasures,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  encodingAdapter,
  encodingForRose,
  defaultEncodingForRose,
  pickDimensionsForReshape,
  page,
} from '../pipes'

export const roseParallelAdvancedPipeline: AdvancedPipeline = [
  page,
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [buildMeasures(['radius', 'detail']), defaultEncodingForRose],
    [buildMeasures(['radius', 'detail']), encodingForRose, pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  roseParallelConfig,
  theme,
  markStyle,
  annotation,
]
