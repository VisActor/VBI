import type { VBIDashboardBreakpoint, VBIDashboardDSL } from '@visactor/vbi'

const columnsByBreakpoint: Record<VBIDashboardBreakpoint, number> = { xxl: 12, xl: 12, lg: 12, md: 6, sm: 4, xs: 2 }

export function resolveLayout(dsl: VBIDashboardDSL, width: number) {
  const breakpoints = (Object.keys(dsl.breakpoints) as VBIDashboardBreakpoint[]).sort(
    (a, b) => dsl.breakpoints[b] - dsl.breakpoints[a],
  )
  const widgetIds = new Set(dsl.widgets.map((widget) => widget.id))
  const breakpoint = breakpoints.find(
    (bp) => dsl.breakpoints[bp] <= width && dsl.layout[bp]?.some((item) => widgetIds.has(item.widgetId)),
  )
  const columns = breakpoint ? columnsByBreakpoint[breakpoint] : 1
  const items = new Map(
    (breakpoint ? (dsl.layout[breakpoint] ?? []) : [])
      .filter((item) => widgetIds.has(item.widgetId))
      .map((item) => [item.widgetId, item]),
  )
  let bottom = Math.max(0, ...Array.from(items.values(), (item) => Math.max(0, item.y) + item.h))
  const widgets = dsl.widgets.map((widget) => {
    const item = items.get(widget.id)
    const x = item ? Math.max(0, Math.min(item.x, columns - 1)) : 0
    const w = item ? Math.min(item.w, columns - x) : columns
    const h = item?.h ?? (widget.type === 'chart' ? 5 : 3)
    const y = item ? Math.max(0, item.y) : bottom
    if (!item) bottom += h
    return { widget, style: { gridColumn: `${x + 1} / span ${w}`, gridRow: `${y + 1} / span ${h}` } }
  })
  return { columns, widgets }
}
