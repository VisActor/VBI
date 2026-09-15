import type { ILineChartSpec } from '@visactor/vchart'
import { createFormatter, createFormatterByDimension, findMeasureById } from '../../../../utils'
import type { Datum, Dimension, FoldInfo, Label, Measure, NumFormat, VChartSpecPipe } from 'src/types'
import { isNumber, merge, uniqueBy } from 'remeda'
import { MeasureId } from 'src/dataReshape/constant'
import { label as commonLabel, generateMeasurePercent, generateMeasureValue } from './label'

export const labelTreeMapLeaf: VChartSpecPipe = (spec, context) => {
  const result = commonLabel(spec, context) as ILineChartSpec
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { chartType, encoding } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { label: Label }
  const foldInfoList = [datasetReshapeInfo[0].foldInfo as FoldInfo]

  const { label } = baseConfig
  if (!label.enable) {
    return result
  }

  const { showValue, showValuePercent, showDimension, autoFormat, numFormat = {}, wrap } = label

  const hasDimLabelEncoding = vseed.dimensions?.some((item) => encoding.label?.includes(item.id))

  const labelDims = uniqueBy(
    hasDimLabelEncoding
      ? vseed.dimensions?.filter((item) => encoding.label?.includes(item.id)) || []
      : showDimension
        ? advancedVSeed.dimensions!.filter((d) => d.id !== MeasureId && d.encoding !== 'row' && d.encoding !== 'column')
        : [],
    (item: Dimension) => item.id,
  )

  const labelMeas = uniqueBy(
    vseed.measures?.filter((item) => encoding.label?.includes(item.id)) || [],
    (item: Measure) => item.id,
  )

  const percentFormat: NumFormat = merge(numFormat, {
    type: 'percent',
  } as NumFormat)

  const percentFormatter = createFormatter(percentFormat)

  if (result.label) {
    ;(result.label as any).formatMethod = (_: unknown, datum: Datum) => {
      // TreeMap returns a nested structure where `datum` is an array of children.
      // We need to find the specific data item that matches the current node's name.
      // The current node's name is usually available in the top-level datum object (which is `datum` here).
      // However, VChart's TreeMap datum structure is a bit complex.
      // Based on the user provided example:
      // datum: { name: "Stapler", datum: [...], ... }
      const nodeName = datum.value
      const dataArray = datum.datum as any[]

      if (!dataArray || !Array.isArray(dataArray)) {
        return ''
      }

      // Helper to find the matching data node recursively
      const findDataNode = (nodes: any[], value: string): any => {
        for (const node of nodes) {
          if (node.value === value) {
            return node
          }
          if (node.children) {
            const found = findDataNode(node.children, value)
            if (found) return found
          }
        }
        return null
      }

      // The structure seems to be that `datum` (the array) contains the root(s) of the hierarchy relevant to this node?
      // Or simply the data array we passed in.
      // Let's try to find the node with the matching name.
      const realDatum = findDataNode(dataArray, nodeName as string)

      if (!realDatum) {
        return ''
      }

      const resultText: string[] = []
      const displayedMeasureIds = new Set<string>()

      // 1. Dimension Labels
      const dimLabels = labelDims
        .map((item: Dimension) => {
          const id = item.id
          const rawValue = (realDatum[id] ?? realDatum.__OriginalData__?.[id]) as number | string
          const formatter = createFormatterByDimension(item, advancedVSeed.locale)
          return formatter(rawValue)
        })
        .filter((v) => v !== undefined && v !== null && v !== '')

      resultText.push(...(dimLabels as string[]))

      // Value and Percent (default/implicit)
      foldInfoList.forEach((foldInfo) => {
        const { measureId, measureValue, statistics } = foldInfo
        // The measure ID might be in __MeaId__ or we look it up from the datum
        const currentMeasureId = (realDatum[measureId] ?? realDatum.__MeaId__) as string
        const measure = findMeasureById(advancedVSeed.measures!, currentMeasureId)

        if (measure) {
          const val = (realDatum[measureValue] ?? realDatum.__MeaValue__ ?? realDatum.value) as number | string

          const measureValueLabel = generateMeasureValue(val, measure, autoFormat, numFormat)

          if (showValue) {
            resultText.push(measureValueLabel)
            displayedMeasureIds.add(measure.id)
          }
          if (showValuePercent) {
            // For TreeMap, percentage usually implies % of parent or total.
            // If we have statistics.sum (total), we can calculate it.
            if (statistics && isNumber(statistics.sum)) {
              resultText.push(generateMeasurePercent(val, statistics.sum, percentFormatter))
            }
          }
        }
      })

      // Append explicit fields not already displayed by the default value.
      const meaLabels = labelMeas
        .filter((item) => !displayedMeasureIds.has(item.id))
        .map((item: Measure) =>
          generateMeasureValue(
            (realDatum[item.id] ?? realDatum.__OriginalData__?.[item.id]) as number | string,
            item,
            autoFormat,
            numFormat,
          ),
        )
      resultText.push(...meaLabels)

      if (wrap) {
        return resultText
      }
      return resultText.join(' ')
    }
  }

  return result
}
