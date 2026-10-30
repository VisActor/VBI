import type * as Y from 'yjs'
import type { VQueryDSL } from '@visactor/vquery'
import type { VBIQueryDSL } from 'src/types/queryDSL'
import type { VBIQueryResult } from 'src/types/connector/query'
import type { VBIConnector, VBIConnectorId } from 'src/types/connector/connector'
import type { QueryOptions } from 'src/types/builder/query'
import type { VBIQueryBuilder } from './builder'

export interface VBIQueryBuildContext<TQueryDSL = VQueryDSL> {
  dsl: Y.Map<any>
  vbiDSL: VBIQueryDSL
  builder: VBIQueryBuilder<TQueryDSL>
}

export interface VBIQueryContext<TQueryDSL = VQueryDSL> extends VBIQueryBuildContext<TQueryDSL> {
  queryDSL: TQueryDSL
  options: QueryOptions
}

export interface VBIQueryBuilderAdapters<TQueryDSL = VQueryDSL> {
  buildVQuery(context: VBIQueryBuildContext<TQueryDSL>): TQueryDSL
  query(context: VBIQueryContext<TQueryDSL>): VBIQueryResult | Promise<VBIQueryResult>
}

export interface VBIQueryBuilderOptions<TQueryDSL = VQueryDSL> {
  adapters?: Partial<VBIQueryBuilderAdapters<TQueryDSL>>
  /** @description 解析运行时连接器；不随查询 DSL 保存。 */
  resolveConnector?: (id: VBIConnectorId) => Promise<VBIConnector>
}

export interface ProfileOptions {
  /** @description 查询输出列名；省略时统计全部输出列。 */
  columns?: string[]
  bins?: { maxBins?: number; discreteMax?: number }
  topK?: number
  /** @description 默认将空字符串作为有效值。 */
  emptyString?: 'value' | 'missing'
  signal?: AbortSignal
}

export interface ProfileBin {
  min: number
  max: number
  count: number
}

export interface ColumnProfile {
  type: 'number' | 'string' | 'unknown'
  validCount: number
  missingCount: number
  min?: number
  max?: number
  bins?: ProfileBin[]
  top?: { value: string; count: number }[]
  otherCount?: number
}

export interface ProfileResult {
  rowCount: number
  columns: Record<string, ColumnProfile>
}

export interface BinsOptions {
  /** @description 查询结果中的数值列名；省略时统计全部数值列。 */
  columns?: string[]
  maxBins?: number
  discreteMax?: number
  signal?: AbortSignal
}

export interface ColumnBins {
  validCount: number
  missingCount: number
  min?: number
  max?: number
  bins: ProfileBin[]
}

export interface BinsResult {
  rowCount: number
  columns: Record<string, ColumnBins>
}
