import type { VBIChartBuilder } from '@visactor/vbi'
import { ProfessionalEditor } from 'src/components/Editor/ProfessionalEditor'
import { PROFESSIONAL_DEFAULT_THEME, type ProfessionalLocale, type ProfessionalTheme } from 'src/constants/builder'
import { VBIStoreProvider } from 'src/model'
import './App.css'

type AppMode = 'edit' | 'view'

interface APPProps {
  builder?: VBIChartBuilder
  hideLocale?: boolean
  hideTheme?: boolean
  locale?: ProfessionalLocale
  mode?: AppMode
  theme?: ProfessionalTheme
}

export const APP = ({
  builder,
  hideLocale = false,
  hideTheme = false,
  locale,
  mode = 'edit',
  theme = PROFESSIONAL_DEFAULT_THEME,
}: APPProps) => (
  <VBIStoreProvider builder={builder} hideLocale={hideLocale} hideTheme={hideTheme} locale={locale} theme={theme}>
    <ProfessionalEditor builder={builder} mode={mode} />
  </VBIStoreProvider>
)

export default APP
