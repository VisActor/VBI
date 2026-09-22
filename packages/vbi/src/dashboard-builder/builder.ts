import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIChartBuilder } from 'src/chart-builder/builder'
import type { VBIInsightBuilder } from 'src/insight-builder/builder'
import type { VBIDashboardBuilderInterface, VBIDashboardBuilderOptions, VBIDashboardDSL } from 'src/types'
import { VBIDashboardDefaultBreakpoints } from 'src/types/dashboardDSL/breakpoint'
import { createEmptyDashboardLayout } from 'src/vbi/create-empty-dashboard'
import { getOrCreateDashboardWidgets } from 'src/vbi/from/dashboard-widget-y-map'
import type { VBIResourceRegistry } from 'src/vbi/resources'
import { ensureResourceUUID, getResourceUUID } from 'src/vbi/resource-uuid'
import type * as Y from 'yjs'
import {
  DashboardChartCollectionBuilder,
  DashboardInsightCollectionBuilder,
  DashboardThemeBuilder,
  UndoManager,
} from './features'
import { applyUpdateToDoc, buildVBIDashboardDSL, encodeDocStateAsUpdate, isEmptyVBIDashboardDSL } from './modules'

export interface VBIDashboardBuilderDependencies<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  builderOptions?: VBIDashboardBuilderOptions<TQueryDSL, TSeedDSL>
  resourceRegistry?: VBIResourceRegistry<TQueryDSL, TSeedDSL>
}

export class VBIDashboardBuilder<
  TQueryDSL = DefaultVBIQueryDSL,
  TSeedDSL = DefaultVBISeedDSL,
> implements VBIDashboardBuilderInterface<TQueryDSL, TSeedDSL> {
  public doc: Y.Doc
  public dsl: Y.Map<any>
  public undoManager: UndoManager
  public theme: DashboardThemeBuilder
  public chart: DashboardChartCollectionBuilder<TQueryDSL, TSeedDSL, VBIDashboardBuilder<TQueryDSL, TSeedDSL>>
  public insight: DashboardInsightCollectionBuilder<TQueryDSL, TSeedDSL, VBIDashboardBuilder<TQueryDSL, TSeedDSL>>
  private builderOptions?: VBIDashboardBuilderOptions<TQueryDSL, TSeedDSL>
  private resourceRegistry?: VBIResourceRegistry<TQueryDSL, TSeedDSL>

  constructor(doc: Y.Doc, dependencies: VBIDashboardBuilderDependencies<TQueryDSL, TSeedDSL> = {}) {
    this.doc = doc
    this.dsl = doc.getMap('dsl') as Y.Map<any>
    this.builderOptions = dependencies.builderOptions
    this.resourceRegistry = dependencies.resourceRegistry

    doc.transact(() => {
      ensureResourceUUID(this.dsl)
      getOrCreateDashboardWidgets(this.dsl)
      if (this.dsl.get('breakpoints') === undefined) {
        this.dsl.set('breakpoints', { ...VBIDashboardDefaultBreakpoints })
      }
      if (this.dsl.get('layout') === undefined) {
        this.dsl.set('layout', createEmptyDashboardLayout())
      }
      if (this.dsl.get('meta') === undefined) {
        this.dsl.set('meta', {
          title: '',
          theme: 'light',
        })
      }
      if (this.dsl.get('version') === undefined) {
        this.dsl.set('version', 0)
      }
    })

    this.undoManager = new UndoManager(this.dsl)
    this.theme = new DashboardThemeBuilder(this.dsl)
    this.chart = new DashboardChartCollectionBuilder<TQueryDSL, TSeedDSL, VBIDashboardBuilder<TQueryDSL, TSeedDSL>>(
      doc,
      this.dsl,
      this,
    )
    this.insight = new DashboardInsightCollectionBuilder<TQueryDSL, TSeedDSL, VBIDashboardBuilder<TQueryDSL, TSeedDSL>>(
      doc,
      this.dsl,
      this,
    )
  }

  public applyUpdate = (update: Uint8Array, transactionOrigin?: any) => {
    return applyUpdateToDoc(this.doc, update, transactionOrigin)
  }

  public encodeStateAsUpdate = (targetStateVector?: Uint8Array) => {
    return encodeDocStateAsUpdate(this.doc, targetStateVector)
  }

  public getUUID = (): string => getResourceUUID(this.dsl)

  public getChartBuilder = (chartId: string): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined => {
    if (!this.resourceRegistry || !chartId) {
      return undefined
    }
    return this.resourceRegistry.charts.resolveBuilder(chartId, this.builderOptions?.chart)
  }

  public getInsightBuilder = (insightId: string): VBIInsightBuilder | undefined => {
    if (!this.resourceRegistry || !insightId) {
      return undefined
    }
    return this.resourceRegistry.insights.resolveBuilder(insightId)
  }

  public build = (): VBIDashboardDSL => buildVBIDashboardDSL(this.dsl)

  public isEmpty = (): boolean => isEmptyVBIDashboardDSL(this.dsl)
}
