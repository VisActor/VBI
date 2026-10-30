import { rs } from '@rstest/core'
import { VBI, type VBIQueryBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

const MOCK_SYSTEM_TIME = new Date('2026-03-23T00:00:00.000Z')

describe('query / QueryMode', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })

  it('detail-query', async () => {
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
        limit: 5,
      },
    })

    const applyBuilder = (builder: VBIQueryBuilder) => {
      builder.queryMode.setMode('detail')
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
          "limit": 5,
          "orderBy": [
            {
              "field": "region",
              "order": "asc",
            },
          ],
          "select": [
            {
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
              "sales": 2368.8,
            },
            {
              "region": "东北",
              "sales": 4127.76,
            },
            {
              "region": "东北",
              "sales": 12183.36,
            },
            {
              "region": "东北",
              "sales": 2999.36,
            },
            {
              "region": "东北",
              "sales": 510.44,
            },
          ],
        }
      `)
    } finally {
      builder.doc.destroy()
    }
  })

  it('filtered-detail', async () => {
    const builder = VBI.query.create({
      ...VBI.query.createEmpty('demoSupermarket'),
      ...{
        dimensions: [
          {
            id: 'province',
            field: 'province',
            alias: '省份',
          },
        ],
        measures: [
          {
            id: 'sales',
            field: 'sales',
            alias: '单笔销售额',
            aggregate: {
              func: 'sum',
            },
          },
          {
            id: 'amount',
            field: 'amount',
            alias: '件数',
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
      builder.limit.setLimit(5)

      return { query: builder.buildVQuery(), result: await builder.query() }
    }
    try {
      const result = await applyBuilder(builder)
      expect(builder.build()).toMatchInlineSnapshot(`
        {
          "connectorId": "demoSupermarket",
          "dimensions": [
            {
              "alias": "省份",
              "field": "province",
              "id": "province",
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
              "alias": "单笔销售额",
              "field": "sales",
              "id": "sales",
              "sort": {
                "order": "desc",
              },
            },
            {
              "aggregate": {
                "func": "sum",
              },
              "alias": "件数",
              "field": "amount",
              "id": "amount",
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
          "limit": 5,
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
              "alias": "amount",
              "field": "amount",
            },
            {
              "alias": "province",
              "field": "province",
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
          "query": {
            "limit": 5,
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
                "alias": "amount",
                "field": "amount",
              },
              {
                "alias": "province",
                "field": "province",
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
          },
          "result": {
            "dataset": [
              {
                "amount": 12,
                "province": "上海",
                "sales": 29124.48,
              },
              {
                "amount": 9,
                "province": "上海",
                "sales": 27112.68,
              },
              {
                "amount": 9,
                "province": "福建",
                "sales": 27112.68,
              },
              {
                "amount": 9,
                "province": "山东",
                "sales": 27047.16,
              },
              {
                "amount": 13,
                "province": "山东",
                "sales": 26548.34,
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
