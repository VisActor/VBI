import type { Datum } from 'src/types'
import type { GradientDirection } from './gradientFill'

/** Locate zero and the value endpoint within the bar, including stacked segments. */
const endpoints = (datum: Datum, valueField: string): [number, number] => {
  const start = Number(datum.__VCHART_STACK_START ?? 0)
  const end = Number(datum.__VCHART_STACK_END ?? datum[valueField])
  const length = Math.abs(end - start)
  if (!length) return [0, 1]
  const min = Math.min(start, end)
  return [(0 - min) / length, (end - min) / length]
}

export const horizontalBarGradient = (datum: Datum, valueField: string): GradientDirection => {
  const [x0, x1] = endpoints(datum, valueField)
  return { x0, y0: 0, x1, y1: 0 }
}

export const verticalBarGradient = (datum: Datum, valueField: string): GradientDirection => {
  const [start, end] = endpoints(datum, valueField)
  return { x0: 0, y0: 1 - start, x1: 0, y1: 1 - end }
}
