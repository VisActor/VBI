import { convertDSLToDuckDB } from '@visactor/vquery'

describe('select', () => {
  it('simple', () => {
    interface USER {
      id: number
      name: string
      age: number
      department: string
      active: number
    }

    const sql = convertDSLToDuckDB<USER, 'orders'>(
      {
        select: ['id'],
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(`"select "id" from "orders""`)
  })

  it('only select', () => {
    interface USER {
      sales: number
      profit: number
    }

    const sql = convertDSLToDuckDB<USER, 'demoDataset'>(
      {
        select: [
          {
            field: 'sales',
            alias: 'Sum(sales)',
            aggr: { func: 'sum' },
          },
          {
            field: 'profit',
            alias: 'Sum(profit)',
            aggr: { func: 'sum' },
          },
        ],
        limit: 1000,
      },
      'demoDataset',
    )
    expect(sql).toMatchInlineSnapshot(
      `"select sum("sales") as "Sum(sales)", sum("profit") as "Sum(profit)" from "demoDataset" limit 1000"`,
    )
  })

  it('func', () => {
    interface USER {
      id: number
      name: string
      age: number
      department: string
      active: number
    }

    const sql = convertDSLToDuckDB<USER, 'orders'>(
      {
        select: [
          'department',
          'name',
          {
            field: 'age',
            alias: 'AGE',
            aggr: { func: 'avg' },
          },
        ],
        groupBy: ['department', 'name'],
        orderBy: [
          {
            field: 'age',
            order: 'desc',
          },
        ],
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(
      `"select "department", "name", avg("age") as "AGE" from "orders" group by "department", "name" order by "age" desc nulls last"`,
    )
  })

  it('only alias', () => {
    interface USER {
      id: number
      name: string
      age: number
      department: string
      active: number
    }

    const sql = convertDSLToDuckDB<USER, 'orders'>(
      {
        select: [
          'department',
          {
            field: 'name',
            alias: 'NAME',
          },
          {
            field: 'age',
            alias: 'AGE',
            aggr: { func: 'avg' },
          },
        ],
        groupBy: ['department', 'name'],
        orderBy: [
          {
            field: 'age',
            order: 'desc',
          },
        ],
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(
      `"select "department", "name" as "NAME", avg("age") as "AGE" from "orders" group by "department", "name" order by "age" desc nulls last"`,
    )
  })

  it('only field', () => {
    interface USER {
      id: number
      name: string
      age: number
      department: string
      active: number
    }

    const sql = convertDSLToDuckDB<USER, 'orders'>(
      {
        select: [
          {
            field: 'department',
          },
          {
            field: 'name',
            alias: 'NAME',
          },
          {
            field: 'age',
            alias: 'AGE',
            aggr: { func: 'avg' },
          },
        ],
        groupBy: ['department', 'name'],
        orderBy: [
          {
            field: 'age',
            order: 'desc',
          },
        ],
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(
      `"select "department" as "department", "name" as "NAME", avg("age") as "AGE" from "orders" group by "department", "name" order by "age" desc nulls last"`,
    )
  })

  it('aggregates without alias', () => {
    interface USER {
      id: number
      name: string
      age: number
      department: string
      active: number
    }

    const sql = convertDSLToDuckDB<USER, 'orders'>(
      {
        select: [
          { field: 'age', aggr: { func: 'sum' }, alias: 'SUM' },
          { field: 'age', aggr: { func: 'min' }, alias: 'MIN' },
          { field: 'age', aggr: { func: 'max' }, alias: 'MAX' },
          { field: 'id', aggr: { func: 'count' }, alias: 'CNT' },
        ],
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(
      `"select sum("age") as "SUM", min("age") as "MIN", max("age") as "MAX", count("id") as "CNT" from "orders""`,
    )
  })

  it('select all', () => {
    interface USER {
      id: number
      name: string
      age: number
      department: string
      active: number
    }

    const sql = convertDSLToDuckDB<USER, 'orders'>(
      {
        select: [],
        groupBy: ['department', 'name'],
        orderBy: [
          {
            field: 'age',
            order: 'desc',
          },
        ],
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(
      `"select * from "orders" group by "department", "name" order by "age" desc nulls last"`,
    )
  })

  it('aggregate without alias falls back to field name', () => {
    interface USER {
      id: number
      age: number
    }
    const sql = convertDSLToDuckDB<USER, 'orders'>({ select: [{ field: 'age', aggr: { func: 'avg' } }] }, 'orders')
    expect(sql).toMatchInlineSnapshot(`"select avg("age") as "age" from "orders""`)
  })

  it('uses the median quantile by default', () => {
    interface ORDER {
      value: number
    }

    const sql = convertDSLToDuckDB<ORDER, 'orders'>(
      { select: [{ field: 'value', aggr: { func: 'quantile' } }] },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(`"select quantile("value", CAST(0.5 AS DOUBLE)) as "value" from "orders""`)
  })
})
