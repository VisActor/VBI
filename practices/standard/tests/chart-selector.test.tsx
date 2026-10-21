import { afterEach, beforeEach, expect, rs, test } from '@rstest/core'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ChartTypeSelector } from 'src/components/ChartType'
import { VBIStoreProvider } from 'src/model'
import { createDefaultBuilder } from 'src/utils/localConnector'

beforeEach(() => {
  Object.defineProperty(document, 'fullscreenElement', { configurable: true, get: () => null })
  rs.stubGlobal('matchMedia', () => ({
    matches: false,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
  }))
  rs.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  )
})
afterEach(() => {
  cleanup()
  rs.unstubAllGlobals()
  rs.restoreAllMocks()
  Reflect.deleteProperty(document, 'fullscreenElement')
})

test('the default gallery closes after selecting a chart', async () => {
  const builder = createDefaultBuilder()
  const root = render(
    <VBIStoreProvider builder={builder}>
      <ChartTypeSelector />
    </VBIStoreProvider>,
  )
  const trigger = root.container.querySelector('button')!
  fireEvent.click(trigger)
  fireEvent.click(await screen.findByRole('button', { name: /^条形图:/ }))
  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'))
  expect(builder.build().chartType).toBe('bar')
  root.unmount()
  builder.doc.destroy()
})

test('a persistent gallery supports consecutive choices, close, escape and focus return', async () => {
  const builder = createDefaultBuilder()
  const root = render(
    <VBIStoreProvider builder={builder}>
      <ChartTypeSelector compact closeOnSelect={false} placement='bottom' />
    </VBIStoreProvider>,
  )
  const trigger = root.container.querySelector('button')!
  rs.spyOn(document, 'fullscreenElement', 'get').mockReturnValue(root.container)
  expect(trigger.querySelector('.anticon-down')).not.toBeNull()
  fireEvent.click(trigger)
  const bar = await screen.findByRole('button', { name: /^条形图:/ })
  expect(bar).toHaveClass('ant-btn')
  fireEvent.click(bar)
  expect(trigger).toHaveAttribute('aria-expanded', 'true')
  expect(bar).toHaveAttribute('aria-pressed', 'true')
  const line = screen.getByRole('button', { name: /^折线图:/ })
  fireEvent.click(line)
  expect(builder.build().chartType).toBe('line')
  expect(trigger).toHaveAttribute('aria-expanded', 'true')
  fireEvent.keyDown(line, { key: 'ArrowRight' })
  expect(trigger).toHaveAttribute('aria-expanded', 'true')
  fireEvent.keyDown(line, { key: 'Escape' })
  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'))
  expect(trigger).toHaveFocus()
  fireEvent.keyDown(trigger, { key: 'Escape' })
  fireEvent.click(trigger)
  fireEvent.click(await screen.findByRole('button', { name: '关闭' }))
  await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'))
  expect(trigger).toHaveFocus()
  root.unmount()
  builder.doc.destroy()
})
