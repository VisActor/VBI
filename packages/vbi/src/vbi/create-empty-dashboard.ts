import type { VBIDashboardDSL } from 'src/types'
import { id } from 'src/utils'
import { dashboardBreakpoints } from './from/dashboard-layout-y-map'

export const createEmptyDashboard = (): VBIDashboardDSL => {
  return {
    version: 1,
    type: 'dashboard',
    uuid: id.resourceUUID(),
    meta: {
      title: '',
    },
    widgets: [],
    layout: {
      breakpoints: { ...dashboardBreakpoints },
      layouts: {
        lg: [],
      },
    },
  }
}
