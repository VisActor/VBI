import { type Locale } from '../../i18n'
import type { BodyCellStyle, Page, TableDimension, TableMeasure, PivotTableTotals } from '../../properties'
import { type BackgroundColor, type Dataset, type Theme } from '../../properties'

/**
 * @description 透视表格，适用于多维度数据交叉分析场景，可灵活配置行、列维度和指标计算方式
 * 适用场景:
 * - 复杂多维数据统计分析
 * - 数据钻取与聚合展示
 * - 业务报表生成与数据探索
 * @encoding
 * 透视表支持以下视觉通道:
 * `row`    : 行维度, 支持`多个维度`, 按维度值在行上进行分组
 * `column` : 列维度, 支持`多个维度`, 按维度值在列上进行分组
 * `detail` : 细分通道, 支持`多个指标`, 在单元格中展示指标值
 * @warning
 * 数据要求:
 * - 至少1个行维度 或 1个列维度 或 1个指标
 * - 数据必须已聚合
 * - 数据可被分组
 * 默认开启的功能:
 * - 默认开启行列排序、数据筛选、聚合计算、小计/总计
 * @recommend
 * - 推荐字段配置: `1`个指标, `1`个维度
 * - 支持数据重塑: 至少`1`个指标, `0`个维度
 */
export interface PivotTable {
  /**
   * @description 透视表，适用于多维度数据交叉分析场景
   * @type {'pivotTable'}
   * @example 'pivotTable'
   */
  chartType: 'pivotTable'
  /**
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 透视表的数据最终会被转换对应的树形结构, 用户无需手动进行数据处理.
   * @type {Array<Record<string|number, any>>}
   * @example [{region:'华东', product:'A', sales:1000}, {region:'华东', product:'B', sales:1500}]
   */
  dataset: Dataset

  /**
   * @description 透视表的行维度和列维度，会自动对数据进行处理为树形结构, 并映射到行和列轴,
   * @type {Dimensions}
   * @example [{id: 'region', alias: '地区', isRow: true}, {id: 'product', alias: '产品', isColumn: true}]
   */
  dimensions?: TableDimension[]

  /**
   * @description 透视表支持多个维度指标
   * @type {Measures}
   * @example [{id: 'sales', alias: '销售额', aggregation: 'sum'}]
   */
  measures?: TableMeasure[]
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
   * @description 行表头、列表头的字体大小
   */
  headerFontSize?: number
  /**
   * @description 行表头、列表头的字体颜色
   */
  headerFontColor?: string
  /**
   * @description 行表头、列表头的背景颜色
   */
  headerBackgroundColor?: string
  /**
   * @description 列表头的默认行高, 单位为px
   */
  headerRowHeight?: number
  /**
   * @description 鼠标悬浮在行、列表头的单元格时的背景颜色, 用于突出显示鼠标所在的行列交叉的单元格
   */
  hoverHeaderBackgroundColor?: string
  /**
   * @description 鼠标悬浮在行、列表头的单元格时, 用于突出显示鼠标所在的行与列的所有单元格
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
   * @description 指标是否作为列展示，当为 true 时指标在列方向展开，为 false 时在行方向展开
   * @default true
   * @example true
   */
  indicatorsAsCol?: boolean

  /**
   * @description 透视表的总计和小计配置
   * @example { row: { showGrandTotals: true, showSubTotals: true, subTotalsDimensions: ['category'] } }
   */
  totals?: PivotTableTotals

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
