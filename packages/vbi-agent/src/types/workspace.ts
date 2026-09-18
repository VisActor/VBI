import type { VBIChartBuilder, VBIInsightBuilder } from '@visactor/vbi'

export type VBIResourceKind = 'chart' | 'insight'

export type VBIResourceSummary = {
  id: string
  name?: string | null
}

export type VBIResourceCreateInput = {
  content?: string
  name?: string
}

export interface VBIWorkspaceSlot<TBuilder = unknown> {
  close?(id?: string): Promise<void>
  create?(input?: VBIResourceCreateInput): Promise<unknown> | unknown
  describe?(id?: string): Promise<unknown> | unknown
  list?(): Promise<VBIResourceSummary[]> | VBIResourceSummary[]
  open(id?: string): Promise<TBuilder>
  remove?(id: string): Promise<unknown> | unknown
  rename?(id: string, name: string): Promise<unknown> | unknown
  snapshot?(id?: string): Promise<unknown> | unknown
}

export interface VBIWorkspaceConnector {
  discoverSchema(): Promise<unknown>
  query(queryProps: unknown): Promise<unknown>
}

export type VBIWorkspaceConnectorRegistration = VBIWorkspaceConnector | (() => Promise<VBIWorkspaceConnector>)

export interface VBIWorkspaceConnectors {
  getChartConnectorId?(chartId?: string): Promise<string>
  register(id: string, connector: VBIWorkspaceConnectorRegistration): string
  registerChart?(chartId: string | undefined, connector: VBIWorkspaceConnectorRegistration): Promise<string>
}

export interface VBIAgentWorkspace {
  chart?: VBIWorkspaceSlot<VBIChartBuilder>
  connectors?: VBIWorkspaceConnectors
  insight?: VBIWorkspaceSlot<VBIInsightBuilder>
}
