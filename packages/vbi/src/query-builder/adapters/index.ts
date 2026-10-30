import type { VQueryDSL } from '@visactor/vquery'
import { buildQueryDSL } from '../pipeline'
import { executeQuery } from '../execute'
import type { VBIQueryBuilderAdapters, VBIQueryBuilderOptions } from '../types'

export const resolveVBIQueryBuilderAdapters = <TQueryDSL = VQueryDSL>(
  options: VBIQueryBuilderOptions<TQueryDSL> = {},
): VBIQueryBuilderAdapters<TQueryDSL> => ({
  buildVQuery: options.adapters?.buildVQuery ?? (({ vbiDSL }) => buildQueryDSL(vbiDSL) as TQueryDSL),
  query:
    options.adapters?.query ??
    (({ vbiDSL, queryDSL, options: queryOptions }) =>
      executeQuery(vbiDSL.connectorId, queryDSL, queryOptions, options.resolveConnector)),
})
