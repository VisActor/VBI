import { useCallback, useSyncExternalStore } from 'react'
import { RedoOutlined, UndoOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import { useDashboard } from '../DashboardContext'
import { useTranslation } from '../i18n'

function DashboardHistoryButton({ action }: { action: 'undo' | 'redo' }) {
  const { locale, mode, editing, undoManager } = useDashboard()
  const t = useTranslation(locale)
  const subscribe = useCallback((notify: () => void) => undoManager.observe(notify), [undoManager])
  const getSnapshot = useCallback(
    () => (action === 'undo' ? undoManager.canUndo() : undoManager.canRedo()),
    [action, undoManager],
  )
  const available = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  if (mode !== 'edit') return null
  return (
    <Tooltip
      title={t(action)}
      getPopupContainer={(trigger) => trigger.closest<HTMLElement>('.vbi-dashboard')!}
      destroyOnHidden
    >
      <Button
        size='small'
        icon={action === 'undo' ? <UndoOutlined style={{ fontSize: 12 }} /> : <RedoOutlined style={{ fontSize: 12 }} />}
        aria-label={t(action)}
        disabled={!editing || !available}
        onClick={() => undoManager[action]()}
      />
    </Tooltip>
  )
}

export function DashboardUndoButton() {
  return <DashboardHistoryButton action='undo' />
}

export function DashboardRedoButton() {
  return <DashboardHistoryButton action='redo' />
}
