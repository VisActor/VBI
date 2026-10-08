import type { RadarAppearConfig, RadarLoopConfig, RadarUpdateConfig } from './types'
import { allowAnimation, EFFECT_NONE, getPrimaryEffect, atmospherePoint } from './utils'

/**
 * 雷达图 入场动画
 * 动画类型:
 * 1. radial: 径向裁剪动画
 * 效果：雷达区域按裁剪方式展开。
 * 编排逻辑：使用 clipIn preset, duration 和 easing 由 appear 配置控制。
 * 2. 其他: 生长动画
 * 效果：雷达整体形状从中心增长。
 * 编排逻辑：使用 grow preset, duration 和 easing 由 appear 配置控制。
 */
export const radarAppear = (config: RadarAppearConfig | undefined) => {
  if (!allowAnimation(config)) {
    return false
  }
  const effect = getPrimaryEffect(config)
  return {
    preset: effect === 'radial' ? 'clipIn' : 'grow',
    duration: config?.duration ?? 0,
    easing: config?.ease,
  }
}

/**
 * 雷达图 循环动画
 * 动画类型:
 * 1. atmosphere: 点氛围动画
 * 效果：point 执行 breath/reveal/ripple 等氛围效果。
 * 编排逻辑：startTime = appear 存在 ? interval : 0, 持续 1000ms, 一轮结束后等待 interval。
 * 2. none: 无循环动画
 * 效果：不配置 normal 动画。
 * 编排逻辑：当 atmosphere.effect 为 none 时返回 false。
 */
export const radarLoop = (config: RadarLoopConfig | undefined, ignoreFirstNormal: boolean) => {
  if (!config?.enable) {
    return false
  }
  const interval = config.interval ?? 0
  const startTime = ignoreFirstNormal ? interval : 0
  if ((config.atmosphere?.effect ?? EFFECT_NONE) === EFFECT_NONE) {
    return false
  }

  return {
    point: {
      loop: true,
      startTime,
      delayAfter: interval,
      duration: 1000,
      easing: config.atmosphere?.ease,
      ...atmospherePoint(config.atmosphere?.effect),
      controlOptions: { immediatelyApply: false },
    },
  }
}

/**
 * 雷达图 更新动画
 * 动画类型:
 * 1. default: 默认更新动画
 * 效果：雷达图使用 VChart 默认补间。
 * 编排逻辑：只保留 update 的 duration 和 easing。
 */
export const radarUpdate = (config: RadarUpdateConfig | undefined) => {
  if (!config?.enable) {
    return false
  }
  return { duration: config.duration ?? 1000, easing: config?.ease }
}
