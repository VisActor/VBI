import { FoldMeasureId } from 'src/dataReshape/constant'
import type { Datum, StackCornerRadius } from 'src/types'

export type StackCornerRadiusCallback = (_: unknown, datum: Datum) => StackCornerRadius | 0

const reverseStackCornerRadius = (cornerRadius: StackCornerRadius): StackCornerRadius => {
  if (!Array.isArray(cornerRadius)) {
    return cornerRadius
  }

  const [topLeft = 0, topRight = 0, bottomRight = 0, bottomLeft = 0] = cornerRadius

  return [bottomRight, bottomLeft, topLeft, topRight]
}

const mergeStackCornerRadius = (cornerRadius: StackCornerRadius): StackCornerRadius => {
  if (!Array.isArray(cornerRadius)) {
    return cornerRadius
  }

  const [topLeft = 0, topRight = 0, bottomRight = 0, bottomLeft = 0] = cornerRadius

  return [
    Math.max(topLeft, bottomRight),
    Math.max(topRight, bottomLeft),
    Math.max(bottomRight, topLeft),
    Math.max(bottomLeft, topRight),
  ]
}

const getStackRangeCornerRadius = (
  cornerRadius: StackCornerRadius,
  datum: Datum,
): StackCornerRadius | 0 | undefined => {
  const stackStart = datum?.['__VCHART_STACK_START']
  const stackEnd = datum?.['__VCHART_STACK_END']

  if (typeof stackStart !== 'number' || typeof stackEnd !== 'number') {
    return undefined
  }

  const hasPositivePart = stackStart > 0 || stackEnd > 0
  const hasNegativePart = stackStart < 0 || stackEnd < 0

  if (hasPositivePart && hasNegativePart) {
    return mergeStackCornerRadius(cornerRadius)
  }

  if (hasPositivePart) {
    return cornerRadius
  }

  if (hasNegativePart) {
    return reverseStackCornerRadius(cornerRadius)
  }

  return 0
}

type CornerRadiusCallbacks = {
  bar: (datum: Datum) => StackCornerRadius | 0
  stack: StackCornerRadiusCallback
}

const callbacks = new Map<string, CornerRadiusCallbacks>()

const createCornerRadius = (radius: StackCornerRadius): CornerRadiusCallbacks => {
  const key = JSON.stringify(radius)
  const cached = callbacks.get(key)
  if (cached) return cached
  const cornerRadius = Array.isArray(radius) ? [...radius] : radius
  const bar: CornerRadiusCallbacks['bar'] = (datum) => {
    const stackRangeCornerRadius = getStackRangeCornerRadius(cornerRadius, datum)

    if (stackRangeCornerRadius !== undefined) {
      return stackRangeCornerRadius
    }

    const value = datum?.[datum?.[FoldMeasureId]]

    if (value > 0) {
      return cornerRadius
    }

    if (value < 0) {
      return reverseStackCornerRadius(cornerRadius)
    }

    return 0
  }
  const result = { bar, stack: (_: unknown, datum: Datum) => bar(datum) }
  if (callbacks.size === 64) callbacks.delete(callbacks.keys().next().value!)
  callbacks.set(key, result)
  return result
}

export const createStackCornerRadius = (radius: StackCornerRadius): StackCornerRadiusCallback =>
  createCornerRadius(radius).stack

export const createBarCornerRadius = (radius: StackCornerRadius): CornerRadiusCallbacks['bar'] =>
  createCornerRadius(radius).bar

export const hasMoveInAnimation = (animation: unknown): boolean => {
  if (!animation) {
    return false
  }

  if (Array.isArray(animation)) {
    return animation.some(hasMoveInAnimation)
  }

  if (typeof animation !== 'object') {
    return false
  }

  const animationRecord = animation as Record<string, unknown>

  return animationRecord.type === 'moveIn' || Object.values(animationRecord).some(hasMoveInAnimation)
}
