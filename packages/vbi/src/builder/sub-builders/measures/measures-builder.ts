import * as Y from 'yjs'
import type { ObserveCallback, VBIMeasure, VBIMeasureGroup, VBIMeasureTree } from 'src/types'
import { materialize } from '../../../utils'
import { MeasureNodeBuilder } from './measure-node-builder'

export class MeasuresBuilder {
  private dsl: Y.Map<any>
  private doc: Y.Doc
  constructor(doc: Y.Doc, dsl: Y.Map<any>) {
    this.doc = doc
    this.dsl = dsl
  }

  addMeasure(fieldOrMeasure: VBIMeasure['field'] | VBIMeasure): MeasureNodeBuilder
  addMeasure(
    fieldOrMeasure: VBIMeasure['field'] | VBIMeasure,
    callback: (measureNode: MeasureNodeBuilder) => void,
  ): MeasuresBuilder
  addMeasure(
    fieldOrMeasure: VBIMeasure['field'] | VBIMeasure,
    callback?: (measureNode: MeasureNodeBuilder) => void,
  ): MeasureNodeBuilder | MeasuresBuilder {
    const defaultMeasure: VBIMeasure = {} as VBIMeasure
    if (typeof fieldOrMeasure === 'string') {
      defaultMeasure.alias = fieldOrMeasure
      defaultMeasure.field = fieldOrMeasure
      defaultMeasure.encoding = 'yAxis'
      defaultMeasure.aggregate = { func: 'sum' }
    } else {
      defaultMeasure.alias = fieldOrMeasure.alias
      defaultMeasure.field = fieldOrMeasure.field
      defaultMeasure.encoding = fieldOrMeasure.encoding
      defaultMeasure.aggregate = fieldOrMeasure.aggregate
    }

    const yMap = materialize(defaultMeasure) as Y.Map<any>
    this.dsl.get('measures').push([yMap])

    const measureNode = new MeasureNodeBuilder(yMap)

    if (callback) {
      callback(measureNode)
      return this
    } else {
      return measureNode
    }
  }

  removeMeasure(field: VBIMeasure['field']) {
    const measures = this.dsl.get('measures')
    const index = measures.toArray().findIndex((item: any) => item.get('field') === field)
    if (index !== -1) {
      this.dsl.get('measures').delete(index, 1)
    }
  }

  renameMeasure(field: string, newAlias: string): void {
    this.modifyMeasure(field, { alias: newAlias })
  }

  modifyAggregate(field: string, func: string, quantile?: number): void {
    const measures = this.dsl.get('measures') as Y.Array<any>
    const index = measures.toArray().findIndex((item: any) => item.get('field') === field)

    if (index === -1) {
      throw new Error(`Measure with field "${field}" not found`)
    }

    const measureYMap = measures.get(index)
    // Create a new Y.Map for aggregate to ensure it's properly typed
    const newAggregate = new Y.Map()
    newAggregate.set('func', func)
    if (func === 'quantile' && quantile !== undefined) {
      newAggregate.set('quantile', quantile)
    }
    // Replace the entire aggregate object
    measureYMap.set('aggregate', newAggregate)
  }

  modifyEncoding(field: string, encoding: VBIMeasure['encoding']): void {
    this.modifyMeasure(field, { encoding })
  }

  modifyMeasure(field: string, updates: Partial<Omit<VBIMeasure, 'field'>>): void {
    const measures = this.dsl.get('measures') as Y.Array<any>
    const index = measures.toArray().findIndex((item: any) => item.get('field') === field)

    if (index === -1) {
      throw new Error(`Measure with field "${field}" not found`)
    }

    const measureYMap = measures.get(index)
    for (const [key, value] of Object.entries(updates)) {
      measureYMap.set(key, value)
    }
  }

  getMeasures(): VBIMeasure[] {
    return this.dsl.get('measures').toJSON()
  }

  observe(callback: ObserveCallback) {
    this.dsl.get('measures').observe(callback)
  }

  unobserve(callback: ObserveCallback) {
    this.dsl.get('measures').unobserve(callback)
  }

  static isMeasureNode(node: VBIMeasureTree[0]): node is VBIMeasure {
    return 'field' in node
  }

  static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup {
    return 'children' in node
  }
}
