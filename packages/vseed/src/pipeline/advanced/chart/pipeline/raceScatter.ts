import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  annotation,
  markStyle,
  scatterConfig,
  encodingForRaceScatter,
  buildMeasuresForScatter,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  encodingAdapter,
  defaultEncodingForRaceScatter,
  pickDimensionsForReshape,
  regressionLine,
  addPivotDimensionsForScatter,
  page,
  reshapeWithScatterEncoding,
  pivotReshapeWithScatterEncoding,
} from '../pipes'

export const raceScatterAdvancedPipeline: AdvancedPipeline = [
  page,
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [buildMeasuresForScatter, addPivotDimensionsForScatter, defaultEncodingForRaceScatter],
    [buildMeasuresForScatter, addPivotDimensionsForScatter, encodingForRaceScatter, pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithScatterEncoding], [pivotReshapeWithScatterEncoding]),

  scatterConfig,
  theme,
  markStyle,
  annotation,
  regressionLine,
]
