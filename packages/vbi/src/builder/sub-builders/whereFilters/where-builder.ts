import * as Y from 'yjs'
import type { WhereFilterCondition, WhereFilterGroup } from 'src/types'
import { WhereFilterNodeBuilder } from './where-node-builder'

/**
 * @description Where 过滤条件组构建器，支持嵌套 AND/OR 分组
 */
export class WhereFilterGroupBuilder {
  private _logic: 'and' | 'or' = 'and'

  constructor(
    private yMap: Y.Map<any>,
    private conditionsArray: Y.Array<any>,
    private parent?: WhereFilterGroupBuilder,
  ) {
    // 初始化 logic 字段
    if (!this.yMap.get('logic')) {
      this.yMap.set('logic', 'and')
    }
    this._logic = this.yMap.get('logic')
  }

  /**
   * @description 添加一个过滤条件
   * @param field - 字段名
   * @param callback - 回调函数
   */
  add(field: string, callback: (node: WhereFilterNodeBuilder) => void): this {
    const filter: WhereFilterCondition = { field }

    const yMap = new Y.Map<any>()
    for (const [key, value] of Object.entries(filter)) {
      yMap.set(key, value)
    }

    this.conditionsArray.push([yMap])

    const node = new WhereFilterNodeBuilder(yMap)
    callback(node)

    return this
  }

  /**
   * @description 添加一个嵌套条件组
   * @param logic - 组逻辑类型 (and/or)
   * @param callback - 回调函数
   */
  addGroup(logic: 'and' | 'or', callback: (group: WhereFilterGroupBuilder) => void): this {
    const groupYMap = new Y.Map<any>()
    groupYMap.set('logic', logic)

    const conditionsArray = new Y.Array<any>()
    groupYMap.set('conditions', conditionsArray)

    this.conditionsArray.push([groupYMap])

    const groupBuilder = new WhereFilterGroupBuilder(groupYMap, conditionsArray, this)
    callback(groupBuilder)

    return this
  }

  /**
   * @description 递归查找指定字段的条件
   * @param field - 字段名
   */
  find(field: string): WhereFilterNodeBuilder | undefined {
    const conditions = this.conditionsArray.toArray()

    for (const condition of conditions) {
      // 检查是否是条件节点（有 field 属性）
      if (condition.get('field') === field) {
        return new WhereFilterNodeBuilder(condition)
      }

      // 检查是否是嵌套组
      const nestedConditions = condition.get('conditions')
      if (nestedConditions) {
        const nestedBuilder = new WhereFilterGroupBuilder(condition, nestedConditions, this)
        const found = nestedBuilder.find(field)
        if (found) {
          return found
        }
      }
    }

    return undefined
  }

  /**
   * @description 删除指定字段的条件
   * @param field - 字段名
   */
  remove(field: string): this {
    const conditions = this.conditionsArray.toArray()
    const index = conditions.findIndex((c: any) => c.get('field') === field)

    if (index !== -1) {
      this.conditionsArray.delete(index, 1)
    } else {
      // 递归删除嵌套组中的条件
      for (let i = 0; i < conditions.length; i++) {
        const condition = conditions[i]
        const nestedConditions = condition.get('conditions')
        if (nestedConditions) {
          const nestedBuilder = new WhereFilterGroupBuilder(condition, nestedConditions, this)
          nestedBuilder.remove(field)
        }
      }
    }

    return this
  }

  /**
   * @description 清空所有条件
   */
  clear(): this {
    this.conditionsArray.delete(0, this.conditionsArray.length)
    return this
  }

  /**
   * @description 导出为 JSON
   */
  toJson(): WhereFilterGroup {
    const conditions = this.conditionsArray.toArray()
    const result: WhereFilterGroup = {
      logic: this.yMap.get('logic') || 'and',
      conditions: conditions.map((condition: any) => {
        // 检查是否是嵌套组
        if (condition.get('conditions')) {
          const nestedBuilder = new WhereFilterGroupBuilder(condition, condition.get('conditions'), this)
          return nestedBuilder.toJson()
        }
        // 条件节点
        return {
          field: condition.get('field'),
          operator: condition.get('operator'),
          value: condition.get('value'),
        } as WhereFilterCondition
      }),
    }
    return result
  }

  /**
   * @description 设置逻辑类型
   * @param logic - 逻辑类型 (and/or)
   */
  setLogic(logic: 'and' | 'or'): this {
    this.yMap.set('logic', logic)
    this._logic = logic
    return this
  }

  /**
   * @description 获取当前逻辑类型
   */
  getLogic(): 'and' | 'or' {
    return this._logic
  }
}

/**
 * @description 创建 WhereFilterGroupBuilder 实例
 */
export function createWhereFilterBuilder(doc: Y.Doc, dsl: Y.Map<any>): WhereFilterGroupBuilder {
  if (!dsl.get('whereFilters')) {
    doc.transact(() => {
      const whereFiltersMap = new Y.Map<any>()
      whereFiltersMap.set('logic', 'and')
      whereFiltersMap.set('conditions', new Y.Array<any>())
      dsl.set('whereFilters', whereFiltersMap)
    })
  }

  const whereFilters = dsl.get('whereFilters') as Y.Map<any>
  const conditionsArray = whereFilters.get('conditions') as Y.Array<any>

  return new WhereFilterGroupBuilder(whereFilters, conditionsArray)
}
