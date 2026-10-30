import { rs } from '@rstest/core'
import { VBI, type VBIQueryBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

const MOCK_SYSTEM_TIME = new Date('2026-03-23T00:00:00.000Z')

describe('query / QueryProfile', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })

  it('numeric-profile', async () => {
    const builder = VBI.query.create({
      ...VBI.query.createEmpty('demoSupermarket'),
      ...{
        queryMode: 'detail',
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
        limit: 50,
      },
    })

    const applyBuilder = async (builder: VBIQueryBuilder) => {
      return await builder.queryProfile({ columns: ['sales'] })
    }
    try {
      const result = await applyBuilder(builder)
      expect(builder.build()).toMatchInlineSnapshot(`
        {
          "connectorId": "demoSupermarket",
          "dimensions": [],
          "havingFilter": {
            "conditions": [],
            "id": "root",
            "op": "and",
          },
          "limit": 50,
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
          "queryMode": "detail",
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
          "limit": 50,
          "select": [
            {
              "alias": "sales",
              "field": "sales",
            },
          ],
        }
      `)
      expect(result ?? (await builder.query())).toMatchInlineSnapshot(`
        {
          "columns": {
            "sales": {
              "bins": [
                {
                  "count": 30,
                  "max": 1044.54,
                  "min": 31.92,
                },
                {
                  "count": 9,
                  "max": 2057.16,
                  "min": 1044.54,
                },
                {
                  "count": 3,
                  "max": 3069.7799999999997,
                  "min": 2057.16,
                },
                {
                  "count": 0,
                  "max": 4082.3999999999996,
                  "min": 3069.7799999999997,
                },
                {
                  "count": 2,
                  "max": 5095.02,
                  "min": 4082.3999999999996,
                },
                {
                  "count": 1,
                  "max": 6107.639999999999,
                  "min": 5095.02,
                },
                {
                  "count": 0,
                  "max": 7120.26,
                  "min": 6107.639999999999,
                },
                {
                  "count": 0,
                  "max": 8132.88,
                  "min": 7120.26,
                },
                {
                  "count": 1,
                  "max": 9145.5,
                  "min": 8132.88,
                },
                {
                  "count": 1,
                  "max": 10158.12,
                  "min": 9145.5,
                },
                {
                  "count": 2,
                  "max": 11170.740000000002,
                  "min": 10158.12,
                },
                {
                  "count": 1,
                  "max": 12183.36,
                  "min": 11170.740000000002,
                },
              ],
              "max": 12183.36,
              "min": 31.92,
              "missingCount": 0,
              "type": "number",
              "validCount": 50,
            },
          },
          "rowCount": 50,
        }
      `)
    } finally {
      builder.doc.destroy()
    }
  })

  it('category-frequency', async () => {
    const builder = VBI.query.create({
      ...VBI.query.createEmpty('demoSupermarket'),
      ...{
        queryMode: 'detail',
        dimensions: [
          {
            id: 'productType',
            field: 'product_type',
            alias: '品类',
          },
        ],
        limit: 10000,
      },
    })

    const applyBuilder = async (builder: VBIQueryBuilder) => {
      return await builder.queryProfile({ columns: ['productType'], topK: 2 })
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
            "conditions": [],
            "id": "root",
            "op": "and",
          },
          "limit": 10000,
          "measures": [],
          "queryMode": "detail",
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
          "limit": 10000,
          "orderBy": [
            {
              "field": "productType",
              "order": "asc",
            },
          ],
          "select": [
            {
              "alias": "productType",
              "field": "product_type",
            },
          ],
        }
      `)
      expect(result ?? (await builder.query())).toMatchInlineSnapshot(`
        {
          "columns": {
            "productType": {
              "missingCount": 0,
              "otherCount": 2028,
              "top": [
                {
                  "count": 5687,
                  "value": "办公用品",
                },
                {
                  "count": 2244,
                  "value": "家具",
                },
              ],
              "type": "string",
              "validCount": 9959,
            },
          },
          "rowCount": 9959,
        }
      `)
    } finally {
      builder.doc.destroy()
    }
  })

  it('profile-current-query', async () => {
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
      builder.queryMode.setMode('detail')
      builder.whereFilter.add('area', (node) => node.setOperator('eq').setValue('华东'))
      builder.measures.update('sales', (node) => node.setSort({ order: 'desc' }))
      builder.limit.setLimit(20)
      const before = builder.build()
      const profile = await builder.queryProfile({
        columns: ['sales', 'productType'],
        bins: { maxBins: 5, discreteMax: 3 },
        topK: 2,
      })

      return { stateUnchanged: JSON.stringify(before) === JSON.stringify(builder.build()), profile }
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
            "conditions": [],
            "id": "root",
            "op": "and",
          },
          "limit": 20,
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
          "queryMode": "detail",
          "uuid": "uuid-1",
          "version": 0,
          "whereFilter": {
            "conditions": [
              {
                "field": "area",
                "id": "id-1",
                "op": "eq",
                "value": "华东",
              },
            ],
            "id": "root",
            "op": "and",
          },
        }
      `)
      expect(builder.buildVQuery()).toMatchInlineSnapshot(`
        {
          "limit": 20,
          "orderBy": [
            {
              "field": "sales",
              "order": "desc",
            },
          ],
          "select": [
            {
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
                "field": "area",
                "op": "eq",
                "value": "华东",
              },
            ],
            "op": "and",
          },
        }
      `)
      expect(result ?? (await builder.query())).toMatchInlineSnapshot(`
        {
          "profile": {
            "columns": {
              "productType": {
                "missingCount": 0,
                "otherCount": 5,
                "top": [
                  {
                    "count": 10,
                    "value": "办公用品",
                  },
                  {
                    "count": 5,
                    "value": "家具",
                  },
                ],
                "type": "string",
                "validCount": 20,
              },
              "sales": {
                "bins": [
                  {
                    "count": 8,
                    "max": 18201.5232,
                    "min": 15470.784,
                  },
                  {
                    "count": 5,
                    "max": 20932.2624,
                    "min": 18201.5232,
                  },
                  {
                    "count": 2,
                    "max": 23663.0016,
                    "min": 20932.2624,
                  },
                  {
                    "count": 0,
                    "max": 26393.7408,
                    "min": 23663.0016,
                  },
                  {
                    "count": 5,
                    "max": 29124.48,
                    "min": 26393.7408,
                  },
                ],
                "max": 29124.48,
                "min": 15470.784,
                "missingCount": 0,
                "type": "number",
                "validCount": 20,
              },
            },
            "rowCount": 20,
          },
          "stateUnchanged": true,
        }
      `)
    } finally {
      builder.doc.destroy()
    }
  })

  it('profile-calculation', async () => {
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
            expr: 'profit/NULLIF(sales,0)',
          },
        ],
      },
    })

    const applyBuilder = async (builder: VBIQueryBuilder) => {
      return { profile: await builder.queryProfile({ columns: ['margin'], bins: { maxBins: 4, discreteMax: 2 } }) }
    }
    try {
      const result = await applyBuilder(builder)
      expect(builder.build()).toMatchInlineSnapshot(`
        {
          "calculations": [
            {
              "alias": "利润率",
              "expr": "profit/NULLIF(sales,0)",
              "id": "margin",
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
          "limit": 1000,
          "orderBy": [
            {
              "field": "region",
              "order": "asc",
            },
          ],
          "select": [
            "*",
            {
              "alias": "margin",
              "expr": "profit/NULLIF(sales,0)",
            },
          ],
        }
      `)
      expect(result ?? (await builder.query())).toMatchInlineSnapshot(`
        {
          "profile": {
            "columns": {
              "margin": {
                "bins": [
                  {
                    "count": 2,
                    "max": 0.10022735211643992,
                    "min": 0.07492509533862586,
                  },
                  {
                    "count": 1,
                    "max": 0.125529608894254,
                    "min": 0.10022735211643992,
                  },
                  {
                    "count": 1,
                    "max": 0.15083186567206805,
                    "min": 0.125529608894254,
                  },
                  {
                    "count": 2,
                    "max": 0.1761341224498821,
                    "min": 0.15083186567206805,
                  },
                ],
                "max": 0.1761341224498821,
                "min": 0.07492509533862586,
                "missingCount": 0,
                "type": "number",
                "validCount": 6,
              },
            },
            "rowCount": 6,
          },
        }
      `)
    } finally {
      builder.doc.destroy()
    }
  })
})
