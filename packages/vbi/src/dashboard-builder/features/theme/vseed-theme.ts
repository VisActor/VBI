import { Builder, lightTheme, darkTheme, registerTokenTheme, type TokenThemeDefinition } from '@visactor/vseed'

const builtinThemes = { light: lightTheme, dark: darkTheme }
const registeredThemes = new Map<string, string>()
let nextThemeId = 0

export function ensureBuiltinTheme(name: 'light' | 'dark') {
  if (!Builder.getTheme(name)) Builder.registerTheme(name, builtinThemes[name]())
  return Builder.getTheme(name)
}

// Token content owns runtime identity; matching names in separate documents stay isolated.
export function registerVSeedTheme(tokens: TokenThemeDefinition): string {
  const key = JSON.stringify(tokens)
  const existing = registeredThemes.get(key)
  if (existing) return existing
  let name: string
  do {
    name = `vbi-dashboard-${++nextThemeId}`
  } while (Builder.getTheme(name))
  registerTokenTheme(name, tokens, { ensureRegisterAll: false })
  registeredThemes.set(key, name)
  return name
}
