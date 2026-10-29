import { type Locale } from '../../i18n'
import type { BodyCellStyle, DimensionTree, MeasureTree, Page, TotalType } from '../../properties'
import { type BackgroundColor, type Dataset, type Theme } from '../../properties'
/**
 * @description 表格，适用于详细数据展示场景，行列分明，便于查看具体数值
 * 适用场景:
 * - 需要展示详细数据明细
 * - 数据项需要精确比对
 * - 展示多维度数据属性
 * @encoding
 * 仅支持配置维度树与指标树, 默认encoding到column
 * @warning
 * 数据要求:
 * - 至少1个维度字段
 * - 至少1个度量字段
 * - 维度字段会作为表格的列标题
 * 默认开启的功能:
 * - 默认开启排序、筛选、分页功能
 * @recommend
 * - 推荐字段配置: `任意`个指标, `任意`个维度
 * - 支持数据重塑: 至少`任意`个指标, `任意`个维度
 */
export interface Table {
  /**
   * @description 标准表格组件，用于展示详细数据
   * @type {'table'}
   * @example 'table'
   */
  chartType: 'table'
  /**
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, 一个字段对应一列, 一个记录对应一行
   * @type {Array<Record<string|number, any>>}
   * @example [{id: 1, name: "A", value: 100}, {id: 2, name: "B", value: 200}]
   */
  dataset: Dataset

  /**
   * @description 表格的每个维度会对应一列
   * @type {Dimensions}
   * @example [{id: "name", alias: "名称"}]
   */
  dimensions?: DimensionTree

  /**
   * @description 表格的每个指标会对应一行, 并且天生支持指标组合.
   * @type {MeasureTree}
   * @example [{id: "value", alias: "数值"}]
   */
  measures?: MeasureTree

  /**
   * @description 分页配置, 用于指定分页的字段名, 必须是维度
   */
  page?: Page

  /**
   * @default transparent 默认为透明背景
   * @description 背景颜色可以是颜色字符串, 例如'red', 'blue', 也可以是hex, rgb或rgba'#ff0000', 'rgba(255,0,0,0.5)'
   */
  backgroundColor?: BackgroundColor

  /**
   * @description 表格的边框颜色
   */
  borderColor?: string
  /**
   * @description 表格体的字体大小
   */
  bodyFontSize?: number
  /**
   * @description 表格体的字体颜色
   */
  bodyFontColor?: string
  /**
   * @description 表格体的背景颜色
   */
  bodyBackgroundColor?: string
  /**
   * @description 表格体的默认行高, 单位为px, 配合heightMode为'standard'时使用固定行高
   */
  rowHeight?: number
  /**
   * @description 列表头的字体大小
   */
  headerFontSize?: number
  /**
   * @description 列表头的字体颜色
   */
  headerFontColor?: string
  /**
   * @description 列表头的背景颜色
   */
  headerBackgroundColor?: string
  /**
   * @description 列表头的默认行高, 单位为px
   */
  headerRowHeight?: number
  /**
   * @description 鼠标悬浮在列表头的单元格时的背景颜色, 用于突出显示鼠标所在的单元格
   */
  hoverHeaderBackgroundColor?: string
  /**
   * @description 鼠标悬浮在列表头的时, 整行的单元格的背景颜色, 用于突出显示鼠标所在的行
   */
  hoverHeaderInlineBackgroundColor?: string
  /**
   * @description 选中的单元格的边框颜色, 用于突出显示选中的单元格
   */
  selectedBorderColor?: string
  /**
   * @description 选中的单元格的背景颜色, 用于突出显示选中的单元格
   */
  selectedBackgroundColor?: string
  /**
   * @description 设置表格正文部分单元格的特殊样式
   */
  bodyCellStyle?: BodyCellStyle | BodyCellStyle[]

  /**
   * @description 单元格内容是否自动换行
   * @default true
   */
  autoWrapText?: boolean
  /**
   * @description 表格的空值显示文本, 用于替换正文和汇总中的null、undefined及非有限数值, 不影响0和空字符串
   * @example '—'
   */
  emptyCellText?: string

  /**
   * @description 显示汇总行的类型，仅对度量列生效
   * - 'sum': 显示求和行
   * - 'avg': 显示平均值行
   * - 'max': 显示最大值行
   * - 'min': 显示最小值行
   * - 'count': 显示计数行
   * @example 'sum'
   */
  totals?: TotalType

  /**
   * @description 表格宽度的计算方式
   * - 'standard': 使用配置的列宽
   * - 'adaptive': 根据容器宽度自适应
   * - 'autoWidth': 根据单元格内容计算列宽
   * @default 'standard'
   */
  widthMode?: 'standard' | 'adaptive' | 'autoWidth'
  /**
   * @description 表格高度的计算方式
   * - 'standard': 使用配置的行高
   * - 'adaptive': 根据容器高度自适应
   * - 'autoHeight': 根据单元格内容计算行高
   * @default 'autoHeight'
   */
  heightMode?: 'standard' | 'adaptive' | 'autoHeight'
  /**
   * @description 列宽总和小于容器宽度时, 是否自动填满容器
   */
  autoFillWidth?: boolean

  /**
   * @default light 默认为亮色主题
   * @description 图表的主题, 主题是优先级较低的功能配置, 包含所有图表类型共用的通用配置, 与单类图表类型共用的图表配置, 内置light与dark两种主题, 用户可以通过Builder自定义主题
   * @example 'dark'
   * @example 'light'
   * @example 'customThemeName'
   */
  theme?: Theme

  /**
   * @description 图表语言配置, 支持'zh-CN'与'en-US'两种语言, 另外可以调用 intl.setLocale('zh-CN') 方法设置语言
   * @default 'zh-CN'
   */
  locale?: Locale
}
