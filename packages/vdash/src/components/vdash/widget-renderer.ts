import { html, nothing, type TemplateResult } from 'lit'
import type { DashboardWidget, GridItemLayout } from '../../types'

export function renderSlot(
  item: GridItemLayout,
  widgetMap: Map<string, DashboardWidget>,
): typeof nothing | TemplateResult {
  const widget = widgetMap.get(item.widgetId)
  if (!widget) return nothing

  return html` <section slot=${`item:${item.id}`} class="widget-slot">${renderWidget(widget)}</section> `
}

function renderWidget(widget: DashboardWidget): TemplateResult {
  switch (widget.type) {
    case 'chart':
      return html`<div class="widget widget--chart">
        <span class="widget__title">${widget.title ?? widget.chartId}</span>
      </div>`

    case 'insight':
      return html`<div class="widget widget--insight">
        <span class="widget__title">${widget.title ?? widget.insightId}</span>
      </div>`

    default:
      return html`<div class="widget widget--custom">
        <span class="widget__title">${widget.title ?? widget.id}</span>
      </div>`
  }
}
