import type { Breakpoint, GridItemInput, GridItemLayout, VBIDashboardDSL } from '../types'

export const breakpoints: Record<Breakpoint, number> = {
  xxl: 1600,
  xl: 1200,
  lg: 992,
  md: 768,
  sm: 576,
  xs: 0,
}

export const breakpointKeys: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs']

export function getLayouts(dsl: VBIDashboardDSL, breakpoint: Breakpoint): GridItemLayout[] {
  return dsl.layout.layouts[breakpoint] ?? dsl.layout.layouts.lg
}

export function upsertLayout(dsl: VBIDashboardDSL, breakpoint: Breakpoint, item: GridItemLayout): void {
  const items = dsl.layout.layouts[breakpoint] ?? []
  const normalizedItem: GridItemLayout = {
    ...item,
    static: item.static ?? true,
  }
  const index = items.findIndex((layout) => layout.widgetId === item.widgetId)
  if (index >= 0) items[index] = normalizedItem
  else items.push(normalizedItem)
  dsl.layout.layouts[breakpoint] = items
}

export function applyLayouts(
  dsl: VBIDashboardDSL,
  widgetId: string,
  layouts: Partial<Record<Breakpoint, GridItemInput>>,
): void {
  for (const bp of breakpointKeys) {
    const layout = layouts[bp]
    if (layout) upsertLayout(dsl, bp, { ...layout, widgetId })
  }
}

export function removeWidgetLayouts(dsl: VBIDashboardDSL, widgetId: string): void {
  for (const bp of breakpointKeys) {
    const items = dsl.layout.layouts[bp]
    if (items) {
      dsl.layout.layouts[bp] = items.filter((item) => item.widgetId !== widgetId)
    }
  }
}
