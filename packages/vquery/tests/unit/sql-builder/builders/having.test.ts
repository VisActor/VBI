import { convertDSLToSQL } from '@visactor/vquery'

describe('having aggregation operators', () => {
  it('should handle sum operator', () => {
    interface ORDER {
      id: number
      amount: number
      region: string
    }

    const sql = convertDSLToSQL<ORDER, 'orders'>(
      {
        select: ['region', 'total'],
        groupBy: ['region'],
        having: {
          op: 'and',
          conditions: [
            {
              field: 'total',
              op: 'sum',
              value: 1000,
            },
          ],
        },
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(
      `"select "region", "total" from "orders" group by "region" having (sum("total") = 1000)"`,
    )
  })

  it('should handle avg operator', () => {
    interface ORDER {
      id: number
      amount: number
      region: string
    }

    const sql = convertDSLToSQL<ORDER, 'orders'>(
      {
        select: ['region', 'avg_amount'],
        groupBy: ['region'],
        having: {
          op: 'and',
          conditions: [
            {
              field: 'avg_amount',
              op: 'avg',
              value: 500,
            },
          ],
        },
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(
      `"select "region", "avg_amount" from "orders" group by "region" having (avg("avg_amount") = 500)"`,
    )
  })

  it('should handle count operator', () => {
    interface ORDER {
      id: number
      amount: number
      region: string
    }

    const sql = convertDSLToSQL<ORDER, 'orders'>(
      {
        select: ['region', 'cnt'],
        groupBy: ['region'],
        having: {
          op: 'and',
          conditions: [
            {
              field: 'cnt',
              op: 'count',
              value: 10,
            },
          ],
        },
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(
      `"select "region", "cnt" from "orders" group by "region" having (count("cnt") = 10)"`,
    )
  })

  it('should handle min operator', () => {
    interface ORDER {
      id: number
      amount: number
      region: string
    }

    const sql = convertDSLToSQL<ORDER, 'orders'>(
      {
        select: ['region', 'min_amount'],
        groupBy: ['region'],
        having: {
          op: 'and',
          conditions: [
            {
              field: 'min_amount',
              op: 'min',
              value: 100,
            },
          ],
        },
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(
      `"select "region", "min_amount" from "orders" group by "region" having (min("min_amount") = 100)"`,
    )
  })

  it('should handle max operator', () => {
    interface ORDER {
      id: number
      amount: number
      region: string
    }

    const sql = convertDSLToSQL<ORDER, 'orders'>(
      {
        select: ['region', 'max_amount'],
        groupBy: ['region'],
        having: {
          op: 'and',
          conditions: [
            {
              field: 'max_amount',
              op: 'max',
              value: 1000,
            },
          ],
        },
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(
      `"select "region", "max_amount" from "orders" group by "region" having (max("max_amount") = 1000)"`,
    )
  })
})
