import type { Selector, Selectors } from '../../dataSelector/selector'

export type BoxPlotStyle = {
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
   * @description boxPlot图元是否可见
   */
  boxVisible?: boolean
  /**
   * @description boxPlot图元颜色
   * @type {string}
   */
  boxColor?: string
  /**
   * @description boxPlot图元颜色透明度
   * @type {number}
   */
  boxColorOpacity?: number
  /**
   * @description boxPlot图元边框颜色
   * @type {string}
   */
  boxBorderColor?: string
  /**
   * @description boxPlot图元边框宽度
   * @type {number}
   */
  boxBorderWidth?: number
  /**
   * @description boxPlot图元边框透明度
   * @type {number}
   */
  boxBorderOpacity?: number
  /**
   * @description 箱体的圆角大小
   */
  boxCornerRadius?: number
  /**
   * @description 中位数线的颜色
   */
  medianBorderColor?: string
  /**
   * @description 盒须线的颜色
   */
  whiskerBorderColor?: string
}
