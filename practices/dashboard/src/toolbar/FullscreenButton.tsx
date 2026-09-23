import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import { Button, Tooltip, theme as antdTheme } from 'antd'
import { useDashboard } from '../DashboardContext'
import { useTranslation } from '../i18n'
import { useFullscreen } from './useFullscreen'

export function DashboardFullscreenButton() {
  const { locale, containerRef } = useDashboard()
  const { token } = antdTheme.useToken()
  const t = useTranslation(locale)
  const { fullscreen, pending, error, toggle } = useFullscreen(containerRef)
  const label = t(fullscreen ? 'exitFullscreen' : 'enterFullscreen')
  return (
    <>
      <Tooltip
        title={label}
        getPopupContainer={(trigger) => trigger.closest<HTMLElement>('.vbi-dashboard')!}
        destroyOnHidden
      >
        <Button
          size='small'
          icon={
            fullscreen ? (
              <FullscreenExitOutlined style={{ fontSize: 12 }} />
            ) : (
              <FullscreenOutlined style={{ fontSize: 12 }} />
            )
          }
          aria-label={label}
          loading={pending}
          onClick={() => void toggle()}
        />
      </Tooltip>
      {error ? (
        <div className='vbi-dashboard-toolbar-error' role='alert' style={{ color: token.colorError }}>
          {t('fullscreenError')}
        </div>
      ) : null}
    </>
  )
}
