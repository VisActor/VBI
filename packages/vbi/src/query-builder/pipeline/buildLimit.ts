import type { buildPipe } from './types'

export const buildLimit: buildPipe = (queryDSL, context) => ({ ...queryDSL, limit: context.vbiDSL.limit ?? 1000 })
