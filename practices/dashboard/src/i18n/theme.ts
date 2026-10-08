import type { TranslationKey } from './index'

const themeLabelKeys: Record<string, TranslationKey> = {
  'light-default': 'themeLight',
  'dark-default': 'themeDark',
  'dark-volcano-blue': 'themeVolcanoBlue',
  'light-clean': 'themeClean',
  'light-misty-rose': 'themeMistyRose',
  'light-sea-salt-blue': 'themeSeaSaltBlue',
  'light-forest-mist': 'themeForestMist',
  'light-lavender': 'themeLavender',
  'light-apricot-orange': 'themeApricotOrange',
  'light-bamboo-moon': 'themeBambooMoon',
  'light-clear-sky-blue': 'themeClearSkyBlue',
  'light-cedar-rose': 'themeCedarRose',
  'dark-outskirts': 'themeOutskirts',
  'dark-blue-orange': 'themeBlueOrange',
  'dark-finance-yellow': 'themeFinanceYellow',
  'dark-wen-lv-cyan': 'themeWenLvCyan',
  'dark-electric-green': 'themeElectricGreen',
  'dark-e-commerce-purple': 'themeECommercePurple',
  'dark-red-blue': 'themeRedBlue',
  'dark-party-red': 'themePartyRed',
}

export function getThemeLabel(theme: { name: string; label?: string }, translate: (key: TranslationKey) => string) {
  const key = themeLabelKeys[theme.name]
  return theme.label ?? (key ? translate(key) : theme.name)
}
