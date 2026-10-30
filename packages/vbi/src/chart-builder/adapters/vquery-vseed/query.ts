import { getConnector } from 'src/chart-builder/connector'
import type { VBIChartQueryExecutor } from 'src/types'

export const query: VBIChartQueryExecutor = async ({ vbiDSL, queryDSL, options }) => {
  const connectorId = vbiDSL.connectorId
  const connector = await getConnector(connectorId)
  const schema = await connector.discoverSchema()
  return connector.query({ queryDSL, schema, connectorId, signal: options.signal })
}
