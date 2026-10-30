import { getOrCreateMeasures } from 'src/query-builder/features/measures/measure-utils'
import type * as Y from 'yjs'
import type { VBIMeasure, VBIMeasureTree, VBIMeasureGroup } from 'src/types'
import { QueryMeasuresBuilderBase } from 'src/query-builder/features/measures/mea-builder'
import { MeasureNodeBuilder } from './mea-node-builder'
import { getRecommendedMeasureEncodingsForChartType } from '../chart-type/measure-encoding'

/** @description 度量构建器，在查询字段操作上补充图形编码。 */
export class MeasuresBuilder extends QueryMeasuresBuilderBase<VBIMeasure, MeasureNodeBuilder> {
  protected createField(field: string): VBIMeasure {
    const chartType = this.dsl.get('chartType') || 'table'
    const count = getOrCreateMeasures(this.dsl).length + 1
    const [encoding] = getRecommendedMeasureEncodingsForChartType(chartType, count).slice(-1)
    return { ...this.createQueryField(field), encoding }
  }

  protected createNode(yMap: Y.Map<any>): MeasureNodeBuilder {
    return new MeasureNodeBuilder(yMap)
  }

  static isMeasureNode(node: VBIMeasureTree[0]): node is VBIMeasure {
    return 'encoding' in node || 'aggregate' in node
  }

  static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup {
    return 'children' in node
  }
}
