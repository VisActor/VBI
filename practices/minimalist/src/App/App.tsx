import type { VBIChartBuilder } from '@visactor/vbi'
import { ConfigProvider } from 'antd'
import { ChartBody } from 'src/components/ChartBody'
import { EditMode } from 'src/components/EditMode'
import { getLabels } from 'src/config/labels'
import { antdLocales, getThemeConfig } from 'src/config/theme'
import { DEMO_DEFAULT_LOCALE, DEMO_DEFAULT_THEME, type DemoLocale, type DemoTheme } from 'src/constants/builder'
import { useFullscreen } from 'src/hooks/useFullscreen'
import { useVBIStore, useVBIStoreConfig, VBIStoreProvider } from 'src/model'
import type { AppMode } from 'src/types'
import './app.css'

interface APPProps {
  builder?: VBIChartBuilder
  hideLocale?: boolean
  hideTheme?: boolean
  locale?: DemoLocale
  mode?: AppMode
  theme?: DemoTheme
}

const AppContent = ({ mode }: { mode: AppMode }) => {
  const dsl = useVBIStore((state) => state.dsl)
  const config = useVBIStoreConfig()
  const themeMode = config.theme ?? (dsl.theme as DemoTheme | undefined) ?? DEMO_DEFAULT_THEME
  const localeMode = config.locale ?? (dsl.locale as DemoLocale | undefined) ?? DEMO_DEFAULT_LOCALE
  const labels = getLabels(localeMode)
  const fullscreen = useFullscreen(mode === 'edit')

  return (
    <ConfigProvider componentSize='small' locale={antdLocales[localeMode]} theme={getThemeConfig(themeMode)}>
      <div
        ref={fullscreen.rootRef}
        className={`mini-app mini-app--${themeMode}${fullscreen.isFullscreen ? ' mini-app--fullscreen' : ''}`}
      >
        {mode === 'edit' ? (
          <EditMode
            isFullscreen={fullscreen.isFullscreen}
            labels={labels}
            onToggleFullscreen={fullscreen.toggleFullscreen}
          />
        ) : (
          <ChartBody labels={labels} />
        )}
      </div>
    </ConfigProvider>
  )
}

export const APP = ({
  builder,
  hideLocale = false,
  hideTheme = false,
  locale,
  mode = 'edit',
  theme = DEMO_DEFAULT_THEME,
}: APPProps) => (
  <VBIStoreProvider builder={builder} hideLocale={hideLocale} hideTheme={hideTheme} locale={locale} theme={theme}>
    <AppContent mode={mode} />
  </VBIStoreProvider>
)
