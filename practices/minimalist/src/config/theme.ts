import { theme as antdTheme, type ThemeConfig } from 'antd'
import deDE from 'antd/locale/de_DE'
import enUS from 'antd/locale/en_US'
import frFR from 'antd/locale/fr_FR'
import idID from 'antd/locale/id_ID'
import jaJP from 'antd/locale/ja_JP'
import koKR from 'antd/locale/ko_KR'
import viVN from 'antd/locale/vi_VN'
import zhCN from 'antd/locale/zh_CN'
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

export const getThemeConfig = (themeMode: DemoTheme): ThemeConfig => ({
  algorithm: themeMode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  token: {
    borderRadius: 6,
    colorPrimary: themeMode === 'dark' ? '#4f9cf9' : '#2563eb',
    controlHeight: 28,
    fontSize: 12,
  },
})
