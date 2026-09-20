import { useEffect, useRef, useState } from 'react'
import type { VBIChartBuilder, VBIDashboardBuilder, VBIDashboardDSL, VBIInsightBuilder } from '@visactor/vbi'
import type { Locale } from '@visactor/vseed'
import { EditOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, theme as antdTheme } from 'antd'
import { APP as Standard } from 'standard'
import { useBuilderSnapshot } from './useBuilderSnapshot'
import { useContainerWidth } from './useContainerWidth'
import { resolveLayout } from './layout'
import { useTranslation } from './i18n'
import { antdLocales } from './i18n/antd'
import { Toolbar } from './Toolbar'
import { ChartEditor } from './ChartEditor'
import { useFullscreen } from './useFullscreen'
import './dashboard.css'

export interface DashboardRendererProps {
  builder: VBIDashboardBuilder
  mode?: 'view' | 'edit'
  locale?: Locale
  theme?: 'light' | 'dark'
}

function Insight({ builder, locale }: { builder: VBIInsightBuilder; locale: Locale }) {
  const insight = useBuilderSnapshot(builder)
  const t = useTranslation(locale)
  return <div className='vbi-dashboard-insight'>{insight.content || t('noData')}</div>
}

function DashboardContent({
  builder,
  dsl,
  locale,
  theme,
  mode,
}: Required<DashboardRendererProps> & { dsl: VBIDashboardDSL }) {
  const { token } = antdTheme.useToken()
  const t = useTranslation(locale)
  const root = useRef<HTMLElement>(null)
  const fullscreen = useFullscreen(root)
  const [editing, setEditing] = useState(true)
  const [selection, setSelection] = useState<{
    dashboard: VBIDashboardBuilder
    widgetId: string
    chart: VBIChartBuilder
  } | null>(null)
  const canEdit = mode === 'edit' && editing
  const selectedWidget =
    canEdit && selection?.dashboard === builder
      ? dsl.widgets.find(
          (widget) =>
            widget.id === selection.widgetId &&
            widget.type === 'chart' &&
            builder.getChartBuilder(widget.chartId) === selection.chart,
        )
      : undefined

  useEffect(() => {
    if (!selectedWidget) setSelection(null)
  }, [selectedWidget])
  useEffect(() => {
    setEditing(true)
  }, [builder])
  const { ref, width } = useContainerWidth()
  const layout = resolveLayout(dsl, width)
  return (
    <section
      ref={root}
      className='vbi-dashboard'
      data-theme={theme}
      lang={locale}
      style={{ color: token.colorText, background: token.colorBgLayout, borderRadius: token.borderRadiusLG }}
    >
      <Toolbar
        locale={locale}
        theme={theme}
        mode={mode}
        editing={editing}
        onEditingChange={setEditing}
        fullscreen={fullscreen}
      />
      {dsl.meta.title || dsl.meta.description ? (
        <header className='vbi-dashboard-heading'>
          {dsl.meta.title ? <h2>{dsl.meta.title}</h2> : null}
          {dsl.meta.description ? <p style={{ color: token.colorTextSecondary }}>{dsl.meta.description}</p> : null}
        </header>
      ) : null}
      <div
        ref={ref}
        data-dashboard-grid
        className='vbi-dashboard-grid'
        style={{ gridTemplateColumns: `repeat(${layout.columns}, minmax(0, 1fr))` }}
      >
        {layout.widgets.map(({ widget, style }) => {
          const insight = widget.type === 'insight' ? builder.getInsightBuilder(widget.insightId) : undefined
          const chart = widget.type === 'chart' ? builder.getChartBuilder(widget.chartId) : undefined
          return (
            <article
              key={widget.id}
              className='vbi-dashboard-widget'
              aria-label={widget.title}
              style={{
                ...style,
                background: token.colorBgContainer,
                borderColor: token.colorBorderSecondary,
                borderRadius: token.borderRadiusLG,
              }}
            >
              {widget.title || widget.description || (canEdit && chart) ? (
                <header className='vbi-dashboard-widget-heading'>
                  <div className='vbi-dashboard-widget-title'>
                    {widget.title ? <h3>{widget.title}</h3> : null}
                    {canEdit && chart ? (
                      <Button
                        type='text'
                        size='small'
                        icon={<EditOutlined />}
                        aria-label={t('editChart', { title: widget.title || t('untitledChart') })}
                        title={t('editChart', { title: widget.title || t('untitledChart') })}
                        onClick={() => setSelection({ dashboard: builder, widgetId: widget.id, chart })}
                      />
                    ) : null}
                  </div>
                  {widget.description ? <p style={{ color: token.colorTextSecondary }}>{widget.description}</p> : null}
                </header>
              ) : null}
              <div className='vbi-dashboard-widget-content'>
                {insight ? (
                  <Insight builder={insight} locale={locale} />
                ) : chart ? (
                  <Standard
                    key={chart.getUUID()}
                    builder={chart}
                    mode='view'
                    border={false}
                    locale={locale}
                    theme={theme}
                  />
                ) : (
                  <div role='status'>{t('missing')}</div>
                )}
              </div>
            </article>
          )
        })}
      </div>
      {!dsl.widgets.length ? (
        <div className='vbi-dashboard-empty' role='status'>
          {t('empty')}
        </div>
      ) : null}
      {selectedWidget && selection && root.current ? (
        <ChartEditor
          builder={selection.chart}
          title={selectedWidget.title ?? ''}
          locale={locale}
          theme={theme}
          container={root.current}
          onClose={() => setSelection(null)}
        />
      ) : null}
    </section>
  )
}

export function DashboardRenderer({
  builder,
  mode = 'view',
  locale = 'zh-CN',
  theme = 'light',
}: DashboardRendererProps) {
  const dsl = useBuilderSnapshot(builder)
  return (
    <ConfigProvider
      locale={antdLocales[locale]}
      theme={{
        algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: { borderRadius: 8, borderRadiusOuter: 18, fontSize: 14 },
      }}
    >
      <DashboardContent builder={builder} dsl={dsl} mode={mode} locale={locale} theme={theme} />
    </ConfigProvider>
  )
}
