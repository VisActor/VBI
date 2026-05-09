export const PROFESSIONAL_DEFAULT_LOCALE = 'zh-CN' as const
export const PROFESSIONAL_DEFAULT_THEME = 'dark' as const
export const PROFESSIONAL_DEFAULT_LIMIT = 1000

export const PROFESSIONAL_SUPPORTED_LOCALES = [
  'zh-CN',
  'en-US',
  'ja-JP',
  'de-DE',
  'id-ID',
  'fr-FR',
  'ko-KR',
  'vi-VN',
] as const
export const PROFESSIONAL_SUPPORTED_THEMES = ['light', 'dark'] as const

export type ProfessionalLocale = (typeof PROFESSIONAL_SUPPORTED_LOCALES)[number]
export type ProfessionalTheme = (typeof PROFESSIONAL_SUPPORTED_THEMES)[number]

export const PROFESSIONAL_LOCALE_OPTIONS: { label: string; value: ProfessionalLocale }[] = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
  { label: '日本語', value: 'ja-JP' },
  { label: 'Deutsch', value: 'de-DE' },
  { label: 'Bahasa Indonesia', value: 'id-ID' },
  { label: 'Français', value: 'fr-FR' },
  { label: '한국어', value: 'ko-KR' },
  { label: 'Tiếng Việt', value: 'vi-VN' },
]
