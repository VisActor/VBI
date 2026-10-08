import type { IAreaChartSpec } from '@visactor/vchart'
import { selector, selectorWithDynamicFilter } from 'src/dataSelector'
import type { Datum, PointStyle, VChartSpecPipe } from 'src/types'
import { compileMarkStyles } from './compileMarkStyles'

export const pointStyle: VChartSpecPipe = (spec, { advancedVSeed }) => {
  const point = compileMarkStyles(
    advancedVSeed.markStyle.pointStyle as PointStyle | PointStyle[] | undefined,
    ({
      pointBorderColor,
      pointBorderStyle,
      pointBorderWidth = 1,
      pointColor,
      pointColorOpacity,
      pointSize,
      pointVisible = true,
    }) => ({
      visible: pointVisible,
      size: pointSize,
      fill: pointColor,
      fillOpacity: pointColorOpacity,
      innerBorder: {
        stroke: pointBorderColor,
        lineWidth: pointBorderWidth,
        distance: pointBorderWidth / 2,
        lineDash: pointBorderStyle === 'dashed' ? [5, 2] : pointBorderStyle === 'dotted' ? [2, 5] : [0, 0],
      },
    }),
    (rule) => (datum: Datum) =>
      rule.dynamicFilter
        ? selectorWithDynamicFilter(datum, rule.dynamicFilter, rule.selector)
        : selector(datum, rule.selector),
  )
  // A globally hidden ordinary mark need not be created. Its activePoint retains the style.
  if (!Object.keys(point.state).length) {
    const { visible, ...style } = point.style
    return { ...spec, point: { visible, style, state: point.state } } as IAreaChartSpec
  }
  return { ...spec, point } as IAreaChartSpec
}
