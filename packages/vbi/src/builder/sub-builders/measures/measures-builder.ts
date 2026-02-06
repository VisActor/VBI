import * as Y from 'yjs'
import type { ObserveCallback, VBIMeasure, VBIMeasureGroup, VBIMeasureTree } from 'src/types'
import { fieldExpr } from '../../../types'
import { MeasureNodeBuilder } from './measure-node-builder'

export class MeasuresBuilder {
  private dsl: Y.Map<any>
  private doc: Y.Doc
  constructor(doc: Y.Doc, dsl: Y.Map<any>) {
    this.doc = doc
    this.dsl = dsl
  }

  addMeasure(fieldOrMeasure: string | VBIMeasure): MeasureNodeBuilder
  addMeasure(
    fieldOrMeasure: string | VBIMeasure,
    callback: (measureNode: MeasureNodeBuilder) => void,
  ): MeasuresBuilder
  addMeasure(
    fieldOrMeasure: string | VBIMeasure,
    callback?: (measureNode: MeasureNodeBuilder) => void,
  ): MeasureNodeBuilder | MeasuresBuilder {
    const defaultMeasure: VBIMeasure = {} as VBIMeasure
    if (typeof fieldOrMeasure === 'string') {
      defaultMeasure.alias = fieldOrMeasure
      defaultMeasure.expr = fieldExpr(fieldOrMeasure)
      // Don't set encoding - let VSeed auto-select based on chart type
      defaultMeasure.aggregate = { func: 'count' }
    } else {
      defaultMeasure.alias = fieldOrMeasure.alias
      defaultMeasure.expr = fieldOrMeasure.expr
      // Only use encoding if explicitly provided
      if (fieldOrMeasure.encoding) {
        defaultMeasure.encoding = fieldOrMeasure.encoding
      }
      defaultMeasure.aggregate = fieldOrMeasure.aggregate
    }

    const yMap = new Y.Map<any>()
    yMap.set('alias', defaultMeasure.alias)
    yMap.set('encoding', defaultMeasure.encoding)
    
    // 为expr创建一个Y.Map来正确存储嵌套对象
    const exprMap = new Y.Map<any>()
    for (const [key, value] of Object.entries(defaultMeasure.expr as Record<string, unknown>)) {
      exprMap.set(key, value)
    }
    yMap.set('expr', exprMap)
    
    // 为aggregate创建一个Y.Map
    const aggregateMap = new Y.Map<any>()
    for (const [key, value] of Object.entries(defaultMeasure.aggregate as Record<string, unknown>)) {
      aggregateMap.set(key, value)
    }
    yMap.set('aggregate', aggregateMap)
    
    const measuresArray = this.dsl.get('measures') as Y.Array<any>
    measuresArray.insert(measuresArray.length, [yMap])

    const measureNode = new MeasureNodeBuilder(yMap)

    if (callback) {
      callback(measureNode)
      return this
    } else {
      return measureNode
    }
  }

  removeMeasure(measureAlias: string) {
    const measures = this.dsl.get('measures')
    // Use alias as unique identifier, not field
    const index = measures.toArray().findIndex((item: any) => {
      return item.get('alias') === measureAlias
    })
    if (index !== -1) {
      this.dsl.get('measures').delete(index, 1)
    }
  }

  renameMeasure(measureAlias: string, newAlias: string) {
    const measures = this.dsl.get('measures')
    // Use alias as unique identifier, not field
    const index = measures.toArray().findIndex((item: any) => {
      return item.get('alias') === measureAlias
    })
    if (index !== -1) {
      const measureYMap = measures.get(index)
      if (measureYMap) {
        measureYMap.set('alias', newAlias)
      }
    }
  }

  updateAggregate(measureAlias: string, func: string) {
    const measures = this.dsl.get('measures')
    // Use alias as unique identifier, not field
    const index = measures.toArray().findIndex((item: any) => {
      return item.get('alias') === measureAlias
    })
    if (index !== -1) {
      const measureYMap = measures.get(index)
      const aggregateYMap = measureYMap.get('aggregate')
      if (aggregateYMap) {
        aggregateYMap.set('func', func)
      }
    }
  }

  updateEncoding(measureAlias: string, encoding: string) {
    const measures = this.dsl.get('measures')
    if (measures.length === 0) {
      return
    }
    
    const index = measures.toArray().findIndex((item: any) => {
      // Measure's identity is alias, not expr.field
      return item.get('alias') === measureAlias
    })
    if (index !== -1) {
      const measureYMap = measures.get(index)
      if (measureYMap) {
        measureYMap.set('encoding', encoding)
      }
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
    return 'expr' in node
  }

  static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup {
    return 'children' in node
  }
}
