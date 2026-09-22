import type { TokenThemeDefinition } from '@visactor/vseed'

export interface DashboardThemeDefinition {
  /** Tooltip and accessible name for a custom theme in the visual picker. */
  label?: string
  tokens: TokenThemeDefinition
  dashboard?: {
    backgroundColor?: string
    widgetBackgroundColor?: string
    widgetBorderColor?: string
    widgetBorderRadius?: number
    toolbarBackground?: string
    padding?: number
    gap?: number
  }
}
