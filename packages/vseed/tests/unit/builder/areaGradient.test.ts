import { Builder, registerAll } from 'src/builder'
import type { VSeed } from 'src/types'
import VChart from '@visactor/vchart'

beforeAll(registerAll)

const seed = (options: object = {}): VSeed =>
  ({
    chartType: 'area',
    dataset: [
      { date: 'A', series: 'East', value: 10 },
      { date: 'B', series: 'West', value: 20 },
    ],
    dimensions: [{ id: 'date' }, { id: 'series', encoding: 'color' }],
    measures: [{ id: 'value' }],
    ...options,
  }) as VSeed

describe('area gradients', () => {
  test('renders inherited gradients and preserves the area series during data updates', async () => {
    const build = (value: number) => ({
      ...Builder.from(
        seed({
          dataset: [
            { date: 'A', series: 'East', value },
            { date: 'B', series: 'West', value: value * 2 },
          ],
          label: { enable: false },
          legend: { enable: false },
          areaStyle: { areaGradient: true },
          animation: { enable: true, params: { update: { enable: true, duration: 100 } } },
        }),
      ).build<any>(),
      width: 480,
      height: 240,
    })
    const element = document.createElement('div')
    document.body.append(element)
    const chart = new VChart(build(10), { dom: element })
    try {
      chart.renderSync()
      const series = chart.getChart()!.getAllSeries()[0]
      await chart.updateSpec(build(20))
      expect(chart.getChart()!.getAllSeries()[0] === series).toBe(true)
      const area = series.getMarkInName('area')!
      const fill = area.getAttribute('fill', series.getViewData()!.latestData[0])
      expect(fill.gradient).toBe('linear')
      expect(fill.stops[0].color).toMatch(/, 0\)$/)
      expect(fill.stops[1].color).toBeTruthy()
    } finally {
      chart.release()
      element.remove()
    }
  })
  test.each(['area', 'areaPercent', 'radar'] as const)(
    '%s accepts serializable explicit gradients and preserves line smoothing',
    (chartType) => {
      const dsl = seed({
        chartType,
        lineStyle: [{ lineSmooth: true }],
        areaStyle: { areaColor: '#19cba1', areaGradient: true },
      })
      const spec = Builder.from(JSON.parse(JSON.stringify(dsl))).build<any>()
      expect(spec.area.style.fill).toMatchObject({
        gradient: 'linear',
        x0: 0,
        y0: 1,
        x1: 0,
        y1: 0,
        stops: [
          { offset: 0, color: 'rgba(25, 203, 161, 0)' },
          { offset: 1, color: '#19cba1' },
        ],
      })
      expect(spec.area.style.curveType).toBe(spec.line.style.curveType)
    },
  )

  test('inherits the ordinal series color or continuous measure color at render time', () => {
    for (const linear of [false, true]) {
      const builder = Builder.from(
        seed({
          areaStyle: { areaGradient: true },
          ...(linear
            ? {
                measures: [
                  { id: 'value', encoding: 'yAxis' },
                  { id: 'value', encoding: 'color' },
                ],
              }
            : {}),
        }),
      )
      const advanced = builder.buildAdvanced()!
      const spec = builder.buildSpec<any>(advanced)
      const field = linear
        ? advanced.datasetReshapeInfo[0].unfoldInfo.encodingColor
        : advanced.datasetReshapeInfo[0].unfoldInfo.encodingColorId
      const scale = vi.fn((id: string, value: unknown) =>
        value === advanced.dataset[0][field] ? '#ff0000' : '#0000ff',
      )
      expect(spec.area.style.fill(advanced.dataset[0], { globalScale: scale }).stops[1].color).toBe('#ff0000')
      expect(scale).toHaveBeenCalledWith('color', advanced.dataset[0][field])
      expect(spec.area.style.fill(advanced.dataset[1], { globalScale: scale }).stops[1].color).toBe('#0000ff')
    }
  })

  test('conditional gradients retain selector priority and explicit fills beat color scales', () => {
    const builder = Builder.from(
      seed({
        areaStyle: [{ areaColor: 'blue' }, { selector: { series: 'West' }, areaColor: 'red', areaGradient: true }],
      }),
    )
    const advanced = builder.buildAdvanced()!
    const spec = builder.buildSpec<any>(advanced)
    expect(spec.area.style.fill).toBe('blue')
    expect(spec.area.state.custom2.filter(advanced.dataset[0])).toBe(false)
    expect(spec.area.state.custom2.filter(advanced.dataset[1])).toBe(true)
    expect(spec.area.state.custom2.style.fill.gradient).toBe('linear')
  })

  test('pivot areas use the same gradient capability', () => {
    const spec = Builder.from(
      seed({
        dimensions: [{ id: 'date' }, { id: 'series', encoding: 'row' }],
        areaStyle: { areaColor: 'red', areaGradient: true },
      }),
    ).build<any>()
    expect(spec.indicators[0].chartSpec.area.style.fill.gradient).toBe('linear')
  })
})
