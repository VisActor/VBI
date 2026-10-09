import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  donutGeometryConfig,
  pieStyleConfig,
  centerTextConfig,
  pivotAdapter,
  annotation,
  donutConfig,
  encodingForPie,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  buildMeasures,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  encodingAdapter,
  defaultEncodingForPie,
  pickDimensionsForReshape,
  page,
} from '../pipes'

export const donutAdvancedPipeline: AdvancedPipeline = [
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

  donutConfig,
  donutGeometryConfig,
  pieStyleConfig,
  centerTextConfig,
  theme,
  annotation,
]
