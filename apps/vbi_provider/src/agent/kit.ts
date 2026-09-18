import { createVBIProviderClient } from '../client'
import { createVBIProviderAgentAdapter } from './adapter'
import type { VBIProviderClient, VBIProviderClientOptions } from '../types'
import type { VBIProviderAgentAdapter } from './adapter'

export interface VBIProviderAgentKitOptions extends VBIProviderClientOptions {
  chartId?: string
  insightId?: string
}

export interface VBIProviderAgentKit extends VBIProviderAgentAdapter {
  client: VBIProviderClient
}

export const createVBIProviderAgentKit = ({
  chartId,
  insightId,
  ...clientOptions
}: VBIProviderAgentKitOptions): VBIProviderAgentKit => {
  const client = createVBIProviderClient(clientOptions)
  return { client, ...createVBIProviderAgentAdapter({ chartId, client, insightId }) }
}
