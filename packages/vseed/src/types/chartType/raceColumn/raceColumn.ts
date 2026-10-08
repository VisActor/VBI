import { type Locale } from '../../i18n'
import type {
  BarMaxWidth,
  RaceColumnDimension,
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
  Page,
  ColumnMeasure,
  XBandAxis,
  YLinearAxis,
} from '../../properties'

/**
 * @description 动态柱状图 (Race Column Chart)
 * 适用于展示数据随时间变化的排名情况，柱子竖向排列
 * 适用场景：
 * - 数据项名称较长时
 * - 需要直观比较不同类别的数值大小并展示其随时间的变化排序
 * - 展示时间序列数据变化趋势，并动态更新柱子排序
 * @note
 * 动态柱状图：
 * - X轴为类目轴（分类数据），展示维度值
 * - Y轴为数值轴（连续数据），展示指标值
 * - 支持通过播放器控制时间维度，动态展示数据变化
 * - 柱子在动画中根据数值大小动态排序
 */
export interface RaceColumn {
  /**
   * @description 动态柱状图，适用于展示数据随时间变化的排名情况
   * @type {'raceColumn'}
   */
  chartType: 'raceColumn'

  /**
   * @description 符合TidyData规范的且已经聚合的数据集
   * @type {Array<Record<string|number, any>>}
   * @example [{category:'A', value:100, date: '2020'}, {category:'B', value:200, date: '2020'}]
   */
  dataset: Dataset
  /**
   * 维度
   * @description 第一个维度映射到player，第二个维度映射到X轴
   */
  dimensions?: RaceColumnDimension[]
  /**
   * 指标
   * @description 动态柱状图的所有指标会自动合并为一个指标, 映射到Y轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示.
   * @example [{id: "value", alias: "数值"}]
   */
  measures?: ColumnMeasure[]

  /**
   * @description 播放器配置，用于指定时间维度，是动态柱状图的核心配置
   * 通过播放器控制时间维度的播放进度，实现数据的动态更新和排序变化
   */
  player?: Player

  /**
   * @description 排序配置，动态柱状图通常需要根据数值动态排序
   * 控制柱子在X轴上的排序方式
   */
  sort?: Sort

  /**
   * @description 分页配置，用于处理数据量较大的场景
   */
  page?: Page

  /**
   * @description 背景颜色配置
   */
  backgroundColor?: BackgroundColor

  /**
   * @description 颜色配置，用于区分不同的维度或指标
   */
  color?: Color

  /**
   * @description 标签配置，用于在柱子上显示数据标签
   */
  label?: Label

  /**
   * @description 图例配置
   */
  legend?: Legend

  /**
   * @description 提示信息配置，用于鼠标悬停时展示详细信息
   */
  tooltip?: Tooltip

  /**
   * @description 框选配置，用于支持框选交互
   */
  brush?: Brush

  /**
   * @description X轴配置，为类目轴，展示维度值，柱子竖向排列
   */
  xAxis?: XBandAxis

  /**
   * @description Y轴配置，为数值轴，展示指标值
   */
  yAxis?: YLinearAxis

  /**
   * @description 十字线配置，用于展示数据的精确值
   */
  crosshairRect?: CrosshairRect

  /**
   * @description 柱图圆角的数值或数组，默认启用。当 stackCornerRadius 为 false 时，每个图元独立绘制圆角；为 true 时，通过 clip 裁剪整组堆叠柱体。数值设置所有角，数组按左上、右上、右下、左下排列，数据为负值时圆角方向自动翻转。设为 0 可关闭。barStyle.barRadius 可覆盖单个图元的圆角；stackCornerRadius 为 true 时，整组圆角统一使用 cornerRadius，不受 barStyle.barRadius 影响。
   * @default [4, 4, 0, 0]
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
   * @description 矩形的最大宽度配置
   */
  barMaxWidth?: BarMaxWidth

  /**
   * @description 图例排序配置
   */
  sortLegend?: SortLegend

  /**
   * @description 主题配置
   */
  theme?: Theme

  /**
   * @description 柱形样式配置，可以为单个样式或数组形式
   */
  barStyle?: BarStyle | BarStyle[]

  /**
   * @description 标注点配置，用于在特定数据点上添加标记
   */
  annotationPoint?: AnnotationPoint | AnnotationPoint[]

  /**
   * @description 数值标注线，竖向标注线，标记特定的X轴数值
   */
  annotationVerticalLine?: AnnotationVerticalLine | AnnotationVerticalLine[]

  /**
   * @description 维度值标注线，横向标注线，标记特定的Y轴类别
   */
  annotationHorizontalLine?: AnnotationHorizontalLine | AnnotationHorizontalLine[]

  /**
   * @description 标注区域配置，用于突出显示特定的数据范围
   */
  annotationArea?: AnnotationArea | AnnotationArea[]

  /**
   * @description 维度联动配置，支持多个图表间的维度联动交互
   */
  dimensionLinkage?: DimensionLinkage

  /**
   * @description 语言配置
   */
  locale?: Locale
}
