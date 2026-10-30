import { connectorMap, getConnector, registerConnector } from 'src/query-builder/connector'
import type { VBIConnectorId } from 'src/types/connector/connector'
import type { VBIConnectorNamespace } from '../types'

export const createVBIConnectorNamespace = (): VBIConnectorNamespace => ({
  register: registerConnector,
  get: getConnector,
  has: (id: VBIConnectorId) => connectorMap.has(id),
  unregister: (id: VBIConnectorId) => connectorMap.delete(id),
})
