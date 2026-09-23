import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIChartBuilder } from 'src/chart-builder/builder'
import type { VBIDashboardWidget } from 'src/types'
import { id } from 'src/utils'
import {
  getOrCreateDashboardWidgets,
  locateDashboardWidgetIndexById,
  removeDashboardWidgetLayouts,
} from 'src/vbi/from/dashboard-widget-y-map'
import * as Y from 'yjs'
import { mergeWidgetLayoutsIntoDSL } from '../layout-merge'
import { DashboardChartBuilder } from './chart-builder'

export interface DashboardChartCollectionDashboardBuilder<
  TQueryDSL = DefaultVBIQueryDSL,
  TSeedDSL = DefaultVBISeedDSL,
> {
  getChartBuilder: (chartId: string) => VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
}

export class DashboardChartCollectionBuilder<
  TQueryDSL = DefaultVBIQueryDSL,
  TSeedDSL = DefaultVBISeedDSL,
  TDashboardBuilder extends DashboardChartCollectionDashboardBuilder<TQueryDSL, TSeedDSL> =
    DashboardChartCollectionDashboardBuilder<TQueryDSL, TSeedDSL>,
> {
  constructor(
    private doc: Y.Doc,
    private dsl: Y.Map<any>,
    private dashboardBuilder: TDashboardBuilder,
  ) {}

  /** @description 新增图表组件，回调必须设置 layouts.lg。组件与各断点布局在同一个 Yjs 事务中写入，可一起撤销。 */
  add(callback: (chart: DashboardChartBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder {
    const widgetId = id.uuid()
    const chartId = id.uuid()

    const widgetMap = new Y.Map<any>()
    widgetMap.set('id', widgetId)
    widgetMap.set('type', 'chart')
    widgetMap.set('title', '')
    widgetMap.set('description', '')
    widgetMap.set('chartId', chartId)

    const widgets = getOrCreateDashboardWidgets(this.dsl)

    this.doc.transact(() => {
      widgets.push([widgetMap])
      const builder = new DashboardChartBuilder<TQueryDSL, TSeedDSL>(widgetMap, {
        getBuilder: (chartId) => this.dashboardBuilder.getChartBuilder(chartId),
      })
      callback(builder)

      const layouts = builder.getLayouts()
      if (!layouts.lg) {
        const index = locateDashboardWidgetIndexById(widgets, widgetId)
        if (index !== -1) widgets.delete(index, 1)
        throw new Error('addChart requires layouts.lg to be set')
      }
      mergeWidgetLayoutsIntoDSL(this.dsl, widgetId, layouts)
    })

    return this.dashboardBuilder
  }

  /** @description 在同一个 Yjs 事务中更新图表组件及布局；未找到组件时抛出错误。 */
  update(widgetId: string, callback: (chart: DashboardChartBuilder<TQueryDSL, TSeedDSL>) => void): TDashboardBuilder {
    this.doc.transact(() => {
      const builder = this.get(widgetId)
      if (!builder) {
        throw new Error(`Chart widget with id "${widgetId}" not found`)
      }
      callback(builder)

      const layouts = builder.getLayouts()
      if (Object.keys(layouts).length > 0) {
        mergeWidgetLayoutsIntoDSL(this.dsl, widgetId, layouts)
      }
    })
    return this.dashboardBuilder
  }

  /** @description 在同一个 Yjs 事务中删除图表组件及全部断点布局，可一起恢复；引用资源不会删除。 */
  remove(widgetId: string): TDashboardBuilder {
    this.doc.transact(() => {
      const widgets = getOrCreateDashboardWidgets(this.dsl)
      const index = locateDashboardWidgetIndexById(widgets, widgetId)
      if (index !== -1) {
        widgets.delete(index, 1)
      }
      removeDashboardWidgetLayouts(this.dsl, widgetId)
    })
    return this.dashboardBuilder
  }

  /** @description 通过组件 ID 或引用资源 ID 获取组件构建器，未找到时返回 undefined。 */
  get(widgetId: string): DashboardChartBuilder<TQueryDSL, TSeedDSL> | undefined {
    return this.find(widgetId)
  }

  /** @description 通过组件 ID 或引用资源 ID 查找第一个匹配的组件。 */
  find(id: string): DashboardChartBuilder<TQueryDSL, TSeedDSL> | undefined {
    const widgets = getOrCreateDashboardWidgets(this.dsl)
    for (let index = 0; index < widgets.length; index += 1) {
      const widget = widgets.get(index)
      const isTargetChart = widget.get('type') === 'chart' && (widget.get('id') === id || widget.get('chartId') === id)
      if (isTargetChart) {
        return new DashboardChartBuilder<TQueryDSL, TSeedDSL>(widget, {
          getBuilder: (chartId) => this.dashboardBuilder.getChartBuilder(chartId),
        })
      }
    }
    return undefined
  }

  /** @description 按仪表盘顺序获取全部图表组件构建器。 */
  findAll(): DashboardChartBuilder<TQueryDSL, TSeedDSL>[] {
    const widgets = getOrCreateDashboardWidgets(this.dsl)
    const result: DashboardChartBuilder<TQueryDSL, TSeedDSL>[] = []
    widgets.forEach((widget) => {
      if (widget.get('type') === 'chart') {
        result.push(
          new DashboardChartBuilder<TQueryDSL, TSeedDSL>(widget, {
            getBuilder: (chartId) => this.dashboardBuilder.getChartBuilder(chartId),
          }),
        )
      }
    })
    return result
  }

  /** @description 导出全部图表组件的纯 JSON 配置。 */
  toJSON(): VBIDashboardWidget[] {
    return this.findAll().map((builder) => builder.toJSON())
  }
}
