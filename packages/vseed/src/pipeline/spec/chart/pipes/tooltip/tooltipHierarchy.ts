import type {
  Datum,
  FoldInfo,
  HierarchyDimension,
  HierarchyMeasure,
  Locale,
  UnfoldInfo,
  VChartSpecPipe,
} from 'src/types'
import { tooltip as commonTooltip } from './tooltip'
import { pipe, uniqueBy } from 'remeda'
import { createFormatterByDimension, createFormatterByMeasure, findMeasureById } from 'src/pipeline/utils'

export const tooltipHierarchy: VChartSpecPipe = (spec, context) => {
  // Reuse common tooltip logic
  const result = commonTooltip()(spec, context)
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo, dimensions = [], encoding } = advancedVSeed
  const { foldInfo, unfoldInfo } = datasetReshapeInfo[0]

  if (result.tooltip) {
    if (!result.tooltip.mark) {
      result.tooltip.mark = {}
    }

    result.tooltip.mark = {
      title: {
        visible: true,
        value: (val: any) => {
          return val?.datum?.map((data: any) => data.name).join(' / ')
        },
      },
      content: createMarkContent(
        encoding.tooltip || [],
        dimensions as HierarchyDimension[],
        vseed.measures as HierarchyMeasure[],
        foldInfo,
        unfoldInfo,
        advancedVSeed.locale,
      ),
    }
  }

  return result
}

const createMarkContent = (
  tooltip: string[],
  dimensions: HierarchyDimension[] = [],
  measures: HierarchyMeasure[] = [],
  foldInfo: FoldInfo,
  unfoldInfo: UnfoldInfo,
  locale?: Locale,
) => {
  const dims = pipe(
    dimensions.filter((item) => tooltip.includes(item.id)),
    uniqueBy((item: HierarchyDimension) => item.id),
  )
  const meas = pipe(
    measures.filter((item) => tooltip.includes(item.id)),
    uniqueBy((item: HierarchyMeasure) => item.id),
  )

  const dimContent = dims.map((item: HierarchyDimension) => ({
    visible: (datum?: Datum) => {
      return !!datum?.[item.id]
    },
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

  const meaContent = meas.map((item: HierarchyMeasure) => ({
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
      if (!datum) {
        return ''
      }
      const value = datum[id] as string | number
      const measure = findMeasureById(measures, id)
      const formatter = createFormatterByMeasure(measure)
      return formatter(value)
    },
  }))

  return [...dimContent, defaultContent, ...meaContent] as object[]
}
