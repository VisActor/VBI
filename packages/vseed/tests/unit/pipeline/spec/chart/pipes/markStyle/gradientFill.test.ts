import { createGradientFill } from 'src/pipeline/spec/chart/pipes/markStyle/gradientFill'
import { horizontalBarGradient, verticalBarGradient } from 'src/pipeline/spec/chart/pipes/markStyle/barGradient'
import { zAreaStyle } from 'src/types/properties/markStyle/zAreaStyle'
import { zBarStyle } from 'src/types/properties/markStyle/zBarStyle'

test('areas fade from transparent at the bottom to their color at the top, preserving alpha', () => {
  expect(createGradientFill('rgba(255,0,0,0.5)', true, 'series')).toEqual({
    gradient: 'linear',
    x0: 0,
    y0: 1,
    x1: 0,
    y1: 0,
    stops: [
      { offset: 0, color: 'rgba(255, 0, 0, 0)' },
      { offset: 1, color: 'rgba(255,0,0,0.5)' },
    ],
  })
})

test.each([undefined, false])('disabled gradient %s preserves explicit and inherited solid colors', (enabled) => {
  expect(createGradientFill('pink', enabled, 'series')).toBe('pink')
  expect(createGradientFill(undefined, enabled, 'series')).toBeUndefined()
})

test.each([true, false, undefined])('schemas accept boolean switches %s', (enabled) => {
  expect(zAreaStyle.safeParse({ areaGradient: enabled }).success).toBe(true)
  expect(zBarStyle.safeParse({ barGradient: enabled }).success).toBe(true)
})

test.each([{}, { stops: [{ offset: 0 }, { offset: 1 }] }, 'true', 1])(
  'schemas reject non-boolean gradients %j',
  (value) => {
    expect(zAreaStyle.safeParse({ areaGradient: value }).success).toBe(false)
    expect(zBarStyle.safeParse({ barGradient: value }).success).toBe(false)
  },
)

test.each([
  [{ value: 10 }, [0, 1]],
  [{ value: -10 }, [1, 0]],
  [{ value: 0 }, [0, 1]],
  [{ __VCHART_STACK_START: 10, __VCHART_STACK_END: 20 }, [-1, 1]],
  [{ __VCHART_STACK_START: -10, __VCHART_STACK_END: -20 }, [2, 0]],
  [{ __VCHART_STACK_START: 10, __VCHART_STACK_END: 10 }, [0, 1]],
])('bar direction starts at zero for %j', (datum, [start, end]) => {
  const horizontal = horizontalBarGradient(datum, 'value')
  const vertical = verticalBarGradient(datum, 'value')
  expect(horizontal.x0).toBeCloseTo(start)
  expect(horizontal.x1).toBeCloseTo(end)
  expect([horizontal.y0, horizontal.y1]).toEqual([0, 0])
  expect(vertical.y0).toBeCloseTo(1 - start)
  expect(vertical.y1).toBeCloseTo(1 - end)
  expect([vertical.x0, vertical.x1]).toEqual([0, 0])
})
