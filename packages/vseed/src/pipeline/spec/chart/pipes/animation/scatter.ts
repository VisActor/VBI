import type { ScatterAppearConfig, ScatterLoopConfig, ScatterUpdateConfig } from './types'
import { allowAnimation, EFFECT_NONE, getPrimaryEffect, atmospherePoint } from './utils'
import { flyInScatter, scaleInScatter } from './utils/scatter'

/**
 * 散点图 入场动画
 * 动画类型:
 * 1. growth: 飞入动画
 * 效果：点从上方移入, 同时恢复透明度和尺寸。
 * 编排逻辑：只作用于 point mark, 使用 appear 的 easing 和 duration。
 * 2. scale: 缩放动画
 * 效果：点中心保持不变, size 从 0 过渡到最终尺寸。
 * 编排逻辑：只作用于 point mark, 使用 appear 的 easing 和 duration。
 */
export const scatterAppear = (config: ScatterAppearConfig | undefined) => {
  if (!allowAnimation(config)) {
    return false
  }
  const effect = getPrimaryEffect(config)
  const duration = config?.duration ?? 0
  const result =
    effect === 'growth'
      ? flyInScatter(duration, config?.ease)
      : effect === 'scale'
        ? scaleInScatter(duration, config?.ease)
        : []
  return { point: result }
}

/**
 * 散点图 循环动画
 * 动画类型:
 * 1. growth/scale: 点循环动画
 * 效果：复用飞入或缩放动画形成循环。
 * 编排逻辑：startTime = appear 存在 ? interval : 0, 有 loop 时 loopDuration = 1000ms, 执行后等待 interval + 1000ms。
 * 2. atmosphere: 点氛围动画
 * 效果：point 执行 breath/reveal/ripple 等氛围效果。
 * 编排逻辑：有 loop 时持续 1000ms, 无 loop 时持续 2000ms, 一轮结束后等待 interval。
 */
export const scatterLoop = (config: ScatterLoopConfig | undefined, ignoreFirstNormal: boolean) => {
  if (!config?.enable) {
    return false
  }
  const interval = config.interval ?? 0
  const startTime = ignoreFirstNormal ? interval : 0
  const effect = getPrimaryEffect(config.loop)
  const loopDuration = effect === EFFECT_NONE ? 0 : 1000
  const atmosphereDuration = effect === EFFECT_NONE ? 2000 : 1000
  const result: any[] = []

  if (effect === 'growth') {
    result.push(...flyInScatter(loopDuration, config.loop?.ease, true, startTime, interval + 1000))
  } else if (effect === 'scale') {
    result.push(...scaleInScatter(loopDuration, config.loop?.ease, true, startTime, interval + 1000))
  }

  if ((config.atmosphere?.effect ?? EFFECT_NONE) !== EFFECT_NONE) {
    result.push({
      loop: true,
      startTime,
      delayAfter: interval,
      duration: atmosphereDuration,
      easing: config.atmosphere?.ease,
      ...atmospherePoint(config.atmosphere?.effect),
      controlOptions: { immediatelyApply: false },
    })
  }

  return { point: result }
}

/**
 * 散点图 更新动画
 * 动画类型:
 * 1. default: 默认更新动画
 * 效果：point 使用 VChart 默认补间。
 * 编排逻辑：只保留 update 的 easing 和 duration。
 */
export const scatterUpdate = (config: ScatterUpdateConfig | undefined) => {
  if (!config?.enable) {
    return false
  }
  return { point: { duration: config.duration ?? 1000, easing: config?.ease } }
}
