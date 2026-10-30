import { createEmptyQuery } from '../create-empty-query'
import { createQuery } from '../from/from-vbi-query-dsl-input'
import type { VBIQueryNamespace } from '../types/query'

export const createVBIQueryNamespace = (): VBIQueryNamespace => ({
  create: createQuery,
  createEmpty: createEmptyQuery,
})
