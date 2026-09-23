import { createContext, useContext, type RefObject } from 'react'
import type { Locale } from '@visactor/vseed'
import type { ResolvedDashboardTheme } from './theme'
import type { VBIDashboardBuilder, VBIDashboardThemeOption } from '@visactor/vbi'

export interface DashboardContextValue {
  locale: Locale
  theme: ResolvedDashboardTheme
  themeOptions: VBIDashboardThemeOption[]
  mode: 'view' | 'edit'
  editing: boolean
  undoManager: VBIDashboardBuilder['undoManager']
  onEditingChange: (enabled: boolean) => void
  onThemeChange?: (name: string) => void
  containerRef: RefObject<HTMLElement | null>
}

export const DashboardContext = createContext<DashboardContextValue | null>(null)

/** Dashboard presentation and Builder capabilities shared by toolbar controls. */
export function useDashboard(): DashboardContextValue {
  const context = useContext(DashboardContext)
  if (!context) throw new Error('Dashboard controls must be rendered inside DashboardRenderer')
  return context
}
