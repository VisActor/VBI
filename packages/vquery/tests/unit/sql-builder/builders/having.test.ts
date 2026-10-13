import { convertDSLToDuckDB } from '@visactor/vquery'

describe('having', () => {
  it('empty', () => {
    interface USER {
      id: number
      age: number
      department: string
    }

    const sql = convertDSLToDuckDB<USER, 'orders'>(
      {
        select: ['department', { field: 'age', aggr: { func: 'sum' }, alias: 'TOTAL_AGE' }],
        groupBy: ['department'],
      },
      'orders',
    )

    expect(sql).toMatchInlineSnapshot(
      `"select "department", sum("age") as "TOTAL_AGE" from "orders" group by "department""`,
    )
  })

  it('aggregate operators', () => {
    interface USER {
      id: number
      age: number
      department: string
    }

    const sql = convertDSLToDuckDB<USER, 'orders'>(
      {
        select: [
          'department',
          { field: 'age', aggr: { func: 'sum' }, alias: 'SUM_AGE' },
          { field: 'age', aggr: { func: 'avg' }, alias: 'AVG_AGE' },
          { field: 'id', aggr: { func: 'count' }, alias: 'CNT' },
          { field: 'age', aggr: { func: 'min' }, alias: 'MIN_AGE' },
          { field: 'age', aggr: { func: 'max' }, alias: 'MAX_AGE' },
        ],
        groupBy: ['department'],
        having: {
          op: 'and',
          conditions: [
            { field: 'age', aggr: { func: 'sum' }, op: '=', value: 100 },
            { field: 'age', aggr: { func: 'avg' }, op: '=', value: 20 },
            { field: 'id', aggr: { func: 'count' }, op: '=', value: 2 },
            { field: 'age', aggr: { func: 'min' }, op: '=', value: 10 },
            { field: 'age', aggr: { func: 'max' }, op: '=', value: 80 },
          ],
        },
      },
      'orders',
    )

    expect(sql).toMatchInlineSnapshot(
      `"select "department", sum("age") as "SUM_AGE", avg("age") as "AVG_AGE", count("id") as "CNT", min("age") as "MIN_AGE", max("age") as "MAX_AGE" from "orders" group by "department" having (sum("age") = 100 and avg("age") = 20 and count("id") = 2 and min("age") = 10 and max("age") = 80)"`,
    )
  })

  it('advanced aggregate operators', () => {
    interface USER {
      id: number
      age: number
      department: string
    }

    const sql = convertDSLToDuckDB<USER, 'orders'>(
      {
        select: [
          'department',
          { field: 'id', aggr: { func: 'count_distinct' }, alias: 'DISTINCT_ID' },
          { field: 'age', aggr: { func: 'variance' }, alias: 'VAR_AGE' },
          { field: 'age', aggr: { func: 'variance_pop' }, alias: 'VAR_POP_AGE' },
          { field: 'age', aggr: { func: 'quantile', quantile: 0.9 }, alias: 'Q90_AGE' },
        ],
        groupBy: ['department'],
        having: {
          op: 'and',
          conditions: [
            { field: 'id', aggr: { func: 'count_distinct' }, op: '>', value: 1 },
            { field: 'age', aggr: { func: 'variance' }, op: '>=', value: 2 },
            { field: 'age', aggr: { func: 'variance_pop' }, op: '>=', value: 1 },
            { field: 'age', aggr: { func: 'quantile' }, op: '>', value: 20 },
          ],
        },
      },
      'orders',
    )

    expect(sql).toMatchInlineSnapshot(
      `"select "department", count(distinct "id") as "DISTINCT_ID", var_samp("age") as "VAR_AGE", var_pop("age") as "VAR_POP_AGE", quantile("age", CAST(0.9 AS DOUBLE)) as "Q90_AGE" from "orders" group by "department" having (count(distinct "id") > 1 and var_samp("age") >= 2 and var_pop("age") >= 1 and quantile("age", CAST(0.5 AS DOUBLE)) > 20)"`,
    )
  })

  it('aggr + comparison operator', () => {
    interface USER {
      sales: number
      profit: number
      area: string
      province: string
    }

    const sql = convertDSLToDuckDB<USER, 'orders'>(
      {
        select: [
          { field: 'province', alias: 'province', aggr: { func: 'count_distinct' } },
          { field: 'profit', alias: 'profit', aggr: { func: 'sum' } },
          { field: 'area', alias: 'area' },
        ],
        groupBy: ['area'],
        having: {
          op: 'and',
          conditions: [{ field: 'sales', aggr: { func: 'sum' }, op: '>', value: 5 }],
        },
        limit: 1000,
      },
      'orders',
    )

    expect(sql).toMatchInlineSnapshot(
      `"select count(distinct "province") as "province", sum("profit") as "profit", "area" as "area" from "orders" group by "area" having (sum("sales") > 5) limit 1000"`,
    )
  })

  it('nested and/or with comparison', () => {
    interface USER {
      id: number
      age: number
      department: string
    }

    const sql = convertDSLToDuckDB<USER, 'orders'>(
      {
        select: ['department', { field: 'age', aggr: { func: 'avg' }, alias: 'AVG_AGE' }],
        groupBy: ['department'],
        having: {
          op: 'or',
          conditions: [
            {
              op: 'and',
              conditions: [
                { field: 'age', aggr: { func: 'avg' }, op: '>=', value: 18 },
                { field: 'age', aggr: { func: 'avg' }, op: '<=', value: 30 },
              ],
            },
            { field: 'department', aggr: { func: 'min' }, op: '=', value: 'engineering' },
          ],
        },
      },
      'orders',
    )

    expect(sql).toMatchInlineSnapshot(
      `"select "department", avg("age") as "AVG_AGE" from "orders" group by "department" having ((avg("age") >= 18 and avg("age") <= 30) or min("department") = 'engineering')"`,
    )
  })

  it('is null & is not null', () => {
    interface USER {
      id: number
      age: number
      department: string | null
    }

    const sql = convertDSLToDuckDB<USER, 'orders'>(
      {
        select: ['department', { field: 'age', aggr: { func: 'sum' }, alias: 'TOTAL_AGE' }],
        groupBy: ['department'],
        having: {
          op: 'or',
          conditions: [
            { field: 'department', aggr: { func: 'min' }, op: 'is null' },
            { field: 'department', aggr: { func: 'max' }, op: 'is not null' },
          ],
        },
      },
      'orders',
    )

    expect(sql).toMatchInlineSnapshot(
      `"select "department", sum("age") as "TOTAL_AGE" from "orders" group by "department" having (min("department") is null or max("department") is not null)"`,
    )
  })

  it('between & not between', () => {
    interface USER {
      id: number
      age: number
      department: string
    }

    const sql = convertDSLToDuckDB<USER, 'orders'>(
      {
        select: ['department', { field: 'age', aggr: { func: 'avg' }, alias: 'AVG_AGE' }],
        groupBy: ['department'],
        having: {
          op: 'or',
          conditions: [
            { field: 'age', aggr: { func: 'sum' }, op: 'between', value: [18, 30] },
            { field: 'age', aggr: { func: 'sum' }, op: 'not between', value: [40, 50] },
          ],
        },
      },
      'orders',
    )

    expect(sql).toMatchInlineSnapshot(
      `"select "department", avg("age") as "AVG_AGE" from "orders" group by "department" having (sum("age") between 18 and 30 or sum("age") not between 40 and 50)"`,
    )
  })

  it('in & not in with single value', () => {
    interface USER {
      id: number
      age: number
      department: string
    }

    const sql = convertDSLToDuckDB<USER, 'orders'>(
      {
        select: ['department', { field: 'age', aggr: { func: 'sum' }, alias: 'TOTAL_AGE' }],
        groupBy: ['department'],
        having: {
          op: 'and',
          conditions: [
            { field: 'department', aggr: { func: 'min' }, op: 'in', value: 'sales' },
            { field: 'department', aggr: { func: 'min' }, op: 'not in', value: 'finance' },
          ],
        },
      },
      'orders',
    )

    expect(sql).toMatchInlineSnapshot(
      `"select "department", sum("age") as "TOTAL_AGE" from "orders" group by "department" having (min("department") in ('sales') and not min("department") in ('finance'))"`,
    )
  })

  it('throws when aggr is missing', () => {
    interface USER {
      age: number
      department: string
    }

    expect(() =>
      convertDSLToDuckDB<USER, 'orders'>(
        {
          select: ['department', { field: 'age', aggr: { func: 'sum' }, alias: 'TOTAL_AGE' }],
          groupBy: ['department'],
          having: {
            op: 'and',
            conditions: [{ field: 'age', op: '>', value: 1 } as never],
          },
        },
        'orders',
      ),
    ).toThrow(`Invalid having clause for field "age": aggr.func is required`)
  })
})
