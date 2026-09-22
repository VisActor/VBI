import { Switch } from 'antd'
import { useDashboard } from '../DashboardContext'
import { useTranslation } from '../i18n'

export function DashboardEditToggle() {
  const { locale, mode, editing, onEditingChange } = useDashboard()
  const t = useTranslation(locale)
  if (mode !== 'edit') return null
  return (
    <label className='vbi-dashboard-edit-switch'>
      <span>{t('enableEditing')}</span>
      <Switch size='small' aria-label={t('enableEditing')} checked={editing} onChange={onEditingChange} />
    </label>
  )
}
