import VChart from '@visactor/vchart'
import { Builder, registerAll } from 'src/builder'
import { zVSeed } from 'src/types/zVseed'
import type { VSeed } from 'src/types'

beforeAll(registerAll)

const seed = (options: object = {}): VSeed =>
  ({
    chartType: 'column',
    dataset: [
      { __row_index: 0, category: 'A', series: 'East', value: 10, colorValue: 1 },
      { __row_index: 1, category: 'A', series: 'West', value: -5, colorValue: 2 },
      { __row_index: 2, category: 'B', series: 'East', value: 20, colorValue: 3 },
      { __row_index: 3, category: 'B', series: 'West', value: -8, colorValue: 4 },
    ],
    dimensions: [{ id: 'category' }, { id: 'series', encoding: 'color' }],
    measures: [{ id: 'value' }],
    ...options,
  }) as VSeed

test.each(['column', 'bar', 'columnParallel', 'barParallel', 'columnPercent', 'barPercent'] as const)(
  '%s accepts serializable gradients alongside corners, borders and opacity',
  (chartType) => {
    const dsl = JSON.parse(
      JSON.stringify(
        seed({
          chartType,
          barStyle: {
            barColor: 'rgba(255,0,0,0.5)',
            barGradient: true,
            barColorOpacity: 0.6,
            barRadius: 4,
            barBorderColor: 'black',
            barBorderWidth: 2,
          },
        }),
      ),
    )
    expect(zVSeed.safeParse(dsl).success).toBe(true)
    const spec = Builder.from(dsl).build<any>()
    expect(spec.bar.style).toMatchObject({
      cornerRadius: 4,
      stroke: 'black',
      lineWidth: 2,
      fillOpacity: 0.6,
    })
    const datum = { [chartType.startsWith('bar') ? spec.xField : spec.yField]: 10 }
    expect(spec.bar.style.fill(datum, {})).toMatchObject({
      gradient: 'linear',
      stops: [
        { offset: 0, color: 'rgba(255, 0, 0, 0)' },
        { offset: 1, color: 'rgba(255,0,0,0.5)' },
      ],
    })
    expect(spec.stackCornerRadius).toBeTypeOf('function')
  },
)

test.each(['column', 'bar', 'columnParallel', 'barParallel', 'columnPercent', 'barPercent'] as const)(
  '%s renders inherited series gradients after data updates',
  async (chartType) => {
    const build = (multiplier: number) => ({
      ...Builder.from(
        seed({
          chartType,
          dataset: (seed().dataset as any[]).map((row) => ({ ...row, value: row.value * multiplier })),
          color: { colorMapping: { East: '#ff0000', West: '#0000ff' } },
          barStyle: { barGradient: true },
          label: { enable: false },
          legend: { enable: false },
          animation: { enable: true, params: { appear: { enable: false }, update: { enable: true, duration: 0 } } },
        }),
      ).build<any>(),
      width: 480,
      height: 240,
    })
    const element = document.createElement('div')
    document.body.append(element)
    const chart = new VChart(build(1), { dom: element })
    try {
      chart.renderSync()
      const series = chart.getChart()!.getAllSeries()[0]
      await chart.updateSpec(build(-2))
      expect(chart.getChart()!.getAllSeries()[0] === series).toBe(true)
      const mark = series.getMarkInName('bar')!
      for (const datum of series.getViewData()!.latestData) {
        const fill = mark.getAttribute('fill', datum)
        expect(fill.gradient).toBe('linear')
        const positive = datum.value > 0
        expect(chartType.startsWith('bar') ? [fill.x0, fill.x1] : [fill.y0, fill.y1]).toEqual(
          chartType.startsWith('bar') ? (positive ? [0, 1] : [1, 0]) : positive ? [1, 0] : [0, 1],
        )
        expect(fill.stops[0].color).toMatch(/, 0\)$/)
        expect(fill.stops[1].color).toBe(datum.series === 'East' ? '#ff0000' : '#0000ff')
        for (const attribute of chartType.startsWith('bar') ? ['x', 'x1', 'y', 'height'] : ['x', 'y', 'y1', 'width'])
          expect(Number.isFinite(mark.getAttribute(attribute, datum))).toBe(true)
      }
      chart.resize(560, 320)
      expect(mark.getAttribute('fill', series.getViewData()!.latestData[0]).gradient).toBe('linear')
    } finally {
      chart.release()
      element.remove()
    }
  },
)

test.each(['column', 'bar'] as const)('%s inherits continuous color values', (chartType) => {
  const builder = Builder.from(
    seed({
      chartType,
      dimensions: [{ id: 'category' }],
      measures: [{ id: 'value' }, { id: 'colorValue', encoding: 'color' }],
      barStyle: { barGradient: true },
    }),
  )
  const advanced = builder.buildAdvanced()!
  const spec = builder.buildSpec<any>(advanced)
  const scale = vi.fn(() => 'red')
  const datum = advanced.dataset[0]
  expect(spec.color.type).toBe('linear')
  expect(spec.bar.style.fill(datum, { globalScale: scale }).stops).toEqual([
    { offset: 0, color: 'rgba(255, 0, 0, 0)' },
    { offset: 1, color: 'red' },
  ])
  expect(scale).toHaveBeenCalledWith('color', datum[advanced.datasetReshapeInfo[0].unfoldInfo.encodingColor])
})

test('conditional and dynamic gradients retain rule priority', () => {
  const builder = Builder.from(
    seed({
      barStyle: [
        { barColor: 'green' },
        { selector: { field: 'value', operator: '<', value: 0 }, barColor: 'red', barGradient: true },
        {
          dynamicFilter: {
            type: 'row-with-field',
            code: '',
            result: { success: true, data: [{ __row_index: 0, field: 'value' }] },
          },
          barColor: 'blue',
          barGradient: true,
        },
      ],
    }),
  )
  const advanced = builder.buildAdvanced()!
  const spec = builder.buildSpec<any>(advanced)
  expect(spec.bar.style.fill).toBe('green')
  const { custom2, custom3 } = spec.bar.state
  expect(custom2.filter(advanced.dataset[0])).toBe(false)
  expect(custom2.filter(advanced.dataset[1])).toBe(true)
  expect(custom2.style.fill(advanced.dataset[1], {}).stops[1].color).toBe('red')
  expect(custom3.filter(advanced.dataset[0])).toBe(true)
  expect(custom3.filter(advanced.dataset[1])).toBe(false)
  expect(custom3.level).toBeGreaterThan(custom2.level)
  expect(custom3.style.fill(advanced.dataset[0], {})).toMatchObject({ gradient: 'linear', y0: 1, y1: 0 })
})

test.each(['column', 'bar'] as const)('pivot %s uses the same gradient capability', (chartType) => {
  const spec = Builder.from(
    seed({
      chartType,
      dimensions: [{ id: 'category' }, { id: 'series', encoding: 'row' }],
      barStyle: { barColor: 'red', barGradient: true },
    }),
  ).build<any>()
  const chart = spec.indicators[0].chartSpec
  expect(chart.bar.style.fill({ [chartType.startsWith('bar') ? chart.xField : chart.yField]: -5 }, {}).gradient).toBe(
    'linear',
  )
})

test.each(['column', 'area'] as const)(
  'dual-axis %s gradients inherit measure colors before the scale pipe runs',
  (chartType) => {
    const builder = Builder.from(
      seed({
        chartType: 'dualAxis',
        dimensions: [{ id: 'category' }],
        measures: [
          { id: 'value', encoding: 'primaryYAxis', chartType },
          { id: 'colorValue', encoding: 'color' },
        ],
        barStyle: { barGradient: true },
        areaStyle: { areaGradient: true },
      }),
    )
    const advanced = builder.buildAdvanced()!
    const spec = builder.buildSpec<any>(advanced)
    const scale = vi.fn(() => '#ff0000')
    const datum = spec.series[0].data.values[0]
    const fill = spec.series[0][chartType === 'column' ? 'bar' : 'area'].style.fill(datum, { globalScale: scale })
    expect(fill.stops[1].color).toBe('#ff0000')
    expect(scale).toHaveBeenCalledWith('color', datum[advanced.datasetReshapeInfo[0].unfoldInfo.encodingColor])
  },
)

test('bar gradient schema rejects object configuration', () => {
  expect(zVSeed.safeParse(seed({ barStyle: { barGradient: { stops: [{ offset: 1 }, { offset: 0 }] } } })).success).toBe(
    false,
  )
})

test.each(['column', 'bar', 'columnPercent', 'barPercent'] as const)(
  '%s stacked segments share the zero baseline for positive and negative values',
  (chartType) => {
    const spec = Builder.from(
      seed({
        chartType,
        dataset: [
          { category: 'A', series: 'East', value: 10 },
          { category: 'A', series: 'West', value: 20 },
          { category: 'B', series: 'East', value: -10 },
          { category: 'B', series: 'West', value: -20 },
        ],
        barStyle: { barGradient: true },
        animation: { enable: false },
      }),
    ).build<any>()
    const element = document.createElement('div')
    document.body.append(element)
    const chart = new VChart({ ...spec, width: 480, height: 240 }, { dom: element })
    try {
      chart.renderSync()
      const series = chart.getChart()!.getAllSeries()[0]
      const mark = series.getMarkInName('bar')!
      for (const datum of series.getViewData()!.latestData) {
        const fill = mark.getAttribute('fill', datum)
        const start = datum.__VCHART_STACK_START
        const end = datum.__VCHART_STACK_END
        const length = Math.abs(end - start)
        const min = Math.min(start, end)
        const [zero, tip] = chartType.startsWith('bar') ? [fill.x0, fill.x1] : [1 - fill.y0, 1 - fill.y1]
        expect(zero * length + min).toBeCloseTo(0)
        expect(tip * length + min).toBeCloseTo(end)
        expect(fill.stops[0].color).toMatch(/, 0\)$/)
      }
    } finally {
      chart.release()
      element.remove()
    }
  },
)

test('histogram gradients use the generated bin count and can be disabled on update', async () => {
  const build = (barGradient: boolean) => ({
    ...Builder.from({
      chartType: 'histogram',
      dataset: [1, 1, 1, 2, 5, 7, 8, 9, 10].map((value) => ({ value })),
      barStyle: { barColor: '#19cba1', barGradient },
      animation: { enable: false },
    }).build<any>(),
    width: 480,
    height: 240,
  })
  const element = document.createElement('div')
  document.body.append(element)
  const chart = new VChart(build(true), { dom: element })
  try {
    chart.renderSync()
    const series = chart.getChart()!.getAllSeries()[0]
    const mark = series.getMarkInName('bar')!
    const values = series.getViewData()!.latestData
    expect(values.length).toBeGreaterThan(0)
    for (const datum of values) {
      expect(mark.getAttribute('fill', datum)).toMatchObject({
        gradient: 'linear',
        y0: 1,
        y1: 0,
        stops: [
          { offset: 0, color: 'rgba(25, 203, 161, 0)' },
          { offset: 1, color: '#19cba1' },
        ],
      })
    }
    await chart.updateSpec(build(false))
    expect(chart.getChart()!.getAllSeries()[0]).toBe(series)
    expect(mark.getAttribute('fill', series.getViewData()!.latestData[0])).toBe('#19cba1')
  } finally {
    chart.release()
    element.remove()
  }
})
