import { afterEach, expect, rs, test } from '@rstest/core'
import { cleanup, render, screen } from '@testing-library/react'
import { createVBI } from '@visactor/vbi'
import type { VSeed } from '@visactor/vseed'
import { theme } from 'antd'
import { APP } from 'src/App'

rs.mock('src/components/Render', () => ({
  VSeedRender: ({ vseed }: { vseed: VSeed }) => {
    const { token } = theme.useToken()
    return (
      <div
        data-testid='chart'
        data-theme={vseed.theme}
        style={{ color: token.colorText, fontFamily: token.fontFamily }}
      />
    )
  },
}))
afterEach(() => {
  cleanup()
  rs.unstubAllGlobals()
})

test('keeps brand chart themes and UI tokens across preview and editing without querying again', async () => {
  rs.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  )
  const vbi = createVBI()
  const query = rs.fn(async () => ({ dataset: [] }))
  vbi.connectors.register('theme-test', async () => ({
    discoverSchema: async () => [{ name: 'sales', type: 'number' }],
    query,
  }))
  const builder = vbi.chart.create(vbi.chart.createEmpty('theme-test'))
  builder.measures.add('sales', (node) => node.setAggregate({ func: 'sum' }))
  const original = builder.build()
  const props = {
    builder,
    theme: 'dark' as const,
    chartTheme: 'brand-dark',
    themeToken: { colorText: '#edfdf5', colorPrimary: '#22c55e', fontFamily: 'Georgia, serif' },
    hideLocale: true,
    hideTheme: true,
  }
  const view = render(<APP {...props} mode='view' />)
  expect(await screen.findByTestId('chart')).toHaveAttribute('data-theme', 'brand-dark')
  expect(screen.getByTestId('chart')).toHaveStyle({ color: '#edfdf5', fontFamily: 'Georgia, serif' })
  view.rerender(<APP {...props} mode='edit' />)
  expect(await screen.findByPlaceholderText('搜索')).toBeInTheDocument()
  expect(screen.getByTestId('chart')).toHaveAttribute('data-theme', 'brand-dark')
  expect(screen.getByTestId('chart')).toHaveStyle({ color: '#edfdf5', fontFamily: 'Georgia, serif' })
  view.rerender(
    <APP {...props} mode='edit' theme='light' chartTheme='brand-light' themeToken={{ colorText: '#14261e' }} />,
  )
  expect(screen.getByTestId('chart')).toHaveAttribute('data-theme', 'brand-light')
  expect(screen.getByTestId('chart')).toHaveStyle({ color: '#14261e' })
  expect(query).toHaveBeenCalledTimes(1)
  expect(builder.build()).toEqual(original)
})
