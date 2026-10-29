import * as Y from 'yjs'
import type { VBIHavingGroup, ObserveDeepCallback } from 'src/types'
import { id } from 'src/utils'
import { createHavingGroup, findEntry, isHavingGroup } from './having-utils'
import { HavingFilterNodeBuilder } from './having-node-builder'
import { HavingGroupBuilder } from './having-group-builder'

/**
 * @description Having 过滤构建器，用于添加、修改、删除分组后过滤条件。Having 过滤在数据聚合后生效，用于筛选分组结果
 */
export class HavingFilterBuilder {
  private havingFilter!: Y.Map<any>

  constructor(doc: Y.Doc, dsl: Y.Map<any>) {
    doc.transact(() => {
      const existingHavingFilter = dsl.get('havingFilter')
      if (existingHavingFilter instanceof Y.Map) {
        this.havingFilter = existingHavingFilter
      } else {
        this.havingFilter = createHavingGroup()
        dsl.set('havingFilter', this.havingFilter)
      }

      if (!(this.havingFilter.get('conditions') instanceof Y.Array)) {
        this.havingFilter.set('conditions', new Y.Array<any>())
      }
      if (!this.havingFilter.get('id')) {
        this.havingFilter.set('id', 'root')
      }
      if (!this.havingFilter.get('op')) {
        this.havingFilter.set('op', 'and')
      }
    })
  }

  public getConditions(): Y.Array<any> {
    return this.havingFilter.get('conditions') as Y.Array<any>
  }

  /** @description 获取根过滤组的逻辑操作符。 */
  getOperator(): 'and' | 'or' {
    return this.havingFilter.get('op')
  }

  /** @description 设置根过滤组的逻辑操作符，保留已有条件及其 ID。 */
  setOperator(op: 'and' | 'or'): this {
    this.havingFilter.set('op', op)
    return this
  }

  /**
   * @description 添加一个 Having 过滤条件
   * @param field - 字段名
   * @param callback - 回调函数
   */
  add(field: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder {
    const yMap = new Y.Map<any>()
    yMap.set('id', id.uuid())
    yMap.set('field', field)
    yMap.set('aggregate', { func: 'sum' })

    this.getConditions().push([yMap])

    const node = new HavingFilterNodeBuilder(yMap)
    callback(node)
    return this
  }

  /**
   * @description 添加一个 Having 分组
   * @param op - 逻辑操作符
   * @param callback - 回调函数
   */
  addGroup(op: 'and' | 'or', callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder {
    const yMap = createHavingGroup(op, id.uuid())

    this.getConditions().push([yMap])

    const group = new HavingGroupBuilder(yMap)
    callback(group)
    return this
  }

  /**
   * @description 更新指定 ID 的过滤条件
   * @param id - 过滤条件 ID
   * @param callback - 回调函数
   */
  update(id: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder {
    const conditions = this.getConditions()
    const match = findEntry(conditions, id)

    if (!match) {
      throw new Error(`Having filter with id ${id} not found`)
    }

    if (!HavingFilterBuilder.isNode(match.item)) {
      throw new Error(`Item with id ${id} is not a filter`)
    }

    const filterYMap = match.item
    const node = new HavingFilterNodeBuilder(filterYMap)
    callback(node)
    return this
  }

  /**
   * @description 更新指定 ID 的分组
   * @param id - 分组 ID
   * @param callback - 回调函数
   */
  updateGroup(id: string, callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder {
    const conditions = this.getConditions()
    const match = findEntry(conditions, id)

    if (!match) {
      throw new Error(`Having group with id ${id} not found`)
    }

    const yMap = match.item
    if (!HavingFilterBuilder.isGroup(yMap)) {
      throw new Error(`Item with id ${id} is not a group`)
    }

    const group = new HavingGroupBuilder(yMap)
    callback(group)
    return this
  }

  /**
   * @description 删除指定 ID 的条件或指定索引的项
   * @param idOrIndex - ID 或索引
   */
  remove(idOrIndex: string | number): HavingFilterBuilder {
    const conditions = this.getConditions()

    if (typeof idOrIndex === 'number') {
      if (idOrIndex >= 0 && idOrIndex < conditions.length) {
        conditions.delete(idOrIndex, 1)
      }
    } else {
      const match = findEntry(conditions, idOrIndex)
      if (match) {
        match.collection.delete(match.index, 1)
      }
    }
    return this
  }

  /**
   * @description 按回调条件查找第一个条件（过滤或分组），行为与 Array.find 一致
   * @param predicate - 查找条件
   */
  find(
    predicate: (entry: HavingFilterNodeBuilder | HavingGroupBuilder, index: number) => boolean,
  ): HavingFilterNodeBuilder | HavingGroupBuilder | undefined {
    const traverse = (collection: Y.Array<any>): HavingFilterNodeBuilder | HavingGroupBuilder | undefined => {
      const items = collection.toArray() as Y.Map<any>[]
      for (let index = 0; index < items.length; index++) {
        const yMap = items[index]
        const entry = HavingFilterBuilder.isGroup(yMap)
          ? new HavingGroupBuilder(yMap)
          : new HavingFilterNodeBuilder(yMap)

        if (predicate(entry, index)) {
          return entry
        }

        if (HavingFilterBuilder.isGroup(yMap)) {
          const nestedCollection = yMap.get('conditions') as Y.Array<any>
          const nestedMatch = traverse(nestedCollection)
          if (nestedMatch) {
            return nestedMatch
          }
        }
      }
      return undefined
    }
    return traverse(this.getConditions())
  }

  /**
   * @description 清空所有 Having 过滤条件
   */
  clear() {
    const conditions = this.getConditions()
    conditions.delete(0, conditions.length)
    return this
  }

  /**
   * @description 导出完整的 Having 过滤配置
   */
  toJSON(): VBIHavingGroup {
    return this.havingFilter.toJSON() as VBIHavingGroup
  }

  /**
   * @description 监听过滤条件变化，返回取消监听的函数
   * @param callback - 回调函数
   * @returns 取消监听的函数
   */
  observe(callback: ObserveDeepCallback): () => void {
    this.havingFilter.observeDeep(callback)
    return () => {
      this.havingFilter.unobserveDeep(callback)
    }
  }

  /**
   * @description 判断是否为分组节点
   */
  static isGroup(yMap: Y.Map<any>): boolean {
    return isHavingGroup(yMap)
  }

  /**
   * @description 判断是否为叶子节点
   */
  static isNode(yMap: Y.Map<any>): boolean {
    return yMap.get('field') !== undefined
  }
}
