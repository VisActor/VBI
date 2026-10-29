import type { BaseMeasure } from './baseMeasure'

export type TableMeasure = BaseMeasure & {
  /** @description 表格指标列宽，单位 px；auto 根据内容计算，默认 auto。 */
  width?: number | 'auto'
  /**
   * @description 指标映射的通道
   * - column: 指标列
   */
  encoding?: 'column'
}
