import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import { Button, Switch, theme as antdTheme } from 'antd'
import type { Locale } from '@visactor/vseed'
import { useTranslation } from './i18n'
import type { useFullscreen } from './useFullscreen'

interface ToolbarProps {
  locale: Locale
  theme: 'light' | 'dark'
  mode: 'view' | 'edit'
  editing: boolean
  onEditingChange: (enabled: boolean) => void
  fullscreen: ReturnType<typeof useFullscreen>
}

export function Toolbar({ locale, theme, mode, editing, onEditingChange, fullscreen }: ToolbarProps) {
  const { token } = antdTheme.useToken()
  const t = useTranslation(locale)
  const fullscreenLabel = t(fullscreen.fullscreen ? 'exitFullscreen' : 'enterFullscreen')
  return (
    <div className='vbi-dashboard-toolbar-container'>
      <div
        role='group'
        aria-label={t('toolbar')}
        className='vbi-dashboard-toolbar'
        style={{
          borderColor: token.colorBorderSecondary,
          borderRadius: token.borderRadiusOuter,
          background:
            theme === 'dark'
              ? 'linear-gradient(180deg, rgba(10, 17, 28, 0.9), rgba(15, 22, 35, 0.94))'
              : 'linear-gradient(180deg, rgba(248, 250, 252, 0.92), rgba(255, 255, 255, 0.98))',
        }}
      >
        {mode === 'edit' ? (
          <label className='vbi-dashboard-edit-switch'>
            <span>{t('enableEditing')}</span>
            <Switch size='small' aria-label={t('enableEditing')} checked={editing} onChange={onEditingChange} />
          </label>
        ) : null}
        <Button
          type='text'
          size='small'
          icon={fullscreen.fullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          aria-label={fullscreenLabel}
          title={fullscreenLabel}
          loading={fullscreen.pending}
          onClick={() => void fullscreen.toggle()}
        />
      </div>
      {fullscreen.error ? (
        <div role='alert' style={{ color: token.colorError }}>
          {t('fullscreenError')}
        </div>
      ) : null}
    </div>
  )
}
