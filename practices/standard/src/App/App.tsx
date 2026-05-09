import { VBIChartBuilder } from '@visactor/vbi'
import { theme as antdTheme, Card, ConfigProvider, Flex, Spin } from 'antd'
import deDE from 'antd/locale/de_DE'
import enUS from 'antd/locale/en_US'
import frFR from 'antd/locale/fr_FR'
import idID from 'antd/locale/id_ID'
import jaJP from 'antd/locale/ja_JP'
import koKR from 'antd/locale/ko_KR'
import viVN from 'antd/locale/vi_VN'
import zhCN from 'antd/locale/zh_CN'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ShelfDndProvider } from 'src/components/Shelves/dnd'
import { Toolbar } from 'src/components/Toolbar'
import { DEMO_DEFAULT_THEME, type DemoLocale, type DemoTheme } from 'src/constants/builder'
import { useVBIBuilder } from 'src/hooks'
import { useTranslation } from 'src/i18n'
import { useVBIStore, VBIStoreProvider } from 'src/model'
import { initVBIConnector } from 'src/utils/localConnector'
import { useShallow } from 'zustand/shallow'
import './app.css'
import { ChartPanel, FieldsPanel, ShelfPanel, ViewPanel } from './components'

type AppMode = 'view' | 'edit'

interface APPProps {
  builder?: VBIChartBuilder
  hideLocale?: boolean
  hideTheme?: boolean
  locale?: DemoLocale
  mode?: AppMode
  theme?: DemoTheme
}

const DEMO_ANTD_LOCALES = {
  'zh-CN': zhCN,
  'en-US': enUS,
  'ja-JP': jaJP,
  'de-DE': deDE,
  'id-ID': idID,
  'fr-FR': frFR,
  'ko-KR': koKR,
  'vi-VN': viVN,
} satisfies Record<DemoLocale, typeof zhCN>

const createThemeConfig = (themeMode: DemoTheme) => {
  return {
    algorithm: themeMode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: themeMode === 'dark' ? '#6ea8ff' : '#1677ff',
      borderRadius: 10,
      borderRadiusLG: 14,
      borderRadiusSM: 8,
      borderRadiusXS: 6,
      borderRadiusOuter: 22,
      controlHeight: 32,
      controlHeightSM: 28,
      fontSize: 12,
      fontSizeSM: 12,
    },
  }
}

const DemoWorkbenchPanels = memo(() => {
  return (
    <Flex vertical={false} gap={8} style={{ flex: 1, minHeight: 0, minWidth: 0 }}>
      <FieldsPanel />

      <Flex vertical gap={8} style={{ flex: '1 1 0', minWidth: 0 }}>
        <ShelfPanel />
        <ChartPanel />
      </Flex>
    </Flex>
  )
})

const DemoWorkbench = ({
  themeMode,
  isFullscreen,
  onToggleFullscreen,
}: {
  themeMode: DemoTheme
  isFullscreen: boolean
  onToggleFullscreen: () => void | Promise<void>
}) => {
  const { token } = antdTheme.useToken()

  return (
    <ShelfDndProvider>
      <Flex
        className='demo-app-workbench'
        vertical
        style={{
          height: '100%',
          gap: 10,
        }}
      >
        <Card
          size='small'
          style={{
            borderRadius: token.borderRadiusOuter,
            overflow: 'hidden',
            borderColor: token.colorBorderSecondary,
            background: themeMode === 'dark' ? 'rgba(12, 19, 31, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
          }}
          styles={{
            body: {
              padding: 0,
            },
          }}
        >
          <Toolbar isFullscreen={isFullscreen} onToggleFullscreen={onToggleFullscreen} />
        </Card>
        <DemoWorkbenchPanels />
      </Flex>
    </ShelfDndProvider>
  )
}

const AppContent = ({
  initialized,
  mode,
  themeMode,
}: {
  initialized: boolean
  mode: AppMode
  themeMode: DemoTheme
}) => {
  const logState = useVBIStore((state) => state.logState)
  const { locale, t } = useTranslation()
  const antdLocale = DEMO_ANTD_LOCALES[locale]
  const antdThemeConfig = useMemo(() => createThemeConfig(themeMode), [themeMode])
  const appRootRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    if (mode !== 'edit') {
      return
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === appRootRef.current)
    }

    handleFullscreenChange()
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [mode])

  const toggleFullscreen = useCallback(async () => {
    if (mode !== 'edit') {
      return
    }

    const target = appRootRef.current
    if (!target) {
      return
    }

    try {
      if (document.fullscreenElement === target) {
        await document.exitFullscreen()
        return
      }

      if (document.fullscreenElement) {
        await document.exitFullscreen()
      }

      await target.requestFullscreen()
    } catch (error) {
      console.error('Failed to toggle fullscreen:', error)
    }
  }, [mode])

  return (
    <ConfigProvider locale={antdLocale} theme={antdThemeConfig} componentSize='small'>
      <div
        ref={appRootRef}
        className={`demo-app-root demo-app-root--${mode}`}
        onClick={
          mode === 'edit'
            ? () => {
                void logState()
              }
            : undefined
        }
      >
        {!initialized ? (
          mode === 'edit' ? (
            <Spin tip={t('appInitializing')} fullscreen />
          ) : (
            <div className='demo-app-view-loading'>
              <Spin spinning tip={t('appInitializing')}>
                <div className='demo-app-view-loading-target' />
              </Spin>
            </div>
          )
        ) : mode === 'edit' ? (
          <DemoWorkbench themeMode={themeMode} isFullscreen={isFullscreen} onToggleFullscreen={toggleFullscreen} />
        ) : (
          <ViewPanel />
        )}
      </div>
    </ConfigProvider>
  )
}

const AppShell = ({ builder, mode }: { builder?: VBIChartBuilder; mode: AppMode }) => {
  const { initialize, initialized, storeBuilder } = useVBIStore(
    useShallow((state) => ({
      initialize: state.initialize,
      initialized: state.initialized,
      storeBuilder: state.builder,
    })),
  )
  const { theme } = useVBIBuilder(storeBuilder)

  useEffect(() => {
    let isActive = true
    let cleanup: ReturnType<typeof initialize> | undefined

    void (async () => {
      await initVBIConnector()
      if (!isActive) return
      cleanup = initialize(builder)
    })()

    return () => {
      isActive = false
      cleanup?.()
    }
  }, [builder, initialize])

  return <AppContent initialized={initialized} mode={mode} themeMode={theme} />
}

export const APP = ({
  builder,
  hideLocale = false,
  hideTheme = false,
  locale,
  mode = 'edit',
  theme = DEMO_DEFAULT_THEME,
}: APPProps) => {
  return (
    <VBIStoreProvider builder={builder} hideLocale={hideLocale} hideTheme={hideTheme} locale={locale} theme={theme}>
      <AppShell builder={builder} mode={mode} />
    </VBIStoreProvider>
  )
}
