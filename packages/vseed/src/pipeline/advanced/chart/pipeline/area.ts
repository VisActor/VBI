import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  areaConfig,
  annotation,
  rejectPivotAnnotationAreaRange,
  markStyle,
  sortXBandAxis,
  sortLegend,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  buildMeasures,
  encodingForLine,
  defaultMeasures,
  defaultMeasureId,
  defaultDimensions,
  encodingAdapter,
  defaultEncodingForLine,
  pickDimensionsForReshape,
  page,
} from '../pipes'

export const areaAdvancedPipeline: AdvancedPipeline = [
  page,
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [buildMeasures(['yAxis', 'detail']), defaultEncodingForLine],
    [buildMeasures(['yAxis', 'detail']), encodingForLine, pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  sortXBandAxis,
  sortLegend,
  areaConfig,
  theme,
  markStyle,
  annotation,
  pivotAdapter([], [rejectPivotAnnotationAreaRange]),
]
