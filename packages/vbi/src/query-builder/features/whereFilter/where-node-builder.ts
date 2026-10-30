import type * as Y from 'yjs'
import type { VBIWhereDatePredicate, VBIWhereFilter } from 'src/types/queryDSL'

/**
 * @description Where 过滤节点构建器，用于配置单个 Where 过滤条件
 */
export class WhereFilterNodeBuilder {
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
   * @description 设置字段名
   * @param field - 字段名
   */
  setField(field: string): this {
    this.yMap.set('field', field)
    return this
  }

  /**
   * @description 获取过滤操作符
   */
  getOperator(): string | undefined {
    return this.yMap.get('op')
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
   * @description 设置过滤值
   * @param value - 过滤值
   */
  setValue(value: unknown): this {
    this.yMap.set('value', value)
    return this
  }

  /**
   * @description 设置日期过滤条件
   * @param predicate - 日期谓词
   */
  setDate(predicate: VBIWhereDatePredicate): this {
    this.yMap.set('op', 'date')
    this.yMap.set('value', predicate)
    return this
  }

  /**
   * @description 获取日期过滤条件，非日期过滤返回 undefined
   */
  getDate(): VBIWhereDatePredicate | undefined {
    if (this.yMap.get('op') !== 'date') return undefined
    return this.yMap.get('value') as VBIWhereDatePredicate | undefined
  }

  /**
   * @description 导出为 JSON
   */
  toJSON(): VBIWhereFilter {
    return this.yMap.toJSON() as VBIWhereFilter
  }
}
