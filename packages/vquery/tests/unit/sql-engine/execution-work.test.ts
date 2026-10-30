import { executeSQL } from '../../../src/adapters/query/in-memory/execute'
import { parseSQL } from '../../../src/sql/parser'

it('reads numeric aggregate arguments once per row and retains null and numeric coercion semantics', () => {
  let reads = 0
  const rows = [2, '3', null, undefined, NaN, -5, 0, 2].map((value) => ({
    get n() {
      reads++
      return value
    },
  }))
  expect(executeSQL(parseSQL('select sum(n) as total from t'), rows)).toEqual([{ total: 2 }])
  expect(reads).toBe(rows.length)
  reads = 0
  expect(executeSQL(parseSQL('select avg(n) as mean from t'), rows)).toEqual([{ mean: 0.4 }])
  expect(reads).toBe(rows.length)
  expect(
    executeSQL(parseSQL('select count(distinct n) as unique, min(n) as minimum, max(n) as maximum from t'), [
      { n: 2 },
      { n: 2 },
      { n: -1 },
      { n: null },
    ]),
  ).toEqual([{ unique: 2, minimum: -1, maximum: 2 }])
})

it('orders strings by Unicode code points, including prefixes and unpaired surrogates', () => {
  const values = ['😀a', '\ue000a', '\ud800', '\udc00', 'a😀', 'a', 'aa', '𐀀', '\uffff', '😀', '']
  const rows = values.map((value) => ({ value }))
  expect(executeSQL(parseSQL('select value from t order by value'), rows)).toEqual(
    ['', 'a', 'aa', 'a😀', '\ud800', '\udc00', '\ue000a', '\uffff', '𐀀', '😀', '😀a'].map((value) => ({ value })),
  )
  expect(executeSQL(parseSQL('select min(value) as minimum, max(value) as maximum from t'), rows)).toEqual([
    { minimum: '', maximum: '😀a' },
  ])
})

it('evaluates visited sort expressions once per row, including nulls, only for the current execution', () => {
  const values = [null, 3, undefined, -1, 0, null, 2, 3]
  let reads = 0
  const rows = values.map((_, id) => ({
    id,
    get n() {
      reads++
      return values[id]
    },
  }))
  const query = parseSQL('select id from t order by abs(n), id')
  expect(executeSQL(query, rows)).toEqual([4, 3, 6, 1, 7, 0, 2, 5].map((id) => ({ id })))
  expect(reads).toBe(rows.length)
  values[0] = 0
  reads = 0
  expect(executeSQL(query, rows)).toEqual([0, 4, 3, 6, 1, 7, 2, 5].map((id) => ({ id })))
  expect(reads).toBe(rows.length)
})

it('keeps later sort expressions unevaluated until preceding keys tie', () => {
  const query = parseSQL('select id from t order by id, n * n')
  expect(
    executeSQL(query, [
      { id: 2, n: 1e308 },
      { id: 1, n: 1e308 },
    ]),
  ).toEqual([{ id: 1 }, { id: 2 }])
  expect(() =>
    executeSQL(query, [
      { id: 1, n: 1e308 },
      { id: 1, n: 1e308 },
    ]),
  ).toThrow('out of range')
  expect(executeSQL(parseSQL('select id from t order by n * n'), [{ id: 1, n: 1e308 }])).toEqual([{ id: 1 }])
})

it('evaluates a tied group key once per group while preserving aggregate alias resolution', () => {
  let reads = 0
  const rows = Array.from({ length: 40 }, (_, id) => ({
    get n() {
      reads++
      return id % 20
    },
  }))
  const result = executeSQL(
    parseSQL('select abs(n) as bucket, count(*) as count from t group by bucket order by count'),
    rows,
  )
  expect(result.sort((a, b) => Number(a.bucket) - Number(b.bucket))).toEqual(
    Array.from({ length: 20 }, (_, bucket) => ({ bucket, count: 2 })),
  )
  expect(reads).toBe(40 + 20 + 20)
})
