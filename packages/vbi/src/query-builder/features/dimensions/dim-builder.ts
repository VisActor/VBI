import * as Y from 'yjs'
import type { ObserveDeepCallback } from 'src/types/builder/observe'
import type { VBIQueryDimension } from 'src/types/queryDSL'
import { QueryDimensionNodeBuilder } from './dim-node-builder'
import { id } from 'src/utils/id'
import {
  getOrCreateDimensions,
  locateDimensionIndexById,
  normalizeDimensionNodeIds,
} from 'src/query-builder/features/dimensions/dimension-utils'

/**
 * @description 维度构建器，用于添加、修改、删除维度配置。维度是数据的分类字段，如：时间、地区、产品类别
 */
export abstract class QueryDimensionsBuilderBase<
  TField extends VBIQueryDimension = VBIQueryDimension,
  TNode extends QueryDimensionNodeBuilder<TField> = QueryDimensionNodeBuilder<TField>,
> {
  protected doc: Y.Doc
  protected dsl: Y.Map<any>
  constructor(doc: Y.Doc, dsl: Y.Map<any>) {
    this.doc = doc
    this.dsl = dsl

    doc.transact(() => {
      const dimensions = getOrCreateDimensions(this.dsl)
      normalizeDimensionNodeIds(dimensions)
    })
  }

  /**
   * @description 添加一个维度
   * @param field - 字段名
   * @param callback - 回调函数
   */
  add(field: string, callback: (node: TNode) => void): this {
    const dimension = this.createField(field)

    const yMap = new Y.Map<any>()
    this.doc.transact(() => {
      for (const [key, value] of Object.entries(dimension)) {
        yMap.set(key, value)
      }

      const dimensions = getOrCreateDimensions(this.dsl)
      dimensions.push([yMap])
      const node = this.createNode(yMap)
      callback(node)
    })

    return this
  }

  /**
   * @description 删除指定 ID 的维度
   * @param id - 维度 ID
   */
  remove(id: string): this {
    this.doc.transact(() => {
      const dimensions = getOrCreateDimensions(this.dsl)
      const index = locateDimensionIndexById(dimensions, id)
      if (index !== -1) {
        dimensions.delete(index, 1)
      }
    })
    return this
  }

  /**
   * @description 更新指定维度 ID 的配置
   * @param id - 维度 ID
   * @param callback - 回调函数
   */
  update(id: string, callback: (node: TNode) => void): this {
    this.doc.transact(() => {
      const dimensions = getOrCreateDimensions(this.dsl)
      const index = locateDimensionIndexById(dimensions, id)

      if (index === -1) {
        throw new Error(`Dimension with id "${id}" not found`)
      }

      const dimensionYMap = dimensions.get(index)
      const node = this.createNode(dimensionYMap)
      callback(node)
    })
    return this
  }

  /**
   * @description 按回调条件查找第一个维度，行为与 Array.find 一致
   * @param predicate - 查找条件
   */
  find(predicate: (node: TNode, index: number) => boolean): TNode | undefined {
    const dimensions = getOrCreateDimensions(this.dsl)
    const items = dimensions.toArray() as Y.Map<any>[]
    for (let index = 0; index < items.length; index++) {
      const node = this.createNode(items[index])
      if (predicate(node, index)) {
        return node
      }
    }
    return undefined
  }

  /**
   * @description 获取所有维度
   */
  findAll(): TNode[] {
    const dimensions = getOrCreateDimensions(this.dsl)
    return dimensions.toArray().map((yMap: any) => this.createNode(yMap))
  }

  /**
   * @description 导出所有维度为 JSON 数组
   */
  toJSON(): TField[] {
    const dimensions = getOrCreateDimensions(this.dsl)
    return dimensions.toJSON() as TField[]
  }

  /**
   * @description 监听维度变化，返回取消监听的函数
   * @param callback - 回调函数
   * @returns 取消监听的函数
   */
  observe(callback: ObserveDeepCallback): () => void {
    const dimensions = getOrCreateDimensions(this.dsl)
    dimensions.observeDeep(callback)
    return () => {
      dimensions.unobserveDeep(callback)
    }
  }

  protected createQueryField(field: string): VBIQueryDimension {
    return { id: id.uuid(), alias: field, field }
  }

  protected abstract createField(field: string): TField
  protected abstract createNode(yMap: Y.Map<any>): TNode
}

/** @description 独立查询的维度集合，不包含图形编码。 */
export class QueryDimensionsBuilder extends QueryDimensionsBuilderBase<VBIQueryDimension, QueryDimensionNodeBuilder> {
  protected createField(field: string): VBIQueryDimension {
    return this.createQueryField(field)
  }

  protected createNode(yMap: Y.Map<any>): QueryDimensionNodeBuilder {
    return new QueryDimensionNodeBuilder(yMap)
  }
}
