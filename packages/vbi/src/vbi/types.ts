import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIChartBuilder } from 'src/chart-builder/builder'
import type { VBIDashboardBuilder } from 'src/dashboard-builder/builder'
import type { VBIInsightBuilder } from 'src/insight-builder/builder'
import type { VBIReportBuilder } from 'src/report-builder/builder'
import type {
  VBIChartBuilderOptions,
  VBIChartDSLInput,
  VBIDashboardDSLInput,
  VBIInsightDSLInput,
  VBIReportBuilderOptions,
  VBIReportDSLInput,
} from 'src/types'
import type { connectorMap, getConnector, registerConnector } from 'src/chart-builder/connector'
import type { createEmptyChart } from './create-empty-chart'
import type { createEmptyDashboard } from './create-empty-dashboard'
import type { createEmptyInsight } from './create-empty-insight'
import type { createEmptyReport } from './create-empty-report'
import type { createEmptyReportPage } from './create-empty-report-page'

export interface VBIChartNamespace<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  create: (
    vbi: VBIChartDSLInput,
    builderOptions?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>,
  ) => VBIChartBuilder<TQueryDSL, TSeedDSL>
  createEmpty: typeof createEmptyChart
}

export interface VBIInsightNamespace {
  create: (insight: VBIInsightDSLInput) => VBIInsightBuilder
  createEmpty: typeof createEmptyInsight
}

export interface VBIReportNamespace<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  create: (
    report: VBIReportDSLInput,
    builderOptions?: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>,
  ) => VBIReportBuilder<TQueryDSL, TSeedDSL>
  createEmpty: typeof createEmptyReport
  createEmptyPage: typeof createEmptyReportPage
}

export interface VBIDashboardNamespace {
  create: (dashboard: VBIDashboardDSLInput) => VBIDashboardBuilder
  createEmpty: typeof createEmptyDashboard
}

export type VBIChartBuilderFactory<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> = (
  vbi: VBIChartDSLInput,
  builderOptions?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>,
) => VBIChartBuilder<TQueryDSL, TSeedDSL>

export interface VBIInstance<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  connectorMap: typeof connectorMap
  registerConnector: typeof registerConnector
  getConnector: typeof getConnector
  chart: VBIChartNamespace<TQueryDSL, TSeedDSL>
  insight: VBIInsightNamespace
  report: VBIReportNamespace<TQueryDSL, TSeedDSL>
  dashboard: VBIDashboardNamespace
}
