import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import { Button, theme as antdTheme } from 'antd'
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
      <Button
        type='text'
        size='small'
        icon={fullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
        aria-label={label}
        title={label}
        loading={pending}
        onClick={() => void toggle()}
      />
      {error ? (
        <div className='vbi-dashboard-toolbar-error' role='alert' style={{ color: token.colorError }}>
          {t('fullscreenError')}
        </div>
      ) : null}
    </>
  )
}
