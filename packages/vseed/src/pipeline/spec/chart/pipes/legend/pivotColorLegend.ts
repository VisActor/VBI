import type { PivotChartConstructorOptions } from '@visactor/vtable'
import type { Color, Legend, PivotChartSpecPipe } from 'src/types'

export const pivotColorLegend: PivotChartSpecPipe = (spec, context) => {
  const result = { ...spec } as PivotChartConstructorOptions
  const { advancedVSeed } = context
  const { chartType } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { legend?: Legend; color?: Color }

  if (!baseConfig || !baseConfig.legend || !baseConfig.color) {
    return result
  }

  if (baseConfig.legend.enable === false) {
    return { ...result, legends: [] }
  }

  const { datasetReshapeInfo } = advancedVSeed
  const max = Math.max(...datasetReshapeInfo.map((d) => d.foldInfo.statistics.colorMax))
  const min = Math.min(...datasetReshapeInfo.map((d) => d.foldInfo.statistics.colorMin))
  const { legend, color } = baseConfig
  const { colorScheme, linearColorScheme } = color

  const {
    enable,
    position = 'bottom',
    labelFontColor,
    labelColor,
    labelFontSize = 12,
    labelFontWeight = 400,
  } = legend || {}

  const orient = ['bottom', 'bottomLeft', 'bottomRight', 'bl', 'br'].includes(position)
    ? 'bottom'
    : ['top', 'topLeft', 'topRight', 'tl', 'tr'].includes(position)
      ? 'top'
      : ['left', 'leftTop', 'leftBottom', 'lt', 'lb'].includes(position)
        ? 'left'
        : 'right'

  const legendPosition = ['topLeft', 'bottomLeft', 'leftTop', 'rightTop', 'lt', 'rt', 'tl', 'bl'].includes(position)
    ? 'start'
    : ['topRight', 'bottomRight', 'leftBottom', 'rightBottom', 'lb', 'rb', 'rt', 'br'].includes(position)
      ? 'end'
      : 'middle'

  const legends = {
    visible: enable,
    type: 'color',
    orient,
    position: legendPosition,

    colors: linearColorScheme || colorScheme || [],
    value: [min, max],
    min: min,
    max: max,

    maxWidth: '30%',
    handlerText: {
      visible: true,
      style: {
        fill: labelColor || labelFontColor,
        fontSize: labelFontSize,
        fontWeight: labelFontWeight,
      },
    },
  } as unknown
  return { ...result, legends } as Partial<PivotChartConstructorOptions>
}
