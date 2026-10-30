import type { Dimension, Measure } from '@visactor/vseed'
import { DimensionsBuilder, MeasuresBuilder } from 'src/chart-builder/features'
import type { VBIChartSeedBuilder } from 'src/types'
import { query } from './query'
import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from './types'

export const buildVSeedDSL: VBIChartSeedBuilder<DefaultVBIQueryDSL, DefaultVBISeedDSL> = async (context) => {
  const { vbiDSL, builder } = context
  const queryResult = await (builder.adapters?.query ?? query)(context)
  const measures = vbiDSL.measures
    .filter((measure) => MeasuresBuilder.isMeasureNode(measure))
    .map<Measure>((measure) => {
      const nextMeasure: Measure = {
        id: measure.id,
        alias: measure.alias,
      }

      if (measure.encoding) {
        nextMeasure.encoding = measure.encoding
      }

      if (measure.format) {
        if ('autoFormat' in measure.format && measure.format.autoFormat === true) {
          nextMeasure.autoFormat = true
        } else {
          nextMeasure.autoFormat = false
          nextMeasure.numFormat = Object.fromEntries(
            Object.entries(measure.format).filter(([key]) => key !== 'autoFormat'),
          )
        }
      }

      return nextMeasure
    })
  measures.push(...(vbiDSL.calculations ?? []).map(({ id, alias }) => ({ id, alias })))
  const dimensions = vbiDSL.dimensions
    .filter((dimension) => DimensionsBuilder.isDimensionNode(dimension))
    .map<Dimension>((dimension) => {
      const nextDimension: Dimension = {
        id: dimension.id,
        alias: dimension.alias,
      }

      if (dimension.encoding) {
        nextDimension.encoding = dimension.encoding
      }

      return nextDimension
    })

  return {
    chartType: vbiDSL.chartType,
    dataset: queryResult.dataset,
    dimensions,
    measures,
    theme: vbiDSL.theme,
    locale: vbiDSL.locale,
  } as DefaultVBISeedDSL
}
