import type { CSSProperties, ReactNode } from 'react'

import type { BaseComponentProps } from './types'
import { joinClassNames } from './utils'

export interface BuilderLayoutProps extends BaseComponentProps {
  footer?: ReactNode
  leftPanel?: ReactNode
  leftPanelWidth?: number | string
  main?: ReactNode
  rightPanel?: ReactNode
  rightPanelWidth?: number | string
  topBar?: ReactNode
}

function toTrackSize(value: number | string): string {
  return typeof value === 'number' ? `${value}px` : value
}

export function BuilderLayout(props: BuilderLayoutProps) {
  const {
    className,
    footer,
    leftPanel,
    leftPanelWidth = 320,
    main,
    rightPanel,
    rightPanelWidth = 320,
    style,
    topBar,
  } = props

  const columns = [
    leftPanel ? toTrackSize(leftPanelWidth) : undefined,
    'minmax(0, 1fr)',
    rightPanel ? toTrackSize(rightPanelWidth) : undefined,
  ]
    .filter(Boolean)
    .join(' ')

  const rows = [topBar ? 'auto' : undefined, 'minmax(0, 1fr)', footer ? 'auto' : undefined].filter(Boolean).join(' ')
  const layoutStyle = {
    '--vbi-react-layout-rows': rows,
    '--vbi-react-layout-columns': columns,
    ...style,
  } as CSSProperties

  return (
    <section className={joinClassNames('vbi-react-builder-layout', className)} style={layoutStyle}>
      {topBar ? <header className='vbi-react-builder-layout__header'>{topBar}</header> : null}
      <div className='vbi-react-builder-layout__body'>
        {leftPanel ? <aside className='vbi-react-builder-layout__left'>{leftPanel}</aside> : null}
        <main className='vbi-react-builder-layout__main'>{main}</main>
        {rightPanel ? <aside className='vbi-react-builder-layout__right'>{rightPanel}</aside> : null}
      </div>
      {footer ? <footer className='vbi-react-builder-layout__footer'>{footer}</footer> : null}
    </section>
  )
}
