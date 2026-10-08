import type { Locale } from '../../i18n'
import type {
  AnnotationArea,
  AnnotationHorizontalLine,
  AnnotationPoint,
  AnnotationVerticalLine,
  AreaStyle,
  BackgroundColor,
  Brush,
  BarGapInGroup,
  BarMaxWidth,
  BarStyle,
  Color,
  CrosshairRect,
  CornerRadius,
  StackCornerRadius,
  Dataset,
  DimensionLinkage,
  DualAxisDimension,
  DualAxisMeasure,
  Label,
  Legend,
  Page,
  LineStyle,
  PointStyle,
  Sort,
  SortLegend,
  Theme,
  Tooltip,
  XBandAxis,
  YLinearAxis,
} from '../../properties'

/**
 * @description 双轴图，适用于展示两个不同量级或不同单位指标的对比关系，包含主坐标轴和次坐标轴
 * 适用场景:
 * - 不同量级指标的对比分析
 * - 相关性指标的趋势比较
 * - 需要同时展示数值和增长率等复合指标
 * - 支持不同类型图表组合（如折线图+柱状图/ 折线图+面积图/ 面积图+柱状图）
 * @encoding
 * 双轴图支持以下视觉通道:
 * `xAxis`          : x轴通道, 支持`多个维度`, 按维度值映射至x轴
 * `primaryYAxis`   : 主轴y轴通道, 支持`多个指标`, 将指标映射至主轴
 * `secondaryYAxis` : 次轴y轴通道, 支持`多个指标`, 将指标映射至次轴
 * `detail`         : 细分通道, 支持`多个维度`, 在同一个颜色系列下展示更细粒度的数据时使用
 * `color`          : 颜色通道, 支持`多个维度`或 `一个指标`, 维度颜色用于区分不同的数据系列, 指标颜色用于线性映射指标值到图形颜色
 * `tooltip`        : 提示通道, 支持`多个维度`与 `多个指标`, 会在鼠标悬停在数据点上时展示
 * `label`          : 标签通道, 支持`多个维度`与 `多个指标`, 会在数据点上展示数据标签
 * @warning
 * 数据要求:
 * - 至少1个指标字段（度量）
 * - 支持指标组, 第一组指标会放置(主轴)左轴, 第二组指标会放置(次轴)右轴
 * - 第一个维度会放至X轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
 * - 两组指标字段可分别映射到左右两个Y轴, 一个指标组内的所有会自动合并为一个指标
 * 默认开启的功能:
 * - 默认开启坐标轴、图例、数据标签、提示信息
 * @recommend
 * - 推荐字段配置: `2`个指标, `2`个维度
 * - 支持数据重塑: 至少`1`个指标, `0`个维度
 */
export interface DualAxis {
  /**
   * @description 双轴图，展示两个不同量级指标对比关系的复合图表
   * @example 'dualAxis'
   */
  chartType: 'dualAxis'

  /**
   * @description 数据集, 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 双轴图的数据最终会被转换为2个维度, 1或2个指标(取决于用户是否配置了指标组).
   * @example [{month:'1月', value:100, growth:0.2}, {month:'2月', value:150, growth:0.5}]
   */
  dataset: Dataset

  /**
   * @description 维度, 第一个维度会放至X轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
   * @example [{id: 'month', alias: '月份'}]
   */
  dimensions?: DualAxisDimension[]

  /**
   * @description 双轴图指标
   * 对于encoding中映射到primaryYAxis和secondaryYAxis的指标,
   * 可以通过设置`parentId`属性, 将指标进行分组，不同分组的指标会显示到不同子图中，
   * 也可以设置`chartType`属性，来指定不同指标组的图表类型。
   * @example [{ id: 'value', encoding: 'primaryYAxis' }, { id: 'growth', encoding: 'secondaryYAxis' }]
   */
  measures?: DualAxisMeasure[]

  /**
   * @description 分页配置
   */
  page?: Page

  /**
   * @description 用于定义双轴图的两根轴的刻度是否对齐, 当measures有多组时, alignTicks可以配置为数组, 每项对应一个双轴图的刻度是否对齐.
   * @example {"chartType":"dualAxis","dataset":[{"date":"2019","profit":10,"sales":100},{"date":"2020","profit":30,"sales":200},{"date":"2021","profit":30,"sales":300},{"date":"2022","profit":50,"sales":500}],"alignTicks":[false,true],"dualMeasures":[{"primaryMeasures":[{"id":"profit"}],"secondaryMeasures":[{"id":"sales"}]},{"primaryMeasures":[{"id":"profit"}],"secondaryMeasures":[{"id":"sales"}]}]}
   */
  alignTicks?: boolean | boolean[]

  /**
   * @description 双轴图的主Y轴配置, 用于定义双轴图的主Y轴, 包括主Y轴的位置, 样式等. 当measures有多组时, primaryYAxis可以配置为数组, 每项对应一个双轴图的主Y轴.
   */
  primaryYAxis?: YLinearAxis | YLinearAxis[]

  /**
   * @description 双轴图的次Y轴配置, 用于定义双轴图的次Y轴, 包括次Y轴的位置, 样式等. 当measures有多组时, secondaryYAxis可以配置为数组, 每项对应一个双轴图的次Y轴.
   */
  secondaryYAxis?: YLinearAxis | YLinearAxis[]

  /**
   * @description x轴, 类目轴, x轴配置, 用于定义图表的x轴, 包括x轴的位置, 格式, 样式等.
   */
  xAxis?: XBandAxis

  /**
   * @default transparent 默认为透明背景
   * @description 图表的背景颜色, 背景颜色可以是颜色字符串, 例如'red', 'blue', 也可以是hex, rgb或rgba'#ff0000', 'rgba(255,0,0,0.5)'
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
   * 垂直提示框
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
   * @description X轴排序配置, 支持根据维度或指标排序, 以及自定义排序顺序
   * @example
   * sort: {
   *   orderBy: 'profit',
   *   order: 'asc',
   * }
   * sort: {
   *   customOrder:['2019', '2020', '2021']
   * }
   */
  sort?: Sort
  /**
   * @description 图例排序配置, 支持根据维度或指标排序, 以及自定义排序顺序
   * @example
   * sortLegend: {
   *   orderBy: 'profit',
   *   order: 'asc',
   * }
   * sortLegend: {
   *   customOrder:['2019', '2020', '2021']
   * }
   */
  sortLegend?: SortLegend

  /**
   * @description 图表的主题, 主题是优先级较低的功能配置, 包含所有图表类型共用的通用配置, 与单类图表类型共用的图表配置, 内置light与dark两种主题, 用户可以通过Builder自定义主题
   * @default light 默认为亮色主题
   * @example 'dark'
   * @example 'light'
   * @example 'customThemeName'
   */
  theme?: Theme
  /**
   * @description 柱子的最大宽度，可以是像素值或者百分比字符串
   */
  barMaxWidth?: BarMaxWidth
  /**
   * @description 同一分类下，柱子之间的距离，可以是像素值或者百分比字符串
   */
  barGapInGroup?: BarGapInGroup
  /**
   * 矩形图元样式
   * @description 条形图样式配置, 用于定义图表的条形图样式, 包括条形图的颜色, 边框, 圆角等.
   * 支持全局样式或条件样式配置
   * 数据筛选器
   * 若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
   * 若未配置selector, 则样式全局生效.
   */
  barStyle?: BarStyle | BarStyle[]
  /**
   * 线图元样式
   * @description 线图元样式配置, 用于定义图表的线图元样式, 包括线图元的颜色, 透明度, 曲线等.
   * 支持全局样式或条件样式配置
   * 数据筛选器
   * 若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
   * 若未配置selector, 则样式全局生效.
   */
  lineStyle?: LineStyle | LineStyle[]
  /**
   * 点图元样式
   * @description 点图元样式配置, 用于定义图表的点图元样式, 包括点图元的颜色, 边框等.
   * 支持全局样式或条件样式配置
   * 数据筛选器
   * 若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
   * 若未配置selector, 则样式全局生效.
   */
  pointStyle?: PointStyle | PointStyle[]
  /**
   * 面积图元样式
   * @description 面积图元样式配置, 用于定义图表的面积图元样式, 包括面积图元的颜色, 透明度, 边框等.
   * 支持全局样式或条件样式配置
   * 数据筛选器
   * 若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
   * 若未配置selector, 则样式全局生效.
   */
  areaStyle?: AreaStyle | AreaStyle[]

  /**
   * @description 标注点配置, 根据选择的数据, 定义图表的标注点, 包括标注点的位置, 格式, 样式等.
   */
  annotationPoint?: AnnotationPoint | AnnotationPoint[]
  /**
   * @description 维度值标注线，竖直方向展示，能够设置标注线的位置, 样式等
   */
  annotationVerticalLine?: AnnotationVerticalLine | AnnotationVerticalLine[]

  /**
   * @description 数值标注线(包括均值线、最大值线、最小值线等)，水平方向展示，能够设置标注线的位置, 样式等，如需绘制均值线等数值对应的标注线请使用该配置
   */
  annotationHorizontalLine?: AnnotationHorizontalLine | AnnotationHorizontalLine[]

  /**
   * @description 标注区域配置, 根据选择的数据, 定义图表的标注区域, 包括标注区域的位置, 样式等.
   */
  annotationArea?: AnnotationArea | AnnotationArea[]
  /**
   * @description 当图表开启透视功能或者指标组合的是否，是否开启维度联动功能
   * 当hover 到某个维度值时，联动高亮其他图表中相同维度值的数据
   */
  dimensionLinkage?: DimensionLinkage

  /**
   * @description 国际化配置, 图表语言配置, 支持'zh-CN'与'en-US'两种语言, 另外可以调用 intl.setLocale('zh-CN') 方法设置语言
   * @default 'zh-CN'
   */
  locale?: Locale
}
