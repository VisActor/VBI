import { executeSQL } from '../../../src/adapters/query/in-memory/execute'
import { parseSQL } from '../../../src/sql/parser'

it('preserves null predicates and three-valued boolean logic', () => {
  const rows = [{ value: null }, { value: 3 }]
  expect(executeSQL(parseSQL('select * from orders where value is null'), rows)).toEqual([{ value: null }])
  expect(executeSQL(parseSQL('select * from orders where value is not null'), rows)).toEqual([{ value: 3 }])
  expect(executeSQL(parseSQL('select * from orders where null = 1 and 1 = 1'), rows)).toEqual([])
  expect(executeSQL(parseSQL('select * from orders where null = 1 or 1 = 0'), rows)).toEqual([])
})

it('computes extrema regardless of input ordering', () => {
  expect(
    executeSQL(parseSQL('select min(value) as minimum, max(value) as maximum from orders'), [
      { value: 3 },
      { value: 9 },
      { value: 1 },
    ]),
  ).toEqual([{ minimum: 1, maximum: 9 }])
})

it('keeps explicit and default NULL ordering independent of sort direction', () => {
  const rows = [{ value: null }, { value: 2 }, { value: 1 }]
  for (const direction of ['asc', 'desc']) {
    const sorted = direction === 'asc' ? [{ value: 1 }, { value: 2 }] : [{ value: 2 }, { value: 1 }]
    for (const suffix of ['', ' nulls last'])
      expect(executeSQL(parseSQL(`select * from orders order by value ${direction}${suffix}`), rows)).toEqual([
        ...sorted,
        { value: null },
      ])
    expect(executeSQL(parseSQL(`select * from orders order by value ${direction} nulls first`), rows)).toEqual([
      { value: null },
      ...sorted,
    ])
  }
  expect(() => parseSQL('select * from orders order by value nulls random')).toThrow('Expected last')
})

it('uses literal backslashes for DSL LIKE patterns', () => {
  const rows = [{ label: 'a\\_b' }, { label: 'a_b' }]
  expect(executeSQL(parseSQL("select * from orders where label like 'a\\_b' escape ''"), rows)).toEqual([
    { label: 'a\\_b' },
  ])
  expect(() => parseSQL("select * from orders where label like 'a%' escape '!'")).toThrow('Only empty LIKE escape')
  expect(() => parseSQL("select * from orders where label like 'a%' escape label")).toThrow('Only empty LIKE escape')
})

it('matches DuckDB DOUBLE quantile rounding near integer rank boundaries', () => {
  const rows = Array.from({ length: 50 }, (_, index) => ({ value: index + 1 }))
  expect(executeSQL(parseSQL('select quantile(value, 0.14) as q from orders'), rows)).toEqual([{ q: 7 }])
  expect(executeSQL(parseSQL('select quantile(value, -0.14) as q from orders'), rows)).toEqual([{ q: 44 }])
  expect(executeSQL(parseSQL('select quantile(value, 0.140000000000001) as q from orders'), rows)).toEqual([{ q: 8 }])
  expect(
    executeSQL(parseSQL('select * from orders order by value, id'), [
      { id: 2, value: undefined },
      { id: 1, value: null },
    ]),
  ).toEqual([
    { id: 1, value: null },
    { id: 2, value: undefined },
  ])
})
