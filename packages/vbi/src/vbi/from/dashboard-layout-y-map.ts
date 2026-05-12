import * as Y from 'yjs'

import type {
  VBIDashboardBreakpoint,
  VBIDashboardDSLInput,
  VBIDashboardGridItemInput,
  VBIDashboardGridItemLayout,
} from 'src/types'

const isPlainObject = (value: unknown): value is Record<string, any> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export const dashboardBreakpoints: Record<VBIDashboardBreakpoint, number> = {
  xxl: 1600,
  xl: 1200,
  lg: 992,
  md: 768,
  sm: 576,
  xs: 0,
}

export const dashboardBreakpointKeys: VBIDashboardBreakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs']

const createDashboardGridItemYMap = (item: VBIDashboardGridItemLayout): Y.Map<any> => {
  const yMap = new Y.Map<any>()
  yMap.set('id', item.id)
  yMap.set('widgetId', item.widgetId)
  yMap.set('x', item.x)
  yMap.set('y', item.y)
  yMap.set('w', item.w)
  yMap.set('h', item.h)
  yMap.set('static', item.static ?? true)
  return yMap
}

const createDashboardLayoutItemsYArray = (items?: VBIDashboardGridItemLayout[]): Y.Array<Y.Map<any>> => {
  const yArray = new Y.Array<Y.Map<any>>()
  for (const item of items ?? []) {
    yArray.push([createDashboardGridItemYMap(item)])
  }
  return yArray
}

const createDashboardLayoutYMap = (layout?: VBIDashboardDSLInput['layout']): Y.Map<any> => {
  const yLayout = new Y.Map<any>()

  const yBreakpoints = new Y.Map<number>()
  for (const breakpoint of dashboardBreakpointKeys) {
    yBreakpoints.set(breakpoint, layout?.breakpoints?.[breakpoint] ?? dashboardBreakpoints[breakpoint])
  }
  yLayout.set('breakpoints', yBreakpoints)

  if (typeof layout?.cellHeight === 'number') {
    yLayout.set('cellHeight', layout.cellHeight)
  }

  const yLayouts = new Y.Map<any>()
  const layoutEntries = layout?.layouts
  for (const breakpoint of dashboardBreakpointKeys) {
    const items = layoutEntries?.[breakpoint]
    if (Array.isArray(items) && (items.length > 0 || breakpoint === 'lg')) {
      yLayouts.set(breakpoint, createDashboardLayoutItemsYArray(items))
    }
  }
  if (!(yLayouts.get('lg') instanceof Y.Array)) {
    yLayouts.set('lg', createDashboardLayoutItemsYArray())
  }
  yLayout.set('layouts', yLayouts)

  return yLayout
}

export const setDashboardLayout = (dsl: Y.Map<any>, layout: VBIDashboardDSLInput['layout'] | undefined): void => {
  dsl.set('layout', createDashboardLayoutYMap(layout))
}

export const getOrCreateDashboardLayout = (dsl: Y.Map<any>): Y.Map<any> => {
  const currentLayout = dsl.get('layout')
  if (currentLayout instanceof Y.Map) {
    return currentLayout as Y.Map<any>
  }

  const nextLayout = createDashboardLayoutYMap(
    isPlainObject(currentLayout) ? (currentLayout as VBIDashboardDSLInput['layout']) : undefined,
  )
  dsl.set('layout', nextLayout)
  return nextLayout
}

export const getOrCreateDashboardBreakpoints = (layout: Y.Map<any>): Y.Map<number> => {
  const currentBreakpoints = layout.get('breakpoints')
  if (currentBreakpoints instanceof Y.Map) {
    const breakpoints = currentBreakpoints as Y.Map<number>
    for (const breakpoint of dashboardBreakpointKeys) {
      if (typeof breakpoints.get(breakpoint) !== 'number') {
        breakpoints.set(breakpoint, dashboardBreakpoints[breakpoint])
      }
    }
    return breakpoints
  }

  const nextBreakpoints = new Y.Map<number>()
  const base = isPlainObject(currentBreakpoints) ? currentBreakpoints : {}
  for (const breakpoint of dashboardBreakpointKeys) {
    const value = base[breakpoint]
    nextBreakpoints.set(breakpoint, typeof value === 'number' ? value : dashboardBreakpoints[breakpoint])
  }
  layout.set('breakpoints', nextBreakpoints)
  return nextBreakpoints
}

export const getOrCreateDashboardLayouts = (layout: Y.Map<any>): Y.Map<any> => {
  const currentLayouts = layout.get('layouts')
  if (currentLayouts instanceof Y.Map) {
    const layouts = currentLayouts as Y.Map<any>
    if (!(layouts.get('lg') instanceof Y.Array)) {
      layouts.set('lg', createDashboardLayoutItemsYArray())
    }
    return layouts
  }

  const nextLayouts = new Y.Map<any>()
  const base = isPlainObject(currentLayouts) ? currentLayouts : {}
  for (const breakpoint of dashboardBreakpointKeys) {
    const value = base[breakpoint]
    if (value instanceof Y.Array) {
      nextLayouts.set(breakpoint, value)
      continue
    }

    if (Array.isArray(value) && (value.length > 0 || breakpoint === 'lg')) {
      nextLayouts.set(breakpoint, createDashboardLayoutItemsYArray(value as VBIDashboardGridItemLayout[]))
    }
  }

  if (!(nextLayouts.get('lg') instanceof Y.Array)) {
    nextLayouts.set('lg', createDashboardLayoutItemsYArray())
  }

  layout.set('layouts', nextLayouts)
  return nextLayouts
}

const getDashboardLayoutItems = (
  layouts: Y.Map<any>,
  breakpoint: VBIDashboardBreakpoint,
): Y.Array<Y.Map<any>> | undefined => {
  const currentItems = layouts.get(breakpoint)
  if (currentItems instanceof Y.Array) {
    return currentItems as Y.Array<Y.Map<any>>
  }

  if (Array.isArray(currentItems)) {
    const nextItems = createDashboardLayoutItemsYArray(currentItems as VBIDashboardGridItemLayout[])
    layouts.set(breakpoint, nextItems)
    return nextItems
  }

  return undefined
}

const getOrCreateDashboardLayoutItems = (dsl: Y.Map<any>, breakpoint: VBIDashboardBreakpoint): Y.Array<Y.Map<any>> => {
  const layout = getOrCreateDashboardLayout(dsl)
  const layouts = getOrCreateDashboardLayouts(layout)
  const items = getDashboardLayoutItems(layouts, breakpoint)
  if (items instanceof Y.Array) {
    return items
  }

  const nextItems = createDashboardLayoutItemsYArray()
  layouts.set(breakpoint, nextItems)
  return nextItems
}

const locateDashboardLayoutIndexByWidgetId = (items: Y.Array<Y.Map<any>>, widgetId: string): number => {
  for (let index = 0; index < items.length; index++) {
    if (items.get(index)?.get('widgetId') === widgetId) {
      return index
    }
  }

  return -1
}

export const ensureDashboardLayoutStructure = (dsl: Y.Map<any>): void => {
  const layout = getOrCreateDashboardLayout(dsl)
  getOrCreateDashboardBreakpoints(layout)
  getOrCreateDashboardLayouts(layout)
}

export const setDashboardCellHeight = (dsl: Y.Map<any>, cellHeight: number | undefined): void => {
  const layout = getOrCreateDashboardLayout(dsl)
  if (cellHeight === undefined) {
    layout.delete('cellHeight')
    return
  }

  layout.set('cellHeight', cellHeight)
}

export const upsertDashboardLayout = (
  dsl: Y.Map<any>,
  breakpoint: VBIDashboardBreakpoint,
  item: VBIDashboardGridItemLayout,
): void => {
  const items = getOrCreateDashboardLayoutItems(dsl, breakpoint)
  const normalizedItem: VBIDashboardGridItemLayout = {
    ...item,
    static: item.static ?? true,
  }

  const index = locateDashboardLayoutIndexByWidgetId(items, item.widgetId)
  const nextItem = createDashboardGridItemYMap(normalizedItem)

  if (index !== -1) {
    items.delete(index, 1)
    items.insert(index, [nextItem])
    return
  }

  items.push([nextItem])
}

export const applyDashboardLayouts = (
  dsl: Y.Map<any>,
  widgetId: string,
  layouts: Partial<Record<VBIDashboardBreakpoint, VBIDashboardGridItemInput>>,
): void => {
  for (const breakpoint of dashboardBreakpointKeys) {
    const layout = layouts[breakpoint]
    if (layout) {
      upsertDashboardLayout(dsl, breakpoint, { ...layout, widgetId })
    }
  }
}

export const removeDashboardWidgetLayouts = (dsl: Y.Map<any>, widgetId: string): void => {
  const layout = getOrCreateDashboardLayout(dsl)
  const layouts = getOrCreateDashboardLayouts(layout)

  for (const breakpoint of dashboardBreakpointKeys) {
    const items = getDashboardLayoutItems(layouts, breakpoint)
    if (!(items instanceof Y.Array)) {
      continue
    }

    for (let index = items.length - 1; index >= 0; index--) {
      if (items.get(index)?.get('widgetId') === widgetId) {
        items.delete(index, 1)
      }
    }
  }
}

export const hasDashboardLayout = (dsl: Y.Map<any>, widgetId: string, breakpoint: VBIDashboardBreakpoint): boolean => {
  const layout = getOrCreateDashboardLayout(dsl)
  const layouts = getOrCreateDashboardLayouts(layout)
  const items = getDashboardLayoutItems(layouts, breakpoint)
  if (!(items instanceof Y.Array)) {
    return false
  }

  for (let index = 0; index < items.length; index++) {
    if (items.get(index)?.get('widgetId') === widgetId) {
      return true
    }
  }

  return false
}
