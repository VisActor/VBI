import { stackCornerRadius } from 'src/pipeline/spec/chart/pipes/stack/stackCornerRadius'
import { createStackCornerRadius } from 'src/pipeline/spec/chart/pipes/stack/stackCornerRadiusUtils'
import { Builder, registerAll } from 'src/builder'
import type { AdvancedVSeed, SpecPipelineContext, VSeed } from 'src/types'

const createContext = (chartType = 'column'): SpecPipelineContext =>
  ({
    advancedVSeed: {
      config: {
        [chartType]: { stackCornerRadius: [4, 4, 0, 0] },
      },
    } as unknown as AdvancedVSeed,
    vseed: {
      chartType,
    } as unknown as VSeed,
  }) as SpecPipelineContext

describe('stackCornerRadius pipe', () => {
  beforeAll(registerAll)

  it('reuses callbacks by value without retaining mutable input arrays', () => {
    const radius = [7, 7, 0, 0]
    const callback = createStackCornerRadius(radius)
    expect(createStackCornerRadius([...radius])).toBe(callback)
    radius[0] = 99
    expect(callback(null, { __VCHART_STACK_START: 0, __VCHART_STACK_END: 10 })).toEqual([7, 7, 0, 0])
    expect(callback(null, { __VCHART_STACK_START: -10, __VCHART_STACK_END: 10 })).toEqual([7, 7, 7, 7])
    expect(callback(null, { __VCHART_STACK_START: 0, __VCHART_STACK_END: 0 })).toBe(0)
    expect(createStackCornerRadius(4)(null, { __VCHART_STACK_START: -10, __VCHART_STACK_END: 0 })).toBe(4)
    for (let radius = 100; radius < 165; radius++) createStackCornerRadius(radius)
    expect(createStackCornerRadius([7, 7, 0, 0])).not.toBe(callback)
  })

  it.each([0, 4, [4, 4, 4, 4]])('explicit per-bar corners %j retain the stroke clip', (barRadius) => {
    const spec = Builder.from({
      chartType: 'column',
      dataset: [{ category: 'A', value: 10 }],
      dimensions: [{ id: 'category' }],
      measures: [{ id: 'value' }],
      barStyle: { barRadius },
    }).build<any>()
    expect(spec.stackCornerRadius(null, { __VCHART_STACK_START: 0, __VCHART_STACK_END: 10 })).toEqual(
      barRadius === 0 ? [0, 0, 0, 0] : [4, 4, 0, 0],
    )
    expect(spec.bar.style.cornerRadius).toEqual(barRadius)
  })

  it('conditional per-bar corners preserve the default outline on unmatched bars', () => {
    const dsl = {
      chartType: 'column' as const,
      dataset: [
        { category: 'A', series: 'East', value: -10 },
        { category: 'A', series: 'West', value: 20 },
      ],
      dimensions: [{ id: 'category' }, { id: 'series' }],
      measures: [{ id: 'value' }],
    }
    expect(Builder.from({ ...dsl, barStyle: { barColor: 'red' } }).build<any>().stackCornerRadius).toBeTypeOf(
      'function',
    )
    const spec = Builder.from({ ...dsl, barStyle: { selector: { value: -10 }, barRadius: 5 } }).build<any>()
    expect(spec.stackCornerRadius(null, { value: -10, __VCHART_STACK_START: -10, __VCHART_STACK_END: 0 })).toEqual([
      0, 0, 4, 4,
    ])
    expect(spec.stackCornerRadius(null, { value: 20, __VCHART_STACK_START: 0, __VCHART_STACK_END: 20 })).toEqual([
      4, 4, 0, 0,
    ])
    expect(spec.bar.state.custom1.style.cornerRadius).toBe(5)
  })

  it('dynamic corner rules preserve the default outline when they do not match', () => {
    const context = createContext()
    context.advancedVSeed.markStyle = {
      barStyle: {
        barRadius: 0,
        dynamicFilter: {
          type: 'row-with-field',
          code: '',
          result: { success: true, data: [{ __row_index: 0, field: 'value' }] },
        },
      },
    }
    const spec = stackCornerRadius({}, context) as any
    expect(spec.stackCornerRadius(null, { __row_index: 0, __MeaId__: 'value', value: 10 })).toEqual([0, 0, 0, 0])
    expect(spec.stackCornerRadius(null, { __row_index: 1, __VCHART_STACK_START: 0, __VCHART_STACK_END: 10 })).toEqual([
      4, 4, 0, 0,
    ])
  })

  it('still clips strokes when no radius is configured', () => {
    const context = createContext()
    context.advancedVSeed.config = {}
    const spec = stackCornerRadius({}, context) as any
    expect(spec.stackCornerRadius(null, { __VCHART_STACK_START: 0, __VCHART_STACK_END: 10 })).toBe(0)
  })

  it('honors asymmetric corners and the last matching radius rule', () => {
    const context = createContext()
    context.advancedVSeed.markStyle = {
      barStyle: [{ barRadius: [0, 8, 8, 0] }, { selector: { value: 10 }, barRadius: 2 }],
    }
    const spec = stackCornerRadius({}, context) as any
    expect(spec.stackCornerRadius(null, { value: 10, __VCHART_STACK_START: 0, __VCHART_STACK_END: 10 })).toEqual([
      2, 2, 0, 0,
    ])
    expect(spec.stackCornerRadius(null, { value: -10, __VCHART_STACK_START: -10, __VCHART_STACK_END: 0 })).toEqual([
      0, 0, 4, 0,
    ])
  })
  it('should use root stackCornerRadius when no moveIn animation exists', () => {
    const result = stackCornerRadius({}, createContext()) as any

    expect(typeof result.stackCornerRadius).toBe('function')
    expect(result.bar?.style?.cornerRadius).toBeUndefined()
  })

  it('should put cornerRadius on bar mark when moveIn animation exists', () => {
    const spec = {
      animationNormal: {
        bar: [{ type: 'moveIn' }],
      },
    }
    const result = stackCornerRadius(spec, createContext()) as any

    expect(result.stackCornerRadius).toBeUndefined()
    expect(typeof result.bar.style.cornerRadius).toBe('function')
    expect(result.bar.style.cornerRadius({ __VCHART_STACK_START: 0, __VCHART_STACK_END: 10 })).toEqual([4, 4, 0, 0])
  })

  it('should reverse negative stack corners in the moveIn fallback', () => {
    const spec = {
      animationUpdate: {
        bar: { type: 'moveIn' },
      },
    }
    const result = stackCornerRadius(spec, createContext()) as any

    expect(result.bar.style.cornerRadius({ __VCHART_STACK_START: -10, __VCHART_STACK_END: 0 })).toEqual([0, 0, 4, 4])
  })
})
