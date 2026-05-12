import * as Y from 'yjs'

import type {
  VBIAddDashboardChartCallback,
  VBIAddDashboardInsightCallback,
  VBIDashboardBuilderInterface,
  VBIDashboardDSL,
  VBIUpdateDashboardChartCallback,
  VBIUpdateDashboardInsightCallback,
} from 'src/types'
import { UndoManager } from 'src/chart-builder/features'
import { applyUpdateToDoc, buildVBIDashboardDSL, encodeDocStateAsUpdate, isEmptyVBIDashboardDSL } from './modules'
import {
  DashboardChartBuilder,
  DashboardChartCollectionBuilder,
  DashboardInsightBuilder,
  DashboardInsightCollectionBuilder,
  DashboardMetaBuilder,
} from './features'
import { ensureResourceUUID, getResourceUUID } from 'src/vbi/resource-uuid'
import { ensureDashboardDSLStructure } from 'src/vbi/from'

export class VBIDashboardBuilder implements VBIDashboardBuilderInterface {
  public doc: Y.Doc
  public dsl: Y.Map<any>
  public undoManager: UndoManager

  public meta: DashboardMetaBuilder
  public chart: DashboardChartCollectionBuilder
  public insight: DashboardInsightCollectionBuilder

  constructor(doc: Y.Doc) {
    this.doc = doc
    this.dsl = doc.getMap('dsl') as Y.Map<any>

    doc.transact(() => {
      ensureResourceUUID(this.dsl)
      ensureDashboardDSLStructure(this.dsl)
    })

    this.undoManager = new UndoManager(this.dsl)
    this.meta = new DashboardMetaBuilder(doc, this.dsl)
    this.chart = new DashboardChartCollectionBuilder(this, doc, this.dsl)
    this.insight = new DashboardInsightCollectionBuilder(this, doc, this.dsl)
  }

  public addChart = (callback: VBIAddDashboardChartCallback): VBIDashboardBuilder => this.chart.add(callback)

  public updateChart = (widgetId: string, callback: VBIUpdateDashboardChartCallback): VBIDashboardBuilder =>
    this.chart.update(widgetId, callback)

  public removeChart = (widgetId: string): VBIDashboardBuilder => this.chart.remove(widgetId)

  public getChart = (widgetId: string): DashboardChartBuilder | undefined => this.chart.get(widgetId)

  public findAllCharts = (): DashboardChartBuilder[] => this.chart.findAll()

  public addInsight = (callback: VBIAddDashboardInsightCallback): VBIDashboardBuilder => this.insight.add(callback)

  public updateInsight = (widgetId: string, callback: VBIUpdateDashboardInsightCallback): VBIDashboardBuilder =>
    this.insight.update(widgetId, callback)

  public removeInsight = (widgetId: string): VBIDashboardBuilder => this.insight.remove(widgetId)

  public getInsight = (widgetId: string): DashboardInsightBuilder | undefined => this.insight.get(widgetId)

  public findAllInsights = (): DashboardInsightBuilder[] => this.insight.findAll()

  public applyUpdate = (update: Uint8Array, transactionOrigin?: any) => {
    return applyUpdateToDoc(this.doc, update, transactionOrigin)
  }

  public encodeStateAsUpdate = (targetStateVector?: Uint8Array) => {
    return encodeDocStateAsUpdate(this.doc, targetStateVector)
  }

  public getUUID = (): string => getResourceUUID(this.dsl)

  public build = (): VBIDashboardDSL => buildVBIDashboardDSL(this.dsl)

  public isEmpty = (): boolean => isEmptyVBIDashboardDSL(this.dsl)
}
