import { afterEach, beforeAll, describe, expect, test } from 'vitest'
import VChart, { type ICartesianSeries, type IScatterChartSpec, type ISpec } from '@visactor/vchart'
import { Builder, registerAll } from '@visactor/vseed'
import type { AnnotationArea, Scatter, VSeed } from '@visactor/vseed'

const charts: VChart[] = []
const seed = (annotationArea?: AnnotationArea): Scatter => ({
  chartType: 'scatter',
  dataset: [
    { channel: 'A', cost: 10, conversion: 0.1 },
    { channel: 'B', cost: 60, conversion: 0.3 },
    { channel: 'C', cost: 130, conversion: 0.6 },
  ],
  dimensions: [{ id: 'channel', encoding: 'color' }],
  measures: [
    { id: 'cost', encoding: 'xAxis' },
    { id: 'conversion', encoding: 'yAxis' },
  ],
  xAxis: { min: 0, max: 150 },
  yAxis: { min: 0, max: 1 },
  annotationArea,
})

const specFor = (annotationArea?: AnnotationArea, inverse = false): IScatterChartSpec => ({
  ...(Builder.from({ ...seed(annotationArea), yAxis: { min: 0, max: 1, inverse } }).build() as IScatterChartSpec),
  width: 600,
  height: 400,
  autoFit: false,
  animation: false,
})

const render = (spec: ISpec) => {
  const dom = document.createElement('div')
  document.body.appendChild(dom)
  const chart = new VChart(spec, { dom })
  charts.push(chart)
  chart.renderSync()
  return chart
}

type RenderedMarker = { _markerComponent: { attribute: { points: Array<{ x: number; y: number }> } } }
const points = (chart: VChart) =>
  (chart.getChart().getComponentsByKey('markArea')[0] as unknown as RenderedMarker)._markerComponent.attribute.points

describe('annotationArea rendered coordinate ranges', () => {
  beforeAll(registerAll)
  afterEach(() => {
    charts.splice(0).forEach((chart) => chart.release())
    document.body.replaceChildren()
  })

  test('renders exact coordinates and recomputes them on resize', async () => {
    const chart = render(specFor({ range: { x: { min: 0, max: 100 }, y: { min: 0.2, max: 0.4 } } }))
    const verify = () => {
      const relative = chart.getChart().getAllSeries()[0] as ICartesianSeries
      const offset = relative.getRegion().getLayoutStartPoint()
      const x0 = relative.getXAxisHelper().dataToPosition([0]) + offset.x
      const x1 = relative.getXAxisHelper().dataToPosition([100]) + offset.x
      const y0 = relative.getYAxisHelper().dataToPosition([0.4]) + offset.y
      const y1 = relative.getYAxisHelper().dataToPosition([0.2]) + offset.y
      expect(points(chart)).toEqual([
        { x: x0, y: y0 },
        { x: x1, y: y0 },
        { x: x1, y: y1 },
        { x: x0, y: y1 },
      ])
    }
    verify()
    await chart.resize(900, 500)
    verify()
  })

  test('updates from no annotation to a range and removes the marker again', () => {
    const chart = render(specFor())
    chart.updateSpecSync(specFor({ range: { y: { min: 0.2, max: 'axisMax' } }, text: 'Target' }))
    expect(points(chart)).toHaveLength(4)
    chart.updateSpecSync(specFor())
    expect(chart.getChart().getComponentsByKey('markArea')).toHaveLength(0)
  })

  test('clears geometry when a visible marker moves entirely outside the axis', () => {
    const chart = render(specFor({ range: { y: { min: 0.2, max: 0.4 } } }))
    chart.updateSpecSync(specFor({ range: { y: { min: 2, max: 3 } } }))
    expect(points(chart)).toEqual([])
  })

  test('renders an empty-data target zone on an inverse axis using its current bounds', () => {
    const chart = render(specFor({ range: { y: { min: 0.7, max: 'axisMax' } } }, true))
    const relative = chart.getChart().getAllSeries()[0] as ICartesianSeries
    const origin = relative.getRegion().getLayoutStartPoint()
    const ys = points(chart).map((point) => point.y - origin.y)
    expect([Math.min(...ys), Math.max(...ys)]).toEqual([
      relative.getYAxisHelper().dataToPosition([0.7]),
      relative.getYAxisHelper().dataToPosition([1]),
    ])
  })

  test('renders a box-plot threshold band across the full category axis', () => {
    const spec = Builder.from({
      chartType: 'boxPlot',
      dataset: [
        { group: 'A', value: 4 },
        { group: 'A', value: 8 },
        { group: 'A', value: 12 },
        { group: 'B', value: 9 },
        { group: 'B', value: 15 },
        { group: 'B', value: 20 },
      ],
      dimensions: [{ id: 'group', encoding: 'xAxis' }],
      measures: [{ id: 'value', encoding: 'yAxis' }],
      annotationArea: { range: { y: { min: 10, max: 'axisMax' } } },
    } as VSeed).build() as ISpec
    const chart = render({ ...spec, width: 600, height: 400, autoFit: false, animation: false })
    const relative = chart.getChart().getAllSeries()[0] as ICartesianSeries
    const region = relative.getRegion()
    const origin = region.getLayoutStartPoint()
    const { width } = region.getLayoutRect()
    const yAxis = relative.getYAxisHelper()
    const axisMax = Math.max(...(yAxis.getScale(0).domain() as number[]))
    const markerPoints = points(chart)
    expect(markerPoints).toEqual([
      { x: origin.x, y: yAxis.dataToPosition([axisMax]) + origin.y },
      { x: origin.x + width, y: yAxis.dataToPosition([axisMax]) + origin.y },
      { x: origin.x + width, y: yAxis.dataToPosition([10]) + origin.y },
      { x: origin.x, y: yAxis.dataToPosition([10]) + origin.y },
    ])
  })

  test('renders a histogram window against its numeric x axis', () => {
    const spec = Builder.from({
      chartType: 'histogram',
      dataset: [1, 1, 2, 3, 4, 5, 7, 8, 9, 10].map((value) => ({ value })),
      measures: [{ id: 'value' }],
      annotationArea: { range: { x: { min: 3, max: 7 } } },
    } as VSeed).build() as ISpec
    const chart = render({ ...spec, width: 600, height: 400, autoFit: false, animation: false })
    const relative = chart.getChart().getAllSeries()[0] as ICartesianSeries
    const region = relative.getRegion()
    const origin = region.getLayoutStartPoint()
    const { height } = region.getLayoutRect()
    const xAxis = relative.getXAxisHelper()
    const left = xAxis.dataToPosition([3]) + origin.x
    const right = xAxis.dataToPosition([7]) + origin.x
    expect(points(chart)).toEqual([
      { x: left, y: origin.y },
      { x: right, y: origin.y },
      { x: right, y: origin.y + height },
      { x: left, y: origin.y + height },
    ])
  })
})
