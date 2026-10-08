import type { IAreaChartSpec } from '@visactor/vchart'
import { selector, selectorWithDynamicFilter } from 'src/dataSelector'
import type { Datum, LineStyle, VChartSpecPipe } from 'src/types'
import { cartesianCurve, closedCurve } from './curve'
import { compileMarkStyles } from './compileMarkStyles'

type LineNode = { renderNode: { context: { data: Datum[] } } }

const createLineStyle =
  (curve: typeof cartesianCurve): VChartSpecPipe =>
  (spec, { advancedVSeed }) => {
    const line = compileMarkStyles(
      advancedVSeed.markStyle.lineStyle as LineStyle | LineStyle[] | undefined,
      ({ lineColor, lineColorOpacity, lineSmooth, lineStyle, lineWidth = 2, lineVisible = true }) => ({
        visible: lineVisible,
        ...curve(lineSmooth),
        strokeOpacity: lineColorOpacity,
        stroke: lineColor,
        lineWidth,
        lineDash:
          lineStyle === 'dashed'
            ? [lineWidth * 2, lineWidth * 2]
            : lineStyle === 'dotted'
              ? [lineWidth / 2, lineWidth * 2]
              : [0, 0],
      }),
      (rule) => (_: Datum, node: LineNode) =>
        node.renderNode.context.data.some((datum) =>
          rule.dynamicFilter
            ? selectorWithDynamicFilter(datum, rule.dynamicFilter, rule.selector)
            : selector(datum, rule.selector),
        ),
    )
    return { ...spec, line } as IAreaChartSpec
  }

export const lineStyle = createLineStyle(cartesianCurve)
export const radarLineStyle = createLineStyle(closedCurve)
