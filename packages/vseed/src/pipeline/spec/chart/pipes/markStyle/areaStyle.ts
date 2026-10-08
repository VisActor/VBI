import type { IAreaChartSpec } from '@visactor/vchart'
import { selector, selectorWithDynamicFilter } from 'src/dataSelector'
import type { AreaStyle, Datum, LineStyle, VChartSpecPipe } from 'src/types'
import { groupBy, pick } from 'remeda'
import { cartesianCurve, closedCurve } from './curve'
import { compileMarkStyles } from './compileMarkStyles'
import { createGradientFill } from './gradientFill'
import { getColorField } from '../color/colorAdapter'

const createAreaStyle =
  (curve: typeof cartesianCurve): VChartSpecPipe =>
  (spec, { advancedVSeed, vseed }) => {
    const { markStyle, datasetReshapeInfo, dataset } = advancedVSeed
    const { areaStyle, lineStyle } = markStyle
    const lineStyles = (Array.isArray(lineStyle) ? lineStyle : [lineStyle]) as (LineStyle | undefined)[]
    const baseCurve = { ...curve(), ...pick((spec as IAreaChartSpec).line?.style ?? {}, ['curveType', 'curveTension']) }
    const group = datasetReshapeInfo[0].unfoldInfo.encodingColorId ?? ''
    const colorField = getColorField(advancedVSeed, vseed)
    let groups: Record<string, Datum[]> | undefined
    const area = compileMarkStyles(
      (areaStyle ?? {}) as AreaStyle | AreaStyle[],
      (style, index) => ({
        ...(areaStyle && lineStyles[index] ? curve(lineStyles[index].lineSmooth) : baseCurve),
        visible: style.areaVisible ?? true,
        fill: createGradientFill(style.areaColor, style.areaGradient, colorField),
        fillOpacity: style.areaColorOpacity,
      }),
      (rule) => {
        groups ??= groupBy(dataset, (datum) => datum[group] as string)
        const areaGroups = groups
        return (datum: Datum) =>
          (areaGroups[datum[group] as string] ?? []).some((entry) =>
            rule.dynamicFilter
              ? selectorWithDynamicFilter(entry, rule.dynamicFilter, rule.selector)
              : selector(entry, rule.selector),
          )
      },
    )
    return { ...spec, area: { visible: true, ...area } } as IAreaChartSpec
  }

export const areaStyle = createAreaStyle(cartesianCurve)
export const radarAreaStyle = createAreaStyle(closedCurve)
