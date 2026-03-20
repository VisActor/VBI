export const PROFESSIONAL_DEFAULT_LOCALE = 'zh-CN' as const;
export const PROFESSIONAL_DEFAULT_THEME = 'dark' as const;
export const PROFESSIONAL_DEFAULT_LIMIT = 1000;

export const PROFESSIONAL_SUPPORTED_LOCALES = ['zh-CN', 'en-US'] as const;
export const PROFESSIONAL_SUPPORTED_THEMES = ['light', 'dark'] as const;

export type ProfessionalLocale =
  (typeof PROFESSIONAL_SUPPORTED_LOCALES)[number];
export type ProfessionalTheme = (typeof PROFESSIONAL_SUPPORTED_THEMES)[number];
