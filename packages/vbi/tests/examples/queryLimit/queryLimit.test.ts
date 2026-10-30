import { rs } from '@rstest/core'
import { VBI, type VBIQueryBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

const MOCK_SYSTEM_TIME = new Date('2026-03-23T00:00:00.000Z')

describe('query / Limit', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })

  it('top-regions', async () => {
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
            sort: {
              order: 'desc',
            },
          },
        ],
      },
    })

    const applyBuilder = (builder: VBIQueryBuilder) => {
      builder.limit.setLimit(3)
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
              "region": "华东",
              "sales": 4684506.442,
            },
            {
              "region": "中南",
              "sales": 4137415.0929999948,
            },
            {
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
})
