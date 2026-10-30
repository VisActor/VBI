import { DimensionsBuilder, MeasuresBuilder } from '../../features'
import type { buildPipe } from './types'

export const buildDetailSelect: buildPipe = (queryDSL, { vbiDSL }) => ({
  ...queryDSL,
  select: [
    ...vbiDSL.measures.filter(MeasuresBuilder.isMeasureNode),
    ...vbiDSL.dimensions.filter(DimensionsBuilder.isDimensionNode),
  ].map((node) => ({ field: node.field, alias: node.id })),
})
