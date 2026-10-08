import type { ILineChartSpec, IScatterChartSpec } from '@visactor/vchart'
import type { Datum, VChartSpecPipe } from 'src/types'

export const pointStateDimensionHover: VChartSpecPipe = (spec) => {
  const point = (spec as ILineChartSpec).point || {}
  const result = {
    ...spec,
    // Keep dimension-hover points visible even when pointStyle hides ordinary points.
    activePoint: true,
    point: {
      ...point,
      state: {
        ...(point.state || {}),
        dimension_hover: {
          scaleX: 1.4,
          scaleY: 1.4,
          outerBorder: {
            lineWidth: 4,
            strokeOpacity: 0.25,
            distance: 2,
          },
        },
      },
    },
  } as ILineChartSpec
  return result
}

export const pointStateHover: VChartSpecPipe = (spec, context) => {
  const point = (spec as IScatterChartSpec).point || {}
  const { advancedVSeed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { unfoldInfo } = datasetReshapeInfo[0]
  const result = {
    ...spec,
    point: {
      ...point,
      state: {
        ...(point.state || {}),
        hover: {
          scaleX: 1.4,
          scaleY: 1.4,
          stroke: (datum: Datum, context: unknown) => {
            const field = unfoldInfo.encodingColorId
            const color = (context as any).seriesColor(datum[field] as string)
            return color
          },
          fillOpacity: 0.6,
          lineWidth: 1,
        },
      },
    },
  } as IScatterChartSpec
  return result
}
