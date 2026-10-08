import VChart from '@visactor/vchart'
import { Builder, registerAll } from 'src/builder'

beforeAll(registerAll)

describe('bar geometry across spec updates', () => {
  test.each(['column', 'bar'] as const)(
    '%s preserves single-series corners through native updates',
    async (chartType) => {
      const build = (values: number[]) => ({
        ...Builder.from({
          chartType,
          dataset: values.map((value, i) => ({ category: String(i), value })),
          dimensions: [{ id: 'category' }],
          measures: [{ id: 'value' }],
          stackCornerRadius: [4, 4, 0, 0],
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
