import * as Y from 'yjs'
import type { ObserveCallback, VBIMeasure, VBIMeasureGroup, VBIMeasureTree } from 'src/types'
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

    const yMap = new Y.Map<any>()

    for (const [key, value] of Object.entries(defaultMeasure)) {
      yMap.set(key, value)
    }
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

  modifyMeasure(
    measureAlias: string,
    updates: Partial<Omit<VBIMeasure, 'field'>>,
  ): void {
    const measures = this.dsl.get('measures') as Y.Array<any>
    const index = measures.toArray().findIndex((item: any) => item.get('alias') === measureAlias)

    if (index === -1) {
      throw new Error(`Measure with alias "${measureAlias}" not found`)
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
