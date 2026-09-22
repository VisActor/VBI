import { useCallback, useMemo, useSyncExternalStore } from 'react'
import type { VBIDashboardBuilder, VBIDashboardResolvedTheme, VBIDashboardThemeOption } from '@visactor/vbi'
import { createDashboardTheme } from './theme'

interface ThemeSnapshot {
  theme: VBIDashboardResolvedTheme
  themeOptions: VBIDashboardThemeOption[]
}

export function useDashboardTheme(builder: VBIDashboardBuilder, override?: string) {
  const subscribe = useCallback((notify: () => void) => builder.theme.observe(notify), [builder])
  const getSnapshot = useCallback(
    () =>
      JSON.stringify({ theme: builder.theme.resolveTheme(override), themeOptions: builder.theme.getThemeOptions() }),
    [builder, override],
  )
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  return useMemo(() => {
    const { theme, themeOptions } = JSON.parse(snapshot) as ThemeSnapshot
    return {
      theme: createDashboardTheme(theme),
      themeOptions,
    }
  }, [snapshot])
}
