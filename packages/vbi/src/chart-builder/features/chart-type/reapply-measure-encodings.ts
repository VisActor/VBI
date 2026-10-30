import * as Y from 'yjs'
import { getOrCreateMeasures } from 'src/query-builder/features/measures/measure-utils'
import { getRecommendedMeasureEncodingsForChartType } from './measure-encoding'

export const reapplyMeasureEncodings = (dsl: Y.Map<any>, chartType: string) => {
  const measures = getOrCreateMeasures(dsl)
  const nodes = measures
    .toArray()
    .filter((item): item is Y.Map<any> => item instanceof Y.Map && typeof item.get('field') === 'string')
  const encodings = getRecommendedMeasureEncodingsForChartType(chartType, nodes.length)

  nodes.forEach((node, index) => {
    node.set('encoding', encodings[index])
  })
}
