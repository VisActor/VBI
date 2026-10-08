import { merge } from '@visactor/vutils'
import type { ChartDynamicFilter, Selector, Selectors } from 'src/types'

type StyleRule = { selector?: Selector | Selectors; dynamicFilter?: ChartDynamicFilter }
const always = () => true

/** Keep leading global rules in the base style; subsequent states retain array order. */
export const compileMarkStyles = <Rule extends StyleRule, Style extends object, Args extends unknown[]>(
  rules: Rule | Rule[] | undefined,
  toStyle: (rule: Rule, index: number) => Style,
  toFilter: (rule: Rule) => (...args: Args) => boolean,
) => {
  const style: Partial<Style> = {}
  const state: Record<string, { level: number; filter: (...args: Args) => boolean; style: Style }> = {}
  let conditional = false
  const items = Array.isArray(rules) ? rules : rules ? [rules] : []

  items.forEach((rule, index) => {
    const attributes = toStyle(rule, index)
    const filtered = rule.selector != null || rule.dynamicFilter != null
    conditional ||= filtered
    if (!conditional) {
      merge(style, attributes)
    } else {
      state[`custom${index + 1}`] = {
        level: index + 1,
        filter: filtered ? toFilter(rule) : always,
        style: attributes,
      }
    }
  })

  return { style, state }
}
