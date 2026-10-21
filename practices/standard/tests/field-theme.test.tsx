import { afterEach, expect, rs, test } from '@rstest/core'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ConfigProvider, theme } from 'antd'
import { DimensionShelf, MeasureShelf } from 'src/components/Shelves'
import { ShelfDndProvider } from 'src/components/Shelves/dnd'
import { VBIStoreProvider } from 'src/model'
import { createDefaultBuilder, createLocalConnector, CONNECTOR_ID } from 'src/utils/localConnector'

afterEach(() => {
  cleanup()
  rs.unstubAllGlobals()
})

test('field roles follow the host theme without changing analysis state', async () => {
  rs.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  )
  createLocalConnector(CONNECTOR_ID)
  const builder = createDefaultBuilder()
  builder.dimensions.add('area', (node) => node.setAlias('Region'))
  builder.measures.add('sales', (node) => node.setAlias('Sales'))
  const original = builder.build()
  const view = (colorPrimary: string, dark = false) => (
    <ConfigProvider
      theme={{
        algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: { colorPrimary, colorSuccess: '#389e0d' },
      }}
    >
      <VBIStoreProvider builder={builder}>
        <ShelfDndProvider>
          <DimensionShelf />
          <MeasureShelf />
        </ShelfDndProvider>
      </VBIStoreProvider>
    </ConfigProvider>
  )
  const root = render(view('#8c6cff'))
  const tags = () => Array.from(root.container.querySelectorAll<HTMLElement>('[aria-roledescription="draggable"]'))
  await waitFor(() => expect(tags()).toHaveLength(2))
  const colors = () => tags().map((tag) => tag.style.color)
  const initial = colors()
  root.rerender(view('#073f7f'))
  expect(colors()[0]).not.toBe(initial[0])
  expect(colors()[1]).toBe(initial[1])
  fireEvent.mouseEnter(tags()[0])
  expect(tags()[0].style.backgroundColor).not.toBe('rgb(255, 255, 255)')
  fireEvent.mouseLeave(tags()[0])
  root.rerender(view('#073f7f', true))
  expect(colors()[0]).not.toBe(initial[0])
  expect(colors()[1]).not.toBe(initial[1])
  expect(builder.build()).toEqual(original)
  // Theme changes must retain the field menu and its domain operation.
  fireEvent.click(tags()[0].querySelector('.ant-dropdown-trigger')!)
  fireEvent.click(await screen.findByText('删除'))
  await waitFor(() => expect(builder.build().dimensions).toHaveLength(0))
  expect(builder.build().measures).toEqual(original.measures)
  root.unmount()
  builder.doc.destroy()
})
