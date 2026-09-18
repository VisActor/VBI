import type { VBIChartBuilder, VBIInsightBuilder } from '@visactor/vbi'
import type { InsightRecord, ResourceItem } from '../../types'
import type { ApplicationCleanup } from '../core/store'

export type ResourceBuilderProjection<TBuilder> = {
  builder: TBuilder | null
  version: number
}

export type ResourceCreateInput = {
  content?: string
  name?: string
}

export type ResourceRenameInput = {
  id: string
  name: string
}

export type ResourceActivateOptions = {
  userName?: string
}

export type ResourceRecordsApplication<TItem extends ResourceItem = ResourceItem> = {
  loading: boolean
  searchText: string
  selectedIds: string[]
  visibleItems: TItem[]
  activate(options?: ResourceActivateOptions): ApplicationCleanup
  deleteSelected(): Promise<void>
  search(searchText: string): void
  select(ids: string[]): void
}

export type ResourceEditorApplication<TBuilder = unknown> = {
  builders: Record<string, ResourceBuilderProjection<TBuilder>>
  connect(id: string, userName: string): ApplicationCleanup
  release(id: string): Promise<void>
}

export type ResourceApplication<TItem extends ResourceItem = ResourceItem, TBuilder = unknown> = {
  editor: ResourceEditorApplication<TBuilder>
  records: ResourceRecordsApplication<TItem>
  activate(options?: ResourceActivateOptions): ApplicationCleanup
  create(input?: ResourceCreateInput): Promise<void>
  delete(id: string): Promise<void>
  list(): Promise<TItem[]>
  open(id: string): Promise<void>
  rename(input: ResourceRenameInput): Promise<void>
}

export type ChartApplication = ResourceApplication<ResourceItem, VBIChartBuilder>

export type InsightApplication = ResourceApplication<InsightRecord, VBIInsightBuilder>
