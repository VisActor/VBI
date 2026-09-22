import type { ReactNode } from 'react'
import { theme as antdTheme } from 'antd'
import { useDashboard } from '../DashboardContext'
import { useTranslation } from '../i18n'
import { DashboardEditToggle } from './EditToggle'
import { DashboardThemePicker } from './ThemePicker'
import { DashboardFullscreenButton } from './FullscreenButton'
import './toolbar.css'

export interface DashboardToolbarProps {
  children?: ReactNode
}

export function DashboardToolbar({
  children = (
    <>
      <DashboardEditToggle />
      <DashboardThemePicker />
      <DashboardFullscreenButton />
    </>
  ),
}: DashboardToolbarProps) {
  const { locale, theme } = useDashboard()
  const { token } = antdTheme.useToken()
  const t = useTranslation(locale)
  return (
    <div
      role='group'
      aria-label={t('toolbar')}
      className='vbi-dashboard-toolbar'
      style={{
        borderColor: token.colorBorderSecondary,
        borderRadius: token.borderRadiusOuter,
        background: theme.dashboard.toolbarBackground ?? token.colorBgContainer,
      }}
    >
      {children}
    </div>
  )
}
