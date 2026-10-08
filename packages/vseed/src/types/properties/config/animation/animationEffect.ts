export type BarLikeLoopEffect = 'highLight' | 'growth' | 'moveIn' | 'none'
export type LineAreaLoopEffect = 'load' | 'growth' | 'none'
export type ScatterLoopEffect = 'growth' | 'scale' | 'none'
export type PieLikeLoopEffect = 'enlarge' | 'relocate'

export interface AnimationEffectConfig {
  /** @description 是否启用当前动画阶段 */
  enable?: boolean
  /** @description 当前阶段使用的动画效果列表；更新阶段省略时使用默认补间 */
  effects?: string[]
  /** @description 动画缓动函数 */
  ease?: string
  /** @description 动画时长，单位为毫秒；数据更新阶段默认 1000 毫秒，0 表示立即完成 */
  duration?: number
  /** @description 动画高亮或氛围颜色 */
  color?: string
}

export interface BarLikeAppearAnimation extends AnimationEffectConfig {
  /** @description 条形/柱形图入场效果，支持生长动画 */
  effects?: 'growth'[]
}
export interface BarLikeUpdateAnimation extends AnimationEffectConfig {
  /** @description 条形/柱形图更新效果，支持生长和移入动画 */
  effects?: ('growth' | 'moveIn')[]
}
export interface BarLikeLoopAnimation extends AnimationEffectConfig {
  /** @description 条形/柱形图循环效果 */
  effects?: BarLikeLoopEffect[]
}
export interface LineAreaAppearAnimation extends AnimationEffectConfig {
  /** @description 折线/面积图入场效果，支持加载和生长动画 */
  effects?: ('load' | 'growth')[]
}
export interface LineAreaUpdateAnimation extends AnimationEffectConfig {
  /** @description 折线/面积图更新效果，支持生长动画 */
  effects?: 'growth'[]
}
export interface LineAreaLoopAnimation extends AnimationEffectConfig {
  /** @description 折线/面积图循环效果 */
  effects?: LineAreaLoopEffect[]
}
export interface ScatterAppearAnimation extends AnimationEffectConfig {
  /** @description 散点图入场效果，支持生长和缩放动画 */
  effects?: ('growth' | 'scale')[]
}
export interface ScatterUpdateAnimation extends AnimationEffectConfig {
  /** @description 散点图更新效果，支持生长动画 */
  effects?: 'growth'[]
}
export interface ScatterLoopAnimation extends AnimationEffectConfig {
  /** @description 散点图循环效果 */
  effects?: ScatterLoopEffect[]
}
export interface PieLikeAppearAnimation extends AnimationEffectConfig {
  /** @description 饼图/环图/玫瑰图入场效果，支持径向和缩放动画 */
  effects?: ('radial' | 'scale')[]
}
export interface PieLikeUpdateAnimation extends AnimationEffectConfig {
  /** @description 饼图/环图/玫瑰图更新效果，支持径向动画 */
  effects?: 'radial'[]
}
export interface PieLikeLoopAnimation extends AnimationEffectConfig {
  /** @description 饼图/环图/玫瑰图循环效果 */
  effects?: PieLikeLoopEffect[]
}
export interface RadarAppearAnimation extends AnimationEffectConfig {
  /** @description 雷达图入场效果，支持径向和缩放动画 */
  effects?: ('radial' | 'scale')[]
}
export interface RadarUpdateAnimation extends AnimationEffectConfig {
  /** @description 雷达图更新效果，支持生长动画 */
  effects?: 'growth'[]
}
