import type { IPlayerSpec, ISpec } from '@visactor/vchart'
import { groupBy, uniqueBy } from 'remeda'
import type { Player, VChartSpecPipe } from 'src/types'
import { datasetXY } from '../dataset'

export const playerColumn: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { dimensions = [], datasetReshapeInfo, chartType, encoding } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { fontFamily?: string; player: Player }
  const result = datasetXY(spec, context)

  if (!baseConfig || !baseConfig.player) {
    return result
  }
  const { player } = baseConfig
  const fontFamily = player.fontFamily || baseConfig.fontFamily
  const textSize = player.fontSize ?? 36

  const id = datasetReshapeInfo[0].id
  const { unfoldInfo, foldInfo } = datasetReshapeInfo[0]
  const { encodingPlayer, encodingX } = unfoldInfo
  const { measureValue } = foldInfo
  const {
    maxCount,
    autoPlay = true,
    interval = 1000,
    loop = false,
    position,
    railColor,
    trackColor,
    sliderHandleColor,
    sliderHandleBorderColor,
    startButtonColor,
    pauseButtonColor,
    backwardButtonColor,
    forwardButtonColor,
  } = player

  const dataGroups = groupBy(advancedVSeed.dataset, (item) => item[encodingPlayer])
  if (result.data && 'values' in result.data) {
    result.data.values = []
  }

  const xValues = uniqueBy(
    advancedVSeed.dataset.map((d) => d[encodingX]),
    (item) => item,
  )
  const specs = Object.values(dataGroups).map((items) => {
    // 如果当前items中不存在xValues中的值, 则填充为0, 保证每组都有同样的xValue, 都有对应的数据
    const filledItems = items.map((item) => ({
      ...item,
      [encodingX]: xValues.find((xValue) => xValue === item[encodingX]) || 0,
    }))
    const sortedItems = filledItems.sort((a, b) => b[measureValue] - a[measureValue])
    return {
      data: {
        id: id,
        values: maxCount === false ? sortedItems : sortedItems.slice(0, maxCount as number),
      },
    }
  })

  const duration = interval
  const exchangeDuration = interval * 0.6

  const dataKey = dimensions.filter((d) => !encoding.player?.includes(d.id)).map((d) => d.id)

  const padding = 12
  return {
    ...result,
    dataKey,
    animationUpdate: {
      bar: [
        {
          type: 'update',
          options: { excludeChannels: ['x'] },
          easing: 'linear',
          duration,
        },
        {
          channel: ['x'],
          easing: 'circInOut',
          duration: exchangeDuration,
        },
      ],
      point: [
        {
          type: 'update',
          easing: 'linear',
          duration,
        },
      ],
      line: [
        {
          type: 'update',
          easing: 'linear',
          duration,
        },
      ],
      axis: {
        duration: exchangeDuration,
        easing: 'circInOut',
      },
    },
    animationEnter: {
      bar: [
        {
          type: 'moveIn',
          duration: exchangeDuration,
          easing: 'circInOut',
          options: {
            direction: 'x',
            orient: 'negative',
          },
        },
      ],
    },
    animationExit: {
      bar: [
        {
          type: 'moveOut',
          options: {
            direction: 'y',
            orient: 'negative',
          },
          duration: exchangeDuration,
        },
        {
          type: 'moveOut',
          options: {
            direction: 'x',
            orient: 'negative',
          },
          duration: exchangeDuration,
        },
        {
          type: 'fadeOut',
          duration: exchangeDuration,
        },
      ],
    },
    customMark: [
      {
        type: 'text',
        dataId: 'year',
        style: {
          textBaseline: 'bottom',
          fontSize: textSize,
          textAlign: 'right',
          fontFamily,
          text: (datum: any) => datum[encodingPlayer],
          x: (_datum: any, ctx: any) => {
            return ctx.vchart.getChart().getCanvasRect()?.width - padding
          },
          y: (_datum: any, _ctx: any) => {
            return textSize + padding
          },
          fill: 'rgb(100, 100, 100)',
          fillOpacity: 0.25,
        },
      },
    ],
    player: {
      visible: true,
      auto: autoPlay,
      interval: interval,
      loop: loop,
      alternate: false,
      position: 'middle',
      orient: position,
      type: 'discrete',
      specs,
      controller: {
        visible: true,
        start: { visible: true, order: 0, style: { fill: startButtonColor } },
        pause: { visible: true, order: 1, style: { fill: pauseButtonColor } },
        backward: { visible: true, order: 2, style: { fill: backwardButtonColor } },
        forward: { visible: true, order: 3, position: 'end', style: { fill: forwardButtonColor } },
      },
      slider: {
        visible: true,
        railStyle: {
          visible: true,
          fill: railColor,
          [position === 'top' || position === 'bottom' ? 'height' : 'width']: 2,
        },
        trackStyle: {
          visible: true,
          fill: trackColor,
          [position === 'top' || position === 'bottom' ? 'height' : 'width']: 2,
        },
        handlerStyle: {
          visible: true,
          lineWidth: 2,
          stroke: sliderHandleBorderColor,
          fill: sliderHandleColor,
          size: 9,
        },
      },
    } as IPlayerSpec,
  } as unknown as ISpec
}
