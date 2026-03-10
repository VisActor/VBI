import { VBI, VBIBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

describe('ChartType', () => {
  beforeAll(async () => {
    registerDemoConnector()
  })

  it('area-by-order-date', async () => {
    const builder = VBI.from({
      connectorId: 'demoSupermarket',
      chartType: 'area',
      dimensions: [
        {
          field: 'order_date',
          alias: '订单日期',
        },
      ],
      measures: [
        {
          field: 'sales',
          alias: '销售额',
          encoding: 'yAxis',
          aggregate: {
            func: 'sum',
          },
        },
      ],
      whereFilters: [],
      havingFilters: [],
      theme: 'light',
      locale: 'zh-CN',
      version: 1,
      limit: 50,
    })

    // Apply custom builder code
    const applyBuilder = (builder: VBIBuilder) => {
      builder.chartType.changeChartType('line')
    }
    applyBuilder(builder)

    // Build VBI DSL
    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot(`
      {
        "chartType": "line",
        "connectorId": "demoSupermarket",
        "dimensions": [
          {
            "alias": "订单日期",
            "field": "order_date",
          },
        ],
        "havingFilters": [],
        "limit": 50,
        "locale": "zh-CN",
        "measures": [
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "销售额",
            "encoding": "yAxis",
            "field": "sales",
          },
        ],
        "theme": "light",
        "version": 1,
        "whereFilters": {
          "conditions": [],
          "id": "00000000-0000-0000-0000-000000000000",
          "op": "AND",
        },
      }
    `)

    // Build VQuery DSL
    const vQueryDSL = builder.buildVQuery()
    expect(vQueryDSL).toMatchInlineSnapshot(`
      {
        "groupBy": [
          "order_date",
        ],
        "limit": 50,
        "select": [
          {
            "aggr": {
              "func": "sum",
            },
            "alias": "销售额",
            "field": "sales",
          },
          {
            "alias": "订单日期",
            "field": "order_date",
          },
        ],
      }
    `)

    // Build VSeed DSL
    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot(`
      {
        "chartType": "line",
        "dataset": [
          {
            "订单日期": "2019-04-27",
            "销售额": 1177.9040000000002,
          },
          {
            "订单日期": "2019-06-15",
            "销售额": 37081.73,
          },
          {
            "订单日期": "2019-06-16",
            "销售额": 680.456,
          },
          {
            "订单日期": "2019-12-09",
            "销售额": 13185.676,
          },
          {
            "订单日期": "2018-05-31",
            "销售额": 13957.887999999999,
          },
          {
            "订单日期": "2017-10-27",
            "销售额": 38545.556000000004,
          },
          {
            "订单日期": "2016-12-22",
            "销售额": 8793.96,
          },
          {
            "订单日期": "2019-06-01",
            "销售额": 18953.983999999997,
          },
          {
            "订单日期": "2017-06-05",
            "销售额": 18350.640000000003,
          },
          {
            "订单日期": "2018-11-22",
            "销售额": 52784.92800000001,
          },
          {
            "订单日期": "2019-10-02",
            "销售额": 19120.752,
          },
          {
            "订单日期": "2019-10-03",
            "销售额": 16991.296,
          },
          {
            "订单日期": "2018-06-07",
            "销售额": 20362.215999999997,
          },
          {
            "订单日期": "2019-12-12",
            "销售额": 10353,
          },
          {
            "订单日期": "2019-09-28",
            "销售额": 29760.5,
          },
          {
            "订单日期": "2018-11-19",
            "销售额": 22961.092000000004,
          },
          {
            "订单日期": "2018-02-28",
            "销售额": 8281.392,
          },
          {
            "订单日期": "2018-09-03",
            "销售额": 17758.636000000002,
          },
          {
            "订单日期": "2018-09-17",
            "销售额": 39010.831999999995,
          },
          {
            "订单日期": "2018-07-02",
            "销售额": 6131.608,
          },
          {
            "订单日期": "2018-07-26",
            "销售额": 19797.260000000002,
          },
          {
            "订单日期": "2018-12-24",
            "销售额": 13325.536,
          },
          {
            "订单日期": "2016-05-17",
            "销售额": 18015.256,
          },
          {
            "订单日期": "2018-07-16",
            "销售额": 697.9,
          },
          {
            "订单日期": "2018-06-16",
            "销售额": 5109.888,
          },
          {
            "订单日期": "2019-06-20",
            "销售额": 37737.224,
          },
          {
            "订单日期": "2018-05-22",
            "销售额": 29687.447999999993,
          },
          {
            "订单日期": "2018-12-31",
            "销售额": 27717.9,
          },
          {
            "订单日期": "2018-10-01",
            "销售额": 15849.33,
          },
          {
            "订单日期": "2019-11-16",
            "销售额": 5586.672,
          },
          {
            "订单日期": "2016-08-24",
            "销售额": 12705.027999999998,
          },
          {
            "订单日期": "2016-01-21",
            "销售额": 2352.7,
          },
          {
            "订单日期": "2019-09-15",
            "销售额": 35209.10400000001,
          },
          {
            "订单日期": "2016-12-19",
            "销售额": 19011.328,
          },
          {
            "订单日期": "2016-10-31",
            "销售额": 22820.42,
          },
          {
            "订单日期": "2018-03-11",
            "销售额": 4781.000000000001,
          },
          {
            "订单日期": "2017-09-27",
            "销售额": 8190.056000000001,
          },
          {
            "订单日期": "2017-09-15",
            "销售额": 6090.111999999999,
          },
          {
            "订单日期": "2019-10-26",
            "销售额": 18299.848,
          },
          {
            "订单日期": "2016-02-02",
            "销售额": 13903.05,
          },
          {
            "订单日期": "2016-12-23",
            "销售额": 11902.1,
          },
          {
            "订单日期": "2018-08-08",
            "销售额": 25530.176,
          },
          {
            "订单日期": "2017-08-22",
            "销售额": 10396.932,
          },
          {
            "订单日期": "2016-06-01",
            "销售额": 9118.13,
          },
          {
            "订单日期": "2019-05-28",
            "销售额": 29354.066000000003,
          },
          {
            "订单日期": "2016-12-14",
            "销售额": 12066.768,
          },
          {
            "订单日期": "2016-11-17",
            "销售额": 12135.508,
          },
          {
            "订单日期": "2019-05-21",
            "销售额": 43030.623999999996,
          },
          {
            "订单日期": "2019-11-10",
            "销售额": 26382.58,
          },
          {
            "订单日期": "2017-01-25",
            "销售额": 2753.464,
          },
        ],
        "locale": "zh-CN",
        "theme": "light",
      }
    `)
  })

  it('bar-by-product-type', async () => {
    const builder = VBI.from({
      connectorId: 'demoSupermarket',
      chartType: 'bar',
      dimensions: [
        {
          field: 'product_type',
          alias: '产品类型',
        },
      ],
      measures: [
        {
          field: 'sales',
          alias: '销售额',
          encoding: 'xAxis',
          aggregate: {
            func: 'sum',
          },
        },
      ],
      whereFilters: [],
      havingFilters: [],
      theme: 'light',
      locale: 'zh-CN',
      version: 1,
      limit: 50,
    })

    // Apply custom builder code
    const applyBuilder = (builder: VBIBuilder) => {
      builder.chartType.changeChartType('column')
    }
    applyBuilder(builder)

    // Build VBI DSL
    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot(`
      {
        "chartType": "column",
        "connectorId": "demoSupermarket",
        "dimensions": [
          {
            "alias": "产品类型",
            "field": "product_type",
          },
        ],
        "havingFilters": [],
        "limit": 50,
        "locale": "zh-CN",
        "measures": [
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "销售额",
            "encoding": "xAxis",
            "field": "sales",
          },
        ],
        "theme": "light",
        "version": 1,
        "whereFilters": {
          "conditions": [],
          "id": "00000000-0000-0000-0000-000000000000",
          "op": "AND",
        },
      }
    `)

    // Build VQuery DSL
    const vQueryDSL = builder.buildVQuery()
    expect(vQueryDSL).toMatchInlineSnapshot(`
      {
        "groupBy": [
          "product_type",
        ],
        "limit": 50,
        "select": [
          {
            "aggr": {
              "func": "sum",
            },
            "alias": "销售额",
            "field": "sales",
          },
          {
            "alias": "产品类型",
            "field": "product_type",
          },
        ],
      }
    `)

    // Build VSeed DSL
    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot(`
      {
        "chartType": "column",
        "dataset": [
          {
            "产品类型": "办公用品",
            "销售额": 4865589.791999991,
          },
          {
            "产品类型": "技术",
            "销售额": 5469023.503999994,
          },
          {
            "产品类型": "家具",
            "销售额": 5734340.829,
          },
        ],
        "locale": "zh-CN",
        "theme": "light",
      }
    `)
  })

  it('chart-type-switching', async () => {
    const builder = VBI.from({
      connectorId: 'demoSupermarket',
      chartType: 'line',
      dimensions: [
        {
          field: 'province',
          alias: '省份',
        },
      ],
      measures: [
        {
          field: 'sales',
          alias: '销售额',
          encoding: 'yAxis',
          aggregate: {
            func: 'sum',
          },
        },
      ],
      whereFilters: [],
      havingFilters: [],
      theme: 'light',
      locale: 'zh-CN',
      version: 1,
      limit: 50,
    })

    // Apply custom builder code
    const applyBuilder = (builder: VBIBuilder) => {
      builder.chartType.changeChartType('columnParallel')
    }
    applyBuilder(builder)

    // Build VBI DSL
    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot(`
      {
        "chartType": "columnParallel",
        "connectorId": "demoSupermarket",
        "dimensions": [
          {
            "alias": "省份",
            "field": "province",
          },
        ],
        "havingFilters": [],
        "limit": 50,
        "locale": "zh-CN",
        "measures": [
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "销售额",
            "encoding": "yAxis",
            "field": "sales",
          },
        ],
        "theme": "light",
        "version": 1,
        "whereFilters": {
          "conditions": [],
          "id": "00000000-0000-0000-0000-000000000000",
          "op": "AND",
        },
      }
    `)

    // Build VQuery DSL
    const vQueryDSL = builder.buildVQuery()
    expect(vQueryDSL).toMatchInlineSnapshot(`
      {
        "groupBy": [
          "province",
        ],
        "limit": 50,
        "select": [
          {
            "aggr": {
              "func": "sum",
            },
            "alias": "销售额",
            "field": "sales",
          },
          {
            "alias": "省份",
            "field": "province",
          },
        ],
      }
    `)

    // Build VSeed DSL
    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot(`
      {
        "chartType": "columnParallel",
        "dataset": [
          {
            "省份": "浙江",
            "销售额": 452108.2440000001,
          },
          {
            "省份": "四川",
            "销售额": 400877.5960000003,
          },
          {
            "省份": "江苏",
            "销售额": 649967.2200000006,
          },
          {
            "省份": "广东",
            "销售额": 1452929.5129999993,
          },
          {
            "省份": "江西",
            "销售额": 237328.70000000013,
          },
          {
            "省份": "陕西",
            "销售额": 457688.16800000006,
          },
          {
            "省份": "黑龙江",
            "销售额": 1178801.1620000016,
          },
          {
            "省份": "山东",
            "销售额": 1586782.9879999978,
          },
          {
            "省份": "上海",
            "销售额": 582450.5679999999,
          },
          {
            "省份": "河北",
            "销售额": 790915.405,
          },
          {
            "省份": "福建",
            "销售额": 546903.5320000001,
          },
          {
            "省份": "安徽",
            "销售额": 628965.1899999997,
          },
          {
            "省份": "甘肃",
            "销售额": 179270.02800000008,
          },
          {
            "省份": "吉林",
            "销售额": 640196.5709999998,
          },
          {
            "省份": "辽宁",
            "销售额": 862569.7359999995,
          },
          {
            "省份": "湖北",
            "销售额": 621960.3320000009,
          },
          {
            "省份": "河南",
            "销售额": 853574.798999999,
          },
          {
            "省份": "湖南",
            "销售额": 723442.2090000004,
          },
          {
            "省份": "北京",
            "销售额": 409147.2,
          },
          {
            "省份": "重庆",
            "销售额": 361761.9320000001,
          },
          {
            "省份": "青海",
            "销售额": 49863.38,
          },
          {
            "省份": "广西",
            "销售额": 377653.82899999997,
          },
          {
            "省份": "天津",
            "销售额": 549906.6300000001,
          },
          {
            "省份": "云南",
            "销售额": 360925.76800000016,
          },
          {
            "省份": "海南",
            "销售额": 169256.84300000002,
          },
          {
            "省份": "贵州",
            "销售额": 108141.59999999999,
          },
          {
            "省份": "山西",
            "销售额": 423878.76999999967,
          },
          {
            "省份": "内蒙古",
            "销售额": 273453.01199999993,
          },
          {
            "省份": "宁夏",
            "销售额": 58121,
          },
          {
            "省份": "新疆",
            "销售额": 70097.02,
          },
          {
            "省份": "西藏自治区",
            "销售额": 10015.18,
          },
        ],
        "locale": "zh-CN",
        "theme": "light",
      }
    `)
  })

  it('column-by-area', async () => {
    const builder = VBI.from({
      connectorId: 'demoSupermarket',
      chartType: 'column',
      dimensions: [
        {
          field: 'area',
          alias: '区域',
        },
      ],
      measures: [
        {
          field: 'sales',
          alias: '销售额',
          encoding: 'yAxis',
          aggregate: {
            func: 'sum',
          },
        },
      ],
      whereFilters: [],
      havingFilters: [],
      theme: 'light',
      locale: 'zh-CN',
      version: 1,
      limit: 50,
    })

    // Apply custom builder code
    const applyBuilder = (builder: VBIBuilder) => {
      builder.chartType.changeChartType('bar')
    }
    applyBuilder(builder)

    // Build VBI DSL
    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot(`
      {
        "chartType": "bar",
        "connectorId": "demoSupermarket",
        "dimensions": [
          {
            "alias": "区域",
            "field": "area",
          },
        ],
        "havingFilters": [],
        "limit": 50,
        "locale": "zh-CN",
        "measures": [
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "销售额",
            "encoding": "yAxis",
            "field": "sales",
          },
        ],
        "theme": "light",
        "version": 1,
        "whereFilters": {
          "conditions": [],
          "id": "00000000-0000-0000-0000-000000000000",
          "op": "AND",
        },
      }
    `)

    // Build VQuery DSL
    const vQueryDSL = builder.buildVQuery()
    expect(vQueryDSL).toMatchInlineSnapshot(`
      {
        "groupBy": [
          "area",
        ],
        "limit": 50,
        "select": [
          {
            "aggr": {
              "func": "sum",
            },
            "alias": "销售额",
            "field": "sales",
          },
          {
            "alias": "区域",
            "field": "area",
          },
        ],
      }
    `)

    // Build VSeed DSL
    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot(`
      {
        "chartType": "bar",
        "dataset": [
          {
            "区域": "华东",
            "销售额": 4684506.442,
          },
          {
            "区域": "西南",
            "销售额": 1303124.508000002,
          },
          {
            "区域": "中南",
            "销售额": 4137415.0929999948,
          },
          {
            "区域": "西北",
            "销售额": 815039.5959999998,
          },
          {
            "区域": "东北",
            "销售额": 2681567.469000001,
          },
          {
            "区域": "华北",
            "销售额": 2447301.017000004,
          },
        ],
        "locale": "zh-CN",
        "theme": "light",
      }
    `)
  })

  it('donut-by-customer-type', async () => {
    const builder = VBI.from({
      connectorId: 'demoSupermarket',
      chartType: 'donut',
      dimensions: [
        {
          field: 'customer_type',
          alias: '客户类型',
        },
      ],
      measures: [
        {
          field: 'sales',
          alias: '销售额',
          encoding: 'angle',
          aggregate: {
            func: 'sum',
          },
        },
      ],
      whereFilters: [],
      havingFilters: [],
      theme: 'light',
      locale: 'zh-CN',
      version: 1,
      limit: 50,
    })

    // Apply custom builder code
    const applyBuilder = (builder: VBIBuilder) => {
      builder.chartType.changeChartType('pie')
    }
    applyBuilder(builder)

    // Build VBI DSL
    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot(`
      {
        "chartType": "pie",
        "connectorId": "demoSupermarket",
        "dimensions": [
          {
            "alias": "客户类型",
            "field": "customer_type",
          },
        ],
        "havingFilters": [],
        "limit": 50,
        "locale": "zh-CN",
        "measures": [
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "销售额",
            "encoding": "angle",
            "field": "sales",
          },
        ],
        "theme": "light",
        "version": 1,
        "whereFilters": {
          "conditions": [],
          "id": "00000000-0000-0000-0000-000000000000",
          "op": "AND",
        },
      }
    `)

    // Build VQuery DSL
    const vQueryDSL = builder.buildVQuery()
    expect(vQueryDSL).toMatchInlineSnapshot(`
      {
        "groupBy": [
          "customer_type",
        ],
        "limit": 50,
        "select": [
          {
            "aggr": {
              "func": "sum",
            },
            "alias": "销售额",
            "field": "sales",
          },
          {
            "alias": "客户类型",
            "field": "customer_type",
          },
        ],
      }
    `)

    // Build VSeed DSL
    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot(`
      {
        "chartType": "pie",
        "dataset": [
          {
            "客户类型": "公司",
            "销售额": 5152793.296000013,
          },
          {
            "客户类型": "消费者",
            "销售额": 8025072.187999996,
          },
          {
            "客户类型": "小型企业",
            "销售额": 2891088.6410000017,
          },
        ],
        "locale": "zh-CN",
        "theme": "light",
      }
    `)
  })

  it('line-by-province', async () => {
    const builder = VBI.from({
      connectorId: 'demoSupermarket',
      chartType: 'line',
      dimensions: [
        {
          field: 'province',
          alias: '省份',
        },
      ],
      measures: [
        {
          field: 'sales',
          alias: '销售额',
          encoding: 'yAxis',
          aggregate: {
            func: 'sum',
          },
        },
      ],
      whereFilters: [],
      havingFilters: [],
      theme: 'light',
      locale: 'zh-CN',
      version: 1,
      limit: 50,
    })

    // Apply custom builder code
    const applyBuilder = (builder: VBIBuilder) => {
      builder.chartType.changeChartType('area')
    }
    applyBuilder(builder)

    // Build VBI DSL
    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot(`
      {
        "chartType": "area",
        "connectorId": "demoSupermarket",
        "dimensions": [
          {
            "alias": "省份",
            "field": "province",
          },
        ],
        "havingFilters": [],
        "limit": 50,
        "locale": "zh-CN",
        "measures": [
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "销售额",
            "encoding": "yAxis",
            "field": "sales",
          },
        ],
        "theme": "light",
        "version": 1,
        "whereFilters": {
          "conditions": [],
          "id": "00000000-0000-0000-0000-000000000000",
          "op": "AND",
        },
      }
    `)

    // Build VQuery DSL
    const vQueryDSL = builder.buildVQuery()
    expect(vQueryDSL).toMatchInlineSnapshot(`
      {
        "groupBy": [
          "province",
        ],
        "limit": 50,
        "select": [
          {
            "aggr": {
              "func": "sum",
            },
            "alias": "销售额",
            "field": "sales",
          },
          {
            "alias": "省份",
            "field": "province",
          },
        ],
      }
    `)

    // Build VSeed DSL
    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot(`
      {
        "chartType": "area",
        "dataset": [
          {
            "省份": "浙江",
            "销售额": 452108.2440000001,
          },
          {
            "省份": "四川",
            "销售额": 400877.5960000003,
          },
          {
            "省份": "江苏",
            "销售额": 649967.2200000006,
          },
          {
            "省份": "广东",
            "销售额": 1452929.5129999993,
          },
          {
            "省份": "江西",
            "销售额": 237328.70000000013,
          },
          {
            "省份": "陕西",
            "销售额": 457688.16800000006,
          },
          {
            "省份": "黑龙江",
            "销售额": 1178801.1620000016,
          },
          {
            "省份": "山东",
            "销售额": 1586782.9879999978,
          },
          {
            "省份": "上海",
            "销售额": 582450.5679999999,
          },
          {
            "省份": "河北",
            "销售额": 790915.405,
          },
          {
            "省份": "福建",
            "销售额": 546903.5320000001,
          },
          {
            "省份": "安徽",
            "销售额": 628965.1899999997,
          },
          {
            "省份": "甘肃",
            "销售额": 179270.02800000008,
          },
          {
            "省份": "吉林",
            "销售额": 640196.5709999998,
          },
          {
            "省份": "辽宁",
            "销售额": 862569.7359999995,
          },
          {
            "省份": "湖北",
            "销售额": 621960.3320000009,
          },
          {
            "省份": "河南",
            "销售额": 853574.798999999,
          },
          {
            "省份": "湖南",
            "销售额": 723442.2090000004,
          },
          {
            "省份": "北京",
            "销售额": 409147.2,
          },
          {
            "省份": "重庆",
            "销售额": 361761.9320000001,
          },
          {
            "省份": "青海",
            "销售额": 49863.38,
          },
          {
            "省份": "广西",
            "销售额": 377653.82899999997,
          },
          {
            "省份": "天津",
            "销售额": 549906.6300000001,
          },
          {
            "省份": "云南",
            "销售额": 360925.76800000016,
          },
          {
            "省份": "海南",
            "销售额": 169256.84300000002,
          },
          {
            "省份": "贵州",
            "销售额": 108141.59999999999,
          },
          {
            "省份": "山西",
            "销售额": 423878.76999999967,
          },
          {
            "省份": "内蒙古",
            "销售额": 273453.01199999993,
          },
          {
            "省份": "宁夏",
            "销售额": 58121,
          },
          {
            "省份": "新疆",
            "销售额": 70097.02,
          },
          {
            "省份": "西藏自治区",
            "销售额": 10015.18,
          },
        ],
        "locale": "zh-CN",
        "theme": "light",
      }
    `)
  })

  it('line-chart', async () => {
    const builder = VBI.from({
      connectorId: 'demoSupermarket',
      chartType: 'line',
      dimensions: [
        {
          field: 'province',
          alias: '省份',
        },
      ],
      measures: [
        {
          field: 'sales',
          alias: '销售额',
          encoding: 'yAxis',
          aggregate: {
            func: 'sum',
          },
        },
      ],
      whereFilters: [],
      havingFilters: [],
      theme: 'light',
      locale: 'zh-CN',
      version: 1,
      limit: 50,
    })

    // Apply custom builder code
    const applyBuilder = (builder: VBIBuilder) => {
      builder.chartType.changeChartType('area')
    }
    applyBuilder(builder)

    // Build VBI DSL
    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot(`
      {
        "chartType": "area",
        "connectorId": "demoSupermarket",
        "dimensions": [
          {
            "alias": "省份",
            "field": "province",
          },
        ],
        "havingFilters": [],
        "limit": 50,
        "locale": "zh-CN",
        "measures": [
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "销售额",
            "encoding": "yAxis",
            "field": "sales",
          },
        ],
        "theme": "light",
        "version": 1,
        "whereFilters": {
          "conditions": [],
          "id": "00000000-0000-0000-0000-000000000000",
          "op": "AND",
        },
      }
    `)

    // Build VQuery DSL
    const vQueryDSL = builder.buildVQuery()
    expect(vQueryDSL).toMatchInlineSnapshot(`
      {
        "groupBy": [
          "province",
        ],
        "limit": 50,
        "select": [
          {
            "aggr": {
              "func": "sum",
            },
            "alias": "销售额",
            "field": "sales",
          },
          {
            "alias": "省份",
            "field": "province",
          },
        ],
      }
    `)

    // Build VSeed DSL
    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot(`
      {
        "chartType": "area",
        "dataset": [
          {
            "省份": "浙江",
            "销售额": 452108.2440000001,
          },
          {
            "省份": "四川",
            "销售额": 400877.5960000003,
          },
          {
            "省份": "江苏",
            "销售额": 649967.2200000006,
          },
          {
            "省份": "广东",
            "销售额": 1452929.5129999993,
          },
          {
            "省份": "江西",
            "销售额": 237328.70000000013,
          },
          {
            "省份": "陕西",
            "销售额": 457688.16800000006,
          },
          {
            "省份": "黑龙江",
            "销售额": 1178801.1620000016,
          },
          {
            "省份": "山东",
            "销售额": 1586782.9879999978,
          },
          {
            "省份": "上海",
            "销售额": 582450.5679999999,
          },
          {
            "省份": "河北",
            "销售额": 790915.405,
          },
          {
            "省份": "福建",
            "销售额": 546903.5320000001,
          },
          {
            "省份": "安徽",
            "销售额": 628965.1899999997,
          },
          {
            "省份": "甘肃",
            "销售额": 179270.02800000008,
          },
          {
            "省份": "吉林",
            "销售额": 640196.5709999998,
          },
          {
            "省份": "辽宁",
            "销售额": 862569.7359999995,
          },
          {
            "省份": "湖北",
            "销售额": 621960.3320000009,
          },
          {
            "省份": "河南",
            "销售额": 853574.798999999,
          },
          {
            "省份": "湖南",
            "销售额": 723442.2090000004,
          },
          {
            "省份": "北京",
            "销售额": 409147.2,
          },
          {
            "省份": "重庆",
            "销售额": 361761.9320000001,
          },
          {
            "省份": "青海",
            "销售额": 49863.38,
          },
          {
            "省份": "广西",
            "销售额": 377653.82899999997,
          },
          {
            "省份": "天津",
            "销售额": 549906.6300000001,
          },
          {
            "省份": "云南",
            "销售额": 360925.76800000016,
          },
          {
            "省份": "海南",
            "销售额": 169256.84300000002,
          },
          {
            "省份": "贵州",
            "销售额": 108141.59999999999,
          },
          {
            "省份": "山西",
            "销售额": 423878.76999999967,
          },
          {
            "省份": "内蒙古",
            "销售额": 273453.01199999993,
          },
          {
            "省份": "宁夏",
            "销售额": 58121,
          },
          {
            "省份": "新疆",
            "销售额": 70097.02,
          },
          {
            "省份": "西藏自治区",
            "销售额": 10015.18,
          },
        ],
        "locale": "zh-CN",
        "theme": "light",
      }
    `)
  })

  it('pie-by-area', async () => {
    const builder = VBI.from({
      connectorId: 'demoSupermarket',
      chartType: 'pie',
      dimensions: [
        {
          field: 'area',
          alias: '区域',
        },
      ],
      measures: [
        {
          field: 'sales',
          alias: '销售额',
          encoding: 'size',
          aggregate: {
            func: 'sum',
          },
        },
      ],
      whereFilters: [],
      havingFilters: [],
      theme: 'light',
      locale: 'zh-CN',
      version: 1,
      limit: 50,
    })

    // Apply custom builder code
    const applyBuilder = (builder: VBIBuilder) => {
      builder.chartType.changeChartType('donut')
    }
    applyBuilder(builder)

    // Build VBI DSL
    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot(`
      {
        "chartType": "donut",
        "connectorId": "demoSupermarket",
        "dimensions": [
          {
            "alias": "区域",
            "field": "area",
          },
        ],
        "havingFilters": [],
        "limit": 50,
        "locale": "zh-CN",
        "measures": [
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "销售额",
            "encoding": "size",
            "field": "sales",
          },
        ],
        "theme": "light",
        "version": 1,
        "whereFilters": {
          "conditions": [],
          "id": "00000000-0000-0000-0000-000000000000",
          "op": "AND",
        },
      }
    `)

    // Build VQuery DSL
    const vQueryDSL = builder.buildVQuery()
    expect(vQueryDSL).toMatchInlineSnapshot(`
      {
        "groupBy": [
          "area",
        ],
        "limit": 50,
        "select": [
          {
            "aggr": {
              "func": "sum",
            },
            "alias": "销售额",
            "field": "sales",
          },
          {
            "alias": "区域",
            "field": "area",
          },
        ],
      }
    `)

    // Build VSeed DSL
    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot(`
      {
        "chartType": "donut",
        "dataset": [
          {
            "区域": "华东",
            "销售额": 4684506.442,
          },
          {
            "区域": "西南",
            "销售额": 1303124.508000002,
          },
          {
            "区域": "中南",
            "销售额": 4137415.0929999948,
          },
          {
            "区域": "西北",
            "销售额": 815039.5959999998,
          },
          {
            "区域": "东北",
            "销售额": 2681567.469000001,
          },
          {
            "区域": "华北",
            "销售额": 2447301.017000004,
          },
        ],
        "locale": "zh-CN",
        "theme": "light",
      }
    `)
  })

  it('rose-by-city', async () => {
    const builder = VBI.from({
      connectorId: 'demoSupermarket',
      chartType: 'rose',
      dimensions: [
        {
          field: 'city',
          alias: '城市',
        },
      ],
      measures: [
        {
          field: 'sales',
          alias: '销售额',
          encoding: 'radius',
          aggregate: {
            func: 'sum',
          },
        },
      ],
      whereFilters: [],
      havingFilters: [],
      theme: 'light',
      locale: 'zh-CN',
      version: 1,
      limit: 50,
    })

    // Apply custom builder code
    const applyBuilder = (builder: VBIBuilder) => {
      builder.chartType.changeChartType('pie')
    }
    applyBuilder(builder)

    // Build VBI DSL
    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot(`
      {
        "chartType": "pie",
        "connectorId": "demoSupermarket",
        "dimensions": [
          {
            "alias": "城市",
            "field": "city",
          },
        ],
        "havingFilters": [],
        "limit": 50,
        "locale": "zh-CN",
        "measures": [
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "销售额",
            "encoding": "radius",
            "field": "sales",
          },
        ],
        "theme": "light",
        "version": 1,
        "whereFilters": {
          "conditions": [],
          "id": "00000000-0000-0000-0000-000000000000",
          "op": "AND",
        },
      }
    `)

    // Build VQuery DSL
    const vQueryDSL = builder.buildVQuery()
    expect(vQueryDSL).toMatchInlineSnapshot(`
      {
        "groupBy": [
          "city",
        ],
        "limit": 50,
        "select": [
          {
            "aggr": {
              "func": "sum",
            },
            "alias": "销售额",
            "field": "sales",
          },
          {
            "alias": "城市",
            "field": "city",
          },
        ],
      }
    `)

    // Build VSeed DSL
    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot(`
      {
        "chartType": "pie",
        "dataset": [
          {
            "城市": "杭州",
            "销售额": 108758.94400000008,
          },
          {
            "城市": "内江",
            "销售额": 43502.787999999986,
          },
          {
            "城市": "镇江",
            "销售额": 12133.044000000002,
          },
          {
            "城市": "汕头",
            "销售额": 118704.57199999999,
          },
          {
            "城市": "景德镇",
            "销售额": 68907.3,
          },
          {
            "城市": "榆林",
            "销售额": 42384.72,
          },
          {
            "城市": "哈尔滨",
            "销售额": 205688.23099999994,
          },
          {
            "城市": "青岛",
            "销售额": 206316.264,
          },
          {
            "城市": "徐州",
            "销售额": 89802.636,
          },
          {
            "城市": "上海",
            "销售额": 582450.5679999999,
          },
          {
            "城市": "温岭",
            "销售额": 13616.148,
          },
          {
            "城市": "唐山",
            "销售额": 94901.94000000005,
          },
          {
            "城市": "宁波",
            "销售额": 31039.96,
          },
          {
            "城市": "厦门",
            "销售额": 144801.94400000002,
          },
          {
            "城市": "宿州",
            "销售额": 137112.39499999996,
          },
          {
            "城市": "兰州",
            "销售额": 42543.144,
          },
          {
            "城市": "淮阴",
            "销售额": 17803.323999999997,
          },
          {
            "城市": "肇源",
            "销售额": 32549.16,
          },
          {
            "城市": "南昌",
            "销售额": 46190.62,
          },
          {
            "城市": "合肥",
            "销售额": 82420.54800000002,
          },
          {
            "城市": "蛟河",
            "销售额": 18419.800000000007,
          },
          {
            "城市": "沈阳",
            "销售额": 239248.80000000002,
          },
          {
            "城市": "黄石",
            "销售额": 33450.647999999994,
          },
          {
            "城市": "西安",
            "销售额": 226679.60000000012,
          },
          {
            "城市": "阳江",
            "销售额": 31990.420000000002,
          },
          {
            "城市": "邓州",
            "销售额": 25383.54,
          },
          {
            "城市": "曲阜",
            "销售额": 8541.960000000001,
          },
          {
            "城市": "湛江",
            "销售额": 49778.68,
          },
          {
            "城市": "孝感",
            "销售额": 18652.256,
          },
          {
            "城市": "浏阳",
            "销售额": 9254.196,
          },
          {
            "城市": "滕州",
            "销售额": 51497.04,
          },
          {
            "城市": "北京",
            "销售额": 376814.9000000002,
          },
          {
            "城市": "重庆",
            "销售额": 275639.78400000004,
          },
          {
            "城市": "椒江",
            "销售额": 9225.888,
          },
          {
            "城市": "叶柏寿",
            "销售额": 1199.716,
          },
          {
            "城市": "西宁",
            "销售额": 49863.38,
          },
          {
            "城市": "绵阳",
            "销售额": 36038.436,
          },
          {
            "城市": "武汉",
            "销售额": 229902.6519999999,
          },
          {
            "城市": "韩城",
            "销售额": 1854.2999999999997,
          },
          {
            "城市": "盐城",
            "销售额": 33058.984000000004,
          },
          {
            "城市": "南宁",
            "销售额": 118154.078,
          },
          {
            "城市": "泉州",
            "销售额": 101808.84,
          },
          {
            "城市": "天津",
            "销售额": 471183.5099999999,
          },
          {
            "城市": "七台河",
            "销售额": 52827.32000000001,
          },
          {
            "城市": "扬州",
            "销售额": 40860.176,
          },
          {
            "城市": "株洲",
            "销售额": 41444.704,
          },
          {
            "城市": "青冈",
            "销售额": 5784.8,
          },
          {
            "城市": "新泰",
            "销售额": 29422.959999999995,
          },
          {
            "城市": "仪征",
            "销售额": 8566.628,
          },
          {
            "城市": "禹州",
            "销售额": 8608.18,
          },
        ],
        "locale": "zh-CN",
        "theme": "light",
      }
    `)
  })

  it('scatter-sales-profit', async () => {
    const builder = VBI.from({
      connectorId: 'demoSupermarket',
      chartType: 'scatter',
      dimensions: [],
      measures: [
        {
          field: 'sales',
          alias: '销售额',
          encoding: 'xAxis',
          aggregate: {
            func: 'sum',
          },
        },
        {
          field: 'profit',
          alias: '利润',
          encoding: 'yAxis',
          aggregate: {
            func: 'sum',
          },
        },
      ],
      whereFilters: [],
      havingFilters: [],
      theme: 'light',
      locale: 'zh-CN',
      version: 1,
      limit: 50,
    })

    // Apply custom builder code
    const applyBuilder = (builder: VBIBuilder) => {
      builder.chartType.changeChartType('bar')
    }
    applyBuilder(builder)

    // Build VBI DSL
    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot(`
      {
        "chartType": "bar",
        "connectorId": "demoSupermarket",
        "dimensions": [],
        "havingFilters": [],
        "limit": 50,
        "locale": "zh-CN",
        "measures": [
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "销售额",
            "encoding": "xAxis",
            "field": "sales",
          },
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "利润",
            "encoding": "yAxis",
            "field": "profit",
          },
        ],
        "theme": "light",
        "version": 1,
        "whereFilters": {
          "conditions": [],
          "id": "00000000-0000-0000-0000-000000000000",
          "op": "AND",
        },
      }
    `)

    // Build VQuery DSL
    const vQueryDSL = builder.buildVQuery()
    expect(vQueryDSL).toMatchInlineSnapshot(`
      {
        "groupBy": [],
        "limit": 50,
        "select": [
          {
            "aggr": {
              "func": "sum",
            },
            "alias": "销售额",
            "field": "sales",
          },
          {
            "aggr": {
              "func": "sum",
            },
            "alias": "利润",
            "field": "profit",
          },
        ],
      }
    `)

    // Build VSeed DSL
    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot(`
      {
        "chartType": "bar",
        "dataset": [
          {
            "利润": 2147538.9250000017,
            "销售额": 16068954.12500003,
          },
        ],
        "locale": "zh-CN",
        "theme": "light",
      }
    `)
  })
})
