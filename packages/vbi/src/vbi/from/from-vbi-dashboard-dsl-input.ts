import * as Y from 'yjs'

import type { VBIDashboardDSLInput } from 'src/types'
import { zVBIDashboardDSL } from 'src/types/dashboardDSL/dashboard'
import { VBIDashboardBuilder } from 'src/dashboard-builder/builder'
import { fillVBIDashboardDSLMap } from './dashboard-y-map'

export const createDashboardBuilderFromVBIDashboardDSLInput = (dashboard: VBIDashboardDSLInput) => {
  const doc = new Y.Doc()
  const dsl = doc.getMap('dsl')
  const normalized = zVBIDashboardDSL.parse(dashboard)

  doc.transact(() => {
    fillVBIDashboardDSLMap(dsl, normalized)
  })

  return new VBIDashboardBuilder(doc)
}
