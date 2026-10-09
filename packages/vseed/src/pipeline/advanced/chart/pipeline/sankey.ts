import type { AdvancedPipeline } from 'src/types'
import {
  buildMeasures,
  defaultDimensions,
  defaultMeasureId,
  defaultMeasures,
  encodingAdapter,
  encodingForSankey,
  defaultEncodingForSankey,
  sankeyConfig,
  initAdvancedVSeed,
  page,
  pivotAdapter,
  pivotReshapeWithEncoding,
  reshapeWithEncoding,
  theme,
  annotation,
  pickDimensionsForReshape,
} from '../pipes'

export const sankeyAdvancedPipeline: AdvancedPipeline = [
  page,
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [buildMeasures(['size', 'detail']), defaultEncodingForSankey],
    [buildMeasures(['size', 'detail']), encodingForSankey, pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  sankeyConfig,
  theme,
  annotation,
]
