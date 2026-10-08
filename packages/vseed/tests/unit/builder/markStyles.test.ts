import { beforeAll, describe, expect, test } from 'vitest'
import { Builder, registerAll } from 'src/builder'
import type { VSeed } from 'src/types'

const dataset = [{ date: 'A', sales: 10 }, { date: 'B', sales: -5 }]
const build = (chartType: string, options: object = {}) => Builder.from({
  chartType, dataset, dimensions: [{ id: 'date' }], measures: [{ id: 'sales' }], ...options,
} as VSeed).build<any>()

beforeAll(registerAll)

describe('base and conditional mark styles', () => {
  test('ordinary area styling produces no custom state callbacks', () => {
    const spec = build('area', {
      pointStyle: { pointVisible: false, pointSize: 8 },
      lineStyle: { lineWidth: 2.5, lineSmooth: true, lineColor: 'red' },
      areaStyle: { areaColor: 'pink', areaColorOpacity: 0.3 },
    })
    expect(spec.point.visible).toBe(false)
    expect(spec.point.style.visible).toBeUndefined()
    expect(spec.point.state.custom1).toBeUndefined()
    expect(spec.activePoint).toBe(true)
    expect(spec.line.style).toMatchObject({ lineWidth: 2.5, curveType: 'monotone', stroke: 'red' })
    expect(spec.line.state).toEqual({})
    expect(spec.area.style).toMatchObject({ curveType: 'monotone', fill: 'pink', fillOpacity: 0.3 })
    expect(spec.area.state).toEqual({})
  })

  test('area curves follow globally configured smooth lines even without an areaStyle', () => {
    const spec = build('area', { lineStyle: { lineSmooth: true } })
    expect(spec.area.style.curveType).toBe(spec.line.style.curveType)
  })

  test('conditional line smoothing does not become a global area style', () => {
    const spec = build('area', { lineStyle: { selector: { date: 'B' }, lineSmooth: true } })
    expect(spec.line.state.custom1.style.curveType).toBe('monotone')
    expect(spec.area.style.curveType).toBe('linear')
  })

  test('radar pipelines compose closed curves for both line and area', () => {
    const spec = build('radar', { lineStyle: { lineSmooth: true } })
    expect(spec.line.style).toMatchObject({ curveType: 'catmullRomClosed', curveTension: 0.4 })
    expect(spec.area.style).toMatchObject({ curveType: 'catmullRomClosed', curveTension: 0.4 })
  })

  test('global rules merge defined attributes without erasing earlier colors', () => {
    const spec = build('column', { barStyle: [{ barColor: 'green', barBorderColor: 'blue' }, { barRadius: 4, barColorOpacity: 0.6 }] })
    expect(spec.bar.style).toMatchObject({ fill: 'green', stroke: 'blue', cornerRadius: 4, fillOpacity: 0.6 })
    expect(Object.keys(spec.bar.state)).toEqual(['hover'])
  })

  test('conditional overrides retain original order, including a later global rule', () => {
    const spec = build('column', { barStyle: [
      { barColor: 'green' },
      { selector: { field: 'sales', operator: '<', value: 0 }, barColor: 'red' },
      { barColorOpacity: 0.5 },
      { selector: { date: 'B' }, barRadius: 8 },
    ] })
    expect(spec.bar.style.fill).toBe('green')
    expect(spec.bar.state.custom1).toBeUndefined()
    const { custom2, custom3, custom4 } = spec.bar.state
    expect(custom2.filter(dataset[0])).toBe(false)
    expect(custom2.filter(dataset[1])).toBe(true)
    expect(custom2.style.fill).toBe('red')
    expect(custom3.filter(dataset[0])).toBe(true)
    expect(custom3.level).toBeGreaterThan(custom2.level)
    expect(custom4.level).toBeGreaterThan(custom3.level)
  })

  test('conditional points can override a globally hidden base', () => {
    const spec = build('area', { pointStyle: [{ pointVisible: false }, { selector: { date: 'B' }, pointVisible: true }] })
    expect(spec.point.visible).not.toBe(false)
    expect(spec.point.style.visible).toBe(false)
    expect(spec.point.state.custom2.filter(dataset[0])).toBe(false)
    expect(spec.point.state.custom2.filter(dataset[1])).toBe(true)
    expect(spec.point.state.custom2.style.visible).toBe(true)
  })

  test('line and area selectors apply to a matching series', () => {
    const builder = Builder.from({ chartType: 'area', dataset, dimensions: [{ id: 'date' }], measures: [{ id: 'sales' }],
      lineStyle: { selector: { date: 'B' }, lineColor: 'red' },
      areaStyle: { selector: { date: 'B' }, areaColor: 'pink' },
    })
    const advanced = builder.buildAdvanced()!
    const spec = builder.buildSpec<any>(advanced)
    expect(spec.line.state.custom1.filter({}, { renderNode: { context: { data: dataset } } })).toBe(true)
    expect(spec.line.state.custom1.filter({}, { renderNode: { context: { data: [dataset[0]] } } })).toBe(false)
    expect(spec.area.state.custom1.filter(advanced.dataset[0])).toBe(true)
    expect(spec.area.state.custom1.filter({})).toBe(false)
  })

  test.each([
    ['area', { lineStyle: { lineColor: 'red' }, areaStyle: { areaColor: 'pink' }, pointStyle: { pointColor: 'blue' } }],
    ['column', { barStyle: { barColor: 'green' } }],
  ])('explicit colors retain priority over the %s color scale', (type, styles) => {
    const spec = build(type, { ...styles, measures: [{ id: 'sales', encoding: 'yAxis' }, { id: 'sales', encoding: 'color' }] })
    if (type === 'area') {
      expect(spec.line.style.stroke).toBe('red')
      expect(spec.area.style.fill).toBe('pink')
      expect(spec.point.style.fill).toBe('blue')
    } else expect(spec.bar.style.fill).toBe('green')
  })
})

describe('conditional dynamic styles and line patterns', () => {
  const dynamicFilter = { type: 'partial-datum', code: '', fallback: { date: 'B' } }

  test.each(['point', 'bar', 'line', 'area'])('%s retains dynamic matching instead of becoming a global style', (mark) => {
    const chartType = mark === 'bar' ? 'column' : 'area'
    const builder = Builder.from({
      chartType, dataset, dimensions: [{ id: 'date' }], measures: [{ id: 'sales' }],
      [`${mark}Style`]: { dynamicFilter, [`${mark}Color`]: 'red' },
    } as VSeed)
    const advanced = builder.buildAdvanced()!
    const spec = builder.buildSpec<any>(advanced)
    const filter = spec[mark].state.custom1.filter
    if (mark === 'line') {
      expect(filter({}, { renderNode: { context: { data: [dataset[0]] } } })).toBe(false)
      expect(filter({}, { renderNode: { context: { data: [dataset[1]] } } })).toBe(true)
    } else if (mark === 'area') {
      expect(filter(advanced.dataset[0])).toBe(true)
    } else {
      expect(filter(dataset[0])).toBe(false)
      expect(filter(dataset[1])).toBe(true)
    }
  })

  test.each(['dashed', 'dotted'] as const)('%s line and border patterns remain intact', (pattern) => {
    const spec = build('area', {
      lineStyle: { lineWidth: 4, lineStyle: pattern },
      pointStyle: { pointBorderStyle: pattern, pointBorderWidth: 2 },
    })
    expect(spec.line.style.lineDash).toEqual(pattern === 'dashed' ? [8, 8] : [2, 8])
    expect(spec.point.style.innerBorder.lineDash).toEqual(pattern === 'dashed' ? [5, 2] : [2, 5])
    const column = build('column', { barStyle: { barBorderStyle: pattern } })
    expect(column.bar.style.lineDash).toEqual(pattern === 'dashed' ? [5, 2] : [2, 5])
  })
})
