import { StreamLight } from '@visactor/vchart'
import type { BarLikeAppearConfig, BarLikeLoopConfig, BarLikeUpdateConfig } from './types'
import { VScreenAnimationType } from './types'
import { allowAnimation, getPrimaryEffect } from './utils'
import {
  fadeInBar,
  getGroupCountFromSpec,
  getLoopResult,
  groupHighLightBar,
  growBar,
  isHorizontalBar,
  moveInBar,
  moveOutBar,
  transform2VChartColor,
} from './utils/bar'

/**
 * 柱图/条形图 入场动画
 * 动画类型:
 * 1. growth: 生长动画
 * 效果：横向柱使用宽度增长, 纵向柱使用高度增长。
 * 编排逻辑：仅作用于 bar mark, 使用 appear 的 easing 和 duration。
 * 2. load: 加载动画
 * 效果：使用逐个淡入, 让柱子按图元顺序出现。
 * 编排逻辑：仅作用于 bar mark, 使用 appear 的 easing 和 duration。
 * 3. 其他: 默认入场动画
 * 效果：不指定额外动画 type, 交给 VChart 默认入场补间。
 * 编排逻辑：仅保留 easing 和 duration。
 */
export const barAppear = (config: BarLikeAppearConfig | undefined, direction: 'horizontal' | 'vertical') => {
  if (!allowAnimation(config)) return false
  const effect = getPrimaryEffect(config)
  const configByType =
    effect === VScreenAnimationType.growth
      ? growBar(direction)
      : effect === VScreenAnimationType.load
        ? fadeInBar()
        : {}
  return { bar: { ...configByType, easing: config?.ease, duration: config?.duration ?? 1000 } }
}

/**
 * 柱图/条形图 更新动画
 * 动画类型:
 * 1. moveIn: 移入动画
 * 效果：update 阶段沿柱图方向从画布外移入。
 * 编排逻辑：复用移入方向, 但不再补随机 dataKey, 只作用于 bar mark。
 * 2. 其他: 默认更新动画
 * 效果：使用 VChart 默认更新补间。
 * 编排逻辑：只保留 easing 和 duration, 不影响轴、标签等其他组件。
 */
export const barUpdate = (
  config: BarLikeUpdateConfig | undefined,
  direction: 'horizontal' | 'vertical',
  spec?: any,
) => {
  if (!config?.enable) return false
  const effect = getPrimaryEffect(config)
  const configByType = effect === VScreenAnimationType.moveIn ? moveInBar(direction, spec, true) : {}
  return { bar: { ...configByType, easing: config?.ease, duration: config?.duration ?? 1000 } }
}

/**
 * 柱图/条形图 循环动画
 * 动画类型:
 * 1. highLight: 分组高亮动画
 * 效果：按类目分组依次切换高亮填充和描边。
 * 编排逻辑：startTime = appear 存在 ? interval : 0, loopDuration = groupDuration * groupCount + stopDuration, 一轮结束后等待 interval。
 * 2. growth/moveIn/load: mark 循环动画
 * 效果：复用对应的柱图 mark 动画。
 * 编排逻辑：先执行 loopDuration, 再等待 interval + atmosphereDuration 后重复。
 * 3. atmosphere: 流光氛围动画
 * 效果：使用 StreamLight 在柱子上形成流光。
 * 编排逻辑：延迟 loopDuration 后启动, 持续 atmosphereDuration, 一轮结束后等待 interval。
 */
export const barLoop = (
  config: BarLikeLoopConfig | undefined,
  ignoreFirstNormal: boolean,
  direction: 'horizontal' | 'vertical',
  spec?: any,
) => {
  if (!config?.enable) return false
  const interval = config.interval ?? 0
  const startTime = ignoreFirstNormal ? interval : 0
  const loop = config.loop
  const atmosphere = config.atmosphere
  const loopEffect = getPrimaryEffect(loop)
  const result: any[] = []
  let loopDuration = loopEffect === VScreenAnimationType.none ? 0 : 1000
  const atmosphereDuration = loopEffect === VScreenAnimationType.none ? 2000 : 1000

  if (loopEffect === VScreenAnimationType.highLight && loop) {
    const groupDuration = 700
    const stopDuration = 850
    loopDuration = loop.duration ?? groupDuration * getGroupCountFromSpec(spec).groupCount + stopDuration
    result.push(
      ...groupHighLightBar(
        startTime,
        loop,
        loopDuration,
        interval,
        atmosphereDuration,
        isHorizontalBar(direction),
        spec,
      ),
    )
  } else if (loop) {
    result.push({
      ...getLoopResult(loopEffect, direction, spec),
      startTime,
      easing: loop.ease,
      duration: loopDuration,
      delayAfter: interval + atmosphereDuration,
      loop: true,
      controlOptions: { immediatelyApply: false },
    })
  }

  if (atmosphere?.ease || atmosphere?.color) {
    result.push({
      loop: true,
      startTime,
      delay: loopDuration,
      delayAfter: interval,
      duration: atmosphereDuration,
      easing: atmosphere.ease,
      custom: StreamLight,
      customParameters: {
        isHorizontal: isHorizontalBar(direction),
        attribute: {
          fill: transform2VChartColor(atmosphere.color),
          blur: 0,
          shadowColor: 'rgba(0,0,0,0)',
        },
      },
    })
  }

  return result.length > 0 ? { bar: result } : false
}

/** Data exits inherit update timing, with the reverse motion for moveIn. */
export const barExit = (config: BarLikeUpdateConfig | undefined, direction: 'horizontal' | 'vertical') => {
  if (!config?.enable) return false
  const motion = getPrimaryEffect(config) === VScreenAnimationType.moveIn ? moveOutBar(direction) : {}
  return { bar: { ...motion, duration: config.duration ?? 1000, easing: config.ease } }
}
