import { VBI, VBIBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

describe('WhereFilters', () => {
  beforeAll(async () => {
    registerDemoConnector()
  })

  it('add-where-filter', async () => {
    const builder = VBI.from({
      connectorId: 'demoSupermarket',
      chartType: 'bar',
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
      limit: 20,
    })

    // Apply custom builder code
    const applyBuilder = (builder: VBIBuilder) => {
      builder.whereFilters.add('product_type', (node) => {
        node.setOperator('eq').setValue('办公用品')
      })
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
        "limit": 20,
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
          "conditions": [
            {
              "field": "product_type",
              "id": "00000000-0000-0000-0000-000000000001",
              "op": "eq",
              "value": "办公用品",
            },
          ],
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
        "limit": 20,
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
        "where": {
          "conditions": [
            {
              "field": "product_type",
              "op": "eq",
              "value": "办公用品",
            },
          ],
          "op": "and",
        },
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
            "销售额": 1408628.5919999965,
          },
          {
            "区域": "西南",
            "销售额": 347692.57600000035,
          },
          {
            "区域": "中南",
            "销售额": 1270911.2639999979,
          },
          {
            "区域": "华北",
            "销售额": 745813.5159999988,
          },
          {
            "区域": "西北",
            "销售额": 267870.7920000001,
          },
          {
            "区域": "东北",
            "销售额": 824673.0519999993,
          },
        ],
        "locale": "zh-CN",
        "theme": "light",
      }
    `)
  })

  it('add-multiple-where-filters', async () => {
    const builder = VBI.from({
      connectorId: 'demoSupermarket',
      chartType: 'bar',
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
      limit: 20,
    })

    // Apply custom builder code
    const applyBuilder = (builder: VBIBuilder) => {
      builder.whereFilters
        .add('product_type', (n) => n.setOperator('eq').setValue('办公用品'))
        .add('province', (n) => n.setOperator('in').setValue(['浙江', '江苏']))
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
            "alias": "省份",
            "field": "province",
          },
        ],
        "havingFilters": [],
        "limit": 20,
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
          "conditions": [
            {
              "field": "product_type",
              "id": "00000000-0000-0000-0000-000000000002",
              "op": "eq",
              "value": "办公用品",
            },
            {
              "field": "province",
              "id": "00000000-0000-0000-0000-000000000003",
              "op": "in",
              "value": [
                "浙江",
                "江苏",
              ],
            },
          ],
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
        "limit": 20,
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
        "where": {
          "conditions": [
            {
              "field": "product_type",
              "op": "eq",
              "value": "办公用品",
            },
            {
              "field": "province",
              "op": "in",
              "value": [
                "浙江",
                "江苏",
              ],
            },
          ],
          "op": "and",
        },
      }
    `)

    // Build VSeed DSL
    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot(`
      {
        "chartType": "bar",
        "dataset": [
          {
            "省份": "浙江",
            "销售额": 145678.31599999996,
          },
          {
            "省份": "江苏",
            "销售额": 237378.876,
          },
        ],
        "locale": "zh-CN",
        "theme": "light",
      }
    `)
  })

  it('bar-by-province-with-filter', async () => {
    const builder = VBI.from({
      connectorId: 'demoSupermarket',
      chartType: 'bar',
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
      limit: 20,
    })

    // Apply custom builder code
    const applyBuilder = (builder: VBIBuilder) => {
      builder.whereFilters.add('product_type', (node) => {
        node.setOperator('eq').setValue('办公用品')
      })
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
            "alias": "省份",
            "field": "province",
          },
        ],
        "havingFilters": [],
        "limit": 20,
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
          "conditions": [
            {
              "field": "product_type",
              "id": "00000000-0000-0000-0000-000000000004",
              "op": "eq",
              "value": "办公用品",
            },
          ],
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
        "limit": 20,
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
        "where": {
          "conditions": [
            {
              "field": "product_type",
              "op": "eq",
              "value": "办公用品",
            },
          ],
          "op": "and",
        },
      }
    `)

    // Build VSeed DSL
    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot(`
      {
        "chartType": "bar",
        "dataset": [
          {
            "省份": "浙江",
            "销售额": 145678.31599999996,
          },
          {
            "省份": "四川",
            "销售额": 114141.496,
          },
          {
            "省份": "江苏",
            "销售额": 237378.876,
          },
          {
            "省份": "广东",
            "销售额": 408478.70000000024,
          },
          {
            "省份": "江西",
            "销售额": 45201.52,
          },
          {
            "省份": "山东",
            "销售额": 490581.2800000006,
          },
          {
            "省份": "上海",
            "销售额": 197696.65999999997,
          },
          {
            "省份": "河北",
            "销售额": 225399.8599999999,
          },
          {
            "省份": "福建",
            "销售额": 100060.37999999998,
          },
          {
            "省份": "安徽",
            "销售额": 192031.5600000002,
          },
          {
            "省份": "甘肃",
            "销售额": 42723.77200000001,
          },
          {
            "省份": "黑龙江",
            "销售额": 397944.37199999974,
          },
          {
            "省份": "吉林",
            "销售额": 119124.93600000005,
          },
          {
            "省份": "辽宁",
            "销售额": 307603.7439999999,
          },
          {
            "省份": "陕西",
            "销售额": 129221.68000000004,
          },
          {
            "省份": "湖北",
            "销售额": 220619.22400000007,
          },
          {
            "省份": "湖南",
            "销售额": 250176.724,
          },
          {
            "省份": "北京",
            "销售额": 146253.80000000002,
          },
          {
            "省份": "重庆",
            "销售额": 79668.54000000002,
          },
          {
            "省份": "青海",
            "销售额": 16289.980000000001,
          },
        ],
        "locale": "zh-CN",
        "theme": "light",
      }
    `)
  })

  it('clear-where-filters', async () => {
    const builder = VBI.from({
      connectorId: 'demoSupermarket',
      chartType: 'bar',
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
      whereFilters: [
        {
          field: 'product_type',
          operator: 'eq',
          value: '办公用品',
        },
        {
          field: 'province',
          operator: 'eq',
          value: '浙江',
        },
      ],
      havingFilters: [],
      theme: 'light',
      locale: 'zh-CN',
      version: 1,
      limit: 20,
    })

    // Apply custom builder code
    const applyBuilder = (builder: VBIBuilder) => {
      builder.whereFilters.clear()
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
            "alias": "省份",
            "field": "province",
          },
        ],
        "havingFilters": [],
        "limit": 20,
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
        "limit": 20,
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
        "chartType": "bar",
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
        ],
        "locale": "zh-CN",
        "theme": "light",
      }
    `)
  })

  it('column-by-area-multiple-filters', async () => {
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
      limit: 20,
    })

    // Apply custom builder code
    const applyBuilder = (builder: VBIBuilder) => {
      builder.whereFilters
        .add('product_type', (node) => node.setOperator('eq').setValue('办公用品'))
        .add('area', (node) => node.setOperator('in').setValue(['华东', '华北']))
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
            "alias": "区域",
            "field": "area",
          },
        ],
        "havingFilters": [],
        "limit": 20,
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
          "conditions": [
            {
              "field": "product_type",
              "id": "00000000-0000-0000-0000-000000000005",
              "op": "eq",
              "value": "办公用品",
            },
            {
              "field": "area",
              "id": "00000000-0000-0000-0000-000000000006",
              "op": "in",
              "value": [
                "华东",
                "华北",
              ],
            },
          ],
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
        "limit": 20,
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
        "where": {
          "conditions": [
            {
              "field": "product_type",
              "op": "eq",
              "value": "办公用品",
            },
            {
              "field": "area",
              "op": "in",
              "value": [
                "华东",
                "华北",
              ],
            },
          ],
          "op": "and",
        },
      }
    `)

    // Build VSeed DSL
    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot(`
      {
        "chartType": "column",
        "dataset": [
          {
            "区域": "华东",
            "销售额": 1408628.5919999965,
          },
          {
            "区域": "华北",
            "销售额": 745813.5159999988,
          },
        ],
        "locale": "zh-CN",
        "theme": "light",
      }
    `)
  })

  it('remove-where-filter', async () => {
    const builder = VBI.from({
      connectorId: 'demoSupermarket',
      chartType: 'bar',
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
      whereFilters: [
        {
          field: 'product_type',
          operator: 'eq',
          value: '办公用品',
        },
        {
          field: 'province',
          operator: 'eq',
          value: '浙江',
        },
      ],
      havingFilters: [],
      theme: 'light',
      locale: 'zh-CN',
      version: 1,
      limit: 20,
    })

    // Apply custom builder code
    const applyBuilder = (builder: VBIBuilder) => {
      builder.whereFilters.remove('product_type')
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
            "alias": "省份",
            "field": "province",
          },
        ],
        "havingFilters": [],
        "limit": 20,
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
        "limit": 20,
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
        "chartType": "bar",
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
        ],
        "locale": "zh-CN",
        "theme": "light",
      }
    `)
  })
})
