import type { buildPipe } from './types'

export const buildDetailSelect: buildPipe = (queryDSL, { vbiDSL }) => ({
  ...queryDSL,
  select: [...vbiDSL.measures, ...vbiDSL.dimensions].map((node) => ({
    field: node.field,
    alias: node.id,
  })),
})
