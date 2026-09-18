import { rs } from '@rstest/core'
import { createVBI, type VBIDashboardBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

const MOCK_SYSTEM_TIME = new Date('2026-03-23T00:00:00.000Z')

describe('dashboard / ResourceWorkflow', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })

  it('register-and-reference-quarterly-resources', async () => {
    const LocalVBI = createVBI()
    const quarterlyRevenueChart = LocalVBI.chart.create(LocalVBI.chart.createEmpty('demoSupermarket'))
    quarterlyRevenueChart.chartType.changeChartType('line')
    quarterlyRevenueChart.dimensions.add('order_date', (dimension) =>
      dimension.setAlias('订单季度').setAggregate({ func: 'toQuarter' }),
    )
    quarterlyRevenueChart.measures.add('sales', (measure) =>
      measure.setAlias('季度销售额').setEncoding('yAxis').setAggregate({ func: 'sum' }),
    )
    quarterlyRevenueChart.limit.setLimit(8)

    const quarterlyInsight = LocalVBI.insight.create(LocalVBI.insight.createEmpty())
    quarterlyInsight.setContent('Q4 销售额继续增长，但利润贡献需要结合品类折扣进一步拆解。')

    const temporaryInsight = LocalVBI.insight.create(LocalVBI.insight.createEmpty())
    temporaryInsight.setContent('临时备注用于验证资源移除，不进入最终仪表盘。')

    const resources = {
      charts: { quarterlyRevenueChart },
      insights: { quarterlyInsight, temporaryInsight },
    }

    const builder = LocalVBI.dashboard.create({
      ...LocalVBI.dashboard.createEmpty(),
      meta: { title: '季度经营复盘', theme: 'light' },
    })

    const applyBuilder = (builder: VBIDashboardBuilder) => {
      const chartId = resources.charts.quarterlyRevenueChart.getUUID()
      const insightId = resources.insights.quarterlyInsight.getUUID()
      const temporaryInsightId = resources.insights.temporaryInsight.getUUID()

      if (!LocalVBI.resources.chart.has(chartId)) throw new Error('chart should be registered')
      if (LocalVBI.resources.chart.get(chartId)?.chartType !== 'line')
        throw new Error('registered chart should be a line chart')
      if (!LocalVBI.resources.chart.list().some((chart) => chart.uuid === chartId))
        throw new Error('chart should be listed')
      if (!LocalVBI.resources.snapshot().insights[insightId]?.content.includes('Q4 销售额'))
        throw new Error('snapshot should include insight content')

      if (!LocalVBI.resources.insight.unregister(temporaryInsightId))
        throw new Error('temporary insight should be removed')
      if (LocalVBI.resources.insight.get(temporaryInsightId)) throw new Error('removed insight should be absent')
      const restoredTemporaryInsight = LocalVBI.resources.insight.register(resources.insights.temporaryInsight.build())
      if (restoredTemporaryInsight.uuid !== temporaryInsightId) throw new Error('restored insight should retain its id')

      const registered = LocalVBI.resources.register({
        charts: [resources.charts.quarterlyRevenueChart.build()],
        insights: [resources.insights.quarterlyInsight.build()],
      })
      if (registered.charts[0].uuid !== chartId) throw new Error('registered chart id should match')
      if (registered.insights[0].uuid !== insightId) throw new Error('registered insight id should match')

      builder.chart.add((chart) => {
        chart
          .setChart(chartId)
          .setTitle('季度销售走势')
          .setDescription('共享资源中的季度销售图，展示前 8 个季度')
          .setLayouts({ lg: { x: 0, y: 0, w: 8, h: 5 } })
      })

      builder.insight.add((insight) => {
        insight
          .setInsightId(resources.insights.quarterlyInsight)
          .setTitle('季度经营解读')
          .setDescription('引用已注册 insight builder')
          .setLayouts({ lg: { x: 8, y: 0, w: 4, h: 5 } })
      })
    }
    await applyBuilder(builder)

    const dashboardDSL = builder.build()
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
              "id": "id-8",
              "w": 4,
              "widgetId": "id-6",
              "x": 8,
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
          "title": "季度经营复盘",
        },
        "uuid": "uuid-4",
        "version": 0,
        "widgets": [
          {
            "chartId": "uuid-1",
            "description": "共享资源中的季度销售图，展示前 8 个季度",
            "id": "id-3",
            "title": "季度销售走势",
            "type": "chart",
          },
          {
            "description": "引用已注册 insight builder",
            "id": "id-6",
            "insightId": "uuid-2",
            "title": "季度经营解读",
            "type": "insight",
          },
        ],
      }
    `)
  })
})
