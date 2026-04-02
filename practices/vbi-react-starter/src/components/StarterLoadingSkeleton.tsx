import { cn } from '../utils/cn'

export function StarterLoadingSkeleton() {
  return (
    <div className={cn('starter-card', 'starter-loading-card')} aria-live="polite" aria-busy="true">
      <div className="starter-loading-header">
        <div className="starter-skeleton starter-skeleton-title" />
        <div className="starter-skeleton starter-skeleton-tag" />
      </div>
      <div className="starter-loading-body">
        <div className="starter-skeleton starter-skeleton-line" />
        <div className="starter-skeleton starter-skeleton-line starter-skeleton-line-short" />
        <div className="starter-skeleton starter-skeleton-chart" />
      </div>
    </div>
  )
}
