import type { VBIDashboardDSL, VBIDashboardLayout } from 'src/types'
import { VBIDashboardDefaultBreakpoints } from 'src/types/dashboardDSL/breakpoint'
import { id } from 'src/utils'

export const createEmptyDashboardLayout = (): VBIDashboardLayout => {
  return {
    xxl: [],
    xl: [],
    lg: [],
    md: [],
    sm: [],
    xs: [],
  }
}

export const createEmptyDashboard = (uuid: string = id.resourceUUID()): VBIDashboardDSL => {
  return {
    uuid,
    widgets: [],
    breakpoints: { ...VBIDashboardDefaultBreakpoints },
    layout: createEmptyDashboardLayout(),
    meta: {
      title: '',
      theme: 'light-default',
    },
    version: 0,
  }
}
