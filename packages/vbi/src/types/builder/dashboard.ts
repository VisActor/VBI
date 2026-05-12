import type { UndoManager } from 'src/chart-builder/features'
import type {
  DashboardChartBuilder,
  DashboardChartCollectionBuilder,
  DashboardInsightBuilder,
  DashboardInsightCollectionBuilder,
  DashboardMetaBuilder,
} from 'src/dashboard-builder/features'
import type { Doc, Map } from 'yjs'
import type {
  VBIDashboardBreakpoint,
  VBIDashboardChartWidget,
  VBIDashboardDSL,
  VBIDashboardGridItemLayout,
  VBIDashboardInsightWidget,
  VBIDashboardMeta,
} from '../dashboardDSL'

export type VBIDashboardGridItemInput = Omit<VBIDashboardGridItemLayout, 'widgetId'>

export type VBISetDashboardWidgetLayoutsInput = Partial<Record<VBIDashboardBreakpoint, VBIDashboardGridItemInput>>

export type VBIAddDashboardWidgetLayoutsInput = VBISetDashboardWidgetLayoutsInput & {
  lg: VBIDashboardGridItemInput
}

export type VBIAddDashboardChartCallback = (chart: DashboardChartBuilder) => void

export type VBIUpdateDashboardChartCallback = (chart: DashboardChartBuilder) => void

export type VBIAddDashboardInsightCallback = (insight: DashboardInsightBuilder) => void

export type VBIUpdateDashboardInsightCallback = (insight: DashboardInsightBuilder) => void

export type VBISetDashboardMetaInput = Partial<VBIDashboardMeta>

export interface VBIDashboardBuilderInterface {
  doc: Doc
  dsl: Map<any>
  undoManager: UndoManager

  meta: DashboardMetaBuilder
  chart: DashboardChartCollectionBuilder
  insight: DashboardInsightCollectionBuilder

  addChart: (callback: VBIAddDashboardChartCallback) => VBIDashboardBuilderInterface
  updateChart: (widgetId: string, callback: VBIUpdateDashboardChartCallback) => VBIDashboardBuilderInterface
  removeChart: (widgetId: string) => VBIDashboardBuilderInterface
  getChart: (widgetId: string) => DashboardChartBuilder | undefined
  findAllCharts: () => DashboardChartBuilder[]

  addInsight: (callback: VBIAddDashboardInsightCallback) => VBIDashboardBuilderInterface
  updateInsight: (widgetId: string, callback: VBIUpdateDashboardInsightCallback) => VBIDashboardBuilderInterface
  removeInsight: (widgetId: string) => VBIDashboardBuilderInterface
  getInsight: (widgetId: string) => DashboardInsightBuilder | undefined
  findAllInsights: () => DashboardInsightBuilder[]

  applyUpdate: (update: Uint8Array, origin?: any) => void
  encodeStateAsUpdate: (targetStateVector?: Uint8Array) => Uint8Array

  getUUID: () => string
  build: () => VBIDashboardDSL
  isEmpty: () => boolean
}

export type VBIDashboardChartCollectionJSON = VBIDashboardChartWidget[]

export type VBIDashboardInsightCollectionJSON = VBIDashboardInsightWidget[]
