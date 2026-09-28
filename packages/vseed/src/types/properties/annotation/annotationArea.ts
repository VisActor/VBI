import type { AreaSelectors, AreaSelector } from '../../dataSelector/selector'
import type { AnnotationAreaRange } from './annotationAreaRange'

/**
 * @description 区域标注，selector 与 range 必须且只能配置一种。
 * selector 保留分类色带语义；range 按数值线性轴的原始坐标绘制，不依赖区域内是否存在数据点。
 * range 支持普通折线、面积、柱、条、箱线、直方图、散点图及其适用的分组/百分比变体；不支持分类/对数轴范围、双轴图、透视组合图和动态竞赛图。
 * @example { range: { y: { min: 10, max: 'axisMax' } }, text: '高危险区域', areaColor: '#ef4444', areaColorOpacity: 0.12 }
 */
export type AnnotationArea = (
  | {
      /**
       * @description selector 与 range 必须且只能配置一种。selector 依赖选择的数据确定分类色带。折线/面积使用类别中心加 outerPadding；柱/条使用完整 band 边界加 outerPadding。
       */
      selector: AreaSelector | AreaSelectors
      range?: never
    }
  | {
      selector?: never
      /**
       * @description selector 与 range 必须且只能配置一种。range 按数据坐标定义区域，至少指定 x/y 中的一项，每项都必须填写 min/max。可使用 axisMin/axisMax 表示当前轴边界。
       * 仅支持普通数值线性轴，可用于折线、面积、柱、条、箱线、直方图、散点图及其适用的分组/百分比变体；不支持分类/对数轴范围、双轴图、透视组合图和动态竞赛图。
       */
      range: AnnotationAreaRange
    }
) &
  AnnotationAreaStyle

export type AnnotationAreaStyle = {
  /**
   * @description 标注的文本
   * @default ''
   * @example '标注文本'
   */
  text?: string | string[]
  /**
   * @description 文本位置
   * @example 'top'
   */
  textPosition?: 'top' | 'topRight' | 'topLeft' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'right'

  /**
   * @description 文本颜色
   * @example 'red'
   */
  textColor?: string
  /**
   * @description 文本字体大小
   * @example 12
   */
  textFontSize?: number
  /**
   * @description 文本字体重量
   * @example 400
   */
  textFontWeight?: number
  /**
   * @description 文本对齐方式, 一般情况下, 设置为right, 文本显示在标注区域中间, 确保显示在图表的可见区域
   * 建议设置为'center', 这样可以确保文本在标注区域的中间
   * right: 文本在标注区域的左侧, 文本的右侧边缘对齐标注区域
   * left: 文本在标注区域的右侧, 文本的左侧边缘对齐标注区域
   * center: 文本在标注区域的中心, 文本的中心对齐标注区域
   * @example 'center' 文本在标注区域的中间
   */
  textAlign?: 'left' | 'right' | 'center'
  /**
   * @description 文本垂直对齐方式, 一般情况下, 设置为top, 文本显示在标注区域底部, 确保显示在图表的可见区域
   * 建议设置为'top', 这样可以确保文本完整的显示在图表的可见区域
   * top: 文本在标注区域的底部, 文本的顶部边缘对齐标注区域
   * middle: 文本在标注区域的中心, 文本的中心对齐标注区域
   * bottom: 文本在标注区域的顶部, 文本的底部边缘对齐标注区域
   * @example 'top' 文本在标注区域的底部
   */
  textBaseline?: 'top' | 'middle' | 'bottom'
  /**
   * @description 背景可见
   * @example true
   */
  textBackgroundVisible?: boolean
  /**
   * @description 背景颜色
   * @example 'red'
   */
  textBackgroundColor?: string
  /**
   * 背景边框颜色
   * @description 背景边框颜色
   * @example 'red'
   */
  textBackgroundBorderColor?: string
  /**
   * @description 背景边框宽度
   * @example 2
   */
  textBackgroundBorderWidth?: number
  /**
   * 背景边框圆角
   * @description 背景边框圆角
   * @example 4
   */
  textBackgroundBorderRadius?: number
  /**
   * @description 背景内边距
   * @example 4
   */
  textBackgroundPadding?: number
  /**
   * @description 标注区域区域颜色
   * @example 'red'
   */
  areaColor?: string
  /**
   * @description 标注区域区域颜色透明度
   * @example 0.5
   */
  areaColorOpacity?: number
  /**
   * @description 标注区域区域边框颜色
   * @example 'red'
   */
  areaBorderColor?: string
  /**
   * @description 标注区域区域边框宽度
   * @example 2
   */
  areaBorderWidth?: number
  /**
   * @description 标注区域区域边框圆角
   * @example 4
   */
  areaBorderRadius?: number
  /**
   * @description 标注区域区域边框的线型
   * @example [2, 2]
   */
  areaLineDash?: number[]
  /**
   * @description selector 分类色带的像素边距。range 模式不应用此边距，以保持精确的数据坐标边界。
   * @example 0
   */
  outerPadding?: number
}
