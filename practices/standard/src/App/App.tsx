import type { VBIChartBuilder } from '@visactor/vbi'
import { theme as antdTheme, ConfigProvider, Flex, Spin } from 'antd'
import deDE from 'antd/locale/de_DE'
import enUS from 'antd/locale/en_US'
import frFR from 'antd/locale/fr_FR'
import idID from 'antd/locale/id_ID'
import jaJP from 'antd/locale/ja_JP'
import koKR from 'antd/locale/ko_KR'
import viVN from 'antd/locale/vi_VN'
import zhCN from 'antd/locale/zh_CN'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ShelfDndProvider } from '../components/Shelves/dnd'
import { CompatCard as Card } from '../components/antdCompat'
import { Toolbar } from '../components/Toolbar'
import { DEMO_DEFAULT_LOCALE, DEMO_DEFAULT_THEME, type DemoLocale, type DemoTheme } from '../constants/builder'
import { useVBIBuilder } from '../hooks'
import { useTranslation } from '../i18n'
import { useVBIStore, VBIStoreProvider } from '../model'
import { initVBIConnector } from '../utils/localConnector'
import { useShallow } from 'zustand/shallow'
import './app.css'
import { ChartPanel, FieldsPanel, ShelfPanel, ViewPanel } from './components'

type AppMode = 'view' | 'edit'

interface APPProps {
  builder?: VBIChartBuilder
  /** Show the chart frame in view mode. Defaults to true. */
  border?: boolean
  hideLocale?: boolean
  hideTheme?: boolean
  locale?: DemoLocale
  mode?: AppMode
  theme?: DemoTheme
}

const DEMO_ANTD_LOCALES: Record<DemoLocale, typeof zhCN> = {
  'zh-CN': zhCN,
  'en-US': enUS,
  'ja-JP': jaJP,
  'de-DE': deDE,
  'id-ID': idID,
  'fr-FR': frFR,
  'ko-KR': koKR,
  'vi-VN': viVN,
}

const createThemeConfig = (themeMode: DemoTheme) => {
  return {
    algorithm: themeMode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: themeMode === 'dark' ? '#6ea8ff' : '#1677ff',
      borderRadius: 8,
      borderRadiusLG: 10,
      borderRadiusSM: 6,
      borderRadiusXS: 4,
      borderRadiusOuter: 18,
      controlHeight: 30,
      controlHeightSM: 26,
      fontSize: 12,
      fontSizeSM: 11,
    },
  }
}

const DemoWorkbenchPanels = memo(() => {
  return (
    <Flex vertical={false} gap={7} style={{ flex: 1, minHeight: 0, minWidth: 0 }}>
      <FieldsPanel />

      <Flex vertical gap={7} style={{ flex: '1 1 0', minWidth: 0 }}>
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
          gap: 8,
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
  border,
}: {
  initialized: boolean
  mode: AppMode
  themeMode: DemoTheme
  border: boolean
}) => {
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
      <div ref={appRootRef} className={`demo-app-root demo-app-root--${mode}`}>
        {!initialized ? (
          <div className='demo-app-loading'>
            <Spin spinning tip={t('appInitializing')} wrapperClassName='demo-app-loading-spinner'>
              <div className='demo-app-loading-target' />
            </Spin>
          </div>
        ) : mode === 'edit' ? (
          <DemoWorkbench themeMode={themeMode} isFullscreen={isFullscreen} onToggleFullscreen={toggleFullscreen} />
        ) : (
          <ViewPanel border={border} />
        )}
      </div>
    </ConfigProvider>
  )
}

const AppShell = ({ builder, mode, border }: { builder?: VBIChartBuilder; mode: AppMode; border: boolean }) => {
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
      if (!builder) {
        await initVBIConnector()
      }
      if (!isActive) return
      cleanup = initialize(builder)
    })()

    return () => {
      isActive = false
      cleanup?.()
    }
  }, [builder, initialize])

  return <AppContent initialized={initialized} mode={mode} themeMode={theme} border={border} />
}

export const APP = ({
  builder,
  border = true,
  hideLocale = false,
  hideTheme = false,
  locale = DEMO_DEFAULT_LOCALE,
  mode = 'edit',
  theme = DEMO_DEFAULT_THEME,
}: APPProps) => {
  return (
    <VBIStoreProvider builder={builder} hideLocale={hideLocale} hideTheme={hideTheme} locale={locale} theme={theme}>
      <AppShell builder={builder} mode={mode} border={border} />
    </VBIStoreProvider>
  )
}
