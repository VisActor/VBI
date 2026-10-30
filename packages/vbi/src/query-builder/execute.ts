import type { VQueryDSL } from '@visactor/vquery'
import type { VBIConnector, VBIConnectorId } from 'src/types/connector/connector'
import type { QueryOptions } from 'src/types/builder/query'
import type { VBIQueryResult } from 'src/types/connector/query'
import { getConnector } from './connector'

/** @description 固定连接与 schema，统一查询执行边界的取消检查。 */
export const createQueryContext = async (
  connectorId: VBIConnectorId,
  resolveConnector: (id: VBIConnectorId) => Promise<VBIConnector> = getConnector,
  signal?: AbortSignal,
) => {
  signal?.throwIfAborted()
  const connector = await resolveConnector(connectorId)
  signal?.throwIfAborted()
  const schema = await connector.discoverSchema()
  signal?.throwIfAborted()
  return {
    schema,
    query: async (queryDSL: VQueryDSL): Promise<VBIQueryResult> => {
      signal?.throwIfAborted()
      const result = await connector.query({ queryDSL, schema, connectorId, signal })
      signal?.throwIfAborted()
      return result
    },
  }
}

/** @description 根据已固定的连接与查询配置执行取数，供独立查询和默认图表适配器共用。 */
export const executeQuery = async <TQueryDSL>(
  connectorId: VBIConnectorId,
  queryDSL: TQueryDSL,
  options: QueryOptions,
  resolveConnector?: (id: VBIConnectorId) => Promise<VBIConnector>,
): Promise<VBIQueryResult> => {
  const context = await createQueryContext(connectorId, resolveConnector, options.signal)
  return context.query(queryDSL as VQueryDSL)
}
