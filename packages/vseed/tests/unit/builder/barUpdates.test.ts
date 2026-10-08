import VChart from '@visactor/vchart'
import { Builder, registerAll } from 'src/builder'

beforeAll(registerAll)

describe('bar geometry across spec updates', () => {
  test('histogram bins retain per-mark corners when the radius changes', async () => {
    const build = (cornerRadius: number) => ({
      ...Builder.from({
        chartType: 'histogram',
        dataset: [{ value: 10 }, { value: 15 }, { value: 20 }],
        measures: [{ id: 'value' }],
        cornerRadius,
        stackCornerRadius: false,
        barStyle: { barBorderWidth: 0 },
      }).build<any>(),
      width: 480,
      height: 240,
      animation: false,
    })
    const element = document.createElement('div')
    document.body.append(element)
    const chart = new VChart(build(6), { dom: element })
    try {
      chart.renderSync()
      for (const radius of [6, 12, 0, 6]) {
        await chart.updateSpec(build(radius))
        const series = chart.getChart()!.getAllSeries()[0]
        const mark = series.getMarkInName('bar')!
        expect((mark.getMarkConfig() as any).clip).not.toBe(true)
        const nonempty = series.getViewData()!.latestData.filter((datum: any) => datum.__MeaValue__ > 0)
        expect(nonempty.length).toBeGreaterThan(0)
        for (const datum of nonempty) expect(mark.getAttribute('cornerRadius', datum)).toBe(radius)
      }
    } finally {
      chart.release()
      element.remove()
    }
  })

  test.each(['column', 'bar'] as const)('%s switches between per-mark corners and whole stack clipping', async (chartType) => {
    const build = (stackCornerRadius?: boolean, cornerRadius: number | number[] = [6, 6, 0, 0]) => ({
      ...Builder.from({
        chartType,
        dataset: [
          { category: 'A', series: 'East', value: 10 },
          { category: 'A', series: 'West', value: 20 },
        ],
        dimensions: [{ id: 'category' }, { id: 'series' }],
        measures: [{ id: 'value' }],
        cornerRadius,
        stackCornerRadius,
        barStyle: [{ barBorderWidth: 0 }, { selector: { series: 'West' }, barColor: 'red' }],
        animation: { enable: false },
      }).build<any>(),
      width: 480,
      height: 240,
    })
    const element = document.createElement('div')
    document.body.append(element)
    const chart = new VChart(build(), { dom: element })
    try {
      chart.renderSync()
      const series = chart.getChart()!.getAllSeries()[0]
      const modes: { stackCornerRadius?: boolean; cornerRadius: number | number[] }[] = [
        { cornerRadius: [6, 6, 0, 0] },
        { stackCornerRadius: true, cornerRadius: [6, 6, 0, 0] },
        { stackCornerRadius: true, cornerRadius: 12 },
        { stackCornerRadius: false, cornerRadius: 8 },
        { stackCornerRadius: true, cornerRadius: 0 },
        { cornerRadius: [6, 6, 0, 0] },
      ]
      for (const { stackCornerRadius, cornerRadius } of modes) {
        await chart.updateSpec(build(stackCornerRadius, cornerRadius))
        const current = chart.getChart()!.getAllSeries()[0]
        expect(current).toBe(series)
        const mark = current.getMarkInName('bar')!
        const config = mark.getMarkConfig() as any
        expect(config.clip === true).toBe(Boolean(stackCornerRadius))
        const data = current.getViewData()!.latestData
        expect(data).toHaveLength(2)
        for (const datum of data) expect(mark.getAttribute('cornerRadius', datum)).toEqual(stackCornerRadius ? 0 : cornerRadius)
        if (stackCornerRadius) {
          // Two stacked segments share one outline, rather than two rounded rectangles.
          expect(config.clipPath()).toHaveLength(1)
          expect(config.clipPath()[0].attribute.cornerRadius).toEqual(cornerRadius)
        }
      }
    } finally {
      chart.release()
      element.remove()
    }
  })

  test.each(['column', 'bar'] as const)(
    '%s preserves single-series corners through native updates',
    async (chartType) => {
      const build = (values: number[]) => ({
        ...Builder.from({
          chartType,
          dataset: values.map((value, i) => ({ category: String(i), value })),
          dimensions: [{ id: 'category' }],
          measures: [{ id: 'value' }],
          cornerRadius: [4, 4, 0, 0],
          stackCornerRadius: true,
          animation: { enable: false },
        }).build<any>(),
        width: 480,
        height: 240,
      })
      const element = document.createElement('div')
      document.body.append(element)
      const chart = new VChart(build([10, -5]), { dom: element })
      try {
        chart.renderSync()
        const series = chart.getChart()!.getAllSeries()[0]
        for (const values of [
          [10, -5],
          [-8, 12],
        ]) {
          await chart.updateSpec(build(values))
          const current = chart.getChart()!.getAllSeries()[0]
          expect(current === series).toBe(true)
          const mark = current.getMarkInName('bar')!
          const config = mark.getMarkConfig() as any
          expect(config.clip).toBe(true)
          expect(config.clipPath().map((rectangle: any) => rectangle.attribute.cornerRadius)).toEqual(
            values.map((value) => (value > 0 ? [4, 4, 0, 0] : [0, 0, 4, 4])),
          )
        }
      } finally {
        chart.release()
        element.remove()
      }
    },
  )

  test.each(['column', 'bar', 'columnParallel', 'barParallel', 'columnPercent', 'barPercent'] as const)(
    '%s keeps its native geometry',
    async (chartType) => {
      const build = (values: number[]) => ({
        ...Builder.from({
          chartType,
          dataset: values.flatMap((value, i) => [
            { category: String(i), series: 'East', value },
            { category: String(i), series: 'West', value: value / 2 },
          ]),
          dimensions: [{ id: 'category' }, { id: 'series' }],
          measures: [{ id: 'value' }],
          label: { enable: false },
          legend: { enable: false },
          barStyle: { barRadius: 4 },
          animation: { enable: true, params: { appear: { enable: false }, update: { enable: true, duration: 50 } } },
        }).build<any>(),
        width: 480,
        height: 240,
      })
      const element = document.createElement('div')
      document.body.append(element)
      const chart = new VChart(build([10, -5, 20]), { dom: element })
      try {
        chart.renderSync()
        const series = chart.getChart()!.getAllSeries()[0]
        for (const values of [
          [15, -8, 18],
          [7, -2],
          [0, 12, -5, 20],
        ]) {
          await chart.updateSpec(build(values))
          const current = chart.getChart()!.getAllSeries()[0]
          expect(current === series).toBe(true)
          const mark = current.getMarkInName('bar')!
          expect((mark.getMarkConfig() as any).clip).not.toBe(true)
          for (const datum of current.getViewData()!.latestData) {
            for (const attribute of chartType.startsWith('column')
              ? ['x', 'y', 'y1', 'width']
              : ['x', 'x1', 'y', 'height']) {
              expect(Number.isFinite(mark.getAttribute(attribute, datum)), attribute).toBe(true)
            }
          }
          chart.resize(560, 320)
          const datum = current.getViewData()!.latestData[0]
          expect(mark.getAttribute(chartType.startsWith('column') ? 'width' : 'height', datum)).toBeGreaterThan(0)
        }
      } finally {
        chart.release()
        element.remove()
      }
    },
  )
})
