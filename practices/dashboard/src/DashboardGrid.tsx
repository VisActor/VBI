import type { VBIChartBuilder, VBIDashboardBuilder, VBIDashboardDSL, VBIInsightBuilder } from '@visactor/vbi'
import type { Locale } from '@visactor/vseed'
import { EditOutlined } from '@ant-design/icons'
import { Button, theme as antdTheme } from 'antd'
import { APP as Standard } from 'standard'
import { useBuilderSnapshot } from './useBuilderSnapshot'
import { useContainerWidth } from './useContainerWidth'
import { resolveLayout } from './layout'
import { useTranslation } from './i18n'
import type { ResolvedDashboardTheme } from './theme'

interface DashboardGridProps {
  builder: VBIDashboardBuilder
  dsl: VBIDashboardDSL
  locale: Locale
  theme: ResolvedDashboardTheme
  onEdit?: (widgetId: string, chart: VBIChartBuilder) => void
}

function Insight({ builder, locale }: { builder: VBIInsightBuilder; locale: Locale }) {
  const insight = useBuilderSnapshot(builder)
  const t = useTranslation(locale)
  return <div className='vbi-dashboard-insight'>{insight.content || t('noData')}</div>
}

export function DashboardGrid({ builder, dsl, locale, theme, onEdit }: DashboardGridProps) {
  const { token } = antdTheme.useToken()
  const t = useTranslation(locale)
  const { ref, width } = useContainerWidth()
  const layout = resolveLayout(dsl, width)
  return (
    <>
      <div
        ref={ref}
        data-dashboard-grid
        className='vbi-dashboard-grid'
        style={{ gridTemplateColumns: `repeat(${layout.columns}, minmax(0, 1fr))`, gap: theme.dashboard.gap }}
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
                background: theme.dashboard.widgetBackgroundColor ?? token.colorBgContainer,
                borderColor: theme.dashboard.widgetBorderColor ?? token.colorBorderSecondary,
                borderRadius: theme.dashboard.widgetBorderRadius ?? token.borderRadiusLG,
              }}
            >
              {widget.title || widget.description || (onEdit && chart) ? (
                <header className='vbi-dashboard-widget-heading'>
                  <div className='vbi-dashboard-widget-title'>
                    {widget.title ? <h3>{widget.title}</h3> : null}
                    {onEdit && chart ? (
                      <Button
                        type='text'
                        size='small'
                        icon={<EditOutlined />}
                        aria-label={t('editChart', { title: widget.title || t('untitledChart') })}
                        title={t('editChart', { title: widget.title || t('untitledChart') })}
                        onClick={() => onEdit?.(widget.id, chart)}
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
                    theme={theme.baseTheme}
                    chartTheme={theme.chartTheme}
                    themeToken={theme.config.token}
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
    </>
  )
}
