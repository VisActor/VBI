import * as Y from 'yjs'
import type { VBIWhereGroup } from 'src/types/queryDSL'
import { id } from 'src/utils/id'
import { WhereFilterNodeBuilder } from './where-node-builder'
import { createWhereGroup } from './where-utils'

/**
 * @description Where 分组构建器，用于配置一组条件的逻辑关系（AND/OR）
 */
export class WhereGroupBuilder {
  constructor(private yMap: Y.Map<any>) {}

  public getConditions(): Y.Array<any> {
    return this.yMap.get('conditions') as Y.Array<any>
  }

  /**
   * @description 获取分组 ID
   */
  getId(): string {
    return this.yMap.get('id')
  }

  /**
   * @description 获取逻辑操作符
   */
  getOperator(): 'and' | 'or' {
    return this.yMap.get('op')
  }

  /**
   * @description 设置逻辑操作符
   * @param op - 逻辑操作符
   */
  setOperator(op: 'and' | 'or'): this {
    this.yMap.set('op', op)
    return this
  }

  /**
   * @description 添加一个 Where 过滤条件到分组
   * @param field - 字段名
   * @param callback - 回调函数
   */
  add(field: string, callback: (node: WhereFilterNodeBuilder) => void): this {
    this.getConditions().doc!.transact(() => {
      const yMap = new Y.Map<any>()
      yMap.set('id', id.uuid())
      yMap.set('field', field)

      this.getConditions().push([yMap])

      const node = new WhereFilterNodeBuilder(yMap)
      callback(node)
    })
    return this
  }

  /**
   * @description 添加一个嵌套分组到当前分组
   * @param op - 逻辑操作符
   * @param callback - 回调函数
   */
  addGroup(op: 'and' | 'or', callback: (group: WhereGroupBuilder) => void): this {
    this.getConditions().doc!.transact(() => {
      const yMap = createWhereGroup(op, id.uuid())

      this.getConditions().push([yMap])

      const group = new WhereGroupBuilder(yMap)
      callback(group)
    })
    return this
  }

  /**
   * @description 删除指定 ID 的条件或指定索引的项
   * @param idOrIndex - ID 或索引
   */
  remove(idOrIndex: string | number): this {
    const conditions = this.getConditions()

    if (typeof idOrIndex === 'number') {
      if (idOrIndex >= 0 && idOrIndex < conditions.length) {
        conditions.delete(idOrIndex, 1)
      }
    } else {
      const index = conditions.toArray().findIndex((item: any) => item.get('id') === idOrIndex)
      if (index !== -1) {
        conditions.delete(index, 1)
      }
    }
    return this
  }

  /**
   * @description 清空分组内所有条件
   */
  clear(): this {
    const conditions = this.getConditions()
    conditions.delete(0, conditions.length)
    return this
  }

  /**
   * @description 导出为 JSON
   */
  toJSON(): VBIWhereGroup {
    return this.yMap.toJSON() as VBIWhereGroup
  }
}
