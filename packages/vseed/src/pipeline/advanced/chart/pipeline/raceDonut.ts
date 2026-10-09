import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  donutGeometryConfig,
  buildMeasures,
  pivotAdapter,
  donutConfig,
  annotation,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  encodingAdapter,
  pickDimensionsForReshape,
  page,
  defaultEncodingForRaceDonut,
  encodingForRaceDonut,
} from '../pipes'

export const raceDonutAdvancedPipeline: AdvancedPipeline = [
  page,
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [buildMeasures(['angle', 'detail']), defaultEncodingForRaceDonut],
    [buildMeasures(['angle', 'detail']), encodingForRaceDonut, pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  donutConfig,
  donutGeometryConfig,
  theme,
  annotation,
]
