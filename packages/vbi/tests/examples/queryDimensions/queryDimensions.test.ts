import { rs } from '@rstest/core'
import { VBI, type VBIQueryBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

const MOCK_SYSTEM_TIME = new Date('2026-03-23T00:00:00.000Z')

describe('query / Dimensions', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })

  it('add-dimension', async () => {
    const builder = VBI.query.create({
      ...VBI.query.createEmpty('demoSupermarket'),
      ...{
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
        limit: 5,
      },
    })

    const applyBuilder = (builder: VBIQueryBuilder) => {
      builder.dimensions.add('area', (node) => node.setAlias('区域'))
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
              "id": "id-1",
            },
          ],
          "havingFilter": {
            "conditions": [],
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
          "limit": 5,
          "orderBy": [
            {
              "field": "id-1",
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
              "alias": "id-1",
              "field": "area",
            },
          ],
        }
      `)
      expect(result ?? (await builder.query())).toMatchInlineSnapshot(`
        {
          "dataset": [
            {
              "id-1": "东北",
              "sales": 2681567.469000001,
            },
            {
              "id-1": "中南",
              "sales": 4137415.0929999948,
            },
            {
              "id-1": "华东",
              "sales": 4684506.442,
            },
            {
              "id-1": "华北",
              "sales": 2447301.017000004,
            },
            {
              "id-1": "西北",
              "sales": 815039.5959999998,
            },
          ],
        }
      `)
    } finally {
      builder.doc.destroy()
    }
  })

  it('sort-dimension', async () => {
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
      builder.dimensions.update('region', (node) => node.setAlias('销售区域').setSort({ order: 'asc' }))
    }
    try {
      const result = await applyBuilder(builder)
      expect(builder.build()).toMatchInlineSnapshot(`
        {
          "connectorId": "demoSupermarket",
          "dimensions": [
            {
              "alias": "销售区域",
              "field": "area",
              "id": "region",
              "sort": {
                "order": "asc",
              },
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
        }
      `)
      expect(result ?? (await builder.query())).toMatchInlineSnapshot(`
        {
          "dataset": [
            {
              "region": "东北",
              "sales": 2681567.469000001,
            },
            {
              "region": "中南",
              "sales": 4137415.0929999948,
            },
            {
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

  it('remove-dimension', async () => {
    const builder = VBI.query.create({
      ...VBI.query.createEmpty('demoSupermarket'),
      ...{
        dimensions: [
          {
            id: 'region',
            field: 'area',
            alias: '区域',
          },
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
        limit: 5,
      },
    })

    const applyBuilder = (builder: VBIQueryBuilder) => {
      builder.dimensions.remove('productType')
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
              "sales": 2681567.469000001,
            },
            {
              "region": "中南",
              "sales": 4137415.0929999948,
            },
            {
              "region": "华东",
              "sales": 4684506.442,
            },
            {
              "region": "华北",
              "sales": 2447301.017000004,
            },
            {
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

  it('monthly-sales', async () => {
    const builder = VBI.query.create({
      ...VBI.query.createEmpty('demoSupermarket'),
      ...{
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
        limit: 5,
      },
    })

    const applyBuilder = (builder: VBIQueryBuilder) => {
      builder.dimensions.add('order_date', (node) =>
        node.setAlias('月份').setAggregate({ func: 'toMonth' }).setSort({ order: 'asc' }),
      )
    }
    try {
      const result = await applyBuilder(builder)
      expect(builder.build()).toMatchInlineSnapshot(`
        {
          "connectorId": "demoSupermarket",
          "dimensions": [
            {
              "aggregate": {
                "func": "toMonth",
              },
              "alias": "月份",
              "field": "order_date",
              "id": "id-1",
              "sort": {
                "order": "asc",
              },
            },
          ],
          "havingFilter": {
            "conditions": [],
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
            "id-1",
          ],
          "limit": 5,
          "orderBy": [
            {
              "field": "id-1",
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
                "func": "to_month",
              },
              "alias": "id-1",
              "field": "order_date",
            },
          ],
        }
      `)
      expect(result ?? (await builder.query())).toMatchInlineSnapshot(`
        {
          "dataset": [
            {
              "id-1": "2016-01",
              "sales": 231597.61799999993,
            },
            {
              "id-1": "2016-02",
              "sales": 104936.37,
            },
            {
              "id-1": "2016-03",
              "sales": 167173.72700000007,
            },
            {
              "id-1": "2016-04",
              "sales": 96052.85200000001,
            },
            {
              "id-1": "2016-05",
              "sales": 232199.1070000001,
            },
          ],
        }
      `)
    } finally {
      builder.doc.destroy()
    }
  })
})
