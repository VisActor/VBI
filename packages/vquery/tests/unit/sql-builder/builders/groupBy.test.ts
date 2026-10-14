import { convertDSLToDuckDB } from '@visactor/vquery'

describe('groupBy', () => {
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
        select: ['id', 'department'],
        limit: 100,
        groupBy: ['id', 'department'],
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(`"select "id", "department" from "orders" group by "id", "department" limit 100"`)
  })
})
