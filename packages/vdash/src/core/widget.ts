import type { DashboardWidget, UpdateWidgetInput, VBIDashboardDSL } from '../types'
import { stripUndefined } from '../utils'

export function findWidget(dsl: VBIDashboardDSL, id: string): DashboardWidget | undefined {
  return dsl.widgets.find((w) => w.id === id)
}

export function ensureUniqueId(dsl: VBIDashboardDSL, id: string): void {
  if (findWidget(dsl, id)) {
    throw new Error(`Vdash: widget id "${id}" already exists`)
  }
}

export function pushWidget(dsl: VBIDashboardDSL, widget: DashboardWidget): void {
  ensureUniqueId(dsl, widget.id)
  dsl.widgets.push(widget)
}

export function patchWidget(dsl: VBIDashboardDSL, id: string, patch: UpdateWidgetInput): void {
  const widget = findWidget(dsl, id)
  if (widget) Object.assign(widget, stripUndefined(patch))
}

export function removeWidgetById(dsl: VBIDashboardDSL, id: string): void {
  dsl.widgets = dsl.widgets.filter((w) => w.id !== id)
}
