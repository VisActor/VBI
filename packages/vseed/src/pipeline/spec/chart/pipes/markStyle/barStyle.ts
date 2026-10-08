import type { IBarChartSpec } from '@visactor/vchart'
import { selector, selectorWithDynamicFilter } from 'src/dataSelector'
import type { BarStyle, Datum, VChartSpecPipe } from 'src/types'
import { compileMarkStyles } from './compileMarkStyles'
import { createGradientFill } from './gradientFill'
import { getColorField } from '../color/colorAdapter'
import { horizontalBarGradient, verticalBarGradient } from './barGradient'

const createBarStyle =
  (field: 'xField' | 'yField', direction: typeof horizontalBarGradient): VChartSpecPipe =>
  (spec, { advancedVSeed, vseed }) => {
    const colorField = getColorField(advancedVSeed, vseed)
    const gradientDirection = (datum: Datum) => direction(datum, (spec as IBarChartSpec)[field] as string)
    const bar = compileMarkStyles(
      advancedVSeed.markStyle.barStyle as BarStyle | BarStyle[] | undefined,
      ({
        barBorderColor,
        barBorderStyle,
        barBorderWidth = 1,
        barColor,
        barGradient,
        barColorOpacity,
        barBorderOpacity,
        barRadius,
        barVisible = true,
      }) => ({
        visible: barVisible,
        fill: createGradientFill(barColor, barGradient, colorField, gradientDirection),
        fillOpacity: barColorOpacity,
        cornerRadius: barRadius,
        lineWidth: barBorderWidth,
        stroke: barBorderColor,
        strokeOpacity: barBorderOpacity,
        lineDash: barBorderStyle === 'dashed' ? [5, 2] : barBorderStyle === 'dotted' ? [2, 5] : [0, 0],
      }),
      (rule) => (datum: Datum) =>
        rule.dynamicFilter
          ? selectorWithDynamicFilter(datum, rule.dynamicFilter, rule.selector)
          : selector(datum, rule.selector),
    )
    return {
      ...spec,
      bar: {
        style: {
          visible: true,
          fillOpacity: 1,
          lineWidth: advancedVSeed.dataset.length <= 100 ? 1 : 0,
          ...(spec as IBarChartSpec).bar?.style,
          ...bar.style,
        },
        state: { ...(spec as IBarChartSpec).bar?.state, hover: { fillOpacity: 0.6 }, ...bar.state },
      },
    } as IBarChartSpec
  }

export const barStyle = createBarStyle('xField', horizontalBarGradient)
export const columnStyle = createBarStyle('yField', verticalBarGradient)
