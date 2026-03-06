import { z } from 'zod'
import { zDatum, type Datum } from '../properties'

export type ValueSelector = string | number

export type PartialDatumSelector = Datum

/**
 * @description 字段选择器，用于直接选择指定字段（列），不涉及条件判断
 */
export type FieldSelector = {
  /**
   * @description 字段名，可以是单个字段或多个字段数组
   * @example 单个字段
   * field: 'sales'
   * @example 多个字段
   * field: ['sales', 'profit', 'revenue']
   */
  field: string | string[]
}

/**
 * @description 指标选择器, 用于选择数据项中指标字段的值
 */
export type MeasureSelector = {
  /**
   * @description 指标字段, measures 某一项的 id
   */
  field: string
  /**
   * @description 操作符
   * - =: 选择数据项中指标字段的值等于 value 的数据项
   * - ==: 选择数据项中指标字段的值等于 value 的数据项
   * - !=: 选择数据项中指标字段的值不等于 value 的数据项
   * - >: 选择数据项中指标字段的值大于 value 的数据项
   * - <: 选择数据项中指标字段的值小于 value 的数据项
   * - >=: 选择数据项中指标字段的值大于等于 value 的数据项
   * - <=: 选择数据项中指标字段的值小于等于 value 的数据项
   * - between: 选择数据项中指标字段的值在 value 之间的 data item
   */
  operator?: '=' | '==' | '!=' | '>' | '<' | '>=' | '<=' | 'between'
  /**
   * @description 操作符
   * - =: 选择数据项中指标字段的值等于 value 的数据项, 会将值转换为字符串后进行比较, 因此 1 == "1" 为 true
   * - ==: 选择数据项中指标字段的值精准等于 value 的数据项, 不会做任何特殊处理, 因此 1 == "1" 为 false
   * - !=: 选择数据项中指标字段的值不等于 value 的数据项
   * - >: 选择数据项中指标字段的值大于 value 的数据项
   * - <: 选择数据项中指标字段的值小于 value 的数据项
   * - >=: 选择数据项中指标字段的值大于等于 value 的数据项
   * - <=: 选择数据项中指标字段的值小于等于 value 的数据项
   * - between: 选择数据项中指标字段的值在 value 之间的 data item
   * same as operator
   */
  op?: '=' | '==' | '!=' | '>' | '<' | '>=' | '<=' | 'between'
  /**
   * @description 选择数据项中指标字段的值
   * - 仅 op 为 between 时, value 为长度为2的数组, 数组中的元素为指标字段的最小值和最大值
   * - 其他情况, value 为指标字段的单个值
   */
  value: string | number | Array<string | number>
  // /**
  //  * @description 是否使用原始数据进行数据匹配, 开启后会有更多的数据被匹配到
  //  * 若下述数据, measures 仅设置了 value, field 为 isHigh 或 isLow, op 为 =, value 为 1,
  //  * 关闭useOrigin时, 数据项并不会考虑measures之外的字段, 因此field为isHigh或isLow的字段会被忽略
  //  * 开启useOrigin时, 会直接使用整个数据项进行匹配
  //  * [
  //  *  {value: 100, isHigh: 1, isLow: 0},
  //  *  {value: 200, isHigh: 0, isLow: 1},
  //  *  {value: 300, isHigh: 1, isLow: 0},
  //  * ]
  //  * @default false
  //  */
  // useOrigin?: boolean
}

/**
 * @description 维度选择器, 用于选择数据项中维度字段的值
 */
export type DimensionSelector = {
  /**
   * @description 维度字段, dimensions 某一项的 id
   */
  field: string
  /**
   * @description 操作符
   * - in: 选择数据项中维度字段的值在 value 中的数据项
   * - not in: 选择数据项中维度字段的值不在 value 中的数据项
   */
  operator?: 'in' | 'not in'
  /**
   * @description 操作符
   * - in: 选择数据项中维度字段的值在 value 中的数据项
   * - not in: 选择数据项中维度字段的值不在 value 中的数据项
   * same as operator
   */
  op?: 'in' | 'not in'
  /**
   * @description 选择数据项中维度字段的值, 支持数组
   */
  value: string | number | Array<string | number>
  // /**
  //  * @description 是否使用原始数据进行数据匹配, 开启后会有更多的数据被匹配到
  //  * 若下述数据, dimensions 仅设置了 name, field 为 name, op 为 =, value 为 "high",
  //  * 关闭useOrigin时, 数据项并不会考虑dimensions之外的字段, 因此field为name的字段会被忽略
  //  * 开启useOrigin时, 会直接使用整个数据项进行匹配
  //  * [
  //  *  {name: "low", isHigh: "false", isLow: "true"},
  //  *  {name: "low", isHigh: "false", isLow: "true"},
  //  *  {name: "high", isHigh: "true", isLow: "false"},
  //  * ]
  //  * @default false
  //  */
  // useOrigin?: boolean
}

export type Selector = ValueSelector | PartialDatumSelector | MeasureSelector | DimensionSelector

export type AreaSelector = MeasureSelector | DimensionSelector

export type AreaSelectors = Array<AreaSelector>

export type Selectors = Array<Selector>

/**
 * 行索引与字段组合的数据结构
 * @description 用于表示动态筛选器返回的结果，指向原始数据中特定行的特定字段
 */
export type RowWithFieldRes = {
  /**
   * 原始数据项的行索引
   * @description 从 0 开始计数，对应数据源中数据项的位置
   */
  __row_index: number
  /**
   * 字段名称
   * @description
   * - 具体字段名：表示该行中的某个特定字段
   * - '*'：表示该行的所有字段（整行）
   */
  field: string | '*'
}

/**
 * 部分数据项结果
 * @description 用于表示动态筛选器返回的部分数据项
 */
export type PartialDatumRes = Datum

export type DynamicFilterExecutionResult<T> = {
  success: boolean
  data?: T[]
  error?: string
}

/**
 * 表格动态筛选器配置
 * @description 通过 AI 生成的 JavaScript 代码实现表格单元格级别的精确筛选
 * @environment 仅支持浏览器环境（需要 Web Worker），Node.js 环境将使用 fallback
 */
export interface TableDynamicFilter {
  type: 'row-with-field'
  /**
   * 用户的筛选需求描述（自然语言）
   * @example "高亮销售额大于1000的单元格"
   * @example "高亮每行中最大值所在的单元格"
   */
  description?: string

  /**
   * AI 生成的 JavaScript 筛选代码
   * @description
   * - 只能使用内置工具函数（通过 _ 或 R 访问）
   * - 输入参数: data (数组)，每个 item 包含 _index 字段表示行号
   * - 必须返回单元格选择器数组: Array<{ __row_index: number, field: string }>
   * - field 为 "*" 时表示整行高亮
   * - 禁止使用: eval, Function, 异步操作, DOM API, 网络请求
   *
   * @example Top N 筛选
   * dynamicFilter = {
   *   type: 'row-with-field',
   *   description: '高亮销售额最高的前3个产品',
   *   code: `
   *     const sorted = _.sortBy(data, 'sales');
   *     const reversed = [...sorted].reverse();
   *     const result = _.take(reversed, 3);
   *     return _.flatten(
   *       _.map(result, item => [
   *         { __row_index: item._index, field: 'product' },
   *         { __row_index: item._index, field: 'sales' }
   *       ])
   *     );
   *   `,
   *   enabled: true
   * }
   *
   * @example 多条件筛选
   * dynamicFilter = {
   *   type: 'row-with-field',
   *   description: '高亮利润率大于20%且销售额超过5000的产品',
   *   code: `
   *     const matched = _.filter(data, item => {
   *       const profitRate = (item.profit / item.sales) * 100;
   *       return profitRate > 20 && item.sales > 5000;
   *     });
   *     return _.flatten(
   *       _.map(matched, item => [
   *         { __row_index: item._index, field: 'product' },
   *         { __row_index: item._index, field: 'sales' }
   *       ])
   *     );
   *   `,
   *   enabled: true
   * }
   *
   * @example 相对值筛选
   * dynamicFilter = {   *
   *   type: 'row-with-field',
   *   description: '高亮销售额高于平均值的产品',
   *   code: `
   *     const avgSales = _.meanBy(data, 'sales');
   *     const matched = _.filter(data, item => item.sales > avgSales);
   *     return _.flatten(
   *       _.map(matched, item => [
   *         { __row_index: item._index, field: 'product' },
   *         { __row_index: item._index, field: 'sales' }
   *       ])
   *     );
   *   `,
   *   enabled: true
   * }
   *
   * @example 分组筛选
   * dynamicFilter = {
   *  type: 'row-with-field',
   *  description: '每个区域中销售额最高的产品',
   *  code: `
   *     const grouped = _.groupBy(data, 'region');
   *     const topByRegion = _.map(_.values(grouped), group => _.maxBy(group, 'sales'));
   *     return _.flatten(
   *       _.map(topByRegion, item => [
   *         { __row_index: item._index, field: 'product' },
   *         { __row_index: item._index, field: 'sales' }
   *       ])
   *     );
   *   `,
   *   enabled: true
   * }
   *
   * @example 整行高亮
   * dynamicFilter = {
   *   description: '高亮销售额大于利润的整行',
   *   code: `
   *     const matched = _.filter(data, item => item.sales > item.profit);
   *     return matched.map(item => ({
   *       __row_index: item._index,
   *       field: '*'
   *     }));
   *   `,
   *   enabled: true
   * }
   */
  code: string

  /**
   * 代码执行失败或环境不支持时的降级方案
   */
  fallback?: Selector | Selectors

  /**
   * 动态筛选执行结果（运行期字段）
   * @description prepare() 阶段写入，运行时只读
   */
  result?: DynamicFilterExecutionResult<RowWithFieldRes>
}

/**
 * 图表动态筛选器配置
 * @description 通过 AI 生成的 JavaScript 代码实现图表标记（柱子、点等）的筛选
 * @environment 仅支持浏览器环境（需要 Web Worker），Node.js 环境将使用 fallback
 */
export interface ChartDynamicFilter {
  type: 'row-with-field'
  /**
   * 用户的筛选需求描述（自然语言）
   * @example "高亮销售额大于1000的柱子"
   * @example "高亮每个区域中利润率最高的柱子"
   */
  description?: string

  /**
   * AI 生成的 JavaScript 筛选代码
   * @description
   * - 只能使用内置工具函数（通过 _ 或 R 访问）
   * - 输入参数: data (数组)，每个 item 包含 __row_index 字段表示行号
   * - 必须返回行索引与字段组合的数组: Array<{ __row_index: number, field: string }>
   * - __row_index 表示原始数据项的行号，field 表示需要高亮的字段
   * - 禁止使用: eval, Function, 异步操作, DOM API, 网络请求
   *
   * @example 高亮销售额大于1000的数据项的 sales 字段
   * ```javascript
   * const filtered = _.filter(data, item => item.sales > 1000);
   * return _.map(filtered, item => ({
   *   __row_index: item.__row_index,
   *   field: 'sales'
   * }));
   * ```
   *
   * @example 高亮每个区域中利润率最高的数据项
   * ```javascript
   * const grouped = _.groupBy(data, 'area');
   * const maxItems = _.map(grouped, group =>
   *   _.maxBy(group, item => item.profit / item.sales)
   * );
   * return _.flatten(
   *   _.map(maxItems, item => [
   *     { __row_index: item.__row_index, field: 'product' },
   *     { __row_index: item.__row_index, field: 'profit' }
   *   ])
   * );
   * ```
   *
   * @example 高亮多条件筛选的数据项
   * ```javascript
   * const filtered = _.filter(data, item => {
   *   const profitRate = item.profit / item.sales;
   *   return profitRate > 0.2 && item.sales > 5000;
   * });
   * return _.flatten(
   *   _.map(filtered, item => [
   *     { __row_index: item.__row_index, field: 'product' },
   *     { __row_index: item.__row_index, field: 'sales' }
   *   ])
   * );
   * ```
   */
  code: string

  /**
   * 代码执行失败或环境不支持时的降级方案
   */
  fallback?: Selector | Selectors

  /**
   * 动态筛选执行结果（运行期字段）
   * @description prepare() 阶段写入，运行时只读
   */
  result?: DynamicFilterExecutionResult<RowWithFieldRes>
}

export interface ValueDynamicFilter {
  type: 'value'
  /**
   * 用户的筛选需求描述（自然语言）
   * @example "获取销售额最高的值作为标注线参考"
   * @example "计算平均销售额用于标注线"
   */
  description?: string

  /**
   * AI 生成的 JavaScript 筛选代码
   * @description
   * - 只能使用内置工具函数（通过 _ 或 R 访问）
   * - 输入参数: data (数组)
   * - 必须返回单个数值或字符串: number | string
   * - 适用场景：标注线（水平线、垂直线）需要的动态数值
   * - 禁止使用: eval, Function, 异步操作, DOM API, 网络请求
   *
   * @example 获取销售额最大值作为标注线值
   * ```javascript
   * const maxSales = _.maxBy(data, 'sales')?.sales;
   * return maxSales || 0;
   * ```
   *
   * @example 计算平均值用于标注线
   * ```javascript
   * const avgSales = _.meanBy(data, 'sales');
   * return _.round(avgSales, 2);
   * ```
   *
   * @example 获取分位数作为标注线
   * ```javascript
   * const sorted = _.sortBy(data, 'sales');
   * const index = Math.floor(sorted.length * 0.75);
   * return sorted[index]?.sales || 0;
   * ```
   *
   * @example 根据条件计算目标值
   * ```javascript
   * const currentYearTotal = _.sumBy(
   *   _.filter(data, item => item.year === 2024),
   *   'sales'
   * );
   * return currentYearTotal;
   * ```
   */
  code: string

  /**
   * 代码执行失败或环境不支持时的降级方案
   */
  fallback?: string | number

  /**
   * 动态筛选执行结果（运行期字段）
   * @description prepare() 阶段写入，运行时只读
   */
  result?: {
    success: boolean
    data?: number | string
  }
}

export const zPartialSelector = zDatum

export const zFieldSelector = z.object({
  field: z.union([z.string(), z.array(z.string())]),
})

export const zMeasureSelector = z.object({
  field: z.string(),
  operator: z.enum(['=', '==', '!=', '>', '<', '>=', '<=', 'between']).nullish(),
  op: z.enum(['=', '==', '!=', '>', '<', '>=', '<=', 'between']).nullish(),
  value: z.union([z.string(), z.number(), z.array(z.union([z.string(), z.number()]))]),
})

export const zDimensionSelector = z.object({
  field: z.string(),
  operator: z.enum(['in', 'not in']).nullish(),
  op: z.enum(['in', 'not in']).nullish(),
  value: z.union([z.string(), z.number(), z.array(z.union([z.string(), z.number()]))]),
})

export const zSelector = z.union([
  z.string(),
  z.number(),
  zFieldSelector,
  zMeasureSelector,
  zDimensionSelector,
  zPartialSelector,
])

export const zSelectors = z.array(zSelector)

export const zAreaSelector = z.union([zFieldSelector, zMeasureSelector, zDimensionSelector])

export const zAreaSelectors = z.array(zAreaSelector)

export const zCellSelector = z.object({
  __row_index: z.number(),
  field: z.union([z.string(), z.literal('*')]),
})

export const zTableDynamicFilter = z.object({
  type: z.literal('row-with-field'),
  description: z.string().optional(),
  code: z.string(),
  fallback: z.union([zSelector, zSelectors]).optional(),
  result: z
    .object({
      success: z.boolean(),
      data: z.array(zCellSelector).optional(),
    })
    .optional(),
})

export const zChartDynamicFilter = z.object({
  type: z.literal('row-with-field'),
  description: z.string().optional(),
  code: z.string(),
  fallback: z.union([zSelector, zSelectors]).optional(),
  result: z
    .object({
      success: z.boolean(),
      data: z.array(zCellSelector).optional(),
    })
    .optional(),
})

export const zValueDynamicFilter = z.object({
  type: z.literal('value'),
  description: z.string().optional(),
  code: z.string(),
  fallback: z.union([z.string(), z.number()]).optional(),
  result: z
    .object({
      success: z.boolean(),
      data: z.union([z.number(), z.string()]).optional(),
    })
    .optional(),
})

/**
 * @deprecated 请使用 zTableDynamicFilter 或 zChartDynamicFilter
 */
export const zDynamicFilter = z.union([zTableDynamicFilter, zChartDynamicFilter])
