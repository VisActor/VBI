import type { HocuspocusProvider } from '@hocuspocus/provider'
import type { VBIChartBuilder, VBIChartDSL } from '@visactor/vbi'
import type { ProviderResource, ResourceCreateInput, ResourceSnapshot } from './resource'

export type ChartSummary = ProviderResource

export interface ChartDetail extends ProviderResource {
  dsl: VBIChartDSL
}

export interface ChartProvider {
  getResourceId(): string | null
  create(input?: ResourceCreateInput): Promise<ChartSummary>
  remove(): Promise<ChartSummary>
  rename(name: string): Promise<ChartSummary>
  open(): Promise<VBIChartBuilder>
  close(): Promise<void>
  getBuilder(): Promise<VBIChartBuilder>
  getCollaborationProvider(): Promise<HocuspocusProvider | null>
  getSummary(): Promise<ChartSummary>
  getDetail(): Promise<ChartDetail>
  snapshot(): Promise<ResourceSnapshot<VBIChartDSL>>
}
