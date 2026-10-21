import { expect, test } from '@rstest/core'
import { waitFor } from '@testing-library/react'
import { createVBIStore } from 'src/model'

function fixture() {
  let version = 0
  let notify = () => {}
  const pending: { resolve: (seed: any) => void; reject: (error: unknown) => void }[] = []
  const builder = {
    dsl: { toJSON: () => ({ chartType: 'table', version }) },
    doc: {
      on: (_: string, fn: () => void) => {
        notify = fn
      },
      off() {},
    },
    isEmpty: () => false,
    buildVSeed: () => new Promise((resolve, reject) => pending.push({ resolve, reject })),
  } as any
  const store = createVBIStore(builder)
  const dispose = store.getState().initialize()
  return {
    store,
    pending,
    dispose,
    edit() {
      version++
      notify()
    },
  }
}

test('query errors remove stale data and recover after the configuration is corrected', async () => {
  const f = fixture()
  f.pending[0].resolve({ dataset: [{ sales: 1 }] })
  await waitFor(() => expect(f.store.getState().vseed).not.toBeNull())
  f.edit()
  f.pending[1].reject(new Error('Invalid filter value'))
  await waitFor(() => expect(f.store.getState().error).toBe('Invalid filter value'))
  expect(f.store.getState().vseed).toBeNull()
  expect(f.store.getState().loading).toBe(false)
  f.edit()
  expect(f.store.getState().error).toBeNull()
  f.pending[2].resolve({ dataset: [{ sales: 2 }] })
  await waitFor(() => expect(f.store.getState().vseed?.dataset).toEqual([{ sales: 2 }]))
  f.dispose()
})

test('obsolete query completions cannot clear the current loading state or publish an error', async () => {
  const f = fixture()
  f.edit()
  f.pending[0].reject('obsolete failure')
  await new Promise((resolve) => setTimeout(resolve, 0))
  expect(f.store.getState().loading).toBe(true)
  expect(f.store.getState().error).toBeNull()
  f.pending[1].resolve({ dataset: [] })
  await waitFor(() => expect(f.store.getState().loading).toBe(false))
  f.edit()
  f.pending[2].reject('current failure')
  await waitFor(() => expect(f.store.getState().error).toBe('current failure'))
  f.dispose()
})
