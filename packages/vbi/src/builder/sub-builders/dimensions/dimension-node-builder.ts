import * as Y from 'yjs'
import { VBIDimension } from '../../../types'

export class DimensionNodeBuilder {
  constructor(private yMap: Y.Map<any>) {}

  setAlias(alias: string): this {
    this.yMap.set('alias', alias)
    return this
  }

  setEncoding(encoding: VBIDimension['encoding']): this {
    this.yMap.set('encoding', encoding)
    return this
  }

  build(): VBIDimension {
    return this.yMap.toJSON() as VBIDimension
  }
}
