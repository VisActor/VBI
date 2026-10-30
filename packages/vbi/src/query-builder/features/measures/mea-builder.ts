import * as Y from 'yjs'
import type { ObserveDeepCallback } from 'src/types/builder/observe'
import type { VBIQueryMeasure } from 'src/types/queryDSL'
import { QueryMeasureNodeBuilder } from './mea-node-builder'
import { id } from 'src/utils/id'
import {
  getOrCreateMeasures,
  locateMeasureIndexById,
  normalizeMeasureNodeIds,
} from 'src/query-builder/features/measures/measure-utils'

/**
 * @description 度量构建器，用于添加、修改、删除度量配置。度量是数据的数值字段，如：销售额、利润、数量
 */
export abstract class QueryMeasuresBuilderBase<
  TField extends VBIQueryMeasure = VBIQueryMeasure,
  TNode extends QueryMeasureNodeBuilder<TField> = QueryMeasureNodeBuilder<TField>,
> {
  protected doc: Y.Doc
  protected dsl: Y.Map<any>
  constructor(doc: Y.Doc, dsl: Y.Map<any>) {
    this.doc = doc
    this.dsl = dsl

    doc.transact(() => {
      const measures = getOrCreateMeasures(this.dsl)
      normalizeMeasureNodeIds(measures)
    })
  }

  /**
   * @description 添加一个度量
   * @param field - 字段名
   * @param callback - 回调函数
   */
  add(field: string, callback: (node: TNode) => void): this {
    const measure = this.createField(field)

    const yMap = new Y.Map<any>()

    this.doc.transact(() => {
      for (const [key, value] of Object.entries(measure)) {
        yMap.set(key, value)
      }
      const measures = getOrCreateMeasures(this.dsl)
      measures.push([yMap])

      const node = this.createNode(yMap)
      callback(node)
    })
    return this
  }

  /**
   * @description 删除指定 ID 的度量
   * @param id - 度量 ID
   */
  remove(id: string): this {
    this.doc.transact(() => {
      const measures = getOrCreateMeasures(this.dsl)
      const index = locateMeasureIndexById(measures, id)
      if (index !== -1) {
        measures.delete(index, 1)
      }
    })
    return this
  }

  /**
   * @description 更新度量配置
   * @param id - 度量 ID
   * @param callback - 回调函数
   */
  update(id: string, callback: (node: TNode) => void): this {
    this.doc.transact(() => {
      const measures = getOrCreateMeasures(this.dsl)
      const index = locateMeasureIndexById(measures, id)

      if (index === -1) {
        throw new Error(`Measure with id "${id}" not found`)
      }

      const measureYMap = measures.get(index)
      const node = this.createNode(measureYMap)
      callback(node)
    })
    return this
  }

  /**
   * @description 按回调条件查找第一个度量，行为与 Array.find 一致
   * @param predicate - 查找条件
   */
  find(predicate: (node: TNode, index: number) => boolean): TNode | undefined {
    const measures = getOrCreateMeasures(this.dsl)
    const items = measures.toArray() as Y.Map<any>[]
    for (let index = 0; index < items.length; index++) {
      const node = this.createNode(items[index])
      if (predicate(node, index)) {
        return node
      }
    }
    return undefined
  }

  /**
   * @description 获取所有度量
   */
  findAll(): TNode[] {
    const measures = getOrCreateMeasures(this.dsl)
    return measures.toArray().map((yMap: any) => this.createNode(yMap))
  }

  /**
   * @description 导出所有度量为 JSON 数组
   */
  toJSON(): TField[] {
    const measures = getOrCreateMeasures(this.dsl)
    return measures.toJSON() as TField[]
  }

  /**
   * @description 监听度量变化，返回取消监听的函数
   * @param callback - 回调函数
   * @returns 取消监听的函数
   */
  observe(callback: ObserveDeepCallback): () => void {
    const measures = getOrCreateMeasures(this.dsl)
    measures.observeDeep(callback)
    return () => {
      measures.unobserveDeep(callback)
    }
  }

  protected createQueryField(field: string): VBIQueryMeasure {
    return { id: id.uuid(), alias: field, field, aggregate: { func: 'sum' } }
  }

  protected abstract createField(field: string): TField
  protected abstract createNode(yMap: Y.Map<any>): TNode
}

/** @description 独立查询的度量集合，不包含图形编码。 */
export class QueryMeasuresBuilder extends QueryMeasuresBuilderBase<VBIQueryMeasure, QueryMeasureNodeBuilder> {
  protected createField(field: string): VBIQueryMeasure {
    return this.createQueryField(field)
  }

  protected createNode(yMap: Y.Map<any>): QueryMeasureNodeBuilder {
    return new QueryMeasureNodeBuilder(yMap)
  }
}
