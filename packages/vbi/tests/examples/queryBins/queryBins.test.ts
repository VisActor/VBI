import { rs } from '@rstest/core'
import { VBI, type VBIQueryBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

const MOCK_SYSTEM_TIME = new Date('2026-03-23T00:00:00.000Z')

describe('query / QueryBins', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })

  it('basic-bins', async () => {
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
      return await builder.queryBins({ columns: ['sales'] })
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

  it('numeric-bins', async () => {
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
      },
    })

    const applyBuilder = async (builder: VBIQueryBuilder) => {
      builder.queryMode.setMode('detail')
      builder.whereFilter.add('sales', (node) => node.setOperator('between').setValue([100, 1000]))
      builder.limit.setLimit(20)

      return builder.queryBins({ columns: ['sales'], maxBins: 4, discreteMax: 3 })
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
          "limit": 20,
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
          "limit": 20,
          "select": [
            {
              "alias": "sales",
              "field": "sales",
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
          "columns": {
            "sales": {
              "bins": [
                {
                  "count": 10,
                  "max": 288.036,
                  "min": 106.008,
                },
                {
                  "count": 5,
                  "max": 470.0640000000001,
                  "min": 288.036,
                },
                {
                  "count": 2,
                  "max": 652.092,
                  "min": 470.0640000000001,
                },
                {
                  "count": 3,
                  "max": 834.12,
                  "min": 652.092,
                },
              ],
              "max": 834.12,
              "min": 106.008,
              "missingCount": 0,
              "validCount": 20,
            },
          },
          "rowCount": 20,
        }
      `)
    } finally {
      builder.doc.destroy()
    }
  })
})
