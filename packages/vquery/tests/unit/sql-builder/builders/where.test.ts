import { convertDSLToDuckDB } from '@visactor/vquery'

describe('where', () => {
  it('simple', () => {
    interface USER {
      id: number
      name: string
      age: number
      department: string
      active: number
      gender: 'male' | 'female'
    }

    const sql = convertDSLToDuckDB<USER, 'orders'>(
      {
        select: ['id'],
        where: {
          op: 'or',
          conditions: [
            {
              op: 'and',
              conditions: [
                {
                  field: 'age',
                  op: '>=',
                  value: 18,
                },
                {
                  field: 'gender',
                  op: '=',
                  value: 'male',
                },
              ],
            },
            {
              op: 'and',
              conditions: [
                {
                  field: 'age',
                  op: '<',
                  value: 18,
                },
                {
                  field: 'gender',
                  op: '=',
                  value: 'female',
                },
              ],
            },
          ],
        },
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(
      `"select "id" from "orders" where (("age" >= 18 and "gender" = 'male') or ("age" < 18 and "gender" = 'female'))"`,
    )
  })

  it('empty', () => {
    interface USER {
      id: number
      name: string
      age: number
      department: string
      active: number
      gender: 'male' | 'female'
    }

    const sql = convertDSLToDuckDB<USER, 'orders'>(
      {
        select: ['id'],
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(`"select "id" from "orders""`)
  })

  it('is null & is not null', () => {
    interface USER {
      id: number
      name: string
      age: number
      department: string
      active: number
      gender: 'male' | 'female'
    }

    const sql = convertDSLToDuckDB<USER, 'orders'>(
      {
        select: ['id'],
        where: {
          op: 'or',
          conditions: [
            {
              op: 'and',
              conditions: [
                {
                  field: 'age',
                  op: '>=',
                  value: 18,
                },
                {
                  field: 'gender',
                  op: 'is null',
                },
              ],
            },
            {
              op: 'and',
              conditions: [
                {
                  field: 'age',
                  op: '<',
                  value: 18,
                },
                {
                  field: 'gender',
                  op: 'is not null',
                },
              ],
            },
          ],
        },
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(
      `"select "id" from "orders" where (("age" >= 18 and "gender" is null) or ("age" < 18 and "gender" is not null))"`,
    )
  })

  it('in & not in', () => {
    interface USER {
      id: number
      name: string
      age: number
      department: string
      active: number
      gender: 'male' | 'female'
    }

    const sql = convertDSLToDuckDB<USER, 'orders'>(
      {
        select: ['id'],
        where: {
          op: 'or',
          conditions: [
            {
              op: 'and',
              conditions: [
                {
                  field: 'age',
                  op: '>=',
                  value: 18,
                },
                {
                  field: 'gender',
                  op: 'in',
                  value: ['male', 'female'],
                },
              ],
            },
            {
              op: 'and',
              conditions: [
                {
                  field: 'age',
                  op: '<',
                  value: 18,
                },
                {
                  field: 'gender',
                  op: 'not in',
                  value: ['male', 'female'],
                },
              ],
            },
          ],
        },
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(
      `"select "id" from "orders" where (("age" >= 18 and "gender" in ('male', 'female')) or ("age" < 18 and not "gender" in ('male', 'female')))"`,
    )
  })

  it('between & not between', () => {
    interface USER {
      id: number
      name: string
      age: number
      department: string
      active: number
      gender: 'male' | 'female'
    }

    const sql = convertDSLToDuckDB<USER, 'orders'>(
      {
        select: ['id'],
        where: {
          op: 'or',
          conditions: [
            {
              op: 'and',
              conditions: [
                {
                  field: 'age',
                  op: 'between',
                  value: [18, 30],
                },
                {
                  field: 'gender',
                  op: 'in',
                  value: ['male', 'female'],
                },
              ],
            },
            {
              op: 'and',
              conditions: [
                {
                  field: 'age',
                  op: 'not between',
                  value: [18, 30],
                },
                {
                  field: 'gender',
                  op: 'not in',
                  value: ['male', 'female'],
                },
              ],
            },
          ],
        },
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(
      `"select "id" from "orders" where (("age" between 18 and 30 and "gender" in ('male', 'female')) or ("age" not between 18 and 30 and not "gender" in ('male', 'female')))"`,
    )
  })

  it('in with single value', () => {
    interface USER {
      id: number
      gender: 'male' | 'female'
    }
    const sql = convertDSLToDuckDB<USER, 'orders'>(
      { select: ['id'], where: { op: 'and', conditions: [{ field: 'gender', op: 'in', value: 'male' }] } },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(`"select "id" from "orders" where ("gender" in ('male'))"`)
  })

  it('not in with single value', () => {
    interface USER {
      id: number
      gender: 'male' | 'female'
    }
    const sql = convertDSLToDuckDB<USER, 'orders'>(
      { select: ['id'], where: { op: 'and', conditions: [{ field: 'gender', op: 'not in', value: 'female' }] } },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(`"select "id" from "orders" where (not "gender" in ('female'))"`)
  })

  it('date string comparison operators', () => {
    interface ORDER {
      id: number
      order_date: string
    }

    const sql = convertDSLToDuckDB<ORDER, 'orders'>(
      {
        select: ['id'],
        where: {
          op: 'and',
          conditions: [
            {
              field: 'order_date',
              op: '=',
              value: '2024-01-01',
            },
            {
              field: 'order_date',
              op: '>=',
              value: '2024-01-01',
            },
            {
              field: 'order_date',
              op: '<',
              value: '2025-01-01',
            },
          ],
        },
      },
      'orders',
    )

    expect(sql).toMatchInlineSnapshot(
      `"select "id" from "orders" where ("order_date" = '2024-01-01' and "order_date" >= '2024-01-01' and "order_date" < '2025-01-01')"`,
    )
  })

  it('date string between', () => {
    interface ORDER {
      id: number
      order_date: string
    }

    const sql = convertDSLToDuckDB<ORDER, 'orders'>(
      {
        select: ['id'],
        where: {
          op: 'and',
          conditions: [
            {
              field: 'order_date',
              op: 'between',
              value: ['2024-01-01', '2024-12-31'],
            },
          ],
        },
      },
      'orders',
    )

    expect(sql).toMatchInlineSnapshot(
      `"select "id" from "orders" where ("order_date" between '2024-01-01' and '2024-12-31')"`,
    )
  })

  it('timestamp Date comparison operators', () => {
    interface EVENT {
      id: number
      created_at: Date
      updated_at: Date
    }

    const createdAt = new Date('2024-01-01T00:00:00.000Z')
    const updatedAt = new Date('2024-02-01T12:30:00.000Z')
    const sql = convertDSLToDuckDB<EVENT, 'orders'>(
      {
        select: ['id'],
        where: {
          op: 'and',
          conditions: [
            {
              field: 'created_at',
              op: '>=',
              value: createdAt,
            },
            {
              field: 'updated_at',
              op: '<=',
              value: updatedAt,
            },
          ],
        },
      },
      'orders',
    )

    expect(sql).toBe(
      `select "id" from "orders" where ("created_at" >= '${createdAt.toISOString().slice(0, 23).replace('T', ' ')}' and "updated_at" <= '${updatedAt.toISOString().slice(0, 23).replace('T', ' ')}')`,
    )
  })

  it('timestamp Date between', () => {
    interface EVENT {
      id: number
      created_at: Date
    }

    const start = new Date('2024-01-01T00:00:00.000Z')
    const end = new Date('2024-01-31T23:59:59.000Z')
    const sql = convertDSLToDuckDB<EVENT, 'orders'>(
      {
        select: ['id'],
        where: {
          op: 'and',
          conditions: [
            {
              field: 'created_at',
              op: 'between',
              value: [start, end],
            },
          ],
        },
      },
      'orders',
    )

    expect(sql).toBe(
      `select "id" from "orders" where ("created_at" between '${start.toISOString().slice(0, 23).replace('T', ' ')}' and '${end.toISOString().slice(0, 23).replace('T', ' ')}')`,
    )
  })
})
