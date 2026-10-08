import type {
  BarLikeAppearAnimation,
  BarLikeUpdateAnimation,
  LineAreaAppearAnimation,
  LineAreaUpdateAnimation,
  PieLikeAppearAnimation,
  PieLikeUpdateAnimation,
  RadarAppearAnimation,
  RadarUpdateAnimation,
  ScatterAppearAnimation,
  ScatterUpdateAnimation,
} from './animationConfig'
import type {
  BarLikeAnimationLoop,
  LineAreaAnimationLoop,
  PieLikeAnimationLoop,
  RadarAnimationLoop,
  ScatterAnimationLoop,
} from './animationLoop'

export interface BarLikeAnimationParams {
  /** @description 条形/柱形图入场动画配置 */
  appear?: BarLikeAppearAnimation
  /** @description 条形/柱形图数据进入、更新、退出的共同动画配置 */
  update?: BarLikeUpdateAnimation
  /** @description 条形/柱形图循环动画配置 */
  loop?: BarLikeAnimationLoop
}
export interface LineAreaAnimationParams {
  /** @description 折线/面积图入场动画配置 */
  appear?: LineAreaAppearAnimation
  /** @description 折线/面积图数据进入、更新、退出的共同动画配置 */
  update?: LineAreaUpdateAnimation
  /** @description 折线/面积图循环动画配置 */
  loop?: LineAreaAnimationLoop
}
export interface ScatterAnimationParams {
  /** @description 散点图入场动画配置 */
  appear?: ScatterAppearAnimation
  /** @description 散点图数据进入、更新、退出的共同动画配置 */
  update?: ScatterUpdateAnimation
  /** @description 散点图循环动画配置 */
  loop?: ScatterAnimationLoop
}
export interface PieLikeAnimationParams {
  /** @description 饼图/环图/玫瑰图入场动画配置 */
  appear?: PieLikeAppearAnimation
  /** @description 饼图/环图/玫瑰图数据进入、更新、退出的共同动画配置 */
  update?: PieLikeUpdateAnimation
  /** @description 饼图/环图/玫瑰图循环动画配置 */
  loop?: PieLikeAnimationLoop
}
export interface RadarAnimationParams {
  /** @description 雷达图入场动画配置 */
  appear?: RadarAppearAnimation
  /** @description 雷达图数据进入、更新、退出的共同动画配置 */
  update?: RadarUpdateAnimation
  /** @description 雷达图循环动画配置 */
  loop?: RadarAnimationLoop
}

export interface BarLikeAnimation {
  /** @description 是否启用条形/柱形图动画 */
  enable?: boolean
  /** @description 条形/柱形图动画参数 */
  params?: BarLikeAnimationParams
}
export interface LineAreaAnimation {
  /** @description 是否启用折线/面积图动画 */
  enable?: boolean
  /** @description 折线/面积图动画参数 */
  params?: LineAreaAnimationParams
}
export interface ScatterAnimation {
  /** @description 是否启用散点图动画 */
  enable?: boolean
  /** @description 散点图动画参数 */
  params?: ScatterAnimationParams
}
export interface PieLikeAnimation {
  /** @description 是否启用饼图/环图/玫瑰图动画 */
  enable?: boolean
  /** @description 饼图/环图/玫瑰图动画参数 */
  params?: PieLikeAnimationParams
}
export interface RadarAnimation {
  /** @description 是否启用雷达图动画 */
  enable?: boolean
  /** @description 雷达图动画参数 */
  params?: RadarAnimationParams
}
