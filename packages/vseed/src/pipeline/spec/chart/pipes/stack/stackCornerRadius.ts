import type { IBarChartSpec } from '@visactor/vchart'
import { normalizePadding } from '@visactor/vutils'
import type { VChartSpecPipe, StackCornerRadius, BarStyle } from 'src/types'
import { selector, selectorWithDynamicFilter } from 'src/dataSelector'
import { createBarCornerRadius, createStackCornerRadius, hasMoveInAnimation } from './stackCornerRadiusUtils'

const hasBarMoveInAnimation = (spec: IBarChartSpec): boolean => {
  return [spec.animationAppear, spec.animationNormal, spec.animationEnter, spec.animationUpdate].some(
    hasMoveInAnimation,
  )
}

export const stackCornerRadius: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const stackCornerRadius = (advancedVSeed.config?.[chartType as 'column']?.stackCornerRadius ?? 0) as StackCornerRadius

  if (!hasBarMoveInAnimation(spec as IBarChartSpec)) {
    const styles = advancedVSeed.markStyle?.barStyle
    const rules = ((Array.isArray(styles) ? styles : styles ? [styles] : []) as BarStyle[])
      .filter((rule) => rule.barRadius != null)
      .reverse()
    const defaultRadius = createStackCornerRadius(stackCornerRadius)
    // Preserve the stroke bounds without rounding more than an explicit per-bar corner.
    const clipRadius: typeof defaultRadius = rules.length
      ? (attributes, datum) => {
          const radius = defaultRadius(attributes, datum)
          const rule = rules.find((rule) =>
            rule.dynamicFilter
              ? selectorWithDynamicFilter(datum, rule.dynamicFilter, rule.selector)
              : selector(datum, rule.selector),
          )
          if (!rule) return radius
          const barRadius = normalizePadding(rule.barRadius!)
          return normalizePadding(radius).map((corner, index) => Math.min(corner, barRadius[index]))
        }
      : defaultRadius
    return { ...spec, stackCornerRadius: clipRadius } as IBarChartSpec
  }

  // A final-position clip would cut off moveIn before it reaches the bar bounds.
  return {
    ...spec,
    bar: {
      ...(spec as IBarChartSpec).bar,
      style: {
        ...(spec as IBarChartSpec).bar?.style,
        cornerRadius: createBarCornerRadius(stackCornerRadius),
      },
    },
  } as IBarChartSpec
}
