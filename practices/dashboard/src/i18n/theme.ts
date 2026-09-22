import type { TranslationKey } from './index'

const themeLabelKeys: Record<string, TranslationKey> = {
  light: 'themeLight',
  dark: 'themeDark',
  volcanoBlue: 'themeVolcanoBlue',
  clean: 'themeClean',
  outskirts: 'themeOutskirts',
  blueOrange: 'themeBlueOrange',
  financeYellow: 'themeFinanceYellow',
  wenLvCyan: 'themeWenLvCyan',
  electricGreen: 'themeElectricGreen',
  eCommercePurple: 'themeECommercePurple',
  redBlue: 'themeRedBlue',
  partyRed: 'themePartyRed',
}

export function getThemeLabel(theme: { name: string; label?: string }, translate: (key: TranslationKey) => string) {
  const key = themeLabelKeys[theme.name]
  return theme.label ?? (key ? translate(key) : theme.name)
}
