import type { CreateDashboardInput, VBIDashboardDSL } from '../types'
import { breakpoints } from './layout'

export function createDashboardData(init: CreateDashboardInput): VBIDashboardDSL {
  return {
    version: 1,
    type: 'dashboard',
    uuid: init.uuid,
    meta: init.meta,
    widgets: [],
    layout: {
      breakpoints: { ...breakpoints },
      layouts: { lg: [] },
    },
  }
}
