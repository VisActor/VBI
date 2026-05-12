import * as Y from 'yjs'

import type { VBIDashboardWidget } from 'src/types'

const createDashboardWidgetYMap = (widget: VBIDashboardWidget): Y.Map<any> => {
  const yMap = new Y.Map<any>()
  for (const [key, value] of Object.entries(widget)) {
    if (value !== undefined) {
      yMap.set(key, value)
    }
  }
  return yMap
}

const ensureDashboardWidgetArray = (widgets?: VBIDashboardWidget[]): Y.Array<Y.Map<any>> => {
  const yArray = new Y.Array<Y.Map<any>>()
  for (const widget of widgets ?? []) {
    yArray.push([createDashboardWidgetYMap(widget)])
  }
  return yArray
}

export const getOrCreateDashboardWidgets = (dsl: Y.Map<any>): Y.Array<Y.Map<any>> => {
  const currentWidgets = dsl.get('widgets')
  if (currentWidgets instanceof Y.Array) {
    return currentWidgets as Y.Array<Y.Map<any>>
  }

  const nextWidgets = ensureDashboardWidgetArray(
    Array.isArray(currentWidgets) ? (currentWidgets as VBIDashboardWidget[]) : undefined,
  )
  dsl.set('widgets', nextWidgets)
  return nextWidgets
}

export const locateDashboardWidgetIndexById = (widgets: Y.Array<Y.Map<any>>, widgetId: string): number => {
  for (let index = 0; index < widgets.length; index++) {
    if (widgets.get(index)?.get('id') === widgetId) {
      return index
    }
  }

  return -1
}

export const findDashboardWidget = (dsl: Y.Map<any>, widgetId: string): Y.Map<any> | undefined => {
  const widgets = getOrCreateDashboardWidgets(dsl)
  const index = locateDashboardWidgetIndexById(widgets, widgetId)
  return index === -1 ? undefined : widgets.get(index)
}

export const ensureDashboardWidgetIdUnique = (dsl: Y.Map<any>, widgetId: string): void => {
  if (findDashboardWidget(dsl, widgetId)) {
    throw new Error(`Dashboard widget id "${widgetId}" already exists`)
  }
}

export const pushDashboardWidget = (dsl: Y.Map<any>, widget: VBIDashboardWidget): void => {
  ensureDashboardWidgetIdUnique(dsl, widget.id)
  getOrCreateDashboardWidgets(dsl).push([createDashboardWidgetYMap(widget)])
}

export const removeDashboardWidgetById = (dsl: Y.Map<any>, widgetId: string): void => {
  const widgets = getOrCreateDashboardWidgets(dsl)
  const index = locateDashboardWidgetIndexById(widgets, widgetId)
  if (index !== -1) {
    widgets.delete(index, 1)
  }
}

export const ensureDashboardWidgetStructure = (dsl: Y.Map<any>): void => {
  getOrCreateDashboardWidgets(dsl)
}
