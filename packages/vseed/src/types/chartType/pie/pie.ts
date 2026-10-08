import type { Locale } from '../../i18n'

import type {
  BackgroundColor,
  Color,
  Dataset,
  PieDimension,
  Legend,
  PieMeasure,
  PieLabel,
  Theme,
  Tooltip,
  Page,
  PieLikeAnimation,
  PieStyle,
} from '../../properties'
import type { Brush } from '../../properties'

/**
 * @description 饼图，适用于展示单一维度数据的占比关系，通过扇形面积大小表示各类别占比
 * 适用场景:
 * - 展示分类数据的占比分布
 * - 强调数据的整体与部分关系
 * - 类别数量较少（建议不超过6个）的占比分析
 * @encoding
 * 饼图支持以下视觉通道:
 * `angle`  : 角度通道, 支持`多个指标`, 按指标值映射至扇形角度
 * `detail` : 细分通道, 支持`多个维度`, 在同一个颜色系列下展示更细粒度的数据时使用
 * `color`  : 颜色通道, 支持`多个维度`或 `一个指标`, 维度颜色用于区分不同的数据系列, 指标颜色用于线性映射指标值到图形颜色
 * `tooltip`: 提示通道, 支持`多个维度`与 `多个指标`, 会在鼠标悬停在数据点上时展示
 * `label`  : 标签通道, 支持`多个维度`与 `多个指标`, 会在数据点上展示数据标签
 * @warning
 * 数据要求:
 * - 至少1个数值字段（度量）
 * - 所有维度会与指标名称(存在多个指标时)合并成一个维度, 作为图例项展示
 * - 所有指标会自动合并为一个指标
 * 默认开启的功能:
 * - 默认开启图例、数据标签、提示信息、占比计算
 * @recommend
 * - 推荐字段配置: `1`个指标, `1`个维度
 * - 支持数据重塑: 至少`1`个指标, `0`个维度
 */
export interface Pie {
  /**
   * 饼图
   * @description 饼图，展示单一维度数据的占比关系
   * @type {'pie'}
   * @example 'pie'
   */
  chartType: 'pie'

  /** @description 外半径占可用半径的比例，范围 (0, 1]，默认 0.8。 */
  outerRadius?: number
  /** @description 内半径占可用半径的比例，范围 [0, outerRadius)。默认 0。 */
  innerRadius?: number
  /** @description 起始角度，单位为度，默认 -90。 */
  startAngle?: number
  /** @description 结束角度，默认 startAngle + 360；跨度必须在 (0, 360]。 */
  endAngle?: number
  /** @description 扇区边框、圆角和悬停效果。 */
  pieStyle?: PieStyle

  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 饼图的数据最终会被转换为1个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{category:'A', value:30}, {category:'B', value:70}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 饼图的所有维度会与指标名称(存在多个指标时)合并成一个维度, 映射到角度, 并作为图例项展示
   * @example [{id: 'category', alias: '类别'}]
   */
  dimensions?: PieDimension[]

  /**
   * 指标
   * @description 饼图的所有指标会自动合并为一个指标, 映射到半径轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示.
   * @example [{id: 'value', alias: '数值占比', format: 'percent'}]
   */
  measures?: PieMeasure[]

  /**
   * @description 分页配置, 用于指定分页的字段名, 必须是维度
   */
  page?: Page

  /**
   * 图表的背景颜色
   * @default transparent 默认为透明背景
   * @description 背景颜色可以是颜色字符串, 例如'red', 'blue', 也可以是hex, rgb或rgba'#ff0000', 'rgba(255,0,0,0.5)'
   */
  backgroundColor?: BackgroundColor

  /**
   * 颜色
   * @description 颜色配置, 用于定义图表的颜色方案, 包括颜色列表, 颜色映射, 颜色渐变等.
   */
  color?: Color

  /**
   * 标签
   * @description 标签配置, 用于定义图表的数据标签, 包括数据标签的位置, 格式, 样式等.
   */
  label?: PieLabel

  /**
   * 图例
   * @description 图例配置, 用于定义图表的图例, 包括图例的位置, 格式, 样式等.
   */
  legend?: Legend

  /**
   * 提示信息
   * @description 提示信息配置, 用于定义图表的提示信息, 包括提示信息的位置, 格式, 样式等.
   */
  tooltip?: Tooltip

  /**
   * 框选
   * @description 框选配置，用于开启/关闭 brush 框选能力
   */
  brush?: Brush
  /**
   * 动画配置
   * @description 图表动画配置，按图表类型约束可选效果
   */
  animation?: PieLikeAnimation

  /**
   * 图表的主题, 主题是优先级较低的功能配置, 包含所有图表类型共用的通用配置, 与单类图表类型共用的图表配置
   * @default light 默认为亮色主题
   * @description 内置light与dark两种主题, 用户可以通过Builder自定义主题
   * @example 'dark'
   * @example 'light'
   * @example 'customThemeName'
   */
  theme?: Theme

  /**
   * 语言
   * @description 图表语言配置, 支持'zh-CN'与'en-US'两种语言, 另外可以调用 intl.setLocale('zh-CN') 方法设置语言
   * @default 'zh-CN'
   */
  locale?: Locale
}
