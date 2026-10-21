import { Input, Modal, message } from 'antd'
import type { ChangeEvent } from 'react'

export const openShelfRenameModal = (params: {
  title: string
  placeholder: string
  okText: string
  cancelText: string
  emptyNameMessage: string
  id: string
  currentAlias: string
  onRename: (id: string, alias: string) => void
}) => {
  const { title, placeholder, okText, cancelText, emptyNameMessage, id, currentAlias, onRename } = params
  let nextAlias = currentAlias

  Modal.confirm({
    title,
    okText,
    cancelText,
    content: (
      <Input
        autoFocus
        defaultValue={currentAlias}
        placeholder={placeholder}
        maxLength={50}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          nextAlias = event.target.value
        }}
      />
    ),
    onOk: (close: () => void) => {
      const trimmed = nextAlias.trim()
      if (!trimmed) {
        message.warning(emptyNameMessage)
        return
      }

      onRename(id, trimmed)
      close()
    },
  })
}
