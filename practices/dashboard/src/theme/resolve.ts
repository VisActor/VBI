import { theme as antdTheme, type ThemeConfig } from 'antd'
import { getDashboardTheme } from './registry'
import type { DashboardThemeDefinition } from './types'

export interface ResolvedDashboardTheme {
  name: string
  baseTheme: 'light' | 'dark'
  config: ThemeConfig
  dashboard: NonNullable<DashboardThemeDefinition['dashboard']>
}

const defaultToolbarBackground = {
  light: 'linear-gradient(180deg, rgba(248, 250, 252, 0.92), rgba(255, 255, 255, 0.98))',
  dark: 'linear-gradient(180deg, rgba(10, 17, 28, 0.9), rgba(15, 22, 35, 0.94))',
}

export function resolveDashboardTheme(name: string): ResolvedDashboardTheme {
  const { name: resolvedName, baseTheme, definition } = getDashboardTheme(name)
  const algorithm = baseTheme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm
  const config: ThemeConfig = {
    algorithm,
    token: { borderRadius: 8, borderRadiusOuter: 18, fontSize: 14 },
  }
  if (definition) {
    const { tokens } = definition
    const defaults = antdTheme.getDesignToken(config)
    config.token = {
      ...config.token,
      colorPrimary: tokens.accentColor ?? tokens.colorScheme[0],
      colorText: tokens.textPrimary,
      colorTextSecondary: tokens.textSecondary,
      colorBorder: tokens.borderColor,
      colorBorderSecondary: tokens.borderColor,
      colorBgContainer: tokens.surfaceColor ?? defaults.colorBgContainer,
      colorBgElevated: tokens.surfaceColor ?? defaults.colorBgElevated,
      colorBgLayout: tokens.surfaceBackgroundColor ?? defaults.colorBgLayout,
      fontFamily: tokens.fontFamily ?? defaults.fontFamily,
    }
  }
  return {
    name: resolvedName,
    baseTheme,
    config,
    dashboard: {
      padding: 16,
      gap: 16,
      toolbarBackground: definition ? definition.tokens.surfaceColor : defaultToolbarBackground[baseTheme],
      ...definition?.dashboard,
    },
  }
}
