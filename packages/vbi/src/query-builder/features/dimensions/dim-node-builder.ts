import type * as Y from 'yjs'
import type { VBIQueryDimension } from 'src/types/queryDSL'
import type { VBISort } from 'src/types/queryDSL/sort'

/**
 * @description 维度节点构建器，用于配置单个维度
 */
export class QueryDimensionNodeBuilder<TNode extends VBIQueryDimension = VBIQueryDimension> {
  constructor(protected yMap: Y.Map<any>) {}

  /**
   * @description 获取节点 ID
   */
  getId(): string {
    return this.yMap.get('id')
  }

  /**
   * @description 获取字段名
   */
  getField(): string {
    return this.yMap.get('field')
  }

  /**
   * @description 获取排序配置
   */
  getSort(): VBISort | undefined {
    return this.yMap.get('sort')
  }

  /**
   * @description 设置显示名称
   * @param alias - 显示名称
   */
  setAlias(alias: string): this {
    this.yMap.set('alias', alias)
    return this
  }

  /**
   * @description 设置排序配置
   * @param sort - 排序配置
   */
  setSort(sort: VBISort): this {
    this.yMap.set('sort', sort)
    return this
  }

  /**
   * @description 设置日期聚合函数
   * @param aggregate - 日期聚合配置
   */
  setAggregate(aggregate: NonNullable<VBIQueryDimension['aggregate']>): this {
    this.yMap.set('aggregate', aggregate)
    return this
  }

  /**
   * @description 清除日期聚合函数
   */
  clearAggregate(): this {
    this.yMap.delete('aggregate')
    return this
  }

  /**
   * @description 清除排序配置
   */
  clearSort(): this {
    this.yMap.delete('sort')
    return this
  }

  /**
   * @description 导出为 JSON
   */
  toJSON(): TNode {
    return this.yMap.toJSON() as TNode
  }
}
