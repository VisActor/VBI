export type StarterEmptyStateProps = {
  description: string
  title: string
}

export function StarterEmptyState(props: StarterEmptyStateProps) {
  const { description, title } = props

  return (
    <div className="starter-empty-state">
      <strong className="starter-empty-title">{title}</strong>
      <div className="starter-empty-description">{description}</div>
    </div>
  )
}
