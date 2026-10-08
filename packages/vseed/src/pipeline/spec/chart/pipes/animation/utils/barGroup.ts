import { array } from '@visactor/vutils'
import type { EffectConfig } from '../types'
import { atmosphereColorToFill, atmosphereColorToStroke } from './barColor'

/**
 * @description 从 spec 数据中统计类目分组数量，用于计算分组高亮总时长。
 * @param spec 当前 VChart spec。
 * @returns 类目分组数量。
 */
export const getGroupCountFromSpec = (spec: any) => {
  const field = spec.direction === 'horizontal' ? array(spec.yField)[0] : array(spec.xField)[0]
  const groupCount = new Set((spec.data?.[0]?.values ?? []).map((row: any) => row[field])).size
  return { groupCount }
}

/**
 * @description 获取当前 datum 在类目轴 domain 中的位置和总数。
 * @param chartInstance VChart 实例。
 * @param datum 当前数据项。
 * @returns 当前数据项索引和类目总数。
 */
const getGroupInfo = (chartInstance: any, datum: any) => {
  const series = chartInstance.getChart().getAllSeries()[0]
  const indexField = series.direction === 'horizontal' ? series.fieldY[0] : series.fieldX[0]
  const indexValue = datum?.[indexField]
  const scale = series.direction === 'horizontal' ? series.scaleY : series.scaleX
  const index = (scale?.domain?.() ?? []).indexOf(indexValue) || 0
  const count = (scale?.domain?.() ?? []).length ?? 1
  return { index, count }
}

/**
 * @description 生成单个高亮片段的动态时长函数，使每个类目均分总时长。
 * @param totalDuration 分组高亮总时长，单位毫秒。
 * @returns timeSlice duration 回调函数。
 */
const getSliceDuration = (totalDuration: number) => (_datum: any, _element: any, _ctx: any, context: any) => {
  const { count } = getGroupInfo(context.vchart, _datum)
  return count === 0 ? 1000 : totalDuration / count / 2
}

/**
 * @description 生成柱图分组高亮循环动画配置。
 * @param startTime 动画开始时间，单位毫秒。
 * @param config 高亮动画配置，包含颜色和缓动。
 * @param totalDuration 分组高亮总时长，单位毫秒。
 * @param interval 每轮循环间隔，单位毫秒。
 * @param atmosphereDuration 氛围动画占用时长，单位毫秒。
 * @param isHorizontal 是否为横向柱图。
 * @param spec 当前 VChart spec。
 * @returns 柱图分组高亮循环动画配置。
 */
export const groupHighLightBar = (
  startTime: number,
  config: EffectConfig<any>,
  totalDuration: number,
  interval: number,
  atmosphereDuration: number,
  isHorizontal: boolean,
  spec: any,
) => {
  const color = config.color ?? '#4A90E2'
  const isGradientChart = spec?.bar?.style?.fill?.gradient === 'linear'
  const fillColor = atmosphereColorToFill(color, isGradientChart, isHorizontal)
  const strokeColor = atmosphereColorToStroke(color, isGradientChart, isHorizontal)

  return [
    {
      loop: true,
      startTime,
      controlOptions: { immediatelyApply: false },
      timeSlices: [
        {
          effects: { channel: { fill: { to: fillColor }, stroke: { to: strokeColor } }, easing: config.ease },
          delay: (datum: any, _element: any, _ctx: any, context: any) => {
            const { count, index } = getGroupInfo(context.vchart, datum)
            return count === 0 ? 0 : (index * totalDuration) / count
          },
          duration: getSliceDuration(totalDuration),
        },
        {
          effects: {
            channel: {
              fill: { from: fillColor, to: (...p: any[]) => p[1].attribute.fill },
              stroke: { from: strokeColor, to: (...p: any[]) => p[1].attribute.fill },
            },
            easing: config.ease,
          },
          delayAfter: (datum: any, _element: any, _ctx: any, context: any) => {
            const { count, index } = getGroupInfo(context.vchart, datum)
            return count === 0 ? 0 : interval + atmosphereDuration + ((count - index - 1) * totalDuration) / count
          },
          duration: getSliceDuration(totalDuration),
        },
      ],
    },
  ]
}
