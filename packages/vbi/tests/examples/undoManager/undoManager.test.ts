import { rs } from '@rstest/core'
import { VBI, type VBIChartBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

const MOCK_SYSTEM_TIME = new Date('2026-03-23T00:00:00.000Z')

describe('chart / UndoManager', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })

  it('undo-redo', async () => {
    const builder = VBI.chart.create({
      connectorId: 'demoSupermarket',
      chartType: 'bar',
      dimensions: [],
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
      builder.measures.add('profit', (node) => {
        node.setAlias('利润').setEncoding('yAxis').setAggregate({ func: 'sum' })
      })
      builder.limit.setLimit(5)

      // 第一步只撤销 limit，新增的利润指标仍然存在。
      builder.undoManager.undo()
      if (builder.limit.getLimit() !== 10 || builder.measures.toJSON().length !== 2) {
        throw new Error('Each chart transaction should be a separate undo step')
      }

      // 第二步撤销整个 add，包括回调内的别名、编码和聚合配置。
      builder.undoManager.undo()
      if (builder.measures.toJSON().length !== 1) {
        throw new Error('Undo should remove only the added measure')
      }

      builder.undoManager.redo()
      builder.undoManager.redo()
      if (builder.limit.getLimit() !== 5 || builder.measures.toJSON().length !== 2) {
        throw new Error('Redo should restore each chart transaction')
      }
    }
    await applyBuilder(builder)

    const vbiDSL = builder.build()
    expect(vbiDSL).toMatchInlineSnapshot(`
      {
        "chartType": "bar",
        "connectorId": "demoSupermarket",
        "dimensions": [],
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
            "alias": "销售额",
            "encoding": "yAxis",
            "field": "sales",
            "id": "id-1",
          },
          {
            "aggregate": {
              "func": "sum",
            },
            "alias": "利润",
            "encoding": "yAxis",
            "field": "profit",
            "id": "id-2",
          },
        ],
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
        "groupBy": [],
        "limit": 5,
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
        ],
      }
    `)

    const vSeedDSL = await builder.buildVSeed()
    expect(vSeedDSL).toMatchInlineSnapshot(`
      {
        "chartType": "bar",
        "dataset": [
          {
            "id-1": 16068954.12500003,
            "id-2": 2147538.9250000017,
          },
        ],
        "dimensions": [],
        "locale": "zh-CN",
        "measures": [
          {
            "alias": "销售额",
            "encoding": "yAxis",
            "id": "id-1",
          },
          {
            "alias": "利润",
            "encoding": "yAxis",
            "id": "id-2",
          },
        ],
        "theme": "light",
      }
    `)
  })
})
