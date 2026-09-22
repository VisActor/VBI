import { rs } from '@rstest/core'
import { createVBI } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

const MOCK_SYSTEM_TIME = new Date('2026-03-23T00:00:00.000Z')

describe('dashboard / DashboardTheme', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })

  it('light-dashboard-theme', async () => {
    const LocalVBI = createVBI()
    const chartBuilder = LocalVBI.chart.create(LocalVBI.chart.createEmpty('demoSupermarket'))
    chartBuilder.chartType.changeChartType('column')
    chartBuilder.dimensions.add('product_type', (node) => node.setAlias('商品品类'))
    chartBuilder.measures.add('sales', (node) => node.setAlias('销售额').setAggregate({ func: 'sum' }))

    const insightBuilder = LocalVBI.insight.create(LocalVBI.insight.createEmpty())
    insightBuilder.setContent('按品类比较销售贡献，结合利润质量制定下一步经营计划。')

    const dashboardBuilder = LocalVBI.dashboard.create({
      ...LocalVBI.dashboard.createEmpty(),
      meta: { title: '浅色经营看板', description: '品类表现 / 销售贡献与经营观察' },
    })
    dashboardBuilder.theme.setTheme('light')

    dashboardBuilder.chart.add((widget) =>
      widget
        .setChart(chartBuilder)
        .setTitle('品类销售额')
        .setLayouts({ lg: { x: 0, y: 0, w: 8, h: 5 }, md: { x: 0, y: 0, w: 6, h: 5 } }),
    )
    dashboardBuilder.insight.add((widget) =>
      widget
        .setInsightId(insightBuilder)
        .setTitle('经营观察')
        .setLayouts({ lg: { x: 8, y: 0, w: 4, h: 5 }, md: { x: 0, y: 5, w: 6, h: 3 } }),
    )

    const dashboardDSL = dashboardBuilder.build()
    expect(dashboardDSL).toMatchInlineSnapshot(`
      {
        "breakpoints": {
          "lg": 992,
          "md": 768,
          "sm": 576,
          "xl": 1200,
          "xs": 0,
          "xxl": 1600,
        },
        "layout": {
          "lg": [
            {
              "h": 5,
              "id": "id-5",
              "w": 8,
              "widgetId": "id-3",
              "x": 0,
              "y": 0,
            },
            {
              "h": 5,
              "id": "id-9",
              "w": 4,
              "widgetId": "id-7",
              "x": 8,
              "y": 0,
            },
          ],
          "md": [
            {
              "h": 5,
              "id": "id-6",
              "w": 6,
              "widgetId": "id-3",
              "x": 0,
              "y": 0,
            },
            {
              "h": 3,
              "id": "id-10",
              "w": 6,
              "widgetId": "id-7",
              "x": 0,
              "y": 5,
            },
          ],
          "sm": [],
          "xl": [],
          "xs": [],
          "xxl": [],
        },
        "meta": {
          "description": "品类表现 / 销售贡献与经营观察",
          "theme": "light",
          "title": "浅色经营看板",
        },
        "uuid": "uuid-3",
        "version": 0,
        "widgets": [
          {
            "chartId": "uuid-1",
            "description": "",
            "id": "id-3",
            "title": "品类销售额",
            "type": "chart",
          },
          {
            "description": "",
            "id": "id-7",
            "insightId": "uuid-2",
            "title": "经营观察",
            "type": "insight",
          },
        ],
      }
    `)
  })

  it('dark-dashboard-theme', async () => {
    const LocalVBI = createVBI()
    const chartBuilder = LocalVBI.chart.create(LocalVBI.chart.createEmpty('demoSupermarket'))
    chartBuilder.chartType.changeChartType('column')
    chartBuilder.dimensions.add('product_type', (node) => node.setAlias('商品品类'))
    chartBuilder.measures.add('sales', (node) => node.setAlias('销售额').setAggregate({ func: 'sum' }))

    const insightBuilder = LocalVBI.insight.create(LocalVBI.insight.createEmpty())
    insightBuilder.setContent('按品类比较销售贡献，结合利润质量制定下一步经营计划。')

    const dashboardBuilder = LocalVBI.dashboard.create({
      ...LocalVBI.dashboard.createEmpty(),
      meta: { title: '深色经营看板', description: '品类表现 / 销售贡献与经营观察' },
    })
    dashboardBuilder.theme.setTheme('dark')

    dashboardBuilder.chart.add((widget) =>
      widget
        .setChart(chartBuilder)
        .setTitle('品类销售额')
        .setLayouts({ lg: { x: 0, y: 0, w: 8, h: 5 }, md: { x: 0, y: 0, w: 6, h: 5 } }),
    )
    dashboardBuilder.insight.add((widget) =>
      widget
        .setInsightId(insightBuilder)
        .setTitle('经营观察')
        .setLayouts({ lg: { x: 8, y: 0, w: 4, h: 5 }, md: { x: 0, y: 5, w: 6, h: 3 } }),
    )

    const dashboardDSL = dashboardBuilder.build()
    expect(dashboardDSL).toMatchInlineSnapshot(`
      {
        "breakpoints": {
          "lg": 992,
          "md": 768,
          "sm": 576,
          "xl": 1200,
          "xs": 0,
          "xxl": 1600,
        },
        "layout": {
          "lg": [
            {
              "h": 5,
              "id": "id-5",
              "w": 8,
              "widgetId": "id-3",
              "x": 0,
              "y": 0,
            },
            {
              "h": 5,
              "id": "id-9",
              "w": 4,
              "widgetId": "id-7",
              "x": 8,
              "y": 0,
            },
          ],
          "md": [
            {
              "h": 5,
              "id": "id-6",
              "w": 6,
              "widgetId": "id-3",
              "x": 0,
              "y": 0,
            },
            {
              "h": 3,
              "id": "id-10",
              "w": 6,
              "widgetId": "id-7",
              "x": 0,
              "y": 5,
            },
          ],
          "sm": [],
          "xl": [],
          "xs": [],
          "xxl": [],
        },
        "meta": {
          "description": "品类表现 / 销售贡献与经营观察",
          "theme": "dark",
          "title": "深色经营看板",
        },
        "uuid": "uuid-3",
        "version": 0,
        "widgets": [
          {
            "chartId": "uuid-1",
            "description": "",
            "id": "id-3",
            "title": "品类销售额",
            "type": "chart",
          },
          {
            "description": "",
            "id": "id-7",
            "insightId": "uuid-2",
            "title": "经营观察",
            "type": "insight",
          },
        ],
      }
    `)
  })

  it('brand-dashboard-theme', async () => {
    const LocalVBI = createVBI()
    const chartBuilder = LocalVBI.chart.create(LocalVBI.chart.createEmpty('demoSupermarket'))
    chartBuilder.chartType.changeChartType('column')
    chartBuilder.dimensions.add('product_type', (node) => node.setAlias('商品品类'))
    chartBuilder.measures.add('sales', (node) => node.setAlias('销售额').setAggregate({ func: 'sum' }))

    const insightBuilder = LocalVBI.insight.create(LocalVBI.insight.createEmpty())
    insightBuilder.setContent('按品类比较销售贡献，结合利润质量制定下一步经营计划。')

    const dashboardBuilder = LocalVBI.dashboard.create({
      ...LocalVBI.dashboard.createEmpty(),
      meta: { title: '翡翠绿经营看板', description: '品类表现 / 销售贡献与经营观察' },
    })
    dashboardBuilder.theme.setTheme('retail-emerald')

    dashboardBuilder.chart.add((widget) =>
      widget
        .setChart(chartBuilder)
        .setTitle('品类销售额')
        .setLayouts({ lg: { x: 0, y: 0, w: 8, h: 5 }, md: { x: 0, y: 0, w: 6, h: 5 } }),
    )
    dashboardBuilder.insight.add((widget) =>
      widget
        .setInsightId(insightBuilder)
        .setTitle('经营观察')
        .setLayouts({ lg: { x: 8, y: 0, w: 4, h: 5 }, md: { x: 0, y: 5, w: 6, h: 3 } }),
    )

    const dashboardDSL = dashboardBuilder.build()
    expect(dashboardDSL).toMatchInlineSnapshot(`
      {
        "breakpoints": {
          "lg": 992,
          "md": 768,
          "sm": 576,
          "xl": 1200,
          "xs": 0,
          "xxl": 1600,
        },
        "layout": {
          "lg": [
            {
              "h": 5,
              "id": "id-5",
              "w": 8,
              "widgetId": "id-3",
              "x": 0,
              "y": 0,
            },
            {
              "h": 5,
              "id": "id-9",
              "w": 4,
              "widgetId": "id-7",
              "x": 8,
              "y": 0,
            },
          ],
          "md": [
            {
              "h": 5,
              "id": "id-6",
              "w": 6,
              "widgetId": "id-3",
              "x": 0,
              "y": 0,
            },
            {
              "h": 3,
              "id": "id-10",
              "w": 6,
              "widgetId": "id-7",
              "x": 0,
              "y": 5,
            },
          ],
          "sm": [],
          "xl": [],
          "xs": [],
          "xxl": [],
        },
        "meta": {
          "description": "品类表现 / 销售贡献与经营观察",
          "theme": "retail-emerald",
          "title": "翡翠绿经营看板",
        },
        "uuid": "uuid-3",
        "version": 0,
        "widgets": [
          {
            "chartId": "uuid-1",
            "description": "",
            "id": "id-3",
            "title": "品类销售额",
            "type": "chart",
          },
          {
            "description": "",
            "id": "id-7",
            "insightId": "uuid-2",
            "title": "经营观察",
            "type": "insight",
          },
        ],
      }
    `)
  })
})
