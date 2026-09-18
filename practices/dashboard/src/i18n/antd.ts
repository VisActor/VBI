import type { Locale } from '@visactor/vseed'
import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'
import jaJP from 'antd/locale/ja_JP'
import deDE from 'antd/locale/de_DE'
import idID from 'antd/locale/id_ID'
import frFR from 'antd/locale/fr_FR'
import koKR from 'antd/locale/ko_KR'
import viVN from 'antd/locale/vi_VN'

export const antdLocales: Record<Locale, typeof zhCN> = {
  'zh-CN': zhCN,
  'en-US': enUS,
  'ja-JP': jaJP,
  'de-DE': deDE,
  'id-ID': idID,
  'fr-FR': frFR,
  'ko-KR': koKR,
  'vi-VN': viVN,
}
