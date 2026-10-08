import type { Locale } from '../../i18n'
import type {
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
  HistogramDimension,
  Label,
  Legend,
  Page,
  CornerRadius,
  StackCornerRadius,
  Theme,
  Tooltip,
  YLinearAxis,
  HistogramMeasure,
  XLinearAxis,
  KdeRegressionLine,
  EcdfRegressionLine,
  DimensionLinkage,
} from '../../properties'

/**
 * @description 直方图，适用于展示数据分布情况的场景，X轴为数值轴（连续数据），Y轴为数值轴（连续数据），柱子纵向排列
 * 适用场景:
 * - 展示数据的分布情况，如频率分布、概率分布等
 * - 分析数据的集中趋势和离散程度
 * - 识别数据中的异常值和模式
 * @encoding
 * 直方图支持以下视觉通道:
 * `xAxis`  : x轴通道, 支持`一个维度`, 按维度值分箱计算后显示到x轴
 */
export interface Histogram {
  /**
   * @description 直方图，适用于展示数据分布情况
   */
  chartType: 'histogram'
  /**
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 柱状图的数据最终会被转换为2个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{category:'A', value:100}, {category:'B', value:200}]
   */
  dataset: Dataset

  /**
   * @description 直方图通常不需要维度
   * @example [{id: "category", alias: "类别"}]
   */
  dimensions?: HistogramDimension[]

  /**
   * @description 直方图仅支持一个维度，并且数据为离散数据
   * @example [{id: "value", alias: "数值"}]
   */
  measures?: HistogramMeasure[]

  /**
   * @description 分页配置
   */
  page?: Page

  /**
   * @description 图表的背景颜色, 背景颜色可以是颜色字符串, 默认为透明背景, 例如'red', 'blue', 也可以是hex, rgb或rgba'#ff0000', 'rgba(255,0,0,0.5)'
   */
  backgroundColor?: BackgroundColor

  /**
   * @description 颜色配置, 用于定义图表的颜色方案, 包括颜色列表, 颜色映射, 颜色渐变等.
   */
  color?: Color

  /**
   * @description 标签配置, 用于定义图表的数据标签, 包括数据标签的位置, 格式, 样式等.
   */
  label?: Label

  /**
   * @description 图例配置, 用于定义图表的图例, 包括图例的位置, 格式, 样式等.
   */
  legend?: Legend

  /**
   * @description 提示信息配置, 用于定义图表的提示信息, 包括提示信息的位置, 格式, 样式等.
   */
  tooltip?: Tooltip

  /**
   * 框选
   * @description 框选配置，用于开启/关闭 brush 框选能力
   */
  brush?: Brush

  /**
   * @description x轴, 数值轴, x轴配置, 用于定义图表的x轴, 包括x轴的位置, 格式, 样式等.
   */
  xAxis?: XLinearAxis

  /**
   * @description y轴, 数值轴, y轴配置, 用于定义图表的y轴, 包括y轴的位置, 格式, 样式等.
   */
  yAxis?: YLinearAxis

  /**
   * @description 垂直提示框配置, 用于定义图表的垂直提示框, 包括垂直提示框的颜色、标签样式等.
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
   * @description 直方图分箱数量, 用于定义直方图的分箱矩形（柱子）的数量
   */
  binCount?: number

  /**
   * @description 分箱步长，用于计算分箱的宽度，也会影响最终直方图中矩形（柱子）的宽度。如果同时设置了 binCount 和 binStep，则以 binStep 为准
   */
  binStep?: number
  /**
   * @description 直方图分箱值类型, 用于定义直方图的分箱矩形（柱子）值类型, 默认为'count'
   * @default 'count'
   */
  binValueType?: 'count' | 'percentage'

  /**
   * @description 图表的主题, 主题是优先级较低的功能配置, 包含所有图表类型共用的通用配置, 与单类图表类型共用的图表配置, 内置light与dark两种主题, 用户可以通过Builder自定义主题
   * @default light 默认为亮色主题
   * @example 'dark'
   * @example 'light'
   * @example 'customThemeName'
   */
  theme?: Theme

  /**
   * @description 矩形图元样式, 柱状图样式配置, 用于定义图表的柱状图样式, 包括柱状图的颜色, 边框, 圆角等.
   * 支持全局样式或条件样式配置
   * 数据筛选器
   * 若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
   * 若未配置selector, 则样式全局生效.
   */
  barStyle?: BarStyle | BarStyle[]

  /**
   * @description 标注点配置, 根据选择的数据, 定义图表的标注点, 包括标注点的位置, 格式, 样式等.
   */
  annotationPoint?: AnnotationPoint | AnnotationPoint[]

  /**
   * @description 数值标注线(分箱值)，竖直方向展示，能够设置标注线的位置, 样式等，如需分箱值对应的标注线，可以使用该配置
   */
  annotationVerticalLine?: AnnotationVerticalLine | AnnotationVerticalLine[]

  /**
   * @description 数值标注线(包括均值线、最大值线、最小值线等)，水平方向展示，能够设置标注线的位置, 样式等，如需绘制分箱值对应的标注线请使用该配置；注意分箱值受`binValueType` 影响
   */
  annotationHorizontalLine?: AnnotationHorizontalLine | AnnotationHorizontalLine[]

  /**
   * @description 标注区域配置, 根据选择的数据, 定义图表的标注区域, 包括标注区域的位置, 样式等.
   */
  annotationArea?: AnnotationArea | AnnotationArea[]
  /**
   * @description 核密度回归线配置, 用于展示数据的趋势和分布情况
   */
  kdeRegressionLine?: KdeRegressionLine | KdeRegressionLine[]
  /**
   * @description 经验累积分布函数回归线配置, 用于展示数据的累积分布情况
   */
  ecdfRegressionLine?: EcdfRegressionLine | EcdfRegressionLine[]
  /**
   * @description 当图表开启透视功能或者指标组合的是否，是否开启维度联动功能
   * 当hover 到某个维度值时，联动高亮其他图表中相同维度值的数据
   */
  dimensionLinkage?: DimensionLinkage

  /**
   * @description 图表语言配置, 支持'zh-CN'与'en-US'两种语言, 另外可以调用 intl.setLocale('zh-CN') 方法设置语言
   * @default 'zh-CN'
   */
  locale?: Locale
}
