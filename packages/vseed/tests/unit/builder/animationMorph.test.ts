import { Builder, registerAll, registerCustomTheme } from 'src/builder'
import { animationMorph } from 'src/pipeline/spec/chart/pipes/animation/animationMorph'
import { zVSeed, type VSeed } from 'src/types'

beforeAll(registerAll)

const dataset = [
  { area: 'A-B', category: 'C', value: 10, other: 3 },
  { area: 'A', category: 'B-C', value: 20, other: 6 },
  { area: '', category: 0, value: 15, other: 4 },
  { area: '0', category: '', value: 8, other: 2 },
]
const input = (chartType: string): VSeed => ({
  chartType,
  dimensions: [{ id: 'area' }, { id: 'category' }],
  measures: [{ id: 'value' }],
  dataset,
}) as VSeed
const keys = (spec: any) => spec.data.values.map((row: any) => row[spec.morph.morphElementKey])

test.each(['column', 'bar', 'pie', 'donut', 'heatmap', 'radar', 'line', 'area', 'rose', 'scatter'])(
  '%s pairs full dimensional groups independently of encoding, order and values', (chartType) => {
    const spec = Builder.from(input(chartType)).build<any>()
    const expected = dataset.map(({ area, category }) => JSON.stringify([['area', area], ['category', category]]))
    expect(keys(spec)).toEqual(expected.map(key => chartType === 'radar' ? 'radar:' + key : key))
    expect(new Set(keys(spec)).size).toBe(dataset.length)
    expect(spec.morph.morphKey).toBeUndefined()
    expect(spec.dataKey).toBeUndefined()
    const reordered = Builder.from({
      ...input(chartType),
      dimensions: [{ id: 'category' }, { id: 'area' }],
      dataset: dataset.toReversed().map(row => ({ ...row, value: row.value * 2 })),
    } as VSeed).build<any>()
    expect(keys(reordered)).toEqual(expected.toReversed().map(key => chartType === 'radar' ? 'radar:' + key : key))
  },
)

test('dual-axis measures keep native split/merge grouping without mutating source data', () => {
  const seed = { ...input('dualAxis'), measures: [
    { id: 'value', encoding: 'primaryYAxis' },
    { id: 'other', encoding: 'secondaryYAxis' },
  ] } as VSeed
  const before = structuredClone(seed)
  const spec = Builder.from(seed).build<any>()
  const column = Builder.from({ ...seed, chartType: 'column' } as VSeed).build<any>()
  expect(new Set(keys(column)).size).toBe(dataset.length)
  expect(keys(column).length).toBe(dataset.length * 2)
  for (const series of spec.series) {
    expect(new Set(keys(series))).toEqual(new Set(keys(column)))
    expect(series.morph.morphKey).toBeUndefined()
  }
  expect(seed).toEqual(before)
})

test('zero dimensions form a stable group without rescanning data in the animation pipe', () => {
  const built = Builder.from({ chartType: 'column', dimensions: [], measures: [{ id: 'value' }], dataset: [{ value: 1 }, { value: 2 }] } as VSeed).build<any>()
  expect(new Set(keys(built))).toEqual(new Set(['[]']))
  const values = new Proxy([], { get() { throw Error('animation must not inspect rows') } })
  const data = { id: 'data', values }
  const spec = animationMorph({ data }, { advancedVSeed: { chartType: 'column', config: { column: {} } } } as any)
  expect(spec.data).toBe(data)
  expect((spec.data as any).values).toBe(values)
})

test('radar default avoids group clipping but explicit radial effects remain authoritative', () => {
  const spec = Builder.from(input('radar')).build<any>()
  expect(spec.animationAppear.preset).toBe('fadeIn')
  const authored = Builder.from({ ...input('radar'), animation: {
    params: { appear: { enable: true, effects: ['radial'], duration: 500 } },
  } } as VSeed).build<any>()
  expect(authored.animationAppear).toMatchObject({ preset: 'clipIn', duration: 500 })
})

test.each(['pie', 'donut'])('%s avoids degenerate arc paths without removing negative or zero data', (chartType) => {
  for (const values of [[10, -2, 0], [0, 0, 0], [-2, -3, -4]]) {
    const seed = { ...input(chartType), dataset: values.map((value, i) => ({ area: 'A', category: String(i), value })) } as VSeed
    const spec = Builder.from(seed).build<any>()
    expect(spec.morph.enable).toBe(false)
    expect(spec.data.values.map((row: any) => row.value)).toEqual(values)
    expect(spec.animationAppear).toMatchObject({ preset: 'fadeIn', duration: 1000 })
    const disabled = Builder.from({ ...seed, animation: { enable: false } } as VSeed).build<any>()
    expect(disabled.animation).toBe(false)
    const authored = Builder.from({ ...seed, animation: { params: {
      appear: { enable: true, effects: ['radial'], duration: 400 },
    } } } as VSeed).build<any>()
    expect(authored.animationAppear.preset).toBeUndefined()
    expect(authored.animationAppear.pie).toMatchObject({ type: 'growAngleIn', duration: 400 })
    const off = Builder.from({ ...seed, animation: { params: { appear: { enable: false } } } } as VSeed).build<any>()
    expect(off.animationAppear).toBe(false)
  }
})

const morphFamilies = ['column', 'columnParallel', 'columnPercent', 'bar', 'barParallel', 'barPercent',
  'line', 'area', 'areaPercent', 'scatter', 'pie', 'donut', 'rose', 'roseParallel', 'radar', 'heatmap', 'dualAxis']
test.each(morphFamilies)('%s exposes an opt-out independent of normal animation phases', (chartType) => {
  for (const morph of [undefined, true, false]) {
    const seed = { ...input(chartType), animation: { morph } } as VSeed
    expect(zVSeed.parse(seed).animation.morph).toBe(morph)
    expect(zVSeed.safeParse({ ...seed, animation: { morph: 'false' } }).success).toBe(false)
    const spec = Builder.from(seed).build<any>()
    const items = spec.series ?? [spec]
    for (const item of items) {
      expect(item.morph.enable).toBe(morph !== false)
      expect(item.animation).not.toBe(false)
      expect(item.animationAppear).not.toBe(false)
      expect(item.animationUpdate).not.toBe(false)
    }
    expect(seed.animation).toEqual({ morph })
  }
  const off = Builder.from({ ...input(chartType), animation: { enable: false, morph: true } } as VSeed).build<any>()
  for (const item of off.series ?? [off]) expect(item.animation).toBe(false)
})


test.each(morphFamilies)('%s resolves morph defaults from the theme with explicit DSL precedence', (chartType) => {
  for (const mode of ['light', 'dark'] as const) {
    const base = { ...input(chartType), theme: mode } as VSeed
    expect(Builder.from(base).buildAdvanced()!.config[chartType].animation.morph).toBe(true)
    const name = `morph-theme-${mode}-${chartType}`
    registerCustomTheme(name, (themes) => {
      const inherited = mode === 'light' ? themes.lightTheme : themes.darkTheme
      return { ...inherited, config: { ...inherited.config, [chartType]: {
        ...inherited.config![chartType], animation: { morph: false },
      } } }
    })
    for (const animation of [undefined, { morph: undefined }, { params: { update: { enable: true, duration: 300 } } }, { morph: true }]) {
      const spec = Builder.from({ ...base, theme: name, animation } as VSeed).build<any>()
      for (const series of spec.series ?? [spec]) {
        expect(series.morph.enable).toBe(animation?.morph === true)
        expect(series.animation).not.toBe(false)
      }
    }
    // One chart's explicit override must not mutate a registered theme or built-in defaults.
    expect(Builder.from({ ...base, theme: name }).buildAdvanced()!.config[chartType].animation.morph).toBe(false)
    expect(Builder.from(base).buildAdvanced()!.config[chartType].animation.morph).toBe(true)
  }
})
