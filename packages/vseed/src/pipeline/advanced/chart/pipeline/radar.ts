import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  annotation,
  markStyle,
  sortLegend,
  radarConfig,
  encodingForRadar,
  createReshapeWithEncoding,
  createPivotReshapeWithEncoding,
  buildMeasures,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  encodingAdapter,
  defaultEncodingForRadar,
  pickDimensionsForReshape,
  page,
} from '../pipes'

export const radarAdvancedPipeline: AdvancedPipeline = [
  page,
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [buildMeasures(['radius', 'detail']), defaultEncodingForRadar],
    [buildMeasures(['radius', 'detail']), encodingForRadar, pickDimensionsForReshape],
  ),
  // Isolate radar point identities: its line/area cannot follow cross-family paths.
  pivotAdapter([createReshapeWithEncoding('radar')], [createPivotReshapeWithEncoding('radar')]),

  // sortXBandAxis,
  sortLegend,
  radarConfig,
  theme,
  markStyle,
  annotation,
]
