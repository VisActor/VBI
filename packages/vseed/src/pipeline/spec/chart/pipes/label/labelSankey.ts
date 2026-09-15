import type { ILineChartSpec } from '@visactor/vchart'
import { isNumber, merge, uniqueBy } from 'remeda'
import { selector, selectorWithDynamicFilter } from 'src/dataSelector'
import { DATUM_HIDE_KEY, createFormatter, findMeasureById } from 'src/pipeline/utils'
import type { Datum, FoldInfo, SankeyMeasure, Label, NumFormat, VChartSpecPipe } from 'src/types'
import { generateMeasurePercent, generateMeasureValue } from './label'

export const labelSankey: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo, chartType, encoding } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { label?: Label }
  const foldInfo = datasetReshapeInfo[0].foldInfo as FoldInfo
  const label = baseConfig?.label

  if (!label) {
    return result as any
  }

  result.label = buildLabel(
    label,
    (vseed.measures || advancedVSeed.measures || []) as SankeyMeasure[],
    (advancedVSeed.measures || []) as SankeyMeasure[],
    (encoding.label || []) as string[],
    foldInfo,
  ) as unknown as ILineChartSpec['label']

  return result
}

const buildLabel = (
  label: Label,
  vseedMeasures: SankeyMeasure[],
  advancedVSeedMeasures: SankeyMeasure[],
  labelEncodingIds: string[],
  foldInfo: Pick<FoldInfo, 'measureId' | 'measureValue'> & Partial<Pick<FoldInfo, 'statistics'>>,
) => {
  const {
    enable,
    wrap,
    showValue,
    showValuePercent,
    showDimension,
    labelOverlap,
    labelColorSmartInvert,
    labelStroke,
    labelColor,
    labelFontSize,
    labelFontWeight,
    labelBackgroundColor,
    labelPosition,
    autoFormat,
    numFormat = {},
  } = label

  const labelMeasures = uniqueBy(
    vseedMeasures.filter((item) => labelEncodingIds.includes(item.id)),
    (item) => item.id,
  )

  const percentFormat: NumFormat = merge(numFormat, {
    type: 'percent',
  } as NumFormat)
  const percentFormatter = createFormatter(percentFormat)

  const result = {
    visible: enable,
    dataFilter: (data: Datum[]) => {
      return data.filter((entry) => {
        if (entry.data?.[DATUM_HIDE_KEY]) {
          return false
        }
        const shouldApply = label.dynamicFilter
          ? selectorWithDynamicFilter(entry.data as Datum, label.dynamicFilter, label.selector)
          : selector(entry.data as Datum, label.selector, 'Or')
        return shouldApply
      })
    },
    formatMethod: (_: unknown, datum: Datum) => {
      const parts: string[] = []
      const displayedMeasureIds = new Set<string>()

      if (showDimension && datum?.nodeName) {
        parts.push(String(datum.nodeName))
      }

      if (showValue) {
        const { measureId, measureValue } = foldInfo
        const measure = findMeasureById(advancedVSeedMeasures, datum[measureId] as string)
        if (measure && datum[measureValue] !== undefined && datum[measureValue] !== null) {
          parts.push(generateMeasureValue(datum[measureValue] as number | string, measure, autoFormat, numFormat))
          displayedMeasureIds.add(measure.id)
        } else if (datum.value !== undefined && datum.value !== null) {
          const fallbackMeasure =
            findMeasureById(advancedVSeedMeasures, foldInfo.measureId) ||
            findMeasureById(vseedMeasures, foldInfo.measureId) ||
            advancedVSeedMeasures[0]
          if (fallbackMeasure) {
            parts.push(generateMeasureValue(datum.value as number | string, fallbackMeasure, autoFormat, numFormat))
            displayedMeasureIds.add(fallbackMeasure.id)
          } else {
            parts.push(String(datum.value))
          }
        }
      }

      if (showValuePercent) {
        const ratioValue = datum['__VCHART_ARC_RATIO']
        if (isNumber(ratioValue)) {
          parts.push(generateMeasurePercent(ratioValue, 1, percentFormatter))
        } else if (
          foldInfo.statistics &&
          isNumber(foldInfo.statistics.sum) &&
          datum[foldInfo.measureValue] !== undefined &&
          datum[foldInfo.measureValue] !== null
        ) {
          parts.push(
            generateMeasurePercent(
              datum[foldInfo.measureValue] as number | string,
              foldInfo.statistics.sum,
              percentFormatter,
            ),
          )
        }
      }

      labelMeasures
        .filter((measure) => !displayedMeasureIds.has(measure.id))
        .forEach((measure) => {
          const rawValue = datum[measure.id]
          if (rawValue === undefined || rawValue === null || rawValue === '') {
            return
          }
          parts.push(generateMeasureValue(rawValue as number | string, measure, autoFormat, numFormat))
        })

      return wrap ? parts : parts.join(' ')
    },
    syncState: true,
    position: labelPosition,
    style: {
      stroke: labelStroke,
      fill: labelColor,
      fontSize: labelFontSize,
      fontWeight: labelFontWeight,
      background: labelBackgroundColor,
    },
    smartInvert: labelColorSmartInvert,
  }

  if (labelColorSmartInvert) {
    ;(result.style as any).lineWidth = 2
  }

  if (labelOverlap) {
    ;(result as any).overlap = {
      hideOnHit: true,
      clampForce: true,
    }
  }

  return result
}
