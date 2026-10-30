import { rs } from '@rstest/core'
import { VBI, type VBIQueryBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

const MOCK_SYSTEM_TIME = new Date('2026-03-23T00:00:00.000Z')

describe('query / WhereFilter', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })

  it('equal-filter', async () => {
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
      builder.whereFilter.add('area', (node) => node.setOperator('eq').setValue('华东'))
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
          "groupBy": [
            "product_type",
          ],
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
          "dataset": [
            {
              "productType": "办公用品",
              "sales": 1408628.5919999965,
            },
            {
              "productType": "家具",
              "sales": 1676224.1299999976,
            },
            {
              "productType": "技术",
              "sales": 1599653.7199999986,
            },
          ],
        }
      `)
    } finally {
      builder.doc.destroy()
    }
  })

  it('range-filter', async () => {
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
      builder.whereFilter.add('sales', (node) => node.setOperator('between').setValue([100, 1000]))
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
            "conditions": [
              {
                "field": "sales",
                "id": "id-1",
                "op": "between",
                "value": [
                  100,
                  1000,
                ],
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
          "where": {
            "conditions": [
              {
                "field": "sales",
                "op": ">=",
                "value": 100,
              },
              {
                "field": "sales",
                "op": "<=",
                "value": 1000,
              },
            ],
            "op": "and",
          },
        }
      `)
      expect(result ?? (await builder.query())).toMatchInlineSnapshot(`
        {
          "dataset": [
            {
              "productType": "办公用品",
              "sales": 1465902.9559999937,
            },
            {
              "productType": "家具",
              "sales": 448555.8700000005,
            },
            {
              "productType": "技术",
              "sales": 335073.03200000024,
            },
          ],
        }
      `)
    } finally {
      builder.doc.destroy()
    }
  })

  it('nested-filters', async () => {
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
      builder.whereFilter
        .add('area', (node) => node.setOperator('eq').setValue('华东'))
        .addGroup('or', (group) => {
          group.add('product_type', (node) => node.setOperator('eq').setValue('办公用品'))
          group.add('product_type', (node) => node.setOperator('eq').setValue('家具'))
        })
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
            "conditions": [
              {
                "field": "area",
                "id": "id-1",
                "op": "eq",
                "value": "华东",
              },
              {
                "conditions": [
                  {
                    "field": "product_type",
                    "id": "id-3",
                    "op": "eq",
                    "value": "办公用品",
                  },
                  {
                    "field": "product_type",
                    "id": "id-4",
                    "op": "eq",
                    "value": "家具",
                  },
                ],
                "id": "id-2",
                "op": "or",
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
          "where": {
            "conditions": [
              {
                "field": "area",
                "op": "eq",
                "value": "华东",
              },
              {
                "conditions": [
                  {
                    "field": "product_type",
                    "op": "eq",
                    "value": "办公用品",
                  },
                  {
                    "field": "product_type",
                    "op": "eq",
                    "value": "家具",
                  },
                ],
                "op": "or",
              },
            ],
            "op": "and",
          },
        }
      `)
      expect(result ?? (await builder.query())).toMatchInlineSnapshot(`
        {
          "dataset": [
            {
              "productType": "办公用品",
              "sales": 1408628.5919999965,
            },
            {
              "productType": "家具",
              "sales": 1676224.1299999976,
            },
          ],
        }
      `)
    } finally {
      builder.doc.destroy()
    }
  })
})
