import type { VBIDashboardBuilder, VBIDashboardDSL, VBIInsightBuilder } from '@visactor/vbi'
import type { Locale } from '@visactor/vseed'
import { ConfigProvider, theme as antdTheme } from 'antd'
import { APP as Standard } from 'standard'
import { useBuilderSnapshot } from './useBuilderSnapshot'
import { useContainerWidth } from './useContainerWidth'
import { resolveLayout } from './layout'
import { messages } from './messages'
import './dashboard.css'

export interface DashboardRendererProps {
  builder: VBIDashboardBuilder
  locale?: Locale
  theme?: 'light' | 'dark'
}

function Insight({ builder, locale }: { builder: VBIInsightBuilder; locale: Locale }) {
  const insight = useBuilderSnapshot(builder)
  return <div className='vbi-dashboard-insight'>{insight.content || messages[locale].noData}</div>
}

function DashboardContent({
  builder,
  dsl,
  locale,
  theme,
}: Required<DashboardRendererProps> & { dsl: VBIDashboardDSL }) {
  const { token } = antdTheme.useToken()
  const { ref, width } = useContainerWidth()
  const layout = resolveLayout(dsl, width)
  return (
    <section
      className='vbi-dashboard'
      data-theme={theme}
      lang={locale}
      style={{ color: token.colorText, background: token.colorBgLayout, borderRadius: token.borderRadiusLG }}
    >
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
              {widget.title || widget.description ? (
                <header className='vbi-dashboard-widget-heading'>
                  {widget.title ? <h3>{widget.title}</h3> : null}
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
                  <div role='status'>{messages[locale].missing}</div>
                )}
              </div>
            </article>
          )
        })}
      </div>
      {!dsl.widgets.length ? (
        <div className='vbi-dashboard-empty' role='status'>
          {messages[locale].empty}
        </div>
      ) : null}
    </section>
  )
}

export function DashboardRenderer({ builder, locale = 'zh-CN', theme }: DashboardRendererProps) {
  const dsl = useBuilderSnapshot(builder)
  const resolvedTheme = theme ?? dsl.meta.theme
  return (
    <ConfigProvider
      theme={{
        algorithm: resolvedTheme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: { borderRadius: 8, fontSize: 14 },
      }}
    >
      <DashboardContent key={builder.getUUID()} builder={builder} dsl={dsl} locale={locale} theme={resolvedTheme} />
    </ConfigProvider>
  )
}
