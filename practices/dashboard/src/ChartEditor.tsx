import type { VBIChartBuilder } from '@visactor/vbi'
import type { Locale } from '@visactor/vseed'
import { ConfigProvider, Modal } from 'antd'
import { APP as Standard } from 'standard'
import { useTranslation } from './i18n'

interface ChartEditorProps {
  builder: VBIChartBuilder
  title: string
  locale: Locale
  theme: 'light' | 'dark'
  container: HTMLElement
  onClose: () => void
}

export function ChartEditor({ builder, title, locale, theme, container, onClose }: ChartEditorProps) {
  const t = useTranslation(locale)
  return (
    <Modal
      open
      destroyOnHidden
      className='vbi-dashboard-chart-editor'
      getContainer={container}
      title={t('editChart', { title: title || t('untitledChart') })}
      closable={{ 'aria-label': t('backToDashboard') }}
      onCancel={onClose}
      footer={null}
      width='100vw'
      style={{ top: 0, paddingBottom: 0, maxWidth: '100vw', margin: 0 }}
      styles={{
        container: { height: '100dvh', borderRadius: 0, display: 'flex', flexDirection: 'column', padding: 16 },
        header: { flexShrink: 0, paddingRight: 32, marginBottom: 16 },
        body: { flex: 1, minHeight: 0, minWidth: 0, overflow: 'auto' },
      }}
    >
      <ConfigProvider
        getPopupContainer={(trigger) =>
          (document.fullscreenElement as HTMLElement | null) ??
          trigger?.closest<HTMLElement>('.vbi-dashboard-chart-editor') ??
          container
        }
      >
        <div style={{ height: '100%', minWidth: 720 }}>
          <Standard builder={builder} mode='edit' border={false} locale={locale} theme={theme} hideLocale hideTheme />
        </div>
      </ConfigProvider>
    </Modal>
  )
}
