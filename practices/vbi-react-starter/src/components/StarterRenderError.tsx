import { cn } from '../utils/cn'

type StarterRenderErrorProps = {
  errorMessage: string
  onRetry: () => void
}

export function StarterRenderError(props: StarterRenderErrorProps) {
  const { errorMessage, onRetry } = props

  return (
    <div className={cn('starter-card', 'starter-error-card')} role="alert">
      <div>
        <strong>Starter preview build failed</strong>
        <div className="starter-error-message">{errorMessage}</div>
      </div>
      <div className="starter-error-hint">这通常意味着字段类型、聚合配置或 DSL 组合不匹配。</div>
      <div>
        <button className={cn('starter-button', 'starter-button-primary')} onClick={onRetry} type="button">
          Retry
        </button>
      </div>
    </div>
  )
}
