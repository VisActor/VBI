import type { ILineChartSpec } from '@visactor/vchart'
import {
  createFormatter,
  createFormatterByDimension,
  createFormatterByMeasure,
  DATUM_HIDE_KEY,
  findMeasureById,
} from '../../../../utils'
import type {
  Datum,
  Dimension,
  Dimensions,
  Encoding,
  FoldInfo,
  Formatter,
  Label,
  Locale,
  Measure,
  Measures,
  NumFormat,
  VChartSpecPipe,
} from 'src/types'
import { isNumber, merge, uniqueBy } from 'remeda'
import { selector, selectorWithDynamicFilter } from 'src/dataSelector'
import { MeasureId } from 'src/dataReshape/constant'

export const label: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { chartType, encoding } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { label: Label }
  const foldInfo = datasetReshapeInfo[0].foldInfo as FoldInfo

  const { label } = baseConfig
  result.label = buildLabel(
    label,
    vseed.measures,
    vseed.dimensions,
    advancedVSeed.dimensions!,
    advancedVSeed.measures!,
    encoding as Encoding,
    [foldInfo],
  ) as unknown as ILineChartSpec['label']

  return result
}

export const generateMeasureValue = (
  value: number | string,
  measure: Measure,
  labelAutoFormat?: boolean,
  numFormat: NumFormat = {},
) => {
  const format = merge(numFormat, measure.numFormat || measure.format)
  const mergedMeasure = { ...measure, numFormat: format, autoFormat: labelAutoFormat || measure.autoFormat }

  const formatter = createFormatterByMeasure(mergedMeasure)
  return formatter(value)
}

export const generateMeasurePercent = (value: number | string, sum: number, formatter: Formatter) => {
  if (value === undefined || value === null) return String(value)
  const num = Number(value)
  if (Number.isNaN(num)) return String(value)

  const percentValue = num / sum
  return formatter(percentValue)
}

export const buildLabel = (
  label: Label,
  vseedMeasures: Measures = [],
  vseedDimensions: Dimensions = [],
  advancedVSeedDimensions: Dimensions,
  advancedVSeedMeasures: Measures,
  encoding: Encoding,
  foldInfoList: (Pick<FoldInfo, 'measureId' | 'measureValue'> & Partial<Pick<FoldInfo, 'statistics'>>)[],
  locale: Locale = 'zh-CN',
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

  const hasDimLabelEncoding = vseedDimensions.some((item) => encoding.label?.includes(item.id))

  const labelDims = uniqueBy(
    hasDimLabelEncoding
      ? vseedDimensions.filter((item) => encoding.label?.includes(item.id))
      : showDimension
        ? advancedVSeedDimensions.filter((d) => d.id !== MeasureId && d.encoding !== 'row' && d.encoding !== 'column')
        : [],
    (item: Dimension) => item.id,
  )

  const labelMeas = uniqueBy(
    vseedMeasures.filter((item) => encoding.label?.includes(item.id)),
    (item: Measure) => item.id,
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
      const result = []
      const displayedMeasureIds = new Set<string>()

      const dimLabels = labelDims.map((item: Dimension) => {
        const id = item.id
        const formatter = createFormatterByDimension(item, locale)
        return formatter(datum[id] as number | string)
      })

      result.push(...dimLabels)

      uniqueBy(foldInfoList, (info) => datum[info.measureId]).forEach((foldInfo) => {
        const { measureId, measureValue, statistics } = foldInfo
        const measure = findMeasureById(advancedVSeedMeasures, datum[measureId] as string)
        if (measure) {
          const measureValueLabel = generateMeasureValue(
            datum[measureValue] as number | string,
            measure,
            autoFormat,
            numFormat,
          )

          if (showValue) {
            result.push(measureValueLabel)
            displayedMeasureIds.add(measure.id)
          }
          if (showValuePercent) {
            if (isNumber(datum['__VCHART_ARC_RATIO'])) {
              // 饼图/环图需要使用实际占比数据
              result.push(generateMeasurePercent(datum['__VCHART_ARC_RATIO'], 1, percentFormatter))
            } else if (statistics && isNumber(statistics.sum)) {
              result.push(
                generateMeasurePercent(datum[measureValue] as number | string, statistics.sum, percentFormatter),
              )
            }
          }
        }
      })

      const meaLabels = labelMeas
        .filter((item) => !displayedMeasureIds.has(item.id))
        .map((item: Measure) => generateMeasureValue(datum[item.id] as number | string, item, autoFormat, numFormat))

      result.push(...meaLabels)

      if (wrap) {
        return result
      }
      return result.join(' ')
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
    ;(result.style as any).lineWidth = 2 // label 边框线宽度，不设置这个会导致智能反色失败
  }

  if (labelOverlap) {
    ;(result as any).overlap = {
      hideOnHit: true,
      clampForce: true,
    }
  }

  return result
}
