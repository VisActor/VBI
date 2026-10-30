import type { VBIChartBuilderAdapters } from 'src/types'
import { buildVQueryDSL } from './build-vquery'
import { buildVSeedDSL } from './build-vseed'
import { query } from './query'
import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from './types'

export type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from './types'
export { buildVQueryDSL } from './build-vquery'
export { buildVSeedDSL } from './build-vseed'

export const defaultVBIChartBuilderAdapters: Required<VBIChartBuilderAdapters<DefaultVBIQueryDSL, DefaultVBISeedDSL>> =
  {
    buildVQuery: buildVQueryDSL,
    buildVSeed: buildVSeedDSL,
    query,
  }

export const resolveVBIChartBuilderAdapters = <TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL>(
  adapters?: Partial<VBIChartBuilderAdapters<TQueryDSL, TSeedDSL>>,
): Required<VBIChartBuilderAdapters<TQueryDSL, TSeedDSL>> => {
  return {
    buildVQuery:
      adapters?.buildVQuery ??
      (defaultVBIChartBuilderAdapters.buildVQuery as unknown as VBIChartBuilderAdapters<
        TQueryDSL,
        TSeedDSL
      >['buildVQuery']),
    buildVSeed:
      adapters?.buildVSeed ??
      (defaultVBIChartBuilderAdapters.buildVSeed as unknown as VBIChartBuilderAdapters<
        TQueryDSL,
        TSeedDSL
      >['buildVSeed']),
    query:
      adapters?.query ??
      (defaultVBIChartBuilderAdapters.query as unknown as Required<
        VBIChartBuilderAdapters<TQueryDSL, TSeedDSL>
      >['query']),
  }
}
