import { VBI, VBIBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

describe('Theme', () => {
  beforeAll(async () => {
    registerDemoConnector()
  })

  it('dark-theme', async () => {
    const builder = VBI.from({
      connectorId: 'demoSupermarket',
      chartType: 'table',
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
      builder.setTheme('dark')
    }
    applyBuilder(builder)

    // Build VBI DSL
    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot(`
      {
        "chartType": "table",
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
        "theme": "dark",
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
        "chartType": "table",
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
        "theme": "dark",
      }
    `)
  })

  it('light-theme', async () => {
    const builder = VBI.from({
      connectorId: 'demoSupermarket',
      chartType: 'table',
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
      theme: 'dark',
      locale: 'zh-CN',
      version: 1,
      limit: 50,
    })

    // Apply custom builder code
    const applyBuilder = (builder: VBIBuilder) => {
      builder.setTheme('light')
    }
    applyBuilder(builder)

    // Build VBI DSL
    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot(`
      {
        "chartType": "table",
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
        "chartType": "table",
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
})
