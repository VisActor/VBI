import { theme as antdTheme, type ThemeConfig } from 'antd'
import type { VBIDashboardResolvedTheme, VBIDashboardThemeDefinition } from '@visactor/vbi'

export interface ResolvedDashboardTheme {
  name: string
  chartTheme: string
  baseTheme: 'light' | 'dark'
  config: ThemeConfig
  dashboard: NonNullable<VBIDashboardThemeDefinition['dashboard']>
}

/** Adapt Builder output to Ant Design and Dashboard styles; no registration or state ownership. */
export function createDashboardTheme({
  name,
  chartTheme,
  baseTheme,
  definition,
}: VBIDashboardResolvedTheme): ResolvedDashboardTheme {
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
    name,
    chartTheme,
    baseTheme,
    config,
    dashboard: {
      padding: 16,
      gap: 16,
      toolbarBackground: definition?.tokens.surfaceColor,
      ...definition?.dashboard,
    },
  }
}
