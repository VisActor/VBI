import { rs } from '@rstest/core'
import { VBI, type VBIQueryBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

const MOCK_SYSTEM_TIME = new Date('2026-03-23T00:00:00.000Z')

describe('query / Measures', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })

  it('sum-sales', async () => {
    const builder = VBI.query.create({
      ...VBI.query.createEmpty('demoSupermarket'),
      ...{},
    })

    const applyBuilder = (builder: VBIQueryBuilder) => {
      builder.measures.add('sales', (node) => node.setAlias('销售额合计').setAggregate({ func: 'sum' }))
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
          "groupBy": [],
          "limit": 1000,
          "select": [
            {
              "aggr": {
                "func": "sum",
              },
              "alias": "id-1",
              "field": "sales",
            },
          ],
        }
      `)
      expect(result ?? (await builder.query())).toMatchInlineSnapshot(`
        {
          "dataset": [
            {
              "id-1": 16068954.12500003,
            },
          ],
        }
      `)
    } finally {
      builder.doc.destroy()
    }
  })

  it('average-sales', async () => {
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
      builder.measures.update('sales', (node) => node.setAlias('平均销售额').setAggregate({ func: 'avg' }))
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
            "conditions": [],
            "id": "root",
            "op": "and",
          },
          "limit": 3,
          "measures": [
            {
              "aggregate": {
                "func": "avg",
              },
              "alias": "平均销售额",
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
            "area",
          ],
          "limit": 3,
          "orderBy": [
            {
              "field": "region",
              "order": "asc",
            },
          ],
          "select": [
            {
              "aggr": {
                "func": "avg",
              },
              "alias": "sales",
              "field": "sales",
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
              "region": "东北",
              "sales": 1609.584315126051,
            },
            {
              "region": "中南",
              "sales": 1603.027932196821,
            },
            {
              "region": "华东",
              "sales": 1591.2046338315217,
            },
          ],
        }
      `)
    } finally {
      builder.doc.destroy()
    }
  })

  it('sales-and-profit', async () => {
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
        limit: 3,
      },
    })

    const applyBuilder = (builder: VBIQueryBuilder) => {
      builder.measures
        .add('sales', (node) => node.setAlias('销售额').setAggregate({ func: 'sum' }).setSort({ order: 'desc' }))
        .add('profit', (node) => node.setAlias('利润').setAggregate({ func: 'sum' }))
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
              "id": "id-1",
              "sort": {
                "order": "desc",
              },
            },
            {
              "aggregate": {
                "func": "sum",
              },
              "alias": "利润",
              "field": "profit",
              "id": "id-2",
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
          "limit": 3,
          "orderBy": [
            {
              "field": "id-1",
              "order": "desc",
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
              "id-1": 5734340.829,
              "id-2": 638735.6290000005,
              "productType": "家具",
            },
            {
              "id-1": 5469023.503999994,
              "id-2": 751162.9440000018,
              "productType": "技术",
            },
            {
              "id-1": 4865589.791999991,
              "id-2": 757640.3519999951,
              "productType": "办公用品",
            },
          ],
        }
      `)
    } finally {
      builder.doc.destroy()
    }
  })
})
