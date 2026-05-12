import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import { connectorMap, getConnector, registerConnector } from 'src/chart-builder/connector'
import type {
  VBIChartBuilderOptions,
  VBIChartDSLInput,
  VBIDashboardDSLInput,
  VBIInsightDSLInput,
  VBIReportBuilderOptions,
  VBIReportDSLInput,
} from 'src/types'
import {
  createChartBuilderFromVBIChartDSLInput,
  createDashboardBuilderFromVBIDashboardDSLInput,
  createInsightBuilderFromVBIInsightDSLInput,
  createReportBuilderFromVBIReportDSLInput,
} from './from'
import { createVBIResourceRegistry } from './resources'
import { createEmptyChart } from './create-empty-chart'
import { createEmptyDashboard } from './create-empty-dashboard'
import { createEmptyInsight } from './create-empty-insight'
import { createEmptyReport } from './create-empty-report'
import { createEmptyReportPage } from './create-empty-report-page'
import { mergeBuilderOptions, mergeReportBuilderOptions } from './merge-builder-options'
import type { VBIInstance } from './types'

export function createVBI(): VBIInstance<DefaultVBIQueryDSL, DefaultVBISeedDSL>
export function createVBI<TQueryDSL, TSeedDSL>(
  defaultBuilderOptions: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>,
): VBIInstance<TQueryDSL, TSeedDSL>
export function createVBI<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL>(
  defaultBuilderOptions?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>,
) {
  const resourceRegistry = createVBIResourceRegistry<TQueryDSL, TSeedDSL>()

  const createChart = (vbi: VBIChartDSLInput, builderOptions?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>) => {
    const options = mergeBuilderOptions(defaultBuilderOptions, builderOptions)
    const builder = createChartBuilderFromVBIChartDSLInput(vbi, options)
    resourceRegistry.charts.registerBuilder(builder.getUUID(), builder)
    return builder
  }

  const createInsight = (insight: VBIInsightDSLInput) => {
    const builder = createInsightBuilderFromVBIInsightDSLInput(insight)
    resourceRegistry.insights.registerBuilder(builder.getUUID(), builder)
    return builder
  }

  const createReport = (report: VBIReportDSLInput, builderOptions?: VBIReportBuilderOptions<TQueryDSL, TSeedDSL>) => {
    const options = mergeReportBuilderOptions(defaultBuilderOptions, builderOptions)
    return createReportBuilderFromVBIReportDSLInput(report, options, resourceRegistry)
  }

  const createDashboard = (dashboard: VBIDashboardDSLInput) => {
    return createDashboardBuilderFromVBIDashboardDSLInput(dashboard)
  }

  return {
    connectorMap,
    registerConnector,
    getConnector,
    chart: {
      create: createChart,
      createEmpty: createEmptyChart,
    },
    insight: {
      create: createInsight,
      createEmpty: createEmptyInsight,
    },
    report: {
      create: createReport,
      createEmpty: createEmptyReport,
      createEmptyPage: createEmptyReportPage,
    },
    dashboard: {
      create: createDashboard,
      createEmpty: createEmptyDashboard,
    },
  } satisfies VBIInstance<TQueryDSL, TSeedDSL>
}
