import * as Y from 'yjs'
import { VBIMeasure } from '../../../types'

export class MeasureNodeBuilder {
  constructor(private yMap: Y.Map<any>) {}

  setAlias(alias: string): this {
    this.yMap.set('alias', alias)
    return this
  }

  setEncoding(encoding: VBIMeasure['encoding']): this {
    this.yMap.set('encoding', encoding)
    return this
  }

  setAggregate(aggregate: VBIMeasure['aggregate']): this {
    // Create a Y.Map to store aggregate properly (not plain object)
    const aggregateMap = new Y.Map<any>()
    for (const [key, value] of Object.entries(aggregate as Record<string, unknown>)) {
      aggregateMap.set(key, value)
    }
    this.yMap.set('aggregate', aggregateMap)
    return this
  }

  build(): VBIMeasure {
    return this.yMap.toJSON() as VBIMeasure
  }
}
