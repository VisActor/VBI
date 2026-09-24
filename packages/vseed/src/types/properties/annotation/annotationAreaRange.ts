/**
 * @description 当前可见数值轴的边界，包含轴 min/max、zero、nice 等配置的影响，不是数据极值。
 */
export const AxisBoundaryEnum = {
  Min: 'axisMin',
  Max: 'axisMax',
} as const

/**
 * @description 数值线性轴上的区间。必须同时指定 min/max；两个数值端点必须满足 min < max。
 */
export type AnnotationAxisRange = {
  /**
   * @description 数据坐标下界；axisMin 表示当前轴的最小值。百分比使用原始数值，例如 0.2 表示 20%。
   */
  min: number | typeof AxisBoundaryEnum.Min
  /**
   * @description 数据坐标上界；axisMax 表示当前轴的最大值。反向轴仍按数值大小解释上下界。
   */
  max: number | typeof AxisBoundaryEnum.Max
}

/**
 * @description 按轴坐标定义矩形，至少指定 x/y 中的一项。未指定的轴铺满绘图区；完全越界时不绘制，部分越界时裁剪，不扩大坐标轴。
 */
export type AnnotationAreaRange =
  | { x: AnnotationAxisRange; y?: AnnotationAxisRange }
  | { x?: AnnotationAxisRange; y: AnnotationAxisRange }
