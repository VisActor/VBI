import { rs } from '@rstest/core'
import { VBI, type VBIQueryBuilder } from '@visactor/vbi'
import { registerDemoConnector } from '../../demoConnector'

const MOCK_SYSTEM_TIME = new Date('2026-03-23T00:00:00.000Z')

describe('query / UndoManager', () => {
  beforeAll(async () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(MOCK_SYSTEM_TIME)
    registerDemoConnector()
  })

  afterAll(() => {
    rs.useRealTimers()
  })

  it('undo-redo', async () => {
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

    const applyBuilder = async (builder: VBIQueryBuilder) => {
      builder.undoManager.clear()
      builder.limit.setLimit(1)
      builder.undoManager.undo()
      const afterUndo = builder.limit.getLimit()
      builder.undoManager.redo()
      const afterRedo = builder.limit.getLimit()
      return { afterUndo, afterRedo, result: await builder.query() }
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
          "limit": 1,
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
          "limit": 1,
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
          "afterRedo": 1,
          "afterUndo": 5,
          "result": {
            "dataset": [
              {
                "region": "东北",
                "sales": 2681567.469000001,
              },
            ],
          },
        }
      `)
    } finally {
      builder.doc.destroy()
    }
  })

  it('transaction-undo-redo', async () => {
    const builder = VBI.query.create({
      ...VBI.query.createEmpty('demoSupermarket'),
      ...{
        limit: 5,
      },
    })

    const applyBuilder = async (builder: VBIQueryBuilder) => {
      builder.undoManager.clear()
      let revisions = 0
      const onChange = () => {
        revisions += 1
      }
      builder.observeDeep(onChange)
      builder.doc.transact(() => {
        builder.dimensions.add('product_type', (node) => node.setAlias('品类'))
        builder.measures.add('sales', (node) => node.setAlias('销售额').setAggregate({ func: 'sum' }))
        builder.whereFilter.add('province', (node) => node.setOperator('eq').setValue('浙江'))
        builder.limit.setLimit(3)
      })

      builder.undoManager.undo()
      const afterUndo = { empty: builder.isEmpty(), limit: builder.limit.getLimit() }
      builder.undoManager.redo()
      const afterRedo = { empty: builder.isEmpty(), limit: builder.limit.getLimit() }
      const result = await builder.query()
      builder.unobserveDeep(onChange)

      return { afterUndo, afterRedo, revisions, result }
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
              "id": "id-1",
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
              "id": "id-2",
            },
          ],
          "uuid": "uuid-1",
          "version": 0,
          "whereFilter": {
            "conditions": [
              {
                "field": "province",
                "id": "id-3",
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
          "limit": 3,
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
              "alias": "id-2",
              "field": "sales",
            },
            {
              "alias": "id-1",
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
          "afterRedo": {
            "empty": false,
            "limit": 3,
          },
          "afterUndo": {
            "empty": true,
            "limit": 5,
          },
          "result": {
            "dataset": [
              {
                "id-1": "办公用品",
                "id-2": 145678.31599999996,
              },
              {
                "id-1": "家具",
                "id-2": 137580.35199999998,
              },
              {
                "id-1": "技术",
                "id-2": 168849.576,
              },
            ],
          },
          "revisions": 3,
        }
      `)
    } finally {
      builder.doc.destroy()
    }
  })
})
