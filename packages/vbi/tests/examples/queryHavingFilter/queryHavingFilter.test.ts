import { rs } from '@rstest/core'
import { VBI, type VBIQueryBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

const MOCK_SYSTEM_TIME = new Date('2026-03-23T00:00:00.000Z')

describe('query / HavingFilter', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })

  it('sum-threshold', async () => {
    const builder = VBI.query.create({
      ...VBI.query.createEmpty('demoSupermarket'),
      ...{
        dimensions: [
          {
            id: 'productType',
            field: 'product_type',
            alias: '品类',
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
      builder.havingFilter.add('sales', (node) => node.setAggregate({ func: 'sum' }).setOperator('>').setValue(150000))
    }
    try {
      const result = await applyBuilder(builder)
      expect(builder.build()).toMatchInlineSnapshot(`
        {
          "connectorId": "demoSupermarket",
          "dimensions": [
            {
              "alias": "品类",
              "field": "product_type",
              "id": "productType",
            },
          ],
          "havingFilter": {
            "conditions": [
              {
                "aggregate": {
                  "func": "sum",
                },
                "field": "sales",
                "id": "id-1",
                "op": ">",
                "value": 150000,
              },
            ],
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
          "groupBy": [
            "product_type",
          ],
          "having": {
            "conditions": [
              {
                "aggr": {
                  "func": "sum",
                },
                "field": "sales",
                "op": ">",
                "value": 150000,
              },
            ],
            "op": "and",
          },
          "limit": 3,
          "orderBy": [
            {
              "field": "productType",
              "order": "asc",
            },
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
              "alias": "productType",
              "field": "product_type",
            },
          ],
        }
      `)
      expect(result ?? (await builder.query())).toMatchInlineSnapshot(`
        {
          "dataset": [
            {
              "productType": "办公用品",
              "sales": 4865589.791999991,
            },
            {
              "productType": "家具",
              "sales": 5734340.829,
            },
            {
              "productType": "技术",
              "sales": 5469023.503999994,
            },
          ],
        }
      `)
    } finally {
      builder.doc.destroy()
    }
  })

  it('or-group', async () => {
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
        limit: 5,
      },
    })

    const applyBuilder = (builder: VBIQueryBuilder) => {
      builder.havingFilter.addGroup('or', (group) => {
        group.add('sales', (node) => node.setAggregate({ func: 'sum' }).setOperator('>').setValue(500000))
        group.add('profit', (node) => node.setAggregate({ func: 'sum' }).setOperator('>').setValue(10000))
      })
    }
    try {
      const result = await applyBuilder(builder)
      expect(builder.build()).toMatchInlineSnapshot(`
        {
          "connectorId": "demoSupermarket",
          "dimensions": [
            {
              "alias": "区域",
              "field": "area",
              "id": "region",
            },
          ],
          "havingFilter": {
            "conditions": [
              {
                "conditions": [
                  {
                    "aggregate": {
                      "func": "sum",
                    },
                    "field": "sales",
                    "id": "id-2",
                    "op": ">",
                    "value": 500000,
                  },
                  {
                    "aggregate": {
                      "func": "sum",
                    },
                    "field": "profit",
                    "id": "id-3",
                    "op": ">",
                    "value": 10000,
                  },
                ],
                "id": "id-1",
                "op": "or",
              },
            ],
            "id": "root",
            "op": "and",
          },
          "limit": 5,
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
          "groupBy": [
            "area",
          ],
          "having": {
            "conditions": [
              {
                "conditions": [
                  {
                    "aggr": {
                      "func": "sum",
                    },
                    "field": "sales",
                    "op": ">",
                    "value": 500000,
                  },
                  {
                    "aggr": {
                      "func": "sum",
                    },
                    "field": "profit",
                    "op": ">",
                    "value": 10000,
                  },
                ],
                "op": "or",
              },
            ],
            "op": "and",
          },
          "limit": 5,
          "orderBy": [
            {
              "field": "region",
              "order": "asc",
            },
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
        }
      `)
      expect(result ?? (await builder.query())).toMatchInlineSnapshot(`
        {
          "dataset": [
            {
              "profit": 242191.50899999973,
              "region": "东北",
              "sales": 2681567.469000001,
            },
            {
              "profit": 670885.313,
              "region": "中南",
              "sales": 4137415.0929999948,
            },
            {
              "profit": 607218.6819999996,
              "region": "华东",
              "sales": 4684506.442,
            },
            {
              "profit": 431053.2169999998,
              "region": "华北",
              "sales": 2447301.017000004,
            },
            {
              "profit": 98553.47600000004,
              "region": "西北",
              "sales": 815039.5959999998,
            },
          ],
        }
      `)
    } finally {
      builder.doc.destroy()
    }
  })

  it('where-and-having', async () => {
    const builder = VBI.query.create({
      ...VBI.query.createEmpty('demoSupermarket'),
      ...{
        dimensions: [
          {
            id: 'productType',
            field: 'product_type',
            alias: '品类',
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
      },
    })

    const applyBuilder = async (builder: VBIQueryBuilder) => {
      builder.whereFilter.add('province', (node) => node.setOperator('eq').setValue('浙江'))
      builder.havingFilter.add('sales', (node) => node.setAggregate({ func: 'sum' }).setOperator('>').setValue(150000))
      builder.measures.update('sales', (node) => node.setSort({ order: 'desc' }))
      builder.limit.setLimit(3)

      return { query: builder.buildVQuery(), result: await builder.query() }
    }
    try {
      const result = await applyBuilder(builder)
      expect(builder.build()).toMatchInlineSnapshot(`
        {
          "connectorId": "demoSupermarket",
          "dimensions": [
            {
              "alias": "品类",
              "field": "product_type",
              "id": "productType",
            },
          ],
          "havingFilter": {
            "conditions": [
              {
                "aggregate": {
                  "func": "sum",
                },
                "field": "sales",
                "id": "id-2",
                "op": ">",
                "value": 150000,
              },
            ],
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
              "sort": {
                "order": "desc",
              },
            },
          ],
          "uuid": "uuid-1",
          "version": 0,
          "whereFilter": {
            "conditions": [
              {
                "field": "province",
                "id": "id-1",
                "op": "eq",
                "value": "浙江",
              },
            ],
            "id": "root",
            "op": "and",
          },
        }
      `)
      expect(builder.buildVQuery()).toMatchInlineSnapshot(`
        {
          "groupBy": [
            "product_type",
          ],
          "having": {
            "conditions": [
              {
                "aggr": {
                  "func": "sum",
                },
                "field": "sales",
                "op": ">",
                "value": 150000,
              },
            ],
            "op": "and",
          },
          "limit": 3,
          "orderBy": [
            {
              "field": "sales",
              "order": "desc",
            },
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
              "alias": "productType",
              "field": "product_type",
            },
          ],
          "where": {
            "conditions": [
              {
                "field": "province",
                "op": "eq",
                "value": "浙江",
              },
            ],
            "op": "and",
          },
        }
      `)
      expect(result ?? (await builder.query())).toMatchInlineSnapshot(`
        {
          "query": {
            "groupBy": [
              "product_type",
            ],
            "having": {
              "conditions": [
                {
                  "aggr": {
                    "func": "sum",
                  },
                  "field": "sales",
                  "op": ">",
                  "value": 150000,
                },
              ],
              "op": "and",
            },
            "limit": 3,
            "orderBy": [
              {
                "field": "sales",
                "order": "desc",
              },
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
                "alias": "productType",
                "field": "product_type",
              },
            ],
            "where": {
              "conditions": [
                {
                  "field": "province",
                  "op": "eq",
                  "value": "浙江",
                },
              ],
              "op": "and",
            },
          },
          "result": {
            "dataset": [
              {
                "productType": "技术",
                "sales": 168849.576,
              },
            ],
          },
        }
      `)
    } finally {
      builder.doc.destroy()
    }
  })
})
