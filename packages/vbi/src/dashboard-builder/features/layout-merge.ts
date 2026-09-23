import type { VBIDashboardBreakpoint, VBIDashboardItemLayout } from 'src/types'
import { id } from 'src/utils'
import * as Y from 'yjs'

type PartialItemLayout = Omit<VBIDashboardItemLayout, 'id' | 'widgetId'>
type WidgetLayouts = Partial<Record<VBIDashboardBreakpoint, PartialItemLayout>>
type LayoutMap = Y.Map<Y.Array<Y.Map<any>>>

/** Normalize persisted JSON before attaching the undo manager. */
export const ensureDashboardLayout = (dsl: Y.Map<any>): LayoutMap => {
  const layout = dsl.get('layout')
  if (layout instanceof Y.Map) return layout as LayoutMap
  const result: LayoutMap = new Y.Map()
  for (const [breakpoint, items] of Object.entries(layout)) {
    const array = new Y.Array<Y.Map<any>>()
    for (const item of (items as VBIDashboardItemLayout[] | undefined) ?? []) {
      array.push([new Y.Map(Object.entries(item))])
    }
    result.set(breakpoint, array)
  }
  dsl.set('layout', result)
  return result
}

export const mergeWidgetLayoutsIntoDSL = (dsl: Y.Map<any>, widgetId: string, layouts: WidgetLayouts): void => {
  const rootLayout = dsl.get('layout')
  if (rootLayout == null || typeof rootLayout !== 'object') return
  const layout = ensureDashboardLayout(dsl)

  for (const [breakpoint, itemLayout] of Object.entries(layouts)) {
    if (!itemLayout) continue
    let items = layout.get(breakpoint)
    if (!items) {
      items = new Y.Array<Y.Map<any>>()
      layout.set(breakpoint, items)
    }
    const existing = items.toArray().find((item) => item.get('widgetId') === widgetId)
    if (existing) {
      // Preserve identity and untouched fields so undo cannot erase a peer's edits.
      for (const key of ['x', 'y', 'w', 'h', 'static'] as const) {
        const value = itemLayout[key]
        if (value === undefined) existing.delete(key)
        else if (existing.get(key) !== value) existing.set(key, value)
      }
    } else {
      items.push([new Y.Map(Object.entries({ id: id.uuid(), widgetId, ...itemLayout }))])
    }
  }
}
