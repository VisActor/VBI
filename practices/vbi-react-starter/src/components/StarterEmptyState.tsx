export type StarterEmptyStateProps = {
  actionLabel?: string
  description: string
  onAction?: () => void
  title: string
}

export function StarterEmptyState(props: StarterEmptyStateProps) {
  const { actionLabel, description, onAction, title } = props

  return (
    <div className="starter-empty-state">
      <strong className="starter-empty-title">{title}</strong>
      <div className="starter-empty-description">{description}</div>
      {actionLabel && onAction ? (
        <button className="starter-button starter-button-primary starter-empty-action" onClick={onAction} type="button">
          {actionLabel}
        </button>
      ) : null}
    </div>
  )
}
