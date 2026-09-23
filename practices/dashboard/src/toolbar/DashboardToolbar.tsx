import type { ReactNode } from 'react'
import { Space, theme as antdTheme } from 'antd'
import { useDashboard } from '../DashboardContext'
import { useTranslation } from '../i18n'
import { DashboardEditToggle } from './EditToggle'
import { DashboardThemePicker } from './ThemePicker'
import { DashboardFullscreenButton } from './FullscreenButton'
import { DashboardUndoButton, DashboardRedoButton } from './HistoryButton'
import './toolbar.css'

export interface DashboardToolbarProps {
  children?: ReactNode
}

function DefaultToolbarControls() {
  const { mode } = useDashboard()
  const { token } = antdTheme.useToken()
  const divider = (
    <span aria-hidden className='vbi-dashboard-toolbar-divider' style={{ background: token.colorBorderSecondary }} />
  )
  return (
    <>
      {mode === 'edit' ? (
        <div className='vbi-dashboard-toolbar-group vbi-dashboard-toolbar-editing'>
          <DashboardEditToggle />
          {divider}
          <Space.Compact size='small'>
            <DashboardUndoButton />
            <DashboardRedoButton />
          </Space.Compact>
        </div>
      ) : null}
      <div className='vbi-dashboard-toolbar-group'>
        {mode === 'edit' ? (
          <>
            <DashboardThemePicker />
            {divider}
          </>
        ) : null}
        <DashboardFullscreenButton />
      </div>
    </>
  )
}

export function DashboardToolbar({ children = <DefaultToolbarControls /> }: DashboardToolbarProps) {
  const { locale, theme } = useDashboard()
  const { token } = antdTheme.useToken()
  const t = useTranslation(locale)
  return (
    <div
      role='group'
      aria-label={t('toolbar')}
      className='vbi-dashboard-toolbar'
      style={{
        background: theme.dashboard.toolbarBackground ?? token.colorBgContainer,
      }}
    >
      <div className='vbi-dashboard-toolbar-content'>{children}</div>
    </div>
  )
}
