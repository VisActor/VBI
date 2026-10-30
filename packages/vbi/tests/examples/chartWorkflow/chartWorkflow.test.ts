import { rs } from '@rstest/core'
import { VBI, type VBIChartBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

const MOCK_SYSTEM_TIME = new Date('2026-03-23T00:00:00.000Z')

describe('chart / ChartWorkflow', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })

  it('query-without-vseed', async () => {
    const builder = VBI.chart.create({
      connectorId: 'demoSupermarket',
      chartType: 'table',
      dimensions: [],
      measures: [],
      whereFilter: {
        id: 'root',
        op: 'and',
        conditions: [],
      },
      havingFilter: {
        id: 'root',
        op: 'and',
        conditions: [],
      },
      theme: 'light',
      locale: 'zh-CN',
      version: 1,
      limit: 5,
    })

    const applyBuilder = async (builder: VBIChartBuilder) => {
      builder.dimensions.add('area', (node) => node.setAlias('区域'))
      builder.measures.add('sales', (node) => node.setAlias('销售额合计').setAggregate({ func: 'sum' }))
      builder.measures.add('sales', (node) => node.setAlias('平均销售额').setAggregate({ func: 'avg' }))
      builder.whereFilter.add('sales', (node) => node.setOperator('>').setValue(0))
      const result = await builder.query()
      const ids = [...builder.dimensions.findAll(), ...builder.measures.findAll()].map((node) => node.getId())
      if (!result.dataset.length || result.dataset.some((row) => ids.some((id) => !(id in row)))) {
        throw new Error('Query results must preserve every dimension and measure ID')
      }
    }
    await applyBuilder(builder)

    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot(`
      {
        "chartType": "table",
        "connectorId": "demoSupermarket",
        "dimensions": [
          {
            "alias": "区域",
            "encoding": "column",
            "field": "area",
            "id": "id-1",
          },
        ],
        "havingFilter": {
          "conditions": [],
          "id": "root",
          "op": "and",
        },
        "limit": 5,
        "locale": "zh-CN",
        "measures": [
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "销售额合计",
            "encoding": "column",
            "field": "sales",
            "id": "id-2",
          },
          {
            "aggregate": {
              "func": "avg",
            },
            "alias": "平均销售额",
            "encoding": "column",
            "field": "sales",
            "id": "id-3",
          },
        ],
        "theme": "light",
        "uuid": "uuid-1",
        "version": 1,
        "whereFilter": {
          "conditions": [
            {
              "field": "sales",
              "id": "id-4",
              "op": ">",
              "value": 0,
            },
          ],
          "id": "root",
          "op": "and",
        },
      }
    `)

    const vQueryDSL = builder.buildVQuery()
    expect(vQueryDSL).toMatchInlineSnapshot(`
      {
        "groupBy": [
          "area",
        ],
        "limit": 5,
        "orderBy": [
          {
            "field": "id-1",
            "order": "asc",
          },
        ],
        "select": [
          {
            "aggr": {
              "func": "sum",
            },
            "alias": "id-2",
            "field": "sales",
          },
          {
            "aggr": {
              "func": "avg",
            },
            "alias": "id-3",
            "field": "sales",
          },
          {
            "alias": "id-1",
            "field": "area",
          },
        ],
        "where": {
          "conditions": [
            {
              "field": "sales",
              "op": ">",
              "value": 0,
            },
          ],
          "op": "and",
        },
      }
    `)

    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot(`
      {
        "chartType": "table",
        "dataset": [
          {
            "id-1": "东北",
            "id-2": 2681567.469000001,
            "id-3": 1609.584315126051,
          },
          {
            "id-1": "中南",
            "id-2": 4137415.0929999948,
            "id-3": 1603.027932196821,
          },
          {
            "id-1": "华东",
            "id-2": 4684506.442,
            "id-3": 1591.2046338315217,
          },
          {
            "id-1": "华北",
            "id-2": 2447301.017000004,
            "id-3": 1787.6559656683742,
          },
          {
            "id-1": "西北",
            "id-2": 815039.5959999998,
            "id-3": 1705.1037573221754,
          },
        ],
        "dimensions": [
          {
            "alias": "区域",
            "encoding": "column",
            "id": "id-1",
          },
        ],
        "locale": "zh-CN",
        "measures": [
          {
            "alias": "销售额合计",
            "encoding": "column",
            "id": "id-2",
          },
          {
            "alias": "平均销售额",
            "encoding": "column",
            "id": "id-3",
          },
        ],
        "theme": "light",
      }
    `)
  })

  it('analyst-workbench-sync-and-schema', async () => {
    const builder = VBI.chart.create({
      connectorId: 'demoSupermarket',
      chartType: 'table',
      dimensions: [],
      measures: [],
      whereFilter: {
        id: 'root',
        op: 'and',
        conditions: [],
      },
      havingFilter: {
        id: 'root',
        op: 'and',
        conditions: [],
      },
      theme: 'light',
      locale: 'zh-CN',
      version: 1,
      limit: 20,
    })

    const applyBuilder = async (builder: VBIChartBuilder) => {
      if (!builder.isEmpty()) {
        throw new Error('new analyst chart should start without fields')
      }

      const schema = await builder.getSchema()
      if (!schema.some((column) => column.name === 'sales')) {
        throw new Error('demo schema should expose sales')
      }

      let themeEvents = 0
      let localeEvents = 0
      let limitEvents = 0
      const stopTheme = builder.theme.observe(() => (themeEvents += 1))
      const stopLocale = builder.locale.observe(() => (localeEvents += 1))
      const stopLimit = builder.limit.observe(() => (limitEvents += 1))

      builder.theme.setTheme('light')
      builder.theme.setTheme('dark')
      builder.locale.setLocale('zh-CN')
      builder.locale.setLocale('en-US')
      builder.limit.setLimit(100)

      stopTheme()
      stopLocale()
      stopLimit()

      if (builder.theme.getTheme() !== 'dark' || builder.theme.toJSON() !== 'dark') {
        throw new Error('theme should switch to dark')
      }
      if (builder.locale.getLocale() !== 'en-US' || builder.locale.toJSON() !== 'en-US') {
        throw new Error('locale should switch to en-US')
      }
      if (builder.limit.getLimit() !== 100 || builder.limit.toJSON() !== 100) {
        throw new Error('limit should be persisted')
      }
      if (themeEvents !== 1 || localeEvents !== 1 || limitEvents !== 1) {
        throw new Error('preference observers should fire only for effective changes')
      }

      builder.dimensions
        .add('order_date', (node) => {
          node.setAlias('下单月份').setAggregate({ func: 'toMonth' }).setSort({ order: 'asc' })
        })
        .add('product_type', (node) => {
          node.setAlias('品类').setEncoding('row').setSort({ order: 'asc' })
        })

      builder.measures
        .add('sales', (node) => {
          node
            .setAlias('销售额')
            .setAggregate({ func: 'sum' })
            .setSort({ order: 'desc' })
            .setFormat({ type: 'number', prefix: '¥', fractionDigits: 0 })
        })
        .add('profit', (node) => {
          node.setAlias('利润').setAggregate({ func: 'avg' }).setFormat({ autoFormat: true })
        })

      const month = builder.dimensions.find((node) => node.getField() === 'order_date')
      if (!month || month.getSort()?.order !== 'asc') {
        throw new Error('month dimension should be sortable')
      }
      month.clearAggregate().clearSort().setSort({ order: 'asc' })

      const sales = builder.measures.find((node) => node.getField() === 'sales')
      if (!sales || (sales.getFormat() as any)?.type !== 'number') {
        throw new Error('sales measure should expose its format')
      }
      sales.clearFormat().clearSort()

      if (builder.dimensions.findAll().length !== 2 || builder.measures.findAll().length !== 2) {
        throw new Error('analyst chart should contain two dimensions and two measures')
      }
      if (builder.dimensions.find(() => false) !== undefined || builder.measures.find(() => false) !== undefined) {
        throw new Error('missing fields should not resolve')
      }

      let missingDimensionRejected = false
      try {
        builder.dimensions.update('missing-dimension', (node) => node.setAlias('missing'))
      } catch {
        missingDimensionRejected = true
      }
      let missingMeasureRejected = false
      try {
        builder.measures.update('missing-measure', (node) => node.setAlias('missing'))
      } catch {
        missingMeasureRejected = true
      }
      if (!missingDimensionRejected || !missingMeasureRejected) {
        throw new Error('updating unknown fields should fail fast')
      }

      const availableTypes = builder.chartType.getAvailableChartTypes()
      for (const chartType of availableTypes) {
        builder.chartType.changeChartType(chartType)
        builder.chartType.getSupportedDimensionEncodings()
        builder.chartType.getRecommendedDimensionEncodings(3)
        builder.chartType.getRecommendedDimensionEncodings(0)
        builder.chartType.getSupportedMeasureEncodings()
        builder.chartType.getRecommendedMeasureEncodings(3)
        builder.chartType.getRecommendedMeasureEncodings(0)
      }
      builder.chartType.changeChartType('table')
      if (builder.chartType.getChartType() !== 'table' || builder.chartType.toJSON() !== 'table') {
        throw new Error('chart type should return to table for tabular export')
      }

      const peer = VBI.chart.create({
        connectorId: 'demoSupermarket',
        chartType: 'table',
        dimensions: [],
        measures: [],
        whereFilter: { id: 'root', op: 'and', conditions: [] },
        havingFilter: { id: 'root', op: 'and', conditions: [] },
        theme: 'light',
        locale: 'zh-CN',
        version: 1,
      })
      peer.applyUpdate(builder.encodeStateAsUpdate(), 'sync-example')
      peer.build()
    }
    await applyBuilder(builder)

    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot(`
      {
        "chartType": "table",
        "connectorId": "demoSupermarket",
        "dimensions": [
          {
            "alias": "下单月份",
            "encoding": "column",
            "field": "order_date",
            "id": "id-1",
            "sort": {
              "order": "asc",
            },
          },
          {
            "alias": "品类",
            "encoding": "column",
            "field": "product_type",
            "id": "id-2",
            "sort": {
              "order": "asc",
            },
          },
        ],
        "havingFilter": {
          "conditions": [],
          "id": "root",
          "op": "and",
        },
        "limit": 100,
        "locale": "en-US",
        "measures": [
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "销售额",
            "encoding": "column",
            "field": "sales",
            "id": "id-3",
          },
          {
            "aggregate": {
              "func": "avg",
            },
            "alias": "利润",
            "encoding": "column",
            "field": "profit",
            "format": {
              "autoFormat": true,
            },
            "id": "id-4",
          },
        ],
        "theme": "dark",
        "uuid": "uuid-1",
        "version": 1,
        "whereFilter": {
          "conditions": [],
          "id": "root",
          "op": "and",
        },
      }
    `)

    const vQueryDSL = builder.buildVQuery()
    expect(vQueryDSL).toMatchInlineSnapshot(`
      {
        "groupBy": [
          "order_date",
          "product_type",
        ],
        "limit": 100,
        "orderBy": [
          {
            "field": "id-1",
            "order": "asc",
          },
          {
            "field": "id-2",
            "order": "asc",
          },
        ],
        "select": [
          {
            "aggr": {
              "func": "sum",
            },
            "alias": "id-3",
            "field": "sales",
          },
          {
            "aggr": {
              "func": "avg",
            },
            "alias": "id-4",
            "field": "profit",
          },
          {
            "alias": "id-1",
            "field": "order_date",
          },
          {
            "alias": "id-2",
            "field": "product_type",
          },
        ],
      }
    `)

    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot(`
      {
        "chartType": "table",
        "dataset": [
          {
            "id-1": "2016-01-01",
            "id-2": "办公用品",
            "id-3": 3304.7,
            "id-4": 1321.6,
          },
          {
            "id-1": "2016-01-01",
            "id-2": "家具",
            "id-3": 5288.85,
            "id-4": -634.83,
          },
          {
            "id-1": "2016-01-01",
            "id-2": "技术",
            "id-3": 3332.7,
            "id-4": 339.78,
          },
          {
            "id-1": "2016-01-02",
            "id-2": "办公用品",
            "id-3": 7375.48,
            "id-4": 409.71000000000004,
          },
          {
            "id-1": "2016-01-02",
            "id-2": "家具",
            "id-3": 388.64,
            "id-4": 23.24,
          },
          {
            "id-1": "2016-01-02",
            "id-2": "技术",
            "id-3": 25233.04,
            "id-4": 2774.94,
          },
          {
            "id-1": "2016-01-03",
            "id-2": "办公用品",
            "id-3": 12174.204000000002,
            "id-4": 21.21466666666665,
          },
          {
            "id-1": "2016-01-03",
            "id-2": "家具",
            "id-3": 403.2,
            "id-4": -26.88,
          },
          {
            "id-1": "2016-01-03",
            "id-2": "技术",
            "id-3": 4485.768,
            "id-4": -868.196,
          },
          {
            "id-1": "2016-01-04",
            "id-2": "办公用品",
            "id-3": 1153.74,
            "id-4": 281.26,
          },
          {
            "id-1": "2016-01-04",
            "id-2": "家具",
            "id-3": 6639.444,
            "id-4": -261.25866666666667,
          },
          {
            "id-1": "2016-01-05",
            "id-2": "办公用品",
            "id-3": 6050.52,
            "id-4": 543.725,
          },
          {
            "id-1": "2016-01-05",
            "id-2": "家具",
            "id-3": 2815.12,
            "id-4": 56,
          },
          {
            "id-1": "2016-01-05",
            "id-2": "技术",
            "id-3": 446.544,
            "id-4": -0.336,
          },
          {
            "id-1": "2016-01-06",
            "id-2": "办公用品",
            "id-3": 85.12,
            "id-4": 1.68,
          },
          {
            "id-1": "2016-01-06",
            "id-2": "技术",
            "id-3": 496.16,
            "id-4": 198.24,
          },
          {
            "id-1": "2016-01-07",
            "id-2": "办公用品",
            "id-3": 3799.684,
            "id-4": -658.6253333333333,
          },
          {
            "id-1": "2016-01-07",
            "id-2": "家具",
            "id-3": 5332.32,
            "id-4": 444.08,
          },
          {
            "id-1": "2016-01-07",
            "id-2": "技术",
            "id-3": 901.152,
            "id-4": -421.008,
          },
          {
            "id-1": "2016-01-08",
            "id-2": "办公用品",
            "id-3": 502.432,
            "id-4": -8.175999999999997,
          },
          {
            "id-1": "2016-01-08",
            "id-2": "家具",
            "id-3": 3277.26,
            "id-4": -1475.04,
          },
          {
            "id-1": "2016-01-08",
            "id-2": "技术",
            "id-3": 425.88,
            "id-4": -206.08,
          },
          {
            "id-1": "2016-01-09",
            "id-2": "办公用品",
            "id-3": 1648.836,
            "id-4": 44.86533333333333,
          },
          {
            "id-1": "2016-01-09",
            "id-2": "技术",
            "id-3": 6766.536,
            "id-4": -444.0613333333333,
          },
          {
            "id-1": "2016-01-10",
            "id-2": "办公用品",
            "id-3": 853.8600000000001,
            "id-4": 62.20666666666667,
          },
          {
            "id-1": "2016-01-11",
            "id-2": "办公用品",
            "id-3": 3929.2960000000003,
            "id-4": 190.1526666666667,
          },
          {
            "id-1": "2016-01-11",
            "id-2": "技术",
            "id-3": 1072.288,
            "id-4": 66.584,
          },
          {
            "id-1": "2016-01-12",
            "id-2": "办公用品",
            "id-3": 598.64,
            "id-4": 94.36,
          },
          {
            "id-1": "2016-01-12",
            "id-2": "家具",
            "id-3": 3416.98,
            "id-4": 410.62,
          },
          {
            "id-1": "2016-01-13",
            "id-2": "办公用品",
            "id-3": 2114.84,
            "id-4": 201.74,
          },
          {
            "id-1": "2016-01-13",
            "id-2": "家具",
            "id-3": 5373.620000000001,
            "id-4": 329.385,
          },
          {
            "id-1": "2016-01-16",
            "id-2": "办公用品",
            "id-3": 74.676,
            "id-4": -145.824,
          },
          {
            "id-1": "2016-01-17",
            "id-2": "办公用品",
            "id-3": 4342.38,
            "id-4": 802.13,
          },
          {
            "id-1": "2016-01-17",
            "id-2": "家具",
            "id-3": 8918.560000000001,
            "id-4": 904.2950000000001,
          },
          {
            "id-1": "2016-01-17",
            "id-2": "技术",
            "id-3": 2801.232,
            "id-4": -140.448,
          },
          {
            "id-1": "2016-01-18",
            "id-2": "办公用品",
            "id-3": 1415.96,
            "id-4": 90.72,
          },
          {
            "id-1": "2016-01-21",
            "id-2": "办公用品",
            "id-3": 1135.008,
            "id-4": 56.48159999999999,
          },
          {
            "id-1": "2016-01-21",
            "id-2": "家具",
            "id-3": 1217.692,
            "id-4": 157.06599999999997,
          },
          {
            "id-1": "2016-01-22",
            "id-2": "办公用品",
            "id-3": 1985.48,
            "id-4": 419.44,
          },
          {
            "id-1": "2016-01-23",
            "id-2": "办公用品",
            "id-3": 5304.04,
            "id-4": 954.52,
          },
          {
            "id-1": "2016-01-23",
            "id-2": "家具",
            "id-3": 1722.84,
            "id-4": 619.92,
          },
          {
            "id-1": "2016-01-25",
            "id-2": "办公用品",
            "id-3": 1827,
            "id-4": 90.39333333333333,
          },
          {
            "id-1": "2016-01-25",
            "id-2": "家具",
            "id-3": 1580.6,
            "id-4": 537.32,
          },
          {
            "id-1": "2016-01-25",
            "id-2": "技术",
            "id-3": 6610.24,
            "id-4": 1982.96,
          },
          {
            "id-1": "2016-01-26",
            "id-2": "办公用品",
            "id-3": 1640.3799999999999,
            "id-4": 69.04799999999999,
          },
          {
            "id-1": "2016-01-26",
            "id-2": "家具",
            "id-3": 5404.224,
            "id-4": -180.656,
          },
          {
            "id-1": "2016-01-26",
            "id-2": "技术",
            "id-3": 11130,
            "id-4": 1242.4533333333334,
          },
          {
            "id-1": "2016-01-27",
            "id-2": "办公用品",
            "id-3": 7560.140000000001,
            "id-4": 270.732,
          },
          {
            "id-1": "2016-01-27",
            "id-2": "技术",
            "id-3": 6727.7,
            "id-4": 107.24,
          },
          {
            "id-1": "2016-01-30",
            "id-2": "办公用品",
            "id-3": 7013.356,
            "id-4": 304.868,
          },
          {
            "id-1": "2016-01-30",
            "id-2": "家具",
            "id-3": 8025.808000000001,
            "id-4": 358.26933333333335,
          },
          {
            "id-1": "2016-01-30",
            "id-2": "技术",
            "id-3": 20554.66,
            "id-4": 1430.38,
          },
          {
            "id-1": "2016-01-31",
            "id-2": "家具",
            "id-3": 2372.58,
            "id-4": 0,
          },
          {
            "id-1": "2016-01-31",
            "id-2": "技术",
            "id-3": 2546.208,
            "id-4": -69.21600000000001,
          },
          {
            "id-1": "2016-02-01",
            "id-2": "办公用品",
            "id-3": 724.0799999999999,
            "id-4": 117.74,
          },
          {
            "id-1": "2016-02-01",
            "id-2": "家具",
            "id-3": 4682.412,
            "id-4": 27.897333333333346,
          },
          {
            "id-1": "2016-02-01",
            "id-2": "技术",
            "id-3": 4700.1359999999995,
            "id-4": 623.448,
          },
          {
            "id-1": "2016-02-02",
            "id-2": "办公用品",
            "id-3": 2421.4399999999996,
            "id-4": 122.58399999999999,
          },
          {
            "id-1": "2016-02-02",
            "id-2": "家具",
            "id-3": 7943.53,
            "id-4": -53.59666666666667,
          },
          {
            "id-1": "2016-02-02",
            "id-2": "技术",
            "id-3": 3538.08,
            "id-4": 565.6,
          },
          {
            "id-1": "2016-02-06",
            "id-2": "办公用品",
            "id-3": 2399.88,
            "id-4": 121.06500000000001,
          },
          {
            "id-1": "2016-02-06",
            "id-2": "技术",
            "id-3": 11384.24,
            "id-4": 1623.0666666666666,
          },
          {
            "id-1": "2016-02-07",
            "id-2": "家具",
            "id-3": 3995.964,
            "id-4": -551.558,
          },
          {
            "id-1": "2016-02-08",
            "id-2": "办公用品",
            "id-3": 1261.96,
            "id-4": 155.07333333333332,
          },
          {
            "id-1": "2016-02-08",
            "id-2": "家具",
            "id-3": 4422.096,
            "id-4": -614.6419999999999,
          },
          {
            "id-1": "2016-02-08",
            "id-2": "技术",
            "id-3": 682.92,
            "id-4": 149.94,
          },
          {
            "id-1": "2016-02-11",
            "id-2": "家具",
            "id-3": 177.8,
            "id-4": 69.16,
          },
          {
            "id-1": "2016-02-12",
            "id-2": "办公用品",
            "id-3": 944.16,
            "id-4": 396.48,
          },
          {
            "id-1": "2016-02-13",
            "id-2": "办公用品",
            "id-3": 2785.02,
            "id-4": 319.62,
          },
          {
            "id-1": "2016-02-13",
            "id-2": "家具",
            "id-3": 5283.88,
            "id-4": 942.06,
          },
          {
            "id-1": "2016-02-13",
            "id-2": "技术",
            "id-3": 1643.46,
            "id-4": 150.73333333333335,
          },
          {
            "id-1": "2016-02-14",
            "id-2": "办公用品",
            "id-3": 4465.972,
            "id-4": 347.543,
          },
          {
            "id-1": "2016-02-15",
            "id-2": "办公用品",
            "id-3": 165.2,
            "id-4": 1.12,
          },
          {
            "id-1": "2016-02-15",
            "id-2": "家具",
            "id-3": 972.72,
            "id-4": -7.699999999999989,
          },
          {
            "id-1": "2016-02-15",
            "id-2": "技术",
            "id-3": 721.336,
            "id-4": -104.832,
          },
          {
            "id-1": "2016-02-16",
            "id-2": "办公用品",
            "id-3": 585.816,
            "id-4": -6.608,
          },
          {
            "id-1": "2016-02-17",
            "id-2": "办公用品",
            "id-3": 2695.8959999999997,
            "id-4": 144.35399999999998,
          },
          {
            "id-1": "2016-02-19",
            "id-2": "办公用品",
            "id-3": 1324.428,
            "id-4": -175.826,
          },
          {
            "id-1": "2016-02-20",
            "id-2": "办公用品",
            "id-3": 1480.332,
            "id-4": 0.7979999999999947,
          },
          {
            "id-1": "2016-02-20",
            "id-2": "家具",
            "id-3": 9525.152000000002,
            "id-4": 669.088,
          },
          {
            "id-1": "2016-02-20",
            "id-2": "技术",
            "id-3": 10965.359999999999,
            "id-4": 1603.56,
          },
          {
            "id-1": "2016-02-21",
            "id-2": "办公用品",
            "id-3": 200.48,
            "id-4": 38.08,
          },
          {
            "id-1": "2016-02-21",
            "id-2": "家具",
            "id-3": 812.28,
            "id-4": 406.14,
          },
          {
            "id-1": "2016-02-22",
            "id-2": "办公用品",
            "id-3": 1353.6879999999999,
            "id-4": 37.947,
          },
          {
            "id-1": "2016-02-23",
            "id-2": "办公用品",
            "id-3": 444.528,
            "id-4": -140.952,
          },
          {
            "id-1": "2016-02-24",
            "id-2": "办公用品",
            "id-3": 2272.2000000000003,
            "id-4": 501.27000000000004,
          },
          {
            "id-1": "2016-02-24",
            "id-2": "家具",
            "id-3": 7195.02,
            "id-4": 842.3100000000001,
          },
          {
            "id-1": "2016-02-27",
            "id-2": "技术",
            "id-3": 764.904,
            "id-4": -89.376,
          },
          {
            "id-1": "2016-03-01",
            "id-2": "办公用品",
            "id-3": 16150.68,
            "id-4": 2057.4866666666667,
          },
          {
            "id-1": "2016-03-01",
            "id-2": "技术",
            "id-3": 3799.46,
            "id-4": 1291.64,
          },
          {
            "id-1": "2016-03-02",
            "id-2": "办公用品",
            "id-3": 998.0600000000001,
            "id-4": 94.03333333333335,
          },
          {
            "id-1": "2016-03-02",
            "id-2": "家具",
            "id-3": 1219.54,
            "id-4": 191.87,
          },
          {
            "id-1": "2016-03-02",
            "id-2": "技术",
            "id-3": 242.48,
            "id-4": 43.4,
          },
          {
            "id-1": "2016-03-03",
            "id-2": "办公用品",
            "id-3": 2963.1,
            "id-4": 651.84,
          },
          {
            "id-1": "2016-03-03",
            "id-2": "家具",
            "id-3": 7639.128,
            "id-4": 1103.368,
          },
          {
            "id-1": "2016-03-03",
            "id-2": "技术",
            "id-3": 1052.352,
            "id-4": -263.088,
          },
          {
            "id-1": "2016-03-04",
            "id-2": "办公用品",
            "id-3": 478.1,
            "id-4": 42.7,
          },
          {
            "id-1": "2016-03-04",
            "id-2": "技术",
            "id-3": 1366.4,
            "id-4": 505.12,
          },
          {
            "id-1": "2016-03-08",
            "id-2": "办公用品",
            "id-3": 589.12,
            "id-4": 52.92,
          },
          {
            "id-1": "2016-03-08",
            "id-2": "家具",
            "id-3": 2967.132,
            "id-4": -78.484,
          },
        ],
        "dimensions": [
          {
            "alias": "下单月份",
            "encoding": "column",
            "id": "id-1",
          },
          {
            "alias": "品类",
            "encoding": "column",
            "id": "id-2",
          },
        ],
        "locale": "en-US",
        "measures": [
          {
            "alias": "销售额",
            "encoding": "column",
            "id": "id-3",
          },
          {
            "alias": "利润",
            "autoFormat": true,
            "encoding": "column",
            "id": "id-4",
          },
        ],
        "theme": "dark",
      }
    `)
  })

  it('filter-review-audit-trail', async () => {
    const builder = VBI.chart.create({
      connectorId: 'demoSupermarket',
      chartType: 'table',
      dimensions: [
        {
          field: 'product_type',
          alias: '品类',
          encoding: 'column',
        },
        {
          field: 'province',
          alias: '省份',
          encoding: 'column',
        },
      ],
      measures: [
        {
          field: 'sales',
          alias: '销售额',
          encoding: 'column',
          aggregate: {
            func: 'sum',
          },
        },
        {
          field: 'profit',
          alias: '利润',
          encoding: 'column',
          aggregate: {
            func: 'sum',
          },
        },
      ],
      whereFilter: {
        id: 'root',
        op: 'and',
        conditions: [],
      },
      havingFilter: {
        id: 'root',
        op: 'and',
        conditions: [],
      },
      theme: 'light',
      locale: 'zh-CN',
      version: 1,
      limit: 30,
    })

    const applyBuilder = (builder: VBIChartBuilder) => {
      let whereEvents = 0
      let havingEvents = 0
      const stopWhere = builder.whereFilter.observe(() => (whereEvents += 1))
      const stopHaving = builder.havingFilter.observe(() => (havingEvents += 1))

      builder.whereFilter
        .add('order_date', (node) =>
          node.setDate({ type: 'range', start: '2024-01-01', end: '2024-04-01', bounds: '[]' }),
        )
        .add('delivery_date', (node) => node.setDate({ type: 'period', unit: 'year', year: 2024 }))
        .add('delivery_date', (node) => node.setDate({ type: 'period', unit: 'month', year: 2024, month: 2 }))
        .add('delivery_date', (node) => node.setDate({ type: 'period', unit: 'week', year: 2024, week: 8 }))
        .add('delivery_date', (node) => node.setDate({ type: 'period', unit: 'day', date: '2024-02-29' }))
        .add('order_date', (node) => node.setDate({ type: 'relative', mode: 'last', amount: 2, unit: 'year' }))
        .add('order_date', (node) => node.setDate({ type: 'relative', mode: 'next', amount: 1, unit: 'quarter' }))
        .add('order_date', (node) => node.setDate({ type: 'relative', mode: 'last', amount: 3, unit: 'month' }))
        .add('order_date', (node) => node.setDate({ type: 'relative', mode: 'next', amount: 4, unit: 'week' }))
        .add('order_date', (node) => node.setDate({ type: 'relative', mode: 'last', amount: 5, unit: 'day' }))
        .add('order_date', (node) => node.setDate({ type: 'current', unit: 'year', offset: -1 }))
        .add('order_date', (node) => node.setDate({ type: 'current', unit: 'quarter', offset: 1 }))
        .add('order_date', (node) => node.setDate({ type: 'current', unit: 'month' }))
        .add('order_date', (node) => node.setDate({ type: 'current', unit: 'week' }))
        .add('order_date', (node) => node.setDate({ type: 'current', unit: 'day' }))
        .add('area', (node) => node.setOperator('in').setValue(['华东', '华南']))
        .addGroup('or', (group) => {
          group.add('province', (node) => node.setOperator('=').setValue('上海'))
          group.addGroup('and', (nested) => {
            nested.add('customer_type', (node) => node.setOperator('=').setValue('公司'))
            nested.add('discount', (node) => node.setOperator('<').setValue(0.2))
          })
        })

      const areaFilter: any = builder.whereFilter.find((entry: any) => entry.getField?.() === 'area')
      if (!areaFilter || areaFilter.getOperator() !== 'in' || areaFilter.getDate() !== undefined) {
        throw new Error('area filter should remain a non-date in filter')
      }
      areaFilter.setField('country_or_region').setField('area')

      const firstDate: any = builder.whereFilter.find((entry: any) => entry.getField?.() === 'order_date')
      if (!firstDate?.getDate()) {
        throw new Error('date filter should expose date predicate')
      }

      const nestedProvince: any = builder.whereFilter.find((entry: any) => entry.getField?.() === 'province')
      if (!nestedProvince) {
        throw new Error('nested province filter should be searchable')
      }
      builder.whereFilter.update(nestedProvince.getId(), (node) => node.setValue('浙江'))

      const outerGroup: any = builder.whereFilter.find((entry: any) => entry.getOperator?.() === 'or')
      if (!outerGroup || outerGroup.getConditions().length !== 2) {
        throw new Error('outer where group should contain nested filters')
      }
      builder.whereFilter.updateGroup(outerGroup.getId(), (group) => group.setOperator('and'))

      let nodeAsGroupRejected = false
      try {
        builder.whereFilter.updateGroup(areaFilter.getId(), (group) => group.setOperator('or'))
      } catch {
        nodeAsGroupRejected = true
      }
      let groupAsNodeRejected = false
      try {
        builder.whereFilter.update(outerGroup.getId(), (node) => node.setOperator('='))
      } catch {
        groupAsNodeRejected = true
      }
      if (!nodeAsGroupRejected || !groupAsNodeRejected) {
        throw new Error('where filter should reject wrong update target kind')
      }
      builder.whereFilter.remove(-1).remove(999).remove('missing-filter')

      builder.havingFilter
        .add('sales', (node) => node.setOperator('>').setValue(10000).setAggregate({ func: 'sum' }))
        .add('profit', (node) => node.setOperator('between').setValue([0, 5000]).setAggregate({ func: 'avg' }))
        .addGroup('or', (group) => {
          group.add('sales', (node) => node.setOperator('>').setValue(50000).setAggregate({ func: 'max' }))
          group.addGroup('and', (nested) => {
            nested.add('profit', (node) => node.setOperator('>').setValue(1000).setAggregate({ func: 'sum' }))
          })
        })

      const salesHaving: any = builder.havingFilter.find((entry: any) => entry.getField?.() === 'sales')
      if (!salesHaving || salesHaving.getOperator() !== '>' || salesHaving.getAggregate()?.func !== 'sum') {
        throw new Error('sales having filter should expose operator and aggregate')
      }
      builder.havingFilter.update(salesHaving.getId(), (node) => node.setValue(12000))

      const havingGroup: any = builder.havingFilter.find((entry: any) => entry.getOperator?.() === 'or')
      if (!havingGroup || havingGroup.getConditions().length !== 2) {
        throw new Error('having group should contain nested aggregate filters')
      }
      builder.havingFilter.updateGroup(havingGroup.getId(), (group) => group.setOperator('and'))

      let havingNodeAsGroupRejected = false
      try {
        builder.havingFilter.updateGroup(salesHaving.getId(), (group) => group.setOperator('or'))
      } catch {
        havingNodeAsGroupRejected = true
      }
      let havingGroupAsNodeRejected = false
      try {
        builder.havingFilter.update(havingGroup.getId(), (node) => node.setOperator('='))
      } catch {
        havingGroupAsNodeRejected = true
      }
      if (!havingNodeAsGroupRejected || !havingGroupAsNodeRejected) {
        throw new Error('having filter should reject wrong update target kind')
      }
      builder.havingFilter.remove(-1).remove(999).remove('missing-having-filter')

      stopWhere()
      stopHaving()
      if (whereEvents === 0 || havingEvents === 0) {
        throw new Error('filter observers should record changes')
      }
    }
    await applyBuilder(builder)

    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot(`
      {
        "chartType": "table",
        "connectorId": "demoSupermarket",
        "dimensions": [
          {
            "alias": "品类",
            "encoding": "column",
            "field": "product_type",
            "id": "id-3",
          },
          {
            "alias": "省份",
            "encoding": "column",
            "field": "province",
            "id": "id-4",
          },
        ],
        "havingFilter": {
          "conditions": [
            {
              "aggregate": {
                "func": "sum",
              },
              "field": "sales",
              "id": "id-26",
              "op": ">",
              "value": 12000,
            },
            {
              "aggregate": {
                "func": "avg",
              },
              "field": "profit",
              "id": "id-27",
              "op": "between",
              "value": [
                0,
                5000,
              ],
            },
            {
              "conditions": [
                {
                  "aggregate": {
                    "func": "max",
                  },
                  "field": "sales",
                  "id": "id-29",
                  "op": ">",
                  "value": 50000,
                },
                {
                  "conditions": [
                    {
                      "aggregate": {
                        "func": "sum",
                      },
                      "field": "profit",
                      "id": "id-31",
                      "op": ">",
                      "value": 1000,
                    },
                  ],
                  "id": "id-30",
                  "op": "and",
                },
              ],
              "id": "id-28",
              "op": "and",
            },
          ],
          "id": "root",
          "op": "and",
        },
        "limit": 30,
        "locale": "zh-CN",
        "measures": [
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "销售额",
            "encoding": "column",
            "field": "sales",
            "id": "id-1",
          },
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "利润",
            "encoding": "column",
            "field": "profit",
            "id": "id-2",
          },
        ],
        "theme": "light",
        "uuid": "uuid-1",
        "version": 1,
        "whereFilter": {
          "conditions": [
            {
              "field": "order_date",
              "id": "id-5",
              "op": "date",
              "value": {
                "bounds": "[]",
                "end": "2024-04-01",
                "start": "2024-01-01",
                "type": "range",
              },
            },
            {
              "field": "delivery_date",
              "id": "id-6",
              "op": "date",
              "value": {
                "type": "period",
                "unit": "year",
                "year": 2024,
              },
            },
            {
              "field": "delivery_date",
              "id": "id-7",
              "op": "date",
              "value": {
                "month": 2,
                "type": "period",
                "unit": "month",
                "year": 2024,
              },
            },
            {
              "field": "delivery_date",
              "id": "id-8",
              "op": "date",
              "value": {
                "type": "period",
                "unit": "week",
                "week": 8,
                "year": 2024,
              },
            },
            {
              "field": "delivery_date",
              "id": "id-9",
              "op": "date",
              "value": {
                "date": "2024-02-29",
                "type": "period",
                "unit": "day",
              },
            },
            {
              "field": "order_date",
              "id": "id-10",
              "op": "date",
              "value": {
                "amount": 2,
                "mode": "last",
                "type": "relative",
                "unit": "year",
              },
            },
            {
              "field": "order_date",
              "id": "id-11",
              "op": "date",
              "value": {
                "amount": 1,
                "mode": "next",
                "type": "relative",
                "unit": "quarter",
              },
            },
            {
              "field": "order_date",
              "id": "id-12",
              "op": "date",
              "value": {
                "amount": 3,
                "mode": "last",
                "type": "relative",
                "unit": "month",
              },
            },
            {
              "field": "order_date",
              "id": "id-13",
              "op": "date",
              "value": {
                "amount": 4,
                "mode": "next",
                "type": "relative",
                "unit": "week",
              },
            },
            {
              "field": "order_date",
              "id": "id-14",
              "op": "date",
              "value": {
                "amount": 5,
                "mode": "last",
                "type": "relative",
                "unit": "day",
              },
            },
            {
              "field": "order_date",
              "id": "id-15",
              "op": "date",
              "value": {
                "offset": -1,
                "type": "current",
                "unit": "year",
              },
            },
            {
              "field": "order_date",
              "id": "id-16",
              "op": "date",
              "value": {
                "offset": 1,
                "type": "current",
                "unit": "quarter",
              },
            },
            {
              "field": "order_date",
              "id": "id-17",
              "op": "date",
              "value": {
                "type": "current",
                "unit": "month",
              },
            },
            {
              "field": "order_date",
              "id": "id-18",
              "op": "date",
              "value": {
                "type": "current",
                "unit": "week",
              },
            },
            {
              "field": "order_date",
              "id": "id-19",
              "op": "date",
              "value": {
                "type": "current",
                "unit": "day",
              },
            },
            {
              "field": "area",
              "id": "id-20",
              "op": "in",
              "value": [
                "华东",
                "华南",
              ],
            },
            {
              "conditions": [
                {
                  "field": "province",
                  "id": "id-22",
                  "op": "=",
                  "value": "浙江",
                },
                {
                  "conditions": [
                    {
                      "field": "customer_type",
                      "id": "id-24",
                      "op": "=",
                      "value": "公司",
                    },
                    {
                      "field": "discount",
                      "id": "id-25",
                      "op": "<",
                      "value": 0.2,
                    },
                  ],
                  "id": "id-23",
                  "op": "and",
                },
              ],
              "id": "id-21",
              "op": "and",
            },
          ],
          "id": "root",
          "op": "and",
        },
      }
    `)

    const vQueryDSL = builder.buildVQuery()
    expect(vQueryDSL).toMatchInlineSnapshot(`
      {
        "groupBy": [
          "product_type",
          "province",
        ],
        "having": {
          "conditions": [
            {
              "aggr": {
                "func": "sum",
              },
              "field": "sales",
              "op": ">",
              "value": 12000,
            },
            {
              "aggr": {
                "func": "avg",
              },
              "field": "profit",
              "op": "between",
              "value": [
                0,
                5000,
              ],
            },
            {
              "conditions": [
                {
                  "aggr": {
                    "func": "max",
                  },
                  "field": "sales",
                  "op": ">",
                  "value": 50000,
                },
                {
                  "conditions": [
                    {
                      "aggr": {
                        "func": "sum",
                      },
                      "field": "profit",
                      "op": ">",
                      "value": 1000,
                    },
                  ],
                  "op": "and",
                },
              ],
              "op": "and",
            },
          ],
          "op": "and",
        },
        "limit": 30,
        "orderBy": [
          {
            "field": "id-3",
            "order": "asc",
          },
        ],
        "select": [
          {
            "aggr": {
              "func": "sum",
            },
            "alias": "id-1",
            "field": "sales",
          },
          {
            "aggr": {
              "func": "sum",
            },
            "alias": "id-2",
            "field": "profit",
          },
          {
            "alias": "id-3",
            "field": "product_type",
          },
          {
            "alias": "id-4",
            "field": "province",
          },
        ],
        "where": {
          "conditions": [
            {
              "field": "order_date",
              "op": ">=",
              "value": "2024-01-01",
            },
            {
              "field": "order_date",
              "op": "<=",
              "value": "2024-04-01",
            },
            {
              "field": "delivery_date",
              "op": ">=",
              "value": "2024-01-01",
            },
            {
              "field": "delivery_date",
              "op": "<",
              "value": "2025-01-01",
            },
            {
              "field": "delivery_date",
              "op": ">=",
              "value": "2024-02-01",
            },
            {
              "field": "delivery_date",
              "op": "<",
              "value": "2024-03-01",
            },
            {
              "field": "delivery_date",
              "op": ">=",
              "value": "2024-02-19",
            },
            {
              "field": "delivery_date",
              "op": "<",
              "value": "2024-02-26",
            },
            {
              "field": "delivery_date",
              "op": ">=",
              "value": "2024-02-29",
            },
            {
              "field": "delivery_date",
              "op": "<",
              "value": "2024-03-01",
            },
            {
              "field": "order_date",
              "op": ">=",
              "value": "2024-03-23",
            },
            {
              "field": "order_date",
              "op": "<",
              "value": "2026-03-23",
            },
            {
              "field": "order_date",
              "op": ">=",
              "value": "2026-03-23",
            },
            {
              "field": "order_date",
              "op": "<",
              "value": "2026-06-23",
            },
            {
              "field": "order_date",
              "op": ">=",
              "value": "2025-12-23",
            },
            {
              "field": "order_date",
              "op": "<",
              "value": "2026-03-23",
            },
            {
              "field": "order_date",
              "op": ">=",
              "value": "2026-03-23",
            },
            {
              "field": "order_date",
              "op": "<",
              "value": "2026-04-20",
            },
            {
              "field": "order_date",
              "op": ">=",
              "value": "2026-03-18",
            },
            {
              "field": "order_date",
              "op": "<",
              "value": "2026-03-23",
            },
            {
              "field": "order_date",
              "op": ">=",
              "value": "2025-01-01",
            },
            {
              "field": "order_date",
              "op": "<",
              "value": "2026-01-01",
            },
            {
              "field": "order_date",
              "op": ">=",
              "value": "2026-04-01",
            },
            {
              "field": "order_date",
              "op": "<",
              "value": "2026-07-01",
            },
            {
              "field": "order_date",
              "op": ">=",
              "value": "2026-03-01",
            },
            {
              "field": "order_date",
              "op": "<",
              "value": "2026-04-01",
            },
            {
              "field": "order_date",
              "op": ">=",
              "value": "2026-03-23",
            },
            {
              "field": "order_date",
              "op": "<",
              "value": "2026-03-30",
            },
            {
              "field": "order_date",
              "op": ">=",
              "value": "2026-03-23",
            },
            {
              "field": "order_date",
              "op": "<",
              "value": "2026-03-24",
            },
            {
              "field": "area",
              "op": "in",
              "value": [
                "华东",
                "华南",
              ],
            },
            {
              "conditions": [
                {
                  "field": "province",
                  "op": "=",
                  "value": "浙江",
                },
                {
                  "conditions": [
                    {
                      "field": "customer_type",
                      "op": "=",
                      "value": "公司",
                    },
                    {
                      "field": "discount",
                      "op": "<",
                      "value": 0.2,
                    },
                  ],
                  "op": "and",
                },
              ],
              "op": "and",
            },
          ],
          "op": "and",
        },
      }
    `)

    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot(`
      {
        "chartType": "table",
        "dataset": [],
        "dimensions": [
          {
            "alias": "品类",
            "encoding": "column",
            "id": "id-3",
          },
          {
            "alias": "省份",
            "encoding": "column",
            "id": "id-4",
          },
        ],
        "locale": "zh-CN",
        "measures": [
          {
            "alias": "销售额",
            "encoding": "column",
            "id": "id-1",
          },
          {
            "alias": "利润",
            "encoding": "column",
            "id": "id-2",
          },
        ],
        "theme": "light",
      }
    `)
  })
})
