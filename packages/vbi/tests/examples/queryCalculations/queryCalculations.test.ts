import { rs } from '@rstest/core'
import { VBI, type VBIQueryBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

const MOCK_SYSTEM_TIME = new Date('2026-03-23T00:00:00.000Z')

describe('query / Calculations', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })

  it('simple-expression', async () => {
    const builder = VBI.query.create({
      ...VBI.query.createEmpty('demoSupermarket'),
      ...{
        dimensions: [
          {
            id: 'region',
            field: 'area',
            alias: '区域',
          },
        ],
        measures: [
          {
            id: 'sales',
            field: 'sales',
            alias: '销售额',
            aggregate: {
              func: 'sum',
            },
          },
        ],
        limit: 3,
      },
    })

    const applyBuilder = (builder: VBIQueryBuilder) => {
      builder.calculations.add('sales * 0.9', (node) => node.setAlias('九折销售额'))
    }
    try {
      const result = await applyBuilder(builder)
      expect(builder.build()).toMatchInlineSnapshot(`
        {
          "calculations": [
            {
              "alias": "九折销售额",
              "expr": "sales * 0.9",
              "id": "id-1",
            },
          ],
          "connectorId": "demoSupermarket",
          "dimensions": [
            {
              "alias": "区域",
              "field": "area",
              "id": "region",
            },
          ],
          "havingFilter": {
            "conditions": [],
            "id": "root",
            "op": "and",
          },
          "limit": 3,
          "measures": [
            {
              "aggregate": {
                "func": "sum",
              },
              "alias": "销售额",
              "field": "sales",
              "id": "sales",
            },
          ],
          "uuid": "uuid-1",
          "version": 0,
          "whereFilter": {
            "conditions": [],
            "id": "root",
            "op": "and",
          },
        }
      `)
      expect(builder.buildVQuery()).toMatchInlineSnapshot(`
        {
          "from": {
            "groupBy": [
              "area",
            ],
            "select": [
              {
                "aggr": {
                  "func": "sum",
                },
                "alias": "sales",
                "field": "sales",
              },
              {
                "alias": "region",
                "field": "area",
              },
            ],
          },
          "limit": 3,
          "orderBy": [
            {
              "field": "region",
              "order": "asc",
            },
          ],
          "select": [
            "*",
            {
              "alias": "id-1",
              "expr": "sales * 0.9",
            },
          ],
        }
      `)
      expect(result ?? (await builder.query())).toMatchInlineSnapshot(`
        {
          "dataset": [
            {
              "id-1": 2413410.722100001,
              "region": "东北",
              "sales": 2681567.469000001,
            },
            {
              "id-1": 3723673.583699995,
              "region": "中南",
              "sales": 4137415.0929999948,
            },
            {
              "id-1": 4216055.7978,
              "region": "华东",
              "sales": 4684506.442,
            },
          ],
        }
      `)
    } finally {
      builder.doc.destroy()
    }
  })

  it('builder-parameters', async () => {
    const builder = VBI.query.create({
      ...VBI.query.createEmpty('demoSupermarket'),
      ...{
        dimensions: [
          {
            id: 'region',
            field: 'area',
            alias: '区域',
          },
        ],
        measures: [
          {
            id: 'sales',
            field: 'sales',
            alias: '销售额',
            aggregate: {
              func: 'sum',
            },
          },
          {
            id: 'profit',
            field: 'profit',
            alias: '利润',
            aggregate: {
              func: 'sum',
            },
          },
        ],
      },
    })

    const applyBuilder = async (builder: VBIQueryBuilder) => {
      builder.calculations.add('sales * ?', (node) =>
        node.setAlias('调整后销售额').setExpression('sales * ?', [1.05]).setSort({ order: 'desc' }),
      )
      builder.limit.setLimit(3)
      return await builder.query()
    }
    try {
      const result = await applyBuilder(builder)
      expect(builder.build()).toMatchInlineSnapshot(`
        {
          "calculations": [
            {
              "alias": "调整后销售额",
              "expr": "sales * ?",
              "id": "id-1",
              "parameters": [
                1.05,
              ],
              "sort": {
                "order": "desc",
              },
            },
          ],
          "connectorId": "demoSupermarket",
          "dimensions": [
            {
              "alias": "区域",
              "field": "area",
              "id": "region",
            },
          ],
          "havingFilter": {
            "conditions": [],
            "id": "root",
            "op": "and",
          },
          "limit": 3,
          "measures": [
            {
              "aggregate": {
                "func": "sum",
              },
              "alias": "销售额",
              "field": "sales",
              "id": "sales",
            },
            {
              "aggregate": {
                "func": "sum",
              },
              "alias": "利润",
              "field": "profit",
              "id": "profit",
            },
          ],
          "uuid": "uuid-1",
          "version": 0,
          "whereFilter": {
            "conditions": [],
            "id": "root",
            "op": "and",
          },
        }
      `)
      expect(builder.buildVQuery()).toMatchInlineSnapshot(`
        {
          "from": {
            "groupBy": [
              "area",
            ],
            "select": [
              {
                "aggr": {
                  "func": "sum",
                },
                "alias": "sales",
                "field": "sales",
              },
              {
                "aggr": {
                  "func": "sum",
                },
                "alias": "profit",
                "field": "profit",
              },
              {
                "alias": "region",
                "field": "area",
              },
            ],
          },
          "limit": 3,
          "orderBy": [
            {
              "field": "id-1",
              "order": "desc",
            },
          ],
          "select": [
            "*",
            {
              "alias": "id-1",
              "expr": "sales * ?",
              "parameters": [
                1.05,
              ],
            },
          ],
        }
      `)
      expect(result ?? (await builder.query())).toMatchInlineSnapshot(`
        {
          "dataset": [
            {
              "id-1": 4918731.7641,
              "profit": 607218.6819999996,
              "region": "华东",
              "sales": 4684506.442,
            },
            {
              "id-1": 4344285.847649994,
              "profit": 670885.313,
              "region": "中南",
              "sales": 4137415.0929999948,
            },
            {
              "id-1": 2815645.8424500013,
              "profit": 242191.50899999973,
              "region": "东北",
              "sales": 2681567.469000001,
            },
          ],
        }
      `)
    } finally {
      builder.doc.destroy()
    }
  })

  it('aggregate-margin', async () => {
    const builder = VBI.query.create({
      ...VBI.query.createEmpty('demoSupermarket'),
      ...{
        dimensions: [
          {
            id: 'region',
            field: 'area',
            alias: '区域',
          },
        ],
        measures: [
          {
            id: 'sales',
            field: 'sales',
            alias: '销售额',
            aggregate: {
              func: 'sum',
            },
          },
          {
            id: 'profit',
            field: 'profit',
            alias: '利润',
            aggregate: {
              func: 'sum',
            },
          },
        ],
        calculations: [
          {
            id: 'margin',
            alias: '利润率',
            expr: 'profit / NULLIF(sales, 0)',
            sort: {
              order: 'desc',
            },
          },
        ],
        limit: 3,
      },
    })

    const applyBuilder = async (builder: VBIQueryBuilder) => {
      return await builder.query()
    }
    try {
      const result = await applyBuilder(builder)
      expect(builder.build()).toMatchInlineSnapshot(`
        {
          "calculations": [
            {
              "alias": "利润率",
              "expr": "profit / NULLIF(sales, 0)",
              "id": "margin",
              "sort": {
                "order": "desc",
              },
            },
          ],
          "connectorId": "demoSupermarket",
          "dimensions": [
            {
              "alias": "区域",
              "field": "area",
              "id": "region",
            },
          ],
          "havingFilter": {
            "conditions": [],
            "id": "root",
            "op": "and",
          },
          "limit": 3,
          "measures": [
            {
              "aggregate": {
                "func": "sum",
              },
              "alias": "销售额",
              "field": "sales",
              "id": "sales",
            },
            {
              "aggregate": {
                "func": "sum",
              },
              "alias": "利润",
              "field": "profit",
              "id": "profit",
            },
          ],
          "uuid": "uuid-1",
          "version": 0,
          "whereFilter": {
            "conditions": [],
            "id": "root",
            "op": "and",
          },
        }
      `)
      expect(builder.buildVQuery()).toMatchInlineSnapshot(`
        {
          "from": {
            "groupBy": [
              "area",
            ],
            "select": [
              {
                "aggr": {
                  "func": "sum",
                },
                "alias": "sales",
                "field": "sales",
              },
              {
                "aggr": {
                  "func": "sum",
                },
                "alias": "profit",
                "field": "profit",
              },
              {
                "alias": "region",
                "field": "area",
              },
            ],
          },
          "limit": 3,
          "orderBy": [
            {
              "field": "margin",
              "order": "desc",
            },
          ],
          "select": [
            "*",
            {
              "alias": "margin",
              "expr": "profit / NULLIF(sales, 0)",
            },
          ],
        }
      `)
      expect(result ?? (await builder.query())).toMatchInlineSnapshot(`
        {
          "dataset": [
            {
              "margin": 0.1761341224498821,
              "profit": 431053.2169999998,
              "region": "华北",
              "sales": 2447301.017000004,
            },
            {
              "margin": 0.16215083522440296,
              "profit": 670885.313,
              "region": "中南",
              "sales": 4137415.0929999948,
            },
            {
              "margin": 0.12962276592382144,
              "profit": 607218.6819999996,
              "region": "华东",
              "sales": 4684506.442,
            },
          ],
        }
      `)
    } finally {
      builder.doc.destroy()
    }
  })

  it('nested-functions', async () => {
    const builder = VBI.query.create({
      ...VBI.query.createEmpty('demoSupermarket'),
      ...{
        dimensions: [
          {
            id: 'region',
            field: 'area',
            alias: '区域',
          },
        ],
        measures: [
          {
            id: 'sales',
            field: 'sales',
            alias: '销售额',
            aggregate: {
              func: 'sum',
            },
          },
          {
            id: 'profit',
            field: 'profit',
            alias: '利润',
            aggregate: {
              func: 'sum',
            },
          },
        ],
        calculations: [
          {
            id: 'adjustedMargin',
            alias: '调整利润率',
            expr: 'ABS(COALESCE(profit,0)-?)/NULLIF(sales,0)',
            parameters: [1000],
            sort: {
              order: 'desc',
            },
          },
        ],
        limit: 3,
      },
    })

    const applyBuilder = async (builder: VBIQueryBuilder) => {
      return await builder.query()
    }
    try {
      const result = await applyBuilder(builder)
      expect(builder.build()).toMatchInlineSnapshot(`
        {
          "calculations": [
            {
              "alias": "调整利润率",
              "expr": "ABS(COALESCE(profit,0)-?)/NULLIF(sales,0)",
              "id": "adjustedMargin",
              "parameters": [
                1000,
              ],
              "sort": {
                "order": "desc",
              },
            },
          ],
          "connectorId": "demoSupermarket",
          "dimensions": [
            {
              "alias": "区域",
              "field": "area",
              "id": "region",
            },
          ],
          "havingFilter": {
            "conditions": [],
            "id": "root",
            "op": "and",
          },
          "limit": 3,
          "measures": [
            {
              "aggregate": {
                "func": "sum",
              },
              "alias": "销售额",
              "field": "sales",
              "id": "sales",
            },
            {
              "aggregate": {
                "func": "sum",
              },
              "alias": "利润",
              "field": "profit",
              "id": "profit",
            },
          ],
          "uuid": "uuid-1",
          "version": 0,
          "whereFilter": {
            "conditions": [],
            "id": "root",
            "op": "and",
          },
        }
      `)
      expect(builder.buildVQuery()).toMatchInlineSnapshot(`
        {
          "from": {
            "groupBy": [
              "area",
            ],
            "select": [
              {
                "aggr": {
                  "func": "sum",
                },
                "alias": "sales",
                "field": "sales",
              },
              {
                "aggr": {
                  "func": "sum",
                },
                "alias": "profit",
                "field": "profit",
              },
              {
                "alias": "region",
                "field": "area",
              },
            ],
          },
          "limit": 3,
          "orderBy": [
            {
              "field": "adjustedMargin",
              "order": "desc",
            },
          ],
          "select": [
            "*",
            {
              "alias": "adjustedMargin",
              "expr": "ABS(COALESCE(profit,0)-?)/NULLIF(sales,0)",
              "parameters": [
                1000,
              ],
            },
          ],
        }
      `)
      expect(result ?? (await builder.query())).toMatchInlineSnapshot(`
        {
          "dataset": [
            {
              "adjustedMargin": 0.17572550904554257,
              "profit": 431053.2169999998,
              "region": "华北",
              "sales": 2447301.017000004,
            },
            {
              "adjustedMargin": 0.16190913842156296,
              "profit": 670885.313,
              "region": "中南",
              "sales": 4137415.0929999948,
            },
            {
              "adjustedMargin": 0.12940929626327527,
              "profit": 607218.6819999996,
              "region": "华东",
              "sales": 4684506.442,
            },
          ],
        }
      `)
    } finally {
      builder.doc.destroy()
    }
  })
})
