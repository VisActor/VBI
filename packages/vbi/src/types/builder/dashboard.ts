import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIChartBuilder } from 'src/chart-builder/builder'
import type { UndoManager } from 'src/chart-builder/features'
import type { VBIInsightBuilder } from 'src/insight-builder/builder'
import type { DashboardThemeBuilder } from 'src/dashboard-builder/features/theme/theme-builder'
import type { Doc, Map } from 'yjs'
import type { VBIDashboardDSL } from '../dashboardDSL'
import type { VBIChartBuilderOptions } from './adapter'

export interface VBIDashboardBuilderOptions<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  chart?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>
}

export interface VBIDashboardBuilderInterface<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  doc: Doc
  dsl: Map<any>
  undoManager: UndoManager
  theme: DashboardThemeBuilder

  applyUpdate: (update: Uint8Array, origin?: any) => void
  encodeStateAsUpdate: (targetStateVector?: Uint8Array) => Uint8Array

  getUUID: () => string
  getChartBuilder: (chartId: string) => VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
  getInsightBuilder: (insightId: string) => VBIInsightBuilder | undefined
  build: () => VBIDashboardDSL
  isEmpty: () => boolean
}
