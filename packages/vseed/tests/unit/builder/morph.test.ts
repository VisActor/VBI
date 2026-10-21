import VChart from '@visactor/vchart'
import { Builder, registerAll } from 'src/builder'
import type { VSeed } from 'src/types'

beforeAll(registerAll)

const families = [
  'column',
  'columnParallel',
  'columnPercent',
  'bar',
  'barParallel',
  'barPercent',
  'line',
  'area',
  'areaPercent',
  'scatter',
  'pie',
  'donut',
  'rose',
  'roseParallel',
  'radar',
] as const
const input = (chartType: string, animation?: object): VSeed =>
  ({
    chartType,
    dimensions: [{ id: 'category' }],
    measures: [{ id: 'value' }],
    dataset: [
      { category: 'A', value: 10 },
      { category: 'B', value: 20 },
    ],
    animation,
  }) as VSeed
const build = (chartType: string, animation?: object) => Builder.from(input(chartType, animation)).build<any>()

describe('default native morph phases', () => {
  test.each(families)('%s supplies native morph phases without an extra option', (type) => {
    for (const animation of [undefined, {}, { enable: true }, { params: {} }]) {
      const spec = build(type, animation)
      expect(spec.animation).toBe(true)
      expect(spec.animationAppear).toEqual({ ...(type === 'radar' ? { preset: 'fadeIn' } : {}), duration: 1000, easing: undefined })
      expect(spec.animationUpdate).not.toBe(false)
      expect(spec.animationEnter).not.toBe(false)
      expect(spec.animationExit).not.toBe(false)
      expect(spec.animationNormal).toBe(false)
      // Keep native mark identities; data points use stable dimensional groups.
      expect(spec.morph.morphKey).toBeUndefined()
      expect(spec.data.values[0][spec.morph.morphElementKey]).toBeTruthy()
    }
    expect(build(type, { enable: false }).animation).toBe(false)
  })

  test.each(families)('%s respects explicit disabled phases, zero duration and authored effects', (type) => {
    const off = build(type, {
      enable: true,
      params: { appear: { enable: false }, update: { enable: false } },
    })
    expect(off.animationAppear).toBe(false)
    expect(off.animationUpdate).toBe(false)
    expect(off.animationEnter).toBe(false)
    expect(off.animationExit).toBe(false)
    const spec = build(type, {
      enable: true,
      params: { update: { enable: true, duration: 0, ease: 'linear' } },
    })
    expect(spec.animationAppear).toEqual({ ...(type === 'radar' ? { preset: 'fadeIn' } : {}), duration: 0, easing: 'linear' })
    const effects =
      type === 'pie' || type === 'donut' || type.startsWith('rose') || type === 'radar'
        ? ['radial']
        : type === 'scatter'
          ? ['scale']
          : ['growth']
    const animation = {
      enable: true,
      params: { appear: { enable: true, effects, duration: 600 }, update: { enable: true, duration: 400 } },
    }
    const authored = build(type, animation)
    expect(authored.animationAppear).not.toBe(false)
    expect(authored.animationAppear).not.toEqual({ duration: 600 })
    expect(JSON.stringify(authored.animationAppear)).toContain('600')
    expect(JSON.stringify(authored.animationUpdate)).toContain('400')
  })

  test.each(['growth', 'scale'])('scatter %s retains point sizes with default morph enabled', (effect) => {
    const spec = build('scatter', {
      params: { appear: { enable: true, effects: [effect], duration: 600 } },
    })
    const phases = spec.animationAppear.point
    expect(phases.reduce((total: number, phase: any) => total + phase.duration, 0)).toBe(600)
    const size = phases.at(-1).channel.size
    const resolveSize = effect === 'growth' ? size.from : size.to
    expect(resolveSize({}, { attribute: { size: 24 } })).toBe(24)
    expect(resolveSize({}, { attribute: { size: 0 } })).toBe(0)
    expect(resolveSize({}, {})).toBeUndefined()
    expect(resolveSize({})).toBeUndefined()
    expect(spec.animationUpdate.point.duration).toBe(1000)
  })

  test.each([undefined, { enable: false }])('line loop retains timing and stroke when appear=%j', (appear) => {
    const spec = build('line', {
      params: { appear, loop: { enable: true, interval: 750, atmosphere: { color: '#123456', effect: 'reveal' } } },
    })
    const stream = spec.animationNormal.line.at(-1)
    expect(stream.startTime).toBe(appear ? 0 : 750)
    for (const [graphic, width] of [
      [{ attribute: { lineWidth: 3 } }, 3],
      [{ attribute: {} }, 1],
      [{}, 1],
    ] as const) {
      expect(stream.customParameters({}, graphic)).toMatchObject({
        attribute: { stroke: '#123456', lineWidth: width },
      })
    }
    expect(spec.animationNormal.point[0].channel.fillOpacity).toEqual({ from: 0.6, to: 1 })
  })

  test('default morph preserves configured ripple colors and its final border', () => {
    const spec = build('scatter', { params: { loop: { enable: true, atmosphere: { effect: 'ripple' } } } })
    const ripple = spec.animationNormal.point[0]
    const border = ripple.channel.outerBorder.to({}, { attribute: { fill: '#123456' } })
    expect(border).toEqual({ distance: 16, strokeOpacity: 1e-8, stroke: '#123456' })
    expect(ripple.channel.outerBorder.to({}, {})).toHaveProperty('stroke', undefined)
    expect(ripple.channel.outerBorder.to({})).toHaveProperty('stroke', undefined)
    const graphic = { attribute: { strokeOpacity: 1, outerBorder: { distance: 0, strokeOpacity: 1 } } }
    const from = { ...graphic.attribute }
    const to = { strokeOpacity: 0, outerBorder: border }
    ripple.custom(1, from, to, {}, graphic)
    expect(graphic.attribute.strokeOpacity).toBe(0)
    expect(graphic.attribute.outerBorder).toMatchObject({ distance: 16, stroke: '#123456' })
    expect(graphic.attribute.outerBorder.strokeOpacity).toBeCloseTo(1e-8)
  })

  test('retains native mark identities through pie, column and dual-axis switches', async () => {
    const host = document.createElement('div')
    document.body.appendChild(host)
    const animation = { enable: true, params: { update: { enable: true, duration: 0 } } }
    const spec = (type: string) => ({ ...build(type, animation), width: 480, height: 300 })
    const chart = new VChart(spec('pie'), { dom: host })
    try {
      chart.renderSync()
      const firstKey = chart.getChart()!.getAllSeries()[0].getMarkInName('pie')!.getMarkConfig().morphKey
      await chart.updateSpec(spec('column'))
      const bar = chart.getChart()!.getAllSeries()[0].getMarkInName('bar')!
      expect(bar.getMarkConfig().morph).toBe(true)
      expect(bar.getMarkConfig().morphKey).toBe(firstKey)
      const dual = Builder.from({
        ...input('dualAxis'),
        measures: [
          { id: 'value', encoding: 'primaryYAxis' },
          { id: 'other', encoding: 'secondaryYAxis' },
        ],
        dataset: [
          { category: 'A', value: 10, other: 5 },
          { category: 'B', value: 20, other: 8 },
        ],
      } as VSeed).build<any>()
      await chart.updateSpec({ ...dual, width: 480, height: 300 })
      const keys = chart
        .getChart()!
        .getAllSeries()
        .flatMap((s) =>
          s
            .getMarks()
            .filter((m) => m.getMarkConfig().morph)
            .map((m) => m.getMarkConfig().morphKey),
        )
      expect(keys.length).toBeGreaterThan(1)
      expect(new Set(keys).size).toBe(keys.length)
    } finally {
      chart.release()
      host.remove()
    }
  })
})
