import { cn } from '../utils/cn'

export type StarterFooterProps = {
  availableDimensionsCount: number
  availableMeasuresCount: number
  dataSourceLabel: string
  dsl: unknown
  rowCount: number
  statusMessage: string
  statusTone: 'error' | 'idle' | 'success'
}

export function StarterFooter(props: StarterFooterProps) {
  const {
    availableDimensionsCount,
    availableMeasuresCount,
    dataSourceLabel,
    dsl,
    rowCount,
    statusMessage,
    statusTone,
  } = props

  return (
    <div className="starter-footer-grid">
      <section className={cn('starter-card', 'starter-summary-card')}>
        <div>
          <strong>Starter Summary</strong>
          <div className="starter-summary-text">
            这个 demo 只使用 `@visactor/vbi-react/components` 来搭建核心编辑区， 用来验证 hooks + slim components
            这条路线。
          </div>
        </div>
        <div className="starter-stat-grid">
          <div>Data source: {dataSourceLabel}</div>
          <div>Rows: {rowCount}</div>
          <div>Available dimensions: {availableDimensionsCount}</div>
          <div>Available measures: {availableMeasuresCount}</div>
        </div>
        <div
          className={cn(
            'starter-status-box',
            statusTone === 'error' ? 'starter-status-error' : undefined,
            statusTone === 'success' ? 'starter-status-success' : undefined,
            statusTone === 'idle' ? 'starter-status-idle' : undefined,
          )}
        >
          {statusMessage}
        </div>
        <div className="starter-note">Demo schema 固定使用手工声明的字段类型，不再依赖首行自动猜测。</div>
      </section>

      <section className={cn('starter-card', 'starter-dsl-card')}>
        <details className="starter-dsl-details">
          <summary className="starter-dsl-summary">Current DSL Snapshot</summary>
          <pre className="starter-dsl-pre">{JSON.stringify(dsl, null, 2)}</pre>
        </details>
      </section>
    </div>
  )
}
