import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { VBIDashboardBuilder, VBIDashboardDSL } from '@visactor/vbi'
import type { Locale } from '@visactor/vseed'
import { ConfigProvider, theme as antdTheme } from 'antd'
import { useBuilderSnapshot } from './useBuilderSnapshot'
import { useChartEditor } from './useChartEditor'
import { antdLocales } from './i18n/antd'
import { DashboardContext } from './DashboardContext'
import { DashboardGrid } from './DashboardGrid'
import { DashboardToolbar } from './toolbar'
import { ChartEditor } from './ChartEditor'
import { resolveDashboardTheme, type ResolvedDashboardTheme } from './theme'
import './dashboard.css'

export interface DashboardRendererProps {
  builder: VBIDashboardBuilder
  mode?: 'view' | 'edit'
  locale?: Locale
  /** Temporary presentation override. Defaults to the saved dashboard theme. */
  theme?: string
  /** Handle a toolbar selection when the host controls the theme prop. */
  onThemeChange?: (name: string) => void
  /** Replace or compose toolbar controls. Pass null to hide the toolbar. */
  toolbar?: ReactNode
}

function DashboardContent({
  builder,
  dsl,
  locale,
  theme,
  mode,
  onThemeChange,
  toolbar,
}: Required<Pick<DashboardRendererProps, 'builder' | 'locale' | 'mode'>> & {
  dsl: VBIDashboardDSL
  theme: ResolvedDashboardTheme
  onThemeChange?: (name: string) => void
  toolbar: ReactNode
}) {
  const { token } = antdTheme.useToken()
  const root = useRef<HTMLElement>(null)
  const [editing, setEditing] = useState(true)
  const canEdit = mode === 'edit' && editing
  const editor = useChartEditor(builder, dsl.widgets, canEdit)

  useEffect(() => {
    setEditing(true)
  }, [builder])

  return (
    <DashboardContext.Provider
      value={{ locale, theme, mode, editing: canEdit, onEditingChange: setEditing, onThemeChange, containerRef: root }}
    >
      <section
        ref={root}
        className='vbi-dashboard'
        data-theme={theme.name}
        lang={locale}
        style={{
          color: token.colorText,
          background: theme.dashboard.backgroundColor ?? token.colorBgLayout,
          borderRadius: token.borderRadiusLG,
          fontFamily: token.fontFamily,
          padding: theme.dashboard.padding,
        }}
      >
        {toolbar}
        {dsl.meta.title || dsl.meta.description ? (
          <header className='vbi-dashboard-heading'>
            {dsl.meta.title ? <h2>{dsl.meta.title}</h2> : null}
            {dsl.meta.description ? <p style={{ color: token.colorTextSecondary }}>{dsl.meta.description}</p> : null}
          </header>
        ) : null}
        <DashboardGrid
          builder={builder}
          dsl={dsl}
          locale={locale}
          theme={theme}
          onEdit={canEdit ? editor.open : undefined}
        />
        {editor.selected && root.current ? (
          <ChartEditor
            builder={editor.selected.chart}
            title={editor.selected.title}
            locale={locale}
            theme={theme}
            container={root.current}
            onClose={editor.close}
          />
        ) : null}
      </section>
    </DashboardContext.Provider>
  )
}

export function DashboardRenderer({
  builder,
  mode = 'view',
  locale = 'zh-CN',
  theme: themeOverride,
  onThemeChange,
  toolbar = <DashboardToolbar />,
}: DashboardRendererProps) {
  const dsl = useBuilderSnapshot(builder)
  const themeName = themeOverride ?? dsl.meta.theme
  const theme = useMemo(() => resolveDashboardTheme(themeName), [themeName])
  return (
    <ConfigProvider locale={antdLocales[locale]} theme={theme.config}>
      <DashboardContent
        builder={builder}
        dsl={dsl}
        mode={mode}
        locale={locale}
        theme={theme}
        toolbar={toolbar}
        onThemeChange={
          themeOverride === undefined
            ? (name) => {
                builder.theme.setTheme(name)
                onThemeChange?.(name)
              }
            : onThemeChange
        }
      />
    </ConfigProvider>
  )
}
