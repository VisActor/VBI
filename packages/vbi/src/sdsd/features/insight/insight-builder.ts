import * as Y from 'yjs'

import type { VBIDashboardInsightWidget, VBISetDashboardWidgetLayoutsInput } from 'src/types'
import { applyDashboardLayouts } from 'src/vbi/from'

export class DashboardInsightBuilder {
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

  setInsightId(insightId: string): this {
    this.widget.set('insightId', insightId)
    return this
  }

  setLayouts(layouts: VBISetDashboardWidgetLayoutsInput): this {
    applyDashboardLayouts(this.dsl, this.getId(), layouts)
    return this
  }

  toJSON(): VBIDashboardInsightWidget {
    return this.widget.toJSON() as VBIDashboardInsightWidget
  }
}
