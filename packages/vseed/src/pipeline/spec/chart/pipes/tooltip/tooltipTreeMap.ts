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

export const tooltipTreeMap: VChartSpecPipe = (spec, context) => {
  // Reuse common tooltip logic
  const result = commonTooltip()(spec, context)
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo, dimensions = [], encoding } = advancedVSeed
  const { foldInfo, unfoldInfo } = datasetReshapeInfo[0]

  if (result.tooltip) {
    if (!result.tooltip.mark) {
      result.tooltip.mark = {}
    }
    const formatterList = (encoding.hierarchy || []).map((id) => {
      const dim = dimensions.find((item) => item.id === id)
      return createFormatterByDimension(dim, advancedVSeed.locale)
    })

    result.tooltip.mark = {
      title: {
        visible: true,
        value: (val: any) => {
          return val?.datum
            ?.map((data: any, index: number) => {
              if (formatterList[index]) {
                return formatterList[index](data.name)
              }
              return data.name
            })
            .join(' / ')
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
    visible: (v: Datum) => {
      const { depth } = v
      const datum = v?.datum[depth] as Datum
      return !!datum[item.id]
    },
    hasShape: true,
    shapeType: 'rectRound',
    key: (v: Datum) => {
      const { depth } = v
      const datum = v?.datum[depth] as Datum
      if (item.alias || item.id) {
        return item.alias || item.id
      }
      return datum && (datum[item.id] as string)
    },
    value: (v: Datum) => {
      const { depth } = v
      const datum = v?.datum[depth] as Datum
      const formatter = createFormatterByDimension(item, locale)
      return datum ? formatter(datum[item.id] as string | number) : ''
    },
  }))

  const defaultContent = {
    visible: true,
    hasShape: true,
    shapeType: 'rectRound',
    key: (v: Datum) => {
      const { depth } = v
      const datum = v?.datum[depth] as Datum

      const { measureName } = foldInfo
      const { encodingColor: colorName } = unfoldInfo

      return (datum && (datum[measureName || colorName] as string)) || ''
    },
    value: (v: Datum) => {
      const { depth } = v
      const datum = v?.datum[depth] as Datum

      const { measureId, measureValue } = foldInfo

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
    visible: (datum?: Datum) => datum?.datum?.[datum.depth as number]?.[foldInfo.measureId] !== item.id,
    hasShape: true,
    shapeType: 'rectRound',
    key: item.alias || item.id,
    value: (v: Datum) => {
      const { depth } = v
      const datum = v?.datum[depth] as Datum

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
