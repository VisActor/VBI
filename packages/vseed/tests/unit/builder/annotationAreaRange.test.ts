import { beforeAll, describe, expect, test } from 'vitest'
import type { ICartesianSeries, ILineChartSpec } from '@visactor/vchart'
import { AxisBoundaryEnum, Builder, registerAll, zAnnotationArea } from '@visactor/vseed'
import type { AnnotationArea, AnnotationAreaRange, Datum, VSeed } from '@visactor/vseed'

const dataset = [
  { channel: 'A', cost: 10, conversion: 0.1 },
  { channel: 'B', cost: 60, conversion: 0.3 },
  { channel: 'C', cost: 130, conversion: 0.6 },
]

const scatter = (annotationArea?: unknown): VSeed =>
  ({
    chartType: 'scatter',
    dataset,
    dimensions: [{ id: 'channel', encoding: 'color' }],
    measures: [
      { id: 'cost', encoding: 'xAxis' },
      { id: 'conversion', encoding: 'yAxis' },
    ],
    annotationArea,
  }) as VSeed

const series = (width = 300, height = 200, inverse = false) => {
  const axis = (domain: number[], pixels: number[]) => ({
    getAxisType: () => 'linear',
    getScale: () => ({ domain: () => domain }),
    dataToPosition: ([value]: number[]) =>
      pixels[0] + ((value - domain[0]) / (domain[1] - domain[0])) * (pixels[1] - pixels[0]),
  })
  return {
    getXAxisHelper: () => axis([0, 150], inverse ? [width, 0] : [0, width]),
    getYAxisHelper: () => axis([0, 1], inverse ? [0, height] : [height, 0]),
    getRegion: () => ({ getLayoutRect: () => ({ width, height }) }),
  } as unknown as ICartesianSeries
}

const getPositions = (vseed: VSeed) => {
  const spec = Builder.from(vseed).build() as ILineChartSpec
  const marks = spec.markArea as Array<{ positions: (data: Datum[], series: ICartesianSeries) => unknown }>
  return marks[0].positions
}

const rectangle = (left: number, top: number, right: number, bottom: number) => [
  { x: left, y: top },
  { x: right, y: top },
  { x: right, y: bottom },
  { x: left, y: bottom },
]

describe('annotationArea coordinate ranges', () => {
  beforeAll(registerAll)

  test('exports the same boundary values accepted by JSON DSL', () => {
    expect(AxisBoundaryEnum).toEqual({ Min: 'axisMin', Max: 'axisMax' })
  })

  test('preserves ranges when parsing public annotation schemas', () => {
    const range = { x: { min: 0, max: 100 }, y: { min: 0.2, max: 0.4 } }
    expect(zAnnotationArea.parse({ range }).range).toEqual(range)
  })

  test('treats an undefined optional range as absent in selector mode', () => {
    const annotation: AnnotationArea = {
      selector: { field: 'channel', value: ['B'] },
      range: undefined,
    }
    expect(zAnnotationArea.safeParse(annotation).success).toBe(true)
    expect(() => Builder.from(scatter(annotation)).build()).not.toThrow()
  })

  test.each([
    ['x-only window', { x: { min: 0, max: 100 } }, rectangle(0, 0, 200, 200)],
    ['y-only target band', { y: { min: 0.2, max: 0.4 } }, rectangle(0, 120, 300, 160)],
    ['two-axis rectangle', { x: { min: 0, max: 100 }, y: { min: 0.2, max: 0.4 } }, rectangle(0, 120, 200, 160)],
  ])('draws the exact %s independently of data points', (_name, range, expected) => {
    const positions = getPositions(scatter({ range }))
    expect(positions([], series())).toEqual(expected)
  })

  test('does not move boundaries when data order or point membership changes', () => {
    const positions = getPositions(scatter({ range: { x: { min: 20, max: 100 } } }))
    expect(positions([...dataset].reverse(), series())).toEqual(positions([], series()))
  })

  test('axis sentinels use final scale limits instead of dataset extrema', () => {
    const positions = getPositions(scatter({ range: { y: { min: 0.4, max: 'axisMax' } } }))
    expect(positions(dataset, series())).toEqual(rectangle(0, 0, 300, 120))
  })

  test('axisMin supports a lower band on a reversed axis', () => {
    const positions = getPositions(scatter({ range: { y: { min: 'axisMin', max: 0.4 } } }))
    expect(positions([], series(300, 200, true))).toEqual(rectangle(0, 0, 300, 80))
  })

  test('recomputes both numeric and full-span boundaries after resize', () => {
    const positions = getPositions(scatter({ range: { x: { min: 30, max: 90 } } }))
    expect(positions([], series(600, 400))).toEqual(rectangle(120, 0, 360, 400))
  })

  test('clips a partially visible rectangle to the final axis domain', () => {
    const positions = getPositions(scatter({ range: { x: { min: -20, max: 60 }, y: { min: 0.5, max: 2 } } }))
    expect(positions([], series())).toEqual(rectangle(0, 0, 120, 100))
  })

  test.each([{ x: { min: 150, max: 200 } }, { y: { min: 2, max: 'axisMax' } }, { y: { min: 'axisMin', max: -1 } }])(
    'omits ranges with no visible intersection: %j',
    (range) => {
      expect(getPositions(scatter({ range }))([], series())).toEqual([])
    },
  )

  test('pixel padding does not change numeric boundaries', () => {
    expect(getPositions(scatter({ range: { x: { min: 30, max: 90 } }, outerPadding: 100 }))([], series())).toEqual(
      rectangle(60, 0, 180, 200),
    )
  })

  test.each([
    ['missing selector and range', {}],
    ['undefined selector', { selector: undefined }],
    ['null selector', { selector: null }],
    ['empty range', { range: {} }],
    ['missing min', { range: { y: { max: 20 } } }],
    ['missing max', { range: { y: { min: 10 } } }],
    ['equal boundaries', { range: { y: { min: 10, max: 10 } } }],
    ['reversed boundaries', { range: { y: { min: 20, max: 10 } } }],
    ['infinite boundary', { range: { y: { min: 10, max: Infinity } } }],
    ['NaN boundary', { range: { y: { min: NaN, max: 20 } } }],
    ['wrong sentinel', { range: { y: { min: 'axisMax', max: 20 } } }],
    ['null range', { range: null }],
    ['unknown axis', { range: { z: { min: 1, max: 2 } } }],
    ['both modes', { selector: { field: 'channel', operator: 'in', value: ['A'] }, range: { y: { min: 0, max: 1 } } }],
  ])('rejects %s in schema and Builder', (_name, annotationArea) => {
    expect(zAnnotationArea.safeParse(annotationArea).success).toBe(false)
    expect(() => Builder.from(scatter(annotationArea)).build()).toThrow(/annotationArea/)
  })

  test('reports an empty entry in an annotationArea array', () => {
    const annotations = [{ selector: { field: 'channel', value: ['B'] } }, {}]
    expect(() => Builder.from(scatter(annotations)).build()).toThrow(/annotationArea\[1\].*selector or range/)
  })

  test.each([
    'line',
    'area',
    'areaPercent',
    'column',
    'columnParallel',
    'columnPercent',
    'bar',
    'barParallel',
    'barPercent',
    'boxPlot',
  ])('supports numeric-axis bands on %s', (chartType) => {
    const horizontal = chartType.startsWith('bar')
    const spec = Builder.from({
      chartType,
      dataset,
      dimensions: [{ id: 'channel' }],
      measures: [{ id: 'cost' }],
      annotationArea: { range: horizontal ? { x: { min: 20, max: 100 } } : { y: { min: 0.2, max: 0.4 } } },
    } as VSeed).build() as ILineChartSpec
    expect(spec.markArea).toHaveLength(1)
  })

  test('draws a box-plot threshold across all categories on its numeric y axis', () => {
    const positions = getPositions({
      chartType: 'boxPlot',
      dataset,
      dimensions: [{ id: 'channel' }],
      measures: [{ id: 'cost' }],
      annotationArea: { range: { y: { min: 0.2, max: 0.4 } } },
    } as VSeed)
    expect(positions([], series())).toEqual(rectangle(0, 120, 300, 160))
  })

  test('supports both linear axes on a histogram', () => {
    const positions = getPositions({
      chartType: 'histogram',
      dataset: [{ value: 1 }, { value: 3 }, { value: 5 }, { value: 8 }, { value: 10 }],
      measures: [{ id: 'value' }],
      annotationArea: { range: { x: { min: 2, max: 8 }, y: { min: 0.2, max: 0.4 } } },
    } as VSeed)
    expect(positions([], series())).toEqual(rectangle(4, 120, 16, 160))
  })

  test('interprets a percentage histogram threshold as a raw fraction', () => {
    const positions = getPositions({
      chartType: 'histogram',
      dataset: [{ value: 1 }, { value: 1 }, { value: 3 }, { value: 5 }, { value: 8 }],
      measures: [{ id: 'value' }],
      binValueType: 'percentage',
      xAxis: { min: 0, max: 10 },
      annotationArea: { range: { y: { min: 0.2, max: AxisBoundaryEnum.Max } } },
    } as VSeed)
    expect(positions([], series())).toEqual(rectangle(0, 0, 300, 160))
  })

  test('keeps one numeric region across histogram color groups', () => {
    const positions = getPositions({
      chartType: 'histogram',
      dataset: [
        { group: 'A', value: 1 },
        { group: 'A', value: 3 },
        { group: 'B', value: 5 },
        { group: 'B', value: 8 },
      ],
      dimensions: [{ id: 'group', encoding: 'color' }],
      measures: [{ id: 'value' }],
      legend: { enable: true },
      annotationArea: { range: { x: { min: 2, max: 7 } } },
    } as VSeed)
    expect(positions([], series())).toEqual(rectangle(4, 0, 14, 200))
  })

  test('keeps histogram range geometry exact with custom marker styling', () => {
    const spec = Builder.from({
      chartType: 'histogram',
      dataset: [{ value: 1 }, { value: 3 }, { value: 5 }, { value: 8 }],
      measures: [{ id: 'value' }],
      annotationArea: {
        range: { x: { min: 2, max: 7 } },
        text: '重点观察',
        textPosition: 'bottomRight',
        textAlign: 'right',
        textBaseline: 'bottom',
        textColor: '#111111',
        textFontSize: 14,
        textBackgroundVisible: false,
        areaColor: '#ef4444',
        areaColorOpacity: 0.12,
        areaBorderColor: '#991b1b',
        areaBorderWidth: 2,
        outerPadding: 100,
      },
    } as VSeed).build() as ILineChartSpec
    expect(spec.markArea).toMatchObject([
      {
        label: {
          position: 'insideBottomRight',
          text: '重点观察',
          style: { textAlign: 'right', textBaseline: 'bottom', fill: '#111111', fontSize: 14 },
          labelBackground: { visible: false },
        },
        area: { style: { fill: '#ef4444', fillOpacity: 0.12, stroke: '#991b1b', lineWidth: 2 } },
      },
    ])
    const [mark] = spec.markArea as Array<{ positions: (data: Datum[], series: ICartesianSeries) => unknown }>
    expect(mark.positions([], series())).toEqual(rectangle(4, 0, 14, 200))
  })

  test('rejects repeated histogram ranges in pivot panels', () => {
    expect(() =>
      Builder.from({
        chartType: 'histogram',
        dataset: [{ group: 'A', value: 1 }, { group: 'B', value: 2 }],
        dimensions: [{ id: 'group', encoding: 'row' }],
        measures: [{ id: 'value' }],
        annotationArea: { range: { x: { min: 0, max: 2 } } },
      } as VSeed).build(),
    ).toThrow(/annotationArea.*range.*pivot/i)
  })

  test('rejects a histogram range on a logarithmic x axis', () => {
    expect(() =>
      Builder.from({
        chartType: 'histogram',
        dataset: [{ value: 1 }, { value: 3 }, { value: 5 }],
        measures: [{ id: 'value' }],
        xAxis: { log: true },
        annotationArea: { range: { x: { min: 1, max: 5 } } },
      } as VSeed).build(),
    ).toThrow(/annotationArea.*x.*linear/)
  })

  test('rejects a box-plot range on its category x axis', () => {
    expect(() =>
      Builder.from({
        chartType: 'boxPlot',
        dataset,
        dimensions: [{ id: 'channel' }],
        measures: [{ id: 'cost' }],
        annotationArea: { range: { x: { min: 0, max: 1 } } },
      } as VSeed).build(),
    ).toThrow(/annotationArea.*x.*linear/)
  })

  test('rejects a category-axis range instead of treating numbers as category indices', () => {
    expect(() =>
      Builder.from({ ...scatter({ range: { x: { min: 0, max: 1 } } }), chartType: 'line' } as VSeed).build(),
    ).toThrow(/annotationArea.*x.*linear/)
  })

  test('rejects logarithmic ranges', () => {
    expect(() =>
      Builder.from({ ...scatter({ range: { y: { min: 0.1, max: 1 } } }), yAxis: { log: true } } as VSeed).build(),
    ).toThrow(/annotationArea.*y.*linear/)
  })

  test.each(['dualAxis', 'pie', 'raceScatter'])('rejects unsupported chart type %s', (chartType) => {
    expect(() =>
      Builder.from({ ...scatter({ range: { y: { min: 0, max: 1 } } }), chartType } as VSeed).build(),
    ).toThrow(/annotationArea.*range.*support/)
  })

  test('diagnoses facet ranges before silently repeating them across panels', () => {
    const vseed = scatter({ range: { y: { min: 0, max: 1 } } })
    vseed.dimensions = [{ id: 'channel', encoding: 'row' }]
    expect(() => Builder.from(vseed).build()).toThrow(/annotationArea.*range.*pivot/i)
  })

  test('keeps style fields on the annotation and shares their rendering across modes', () => {
    const spec = Builder.from(
      scatter({ range: { y: { min: 0, max: 1 } }, text: 'Target', areaColor: '#ef4444', areaColorOpacity: 0.12 }),
    ).build() as ILineChartSpec
    expect(spec.markArea).toMatchObject([
      { label: { text: 'Target' }, area: { style: { fill: '#ef4444', fillOpacity: 0.12 } } },
    ])
  })

  test('accepts a range typed with the public enum', () => {
    const range: AnnotationAreaRange = { y: { min: 0.2, max: AxisBoundaryEnum.Max } }
    const annotation: AnnotationArea = { range }
    expect(zAnnotationArea.safeParse(annotation).success).toBe(true)
  })

  test.each(['line', 'area', 'column', 'bar'])('preserves %s selector band geometry', (chartType) => {
    const horizontal = chartType === 'bar'
    const builder = Builder.from({
      chartType,
      dataset,
      dimensions: [{ id: 'channel' }],
      measures: [{ id: 'cost' }],
      annotationArea: { selector: { field: 'channel', operator: 'in', value: ['B', 'C'] } },
    } as VSeed)
    const advanced = builder.buildAdvanced()!
    const spec = builder.buildSpec(advanced) as ILineChartSpec
    const [mark] = spec.markArea as Array<{ positions: (data: Datum[], series: ICartesianSeries) => unknown }>
    const band = { getBandwidth: () => 40 }
    const context = {
      ...series(),
      fieldX: ['channel'],
      fieldY: ['channel'],
      _scaleConfig: { bandPosition: 0.5 },
      getXAxisHelper: () => (horizontal ? {} : band),
      getYAxisHelper: () => (horizontal ? band : {}),
      dataToPosition: (datum: Datum) => ({ x: datum.channel === 'B' ? 50 : 90, y: datum.channel === 'B' ? 50 : 90 }),
    } as unknown as ICartesianSeries
    const expected = horizontal
      ? rectangle(0, 26, 300, 114)
      : chartType === 'column'
        ? rectangle(26, 0, 114, 200)
        : rectangle(46, 0, 94, 200)
    expect(mark.positions(advanced.dataset.flat(), context)).toEqual(expected)
  })

  test('omits geometry until the plot has a finite positive size', () => {
    const positions = getPositions(scatter({ range: { y: { min: 0, max: 1 } } }))
    expect([positions([], series(0, 200)), positions([], series(300, NaN))]).toEqual([[], []])
  })

  test('omits geometry if a numeric axis no longer has a finite domain', () => {
    const positions = getPositions(scatter({ range: { y: { min: 0, max: 1 } } }))
    const context = {
      ...series(),
      getYAxisHelper: () => ({ getScale: () => ({ domain: () => [0, NaN] }) }),
    } as unknown as ICartesianSeries
    expect(positions([], context)).toEqual([])
  })
})
