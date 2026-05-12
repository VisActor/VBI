import * as Y from 'yjs'

import type { VBIDashboardDSL } from 'src/types'
import { zVBIDashboardDSL } from 'src/types/dashboardDSL/dashboard'

export const buildVBIDashboardDSL = (dsl: Y.Map<any>): VBIDashboardDSL => {
  return zVBIDashboardDSL.parse(dsl.toJSON())
}
