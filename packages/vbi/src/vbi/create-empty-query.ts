import type { VBIQueryDSL } from 'src/types/queryDSL'
import type { VBIConnectorId } from 'src/types/connector/connector'
import { id } from 'src/utils/id'

export const createEmptyQuery = (connectorId: VBIConnectorId, uuid: string = id.resourceUUID()): VBIQueryDSL => ({
  uuid,
  connectorId,
  dimensions: [],
  measures: [],
  whereFilter: { id: 'root', op: 'and', conditions: [] },
  havingFilter: { id: 'root', op: 'and', conditions: [] },
  version: 0,
})
