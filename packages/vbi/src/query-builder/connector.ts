import type { VBIConnector, VBIConnectorId } from 'src/types/connector/connector'

export const connectorMap: Map<VBIConnectorId, VBIConnector | (() => Promise<VBIConnector>)> = new Map()

export const registerConnector = (id: VBIConnectorId, connector: VBIConnector | (() => Promise<VBIConnector>)) => {
  connectorMap.set(id, connector)
}

export const getConnector = async (id: VBIConnectorId) => {
  const connector = connectorMap.get(id)
  if (!connector) {
    throw new Error(`connector ${id} not registered`)
  }
  if (typeof connector === 'function') {
    return connector()
  }
  return connector
}
