import { Builder, registerTokenTheme } from '@visactor/vseed'
import { presetDashboardThemes } from './presets'
import type { DashboardThemeDefinition } from './types'

const themes = new Map<string, DashboardThemeDefinition>()

/** Register before rendering. Names share VSeed's global theme namespace. */
export function registerDashboardTheme(name: string, definition: DashboardThemeDefinition): void {
  name = name.trim()
  if (!name) throw new Error('Dashboard theme name must not be empty')
  const existing = themes.get(name)
  if (existing && JSON.stringify(existing) === JSON.stringify(definition)) return
  if (name === 'light' || name === 'dark' || themes.has(name) || Builder.getTheme(name)) {
    throw new Error(`Theme "${name}" is already registered`)
  }
  const snapshot = structuredClone(definition)
  registerTokenTheme(name, snapshot.tokens, { ensureRegisterAll: false })
  themes.set(name, snapshot)
}

for (const [name, definition] of Object.entries(presetDashboardThemes)) {
  registerDashboardTheme(name, definition)
}

/** Resolve identity and mode together so every consumer shares the same fallback. */
export function getDashboardTheme(name: string) {
  const definition = themes.get(name)
  const resolvedName = definition || name === 'dark' ? name : 'light'
  const baseTheme = definition?.tokens.baseTheme ?? (resolvedName === 'dark' ? 'dark' : 'light')
  return { name: resolvedName, baseTheme, definition }
}

export function getDashboardThemeOptions() {
  return ['light', 'dark', ...themes.keys()].map((name) => {
    const { baseTheme, definition } = getDashboardTheme(name)
    return {
      name,
      baseTheme,
      label: definition?.label,
      colors: [...(definition?.tokens.colorScheme ?? Builder.getTheme(name)?.config?.column?.color?.colorScheme ?? [])],
    }
  })
}
