import deDE from './locales/de-DE.json'
import enUS from './locales/en-US.json'
import frFR from './locales/fr-FR.json'
import idID from './locales/id-ID.json'
import jaJP from './locales/ja-JP.json'
import koKR from './locales/ko-KR.json'
import viVN from './locales/vi-VN.json'
import zhCN from './locales/zh-CN.json'
import type { ProfessionalLocale } from 'src/constants/builder'

type Messages = typeof zhCN
export type MessageKey = keyof Messages

const messages: Record<ProfessionalLocale, Messages> = {
  'zh-CN': zhCN,
  'en-US': enUS,
  'ja-JP': jaJP,
  'de-DE': deDE,
  'id-ID': idID,
  'fr-FR': frFR,
  'ko-KR': koKR,
  'vi-VN': viVN,
}

export const createTranslator = (locale: ProfessionalLocale) => {
  return (key: MessageKey) => messages[locale][key] ?? key
}
