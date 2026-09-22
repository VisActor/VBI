import { useMemo } from 'react'
import type { Locale } from '@visactor/vseed'
import zhCN from './locales/zh-CN.json'
import enUS from './locales/en-US.json'
import jaJP from './locales/ja-JP.json'
import deDE from './locales/de-DE.json'
import idID from './locales/id-ID.json'
import frFR from './locales/fr-FR.json'
import koKR from './locales/ko-KR.json'
import viVN from './locales/vi-VN.json'

export const translations: Record<Locale, typeof zhCN> = {
  'zh-CN': zhCN,
  'en-US': enUS,
  'ja-JP': jaJP,
  'de-DE': deDE,
  'id-ID': idID,
  'fr-FR': frFR,
  'ko-KR': koKR,
  'vi-VN': viVN,
}

export type TranslationKey = keyof typeof zhCN

export function createTranslator(locale: Locale) {
  return (key: TranslationKey, params?: Record<string, string>) =>
    translations[locale][key].replace(/\{\{(\w+)\}\}/g, (match, name: string) => params?.[name] ?? match)
}

export function useTranslation(locale: Locale) {
  return useMemo(() => createTranslator(locale), [locale])
}
