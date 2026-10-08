import { createAliasFormatter } from 'src/pipeline/utils'
import type { PivotChartConstructorOptions } from '@visactor/vtable'
import { unique } from 'remeda'
import type { Color, Legend, PivotChartSpecPipe } from 'src/types'
import { createSpecifiedForColorMapping } from '../color/color'

export const pivotDiscreteLegend: PivotChartSpecPipe = (spec, context): Partial<PivotChartConstructorOptions> => {
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

  const colorItems = unique(
    datasetReshapeInfo.flatMap((d) => {
      return d.unfoldInfo.colorItems
    }),
  )

  const colorIdMap = datasetReshapeInfo.reduce<Record<string, { id: string; alias: string }>>((prev, cur) => {
    return { ...prev, ...cur.unfoldInfo.colorIdMap }
  }, {})

  const { legend, color } = baseConfig
  const { colorScheme, colorMapping } = color

  const colorSpecified = createSpecifiedForColorMapping(colorMapping, colorIdMap, colorItems)

  const {
    enable,
    interactive = true,
    position = 'bottom',
    labelFontColor,
    labelColor,
    labelFontSize = 12,
    labelFontWeight = 400,
    maxSize = 1,
    border,
    shapeType = 'rectRound',
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
    padding: 0,
    visible: enable,
    type: 'discrete',
    ...(interactive === false ? { interactive: false, select: false, hover: false } : {}),
    orient,
    position: legendPosition,
    maxCol: Math.max(1, maxSize),
    maxRow: Math.max(1, maxSize),
    data: colorItems.map((d: string, index: number) => {
      const color = colorSpecified?.[d] ?? colorScheme?.[index % colorScheme.length]
      return {
        label: d,
        shape: {
          outerBorder: border
            ? {
                stroke: color,
                distance: 3,
                lineWidth: 1,
              }
            : undefined,
          fill: color,
        },
      }
    }),

    item: {
      focus: interactive,
      maxWidth: '30%',
      focusIconStyle: {
        size: labelFontSize + 2,
        fill: labelColor || labelFontColor,
        fontWeight: labelFontWeight,
      },
      shape: {
        space: border ? 6 : 4,
        style: {
          symbolType: shapeType,
          size: border ? 8 : 10,
        },
      },
      label: {
        formatMethod: createAliasFormatter(colorIdMap),
        style: {
          fontSize: labelFontSize,
          fill: labelColor || labelFontColor,
          fontWeight: labelFontWeight,
        },
      },
      background: {
        state: {
          selectedHover: {
            fill: labelColor || labelFontColor,
            fillOpacity: 0.05,
          },
        },
      },
    },
  }
  return { ...result, legends } as Partial<PivotChartConstructorOptions>
}
