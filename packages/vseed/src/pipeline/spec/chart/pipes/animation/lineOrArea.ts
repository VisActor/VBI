import type { LineAreaAppearConfig, LineAreaLoopConfig, LineAreaUpdateConfig } from './types'
import { VScreenAnimationType } from './types'
import { allowLineOrAreaAnimation, atmospherePoint } from './utils'
import { transform2VChartColor } from './utils/bar'
import { clipInLine, growthTopLine, growthTopPoint } from './utils/lineOrArea'
import { StreamLight } from '@visactor/vchart'

/**
 * 折线图/面积图/百分比面积图 入场动画
 * 动画类型:
 * 1. growth: 生长动画
 * 效果：line/area 使用路径增长, point 使用顶部移入。
 * 编排逻辑：line、area、point 共用 appear 的 easing 和 duration。
 * 2. load: 加载动画
 * 效果：line/area 使用整体裁剪进入, point 不额外配置进入方式。
 * 编排逻辑：line、area、point 共用 appear 的 easing 和 duration。
 */
export const lineOrAreaAppear = (config: LineAreaAppearConfig | undefined) => {
  if (!config || !allowLineOrAreaAnimation(config)) {
    return false
  }
  const { effects, ease, duration } = config
  const effect = effects?.[0]
  const durationMs = duration ?? 1000

  let lineOrAreaConfigByType = {}
  let pointConfigByType = {}
  if (effect === VScreenAnimationType.growth) {
    lineOrAreaConfigByType = growthTopLine()
    pointConfigByType = growthTopPoint()
  } else if (effect === VScreenAnimationType.load) {
    lineOrAreaConfigByType = clipInLine()
  }
  return {
    line: {
      ...lineOrAreaConfigByType,
      easing: ease,
      duration: durationMs,
    },
    area: {
      ...lineOrAreaConfigByType,
      easing: ease,
      duration: durationMs,
    },
    point: {
      ...pointConfigByType,
      easing: ease,
      duration: durationMs,
    },
  }
}

/**
 * 折线图/面积图/百分比面积图 循环动画
 * 动画类型:
 * 1. growth/load: 线面 loop 动画
 * 效果：line/area 执行路径增长或整体裁剪。
 * 编排逻辑：startTime = appear 存在 ? interval : 0, 有 loop 时 loopDuration = 1000ms, 执行后等待 interval + atmosphereDuration。
 * 2. atmosphere: 线面流光氛围动画
 * 效果：line/area 使用 StreamLight 形成流光。
 * 编排逻辑：延迟 loopDuration 后启动, 持续 atmosphereDuration, 一轮结束后等待 interval。
 * 3. atmospherePoint: 点氛围动画
 * 效果：point 执行 breath/reveal/ripple 等氛围效果。
 * 编排逻辑：和整轮时间线同步, 一轮结束后等待 interval + atmosphereDuration。
 */
export const lineOrAreaLoop = (config: LineAreaLoopConfig | undefined, ignoreFirstNormal: boolean) => {
  if (!config?.enable) {
    return false
  }
  const { loop, atmosphere, interval = 5000 } = config
  const totalDuration = 2000
  // const startTime = 0
  const startTime = ignoreFirstNormal ? interval : 0
  const lineOrAreaResult = []
  const pointResult = []

  // 轮播动画
  const { effects: loopEffects = [], ease: loopEase = 'linear' } = loop ?? {}
  const loopEffect = loopEffects[0] ?? VScreenAnimationType.none

  const loopDuration = loopEffect === VScreenAnimationType.none ? 0 : totalDuration / 2
  const atmosphereDuration = loopEffect === VScreenAnimationType.none ? totalDuration : totalDuration / 2

  const timeLineConfig = {
    startTime,
    easing: loopEase,
    duration: loopDuration,
    delayAfter: interval + atmosphereDuration,
    loop: true,
    controlOptions: {
      immediatelyApply: false,
    },
  }
  if (loopEffect === VScreenAnimationType.growth) {
    lineOrAreaResult.push({
      ...growthTopLine(),
      ...timeLineConfig,
    })
  } else if (loopEffect === VScreenAnimationType.load) {
    lineOrAreaResult.push({
      ...clipInLine(),
      ...timeLineConfig,
    })
  }
  // point loop动画只能在appear中生效

  // 氛围动画
  const { ease: atmosphereEase, effect: atmosphereEffect, color: atmosphereColor } = atmosphere ?? {}

  const atmosphereLineOrAreaResult = {
    loop: true,
    startTime,
    delay: loopDuration,
    delayAfter: interval,
    duration: atmosphereDuration,
    easing: atmosphereEase,
    custom: StreamLight,
    customParameters: (...args: any[]) => {
      return {
        streamLength: 20,
        attribute: {
          stroke: transform2VChartColor(atmosphereColor),
          strokeOpacity: 0.8,
          lineWidth: args[1].attribute?.lineWidth ?? 1,
        },
      }
    },
  }
  lineOrAreaResult.push(atmosphereLineOrAreaResult)

  // 虽然是氛围动画, 但时机跟随折线loop动画
  const atmospherePointResult = {
    loop: true,
    startTime,
    delayAfter: interval + atmosphereDuration,
    duration: atmosphereDuration,
    easing: atmosphereEase,
    ...atmospherePoint(atmosphereEffect),
  }

  pointResult.push(atmospherePointResult)

  return {
    line: lineOrAreaResult,
    area: lineOrAreaResult,
    point: pointResult,
  }
}

/**
 * 折线图/面积图/百分比面积图 更新动画
 * 动画类型:
 * 1. default: 默认更新动画
 * 效果：使用 VChart 默认补间覆盖数据更新、点位变化和面积路径变化。
 * 编排逻辑：line、area、point 共用 update 的 easing 和 duration。
 */
export const lineOrAreaUpdate = (config: LineAreaUpdateConfig | undefined) => {
  if (!config?.enable) {
    return false
  }
  const { ease, duration } = config
  const durationMs = duration ?? 1000

  // 用图表库默认的补间效果
  return {
    line: {
      easing: ease,
      duration: durationMs,
    },
    area: {
      easing: ease,
      duration: durationMs,
    },
    point: {
      easing: ease,
      duration: durationMs,
    },
  }
}
