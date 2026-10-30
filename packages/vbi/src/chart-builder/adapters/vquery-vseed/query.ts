import { executeQuery } from 'src/query-builder/execute'
import type { VBIChartQueryExecutor } from 'src/types'

export const query: VBIChartQueryExecutor = ({ vbiDSL, queryDSL, options }) =>
  executeQuery(vbiDSL.connectorId, queryDSL, options)
