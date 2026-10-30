import { rs } from '@rstest/core'
import { VBI, type VBIChartBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

const MOCK_SYSTEM_TIME = new Date('2026-03-23T00:00:00.000Z')

describe('chart / QueryMode', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })

  it('aggregate-sales', async () => {
    const builder = VBI.chart.create({
      connectorId: 'demoSupermarket',
      chartType: 'table',
      dimensions: [
        {
          field: 'area',
          alias: '区域',
        },
      ],
      measures: [
        {
          field: 'sales',
          alias: '销售额合计',
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
      limit: 10,
    })

    const applyBuilder = (builder: VBIChartBuilder) => {
      const original = builder.buildVQuery()
      builder.queryMode.setMode('aggregate')
      if (JSON.stringify(builder.buildVQuery()) !== JSON.stringify(original)) {
        throw new Error('Explicit aggregate mode must preserve the existing query')
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
            "field": "area",
            "id": "id-2",
          },
        ],
        "havingFilter": {
          "conditions": [],
          "id": "root",
          "op": "and",
        },
        "limit": 10,
        "locale": "zh-CN",
        "measures": [
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "销售额合计",
            "field": "sales",
            "id": "id-1",
          },
        ],
        "queryMode": "aggregate",
        "theme": "light",
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
          "area",
        ],
        "limit": 10,
        "orderBy": [
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
            "alias": "id-1",
            "field": "sales",
          },
          {
            "alias": "id-2",
            "field": "area",
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
            "id-1": 2681567.469000001,
            "id-2": "东北",
          },
          {
            "id-1": 4137415.0929999948,
            "id-2": "中南",
          },
          {
            "id-1": 4684506.442,
            "id-2": "华东",
          },
          {
            "id-1": 2447301.017000004,
            "id-2": "华北",
          },
          {
            "id-1": 815039.5959999998,
            "id-2": "西北",
          },
          {
            "id-1": 1303124.508000002,
            "id-2": "西南",
          },
        ],
        "dimensions": [
          {
            "alias": "区域",
            "id": "id-2",
          },
        ],
        "locale": "zh-CN",
        "measures": [
          {
            "alias": "销售额合计",
            "id": "id-1",
          },
        ],
        "theme": "light",
      }
    `)
  })

  it('detail-sales', async () => {
    const builder = VBI.chart.create({
      connectorId: 'demoSupermarket',
      chartType: 'table',
      dimensions: [
        {
          field: 'order_id',
          alias: '订单 ID',
        },
        {
          field: 'order_date',
          alias: '日期',
        },
        {
          field: 'area',
          alias: '区域',
        },
      ],
      measures: [
        {
          field: 'sales',
          alias: '销售额',
          aggregate: {
            func: 'sum',
          },
          format: {
            fractionDigits: 2,
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
      limit: 10,
    })

    const applyBuilder = async (builder: VBIChartBuilder) => {
      builder.queryMode.setMode('detail')
      const query = builder.buildVQuery()
      if (query.groupBy || query.having || query.select.some((item) => typeof item !== 'string' && item.aggr)) {
        throw new Error('Detail queries must project source fields without aggregation')
      }
      const result = await builder.query()
      if (result.dataset.length !== 10) throw new Error('Detail limit counts source records')
    }
    await applyBuilder(builder)

    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot(`
      {
        "chartType": "table",
        "connectorId": "demoSupermarket",
        "dimensions": [
          {
            "alias": "订单 ID",
            "field": "order_id",
            "id": "id-2",
          },
          {
            "alias": "日期",
            "field": "order_date",
            "id": "id-3",
          },
          {
            "alias": "区域",
            "field": "area",
            "id": "id-4",
          },
        ],
        "havingFilter": {
          "conditions": [],
          "id": "root",
          "op": "and",
        },
        "limit": 10,
        "locale": "zh-CN",
        "measures": [
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "销售额",
            "field": "sales",
            "format": {
              "fractionDigits": 2,
            },
            "id": "id-1",
          },
        ],
        "queryMode": "detail",
        "theme": "light",
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
        "limit": 10,
        "orderBy": [
          {
            "field": "id-2",
            "order": "asc",
          },
        ],
        "select": [
          {
            "alias": "id-1",
            "field": "sales",
          },
          {
            "alias": "id-2",
            "field": "order_id",
          },
          {
            "alias": "id-3",
            "field": "order_date",
          },
          {
            "alias": "id-4",
            "field": "area",
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
            "id-1": 154.98,
            "id-2": "CN-2016-1017090",
            "id-3": "2016-09-23",
            "id-4": "中南",
          },
          {
            "id-1": 117.88,
            "id-2": "CN-2016-1017090",
            "id-3": "2016-09-23",
            "id-4": "中南",
          },
          {
            "id-1": 1251.6,
            "id-2": "CN-2016-1031662",
            "id-3": "2016-12-21",
            "id-4": "西北",
          },
          {
            "id-1": 151.2,
            "id-2": "CN-2016-1031662",
            "id-3": "2016-12-21",
            "id-4": "西北",
          },
          {
            "id-1": 829.92,
            "id-2": "CN-2016-1031662",
            "id-3": "2016-12-21",
            "id-4": "西北",
          },
          {
            "id-1": 124.32,
            "id-2": "CN-2016-1047687",
            "id-3": "2016-01-26",
            "id-4": "中南",
          },
          {
            "id-1": 473.2,
            "id-2": "CN-2016-1070056",
            "id-3": "2016-09-23",
            "id-4": "华北",
          },
          {
            "id-1": 274.54,
            "id-2": "CN-2016-1070056",
            "id-3": "2016-09-23",
            "id-4": "华北",
          },
          {
            "id-1": 584.36,
            "id-2": "CN-2016-1070056",
            "id-3": "2016-09-23",
            "id-4": "华北",
          },
          {
            "id-1": 3950.24,
            "id-2": "CN-2016-1070056",
            "id-3": "2016-09-23",
            "id-4": "华北",
          },
        ],
        "dimensions": [
          {
            "alias": "订单 ID",
            "id": "id-2",
          },
          {
            "alias": "日期",
            "id": "id-3",
          },
          {
            "alias": "区域",
            "id": "id-4",
          },
        ],
        "locale": "zh-CN",
        "measures": [
          {
            "alias": "销售额",
            "autoFormat": false,
            "id": "id-1",
            "numFormat": {
              "fractionDigits": 2,
            },
          },
        ],
        "theme": "light",
      }
    `)
  })
})
