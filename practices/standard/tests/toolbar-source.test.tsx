import { afterEach, beforeEach, expect, rs, test } from '@rstest/core'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { Toolbar } from 'src/components/Toolbar'
import { VBIStoreProvider } from 'src/model'
import { createDefaultBuilder } from 'src/utils/localConnector'

beforeEach(() => {
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
})

test('the default toolbar can still open and cancel CSV import', async () => {
  const builder = createDefaultBuilder()
  const root = render(
    <VBIStoreProvider builder={builder}>
      <Toolbar isFullscreen={false} onToggleFullscreen={() => {}} />
    </VBIStoreProvider>,
  )
  fireEvent.click(root.container.querySelector('.anticon-cloud-upload')!.closest('button')!)
  expect(await screen.findByText('上传 CSV')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Close' }))
  root.unmount()
  builder.doc.destroy()
})

test('a fixed-source host omits the CSV button and file input while preserving history and appearance controls', () => {
  const builder = createDefaultBuilder()
  const before = builder.build()
  const root = render(
    <VBIStoreProvider builder={builder}>
      <Toolbar
        supportedLocales={['zh-CN', 'en-US']}
        allowSourceChange={false}
        showChartType={false}
        isFullscreen={false}
        onToggleFullscreen={() => {}}
      />
    </VBIStoreProvider>,
  )
  expect(root.container.querySelector('.anticon-cloud-upload')).toBeNull()
  expect(document.querySelector('input[type=file]')).toBeNull()
  expect(root.container.querySelector('button[aria-expanded]')).toBeNull()
  expect(root.container.querySelector('.anticon-undo')).not.toBeNull()
  expect(root.container.querySelector('.anticon-redo')).not.toBeNull()
  fireEvent.click(root.container.querySelector('.anticon-moon')!)
  expect(builder.build().theme).toBe('dark')
  expect(builder.build().dimensions).toEqual(before.dimensions)
  expect(builder.build().measures).toEqual(before.measures)
  root.unmount()
  builder.doc.destroy()
})
