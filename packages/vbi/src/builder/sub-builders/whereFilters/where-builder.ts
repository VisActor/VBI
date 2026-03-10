import * as Y from 'yjs'
import { v4 as uuidv4 } from 'uuid'
import type { VBIWhereFilterLeaf, VBIWhereFilterGroup, VBIWhereFiltersRoot, ObserveCallback } from 'src/types'

/**
 * Where 过滤节点构建器 (叶子条件)
 */
export class WhereFilterNodeBuilder {
  constructor(private yMap: Y.Map<any>) {}

  getId(): string {
    return this.yMap.get('id')
  }

  getField(): string {
    return this.yMap.get('field')
  }

  setField(field: string): this {
    this.yMap.set('field', field)
    return this
  }

  setOp(op: string): this {
    this.yMap.set('op', op)
    return this
  }

  setValue(value: unknown): this {
    this.yMap.set('value', value)
    return this
  }

  toJson(): VBIWhereFilterLeaf {
    return this.yMap.toJSON() as VBIWhereFilterLeaf
  }
}

/**
 * Where 过滤构建器 (组 + 根入口)
 */
export class WhereFiltersBuilder {
  private root!: Y.Map<any>

  constructor(
    private doc: Y.Doc,
    private dsl: Y.Map<any>,
  ) {
    // 检查是否是嵌套组 (有 conditions 字段) 还是根 DSL (需要初始化 whereFilters)
    if (this.dsl.has('conditions')) {
      // 嵌套组：直接使用传入的 yMap 作为 root
      this.root = this.dsl
    } else {
      // 根组：需要初始化 whereFilters 结构
      if (!this.dsl.get('whereFilters')) {
        this.doc.transact(() => {
          this.root = this.createRootGroup()
          this.dsl.set('whereFilters', this.root)
        })
      } else {
        this.root = this.dsl.get('whereFilters') as Y.Map<any>
      }
    }
  }

  // ==================== 根组操作 ====================

  getId(): string {
    return this.root.get('id')
  }

  setOp(op: 'AND' | 'OR'): this {
    this.root.set('op', op)
    return this
  }

  // ==================== 条件操作 ====================

  add(field: string, callback?: (node: WhereFilterNodeBuilder) => void): this {
    const leaf: VBIWhereFilterLeaf = {
      id: uuidv4(),
      field,
    }

    const yMap = new Y.Map<any>()
    for (const [key, value] of Object.entries(leaf)) {
      yMap.set(key, value)
    }

    this.root.get('conditions').push([yMap])

    if (callback) {
      callback(new WhereFilterNodeBuilder(yMap))
    }

    return this
  }

  addGroup(op: 'AND' | 'OR', callback?: (group: WhereFiltersBuilder) => void): this {
    const group: VBIWhereFilterGroup = {
      id: uuidv4(),
      op,
      conditions: [],
    }

    const yMap = new Y.Map<any>()
    yMap.set('id', group.id)
    yMap.set('op', group.op)
    yMap.set('conditions', new Y.Array<any>())

    this.root.get('conditions').push([yMap])

    if (callback) {
      callback(new WhereFiltersBuilder(this.doc, yMap))
    }

    return this
  }

  // ==================== CRUD ====================

  update(id: string, callback: (node: WhereFilterNodeBuilder | WhereFiltersBuilder) => void): this {
    const result = this.find(id)
    if (!result) {
      throw new Error(`Where filter with id ${id} not found`)
    }
    callback(result)
    return this
  }

  remove(id: string): this {
    this.removeFromArray(this.root.get('conditions'), id)
    return this
  }

  find(id: string): WhereFilterNodeBuilder | WhereFiltersBuilder | undefined {
    return this.searchById(this.root, id)
  }

  findAll(): (WhereFilterNodeBuilder | WhereFiltersBuilder)[] {
    const results: (WhereFilterNodeBuilder | WhereFiltersBuilder)[] = []
    const conditions = this.root.get('conditions') as Y.Array<any>

    for (let i = 0; i < conditions.length; i++) {
      const item = conditions.get(i)
      results.push(this.createBuilder(item))
    }

    return results
  }

  // ==================== 工具方法 ====================

  clear(): this {
    const conditions = this.root.get('conditions')
    conditions.delete(0, conditions.length)
    return this
  }

  toJson(): VBIWhereFiltersRoot {
    return this.root.toJSON() as VBIWhereFiltersRoot
  }

  observe(callback: ObserveCallback): () => void {
    // Observe both the root Map and the conditions Array for comprehensive change detection
    this.root.observe(callback)
    const conditions = this.root.get('conditions') as Y.Array<any>
    conditions.observe(callback)

    return () => {
      this.root.unobserve(callback)
      conditions.unobserve(callback)
    }
  }

  // ==================== 私有方法 ====================

  private createRootGroup(): Y.Map<any> {
    const root = new Y.Map<any>()
    root.set('id', uuidv4())
    root.set('op', 'AND')
    root.set('conditions', new Y.Array<any>())
    return root
  }

  private createBuilder(yMap: Y.Map<any>): WhereFilterNodeBuilder | WhereFiltersBuilder {
    // 判断是叶子还是组
    if (yMap.has('field')) {
      return new WhereFilterNodeBuilder(yMap)
    }
    return new WhereFiltersBuilder(this.doc, yMap)
  }

  private removeFromArray(array: Y.Array<any>, id: string): boolean {
    const index = array.toArray().findIndex((item: any) => item.get('id') === id)
    if (index !== -1) {
      array.delete(index, 1)
      return true
    }
    return false
  }

  private searchById(group: Y.Map<any>, id: string): WhereFilterNodeBuilder | WhereFiltersBuilder | undefined {
    const conditions = group.get('conditions') as Y.Array<any>

    for (let i = 0; i < conditions.length; i++) {
      const item = conditions.get(i)
      if (item.get('id') === id) {
        return this.createBuilder(item)
      }
    }

    // 递归搜索嵌套组
    for (let i = 0; i < conditions.length; i++) {
      const item = conditions.get(i)
      if (item.has('conditions')) {
        const result = this.searchById(item, id)
        if (result) {
          return result
        }
      }
    }

    return undefined
  }
}
