import * as Y from 'yjs'
import { getOrCreateDimensions } from 'src/query-builder/features/dimensions/dimension-utils'
import { getRecommendedDimensionEncodingsForChartType } from './dimension-encoding'

export const reapplyDimensionEncodings = (dsl: Y.Map<any>, chartType: string) => {
  const dimensions = getOrCreateDimensions(dsl)
  const nodes = dimensions
    .toArray()
    .filter((item): item is Y.Map<any> => item instanceof Y.Map && typeof item.get('field') === 'string')
  const encodings = getRecommendedDimensionEncodingsForChartType(chartType, nodes.length)

  nodes.forEach((node, index) => {
    node.set('encoding', encodings[index])
  })
}
