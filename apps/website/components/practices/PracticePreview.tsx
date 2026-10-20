import { useDark, useLang } from '@rspress/core/runtime'
import type { ComponentType } from 'react'

const SUPPORTED_PRACTICE_LOCALES = ['zh-CN', 'en-US'] as const

type PracticeLocale = (typeof SUPPORTED_PRACTICE_LOCALES)[number]

type PracticePreviewProps = {
  App: ComponentType<any>
}

const supportedPracticeLocales = new Set<string>(SUPPORTED_PRACTICE_LOCALES)

const normalizePracticeLocale = (lang: string): PracticeLocale => {
  return supportedPracticeLocales.has(lang) ? (lang as PracticeLocale) : 'zh-CN'
}

export const PracticePreview = ({ App }: PracticePreviewProps) => {
  const dark = useDark()
  const lang = useLang()
  const locale = normalizePracticeLocale(lang)
  const theme = dark ? 'dark' : 'light'

  return (
    <div style={{ width: '100%', height: '700px' }}>
      <App hideLocale hideTheme locale={locale} theme={theme} />
    </div>
  )
}
