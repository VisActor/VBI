import type { VSeed } from '@visactor/vseed'
import { useMemo } from 'react'
import { useVBIStoreConfig } from '../model'

export const useConfiguredVSeed = (vseed: VSeed | null) => {
  const { locale, theme, chartTheme } = useVBIStoreConfig()
  const resolvedTheme = chartTheme ?? theme

  return useMemo(() => {
    if (!vseed || (!locale && !resolvedTheme)) {
      return vseed
    }

    return {
      ...vseed,
      ...(locale ? { locale } : {}),
      ...(resolvedTheme ? { theme: resolvedTheme } : {}),
    } as VSeed
  }, [locale, resolvedTheme, vseed])
}
