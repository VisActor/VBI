import * as Y from 'yjs'
import type { ObserveCallback, VBIDimension, VBIDimensionGroup, VBIDimensionTree } from 'src/types'
import { DimensionNodeBuilder } from './dimension-node-builder'

export class DimensionsBuilder {
  private dsl: Y.Map<any>
  private doc: Y.Doc
  constructor(doc: Y.Doc, dsl: Y.Map<any>) {
    this.doc = doc
    this.dsl = dsl
  }

  addDimension(fieldOrDimension: VBIDimension['field'] | VBIDimension): DimensionNodeBuilder
  addDimension(
    fieldOrDimension: VBIDimension['field'] | VBIDimension,
    callback: (dimensionNode: DimensionNodeBuilder) => void,
  ): DimensionsBuilder
  addDimension(
    fieldOrDimension: VBIDimension['field'] | VBIDimension,
    callback?: (dimensionNode: DimensionNodeBuilder) => void,
  ): DimensionNodeBuilder | DimensionsBuilder {
    const defaultDimension: VBIDimension = {} as VBIDimension
    if (typeof fieldOrDimension === 'string') {
      defaultDimension.alias = fieldOrDimension
      defaultDimension.field = fieldOrDimension
      // Don't set encoding - let VSeed auto-select based on chart type
    } else {
      defaultDimension.alias = fieldOrDimension.alias
      defaultDimension.field = fieldOrDimension.field || fieldOrDimension.alias
      // Only use encoding if explicitly provided
      if (fieldOrDimension.encoding) {
        defaultDimension.encoding = fieldOrDimension.encoding
      }
    }

    const yMap = new Y.Map<any>()
    for (const [key, value] of Object.entries(defaultDimension)) {
      yMap.set(key, value)
    }

    const dimensionsArray = this.dsl.get('dimensions') as Y.Array<any>
    dimensionsArray.insert(dimensionsArray.length, [yMap])
    const dimensionNode = new DimensionNodeBuilder(yMap)

    if (callback) {
      callback(dimensionNode)
      return this
    } else {
      return dimensionNode
    }
  }

  removeDimension(field: VBIDimension['field']) {
    const dimensions = this.dsl.get('dimensions')
    const index = dimensions.toArray().findIndex((item: any) => item.get('field') === field)
    if (index !== -1) {
      this.dsl.get('dimensions').delete(index, 1)
    }
  }

  updateEncoding(field: string, encoding: string) {
    const dimensions = this.dsl.get('dimensions')
    const index = dimensions.toArray().findIndex((item: any) => item.get('field') === field)
    if (index !== -1) {
      const dimensionYMap = dimensions.get(index)
      if (dimensionYMap) {
        dimensionYMap.set('encoding', encoding)
      }
    }
  }

  getDimensions(): VBIDimension[] {
    return this.dsl.get('dimensions').toJSON()
  }

  observe(callback: ObserveCallback) {
    this.dsl.get('dimensions').observe(callback)
  }

  unobserve(callback: ObserveCallback) {
    this.dsl.get('dimensions').unobserve(callback)
  }

  static isDimensionNode(node: VBIDimensionTree[0]): node is VBIDimension {
    return 'alias' in node && !('children' in node)
  }

  static isDimensionGroup(node: VBIDimensionTree[0]): node is VBIDimensionGroup {
    return 'children' in node
  }
}
