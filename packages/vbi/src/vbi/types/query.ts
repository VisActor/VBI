import type * as Y from 'yjs'
import type { VQueryDSL } from '@visactor/vquery'
import type { VBIQueryDSL, VBIQueryDSLInput } from 'src/types/queryDSL'
import type { VBIQueryBuilder } from 'src/query-builder/builder'
import type { VBIQueryBuilderOptions } from 'src/query-builder/types'
import type { VBIConnectorId } from 'src/types/connector/connector'

/** @description 独立查询 Builder 创建 API，不注册图表资源。 */
export interface VBIQueryNamespace {
  /** @description 从查询 DSL 或已恢复的 Y.Doc 创建查询 Builder。 */
  create<TQueryDSL = VQueryDSL>(
    input: VBIQueryDSLInput | Y.Doc,
    options?: VBIQueryBuilderOptions<TQueryDSL>,
  ): VBIQueryBuilder<TQueryDSL>
  /** @description 创建一个空查询 DSL。 */
  createEmpty(connectorId: VBIConnectorId, uuid?: string): VBIQueryDSL
}
