import type {
  Breakpoint,
  DashboardMeta,
  DashboardWidget,
  GridItemLayout,
  VBIDashboardDSL,
} from './dsl'

// ---------------------------------------------------------------------------
// Shared layout helpers
// ---------------------------------------------------------------------------

/** Layout position/size without `widgetId` (derived automatically). */
export type GridItemInput = Omit<GridItemLayout, 'widgetId'>

/**
 * Layout map keyed by breakpoint.
 * `lg` is required — it serves as the base / fallback layout.
 */
export type WidgetLayoutMap = Partial<Record<Breakpoint, GridItemInput>> & {
  lg: GridItemInput
}

// ---------------------------------------------------------------------------
// Tool inputs
// ---------------------------------------------------------------------------

/** `create_dashboard` — bootstrap a new empty dashboard. */
export type CreateDashboardInput = {
  uuid: string
  meta: DashboardMeta
}

/** `add_widget` — widget data + full layout for every needed breakpoint. */
export type AddWidgetInput = Omit<DashboardWidget, 'id'> & {
  id: string
  layouts: WidgetLayoutMap
}

/** `update_widget` — partial patch for widget data (id & type are immutable). */
export type UpdateWidgetInput = Partial<Omit<DashboardWidget, 'id' | 'type'>>

/** `update_widget_layout` — replace layouts for a single widget across breakpoints. */
export type UpdateWidgetLayoutInput = Partial<Record<Breakpoint, GridItemInput>>

/** `remove_widget` — remove widget + all associated layouts. */
export type RemoveWidgetInput = {
  widget_id: string
}

/** `set_meta` — partial patch for dashboard-level metadata. */
export type SetMetaInput = Partial<DashboardMeta>

// ---------------------------------------------------------------------------
// Builder interface
// ---------------------------------------------------------------------------

export interface VdashBuilder {
  /** Add a widget with layout definitions for all required breakpoints. */
  addWidget(input: AddWidgetInput): this

  /** Partially update widget data (title, description, etc.). */
  updateWidget(widgetId: string, patch: UpdateWidgetInput): this

  /** Replace layout entries for a widget across one or more breakpoints. */
  updateWidgetLayout(widgetId: string, layouts: UpdateWidgetLayoutInput): this

  /** Remove a widget and all its layout entries. */
  removeWidget(widgetId: string): this

  /** Partially update dashboard-level metadata. */
  setMeta(patch: SetMetaInput): this

  /** Return a deep-cloned snapshot of the current DSL. */
  getDashboard(): VBIDashboardDSL
}
