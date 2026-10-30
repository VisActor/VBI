import type { VBIDimension } from 'src/types'
import { QueryDimensionNodeBuilder } from 'src/query-builder/features/dimensions/dim-node-builder'

/** @description 维度节点构建器，在查询配置上补充图形配置。 */
export class DimensionNodeBuilder extends QueryDimensionNodeBuilder<VBIDimension> {
  /**
   * @description 获取图表编码位置
   */
  getEncoding(): VBIDimension['encoding'] | undefined {
    return this.yMap.get('encoding')
  }

  /**
   * @description 设置图表编码位置
   * @param encoding - 维度编码位置
   */
  setEncoding(encoding: NonNullable<VBIDimension['encoding']>): this {
    this.yMap.set('encoding', encoding)
    return this
  }
}
