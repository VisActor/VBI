import { beforeAll, describe, expect, test } from 'vitest'
import { Builder, registerAll } from 'src/builder'
import type { VSeed } from 'src/types'

const dataset = [
  { date: '2024-01-15', region: 'East', sales: 10, profit: 3 },
  { date: '2024-02-15', region: 'West', sales: 20, profit: 8 },
]
const seed = (chartType = 'area', options: object = {}): VSeed => ({
  chartType,
  dataset,
  dimensions: [{ id: 'date' }],
  measures: [{ id: 'sales', alias: 'Sales' }],
  ...options,
}) as VSeed
const build = (chartType = 'area', options: object = {}) => Builder.from(seed(chartType, options)).build<any>()

beforeAll(registerAll)

describe('disabled components', () => {
  test.each(['area', 'line', 'column', 'bar', 'donut', 'pie', 'radar', 'scatter', 'boxPlot'])(
    '%s omits callbacks and layout from hidden labels and legends', (chartType) => {
      const spec = build(chartType, { label: { enable: false }, legend: { enable: false } })
      expect(spec.label).toEqual({ visible: false })
      expect(spec.legends).toEqual({ visible: false })
    },
  )

  test.each(['area', 'column', 'donut'])( '%s clears hidden pivot legends', (chartType) => {
    const spec = build(chartType, {
      dimensions: [{ id: 'date' }, { id: 'region', encoding: 'row' }],
      label: { enable: false }, legend: { enable: false },
    })
    expect(spec.legends).toEqual([])
    for (const indicator of spec.indicators) expect(indicator.chartSpec.label).toEqual({ visible: false })
  })

  test('continuous legends are disabled without formatting callbacks', () => {
    const spec = build('scatter', {
      measures: [{ id: 'sales', encoding: 'xAxis' }, { id: 'profit', encoding: 'yAxis' }, { id: 'profit', encoding: 'color' }],
      legend: { enable: false },
    })
    expect(spec.legends).toEqual({ visible: false })
  })

  test('a builder can disable and re-enable components', () => {
    const builder = Builder.from(seed('area'))
    expect(builder.build<any>().label.formatMethod).toBeTypeOf('function')
    builder.vseed = seed('area', { label: { enable: false }, legend: { enable: false } })
    expect(builder.build<any>().label).toEqual({ visible: false })
    builder.vseed = seed('area')
    expect(builder.build<any>().label.formatMethod).toBeTypeOf('function')
    expect(builder.build<any>().legends.visible).toBe(true)
  })
})

describe('stable axis and legend formatting', () => {
  test.each([['area', 'bottom', 'xField'], ['column', 'bottom', 'xField'], ['bar', 'left', 'yField']])(
    '%s reuses plain formatters through independent builds and dataset changes', (type, orient, field) => {
      const first = build(type)
      const second = build(type, { dataset: dataset.slice(1) })
      const formatter = first.axes.find((axis: any) => axis.orient === orient).label.formatMethod
      expect(formatter).toBe(second.axes.find((axis: any) => axis.orient === orient).label.formatMethod)
      expect(first.crosshair[field].label.formatMethod).toBe(formatter)
      expect(second.crosshair[field].label.formatMethod).toBe(formatter)
      expect(formatter('2024-01-15')).toBe('2024-01-15')
      expect(formatter(['East', '2024-01-15'])).toEqual(['East', '2024-01-15'])
    },
  )

  test('time formatters are reused by granularity and locale without stale formatting', () => {
    const options = { dimensions: [{ id: 'date', timeFormat: { type: 'quarter' } }], locale: 'en-US' }
    const first = build('area', options).axes[0].label.formatMethod
    expect(first).toBe(build('area', structuredClone(options)).axes[0].label.formatMethod)
    expect(first('2024-01-15')).toBe('2024 Q1')
    const chinese = build('area', { ...options, locale: 'zh-CN' }).axes[0].label.formatMethod
    expect(chinese('2024-01-15')).toBe('2024年Q1')
    expect(chinese).not.toBe(first)
    const yearly = build('area', { dimensions: [{ id: 'date', timeFormat: { type: 'year' } }] }).axes[0].label.formatMethod
    expect(yearly('2024-01-15')).toBe('2024')
  })

  test('a cached date formatter handles new timestamps and missing values independently', () => {
    const options = { dimensions: [{ id: 'date', timeFormat: { type: 'day' } }], locale: 'en-US' }
    const first = build('area', options).crosshair.xField.label.formatMethod
    const next = build('area', { ...options, dataset: dataset.slice(1) }).crosshair.xField.label.formatMethod
    expect(next).toBe(first)
    expect(next(new Date(2024, 0, 15).getTime())).toBe('2024-01-15')
    expect(next(new Date(2024, 1, 15).getTime())).toBe('2024-02-15')
    expect(next(null)).toBe('')
    expect(next(Number.NaN)).toBe('NaN')
    expect(next(Infinity)).toBe('Infinity')
  })

  test('plain category legends need no alias formatter; measure aliases stay current', () => {
    expect(build('donut').legends.item.label.formatMethod).toBeUndefined()
    const first = build('column', { dimensions: [{ id: 'date' }], measures: [{ id: 'sales', alias: 'Sales' }, { id: 'profit', alias: 'Profit' }] })
    const second = build('column', { dimensions: [{ id: 'date' }], measures: [{ id: 'sales', alias: 'Sales' }, { id: 'profit', alias: 'Profit' }] })
    const aliasBuilder = Builder.from(seed('column', { dimensions: [{ id: 'date' }], measures: [{ id: 'sales', alias: 'Sales' }, { id: 'profit', alias: 'Profit' }] }))
    aliasBuilder.build()
    const salesKey = Object.entries(aliasBuilder.getColorIdMap()).find(([, item]) => item.alias === 'Sales')![0]
    const formatter = first.legends.item.label.formatMethod
    expect(formatter).toBe(second.legends.item.label.formatMethod)
    expect(formatter(salesKey)).toBe('Sales')
    expect(formatter('unknown')).toBe('unknown')
    const changed = build('column', { dimensions: [{ id: 'date' }], measures: [{ id: 'sales', alias: 'Revenue' }, { id: 'profit', alias: 'Profit' }] })
    expect(changed.legends.item.label.formatMethod(salesKey)).toBe('Revenue')
    expect(formatter(salesKey)).toBe('Sales')
  })

  test.each([['area', 'crosshairLine'], ['column', 'crosshairRect'], ['bar', 'crosshairRect']])(
    '%s respects explicitly disabled crosshairs', (type, config) => {
      const spec = build(type, { [config]: { visible: false, labelVisible: false } })
      const field = spec.crosshair.xField ?? spec.crosshair.yField
      expect(field.visible).toBe(false)
      expect(field.label.visible).toBe(false)
    },
  )
})
