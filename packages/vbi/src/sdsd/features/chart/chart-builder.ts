import * as Y from 'yjs'

import type { VBIDashboardChartWidget, VBISetDashboardWidgetLayoutsInput } from 'src/types'
import { applyDashboardLayouts } from 'src/vbi/from'

export class DashboardChartBuilder {
  constructor(
    private dsl: Y.Map<any>,
    private widget: Y.Map<any>,
  ) {}

  getId(): string {
    return this.widget.get('id')
  }

  setTitle(title: string): this {
    this.widget.set('title', title)
    return this
  }

  setDescription(description: string): this {
    this.widget.set('description', description)
    return this
  }

  setChartId(chartId: string): this {
    this.widget.set('chartId', chartId)
    return this
  }

  setLayouts(layouts: VBISetDashboardWidgetLayoutsInput): this {
    applyDashboardLayouts(this.dsl, this.getId(), layouts)
    return this
  }

  toJSON(): VBIDashboardChartWidget {
    return this.widget.toJSON() as VBIDashboardChartWidget
  }
}
