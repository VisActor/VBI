import { createFormatterByMeasure, findTreeNodesBy } from 'src/pipeline/utils'
import type { ColorLegend, Measure, VChartSpecPipe } from 'src/types'

export const colorLegend: VChartSpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed } = context
  const { datasetReshapeInfo, chartType, measures = [] } = advancedVSeed
  const { unfoldInfo } = datasetReshapeInfo[0]
  const baseConfig = advancedVSeed.config[chartType] as { legend: ColorLegend }
  if (!baseConfig || !baseConfig.legend) {
    return result
  }

  if (baseConfig.legend.enable === false) {
    return { ...result, legends: { visible: false } }
  }

  const { legend } = baseConfig
  const {
    enable,
    position = 'bottom',
    labelFontColor,
    labelColor,
    labelFontSize = 12,
    labelFontWeight,
    railBackgroundColor,
    handlerBorderColor,
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

  result.legends = {
    type: 'color',
    visible: enable,
    orient,
    position: legendPosition,
    padding: 0,
    field: unfoldInfo.encodingColor,
    maxWidth: '30%',
    handlerText: {
      visible: true,
      style: {
        fill: labelColor || labelFontColor,
        fontSize: labelFontSize,
        fontWeight: labelFontWeight,
      },
    },
    rail: {
      style: {
        fill: railBackgroundColor,
      },
    },
    handler: {
      style: {
        outerBorder: {
          stroke: handlerBorderColor,
        },
      },
    },
  }
  const colorMeasure = findTreeNodesBy<Measure>(measures, (m) => m.encoding === 'color')?.[0]
  if (colorMeasure) {
    const formatter = createFormatterByMeasure(colorMeasure)
    result.legends.handlerText!.formatter = formatter

    // TODO: 先注释掉图例标题，后续看需求是否需要恢复
    // result.legends.startText = {
    //   visible: true,
    //   text: colorMeasure.alias || colorMeasure.id,
    //   space: 12,
    //   textStyle: {
    //     fill: labelColor || labelFontColor,
    //     fontSize: labelFontSize,
    //     fontWeight: labelFontWeight,
    //   },
    // }
  }
  return result
}
