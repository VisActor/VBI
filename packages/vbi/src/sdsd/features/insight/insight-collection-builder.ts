import * as Y from 'yjs'

import type { VBIDashboardBuilder } from 'src/dashboard-builder/builder'
import type {
  VBIAddDashboardInsightCallback,
  VBIUpdateDashboardInsightCallback,
  VBIDashboardInsightCollectionJSON,
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
import { DashboardInsightBuilder } from './insight-builder'

export class DashboardInsightCollectionBuilder {
  constructor(
    private parent: VBIDashboardBuilder,
    private doc: Y.Doc,
    private dsl: Y.Map<any>,
  ) {
    doc.transact(() => {
      getOrCreateDashboardWidgets(this.dsl)
    })
  }

  add(callback: VBIAddDashboardInsightCallback): VBIDashboardBuilder {
    const widgetId = id.uuid()

    this.doc.transact(() => {
      pushDashboardWidget(this.dsl, {
        id: widgetId,
        type: 'insight',
        insightId: id.resourceUUID(),
      })

      const insight = this.requireInsight(widgetId)
      callback(insight)

      if (!hasDashboardLayout(this.dsl, widgetId, 'lg')) {
        removeDashboardWidgetById(this.dsl, widgetId)
        removeDashboardWidgetLayouts(this.dsl, widgetId)
        throw new Error('Dashboard insight requires layouts.lg when adding')
      }
    })

    return this.parent
  }

  update(widgetId: string, callback: VBIUpdateDashboardInsightCallback): VBIDashboardBuilder {
    this.doc.transact(() => {
      const insight = this.requireInsight(widgetId)
      callback(insight)
    })

    return this.parent
  }

  remove(widgetId: string): VBIDashboardBuilder {
    this.doc.transact(() => {
      const insight = this.resolveInsight(widgetId)
      if (!insight) {
        return
      }

      removeDashboardWidgetById(this.dsl, widgetId)
      removeDashboardWidgetLayouts(this.dsl, widgetId)
    })

    return this.parent
  }

  get(widgetId: string): DashboardInsightBuilder | undefined {
    const insight = this.resolveInsight(widgetId)
    return insight ? this.createInsightBuilder(insight) : undefined
  }

  findAll(): DashboardInsightBuilder[] {
    const widgets = getOrCreateDashboardWidgets(this.dsl)
    const insights: DashboardInsightBuilder[] = []
    for (let index = 0; index < widgets.length; index++) {
      const widget = widgets.get(index)
      if (widget?.get('type') === 'insight') {
        insights.push(this.createInsightBuilder(widget))
      }
    }
    return insights
  }

  toJSON(): VBIDashboardInsightCollectionJSON {
    return this.findAll().map((insight) => insight.toJSON())
  }

  private createInsightBuilder(widget: Y.Map<any>): DashboardInsightBuilder {
    return new DashboardInsightBuilder(this.dsl, widget)
  }

  private resolveInsight(widgetId: string): Y.Map<any> | undefined {
    const widget = findDashboardWidget(this.dsl, widgetId)
    if (!widget || widget.get('type') !== 'insight') {
      return undefined
    }
    return widget
  }

  private requireInsight(widgetId: string): DashboardInsightBuilder {
    const insight = this.get(widgetId)
    if (!insight) {
      throw new Error(`Dashboard insight with id "${widgetId}" not found`)
    }
    return insight
  }
}
