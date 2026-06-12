import type { CSSProperties } from 'react'

const baseCardStyle: CSSProperties = {
  background: 'var(--starter-surface)',
  border: '1px solid var(--starter-border)',
  borderRadius: 'var(--starter-radius-md)',
  boxSizing: 'border-box',
}

export const fieldPanelStyle: CSSProperties = {
  ...baseCardStyle,
  color: 'var(--starter-text-primary)',
  height: '100%',
  minHeight: 0,
  overflow: 'hidden',
}

export const filterPanelStyle: CSSProperties = {
  ...baseCardStyle,
  color: 'var(--starter-text-primary)',
  height: '100%',
  minHeight: 0,
  overflow: 'auto',
}

export const sidebarStackStyle: CSSProperties = {
  display: 'grid',
  gap: 12,
  gridTemplateRows: 'minmax(0, 0.85fr) minmax(0, 1.15fr)',
  height: '100%',
  minHeight: 0,
  overflowY: 'auto',
}

export const themeSelectorStyle: CSSProperties = {
  color: 'var(--starter-text-primary)',
  minWidth: 120,
}

export const chartRendererStyle: CSSProperties = {
  ...baseCardStyle,
  height: '100%',
  minHeight: 0,
  minWidth: 0,
  overflow: 'hidden',
}

export const chartCanvasStyle: CSSProperties = {
  borderRadius: 'var(--starter-radius-sm)',
  minHeight: 0,
  overflow: 'hidden',
}
