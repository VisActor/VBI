import { beforeAll, describe, expect, test } from 'vitest'
import VChart from '@visactor/vchart'
import { Builder, registerAll } from 'src/builder'

beforeAll(registerAll)

const build = (values: number[], enabled = false) =>
  Builder.from({
    chartType: 'area',
    dataset: values.map((sales, index) => ({ date: String(index), sales })),
    dimensions: [{ id: 'date' }],
    measures: [{ id: 'sales' }],
    label: { enable: enabled },
    legend: { enable: enabled },
    pointStyle: { pointVisible: false, pointSize: 8 },
    lineStyle: { lineSmooth: true, lineWidth: 2.5 },
    animation: { enable: false },
  }).build<any>()

describe('VChart spec updates', () => {
  test.each(['area', 'column'] as const)(
    '%s preserves the series when changing 30 → 12 → 30 days',
    async (chartType) => {
      const dataset = Array.from({ length: 30 }, (_, index) => ({
        date: `2019-12-${String(index + 1).padStart(2, '0')}`,
        sales: ((index % 7) + 1) * 10,
      }))
      const buildPeriod = (days: number) => {
        const rows = dataset.slice(-days)
        const spec = Builder.from({
          chartType,
          dataset: rows,
          dimensions: [{ id: 'date', timeFormat: { type: 'day' } }],
          measures: [{ id: 'sales' }],
          label: { enable: false },
          legend: { enable: false },
          xAxis: { visible: false },
          yAxis: { visible: false, min: 0, max: Math.max(...rows.map((row) => row.sales)) * 1.06 },
          pointStyle: { pointVisible: false },
          lineStyle: { lineSmooth: true, lineWidth: 2.5 },
          animation: {
            enable: true,
            params: { appear: { enable: false }, update: { enable: true, duration: 600, ease: 'cubicInOut' } },
          },
        }).build<any>()
        return {
          ...spec,
          width: 480,
          height: 240,
        }
      }
      const element = document.createElement('div')
      document.body.append(element)
      const initial = buildPeriod(30)
      const chart = new VChart(initial, { dom: element })
      try {
        chart.renderSync()
        const series = chart.getChart()!.getAllSeries()[0]
        for (const days of [12, 30]) {
          const next = buildPeriod(days)
          expect(next.crosshair.xField.label.formatMethod).toBe(initial.crosshair.xField.label.formatMethod)
          await chart.updateSpec(next)
          // Rebuilding the series drops the old graphics, so no update animation can interpolate them.
          expect(chart.getChart()!.getAllSeries()[0] === series).toBe(true)
          expect((chart.getSpec() as any).animationUpdate[chartType === 'area' ? 'area' : 'bar']).toEqual({
            duration: 600,
            easing: 'cubicInOut',
          })
        }
      } finally {
        chart.release()
        element.remove()
      }
    },
  )

  test('keeps ordinary points absent and active points available across updates', async () => {
    const element = document.createElement('div')
    document.body.append(element)
    const chart = new VChart({ ...build([10, 20, 15]), width: 480, height: 240 }, { dom: element })
    try {
      chart.renderSync()
      for (const values of [
        [10, 20, 15],
        [8, 13],
        [12, -4, 7, 15],
      ]) {
        await chart.updateSpec({ ...build(values), width: 480, height: 240 })
        const series = chart.getChart()!.getAllSeries()[0]
        expect(series.getMarkInName('point')).toBeUndefined()
        expect(series.getMarks().some((mark) => mark.name.startsWith('active_point_'))).toBe(true)
        expect(series.getMarkInName('area')).toBeDefined()
      }
    } finally {
      chart.release()
      element.remove()
    }
  })

  test('can turn labels and legends off and back on on the same chart', async () => {
    const element = document.createElement('div')
    document.body.append(element)
    const chart = new VChart({ ...build([10, 20], true), width: 480, height: 240 }, { dom: element })
    try {
      chart.renderSync()
      await chart.updateSpec({ ...build([20, 30], false), width: 480, height: 240 })
      expect(chart.getSpec().label).toEqual({ visible: false })
      expect(chart.getSpec().legends).toMatchObject({ visible: false })
      expect((chart.getSpec().legends as any).item?.label?.formatMethod).toBeUndefined()
      await chart.updateSpec({ ...build([30, 40], true), width: 480, height: 240 })
      expect((chart.getSpec().label as any).visible).toBe(true)
      expect((chart.getSpec().legends as any).visible).toBe(true)
    } finally {
      chart.release()
      element.remove()
    }
  })
})
