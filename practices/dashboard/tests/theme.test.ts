import { expect, test } from '@rstest/core'
import { Builder, registerAll } from '@visactor/vseed'
import { registerDashboardTheme } from '../src/theme'
import { brandTokens } from './theme-fixture'

test('registers one token definition for charts and tables without replacing built-in themes', () => {
  registerAll()
  const light = Builder.getTheme('light')
  const dark = Builder.getTheme('dark')
  registerDashboardTheme('test-vseed-brand', { tokens: brandTokens })
  const chart = Builder.from({
    chartType: 'column',
    theme: 'test-vseed-brand',
    dataset: [{ region: 'East', sales: 42 }],
    dimensions: [{ id: 'region' }],
    measures: [{ id: 'sales' }],
  }).buildAdvanced()
  expect(chart?.config?.column?.color?.colorScheme).toEqual(brandTokens.colorScheme)
  expect(chart?.config?.column).toMatchObject({ fontFamily: brandTokens.fontFamily })
  const table = Builder.from({
    chartType: 'table',
    theme: 'test-vseed-brand',
    dataset: [{ sales: 42 }],
    measures: [{ id: 'sales' }],
  }).buildAdvanced()
  expect(table?.config?.table?.bodyFontColor).toBe(brandTokens.textPrimary)
  expect(table?.config?.table?.headerBackgroundColor).toBe(brandTokens.surfaceColor)
  expect(Builder.getTheme('light')).toBe(light)
  expect(Builder.getTheme('dark')).toBe(dark)
})

test('rejects empty or conflicting names without replacing registered themes', () => {
  for (const name of ['', '  ', 'light', 'dark']) {
    expect(() => registerDashboardTheme(name, { tokens: brandTokens })).toThrow()
  }
  registerDashboardTheme('test-stable-brand', { tokens: brandTokens })
  const registered = Builder.getTheme('test-stable-brand')
  expect(() => registerDashboardTheme('test-stable-brand', { tokens: structuredClone(brandTokens) })).not.toThrow()
  expect(() =>
    registerDashboardTheme('test-stable-brand', { tokens: { ...brandTokens, textPrimary: '#ffffff' } }),
  ).toThrow()
  expect(Builder.getTheme('test-stable-brand')).toBe(registered)
})

test('keeps explicit chart styles above the registered theme', () => {
  registerDashboardTheme('test-chart-overrides', { tokens: brandTokens })
  const chart = Builder.from({
    chartType: 'column',
    theme: 'test-chart-overrides',
    dataset: [{ sales: 42 }],
    measures: [{ id: 'sales' }],
    color: { colorScheme: ['#ff0000', '#0000ff'] },
  }).buildAdvanced()
  expect(chart?.config?.column?.color?.colorScheme).toEqual(['#ff0000', '#0000ff'])
  expect(Builder.getTheme('test-chart-overrides').config?.column?.color?.colorScheme).toEqual(brandTokens.colorScheme)
})

test('provides the dashboard presets to VSeed without a separate registration step', () => {
  const chart = Builder.from({
    chartType: 'column',
    theme: 'volcanoBlue',
    dataset: [{ sales: 42 }],
    measures: [{ id: 'sales' }],
  }).buildAdvanced()
  expect(chart?.config?.column?.color?.colorScheme).toEqual([
    '#006EFF',
    '#00E5E5',
    '#2E55EA',
    '#B8E7FE',
    '#00D689',
    '#B7F9F5',
    '#FBCC71',
    '#F46E50',
  ])
})
