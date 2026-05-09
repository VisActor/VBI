import { theme as antdTheme } from 'antd'
import deDE from 'antd/locale/de_DE'
import enUS from 'antd/locale/en_US'
import frFR from 'antd/locale/fr_FR'
import idID from 'antd/locale/id_ID'
import jaJP from 'antd/locale/ja_JP'
import koKR from 'antd/locale/ko_KR'
import viVN from 'antd/locale/vi_VN'
import zhCN from 'antd/locale/zh_CN'
import type { ThemeConfig } from 'antd'
import type { DemoLocale, DemoTheme } from 'src/constants/builder'

export const antdLocales: Record<DemoLocale, typeof zhCN> = {
  'zh-CN': zhCN,
  'en-US': enUS,
  'ja-JP': jaJP,
  'de-DE': deDE,
  'id-ID': idID,
  'fr-FR': frFR,
  'ko-KR': koKR,
  'vi-VN': viVN,
}
const themeTokens = {
  light: { bg: '#fbfcfd', border: '#d7e0e7', primary: '#0891a8', text: '#26313a' },
  dark: { bg: '#101923', border: '#2f3b46', primary: '#28b8c7', text: '#e6edf3' },
} as const

export const getThemeConfig = (themeMode: DemoTheme): ThemeConfig => {
  const token = themeTokens[themeMode]
  return {
    algorithm: themeMode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      borderRadius: 6,
      colorBgContainer: token.bg,
      colorBorder: token.border,
      colorPrimary: token.primary,
      colorText: token.text,
      controlHeight: 32,
      fontSize: 12,
    },
  }
}
