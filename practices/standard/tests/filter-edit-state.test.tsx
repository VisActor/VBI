import { afterEach, beforeEach, expect, rs, test } from '@rstest/core'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { FilterPanel } from 'src/components/Filter/FilterPanel'
import { HavingFilterPanel } from 'src/components/Filter/HavingFilterPanel'
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

test('WHERE draft survives parent hover rerenders and reopening restores the saved value', async () => {
  const item = { id: 'area-filter', field: 'area', operator: '=', value: '华东' }
  const fields = [{ name: 'area', role: 'dimension' as const }]
  const builder = createDefaultBuilder()
  const view = (open = true) => (
    <VBIStoreProvider builder={builder}>
      <FilterPanel fields={fields} filters={[item]} itemEdit open={open} />
    </VBIStoreProvider>
  )
  const root = render(view())
  fireEvent.change(screen.getByRole('textbox'), { target: { value: '华北' } })
  root.rerender(view())
  expect(screen.getByRole('textbox')).toHaveValue('华北')
  root.rerender(view(false))
  root.rerender(view())
  await waitFor(() => expect(screen.getByRole('textbox')).toHaveValue('华东'))
})

test('HAVING draft survives a fresh filters array from the shelf', () => {
  const item = { id: 'profit-filter', field: 'profit', aggregate: { func: 'sum' as const }, operator: '>', value: 10 }
  const fields = [{ name: 'profit', role: 'measure' as const }]
  const builder = createDefaultBuilder()
  const view = () => (
    <VBIStoreProvider builder={builder}>
      <HavingFilterPanel fields={fields} filters={[item]} itemEdit open />
    </VBIStoreProvider>
  )
  const root = render(view())
  fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '25' } })
  root.rerender(view())
  expect(screen.getByRole('spinbutton')).toHaveValue('25')
})
