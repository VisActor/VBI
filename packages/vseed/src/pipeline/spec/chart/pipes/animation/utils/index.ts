import { VScreenAnimationType, type AnimationEffect, type AnimationEffectConfig } from '../types'
export { atmospherePoint, getFinalAttribute } from './pointAtmosphere'

export const EFFECT_NONE = VScreenAnimationType.none

/**
 * @description 获取配置中的首个动画效果；未配置时返回 none。
 * @param config 动画效果配置。
 * @returns 首个动画效果。
 */
export const getPrimaryEffect = (config?: AnimationEffectConfig): AnimationEffect => config?.effects?.[0] ?? EFFECT_NONE

/**
 * @description 判断通用动画配置是否开启且首个效果不是 none。
 * @param config 动画效果配置。
 * @returns 是否允许执行动画。
 */
export const allowAnimation = (config?: AnimationEffectConfig): boolean => {
  if (!config?.enable) {
    return false
  }
  return getPrimaryEffect(config) !== EFFECT_NONE
}

/**
 * @description 判断折线/面积动画是否开启；这类图表以最后一个效果作为有效性判断。
 * @param config 动画效果配置。
 * @returns 是否允许执行折线/面积动画。
 */
export const allowLineOrAreaAnimation = (config?: AnimationEffectConfig): boolean => {
  if (!config?.enable) {
    return false
  }
  const effects = config.effects ?? []
  const effect = effects[effects.length - 1] ?? EFFECT_NONE
  return effect !== EFFECT_NONE
}
