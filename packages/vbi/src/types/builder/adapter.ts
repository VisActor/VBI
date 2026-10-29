import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { Map } from 'yjs'
import type { VBIChartDSL } from '../chartDSL'
import type { BuildVSeedOptions } from './build-vseed'
import type { QueryOptions } from './query'
import type { VBIQueryResult } from '../connector'
import type { VBIChartBuilderInterface } from './VBIInterface'

export interface VBIChartBuildVQueryContext<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  dsl: Map<any>
  vbiDSL: VBIChartDSL
  builder: VBIChartBuilderInterface<TQueryDSL, TSeedDSL>
}

export interface VBIChartQueryContext<
  TQueryDSL = DefaultVBIQueryDSL,
  TSeedDSL = DefaultVBISeedDSL,
> extends VBIChartBuildVQueryContext<TQueryDSL, TSeedDSL> {
  options: QueryOptions
  queryDSL: TQueryDSL
}

export interface VBIChartBuildVSeedContext<
  TQueryDSL = DefaultVBIQueryDSL,
  TSeedDSL = DefaultVBISeedDSL,
> extends VBIChartQueryContext<TQueryDSL, TSeedDSL> {
  options: BuildVSeedOptions
}

export type VBIChartQueryBuilder<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> = (
  context: VBIChartBuildVQueryContext<TQueryDSL, TSeedDSL>,
) => TQueryDSL

export type VBIChartSeedBuilder<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> = (
  context: VBIChartBuildVSeedContext<TQueryDSL, TSeedDSL>,
) => Promise<TSeedDSL> | TSeedDSL

export type VBIChartQueryExecutor<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> = (
  context: VBIChartQueryContext<TQueryDSL, TSeedDSL>,
) => Promise<VBIQueryResult> | VBIQueryResult

export interface VBIChartBuilderAdapters<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  buildVQuery: VBIChartQueryBuilder<TQueryDSL, TSeedDSL>
  buildVSeed: VBIChartSeedBuilder<TQueryDSL, TSeedDSL>
  query?: VBIChartQueryExecutor<TQueryDSL, TSeedDSL>
}

export interface VBIChartBuilderOptions<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  adapters?: Partial<VBIChartBuilderAdapters<TQueryDSL, TSeedDSL>>
}
