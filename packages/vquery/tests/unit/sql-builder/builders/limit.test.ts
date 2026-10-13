import { convertDSLToDuckDB } from '@visactor/vquery'

describe('limit', () => {
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
        limit: 100,
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(`"select "id" from "orders" limit 100"`)
  })
})
