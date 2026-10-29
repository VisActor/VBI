import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIChartDSL } from '../chartDSL'
import type { BuildVSeedOptions } from './build-vseed'
import type { QueryOptions } from './query'
import type { VBIChartBuilderAdapters } from './adapter'
import type { VBIQueryResult } from '../connector'
import type { ObserveCallback, ObserveDeepCallback } from './observe'
import type {
  MeasuresBuilder,
  DimensionsBuilder,
  ChartTypeBuilder,
  ChartInstanceBuilder,
  HavingFilterBuilder,
  WhereFilterBuilder,
  ThemeBuilder,
  LocaleBuilder,
  LimitBuilder,
  QueryModeBuilder,
  UndoManager,
} from 'src/chart-builder/features'
import type { Map, Doc } from 'yjs'

export interface VBIChartBuilderInterface<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  doc: Doc
  dsl: Map<any>
  adapters: Required<VBIChartBuilderAdapters<TQueryDSL, TSeedDSL>>
  undoManager: UndoManager

  chartType: ChartTypeBuilder
  instance: ChartInstanceBuilder
  measures: MeasuresBuilder
  dimensions: DimensionsBuilder
  havingFilter: HavingFilterBuilder
  whereFilter: WhereFilterBuilder
  theme: ThemeBuilder
  locale: LocaleBuilder
  limit: LimitBuilder
  queryMode: QueryModeBuilder

  applyUpdate: (update: Uint8Array, origin?: any) => void
  encodeStateAsUpdate: (targetStateVector?: Uint8Array) => Uint8Array

  getUUID: () => string
  buildVSeed: (options?: BuildVSeedOptions) => Promise<TSeedDSL>
  buildVQuery: () => TQueryDSL
  query: (options?: QueryOptions) => Promise<VBIQueryResult>
  build: () => VBIChartDSL
  isEmpty: () => boolean
  observe: (callback: ObserveCallback) => void
  unobserve: (callback: ObserveCallback) => void
  observeDeep: (callback: ObserveDeepCallback) => void
  unobserveDeep: (callback: ObserveDeepCallback) => void
}
