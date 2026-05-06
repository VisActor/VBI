export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'

export type DashboardMeta = {
  title: string
  description?: string
  mode?: 'edit' | 'view'
  theme?: string
}

export type GridItemLayout = {
  id: string
  widgetId: string
  x: number
  y: number
  w: number
  h: number
  static?: boolean
}

type WidgetBase = {
  id: string
  type: string
  title?: string
  description?: string
}

export type DashboardChartWidget = WidgetBase & {
  type: 'chart'
  chartId: string
}

export type DashboardInsightWidget = WidgetBase & {
  type: 'insight'
  insightId: string
}

export type DashboardCustomWidget = WidgetBase & Record<string, unknown>

export type DashboardWidget = DashboardChartWidget | DashboardInsightWidget | DashboardCustomWidget

export type DashboardLayoutMap = {
  xxl?: GridItemLayout[]
  xl?: GridItemLayout[]
  lg: GridItemLayout[]
  md?: GridItemLayout[]
  sm?: GridItemLayout[]
  xs?: GridItemLayout[]
}

export type DashboardLayout = {
  breakpoints: Record<Breakpoint, number>
  cellHeight?: number
  layouts: DashboardLayoutMap
}

export type VBIDashboardDSL = {
  version: 1
  type: 'dashboard'
  uuid: string
  meta: DashboardMeta
  widgets: DashboardWidget[]
  layout: DashboardLayout
  state?: Record<string, unknown>
}
