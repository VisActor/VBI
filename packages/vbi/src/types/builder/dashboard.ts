import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIChartBuilder } from 'src/chart-builder/builder'
import type { UndoManager } from 'src/chart-builder/features'
import type { UndoManagerOptions } from 'src/chart-builder/features/undo-manager/undo-manager'
import type { VBIInsightBuilder } from 'src/insight-builder/builder'
import type { DashboardThemeBuilder } from 'src/dashboard-builder/features/theme/theme-builder'
import type { DashboardChartCollectionBuilder } from 'src/dashboard-builder/features/chart/chart-collection-builder'
import type { DashboardInsightCollectionBuilder } from 'src/dashboard-builder/features/insight/insight-collection-builder'
import type { Doc, Map } from 'yjs'
import type { VBIDashboardDSL, VBIDashboardThemeDefinition } from '../dashboardDSL'
import type { VBIChartBuilderOptions } from './adapter'

export interface VBIDashboardResolvedTheme {
  name: string
  chartTheme: string
  baseTheme: 'light' | 'dark'
  definition?: VBIDashboardThemeDefinition
}

export interface VBIDashboardThemeOption {
  name: string
  baseTheme: 'light' | 'dark'
  label?: string
  colors: string[]
}

export interface VBIDashboardBuilderOptions<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  chart?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>
  /** @description 本地撤销配置；默认每个事务独立成一步，不记录远端同步。 */
  undoManager?: UndoManagerOptions
}

export interface VBIDashboardBuilderInterface<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  doc: Doc
  dsl: Map<any>
  undoManager: UndoManager
  theme: DashboardThemeBuilder
  chart: DashboardChartCollectionBuilder<TQueryDSL, TSeedDSL, VBIDashboardBuilderInterface<TQueryDSL, TSeedDSL>>
  insight: DashboardInsightCollectionBuilder<TQueryDSL, TSeedDSL, VBIDashboardBuilderInterface<TQueryDSL, TSeedDSL>>

  applyUpdate: (update: Uint8Array, origin?: any) => void
  encodeStateAsUpdate: (targetStateVector?: Uint8Array) => Uint8Array
  transact: (callback: () => void, origin?: unknown) => void

  getUUID: () => string
  getChartBuilder: (chartId: string) => VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
  getInsightBuilder: (insightId: string) => VBIInsightBuilder | undefined
  build: () => VBIDashboardDSL
  isEmpty: () => boolean
}
