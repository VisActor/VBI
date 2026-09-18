import type { HocuspocusProvider } from '@hocuspocus/provider'
import type { StoreApi, UseBoundStore } from 'zustand'
import type { VBIChartBuilder, VBIInsightBuilder } from '@visactor/vbi'

export type BuilderByKind = {
  chart: VBIChartBuilder
  insight: VBIInsightBuilder
}

export type BuilderSession<TBuilder> = {
  builder: TBuilder | null
  handle: {
    close(): Promise<void>
    getCollaborationProvider(): Promise<HocuspocusProvider | null>
    open(): Promise<unknown>
  }
  opening: Promise<void> | null
  provider: HocuspocusProvider | null
  refs: number
  stopSync: (() => void) | null
  version: number
}

export type BuilderStoreState<TBuilder> = {
  connect(resourceId: string): Promise<void>
  release(resourceId: string): Promise<void>
  retain(resourceId: string): void
  sessions: Record<string, BuilderSession<TBuilder>>
}

export type BuilderModel<TBuilder> = UseBoundStore<StoreApi<BuilderStoreState<TBuilder>>>
