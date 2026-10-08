import type { ChartDynamicFilter, Selector, Selectors } from '../../dataSelector/selector'

export type LineStyle = {
  /**
   * 数据选择器
   * @description
   * 若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
   * 若未配置selector, 则样式全局生效.
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
   */
  selector?: Selector | Selectors

  /**
   * 动态筛选器（AI生成代码执行）
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
   * @type {ChartDynamicFilter}
   */
  dynamicFilter?: ChartDynamicFilter

  /**
   * @description 线段是否可见
   */
  lineVisible?: boolean
  /**
   * @description 线段是否平滑
   * @type {boolean}
   */
  lineSmooth?: boolean

  /**
   * @description 线段颜色
   */
  lineColor?: string
  /**
   * @description 线段颜色透明度
   */
  lineColorOpacity?: number
  /**
   * @description 线段宽度
   */
  lineWidth?: number
  /**
   * @description 线段样式
   * @example `lineStyle: 'solid'`
   */
  lineStyle?: 'solid' | 'dashed' | 'dotted'
}
