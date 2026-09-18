import { afterEach, beforeEach, expect, test } from '@rstest/core'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { APP } from 'src/App'
import { createDefaultBuilder, setLocalDataWithSchema } from 'src/utils/localConnector'

beforeEach(() => {
  setLocalDataWithSchema([], [])
})

afterEach(() => {
  cleanup()
  setLocalDataWithSchema([], null)
})

test('APP keeps initializing loading inside its own root', () => {
  const { container } = render(<APP />)

  expect(container.querySelector('.demo-app-loading')).toBeInTheDocument()
  expect(document.body.querySelector('.ant-spin-fullscreen')).not.toBeInTheDocument()
})

test('APP keeps edit workbench as the default mode', async () => {
  render(<APP builder={createDefaultBuilder()} />)

  expect(await screen.findByPlaceholderText('搜索')).toBeInTheDocument()
  expect(screen.getAllByText('暂时为空').length).toBeGreaterThan(0)
})

test('APP hides editor controls in view mode', async () => {
  const builder = createDefaultBuilder()
  const { container, rerender } = render(<APP builder={builder} mode='view' />)

  expect((await screen.findAllByText('暂时为空')).length).toBeGreaterThan(0)

  await waitFor(() => {
    expect(screen.queryByPlaceholderText('搜索')).not.toBeInTheDocument()
  })

  expect(container.querySelector('.demo-app-view-frame')).toHaveStyle({ borderWidth: '1px' })
  rerender(<APP builder={builder} mode='view' border={false} />)
  expect(container.querySelector('.demo-app-view-frame')).toHaveStyle({ borderWidth: '0px', borderRadius: '0' })
})

test('APP can hide internal locale and theme controls', async () => {
  render(<APP builder={createDefaultBuilder()} hideLocale hideTheme locale='en-US' theme='dark' />)

  expect(await screen.findByPlaceholderText('Search')).toBeInTheDocument()
  expect(screen.queryByText('EN')).not.toBeInTheDocument()
  expect(screen.queryByLabelText('sun')).not.toBeInTheDocument()
})
