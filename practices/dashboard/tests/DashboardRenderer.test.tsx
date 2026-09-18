import { act, render, screen } from '@testing-library/react'
import { createVBI } from '@visactor/vbi'
import { expect, rs, test } from '@rstest/core'
import type { VBIChartBuilder } from '@visactor/vbi'
import { DashboardRenderer } from '../src'
import { observerCount, resize } from './resize'

const standardProps = rs.hoisted(() => rs.fn())
rs.mock('standard', () => ({
  APP: (props: { builder: VBIChartBuilder; mode: string; locale: string; theme: string }) => {
    standardProps(props)
    return (
      <div data-testid='standard' data-theme={props.theme} data-locale={props.locale} data-mode={props.mode}>
        {props.builder.getUUID()}
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

test('keeps two dashboards isolated and uses DSL theme by default', () => {
  const first = createChartDashboard()
  const secondVBI = createVBI()
  const second = secondVBI.dashboard.create({
    ...secondVBI.dashboard.createEmpty(),
    meta: { title: '第二个仪表盘', theme: 'dark' },
  })
  const view = render(
    <>
      <DashboardRenderer builder={first.builder} locale='en-US' />
      <DashboardRenderer builder={second} locale='ja-JP' />
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
