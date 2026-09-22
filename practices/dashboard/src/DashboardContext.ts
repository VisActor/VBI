import { createContext, useContext, type RefObject } from 'react'
import type { Locale } from '@visactor/vseed'
import type { ResolvedDashboardTheme } from './theme'

export interface DashboardContextValue {
  locale: Locale
  theme: ResolvedDashboardTheme
  mode: 'view' | 'edit'
  editing: boolean
  onEditingChange: (enabled: boolean) => void
  onThemeChange?: (name: string) => void
  containerRef: RefObject<HTMLElement | null>
}

export const DashboardContext = createContext<DashboardContextValue | null>(null)

/** Presentation state for dashboard controls; document changes still belong to Builder. */
export function useDashboard(): DashboardContextValue {
  const context = useContext(DashboardContext)
  if (!context) throw new Error('Dashboard controls must be rendered inside DashboardRenderer')
  return context
}
