import { pipe, unique, uniqueBy } from 'remeda'
import { Separator } from 'src/dataReshape'
import { createFormatterByDimension, createFormatterByMeasure, findMeasureById } from '../../../../utils'
import type {
  Datum,
  Dimensions,
  FoldInfo,
  Measures,
  VChartSpecPipe,
  TooltipConfig,
  UnfoldInfo,
  Dimension,
  Measure,
  Locale,
  Encoding,
} from 'src/types'
import { MeasureId, MeasureName, ORIGINAL_DATA } from 'src/dataReshape'
import { getTooltipStyle } from './tooltipStyle'
import { updateTooltipElement } from './tooltipElement'

export const tooltip =
  (tooltipOptions?: { titleEncoding?: keyof Encoding }): VChartSpecPipe =>
  (spec, context) => {
    const result = { ...spec }
    if (!context) {
      return result
    }
    const { advancedVSeed, vseed } = context
    const {
      measures = [],
      datasetReshapeInfo,
      chartType,
      dimensions = [],
      encoding,
      reshapeMeasures = [],
    } = advancedVSeed
    const baseConfig = advancedVSeed.config?.[chartType as 'line'] as { tooltip: TooltipConfig }
    const { tooltip = { enable: true } } = baseConfig ?? {}
    const { enable = true } = tooltip
    const { foldInfo, unfoldInfo } = datasetReshapeInfo[0] as unknown as {
      foldInfo: FoldInfo
      unfoldInfo: UnfoldInfo
    }
    const { titleEncoding } = tooltipOptions || {}

    result.tooltip = {
      style: getTooltipStyle(tooltip),
      visible: !!enable,
      group: {
        title: {
          visible: false,
        },
      },
      mark: {
        title: {
          visible: false,
        },
        content: createMarkContent(
          encoding.tooltip || [],
          dimensions,
          vseed.measures as Measures,
          foldInfo,
          unfoldInfo,
          advancedVSeed.locale,
        ),
      },
      dimension: {
        title: {
          visible: true,
          value: titleEncoding
            ? (datum?: Datum) => {
                if (!datum) {
                  return ''
                }
                const dimIds = encoding[titleEncoding] || []
                const formatted = dimIds.map((id) => {
                  const dim = dimensions.find((item) => item.id === id)
                  if (!dim) {
                    return datum?.[id] as string
                  }
                  const formatter = createFormatterByDimension(dim, advancedVSeed.locale)
                  return formatter(datum?.[id] as string | number)
                })
                return formatted.join(Separator)
              }
            : undefined,
        },
        content: createDimensionContent(
          encoding.tooltip || [],
          encoding.color || [],
          measures,
          foldInfo,
          unfoldInfo,
          reshapeMeasures.length > 1,
        ),
      },

      updateElement: updateTooltipElement,
    }
    return result
  }

export const createDimensionContent = (
  tooltips: string[],
  colors: string[],
  measures: Measures = [],
  foldInfo: FoldInfo,
  unfoldInfo: UnfoldInfo,
  hasMultiMeasureGroup: boolean,
) => {
  const { measureId, measureValue, foldMap } = foldInfo
  const { encodingColor } = unfoldInfo

  const hasMeasureTooltip = tooltips.some((d) => measures.find((item) => item.id === d))
  const hasMeasureIdInColor = colors.some((d) =>
    measures.find((item) => item.id === d || d === MeasureId || d === MeasureName),
  )
  return [
    {
      visible: true,
      shapeType: 'rectRound',
      hasShape: true,
      key: !hasMeasureTooltip
        ? (v: unknown) => {
            const datum = v as Datum
            const colorId = datum?.[encodingColor]
            const colorAlias = unfoldInfo.colorIdMap?.[colorId]?.alias ?? colorId

            // 指标组合场景, 保证的 Tooltip 中包含指标.
            if (hasMultiMeasureGroup) {
              // 图例 Color 内已有指标, 则无需添加指标, 避免重复
              if (hasMeasureIdInColor) {
                return colorAlias
              }
              // 指标需添加到 Tooltip 中.
              const meaAlias = (datum && (datum[MeasureName] as string)) || ''
              return unique([colorAlias, meaAlias]).join('-')
            }

            return colorAlias
          }
        : (v: unknown) => {
            const datum = v as Datum
            const key = (datum && (datum[measureId] as string)) || ''
            return foldMap[key] ?? key
          },
      value: (v: unknown) => {
        const datum = v as Datum
        if (!datum) {
          return ''
        }
        const value = datum[measureValue] as string | number
        const id = datum[measureId] as string
        const measure = findMeasureById(measures, id)
        const formatter = createFormatterByMeasure(measure)
        return formatter(value)
      },
    },
  ]
}

export const createMarkContent = (
  tooltip: string[],
  dimensions: Dimensions = [],
  measures: Measures = [],
  foldInfo: FoldInfo,
  unfoldInfo: UnfoldInfo,
  locale?: Locale,
) => {
  const dims = pipe(
    dimensions.filter((item) => tooltip.includes(item.id)),
    uniqueBy((item: Dimension) => item.id),
  )
  const meas = pipe(
    measures.filter((item) => tooltip.includes(item.id)),
    uniqueBy((item: Measure) => item.id),
  )

  const dimContent = dims.map((item: Dimension) => ({
    visible: true,
    hasShape: true,
    shapeType: 'rectRound',
    key: (v: unknown) => {
      const datum = v as Datum
      if (item.alias || item.id) {
        return item.alias || item.id
      }
      return datum && (datum[item.id] as string)
    },
    value: (v: unknown) => {
      const datum = v as Datum
      const formatter = createFormatterByDimension(item, locale)
      return datum ? formatter(datum[item.id] as string | number) : ''
    },
  }))

  const meaContent = meas.map((item: Measure) => ({
    visible: (datum?: Datum) => datum?.[foldInfo.measureId] !== item.id,
    hasShape: true,
    shapeType: 'rectRound',
    key: item.alias || item.id,
    value: (v: unknown) => {
      const datum = v as Datum
      if (!datum) {
        return ''
      }
      const id = item.id
      if (!datum || !datum[ORIGINAL_DATA] || !datum[ORIGINAL_DATA]) {
        return ''
      }
      const originalData = datum[ORIGINAL_DATA] as Datum
      const value = originalData[id] as string | number
      const measure = findMeasureById(measures, id)
      const formatter = createFormatterByMeasure(measure)
      return formatter(value)
    },
  }))

  const defaultContent = {
    visible: true,
    hasShape: true,
    shapeType: 'rectRound',
    key: (v: unknown) => {
      const { measureName } = foldInfo
      const { encodingColor: colorName } = unfoldInfo

      const datum = v as Datum
      return (datum && (datum[measureName || colorName] as string)) || ''
    },
    value: (v: unknown) => {
      const { measureId, measureValue } = foldInfo

      const datum = v as Datum
      if (!datum) {
        return ''
      }
      const value = datum[measureValue] as string | number
      const id = datum[measureId] as string
      const measure = findMeasureById(measures, id)
      if (!measure) {
        return String(value)
      }

      const formatter = createFormatterByMeasure(measure)
      return formatter(value)
    },
  }

  return [...dimContent, defaultContent, ...meaContent]
}
