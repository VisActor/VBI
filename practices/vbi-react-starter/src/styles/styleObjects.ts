import type { CSSProperties } from 'react'

const baseCardStyle: CSSProperties = {
  background: 'var(--starter-surface)',
  border: '1px solid var(--starter-border)',
  borderRadius: 12,
  boxSizing: 'border-box',
}

export const fieldPanelStyle: CSSProperties = {
  ...baseCardStyle,
  color: 'var(--starter-text-primary)',
  height: '100%',
  minHeight: 0,
  overflow: 'hidden',
  padding: 16,
}

export const chartRendererStyle: CSSProperties = {
  ...baseCardStyle,
  background: 'var(--starter-panel)',
  height: '100%',
  minHeight: 0,
  minWidth: 0,
  overflow: 'hidden',
  padding: 12,
}

export const mainPlaceholderStyle: CSSProperties = {
  ...baseCardStyle,
  background: 'var(--starter-panel)',
  height: '100%',
}

export const chartCanvasStyle: CSSProperties = {
  background: 'var(--starter-canvas)',
  borderRadius: 8,
  minHeight: 0,
  overflow: 'hidden',
  padding: 8,
}

export const layoutStyle: CSSProperties = {
  gridTemplateRows: 'auto minmax(320px, 1fr) auto',
  height: '100%',
  minHeight: '100%',
}
