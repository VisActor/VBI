import * as Y from 'yjs'

import type { VBIDashboardBuilder } from 'src/dashboard-builder/builder'
import type {
  VBIAddDashboardChartCallback,
  VBIUpdateDashboardChartCallback,
  VBIDashboardChartCollectionJSON,
} from 'src/types'
import {
  findDashboardWidget,
  getOrCreateDashboardWidgets,
  hasDashboardLayout,
  pushDashboardWidget,
  removeDashboardWidgetById,
  removeDashboardWidgetLayouts,
} from 'src/vbi/from'
import { id } from 'src/utils'
import { DashboardChartBuilder } from './chart-builder'

export class DashboardChartCollectionBuilder {
  constructor(
    private parent: VBIDashboardBuilder,
    private doc: Y.Doc,
    private dsl: Y.Map<any>,
  ) {
    doc.transact(() => {
      getOrCreateDashboardWidgets(this.dsl)
    })
  }

  add(callback: VBIAddDashboardChartCallback): VBIDashboardBuilder {
    const widgetId = id.uuid()

    this.doc.transact(() => {
      pushDashboardWidget(this.dsl, {
        id: widgetId,
        type: 'chart',
        chartId: id.resourceUUID(),
      })

      const chart = this.requireChart(widgetId)
      callback(chart)

      if (!hasDashboardLayout(this.dsl, widgetId, 'lg')) {
        removeDashboardWidgetById(this.dsl, widgetId)
        removeDashboardWidgetLayouts(this.dsl, widgetId)
        throw new Error('Dashboard chart requires layouts.lg when adding')
      }
    })

    return this.parent
  }

  update(widgetId: string, callback: VBIUpdateDashboardChartCallback): VBIDashboardBuilder {
    this.doc.transact(() => {
      const chart = this.requireChart(widgetId)
      callback(chart)
    })

    return this.parent
  }

  remove(widgetId: string): VBIDashboardBuilder {
    this.doc.transact(() => {
      const chart = this.resolveChart(widgetId)
      if (!chart) {
        return
      }

      removeDashboardWidgetById(this.dsl, widgetId)
      removeDashboardWidgetLayouts(this.dsl, widgetId)
    })

    return this.parent
  }

  get(widgetId: string): DashboardChartBuilder | undefined {
    const chart = this.resolveChart(widgetId)
    return chart ? this.createChartBuilder(chart) : undefined
  }

  findAll(): DashboardChartBuilder[] {
    const widgets = getOrCreateDashboardWidgets(this.dsl)
    const charts: DashboardChartBuilder[] = []
    for (let index = 0; index < widgets.length; index++) {
      const widget = widgets.get(index)
      if (widget?.get('type') === 'chart') {
        charts.push(this.createChartBuilder(widget))
      }
    }
    return charts
  }

  toJSON(): VBIDashboardChartCollectionJSON {
    return this.findAll().map((chart) => chart.toJSON())
  }

  private createChartBuilder(widget: Y.Map<any>): DashboardChartBuilder {
    return new DashboardChartBuilder(this.dsl, widget)
  }

  private resolveChart(widgetId: string): Y.Map<any> | undefined {
    const widget = findDashboardWidget(this.dsl, widgetId)
    if (!widget || widget.get('type') !== 'chart') {
      return undefined
    }
    return widget
  }

  private requireChart(widgetId: string): DashboardChartBuilder {
    const chart = this.get(widgetId)
    if (!chart) {
      throw new Error(`Dashboard chart with id "${widgetId}" not found`)
    }
    return chart
  }
}
