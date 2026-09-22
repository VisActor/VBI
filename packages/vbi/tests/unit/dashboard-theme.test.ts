import { createVBI } from '@visactor/vbi'
import { rs } from '@rstest/core'

test('saves a custom dashboard theme while preserving metadata and supports undo and redo', () => {
  const vbi = createVBI()
  const builder = vbi.dashboard.create({
    ...vbi.dashboard.createEmpty(),
    meta: { title: 'Sales', description: 'Monthly review' },
  })
  expect(builder.theme.getTheme()).toBe('light')
  builder.theme.setTheme('brand-dark')
  expect(builder.build().meta).toEqual({ title: 'Sales', description: 'Monthly review', theme: 'brand-dark' })
  expect(builder.theme.toJSON()).toBe('brand-dark')
  expect(builder.undoManager.undo()).toBe(true)
  expect(builder.theme.getTheme()).toBe('light')
  expect(builder.undoManager.redo()).toBe(true)
  expect(builder.theme.getTheme()).toBe('brand-dark')
})

test('observes local and remote theme changes, ignores metadata-only changes and unsubscribes', () => {
  const vbi = createVBI()
  const builder = vbi.dashboard.create(vbi.dashboard.createEmpty())
  const replica = vbi.dashboard.create(vbi.dashboard.createEmpty())
  replica.applyUpdate(builder.encodeStateAsUpdate())
  builder.applyUpdate(replica.encodeStateAsUpdate())
  const changed = rs.fn(() => replica.theme.getTheme())
  const unsubscribe = replica.theme.observe(changed)
  builder.theme.setTheme('brand-dark')
  replica.applyUpdate(builder.encodeStateAsUpdate())
  expect(changed).toHaveBeenCalledTimes(1)
  expect(changed).toHaveLastReturnedWith('brand-dark')
  replica.theme.setTheme('brand-dark')
  replica.dsl.set('meta', { ...replica.build().meta, title: 'Renamed' })
  expect(changed).toHaveBeenCalledTimes(1)
  replica.theme.setTheme('light')
  expect(changed).toHaveBeenCalledTimes(2)
  unsubscribe()
  replica.theme.setTheme('dark')
  expect(changed).toHaveBeenCalledTimes(2)
})

test('validates theme names at creation and mutation without corrupting an existing dashboard', () => {
  const vbi = createVBI()
  const builder = vbi.dashboard.create({ ...vbi.dashboard.createEmpty(), meta: { title: '', theme: 'brand-light' } })
  expect(builder.theme.getTheme()).toBe('brand-light')
  for (const theme of ['', '   ']) {
    expect(() => builder.theme.setTheme(theme)).toThrow()
    expect(() => vbi.dashboard.create({ ...builder.build(), meta: { title: '', theme } })).toThrow()
  }
  expect(builder.theme.getTheme()).toBe('brand-light')
})
