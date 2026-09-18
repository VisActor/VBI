import { rs } from '@rstest/core'
import { createVBI, type VBIDashboardBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

const MOCK_SYSTEM_TIME = new Date('2026-03-23T00:00:00.000Z')

describe('dashboard / DashboardWorkflow', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })

  it('executive-dashboard-widget-lifecycle', async () => {
    const LocalVBI = createVBI()
    const salesChart = LocalVBI.chart.create(LocalVBI.chart.createEmpty('demoSupermarket'))
    salesChart.chartType.changeChartType('bar')
    salesChart.dimensions.add('province', (dimension) => dimension.setAlias('省份'))
    salesChart.measures.add('sales', (measure) =>
      measure.setAlias('销售额').setEncoding('xAxis').setAggregate({ func: 'sum' }),
    )
    salesChart.limit.setLimit(8)

    const salesInsight = LocalVBI.insight.create(LocalVBI.insight.createEmpty())
    salesInsight.setContent('华东区域销售额领先，管理层需要关注复购与利润结构。')

    const resources = {
      charts: { salesChart },
      insights: { salesInsight },
    }

    const builder = LocalVBI.dashboard.create({
      ...LocalVBI.dashboard.createEmpty(),
      meta: { title: '经营驾驶舱' },
    })

    const applyBuilder = (builder: VBIDashboardBuilder) => {
      if (!builder.isEmpty()) {
        throw new Error('new dashboard should start without widgets')
      }

      let missingLayoutRejected = false
      try {
        builder.chart.add((chart) => {
          chart.setTitle('缺少布局的草稿图表').setChart(resources.charts.salesChart)
        })
      } catch {
        missingLayoutRejected = true
      }
      if (!missingLayoutRejected || !builder.isEmpty()) {
        throw new Error('dashboard should reject chart widgets without lg layout')
      }

      builder.chart
        .add((chart) => {
          chart
            .setChart(resources.charts.salesChart)
            .setTitle('省份销售额')
            .setDescription('按省份汇总销售额，展示前 8 项')
            .setLayouts({
              lg: { x: 0, y: 0, w: 8, h: 6 },
              md: { x: 0, y: 0, w: 6, h: 5 },
            })
        })
        .insight.add((insight) => {
          insight
            .setInsightId(resources.insights.salesInsight)
            .setTitle('经营洞察')
            .setDescription('解释销售额集中区域')
            .setLayouts({
              lg: { x: 8, y: 0, w: 4, h: 6 },
              md: { x: 0, y: 5, w: 6, h: 3 },
            })
        })

      const chartWidget = builder.chart.findAll()[0]
      const insightWidget = builder.insight.findAll()[0]
      if (!chartWidget || !insightWidget) {
        throw new Error('dashboard should contain chart and insight widgets')
      }
      if (!chartWidget.getBuilder() || !insightWidget.getBuilder()) {
        throw new Error('dashboard widgets should resolve registered resources')
      }
      if (builder.chart.get(chartWidget.getId())?.toJSON().title !== '省份销售额') {
        throw new Error('chart widget should be findable by widget id')
      }
      if (!builder.chart.find(resources.charts.salesChart.getUUID())) {
        throw new Error('chart widget should be findable by chart resource id')
      }
      if (!builder.insight.find(resources.insights.salesInsight.getUUID())) {
        throw new Error('insight widget should be findable by insight resource id')
      }

      builder.chart.update(chartWidget.getId(), (chart) => {
        chart.setTitle('重点省份销售额').setLayouts({ lg: { x: 0, y: 0, w: 7, h: 6 } })
      })
      builder.insight.update(insightWidget.getId(), (insight) => {
        insight.setDescription('更新为管理层复盘口径')
      })

      if (builder.chart.toJSON()[0].title !== '重点省份销售额') {
        throw new Error('chart widget title should update')
      }
      if (builder.insight.toJSON()[0].description !== '更新为管理层复盘口径') {
        throw new Error('insight widget description should update')
      }

      let missingInsightRejected = false
      try {
        builder.insight.update('missing-widget', (insight) => insight.setTitle('missing'))
      } catch {
        missingInsightRejected = true
      }
      if (!missingInsightRejected) {
        throw new Error('updating missing insight widget should fail')
      }

      builder.insight.remove(insightWidget.getId())
      builder.chart.remove('missing-widget')
      if (builder.insight.findAll().length !== 0 || builder.chart.findAll().length !== 1) {
        throw new Error('only the chart widget should remain')
      }

      const ReplicaVBI = createVBI()
      const replica = ReplicaVBI.dashboard.create(ReplicaVBI.dashboard.createEmpty('dashboard-replica'))
      replica.applyUpdate(builder.encodeStateAsUpdate(), 'dashboard-sync')
      replica.build()
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
              "h": 6,
              "id": "id-13",
              "w": 7,
              "widgetId": "id-5",
              "x": 0,
              "y": 0,
            },
          ],
          "md": [
            {
              "h": 5,
              "id": "id-8",
              "w": 6,
              "widgetId": "id-5",
              "x": 0,
              "y": 0,
            },
          ],
          "sm": [],
          "xl": [],
          "xs": [],
          "xxl": [],
        },
        "meta": {
          "theme": "light",
          "title": "经营驾驶舱",
        },
        "uuid": "uuid-3",
        "version": 0,
        "widgets": [
          {
            "chartId": "uuid-1",
            "description": "按省份汇总销售额，展示前 8 项",
            "id": "id-5",
            "title": "重点省份销售额",
            "type": "chart",
          },
        ],
      }
    `)
  })

  it('merchandising-dashboard-widget-lifecycle', async () => {
    const LocalVBI = createVBI()
    const categorySalesChart = LocalVBI.chart.create(LocalVBI.chart.createEmpty('demoSupermarket'))
    categorySalesChart.chartType.changeChartType('bar')
    categorySalesChart.dimensions.add('product_type', (dimension) => dimension.setAlias('商品品类'))
    categorySalesChart.measures.add('sales', (measure) =>
      measure.setAlias('销售额').setEncoding('xAxis').setAggregate({ func: 'sum' }),
    )
    categorySalesChart.limit.setLimit(8)

    const discountProfitChart = LocalVBI.chart.create(LocalVBI.chart.createEmpty('demoSupermarket'))
    discountProfitChart.chartType.changeChartType('scatter')
    discountProfitChart.dimensions.add('discount', (dimension) => dimension.setAlias('折扣'))
    discountProfitChart.measures.add('profit', (measure) =>
      measure.setAlias('利润').setEncoding('yAxis').setAggregate({ func: 'sum' }),
    )

    const promotionInsight = LocalVBI.insight.create(LocalVBI.insight.createEmpty())
    promotionInsight.setContent('高折扣品类带来的销售增长未完全转化为利润，需要收紧促销门槛。')

    const resources = {
      charts: { categorySalesChart, discountProfitChart },
      insights: { promotionInsight },
    }

    const builder = LocalVBI.dashboard.create({
      ...LocalVBI.dashboard.createEmpty(),
      meta: { title: '商品运营看板' },
    })

    const applyBuilder = (builder: VBIDashboardBuilder) => {
      if (!builder.isEmpty()) throw new Error('dashboard should be empty')

      builder.chart.add((chart) => {
        chart
          .setChart(resources.charts.categorySalesChart)
          .setTitle('品类销售')
          .setDescription('初版品类销售布局')
          .setLayouts({ lg: { x: 0, y: 0, w: 6, h: 4 }, md: { x: 0, y: 0, w: 6, h: 4 } })
      })
      builder.chart.add((chart) => {
        chart
          .setChart(resources.charts.discountProfitChart)
          .setTitle('折扣利润散点')
          .setLayouts({ lg: { x: 6, y: 0, w: 6, h: 4 }, md: { x: 0, y: 4, w: 6, h: 4 } })
      })
      builder.insight.add((insight) => {
        insight
          .setInsightId(resources.insights.promotionInsight)
          .setTitle('促销洞察')
          .setLayouts({ lg: { x: 0, y: 4, w: 12, h: 3 }, md: { x: 0, y: 8, w: 6, h: 3 } })
      })

      const [categoryWidget, discountWidget] = builder.chart.toJSON()
      const [promotionWidget] = builder.insight.toJSON()
      if (builder.chart.find(resources.charts.categorySalesChart.getUUID())?.getId() !== categoryWidget.id)
        throw new Error('chart reference should resolve')
      if (builder.insight.find(resources.insights.promotionInsight.getUUID())?.getId() !== promotionWidget.id)
        throw new Error('insight reference should resolve')

      builder.chart.update(categoryWidget.id, (chart) => {
        chart
          .setTitle('重点品类销售')
          .setDescription('更新后保留 md 布局，并合并新的 lg 布局')
          .setLayouts({ lg: { x: 0, y: 0, w: 7, h: 5 } })
      })
      builder.insight.update(promotionWidget.id, (insight) => {
        insight.setDescription('更新后的促销策略说明').setLayouts({ lg: { x: 7, y: 0, w: 5, h: 5 } })
      })
      builder.chart.remove(discountWidget.id)
      if (builder.chart.get(discountWidget.id)) throw new Error('removed chart should be absent')

      for (const widget of builder.chart.toJSON()) {
        builder.chart.remove(widget.id)
      }
      for (const widget of builder.insight.toJSON()) {
        builder.insight.remove(widget.id)
      }
      if (!builder.isEmpty()) throw new Error('dashboard should be empty')

      builder.chart.add((chart) => {
        chart
          .setChart(resources.charts.categorySalesChart)
          .setTitle('最终品类销售')
          .setDescription('清空草稿后重建的主图')
          .setLayouts({ lg: { x: 0, y: 0, w: 7, h: 5 }, md: { x: 0, y: 0, w: 6, h: 4 } })
      })
      builder.insight.add((insight) => {
        insight
          .setInsightId(resources.insights.promotionInsight)
          .setTitle('最终促销洞察')
          .setDescription('清空草稿后重建的洞察')
          .setLayouts({ lg: { x: 7, y: 0, w: 5, h: 5 }, md: { x: 0, y: 4, w: 6, h: 3 } })
      })
      if (builder.isEmpty()) throw new Error('dashboard should contain widgets')
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
              "id": "id-21",
              "w": 7,
              "widgetId": "id-19",
              "x": 0,
              "y": 0,
            },
            {
              "h": 5,
              "id": "id-25",
              "w": 5,
              "widgetId": "id-23",
              "x": 7,
              "y": 0,
            },
          ],
          "md": [
            {
              "h": 4,
              "id": "id-22",
              "w": 6,
              "widgetId": "id-19",
              "x": 0,
              "y": 0,
            },
            {
              "h": 3,
              "id": "id-26",
              "w": 6,
              "widgetId": "id-23",
              "x": 0,
              "y": 4,
            },
          ],
          "sm": [],
          "xl": [],
          "xs": [],
          "xxl": [],
        },
        "meta": {
          "theme": "light",
          "title": "商品运营看板",
        },
        "uuid": "uuid-4",
        "version": 0,
        "widgets": [
          {
            "chartId": "uuid-1",
            "description": "清空草稿后重建的主图",
            "id": "id-19",
            "title": "最终品类销售",
            "type": "chart",
          },
          {
            "description": "清空草稿后重建的洞察",
            "id": "id-23",
            "insightId": "uuid-3",
            "title": "最终促销洞察",
            "type": "insight",
          },
        ],
      }
    `)
  })
})
