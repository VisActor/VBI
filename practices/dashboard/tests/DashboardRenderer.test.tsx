import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { createVBI } from '@visactor/vbi'
import { expect, rs, test } from '@rstest/core'
import type { VBIChartBuilder } from '@visactor/vbi'
import { DashboardRenderer } from '../src'
import { observerCount, resize } from './resize'

const standardProps = rs.hoisted(() => rs.fn())
rs.mock('standard', () => ({
  APP: (props: {
    builder: VBIChartBuilder
    mode: string
    locale: string
    theme: string
    hideLocale?: boolean
    hideTheme?: boolean
  }) => {
    standardProps(props)
    return (
      <div data-testid='standard' data-theme={props.theme} data-locale={props.locale} data-mode={props.mode}>
        {props.builder.getUUID()}
        {props.mode === 'edit' ? (
          <button onClick={() => props.builder.chartType.changeChartType('line')}>Change chart type</button>
        ) : null}
      </div>
    )
  },
}))

function createChartDashboard() {
  const vbi = createVBI()
  const chart = vbi.chart.create(vbi.chart.createEmpty('demo'))
  chart.chartType.changeChartType('bar')
  chart.dimensions.add('province', (dimension) => dimension.setAlias('省份'))
  chart.measures.add('sales', (measure) => measure.setAlias('销售额'))
  const builder = vbi.dashboard.create(vbi.dashboard.createEmpty())
  builder.chart.add((widget) =>
    widget
      .setChart(chart)
      .setTitle('销售图表')
      .setLayouts({ lg: { x: 0, y: 0, w: 8, h: 5 } }),
  )
  return { builder, chart }
}

test('renders dashboard metadata and follows independent insight updates', () => {
  const vbi = createVBI()
  const insight = vbi.insight.create({ content: '销售额领先' })
  const builder = vbi.dashboard.create({
    ...vbi.dashboard.createEmpty(),
    meta: { title: '销售仪表盘', description: '本月经营情况', theme: 'light' },
  })
  builder.insight.add((widget) => {
    widget
      .setInsightId(insight)
      .setTitle('关键洞察')
      .setLayouts({ lg: { x: 0, y: 0, w: 12, h: 3 } })
  })
  render(<DashboardRenderer builder={builder} />)
  expect(screen.getByRole('heading', { name: '销售仪表盘' })).toBeInTheDocument()
  expect(screen.getByText('本月经营情况')).toBeInTheDocument()
  expect(screen.getByText('销售额领先')).toBeInTheDocument()
  act(() => {
    insight.setContent('利润同步增长')
  })
  expect(screen.getByText('利润同步增长')).toBeInTheDocument()
})

test('uses container breakpoints, falls back to smaller layouts, and stacks on mobile', () => {
  const vbi = createVBI()
  const builder = vbi.dashboard.create(vbi.dashboard.createEmpty())
  builder.insight.add((widget) =>
    widget.setTitle('第一张卡片').setLayouts({
      lg: { x: 0, y: 0, w: 8, h: 5 },
      md: { x: 0, y: 0, w: 6, h: 3 },
    }),
  )
  builder.insight.add((widget) => widget.setTitle('第二张卡片').setLayouts({ lg: { x: 8, y: 0, w: 4, h: 5 } }))
  const view = render(<DashboardRenderer builder={builder} />)
  const grid = view.container.querySelector('[data-dashboard-grid]')!
  const cards = screen.getAllByRole('article')
  act(() => resize(grid, 1200))
  expect(grid).toHaveStyle({ gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' })
  expect(cards[1]).toHaveStyle({ gridColumn: '9 / span 4', gridRow: '1 / span 5' })
  act(() => resize(grid, 768))
  expect(grid).toHaveStyle({ gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' })
  expect(cards[1]).toHaveStyle({ gridColumn: '1 / span 6', gridRow: '4 / span 3' })
  act(() => resize(grid, 375))
  expect(grid).toHaveStyle({ gridTemplateColumns: 'repeat(1, minmax(0, 1fr))' })
  expect(cards[1]).toHaveStyle({ gridColumn: '1 / span 1', gridRow: '4 / span 3' })
  act(() => resize(grid, 992))
  expect(cards[1]).toHaveStyle({ gridColumn: '9 / span 4' })
})

test('uses the DSL breakpoint boundaries and column counts including an explicit mobile layout', () => {
  const vbi = createVBI()
  const builder = vbi.dashboard.create({
    ...vbi.dashboard.createEmpty(),
    breakpoints: { xxl: 1600, xl: 1200, lg: 900, md: 768, sm: 480, xs: 0 },
  })
  builder.insight.add((widget) =>
    widget.setTitle('Responsive').setLayouts({
      xxl: { x: 0, y: 0, w: 12, h: 3 },
      xl: { x: 0, y: 0, w: 12, h: 3 },
      lg: { x: 0, y: 0, w: 12, h: 3 },
      md: { x: 0, y: 0, w: 6, h: 3 },
      sm: { x: 0, y: 0, w: 4, h: 3 },
      xs: { x: 0, y: 0, w: 2, h: 3 },
    }),
  )
  const view = render(<DashboardRenderer builder={builder} />)
  const grid = view.container.querySelector('[data-dashboard-grid]')!
  for (const [width, columns] of [
    [0, 2],
    [479, 2],
    [480, 4],
    [767, 4],
    [768, 6],
    [899, 6],
    [900, 12],
    [1200, 12],
    [1600, 12],
  ]) {
    act(() => resize(grid, width))
    expect(grid).toHaveStyle({ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` })
  }
})

test('follows widget add, layout update and removal, with a visible missing-resource state', () => {
  const vbi = createVBI()
  const builder = vbi.dashboard.create(vbi.dashboard.createEmpty())
  const view = render(<DashboardRenderer builder={builder} />)
  expect(screen.getByText('暂无仪表盘内容')).toBeInTheDocument()
  act(() =>
    builder.chart.add((widget) =>
      widget
        .setChart('missing')
        .setTitle('未绑定图表')
        .setLayouts({ lg: { x: 0, y: 0, w: 6, h: 4 } }),
    ),
  )
  expect(screen.getByText('未找到引用的资源')).toBeInTheDocument()
  const id = builder.chart.toJSON()[0].id
  act(() => resize(view.container.querySelector('[data-dashboard-grid]')!, 1200))
  act(() =>
    builder.chart.update(id, (widget) => widget.setTitle('更新图表').setLayouts({ lg: { x: 3, y: 2, w: 9, h: 5 } })),
  )
  expect(screen.getByRole('article', { name: '更新图表' })).toHaveStyle({
    gridColumn: '4 / span 9',
    gridRow: '3 / span 5',
  })
  act(() => builder.chart.remove(id))
  expect(screen.queryByRole('article')).not.toBeInTheDocument()
  expect(screen.getByText('暂无仪表盘内容')).toBeInTheDocument()
})

test('keeps two dashboards isolated with external theme and locale', () => {
  const first = createChartDashboard()
  const secondVBI = createVBI()
  const second = secondVBI.dashboard.create({
    ...secondVBI.dashboard.createEmpty(),
    meta: { title: '第二个仪表盘', theme: 'dark' },
  })
  const view = render(
    <>
      <DashboardRenderer builder={first.builder} locale='en-US' />
      <DashboardRenderer builder={second} locale='ja-JP' theme='dark' />
    </>,
  )
  expect(screen.getByTestId('standard')).toBeInTheDocument()
  expect(view.container.querySelectorAll('section')[1]).toHaveAttribute('data-theme', 'dark')
  expect(screen.getByText('ダッシュボードにコンテンツがありません')).toBeInTheDocument()
  act(() => first.builder.chart.remove(first.builder.chart.toJSON()[0].id))
  expect(screen.getByText('No dashboard content yet')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '第二个仪表盘' })).toBeInTheDocument()
})

test('resolves the chart builder and passes it to Standard in view mode', () => {
  const first = createChartDashboard()
  const second = createChartDashboard()
  const original = first.chart.build()
  const count = observerCount()
  const view = render(<DashboardRenderer builder={first.builder} locale='en-US' theme='dark' />)
  expect(standardProps).toHaveBeenLastCalledWith(
    expect.objectContaining({
      builder: first.chart,
      mode: 'view',
      border: false,
      locale: 'en-US',
      theme: 'dark',
    }),
  )
  view.rerender(<DashboardRenderer builder={first.builder} locale='ja-JP' theme='light' />)
  expect(screen.getByTestId('standard')).toHaveAttribute('data-locale', 'ja-JP')
  expect(first.chart.build()).toEqual(original)
  view.rerender(<DashboardRenderer builder={second.builder} />)
  expect(standardProps).toHaveBeenLastCalledWith(expect.objectContaining({ builder: second.chart }))
  view.unmount()
  expect(observerCount()).toBe(count)
})

test('keeps preview read-only and opens the referenced chart in a fullscreen editor only when editing is enabled', async () => {
  const { builder, chart } = createChartDashboard()
  const original = builder.build()
  const view = render(<DashboardRenderer builder={builder} />)
  expect(screen.queryByRole('switch')).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: '编辑图表：销售图表' })).not.toBeInTheDocument()
  expect(screen.getByRole('button', { name: '进入全屏' })).toBeInTheDocument()

  view.rerender(<DashboardRenderer builder={builder} mode='edit' />)
  expect(screen.getByRole('switch', { name: '启用编辑' })).toBeChecked()
  fireEvent.click(screen.getByRole('button', { name: '编辑图表：销售图表' }))
  const editor = await screen.findByRole('dialog', { name: '编辑图表：销售图表' })
  expect(editor).toHaveClass('vbi-dashboard-chart-editor')
  expect(within(editor).getByTestId('standard')).toHaveAttribute('data-mode', 'edit')
  expect(standardProps).toHaveBeenCalledWith(
    expect.objectContaining({ builder: chart, hideLocale: true, hideTheme: true }),
  )
  fireEvent.click(within(editor).getByRole('button', { name: 'Change chart type' }))
  expect(chart.build().chartType).toBe('line')
  fireEvent.click(within(editor).getByRole('button', { name: '返回仪表盘' }))
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  fireEvent.click(screen.getByRole('switch', { name: '启用编辑' }))
  expect(screen.queryByRole('button', { name: '编辑图表：销售图表' })).not.toBeInTheDocument()
  expect(screen.getByTestId('standard')).toHaveAttribute('data-mode', 'view')
  expect(builder.build()).toEqual(original)
})

test('applies external locale and theme to the toolbar, previews and open editor without changing DSL', async () => {
  const { builder, chart } = createChartDashboard()
  const before = { chart: chart.build(), dashboard: builder.build() }
  const view = render(<DashboardRenderer builder={builder} mode='edit' />)
  fireEvent.click(screen.getByRole('button', { name: '编辑图表：销售图表' }))
  await screen.findByRole('dialog')
  view.rerender(<DashboardRenderer builder={builder} mode='edit' locale='en-US' theme='dark' />)
  expect(screen.getByRole('dialog', { name: 'Edit chart: 销售图表' })).toBeInTheDocument()
  for (const standard of screen.getAllByTestId('standard')) {
    expect(standard).toHaveAttribute('data-theme', 'dark')
    expect(standard).toHaveAttribute('data-locale', 'en-US')
  }
  expect(screen.getByRole('button', { name: 'Back to dashboard' })).toBeInTheDocument()
  expect(chart.build()).toEqual(before.chart)
  expect(builder.build()).toEqual(before.dashboard)
})

test('closes the editor when its widget is removed, the builder is replaced or mode becomes view', async () => {
  const first = createChartDashboard()
  const second = createChartDashboard()
  const view = render(<DashboardRenderer builder={first.builder} mode='edit' />)
  const open = async () => {
    fireEvent.click(screen.getByRole('button', { name: '编辑图表：销售图表' }))
    await screen.findByRole('dialog')
  }
  await open()
  act(() => first.builder.chart.remove(first.builder.chart.toJSON()[0].id))
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  view.rerender(<DashboardRenderer builder={second.builder} mode='edit' />)
  await open()
  view.rerender(<DashboardRenderer builder={first.builder} mode='edit' />)
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  view.rerender(<DashboardRenderer builder={second.builder} mode='edit' />)
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  await open()
  view.rerender(<DashboardRenderer builder={second.builder} mode='view' />)
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
})

test('isolates edit switches and does not offer editing for unresolved resources', () => {
  const first = createChartDashboard()
  const second = createChartDashboard()
  second.builder.chart.add((widget) =>
    widget
      .setChart('missing')
      .setTitle('Missing')
      .setLayouts({ lg: { x: 0, y: 6, w: 6, h: 4 } }),
  )
  render(
    <>
      <DashboardRenderer builder={first.builder} mode='edit' />
      <DashboardRenderer builder={second.builder} mode='edit' />
    </>,
  )
  fireEvent.click(screen.getAllByRole('switch')[0])
  expect(screen.getAllByRole('button', { name: '编辑图表：销售图表' })).toHaveLength(1)
  expect(screen.queryByRole('button', { name: '编辑图表：Missing' })).not.toBeInTheDocument()
})

test('uses only the external theme, even when dashboard metadata specifies a different theme', () => {
  const vbi = createVBI()
  const builder = vbi.dashboard.create({ ...vbi.dashboard.createEmpty(), meta: { title: 'Theme', theme: 'dark' } })
  const view = render(<DashboardRenderer builder={builder} />)
  expect(view.container.querySelector('section')).toHaveAttribute('data-theme', 'light')
  expect(builder.build().meta.theme).toBe('dark')
})

test('handles fullscreen failure, retry, browser exit and unmount without affecting another dashboard', async () => {
  const first = createChartDashboard()
  const second = createChartDashboard()
  const setFullscreen = (element: Element | null) => {
    Object.defineProperty(document, 'fullscreenElement', { configurable: true, value: element })
    document.dispatchEvent(new Event('fullscreenchange'))
  }
  const view = render(
    <>
      <DashboardRenderer builder={first.builder} />
      <DashboardRenderer builder={second.builder} />
    </>,
  )
  const [root, other] = view.container.querySelectorAll('section')
  root.requestFullscreen = rs
    .fn()
    .mockRejectedValueOnce(new Error('denied'))
    .mockImplementation(async () => setFullscreen(root))
  other.requestFullscreen = rs.fn().mockImplementation(async () => setFullscreen(other))
  const exit = rs.fn().mockImplementation(async () => setFullscreen(null))
  document.exitFullscreen = exit
  try {
    await act(async () => fireEvent.click(within(root).getByRole('button', { name: '进入全屏' })))
    expect(await screen.findByRole('alert')).toHaveTextContent('无法切换全屏，请重试')
    await act(async () => fireEvent.click(within(root).getByRole('button', { name: '进入全屏' })))
    await within(root).findByRole('button', { name: '退出全屏' })
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(within(other).getByRole('button', { name: '进入全屏' })).toBeInTheDocument()
    act(() => setFullscreen(null))
    expect(within(root).getByRole('button', { name: '进入全屏' })).toBeInTheDocument()
    await act(async () => fireEvent.click(within(other).getByRole('button', { name: '进入全屏' })))
    await within(other).findByRole('button', { name: '退出全屏' })
    await act(async () => fireEvent.click(within(other).getByRole('button', { name: '退出全屏' })))
    await waitFor(() => expect(exit).toHaveBeenCalledTimes(1))
    await act(async () => fireEvent.click(within(root).getByRole('button', { name: '进入全屏' })))
    await within(root).findByRole('button', { name: '退出全屏' })
    view.unmount()
    expect(exit).toHaveBeenCalledTimes(2)
  } finally {
    view.unmount()
    Reflect.deleteProperty(document, 'fullscreenElement')
    delete (document as Partial<Document>).exitFullscreen
  }
})

test('releases a fullscreen request that finishes after the dashboard unmounts', async () => {
  const { builder } = createChartDashboard()
  const view = render(<DashboardRenderer builder={builder} />)
  const root = view.container.querySelector('section')!
  let complete: () => void = () => {}
  root.requestFullscreen = () =>
    new Promise<void>((resolve) => {
      complete = resolve
    })
  const exit = rs.fn().mockResolvedValue(undefined)
  document.exitFullscreen = exit
  try {
    fireEvent.click(screen.getByRole('button', { name: '进入全屏' }))
    view.unmount()
    Object.defineProperty(document, 'fullscreenElement', { configurable: true, value: root })
    await act(async () => complete())
    expect(exit).toHaveBeenCalledTimes(1)
  } finally {
    view.unmount()
    Reflect.deleteProperty(document, 'fullscreenElement')
    delete (document as Partial<Document>).exitFullscreen
  }
})
