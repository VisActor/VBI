import tinycolor from 'tinycolor2'
import type { Datum } from 'src/types'

export type GradientDirection = { x0: number; y0: number; x1: number; y1: number }
const bottomToTop: GradientDirection = { x0: 0, y0: 1, x1: 0, y1: 0 }

const gradientFill = (color: string, direction: GradientDirection) => ({
  gradient: 'linear' as const,
  ...direction,
  stops: [
    { offset: 0, color: tinycolor(color).setAlpha(0).toRgbString() },
    { offset: 1, color },
  ],
})

export const createGradientFill = (
  color: string | undefined,
  enabled: boolean | undefined,
  colorField: string,
  direction: GradientDirection | ((datum: Datum) => GradientDirection) = bottomToTop,
) => {
  if (!enabled) return color
  if (color && typeof direction !== 'function') return gradientFill(color, direction)
  return (datum: Datum, context: { globalScale: (id: string, value: unknown) => string }) =>
    gradientFill(
      color ?? context.globalScale('color', datum[colorField]),
      typeof direction === 'function' ? direction(datum) : direction,
    )
}
