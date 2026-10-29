import type { BaseDimension } from './baseDimension'

export type TableDimension = BaseDimension & {
  /** @description 表格列宽，单位 px；auto 根据内容计算，默认 auto。 */
  width?: number | 'auto'
  /**
   * @description 维度映射的通道
   * - row: 支持将多个维度映射到行通道
   * - column: 支持将多个维度映射到列通道
   */
  encoding?: 'row' | 'column'
}

/**
 * @description 维度组
 */
export type DimensionGroup = {
  id: string
  alias?: string
  children?: (TableDimension | DimensionGroup)[]
}

export type DimensionTree = (TableDimension | DimensionGroup)[]
