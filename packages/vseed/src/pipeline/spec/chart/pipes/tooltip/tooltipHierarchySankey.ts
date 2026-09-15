import { pipe, uniqueBy } from 'remeda'
import { createFormatterByDimension, createFormatterByMeasure, findMeasureById } from 'src/pipeline/utils'
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
import { getHierarchySankeyNodesFromSpec } from '../dataset/datasetHierarchySankey'

export const tooltipHierarchySankey: VChartSpecPipe = (spec, context) => {
  const result = commonTooltip()(spec, context)
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo, dimensions = [], encoding, dataset = [] } = advancedVSeed
  const { foldInfo, unfoldInfo } = datasetReshapeInfo[0]
  const hierarchyDataset = getHierarchySankeyNodesFromSpec(result as Record<string, any>, dataset as Datum[])

  if (result.tooltip) {
    result.tooltip.mark = {
      title: {
        visible: true,
        value: (value: unknown) =>
          createTitle(value, dimensions as HierarchyDimension[], hierarchyDataset, advancedVSeed.locale),
      },
      content: createMarkContent(
        encoding.tooltip || [],
        dimensions as HierarchyDimension[],
        vseed.measures as HierarchyMeasure[],
        hierarchyDataset,
        foldInfo,
        unfoldInfo,
        advancedVSeed.locale,
      ),
    }
  }

  return result
}

type NodeMeta = {
  datum: Datum
  depth: number
}

const flattenHierarchyNodes = (nodes: Datum[] = [], depth = 0): NodeMeta[] => {
  return nodes.flatMap((node) => [
    { datum: node, depth },
    ...flattenHierarchyNodes((node.children as Datum[]) || [], depth + 1),
  ])
}

const createNodeMetaMap = (dataset: Datum[] = []) => {
  return flattenHierarchyNodes(dataset).reduce(
    (prev, item) => {
      const key = String(item.datum.key ?? '')
      if (key) {
        prev[key] = item
      }
      return prev
    },
    {} as Record<string, NodeMeta>,
  )
}

const isLinkDatum = (value: unknown): boolean => {
  const datum = value as Datum
  return !!datum && datum.source !== undefined && datum.target !== undefined
}

const getHierarchyPath = (value: unknown): Datum[] => {
  const datum = value as Datum
  if (!datum) {
    return []
  }

  if (Array.isArray(datum.datum)) {
    return datum.datum as Datum[]
  }

  if (datum.datum && Array.isArray((datum.datum as Datum).datum)) {
    return (datum.datum as Datum).datum as Datum[]
  }

  if (datum.datum && typeof datum.datum === 'object') {
    return [datum.datum as Datum]
  }

  return [datum]
}

const getHierarchyDatum = (value: unknown): Datum | undefined => {
  const path = getHierarchyPath(value)
  if (!path.length) {
    return undefined
  }

  const datum = value as Datum
  if (typeof datum?.depth === 'number' && path[datum.depth]) {
    return path[datum.depth] as Datum
  }

  return path[path.length - 1] as Datum
}

const createTitle = (value: unknown, dimensions: HierarchyDimension[] = [], dataset: Datum[] = [], locale?: Locale) => {
  if (isLinkDatum(value)) {
    const nodeMetaMap = createNodeMetaMap(dataset)
    const datum = value as Datum
    const source = nodeMetaMap[String(datum.source ?? '')]?.datum
    const target = nodeMetaMap[String(datum.target ?? '')]?.datum

    return [source?.name, target?.name].filter(Boolean).join(' -> ')
  }

  const path = getHierarchyPath(value)
  if (!path.length) {
    return ''
  }

  return path
    .map((item, index) => {
      const dim = dimensions[index]
      const formatter = createFormatterByDimension(dim, locale)
      return formatter(String(item?.name ?? ''))
    })
    .join(' / ')
}

const createMarkContent = (
  tooltip: string[],
  dimensions: HierarchyDimension[] = [],
  measures: HierarchyMeasure[] = [],
  dataset: Datum[] = [],
  foldInfo: FoldInfo,
  _unfoldInfo: UnfoldInfo,
  locale?: Locale,
) => {
  const nodeMetaMap = createNodeMetaMap(dataset)
  const dims = pipe(
    dimensions.filter((item) => tooltip.includes(item.id)),
    uniqueBy((item: HierarchyDimension) => item.id),
  )
  const meas = pipe(
    measures.filter((item) => tooltip.includes(item.id)),
    uniqueBy((item: HierarchyMeasure) => item.id),
  )

  const dimContent = dims.map((item: HierarchyDimension) => ({
    visible: (value: unknown) => {
      if (isLinkDatum(value)) {
        return false
      }
      const datum = getHierarchyDatum(value)
      return datum?.[item.id] !== undefined && datum?.[item.id] !== null
    },
    hasShape: true,
    shapeType: 'rectRound',
    key: item.alias || item.id,
    value: (value: unknown) => {
      const datum = getHierarchyDatum(value)
      const formatter = createFormatterByDimension(item, locale)
      return datum ? formatter(datum[item.id] as string | number) : ''
    },
  }))

  const measureContent = meas.map((item: HierarchyMeasure) => ({
    visible: (value: unknown) => !isLinkDatum(value),
    hasShape: true,
    shapeType: 'rectRound',
    key: item.alias || item.id,
    value: (value: unknown) => {
      const datum = getHierarchyDatum(value)
      if (!datum) {
        return ''
      }

      const measure = findMeasureById(measures, item.id)
      const formatter = createFormatterByMeasure(measure)
      const measureValue = (datum[item.id] ?? datum[foldInfo.measureValue]) as string | number
      return formatter(measureValue)
    },
  }))

  const linkDimensionContent = dims.map((item: HierarchyDimension) => ({
    visible: (value: unknown) => {
      if (!isLinkDatum(value)) {
        return false
      }

      const datum = value as Datum
      const sourceMeta = nodeMetaMap[String(datum.source ?? '')]
      const targetMeta = nodeMetaMap[String(datum.target ?? '')]
      return sourceMeta?.datum?.[item.id] !== undefined || targetMeta?.datum?.[item.id] !== undefined
    },
    hasShape: true,
    shapeType: 'rectRound',
    key: item.alias || item.id,
    value: (value: unknown) => {
      const datum = value as Datum
      const sourceMeta = nodeMetaMap[String(datum.source ?? '')]
      const targetMeta = nodeMetaMap[String(datum.target ?? '')]

      const matchedNode =
        sourceMeta?.depth !== undefined && dimensions[sourceMeta.depth]?.id === item.id
          ? sourceMeta.datum
          : targetMeta?.depth !== undefined && dimensions[targetMeta.depth]?.id === item.id
            ? targetMeta.datum
            : sourceMeta?.datum?.[item.id] !== undefined
              ? sourceMeta.datum
              : targetMeta?.datum

      const formatter = createFormatterByDimension(item, locale)
      const rawValue = matchedNode?.[item.id] ?? matchedNode?.name
      return rawValue !== undefined && rawValue !== null ? formatter(rawValue as string | number) : ''
    },
  }))

  const linkMeasureContent = meas.map((item: HierarchyMeasure) => ({
    visible: (value: unknown) => isLinkDatum(value),
    hasShape: true,
    shapeType: 'rectRound',
    key: item.alias || item.id,
    value: (value: unknown) => {
      const datum = value as Datum
      const measure = findMeasureById(measures, item.id)
      const formatter = createFormatterByMeasure(measure)
      const measureValue = (datum[item.id] ?? datum[foldInfo.measureValue] ?? datum.value) as string | number
      return formatter(measureValue)
    },
  }))

  return [...dimContent, ...linkDimensionContent, ...measureContent, ...linkMeasureContent]
}
