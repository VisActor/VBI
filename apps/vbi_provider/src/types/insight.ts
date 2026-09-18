import type { HocuspocusProvider } from '@hocuspocus/provider'
import type { VBIInsightBuilder, VBIInsightDSL } from '@visactor/vbi'
import type { ProviderResource, ResourceCreateInput, ResourceSnapshot } from './resource'

export type InsightSummary = ProviderResource

export interface InsightDetail extends ProviderResource {
  dsl: VBIInsightDSL
}

export interface InsightCreateInput extends ResourceCreateInput {
  content?: string
}

export interface InsightResponse extends InsightSummary {
  content?: string
}

export interface InsightProvider {
  getResourceId(): string | null
  create(input?: InsightCreateInput): Promise<InsightSummary>
  remove(): Promise<InsightSummary>
  rename(name: string): Promise<InsightSummary>
  open(): Promise<VBIInsightBuilder>
  close(): Promise<void>
  getBuilder(): Promise<VBIInsightBuilder>
  getCollaborationProvider(): Promise<HocuspocusProvider | null>
  getSummary(): Promise<InsightSummary>
  getDetail(): Promise<InsightDetail>
  snapshot(): Promise<ResourceSnapshot<VBIInsightDSL>>
}
