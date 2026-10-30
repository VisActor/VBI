import { getOrCreateDimensions } from 'src/query-builder/features/dimensions/dimension-utils'
import type * as Y from 'yjs'
import type { VBIDimension, VBIDimensionTree, VBIDimensionGroup } from 'src/types'
import { QueryDimensionsBuilderBase } from 'src/query-builder/features/dimensions/dim-builder'
import { DimensionNodeBuilder } from './dim-node-builder'
import { getRecommendedDimensionEncodingsForChartType } from '../chart-type/dimension-encoding'

/** @description 维度构建器，在查询字段操作上补充图形编码。 */
export class DimensionsBuilder extends QueryDimensionsBuilderBase<VBIDimension, DimensionNodeBuilder> {
  protected createField(field: string): VBIDimension {
    const chartType = this.dsl.get('chartType') || 'table'
    const count = getOrCreateDimensions(this.dsl).length + 1
    const [encoding] = getRecommendedDimensionEncodingsForChartType(chartType, count).slice(-1)
    return { ...this.createQueryField(field), encoding }
  }

  protected createNode(yMap: Y.Map<any>): DimensionNodeBuilder {
    return new DimensionNodeBuilder(yMap)
  }

  static isDimensionNode(node: VBIDimensionTree[0]): node is VBIDimension {
    return 'alias' in node && !('children' in node)
  }

  static isDimensionGroup(node: VBIDimensionTree[0]): node is VBIDimensionGroup {
    return 'children' in node
  }
}
