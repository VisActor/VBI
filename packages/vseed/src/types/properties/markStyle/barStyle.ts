import type { ChartDynamicFilter, Selector, Selectors } from '../../dataSelector/selector'

export type BarStyle = {
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
   * @description 柱图元(矩形图元)是否可见
   */
  barVisible?: boolean
  /**
   * @description 柱图元(矩形图元)颜色
   * @type {string}
   */
  barColor?: string
  /**
   * 柱体线性渐变
   * @description 开启后从零值基线透明渐变到数值末端的当前颜色，自动适配正负值和横纵方向；默认关闭。
   * @example true
   */
  barGradient?: boolean
  /**
   * @description 柱图元(矩形图元)颜色透明度
   * @type {number}
   */
  barColorOpacity?: number
  /**
   * @description 柱图元(矩形图元)边框颜色
   * @type {string}
   */
  barBorderColor?: string
  /**
   * @description 柱图元(矩形图元)边框宽度
   * @type {number}
   */
  barBorderWidth?: number
  /**
   * @description 柱图元(矩形图元)边框样式
   * @type {number}
   * @example solid
   * @example dashed
   * @example dotted
   */
  barBorderStyle?: 'solid' | 'dashed' | 'dotted'
  /**
   * @description 柱图元(矩形图元)圆角
   * @type {number | number[]}
   * @example 4
   * @example [0, 0, 10, 10]
   */
  /**
   * @description 柱图元(矩形图元)描边透明度
   * @type {number}
   */
  barBorderOpacity?: number
  /** @description 单根柱体圆角；配置后优先于堆叠外轮廓圆角，支持条件样式。 */
  barRadius?: number | number[]
}
