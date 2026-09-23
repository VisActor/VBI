import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIChartBuilder } from 'src/chart-builder/builder'
import type { VBIInsightBuilder } from 'src/insight-builder/builder'
import type { VBIDashboardBuilderInterface, VBIDashboardBuilderOptions, VBIDashboardDSL } from 'src/types'
import { VBIDashboardDefaultBreakpoints } from 'src/types/dashboardDSL/breakpoint'
import { createEmptyDashboardLayout } from 'src/vbi/create-empty-dashboard'
import { getOrCreateDashboardWidgets } from 'src/vbi/from/dashboard-widget-y-map'
import { ensureDashboardLayout } from './features/layout-merge'
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

/** @description 基于 Yjs 的仪表盘构建器。管理组件、布局与主题；引用的图表和洞察资源拥有独立的文档及撤销历史。 */
export class VBIDashboardBuilder<
  TQueryDSL = DefaultVBIQueryDSL,
  TSeedDSL = DefaultVBISeedDSL,
> implements VBIDashboardBuilderInterface<TQueryDSL, TSeedDSL> {
  /** @description 所属 Yjs 文档；可对接同步提供者，通过 doc.destroy() 释放文档及撤销监听器。 */
  public doc: Y.Doc
  /** @description 仪表盘根共享类型；嵌套组件与布局的本地事务均在撤销追踪范围内。 */
  public dsl: Y.Map<any>
  /** @description 仪表盘本地撤销历史，深度追踪 DSL 子类型，默认每个事务独立成一步；远端更新不进入历史。 */
  public undoManager: UndoManager
  /** @description 主题配置、预设与主题变化订阅。 */
  public theme: DashboardThemeBuilder
  /** @description 图表组件的增删改查及布局提交。 */
  public chart: DashboardChartCollectionBuilder<TQueryDSL, TSeedDSL, VBIDashboardBuilder<TQueryDSL, TSeedDSL>>
  /** @description 洞察组件的增删改查及布局提交。 */
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
      ensureDashboardLayout(this.dsl)
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

    this.undoManager = new UndoManager(this.dsl, { captureTimeout: 0, ...this.builderOptions?.undoManager })
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

  /** @description 合并远端 Yjs 更新，不记录到本地撤销历史。origin 可用于同步提供者识别和防止回传。 */
  public applyUpdate = (update: Uint8Array, transactionOrigin?: unknown): void => {
    return applyUpdateToDoc(this.doc, update, transactionOrigin)
  }

  /** @description 导出 Yjs 更新；传入对端状态向量可仅导出增量。包含撤销/重做产生的文档变更，不包含本地历史栈。 */
  public encodeStateAsUpdate = (targetStateVector?: Uint8Array): Uint8Array => {
    return encodeDocStateAsUpdate(this.doc, targetStateVector)
  }

  /** @description 将多个同步修改合并为一个 Yjs 事务和撤销步骤。自定义 origin 需加入 undoManager 的 trackedOrigins；事务不会自动回滚异常。 */
  public transact = (callback: () => void, origin?: unknown): void => {
    this.doc.transact(callback, origin)
  }

  /** @description 获取仪表盘资源 UUID。 */
  public getUUID = (): string => getResourceUUID(this.dsl)

  /** @description 从当前 VBI 资源注册表解析图表构建器；资源修改使用图表自身的撤销历史。 */
  public getChartBuilder = (chartId: string): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined => {
    if (!this.resourceRegistry || !chartId) {
      return undefined
    }
    return this.resourceRegistry.charts.resolveBuilder(chartId, this.builderOptions?.chart)
  }

  /** @description 从当前 VBI 资源注册表解析洞察构建器；资源修改使用洞察自身的撤销历史。 */
  public getInsightBuilder = (insightId: string): VBIInsightBuilder | undefined => {
    if (!this.resourceRegistry || !insightId) {
      return undefined
    }
    return this.resourceRegistry.insights.resolveBuilder(insightId)
  }

  /** @description 校验并导出纯 JSON DSL，Yjs 内部类型不会出现在结果中。 */
  public build = (): VBIDashboardDSL => buildVBIDashboardDSL(this.dsl)

  /** @description 判断仪表盘是否不包含组件。 */
  public isEmpty = (): boolean => isEmptyVBIDashboardDSL(this.dsl)
}
