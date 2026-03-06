import { z } from 'zod'
import type { FieldSelector, TableDynamicFilter } from '../../dataSelector'
import {
  zFieldSelector,
  zSelector,
  zSelectors,
  zTableDynamicFilter,
  type Selector,
  type Selectors,
} from '../../dataSelector'

export type BodyCellStyle = {
  /**
   * 数据选择器
   * @description
   * 若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
   * 若未配置selector, 则样式全局生效.
   *
   * 注意: selector 和 dynamicFilter 不能同时使用，dynamicFilter 优先级更高
   *
   * @type {Selector | Selectors}
   * @example 数值选择器
   * selector = "tool"
   * selector = ["tool", "book"]
   * selector = 100
   * selector = [100, 200]
   * @example 局部数据选择器
   * selector = { profit: 100 }
   * selector = [{ profit: 100 }, { profit: 200 }]
   * @example 条件维度选择器
   * selector = {
   *  field: 'category',
   *  operator: 'in',
   *  value: 'tool'
   * }
   * selector = {
   *  field: 'category',
   *  operator: 'not in',
   *  value: 'book'
   * }
   * @example 条件指标选择器
   * selector = {
   *  field: 'profit',
   *  operator: '>=',
   *  value: 100
   * }
   * selector = {
   *  field: 'profit',
   *  operator: 'between'
   *  value: [100, 300]
   * }
   * @example 字段列筛选
   * selector = {
   *  field: 'category'
   * }
   * selector = {
   *  field: ['category', 'profit']
   * }
   */
  selector?: Selector | Selectors | FieldSelector
  /**
   * 动态筛选器（代码驱动）
   * @description
   * 通过 AI 生成的 JavaScript 代码实现复杂数据筛选逻辑
   * 适用于 Top N、统计分析、复杂条件等静态 selector 难以表达的场景
   *
   * 核心能力:
   * - 支持任意复杂的数据筛选条件
   * - 使用 内置工具函数 进行数据操作
   * - 在浏览器环境中安全执行（Web Worker 沙箱）
   *
   * 环境要求: 仅支持浏览器环境，Node.js 环境将使用 fallback
   *
   * 注意: selector 和 dynamicFilter 不能同时使用，dynamicFilter 优先级更高
   *
   * @type {TableDynamicFilter}
   */
  dynamicFilter?: TableDynamicFilter
  /**
   * 单元格背景色
   */
  backgroundColor?: string
  /**
   * 是否开启背景色的色阶配置（color scale）
   */
  enableBackgroundColorScale?: boolean
  /**
   * 单元格背景色scale映射，优先级高于backgroundColor
   */
  backgroundColorScale?: {
    /** 最小值，不配置时默认为当前数据列中的最小值 */
    minValue?: number
    /** 最大值，不配置时默认为当前数据列中的最大值 */
    maxValue?: number
    /** 最小值对应的颜色 */
    minColor: string
    /** 最大值对应的颜色 */
    maxColor: string
  }
  /**
   * 是否开启背景数据条条（一个条形柱来显示当前单元格的大小）功能，默认不开启
   */
  enableProgressBar?: boolean
  /**
   * 当前单元格直为正数时的背景数据条颜色
   */
  barPositiveColor?: string
  /**
   * 数值为负数时的背景数据条条颜色
   */
  barNegativeColor?: string
  /**
   * 进度条最小值
   * @description 未配置时自动计算列的最小值
   */
  barMin?: number
  /**
   * 进度条最大值
   * @description 未配置时自动计算列的最大值
   */
  barMax?: number
  /**   * 单元格文字颜色
   */
  textColor?: string
  /**
   * 单元格文字大小
   */
  textFontSize?: number
  /**
   * 单元格边框颜色
   */
  borderColor?: string
  /**
   * 单元格边框线宽
   */
  borderLineWidth?: number
}

export const zBodyCellStyle = z.object({
  selector: z.union([zSelector, zSelectors, zFieldSelector]).nullish(),
  dynamicFilter: zTableDynamicFilter.nullish(),
  backgroundColor: z.string().nullish(),
  enableBackgroundColorScale: z.boolean().nullish(),
  backgroundColorScale: z
    .object({
      minValue: z.number().optional(),
      maxValue: z.number().optional(),
      minColor: z.string(),
      maxColor: z.string(),
    })
    .nullish(),
  textFontSize: z.number().nullish(),
  borderColor: z.string().nullish(),
  borderLineWidth: z.number().nullish(),
  enableProgressBar: z.boolean().nullish(),
  barMin: z.number().nullish(),
  barMax: z.number().nullish(),
  barPositiveColor: z.string().nullish(),
  barNegativeColor: z.string().nullish(),
})
