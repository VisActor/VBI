import { type Locale } from '../../i18n'

import type {
  RaceBarDimension,
  BarMaxWidth,
  DimensionLinkage,
  Sort,
  SortLegend,
  Player,
  AnnotationArea,
  AnnotationHorizontalLine,
  AnnotationPoint,
  AnnotationVerticalLine,
  BackgroundColor,
  Brush,
  BarStyle,
  Color,
  CrosshairRect,
  Dataset,
  Label,
  Legend,
  CornerRadius,
  StackCornerRadius,
  Theme,
  Tooltip,
  XLinearAxis,
  YBandAxis,
  Page,
  RaceBarMeasure,
} from '../../properties'

/**
 * @description 动态条形图 (Race Bar Chart)
 * 适用于展示数据随时间变化的排名情况
 */
export interface RaceBar {
  /**
   * @description 动态条形图，适用于展示数据随时间变化的排名情况
   * @type {'raceBar'}
   */
  chartType: 'raceBar'

  /**
   * @description 数据源
   */
  dataset: Dataset

  /**
   * @description 维度
   */
  dimensions?: RaceBarDimension[]

  /**
   * @description 指标
   */
  measures?: RaceBarMeasure[]

  /**
   * @description 播放器配置, 用于指定时间维度, 动态条形图的核心配置
   */
  player?: Player

  /**
   * @description 排序配置, 动态条形图通常需要根据数值动态排序
   */
  sort?: Sort

  /**
   * @description 分页配置
   */
  page?: Page

  /**
   * @description 背景颜色
   */
  backgroundColor?: BackgroundColor

  /**
   * @description 颜色配置
   */
  color?: Color

  /**
   * @description 标签配置
   */
  label?: Label

  /**
   * @description 图例配置
   */
  legend?: Legend

  /**
   * @description 提示信息配置
   */
  tooltip?: Tooltip

  /**
   * @description 框选配置
   */
  brush?: Brush

  /**
   * @description x轴配置，为数值轴，展示指标值
   */
  xAxis?: XLinearAxis

  /**
   * @description y轴配置，为类目轴，展示维度值，柱子竖向排列
   */
  yAxis?: YBandAxis

  /**
   * @description 水平提示框配置
   */
  crosshairRect?: CrosshairRect

  /**
   * @description 柱图圆角的数值或数组，默认启用。当 stackCornerRadius 为 false 时，每个图元独立绘制圆角；为 true 时，通过 clip 裁剪整组堆叠柱体。数值设置所有角，数组按左上、右上、右下、左下排列，数据为负值时圆角方向自动翻转。设为 0 可关闭。barStyle.barRadius 可覆盖单个图元的圆角；stackCornerRadius 为 true 时，整组圆角统一使用 cornerRadius，不受 barStyle.barRadius 影响。
   * @default [0, 4, 4, 0]
   * @example [4, 4, 0, 0]
   */
  cornerRadius?: CornerRadius

  /**
   * @description 是否使用整组堆叠圆角，默认 false。设为 true 时，通过 clip 裁剪整组柱体，圆角值统一读取 cornerRadius，保留堆叠内部的直角连接，并优先于 barStyle.barRadius（包括条件样式）。设为 false 时，cornerRadius 对每个图元单独生效。注意：开启 stackCornerRadius 会引起更新动画重叠的 bug，整组 clip 裁剪路径与图元更新动画不同步，依赖 VChart 修复；需要平滑更新动画时建议保持 false。
   * @default false
   * @example true
   */
  stackCornerRadius?: StackCornerRadius

  /**
   * @description 矩形的最大高度
   */
  barMaxWidth?: BarMaxWidth

  /**
   * @description 图例排序配置
   */
  sortLegend?: SortLegend

  /**
   * @description 主题
   */
  theme?: Theme

  /**
   * @description 条形图样式配置
   */
  barStyle?: BarStyle | BarStyle[]

  /**
   * @description 标注点配置
   */
  annotationPoint?: AnnotationPoint | AnnotationPoint[]

  /**
   * @description 数值标注线
   */
  annotationVerticalLine?: AnnotationVerticalLine | AnnotationVerticalLine[]

  /**
   * @description 维度值标注线
   */
  annotationHorizontalLine?: AnnotationHorizontalLine | AnnotationHorizontalLine[]

  /**
   * @description 标注区域配置
   */
  annotationArea?: AnnotationArea | AnnotationArea[]

  /**
   * @description 维度联动配置
   */
  dimensionLinkage?: DimensionLinkage

  /**
   * @description 语言配置
   */
  locale?: Locale
}
