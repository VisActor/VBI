import * as Y from 'yjs'

import type { VBIDashboardDSLInput, VBIDashboardMeta } from 'src/types'
import { ensureDashboardLayoutStructure, setDashboardLayout } from './dashboard-layout-y-map'
import {
  ensureDashboardWidgetStructure,
  getOrCreateDashboardWidgets,
  pushDashboardWidget,
} from './dashboard-widget-y-map'

const createDashboardMetaYMap = (meta: Partial<VBIDashboardMeta> | undefined): Y.Map<any> => {
  const nextMeta = new Y.Map<any>()
  nextMeta.set('title', meta?.title ?? '')

  if (meta?.description !== undefined) {
    nextMeta.set('description', meta.description)
  }
  if (meta?.mode !== undefined) {
    nextMeta.set('mode', meta.mode)
  }
  if (meta?.theme !== undefined) {
    nextMeta.set('theme', meta.theme)
  }

  return nextMeta
}

export const getOrCreateDashboardMeta = (dsl: Y.Map<any>): Y.Map<any> => {
  const currentMeta = dsl.get('meta')
  if (currentMeta instanceof Y.Map) {
    if (currentMeta.get('title') === undefined) {
      currentMeta.set('title', '')
    }
    return currentMeta as Y.Map<any>
  }

  const nextMeta = createDashboardMetaYMap(
    typeof currentMeta === 'object' && currentMeta !== null ? (currentMeta as Partial<VBIDashboardMeta>) : undefined,
  )
  dsl.set('meta', nextMeta)
  return nextMeta
}

export const ensureDashboardDSLStructure = (dsl: Y.Map<any>): void => {
  if (dsl.get('version') === undefined) {
    dsl.set('version', 1)
  }
  if (dsl.get('type') === undefined) {
    dsl.set('type', 'dashboard')
  }

  getOrCreateDashboardMeta(dsl)
  ensureDashboardWidgetStructure(dsl)
  ensureDashboardLayoutStructure(dsl)
}

export const fillVBIDashboardDSLMap = (dsl: Y.Map<any>, dashboard: VBIDashboardDSLInput): void => {
  dsl.clear()

  dsl.set('uuid', dashboard.uuid ?? '')
  dsl.set('type', dashboard.type ?? 'dashboard')
  dsl.set('version', dashboard.version ?? 1)
  dsl.set('meta', createDashboardMetaYMap(dashboard.meta))

  getOrCreateDashboardWidgets(dsl)
  for (const widget of dashboard.widgets ?? []) {
    pushDashboardWidget(dsl, widget)
  }

  setDashboardLayout(dsl, dashboard.layout)

  if (dashboard.state !== undefined) {
    dsl.set('state', dashboard.state)
  }

  ensureDashboardDSLStructure(dsl)
}
