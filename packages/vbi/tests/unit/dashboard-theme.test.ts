import { createVBI } from '@visactor/vbi'
import { rs } from '@rstest/core'
import { Builder as VSeedBuilder, registerAll, type TokenThemeDefinition } from '@visactor/vseed'
import * as Y from 'yjs'
import { DashboardThemeBuilder } from 'src/dashboard-builder/features/theme/theme-builder'

test('defaults missing metadata to light and observes the first remote theme', () => {
  const doc = new Y.Doc()
  const dsl = doc.getMap('dsl')
  const theme = new DashboardThemeBuilder(dsl)
  expect(theme.getTheme()).toBe('light')
  expect(theme.getThemeDefinitions()).toEqual({})
  const changed = rs.fn(() => theme.getTheme())
  const unsubscribe = theme.observe(changed)
  dsl.set('meta', { title: 'Restored', theme: 'dark' })
  expect(changed).toHaveBeenCalledTimes(1)
  expect(changed).toHaveLastReturnedWith('dark')
  unsubscribe()
  doc.destroy()
})

test('returns an empty palette when the registered built-in theme has no chart colors', () => {
  const vbi = createVBI()
  const builder = vbi.dashboard.create(vbi.dashboard.createEmpty())
  builder.theme.resolveTheme('light')
  const original = VSeedBuilder.getTheme('light')
  try {
    VSeedBuilder.registerTheme('light', {})
    expect(builder.theme.getThemeOptions().find(({ name }) => name === 'light')?.colors).toEqual([])
  } finally {
    VSeedBuilder.registerTheme('light', original)
  }
})

const brand = {
  label: 'Emerald',
  tokens: {
    baseTheme: 'dark',
    colorScheme: ['#34d399', '#38bdf8'],
    linearColorScheme: ['#123b32', '#34d399'],
    textPrimary: '#edfdf5',
    textSecondary: '#a4c7ba',
    borderColor: '#315448',
    surfaceColor: '#102b22',
    surfaceBackgroundColor: '#091a14',
    tooltipBackgroundColor: '#15382c',
  } satisfies TokenThemeDefinition,
  dashboard: { padding: 20, gap: 12 },
}

test('configures a portable dashboard theme directly through Builder without rendering or global registration', () => {
  const vbi = createVBI()
  const builder = vbi.dashboard.create(vbi.dashboard.createEmpty())
  builder.theme.setTheme('emerald', brand)
  expect(builder.build().meta.themes?.emerald).toEqual(brand)
  expect(builder.theme.getTheme()).toBe('emerald')
  expect(builder.theme.getThemeConfig()).toEqual(brand)
  const restored = createVBI().dashboard.create(builder.build())
  expect(restored.theme.getThemeConfig()).toEqual(brand)
  expect(builder.undoManager.undo()).toBe(true)
  expect(builder.theme.getTheme()).toBe('light')
  expect(builder.theme.getThemeConfig('emerald')).toBeUndefined()
  expect(builder.undoManager.redo()).toBe(true)
  expect(builder.theme.getThemeConfig()).toEqual(brand)
})

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

test('syncs theme configuration updates and keeps definitions local, copied and reusable after switching', () => {
  const firstVBI = createVBI()
  const first = firstVBI.dashboard.create(firstVBI.dashboard.createEmpty())
  const otherVBI = createVBI()
  const other = otherVBI.dashboard.create(otherVBI.dashboard.createEmpty())
  const replicaVBI = createVBI()
  const replica = replicaVBI.dashboard.create(replicaVBI.dashboard.createEmpty())
  replica.applyUpdate(first.encodeStateAsUpdate())
  first.applyUpdate(replica.encodeStateAsUpdate())
  const changed = rs.fn()
  replica.theme.observe(changed)
  const input = structuredClone(brand)
  first.theme.registerTheme('emerald', input)
  expect(first.theme.getTheme()).toBe('light')
  input.tokens.textPrimary = '#000000'
  expect(first.theme.getThemeConfig('emerald')).toEqual(brand)
  expect(other.theme.getThemeConfig('emerald')).toBeUndefined()
  first.theme.setTheme('emerald')
  replica.applyUpdate(first.encodeStateAsUpdate())
  expect(replica.theme.getThemeConfig()).toEqual(brand)
  expect(changed).toHaveBeenCalledTimes(1)
  const updated = { ...brand, dashboard: { padding: 24, gap: 8 } }
  first.theme.registerTheme('emerald', updated)
  replica.applyUpdate(first.encodeStateAsUpdate())
  expect(replica.theme.getThemeConfig()).toEqual(updated)
  expect(changed).toHaveBeenCalledTimes(2)
  replica.theme.setTheme('emerald', updated)
  expect(changed).toHaveBeenCalledTimes(2)
  const copy = replica.theme.getThemeConfig()!
  copy.tokens.colorScheme[0] = '#ffffff'
  expect(replica.theme.getThemeConfig()).toEqual(updated)
  replica.theme.setTheme('dark')
  replica.theme.setTheme('emerald')
  expect(replica.theme.getThemeConfig()).toEqual(updated)
})

test('rejects invalid theme definitions before creation or mutation changes the document', () => {
  const vbi = createVBI()
  const builder = vbi.dashboard.create(vbi.dashboard.createEmpty())
  builder.theme.setTheme('emerald', brand)
  const before = builder.build()
  for (const definition of [
    null,
    { tokens: {} },
    { ...brand, tokens: { ...brand.tokens, colorScheme: ['#ffffff'] } },
    { ...brand, dashboard: { padding: -1 } },
  ]) {
    expect(() => builder.theme.setTheme('invalid', definition as typeof brand)).toThrow()
    expect(() => builder.theme.registerTheme('invalid', definition as typeof brand)).toThrow()
    expect(() =>
      vbi.dashboard.create({ ...before, meta: { ...before.meta, themes: { invalid: definition as typeof brand } } }),
    ).toThrow()
    expect(builder.build()).toEqual(before)
  }
})

test('observes the theme catalog and undo/redo while ignoring unrelated changes', () => {
  const vbi = createVBI()
  const builder = vbi.dashboard.create(vbi.dashboard.createEmpty())
  const changed = rs.fn(() => ({ name: builder.theme.getTheme(), definitions: builder.theme.getThemeDefinitions() }))
  const unsubscribe = builder.theme.observe(changed)
  builder.theme.registerTheme('emerald', brand)
  expect(changed).toHaveLastReturnedWith({ name: 'light', definitions: { emerald: brand } })
  builder.theme.setTheme('emerald')
  builder.undoManager.clear()
  const updated = { ...brand, dashboard: { padding: 32, gap: 16 } }
  builder.theme.setTheme('emerald', updated)
  expect(changed).toHaveLastReturnedWith({ name: 'emerald', definitions: { emerald: updated } })
  builder.undoManager.undo()
  expect(changed).toHaveLastReturnedWith({ name: 'emerald', definitions: { emerald: brand } })
  builder.undoManager.redo()
  expect(changed).toHaveLastReturnedWith({ name: 'emerald', definitions: { emerald: updated } })
  expect(changed).toHaveBeenCalledTimes(5)
  builder.dsl.set('meta', { ...builder.build().meta, title: 'Renamed' })
  builder.theme.setTheme('emerald', updated)
  const definitions = builder.theme.getThemeDefinitions()
  definitions.emerald.tokens.colorScheme[0] = '#000000'
  expect(builder.theme.getThemeConfig()).toEqual(updated)
  expect(changed).toHaveBeenCalledTimes(5)
  unsubscribe()
  builder.theme.registerTheme('emerald', brand)
  expect(changed).toHaveBeenCalledTimes(5)
})

test('owns preset discovery and VSeed registration without a Dashboard component', () => {
  const vbi = createVBI()
  const builder = vbi.dashboard.create(vbi.dashboard.createEmpty())
  const options = builder.theme.getThemeOptions()
  expect(options).toHaveLength(12)
  expect(options.find(({ name }) => name === 'clean')?.baseTheme).toBe('light')
  expect(options.find(({ name }) => name === 'volcanoBlue')?.colors[0]).toBe('#006EFF')
  builder.theme.setTheme('volcanoBlue')
  const resolved = builder.theme.resolveTheme()
  expect(resolved).toMatchObject({ name: 'volcanoBlue', baseTheme: 'dark' })
  expect(VSeedBuilder.getTheme(resolved.chartTheme).config?.column?.color?.colorScheme).toEqual(
    options.find(({ name }) => name === 'volcanoBlue')?.colors,
  )
  const before = builder.build()
  expect(builder.theme.resolveTheme('missing')).toMatchObject({
    name: 'light',
    chartTheme: 'light',
    baseTheme: 'light',
  })
  expect(builder.build()).toEqual(before)
})

test('resolves isolated runtime themes after restoration, undo and synchronization', () => {
  const vbi = createVBI()
  const first = vbi.dashboard.create(vbi.dashboard.createEmpty())
  const second = vbi.dashboard.create(vbi.dashboard.createEmpty())
  first.theme.setTheme('brand', brand)
  const initial = first.theme.resolveTheme()
  second.theme.setTheme('brand', { ...brand, tokens: { ...brand.tokens, colorScheme: ['#0088ff', '#ffffff'] } })
  const other = second.theme.resolveTheme()
  expect(initial.chartTheme).not.toBe(other.chartTheme)
  expect(vbi.dashboard.create(first.build()).theme.resolveTheme()).toEqual(initial)
  first.undoManager.clear()
  const changed = rs.fn(
    () => VSeedBuilder.getTheme(first.theme.resolveTheme().chartTheme).config?.column?.color?.colorScheme,
  )
  const unsubscribe = first.theme.observe(changed)
  first.theme.registerTheme('brand', { ...brand, tokens: { ...brand.tokens, colorScheme: ['#ff8800', '#ffffff'] } })
  expect(changed).toHaveLastReturnedWith(['#ff8800', '#ffffff'])
  first.undoManager.undo()
  expect(changed).toHaveLastReturnedWith(brand.tokens.colorScheme)
  first.undoManager.redo()
  expect(changed).toHaveLastReturnedWith(['#ff8800', '#ffffff'])
  expect(VSeedBuilder.getTheme(other.chartTheme).config?.column?.color?.colorScheme).toEqual(['#0088ff', '#ffffff'])
  const replica = vbi.dashboard.create(vbi.dashboard.createEmpty())
  replica.applyUpdate(first.encodeStateAsUpdate())
  first.applyUpdate(replica.encodeStateAsUpdate())
  first.theme.setTheme('brand', brand)
  replica.applyUpdate(first.encodeStateAsUpdate())
  expect(replica.theme.resolveTheme()).toEqual(initial)
  unsubscribe()
})

test('allows document presets to override built-in names without changing other dashboards or VSeed defaults', () => {
  const vbi = createVBI()
  const first = vbi.dashboard.create(vbi.dashboard.createEmpty())
  const second = vbi.dashboard.create(vbi.dashboard.createEmpty())
  const original = second.theme.resolveTheme('dark')
  const defaults = VSeedBuilder.getTheme('dark')
  first.theme.registerTheme('dark', brand)
  expect(first.theme.getTheme()).toBe('light')
  const resolved = first.theme.resolveTheme('dark')
  expect(resolved.definition).toEqual(brand)
  expect(resolved.chartTheme).not.toBe('dark')
  expect(VSeedBuilder.getTheme('dark')).toBe(defaults)
  expect(second.theme.resolveTheme('dark')).toEqual(original)
  expect(first.theme.getThemeOptions()).toHaveLength(12)
  resolved.definition!.tokens.textPrimary = '#000000'
  expect(first.theme.getThemeConfig('dark')).toEqual(brand)
  first.theme.registerTheme('light', brand)
  expect(first.theme.resolveTheme('missing')).toEqual(first.theme.resolveTheme('light'))
})

test('applies Builder themes to charts and tables while preserving explicit chart styles', () => {
  registerAll()
  const vbi = createVBI()
  const builder = vbi.dashboard.create(vbi.dashboard.createEmpty())
  builder.theme.setTheme('emerald', brand)
  const { chartTheme } = builder.theme.resolveTheme()
  const chart = VSeedBuilder.from({
    chartType: 'column',
    theme: chartTheme,
    dataset: [{ sales: 42 }],
    measures: [{ id: 'sales' }],
    color: { colorScheme: ['#ff0000', '#0000ff'] },
  }).buildAdvanced()
  expect(chart?.config?.column?.color?.colorScheme).toEqual(['#ff0000', '#0000ff'])
  expect(VSeedBuilder.getTheme(chartTheme).config?.column?.color?.colorScheme).toEqual(brand.tokens.colorScheme)
  const table = VSeedBuilder.from({
    chartType: 'table',
    theme: chartTheme,
    dataset: [{ sales: 42 }],
    measures: [{ id: 'sales' }],
  }).buildAdvanced()
  expect(table?.config?.table?.bodyFontColor).toBe(brand.tokens.textPrimary)
  expect(table?.config?.table?.headerBackgroundColor).toBe(brand.tokens.surfaceColor)
})
