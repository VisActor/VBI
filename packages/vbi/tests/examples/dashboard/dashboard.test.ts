import { rs } from '@rstest/core'
import { createVBI } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

const MOCK_SYSTEM_TIME = new Date('2026-03-23T00:00:00.000Z')

describe('Dashboard', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })

  it('retail-operations-dashboard', async () => {
    const LocalVBI = createVBI()
    // 所有图表与洞察注册在同一个 VBI 实例中，数据来自 supermarket 演示连接器。
    const createChart = (chartType: string) => {
      const chart = LocalVBI.chart.create(LocalVBI.chart.createEmpty('demoSupermarket'))
      chart.chartType.changeChartType(chartType)
      return chart
    }

    const totals = createChart('table')
    totals.measures.add('sales', (node) => node.setAlias('销售额').setAggregate({ func: 'sum' }))
    totals.measures.add('profit', (node) => node.setAlias('利润').setAggregate({ func: 'sum' }))
    totals.measures.add('order_id', (node) => node.setAlias('订单数').setAggregate({ func: 'countDistinct' }))
    totals.measures.add('customer_id', (node) => node.setAlias('客户数').setAggregate({ func: 'countDistinct' }))
    totals.measures.add('amount', (node) => node.setAlias('销售件数').setAggregate({ func: 'sum' }))

    const salesSummary = LocalVBI.insight.create(LocalVBI.insight.createEmpty())
    const customerSummary = LocalVBI.insight.create(LocalVBI.insight.createEmpty())
    const actions = LocalVBI.insight.create(LocalVBI.insight.createEmpty())
    actions.setContent(
      '01  区域经营：结合销售排行与利润表现，优先跟进高贡献区域。\n\n02  客户维护：对高销售客户检查利润质量，制定分层回访计划。\n\n03  履约复盘：按配送方式观察订单分布，结合服务成本调整资源。',
    )

    const categoryShare = createChart('donut')
    categoryShare.dimensions.add('product_type', (node) => node.setAlias('品类'))
    categoryShare.measures.add('sales', (node) => node.setAlias('销售额').setAggregate({ func: 'sum' }))

    const customerShare = createChart('donut')
    customerShare.dimensions.add('customer_type', (node) => node.setAlias('客群'))
    customerShare.measures.add('sales', (node) => node.setAlias('销售额').setAggregate({ func: 'sum' }))

    const monthlyTrend = createChart('dualAxis')
    monthlyTrend.dimensions.add('order_date', (node) =>
      node.setAlias('月份').setAggregate({ func: 'toMonth' }).setSort({ order: 'asc' }),
    )
    monthlyTrend.measures.add('sales', (node) =>
      node.setAlias('销售额').setEncoding('primaryYAxis').setAggregate({ func: 'sum' }),
    )
    monthlyTrend.measures.add('profit', (node) =>
      node.setAlias('利润').setEncoding('secondaryYAxis').setAggregate({ func: 'sum' }),
    )
    monthlyTrend.limit.setLimit(12)

    const provinceRanking = createChart('bar')
    provinceRanking.dimensions.add('province', (node) => node.setAlias('省份'))
    provinceRanking.measures.add('sales', (node) =>
      node.setAlias('销售额').setAggregate({ func: 'sum' }).setSort({ order: 'desc' }),
    )
    provinceRanking.limit.setLimit(6)

    const categoryProfit = createChart('column')
    categoryProfit.dimensions.add('product_type', (node) => node.setAlias('品类'))
    categoryProfit.measures.add('profit', (node) => node.setAlias('利润').setAggregate({ func: 'sum' }))

    const deliveryOrders = createChart('column')
    deliveryOrders.dimensions.add('delivery_method', (node) => node.setAlias('配送方式'))
    deliveryOrders.measures.add('order_id', (node) => node.setAlias('订单数').setAggregate({ func: 'countDistinct' }))

    const topCustomers = createChart('table')
    topCustomers.dimensions.add('customer_name', (node) => node.setAlias('客户'))
    topCustomers.measures.add('sales', (node) =>
      node.setAlias('销售额').setAggregate({ func: 'sum' }).setSort({ order: 'desc' }).setFormat({ autoFormat: true }),
    )
    topCustomers.measures.add('profit', (node) =>
      node.setAlias('利润').setAggregate({ func: 'sum' }).setFormat({ autoFormat: true }),
    )
    topCustomers.limit.setLimit(6)

    const dashboardBuilder = LocalVBI.dashboard.create({
      ...LocalVBI.dashboard.createEmpty(),
      // 断点基于仪表盘内容宽度；400px 起让文档预览也能并排展示卡片。
      breakpoints: { xxl: 1600, xl: 1200, lg: 960, md: 640, sm: 400, xs: 0 },
      meta: {
        title: '零售运营全景',
        description: 'RETAIL OPERATIONS / 演示数据全量汇总 · 趋势展示最早 12 个月',
      },
    })

    // 摘要也来自真实查询，通过 Insight Builder 保存显示文本。
    const summary = await totals.buildVSeed()
    const readTotal = (field: string) => {
      const id = totals.measures.find((node) => node.getField() === field)?.getId()
      return id ? Number(summary.dataset[0]?.[id] ?? 0) : 0
    }
    const sales = readTotal('sales')
    const profit = readTotal('profit')
    salesSummary.setContent(
      [
        `销售额  ¥${(sales / 10000).toFixed(2)} 万`,
        `利润  ¥${(profit / 10000).toFixed(2)} 万`,
        `利润率  ${sales ? ((profit / sales) * 100).toFixed(1) : '0.0'}%`,
      ].join('\n\n'),
    )
    customerSummary.setContent(
      [
        `订单  ${readTotal('order_id').toFixed(0)} 单`,
        `客户  ${readTotal('customer_id').toFixed(0)} 位`,
        `销量  ${readTotal('amount').toFixed(0)} 件`,
      ].join('\n\n'),
    )

    dashboardBuilder.insight.add((widget) => {
      widget
        .setInsightId(salesSummary)
        .setTitle('经营快照')
        .setDescription('全量销售与利润')
        .setLayouts({
          lg: { x: 0, y: 0, w: 3, h: 4 },
          md: { x: 0, y: 0, w: 3, h: 3 },
          sm: { x: 0, y: 0, w: 2, h: 3 },
          xs: { x: 0, y: 0, w: 2, h: 3 },
        })
    })

    dashboardBuilder.insight.add((widget) => {
      widget
        .setInsightId(customerSummary)
        .setTitle('客户与订单')
        .setDescription('去重客户与订单统计')
        .setLayouts({
          lg: { x: 3, y: 0, w: 3, h: 4 },
          md: { x: 3, y: 0, w: 3, h: 3 },
          sm: { x: 2, y: 0, w: 2, h: 3 },
          xs: { x: 0, y: 3, w: 2, h: 3 },
        })
    })

    dashboardBuilder.chart.add((widget) => {
      widget
        .setChart(categoryShare)
        .setTitle('品类销售占比')
        .setLayouts({
          lg: { x: 6, y: 0, w: 3, h: 4 },
          md: { x: 0, y: 3, w: 3, h: 4 },
          sm: { x: 0, y: 3, w: 4, h: 4 },
          xs: { x: 0, y: 6, w: 2, h: 4 },
        })
    })

    dashboardBuilder.chart.add((widget) => {
      widget
        .setChart(customerShare)
        .setTitle('客群销售占比')
        .setLayouts({
          lg: { x: 9, y: 0, w: 3, h: 4 },
          md: { x: 3, y: 3, w: 3, h: 4 },
          sm: { x: 0, y: 7, w: 4, h: 4 },
          xs: { x: 0, y: 10, w: 2, h: 4 },
        })
    })

    dashboardBuilder.chart.add((widget) => {
      widget
        .setChart(monthlyTrend)
        .setTitle('销售与利润趋势')
        .setDescription('月度双轴对比 · 最早 12 个月')
        .setLayouts({
          lg: { x: 0, y: 4, w: 8, h: 5 },
          md: { x: 0, y: 7, w: 6, h: 5 },
          sm: { x: 0, y: 11, w: 4, h: 5 },
          xs: { x: 0, y: 14, w: 2, h: 5 },
        })
    })

    dashboardBuilder.chart.add((widget) => {
      widget
        .setChart(provinceRanking)
        .setTitle('省份销售 TOP 6')
        .setDescription('按销售额降序排列')
        .setLayouts({
          lg: { x: 8, y: 4, w: 4, h: 5 },
          md: { x: 0, y: 12, w: 3, h: 5 },
          sm: { x: 0, y: 16, w: 4, h: 5 },
          xs: { x: 0, y: 19, w: 2, h: 5 },
        })
    })

    dashboardBuilder.chart.add((widget) => {
      widget
        .setChart(categoryProfit)
        .setTitle('品类利润')
        .setLayouts({
          lg: { x: 0, y: 9, w: 4, h: 5 },
          md: { x: 3, y: 12, w: 3, h: 5 },
          sm: { x: 0, y: 21, w: 4, h: 5 },
          xs: { x: 0, y: 24, w: 2, h: 5 },
        })
    })

    dashboardBuilder.chart.add((widget) => {
      widget
        .setChart(deliveryOrders)
        .setTitle('配送订单分布')
        .setLayouts({
          lg: { x: 4, y: 9, w: 4, h: 5 },
          md: { x: 0, y: 17, w: 3, h: 5 },
          sm: { x: 0, y: 26, w: 4, h: 5 },
          xs: { x: 0, y: 29, w: 2, h: 5 },
        })
    })

    dashboardBuilder.chart.add((widget) => {
      widget
        .setChart(topCustomers)
        .setTitle('重点客户 TOP 6')
        .setDescription('销售额与利润明细')
        .setLayouts({
          lg: { x: 8, y: 9, w: 4, h: 5 },
          md: { x: 3, y: 17, w: 3, h: 5 },
          sm: { x: 0, y: 31, w: 4, h: 5 },
          xs: { x: 0, y: 34, w: 2, h: 5 },
        })
    })

    dashboardBuilder.insight.add((widget) => {
      widget
        .setInsightId(actions)
        .setTitle('经营观察与行动')
        .setDescription('结合趋势、结构与明细制定下一步计划')
        .setLayouts({
          lg: { x: 0, y: 14, w: 12, h: 3 },
          md: { x: 0, y: 22, w: 6, h: 4 },
          sm: { x: 0, y: 36, w: 4, h: 4 },
          xs: { x: 0, y: 39, w: 2, h: 4 },
        })
    })

    const dashboardDSL = dashboardBuilder.build()
    expect(dashboardDSL).toMatchInlineSnapshot(`
      {
        "breakpoints": {
          "lg": 960,
          "md": 640,
          "sm": 400,
          "xl": 1200,
          "xs": 0,
          "xxl": 1600,
        },
        "layout": {
          "lg": [
            {
              "h": 4,
              "id": "id-24",
              "w": 3,
              "widgetId": "id-22",
              "x": 0,
              "y": 0,
            },
            {
              "h": 4,
              "id": "id-30",
              "w": 3,
              "widgetId": "id-28",
              "x": 3,
              "y": 0,
            },
            {
              "h": 4,
              "id": "id-36",
              "w": 3,
              "widgetId": "id-34",
              "x": 6,
              "y": 0,
            },
            {
              "h": 4,
              "id": "id-42",
              "w": 3,
              "widgetId": "id-40",
              "x": 9,
              "y": 0,
            },
            {
              "h": 5,
              "id": "id-48",
              "w": 8,
              "widgetId": "id-46",
              "x": 0,
              "y": 4,
            },
            {
              "h": 5,
              "id": "id-54",
              "w": 4,
              "widgetId": "id-52",
              "x": 8,
              "y": 4,
            },
            {
              "h": 5,
              "id": "id-60",
              "w": 4,
              "widgetId": "id-58",
              "x": 0,
              "y": 9,
            },
            {
              "h": 5,
              "id": "id-66",
              "w": 4,
              "widgetId": "id-64",
              "x": 4,
              "y": 9,
            },
            {
              "h": 5,
              "id": "id-72",
              "w": 4,
              "widgetId": "id-70",
              "x": 8,
              "y": 9,
            },
            {
              "h": 3,
              "id": "id-78",
              "w": 12,
              "widgetId": "id-76",
              "x": 0,
              "y": 14,
            },
          ],
          "md": [
            {
              "h": 3,
              "id": "id-25",
              "w": 3,
              "widgetId": "id-22",
              "x": 0,
              "y": 0,
            },
            {
              "h": 3,
              "id": "id-31",
              "w": 3,
              "widgetId": "id-28",
              "x": 3,
              "y": 0,
            },
            {
              "h": 4,
              "id": "id-37",
              "w": 3,
              "widgetId": "id-34",
              "x": 0,
              "y": 3,
            },
            {
              "h": 4,
              "id": "id-43",
              "w": 3,
              "widgetId": "id-40",
              "x": 3,
              "y": 3,
            },
            {
              "h": 5,
              "id": "id-49",
              "w": 6,
              "widgetId": "id-46",
              "x": 0,
              "y": 7,
            },
            {
              "h": 5,
              "id": "id-55",
              "w": 3,
              "widgetId": "id-52",
              "x": 0,
              "y": 12,
            },
            {
              "h": 5,
              "id": "id-61",
              "w": 3,
              "widgetId": "id-58",
              "x": 3,
              "y": 12,
            },
            {
              "h": 5,
              "id": "id-67",
              "w": 3,
              "widgetId": "id-64",
              "x": 0,
              "y": 17,
            },
            {
              "h": 5,
              "id": "id-73",
              "w": 3,
              "widgetId": "id-70",
              "x": 3,
              "y": 17,
            },
            {
              "h": 4,
              "id": "id-79",
              "w": 6,
              "widgetId": "id-76",
              "x": 0,
              "y": 22,
            },
          ],
          "sm": [
            {
              "h": 3,
              "id": "id-26",
              "w": 2,
              "widgetId": "id-22",
              "x": 0,
              "y": 0,
            },
            {
              "h": 3,
              "id": "id-32",
              "w": 2,
              "widgetId": "id-28",
              "x": 2,
              "y": 0,
            },
            {
              "h": 4,
              "id": "id-38",
              "w": 4,
              "widgetId": "id-34",
              "x": 0,
              "y": 3,
            },
            {
              "h": 4,
              "id": "id-44",
              "w": 4,
              "widgetId": "id-40",
              "x": 0,
              "y": 7,
            },
            {
              "h": 5,
              "id": "id-50",
              "w": 4,
              "widgetId": "id-46",
              "x": 0,
              "y": 11,
            },
            {
              "h": 5,
              "id": "id-56",
              "w": 4,
              "widgetId": "id-52",
              "x": 0,
              "y": 16,
            },
            {
              "h": 5,
              "id": "id-62",
              "w": 4,
              "widgetId": "id-58",
              "x": 0,
              "y": 21,
            },
            {
              "h": 5,
              "id": "id-68",
              "w": 4,
              "widgetId": "id-64",
              "x": 0,
              "y": 26,
            },
            {
              "h": 5,
              "id": "id-74",
              "w": 4,
              "widgetId": "id-70",
              "x": 0,
              "y": 31,
            },
            {
              "h": 4,
              "id": "id-80",
              "w": 4,
              "widgetId": "id-76",
              "x": 0,
              "y": 36,
            },
          ],
          "xl": [],
          "xs": [
            {
              "h": 3,
              "id": "id-27",
              "w": 2,
              "widgetId": "id-22",
              "x": 0,
              "y": 0,
            },
            {
              "h": 3,
              "id": "id-33",
              "w": 2,
              "widgetId": "id-28",
              "x": 0,
              "y": 3,
            },
            {
              "h": 4,
              "id": "id-39",
              "w": 2,
              "widgetId": "id-34",
              "x": 0,
              "y": 6,
            },
            {
              "h": 4,
              "id": "id-45",
              "w": 2,
              "widgetId": "id-40",
              "x": 0,
              "y": 10,
            },
            {
              "h": 5,
              "id": "id-51",
              "w": 2,
              "widgetId": "id-46",
              "x": 0,
              "y": 14,
            },
            {
              "h": 5,
              "id": "id-57",
              "w": 2,
              "widgetId": "id-52",
              "x": 0,
              "y": 19,
            },
            {
              "h": 5,
              "id": "id-63",
              "w": 2,
              "widgetId": "id-58",
              "x": 0,
              "y": 24,
            },
            {
              "h": 5,
              "id": "id-69",
              "w": 2,
              "widgetId": "id-64",
              "x": 0,
              "y": 29,
            },
            {
              "h": 5,
              "id": "id-75",
              "w": 2,
              "widgetId": "id-70",
              "x": 0,
              "y": 34,
            },
            {
              "h": 4,
              "id": "id-81",
              "w": 2,
              "widgetId": "id-76",
              "x": 0,
              "y": 39,
            },
          ],
          "xxl": [],
        },
        "meta": {
          "description": "RETAIL OPERATIONS / 演示数据全量汇总 · 趋势展示最早 12 个月",
          "theme": "light",
          "title": "零售运营全景",
        },
        "uuid": "uuid-12",
        "version": 0,
        "widgets": [
          {
            "description": "全量销售与利润",
            "id": "id-22",
            "insightId": "uuid-2",
            "title": "经营快照",
            "type": "insight",
          },
          {
            "description": "去重客户与订单统计",
            "id": "id-28",
            "insightId": "uuid-3",
            "title": "客户与订单",
            "type": "insight",
          },
          {
            "chartId": "uuid-5",
            "description": "",
            "id": "id-34",
            "title": "品类销售占比",
            "type": "chart",
          },
          {
            "chartId": "uuid-6",
            "description": "",
            "id": "id-40",
            "title": "客群销售占比",
            "type": "chart",
          },
          {
            "chartId": "uuid-7",
            "description": "月度双轴对比 · 最早 12 个月",
            "id": "id-46",
            "title": "销售与利润趋势",
            "type": "chart",
          },
          {
            "chartId": "uuid-8",
            "description": "按销售额降序排列",
            "id": "id-52",
            "title": "省份销售 TOP 6",
            "type": "chart",
          },
          {
            "chartId": "uuid-9",
            "description": "",
            "id": "id-58",
            "title": "品类利润",
            "type": "chart",
          },
          {
            "chartId": "uuid-10",
            "description": "",
            "id": "id-64",
            "title": "配送订单分布",
            "type": "chart",
          },
          {
            "chartId": "uuid-11",
            "description": "销售额与利润明细",
            "id": "id-70",
            "title": "重点客户 TOP 6",
            "type": "chart",
          },
          {
            "description": "结合趋势、结构与明细制定下一步计划",
            "id": "id-76",
            "insightId": "uuid-4",
            "title": "经营观察与行动",
            "type": "insight",
          },
        ],
      }
    `)
  })

  it('basic-dashboard', async () => {
    const LocalVBI = createVBI()
    const salesChart = LocalVBI.chart.create(LocalVBI.chart.createEmpty('demoSupermarket'))
    salesChart.chartType.changeChartType('bar')
    salesChart.dimensions.add('province', (dimension) => dimension.setAlias('省份'))
    salesChart.measures.add('sales', (measure) =>
      measure.setAlias('销售额').setEncoding('xAxis').setAggregate({ func: 'sum' }),
    )
    salesChart.limit.setLimit(8)

    const salesInsight = LocalVBI.insight.create(LocalVBI.insight.createEmpty())
    salesInsight.setContent('华东区域销售额领先，建议继续跟进重点客户。')

    const resources = {
      charts: { salesChart },
      insights: { salesInsight },
    }

    const dashboardBuilder = LocalVBI.dashboard.create({
      ...LocalVBI.dashboard.createEmpty(),
      meta: { title: '销售仪表盘' },
    })

    dashboardBuilder.chart.add((chart) => {
      chart
        .setChart(resources.charts.salesChart)
        .setTitle('销售趋势')
        .setDescription('按省份汇总销售额，展示前 8 项')
        .setLayouts({
          lg: { x: 0, y: 0, w: 8, h: 6 },
          md: { x: 0, y: 0, w: 6, h: 5 },
        })
    })

    dashboardBuilder.insight.add((insight) => {
      insight
        .setInsightId(resources.insights.salesInsight)
        .setTitle('关键洞察')
        .setLayouts({
          lg: { x: 8, y: 0, w: 4, h: 6 },
          md: { x: 0, y: 5, w: 6, h: 3 },
        })
    })

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
              "h": 6,
              "id": "id-5",
              "w": 8,
              "widgetId": "id-3",
              "x": 0,
              "y": 0,
            },
            {
              "h": 6,
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
          "theme": "light",
          "title": "销售仪表盘",
        },
        "uuid": "uuid-3",
        "version": 0,
        "widgets": [
          {
            "chartId": "uuid-1",
            "description": "按省份汇总销售额，展示前 8 项",
            "id": "id-3",
            "title": "销售趋势",
            "type": "chart",
          },
          {
            "description": "",
            "id": "id-7",
            "insightId": "uuid-2",
            "title": "关键洞察",
            "type": "insight",
          },
        ],
      }
    `)
  })

  it('responsive-dashboard-layout', async () => {
    const LocalVBI = createVBI()
    const salesChart = LocalVBI.chart.create(LocalVBI.chart.createEmpty('demoSupermarket'))
    salesChart.chartType.changeChartType('bar')
    salesChart.dimensions.add('province', (dimension) => dimension.setAlias('省份'))
    salesChart.measures.add('sales', (measure) =>
      measure.setAlias('销售额').setEncoding('xAxis').setAggregate({ func: 'sum' }),
    )
    salesChart.limit.setLimit(8)

    const profitChart = LocalVBI.chart.create(LocalVBI.chart.createEmpty('demoSupermarket'))
    profitChart.chartType.changeChartType('line')
    profitChart.dimensions.add('order_date', (dimension) =>
      dimension.setAlias('订单月份').setAggregate({ func: 'toMonth' }),
    )
    profitChart.measures.add('profit', (measure) =>
      measure.setAlias('利润').setEncoding('yAxis').setAggregate({ func: 'sum' }),
    )
    profitChart.limit.setLimit(8)

    const opsInsight = LocalVBI.insight.create(LocalVBI.insight.createEmpty())
    opsInsight.setContent('销售额与利润趋势需要联合观察，低利润月份应进一步拆解品类结构。')

    const resources = {
      charts: { salesChart, profitChart },
      insights: { opsInsight },
    }

    const dashboardBuilder = LocalVBI.dashboard.create({
      ...LocalVBI.dashboard.createEmpty(),
      meta: { title: '经营看板' },
    })

    dashboardBuilder.chart.add((chart) => {
      chart
        .setChart(resources.charts.salesChart)
        .setTitle('区域销售')
        .setDescription('按省份汇总销售额，展示前 8 项')
        .setLayouts({
          lg: { x: 0, y: 0, w: 7, h: 5 },
          md: { x: 0, y: 0, w: 6, h: 4 },
          sm: { x: 0, y: 0, w: 4, h: 4 },
        })
    })

    dashboardBuilder.chart.add((chart) => {
      chart
        .setChart(resources.charts.profitChart)
        .setTitle('利润趋势')
        .setDescription('按月份汇总利润，展示前 8 个月')
        .setLayouts({
          lg: { x: 7, y: 0, w: 5, h: 5 },
          md: { x: 0, y: 4, w: 6, h: 4 },
          sm: { x: 0, y: 4, w: 4, h: 4 },
        })
    })

    dashboardBuilder.insight.add((insight) => {
      insight
        .setInsightId(resources.insights.opsInsight)
        .setTitle('经营洞察')
        .setDescription('销售与利润联动说明')
        .setLayouts({
          lg: { x: 0, y: 5, w: 12, h: 3 },
          md: { x: 0, y: 8, w: 6, h: 3 },
          sm: { x: 0, y: 8, w: 4, h: 3 },
        })
    })

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
              "id": "id-7",
              "w": 7,
              "widgetId": "id-5",
              "x": 0,
              "y": 0,
            },
            {
              "h": 5,
              "id": "id-12",
              "w": 5,
              "widgetId": "id-10",
              "x": 7,
              "y": 0,
            },
            {
              "h": 3,
              "id": "id-17",
              "w": 12,
              "widgetId": "id-15",
              "x": 0,
              "y": 5,
            },
          ],
          "md": [
            {
              "h": 4,
              "id": "id-8",
              "w": 6,
              "widgetId": "id-5",
              "x": 0,
              "y": 0,
            },
            {
              "h": 4,
              "id": "id-13",
              "w": 6,
              "widgetId": "id-10",
              "x": 0,
              "y": 4,
            },
            {
              "h": 3,
              "id": "id-18",
              "w": 6,
              "widgetId": "id-15",
              "x": 0,
              "y": 8,
            },
          ],
          "sm": [
            {
              "h": 4,
              "id": "id-9",
              "w": 4,
              "widgetId": "id-5",
              "x": 0,
              "y": 0,
            },
            {
              "h": 4,
              "id": "id-14",
              "w": 4,
              "widgetId": "id-10",
              "x": 0,
              "y": 4,
            },
            {
              "h": 3,
              "id": "id-19",
              "w": 4,
              "widgetId": "id-15",
              "x": 0,
              "y": 8,
            },
          ],
          "xl": [],
          "xs": [],
          "xxl": [],
        },
        "meta": {
          "theme": "light",
          "title": "经营看板",
        },
        "uuid": "uuid-4",
        "version": 0,
        "widgets": [
          {
            "chartId": "uuid-1",
            "description": "按省份汇总销售额，展示前 8 项",
            "id": "id-5",
            "title": "区域销售",
            "type": "chart",
          },
          {
            "chartId": "uuid-2",
            "description": "按月份汇总利润，展示前 8 个月",
            "id": "id-10",
            "title": "利润趋势",
            "type": "chart",
          },
          {
            "description": "销售与利润联动说明",
            "id": "id-15",
            "insightId": "uuid-3",
            "title": "经营洞察",
            "type": "insight",
          },
        ],
      }
    `)
  })

  it('update-and-remove-dashboard-widgets', async () => {
    const LocalVBI = createVBI()
    const retainedInsight = LocalVBI.insight.create(LocalVBI.insight.createEmpty())
    retainedInsight.setContent('临时图表已移除，保留洞察用于记录仪表盘调整结果。')

    const resources = {
      charts: {},
      insights: { retainedInsight },
    }

    const dashboardBuilder = LocalVBI.dashboard.create({
      ...LocalVBI.dashboard.createEmpty(),
      meta: { title: '组件更新与移除' },
    })

    dashboardBuilder.chart.add((chart) => {
      chart.setTitle('临时图表').setLayouts({ lg: { x: 0, y: 0, w: 6, h: 4 } })
    })
    dashboardBuilder.insight.add((insight) => {
      insight
        .setInsightId(resources.insights.retainedInsight)
        .setTitle('保留洞察')
        .setLayouts({ lg: { x: 6, y: 0, w: 6, h: 4 } })
    })

    const [chartWidget] = dashboardBuilder.chart.toJSON()
    const [insightWidget] = dashboardBuilder.insight.toJSON()

    dashboardBuilder.chart.update(chartWidget.id, (chart) => {
      chart.setDescription('更新后移除').setLayouts({ lg: { x: 0, y: 1, w: 5, h: 3 } })
    })
    dashboardBuilder.insight.update(insightWidget.id, (insight) => {
      insight.setDescription('仪表盘保留的洞察说明')
    })
    dashboardBuilder.chart.remove(chartWidget.id)

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
              "h": 4,
              "id": "id-6",
              "w": 6,
              "widgetId": "id-4",
              "x": 6,
              "y": 0,
            },
          ],
          "md": [],
          "sm": [],
          "xl": [],
          "xs": [],
          "xxl": [],
        },
        "meta": {
          "theme": "light",
          "title": "组件更新与移除",
        },
        "uuid": "uuid-2",
        "version": 0,
        "widgets": [
          {
            "description": "仪表盘保留的洞察说明",
            "id": "id-4",
            "insightId": "uuid-1",
            "title": "保留洞察",
            "type": "insight",
          },
        ],
      }
    `)
  })
})
