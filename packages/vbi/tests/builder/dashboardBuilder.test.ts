import * as root from '@visactor/vbi'
import { VBI } from '@visactor/vbi'

describe('VBIDashboardBuilder', () => {
  test('addChart and addInsight create typed widgets with auto ids and layouts', () => {
    const dashboardBuilder = VBI.dashboard.create(VBI.dashboard.createEmpty())

    dashboardBuilder
      .addChart((chart) =>
        chart.setTitle('Sales').setLayouts({
          lg: { id: 'l-1', x: 4, y: 0, w: 4, h: 3 },
        }),
      )
      .addInsight((insight) =>
        insight.setTitle('Summary').setLayouts({
          lg: { id: 'l-2', x: 0, y: 3, w: 8, h: 2 },
        }),
      )

    expect(dashboardBuilder.build()).toEqual({
      uuid: 'uuid-1',
      type: 'dashboard',
      version: 1,
      meta: { title: '' },
      widgets: [
        {
          id: 'id-1',
          type: 'chart',
          chartId: 'uuid-2',
          title: 'Sales',
        },
        {
          id: 'id-2',
          type: 'insight',
          insightId: 'uuid-3',
          title: 'Summary',
        },
      ],
      layout: {
        breakpoints: {
          xxl: 1600,
          xl: 1200,
          lg: 992,
          md: 768,
          sm: 576,
          xs: 0,
        },
        layouts: {
          lg: [
            {
              id: 'l-1',
              widgetId: 'id-1',
              x: 4,
              y: 0,
              w: 4,
              h: 3,
              static: true,
            },
            {
              id: 'l-2',
              widgetId: 'id-2',
              x: 0,
              y: 3,
              w: 8,
              h: 2,
              static: true,
            },
          ],
        },
      },
    })
  })

  test('addChart/addInsight require layouts.lg when adding', () => {
    const dashboardBuilder = VBI.dashboard.create(VBI.dashboard.createEmpty())

    expect(() => dashboardBuilder.addChart((chart) => chart.setTitle('No layout'))).toThrow(
      'Dashboard chart requires layouts.lg when adding',
    )
    expect(() => dashboardBuilder.addInsight((insight) => insight.setTitle('No layout'))).toThrow(
      'Dashboard insight requires layouts.lg when adding',
    )

    expect(dashboardBuilder.findAllCharts()).toHaveLength(0)
    expect(dashboardBuilder.findAllInsights()).toHaveLength(0)
    expect(dashboardBuilder.isEmpty()).toBe(true)
  })

  test('typed collections and top-level CRUD wrappers are consistent', () => {
    const dashboardBuilder = VBI.dashboard.create(VBI.dashboard.createEmpty())

    dashboardBuilder.chart.add((chart) =>
      chart
        .setTitle('Sales')
        .setLayouts({
          lg: { id: 'l-1', x: 0, y: 0, w: 6, h: 4 },
        })
        .setChartId('chart-1'),
    )

    dashboardBuilder.insight.add((insight) =>
      insight
        .setTitle('Summary')
        .setLayouts({
          lg: { id: 'l-2', x: 6, y: 0, w: 6, h: 4 },
        })
        .setInsightId('insight-1'),
    )

    const chartId = dashboardBuilder.findAllCharts()[0].getId()
    const insightId = dashboardBuilder.findAllInsights()[0].getId()

    dashboardBuilder.updateChart(chartId, (chart) => {
      chart
        .setTitle('Revenue')
        .setDescription('Quarterly summary')
        .setChartId('chart-2')
        .setLayouts({
          md: { id: 'm-1', x: 0, y: 4, w: 12, h: 3 },
        })
    })

    dashboardBuilder.updateInsight(insightId, (insight) => {
      insight
        .setTitle('Highlights')
        .setDescription('Top takeaways')
        .setInsightId('insight-2')
        .setLayouts({
          md: { id: 'm-2', x: 0, y: 7, w: 12, h: 2 },
        })
    })

    expect(dashboardBuilder.getChart(chartId)?.toJSON()).toMatchObject({
      id: chartId,
      type: 'chart',
      title: 'Revenue',
      description: 'Quarterly summary',
      chartId: 'chart-2',
    })

    expect(dashboardBuilder.chart.toJSON()).toMatchObject([
      {
        id: chartId,
        type: 'chart',
        chartId: 'chart-2',
      },
    ])

    expect(dashboardBuilder.getInsight(insightId)?.toJSON()).toMatchObject({
      id: insightId,
      type: 'insight',
      title: 'Highlights',
      description: 'Top takeaways',
      insightId: 'insight-2',
    })

    expect(dashboardBuilder.insight.toJSON()).toMatchObject([
      {
        id: insightId,
        type: 'insight',
        insightId: 'insight-2',
      },
    ])

    expect(dashboardBuilder.build().layout.layouts.md).toMatchObject([
      {
        id: 'm-1',
        widgetId: chartId,
      },
      {
        id: 'm-2',
        widgetId: insightId,
      },
    ])

    dashboardBuilder.removeChart(chartId)
    expect(dashboardBuilder.getChart(chartId)).toBeUndefined()
    expect(dashboardBuilder.findAllCharts()).toHaveLength(0)

    dashboardBuilder.removeInsight(insightId)
    expect(dashboardBuilder.getInsight(insightId)).toBeUndefined()
    expect(dashboardBuilder.findAllInsights()).toHaveLength(0)
    expect(dashboardBuilder.isEmpty()).toBe(true)
  })

  test('dashboard builders sync through YJS updates', () => {
    const b1 = VBI.dashboard.create(VBI.dashboard.createEmpty())
    const b2 = VBI.dashboard.create(VBI.dashboard.createEmpty())

    b2.applyUpdate(b1.encodeStateAsUpdate())
    b1.applyUpdate(b2.encodeStateAsUpdate())

    b1.addChart((chart) =>
      chart.setTitle('Sales').setLayouts({
        lg: { id: 'l-1', x: 0, y: 0, w: 8, h: 4 },
      }),
    )

    b2.applyUpdate(b1.encodeStateAsUpdate())

    expect(b2.build()).toEqual(b1.build())
  })

  test('root exports include typed dashboard builders and remove widget collection builder', () => {
    expect(root.VBIDashboardBuilder).toBeDefined()
    expect(root.DashboardMetaBuilder).toBeDefined()
    expect(root.DashboardChartBuilder).toBeDefined()
    expect(root.DashboardChartCollectionBuilder).toBeDefined()
    expect(root.DashboardInsightBuilder).toBeDefined()
    expect(root.DashboardInsightCollectionBuilder).toBeDefined()
    expect((root as Record<string, unknown>).DashboardWidgetCollectionBuilder).toBeUndefined()
  })
})
