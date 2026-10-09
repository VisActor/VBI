import type { ICartesianSeries, ILineChartSpec } from '@visactor/vchart'
import { AxisBoundaryEnum } from 'src/types'
import type { AnnotationAxisRange } from 'src/types'

// The schema guarantees at least one axis. Keep the geometry helper compatible
// with both public DSL types and the schema-inferred AdvancedVSeed type.
type AreaRange = { x?: AnnotationAxisRange; y?: AnnotationAxisRange }
type AxisHelper = ReturnType<ICartesianSeries['getXAxisHelper']>

export const assertAnnotationAreaRangeAxes = (range: AreaRange, spec: ILineChartSpec) => {
  for (const axis of ['x', 'y'] as const) {
    if (!range[axis]) continue
    const orient = axis === 'x' ? 'bottom' : 'left'
    const axisSpec = spec.axes?.find((item) => item.orient === orient)
    if (axisSpec?.type !== 'linear') {
      throw new Error(`annotationArea.range.${axis} requires a linear numeric axis`)
    }
  }
}

const axisBounds = (range: AnnotationAxisRange | undefined, helper: AxisHelper, size: number) => {
  if (!range) return [0, size]

  const domain = helper.getScale?.(0).domain() as unknown[] | undefined
  if (!domain?.length || !domain.every((value) => typeof value === 'number' && Number.isFinite(value))) return []
  const axisMin = Math.min(...(domain as number[]))
  const axisMax = Math.max(...(domain as number[]))
  const min = Math.max(axisMin, range.min === AxisBoundaryEnum.Min ? axisMin : range.min)
  const max = Math.min(axisMax, range.max === AxisBoundaryEnum.Max ? axisMax : range.max)
  if (min >= max) return []

  // Use the renderer's axis mapping, including inverse and axis layout offsets.
  const start = helper.dataToPosition([min])
  const end = helper.dataToPosition([max])
  if (!Number.isFinite(start) || !Number.isFinite(end)) return []
  return [Math.max(0, Math.min(start, end)), Math.min(size, Math.max(start, end))]
}

export const annotationAreaRangePositions = (range: AreaRange, series: ICartesianSeries) => {
  const { width, height } = series.getRegion().getLayoutRect()
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) return []
  const [left, right] = axisBounds(range.x, series.getXAxisHelper(), width)
  const [top, bottom] = axisBounds(range.y, series.getYAxisHelper(), height)
  if (left === undefined || top === undefined || left >= right || top >= bottom) return []
  return [
    { x: left, y: top },
    { x: right, y: top },
    { x: right, y: bottom },
    { x: left, y: bottom },
  ]
}
