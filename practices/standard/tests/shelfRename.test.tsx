import type { ReactElement } from 'react'
import { afterEach, expect, rs, test } from '@rstest/core'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { Modal, message } from 'antd'
import { openShelfRenameModal } from 'src/components/Shelves/common/openShelfRenameModal'

afterEach(() => {
  cleanup()
  rs.restoreAllMocks()
})

test('empty names keep the dialog open without a rejected promise, then a valid name saves and closes', () => {
  let options: Parameters<typeof Modal.confirm>[0]
  rs.spyOn(Modal, 'confirm').mockImplementation((value) => {
    options = value
    return { destroy() {}, update() {} }
  })
  const warning = rs.spyOn(message, 'warning').mockImplementation(() => ({ then() {} }) as any)
  const rename = rs.fn(),
    close = rs.fn()
  openShelfRenameModal({
    title: 'Rename',
    placeholder: 'Name',
    okText: 'Save',
    cancelText: 'Cancel',
    emptyNameMessage: 'Required',
    id: 'dimension',
    currentAlias: 'Region',
    onRename: rename,
  })
  render(options!.content as ReactElement)
  fireEvent.change(screen.getByRole('textbox'), { target: { value: '  ' } })
  expect(options!.onOk!(close)).toBeUndefined()
  expect(warning).toHaveBeenCalledWith('Required')
  expect(rename).not.toHaveBeenCalled()
  expect(close).not.toHaveBeenCalled()
  fireEvent.change(screen.getByRole('textbox'), { target: { value: '  Area  ' } })
  expect(options!.onOk!(close)).toBeUndefined()
  expect(rename).toHaveBeenCalledWith('dimension', 'Area')
  expect(close).toHaveBeenCalledTimes(1)
})
