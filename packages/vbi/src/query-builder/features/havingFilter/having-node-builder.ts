import type * as Y from 'yjs'
import type { VBIHavingFilter, VBIHavingAggregate } from 'src/types/queryDSL'

/**
 * @description Having 过滤节点构建器，用于配置单个 Having 过滤条件
 */
export class HavingFilterNodeBuilder {
  constructor(private yMap: Y.Map<any>) {}

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
   * @description 获取过滤操作符
   */
  getOperator(): string | undefined {
    return this.yMap.get('op')
  }

  /**
   * @description 获取聚合配置
   */
  getAggregate(): VBIHavingAggregate | undefined {
    return this.yMap.get('aggregate')
  }

  /**
   * @description 设置过滤条件的值
   * @param value - 过滤值
   */
  setValue(value: unknown): this {
    this.yMap.set('value', value)
    return this
  }

  /**
   * @description 设置过滤操作符
   * @param operator - 操作符
   */
  setOperator(operator: string): this {
    this.yMap.set('op', operator)
    return this
  }

  /**
   * @description 设置聚合配置
   * @param aggregate - 聚合配置
   */
  setAggregate(aggregate: VBIHavingAggregate): this {
    this.yMap.set('aggregate', aggregate)
    return this
  }

  /**
   * @description 导出为 JSON
   */
  toJSON(): VBIHavingFilter {
    return this.yMap.toJSON() as VBIHavingFilter
  }
}
