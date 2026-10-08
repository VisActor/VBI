import { barCornerRadius } from 'src/pipeline/spec/chart/pipes/stack/barCornerRadius'
import { createBarCornerRadius, createStackCornerRadius } from 'src/pipeline/spec/chart/pipes/stack/stackCornerRadiusUtils'
import { Builder, registerAll, registerCustomTheme } from 'src/builder'
import { zVSeed } from 'src/types/zVseed'
import type { AdvancedVSeed, SpecPipelineContext, VSeed } from 'src/types'
import dualAxis from '../../../../../../examples/chartType/dualAxis/basic.json'

const families = ['column', 'bar', 'columnParallel', 'barParallel', 'columnPercent', 'barPercent', 'raceBar', 'raceColumn', 'histogram'] as const
const seed = (options: object = {}): VSeed => ({
  chartType: 'column',
  dataset: [{ category: 'A', series: 'East', value: 10 }, { category: 'A', series: 'West', value: 20 }],
  dimensions: [{ id: 'category' }, { id: 'series' }],
  measures: [{ id: 'value' }],
  ...options,
}) as VSeed

const context = (config?: object): SpecPipelineContext => ({
  advancedVSeed: { config: config ? { column: config } : {} } as AdvancedVSeed,
  vseed: { chartType: 'column' } as VSeed,
}) as SpecPipelineContext

beforeAll(registerAll)

describe('bar corner modes', () => {
  test('an explicit false overrides a stack-enabled custom theme and radius arrays replace scalar theme values', () => {
    registerCustomTheme('boolean-stack-radius', ({ lightTheme }) => ({
      ...lightTheme,
      config: { ...lightTheme.config, column: { ...lightTheme.config?.column, cornerRadius: 12, stackCornerRadius: true } },
    }))
    const native = Builder.from(seed({ theme: 'boolean-stack-radius', stackCornerRadius: false })).build<any>()
    expect(native.stackCornerRadius).toBeUndefined()
    expect(native.bar.style.cornerRadius({ __MeaId__: 'value', value: 10 })).toBe(12)
    const stack = Builder.from(seed({ theme: 'boolean-stack-radius', cornerRadius: [6, 7, 0, 0] })).build<any>()
    expect(stack.stackCornerRadius(null, { __MeaId__: 'value', value: 10 })).toEqual([6, 7, 0, 0])
  })

  test('selecting a corner mode preserves existing mark attributes from preceding pipes', () => {
    for (const stackCornerRadius of [false, true]) {
      const spec = barCornerRadius({ bar: { interactive: false, style: { fillOpacity: 0.3 } } }, context({ cornerRadius: 6, stackCornerRadius })) as any
      expect(spec.bar.interactive).toBe(false)
      expect(spec.bar.style.fillOpacity).toBe(0.3)
      if (stackCornerRadius) expect(spec.stackCornerRadius(null, { __MeaId__: 'value', value: 10 })).toBe(6)
      else expect(spec.bar.style.cornerRadius({ __MeaId__: 'value', value: 10 })).toBe(6)
    }
  })

  test.each(families)('%s rejects numeric and array stack modes in serialized DSL', (chartType) => {
    for (const stackCornerRadius of [0, 4, [], [4, 4, 0, 0]]) {
      expect(zVSeed.safeParse(seed({ chartType, stackCornerRadius })).success).toBe(false)
    }
    for (const stackCornerRadius of [false, true]) {
      expect(zVSeed.safeParse(seed({ chartType, cornerRadius: 4, stackCornerRadius })).success).toBe(true)
    }
  })

  test('stack mode uses the themed radius when no explicit value is provided', () => {
    const spec = Builder.from(seed({ stackCornerRadius: true })).build<any>()
    expect(spec.stackCornerRadius(null, { __VCHART_STACK_START: 0, __VCHART_STACK_END: 10 })).toEqual([4, 4, 0, 0])
    expect(spec.bar.style.cornerRadius).toBe(0)
  })

  test.each([0, [], [0, 0, 0, 0]])('enabled stack mode retains the requested straight outline %j', (cornerRadius) => {
    const spec = Builder.from(seed({ cornerRadius, stackCornerRadius: true })).build<any>()
    expect(spec.stackCornerRadius(null, { __VCHART_STACK_START: 0, __VCHART_STACK_END: 10 })).toEqual(cornerRadius)
    expect(spec.bar.style.cornerRadius).toBe(0)
  })

  test('dual-axis bar series support both corner modes without affecting line series', () => {
    for (const stackCornerRadius of [undefined, false, true]) {
      const dsl = zVSeed.parse({ ...dualAxis.vseed, cornerRadius: 6, stackCornerRadius })
      const spec = Builder.from(dsl as VSeed).build<any>()
      const bar = spec.series.find((series: any) => series.type === 'bar')
      const line = spec.series.find((series: any) => series.type === 'line')
      expect(line.bar).toBeUndefined()
      expect(line.stackCornerRadius).toBeUndefined()
      if (stackCornerRadius) {
        expect(bar.bar.style.cornerRadius).toBe(0)
        expect(bar.stackCornerRadius(null, { __MeaId__: 'value', value: 10 })).toBe(6)
      } else {
        expect(bar.stackCornerRadius).toBeUndefined()
        expect(bar.bar.style.cornerRadius({ __MeaId__: 'value', value: 10 })).toBe(6)
      }
    }
  })

  test.each(['column', 'bar', 'columnParallel', 'barParallel', 'columnPercent', 'barPercent', 'histogram'] as const)('%s pivot cells retain the selected corner mode', (chartType) => {
    for (const stackCornerRadius of [undefined, false, true]) {
      const spec = Builder.from(seed({
        chartType,
        dimensions: [{ id: 'category', encoding: 'row' }, { id: 'series', encoding: 'color' }],
        cornerRadius: 6,
        stackCornerRadius,
      })).build<any>()
      const chart = spec.indicators[0].chartSpec
      if (stackCornerRadius) {
        expect(chart.bar.style.cornerRadius).toBe(0)
        expect(chart.stackCornerRadius(null, { __MeaId__: 'value', value: 10 })).toBe(6)
      } else {
        expect(chart.stackCornerRadius).toBeUndefined()
        expect(chart.bar.style.cornerRadius({ __MeaId__: 'value', value: 10 })).toBe(6)
      }
    }
  })

  test.each(families)('%s accepts and forwards both DSL radius fields', (chartType) => {
    const dsl = seed({ chartType, cornerRadius: [7, 7, 0, 0], stackCornerRadius: true })
    const parsed = zVSeed.parse(JSON.parse(JSON.stringify(dsl)))
    expect(parsed).toMatchObject({ cornerRadius: [7, 7, 0, 0], stackCornerRadius: true })
    const spec = Builder.from(parsed as VSeed).build<any>()
    expect(spec.bar.style.cornerRadius).toBe(0)
    expect(spec.stackCornerRadius(null, { __VCHART_STACK_START: 0, __VCHART_STACK_END: 30 })).toEqual([7, 7, 0, 0])
  })

  test.each(families)('%s defaults to per-mark corners in both themes', (chartType) => {
    for (const theme of ['light', 'dark']) {
      const dsl = seed({ chartType, theme })
      expect(zVSeed.parse(dsl).stackCornerRadius).toBeUndefined()
      expect(Builder.from(dsl).buildAdvanced()?.config?.[chartType]?.stackCornerRadius).toBe(false)
      const spec = Builder.from(dsl).build<any>()
      const radius = chartType.startsWith('bar') || chartType === 'raceBar' ? [0, 4, 4, 0] : [4, 4, 0, 0]
      expect(spec.stackCornerRadius).toBeUndefined()
      expect(spec.bar.style.cornerRadius({ __MeaId__: 'value', value: 10 })).toEqual(radius)
    }
  })

  test.each([undefined, false, null])('stack mode %j disables group clipping and retains native corners', (stackCornerRadius) => {
    const spec = Builder.from(seed({ cornerRadius: 6, stackCornerRadius })).build<any>()
    expect(spec.stackCornerRadius).toBeUndefined()
    expect(spec.bar.style.cornerRadius({ __MeaId__: 'value', value: -10 })).toBe(6)
  })

  test('missing config and zero native radius generate no group clip', () => {
    for (const config of [undefined, { cornerRadius: 0 }]) {
      const spec = barCornerRadius({}, context(config)) as any
      expect(spec.stackCornerRadius).toBeUndefined()
      expect(spec.bar.style.cornerRadius({ __MeaId__: 'value', value: 10 })).toBe(0)
    }
  })

  test('native corners preserve per-bar global and conditional overrides', () => {
    const spec = Builder.from(seed({ cornerRadius: 10, barStyle: [{ barRadius: 3 }, { selector: { series: 'West' }, barRadius: 0, barColor: 'red' }] })).build<any>()
    expect(spec.stackCornerRadius).toBeUndefined()
    expect(spec.bar.style.cornerRadius).toBe(3)
    expect(spec.bar.state.custom2.style.cornerRadius).toBe(0)
    expect(spec.bar.state.custom2.filter({ series: 'West' })).toBe(true)
  })

  test('explicit group radius takes priority over native and conditional corners, including moveIn', () => {
    const spec = Builder.from(seed({
      cornerRadius: 12,
      stackCornerRadius: true,
      barStyle: [{ barRadius: 30 }, { selector: { series: 'West' }, barRadius: 0, barColor: 'red' }],
      animation: { enable: true, params: { update: { enable: true, effects: ['moveIn'] } } },
    })).build<any>()
    expect(spec.stackCornerRadius(null, { __VCHART_STACK_START: 0, __VCHART_STACK_END: 30 })).toBe(12)
    expect(spec.bar.style.cornerRadius).toBe(0)
    expect(spec.bar.state.custom2.style.cornerRadius).toBe(0)
    expect(spec.bar.state.custom2.style.fill).toBe('red')
    expect(spec.animationUpdate.bar.type).toBe('moveIn')
  })

  test('explicit group radius also overrides dynamic per-mark corners', () => {
    const spec = Builder.from(seed({ cornerRadius: 6, stackCornerRadius: true, barStyle: {
      barRadius: 20,
      dynamicFilter: { type: 'row-with-field', code: '', result: { success: true, data: [{ __row_index: 0, field: 'value' }] } },
    } })).build<any>()
    expect(spec.bar.state.custom1.style.cornerRadius).toBe(0)
    expect(spec.stackCornerRadius(null, { __MeaId__: 'value', value: 10 })).toBe(6)
  })

  test('native and group callbacks handle asymmetric positive, negative, crossing and zero values', () => {
    const radius = [1, 2, 3, 4]
    const bar = createBarCornerRadius(radius)
    expect(bar({ __MeaId__: 'value', value: 10 })).toEqual(radius)
    expect(bar({ __MeaId__: 'value', value: -10 })).toEqual([3, 4, 1, 2])
    expect(bar({ __MeaId__: 'value', value: 0 })).toBe(0)
    expect(bar({})).toBe(0)
    const stack = createStackCornerRadius(radius)
    expect(stack(null, { __VCHART_STACK_START: 0, __VCHART_STACK_END: 10 })).toEqual(radius)
    expect(stack(null, { __VCHART_STACK_START: -10, __VCHART_STACK_END: 0 })).toEqual([3, 4, 1, 2])
    expect(stack(null, { __VCHART_STACK_START: -10, __VCHART_STACK_END: 10 })).toEqual([3, 4, 3, 4])
    expect(stack(null, { __VCHART_STACK_START: 0, __VCHART_STACK_END: 0 })).toBe(0)
    expect(createStackCornerRadius(4)(null, { __VCHART_STACK_START: -1, __VCHART_STACK_END: 1 })).toBe(4)
    expect(createStackCornerRadius([])(null, { __VCHART_STACK_START: -1, __VCHART_STACK_END: 1 })).toEqual([0, 0, 0, 0])
    expect(createStackCornerRadius([])(null, { __VCHART_STACK_START: -1, __VCHART_STACK_END: 0 })).toEqual([0, 0, 0, 0])
  })

  test('callbacks are stable across updateSpec builds and snapshot mutable inputs', () => {
    const radius = [7, 7, 0, 0]
    const callback = createStackCornerRadius(radius)
    expect(createStackCornerRadius([...radius])).toBe(callback)
    expect(createBarCornerRadius(radius)).toBe(createBarCornerRadius([...radius]))
    radius[0] = 99
    expect(callback(null, { __MeaId__: 'value', value: 10 })).toEqual([7, 7, 0, 0])
    for (let value = 100; value < 165; value++) createStackCornerRadius(value)
    expect(createStackCornerRadius([7, 7, 0, 0])).not.toBe(callback)
  })
})
