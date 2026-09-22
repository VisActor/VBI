import { act, renderHook } from '@testing-library/react'
import { createVBI } from '@visactor/vbi'
import { expect, rs, test } from '@rstest/core'
import { useDashboardTheme } from '../src/useDashboardTheme'
import { brandTokens } from './theme-fixture'

test('subscribes to theme changes and releases subscriptions when the builder changes or unmounts', () => {
  const vbi = createVBI()
  const first = vbi.dashboard.create(vbi.dashboard.createEmpty())
  const second = vbi.dashboard.create(vbi.dashboard.createEmpty())
  const subscriptions = [first, second].map((builder) => {
    const observe = builder.theme.observe.bind(builder.theme)
    const unsubscribe = rs.fn()
    const subscribe = rs.spyOn(builder.theme, 'observe').mockImplementation((notify) => {
      const stop = observe(notify)
      return () => {
        stop()
        unsubscribe()
      }
    })
    return { subscribe, unsubscribe }
  })
  const view = renderHook(({ builder }) => useDashboardTheme(builder), { initialProps: { builder: first } })
  expect(subscriptions[0].subscribe).toHaveBeenCalledTimes(1)
  const initial = view.result.current
  act(() => first.dsl.set('meta', { ...first.build().meta, title: 'Renamed' }))
  view.rerender({ builder: first })
  expect(view.result.current).toBe(initial)
  act(() => first.theme.setTheme('brand', { tokens: brandTokens }))
  expect(view.result.current.theme.name).toBe('brand')
  expect(view.result.current.themeOptions.find(({ name }) => name === 'brand')?.colors).toEqual(brandTokens.colorScheme)
  act(() => first.theme.registerTheme('brand', { tokens: { ...brandTokens, textPrimary: '#ffff00' } }))
  expect(view.result.current.theme.config.token?.colorText).toBe('#ffff00')
  view.rerender({ builder: second })
  expect(subscriptions[0].unsubscribe).toHaveBeenCalledTimes(1)
  expect(subscriptions[1].subscribe).toHaveBeenCalledTimes(1)
  expect(view.result.current.theme.name).toBe('light')
  act(() => first.theme.setTheme('dark'))
  expect(view.result.current.theme.name).toBe('light')
  view.unmount()
  expect(subscriptions[1].unsubscribe).toHaveBeenCalledTimes(1)
})
