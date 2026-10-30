import { executeSQL } from '../../../src/adapters/query/in-memory/execute'
import { parseSQL } from '../../../src/sql/parser'

const query = (sql: string, rows: Record<string, unknown>[]) => executeSQL(parseSQL(sql), rows)

it('keeps quoted keywords and punctuation as identifiers in projections, filters and aggregates', () => {
  for (const name of [
    'null',
    'true',
    'false',
    'not',
    'and',
    'or',
    'in',
    'distinct',
    'case',
    'from',
    'select',
    'where',
    'as',
    '(',
    ')',
    '*',
    'c"d',
    'order detail',
    '中',
  ]) {
    const field = `"${name.replaceAll('"', '""')}"`
    const rows = [{ [name]: 2 }, { [name]: 3 }]
    expect(query(`select ${field} as value from orders`, rows)).toEqual([{ value: 2 }, { value: 3 }])
    expect(query(`select ${field} as value from orders where ${field} > 2`, rows)).toEqual([{ value: 3 }])
    expect(query(`select sum(${field}) as value from orders`, rows)).toEqual([{ value: 5 }])
  }
  expect(query("select 'not' as value where 'not' = 'not'", [{}])).toEqual([{ value: 'not' }])
  expect(query('select null as missing, true as yes, false as no', [{}])).toEqual([
    { missing: null, yes: true, no: false },
  ])
})

it('matches SQL LIKE wildcards across line breaks and whole Unicode code points', () => {
  const rows = [{ text: 'a\nb' }, { text: 'a😀b' }, { text: 'a_b' }, { text: 'ab' }]
  expect(query("select text from orders where text like 'a_b' escape ''", rows)).toEqual(rows.slice(0, 3))
  expect(query("select text from orders where text not like 'a_b' escape ''", rows)).toEqual([{ text: 'ab' }])
  expect(query("select text from orders where text like '%' escape ''", rows)).toEqual(rows)
  expect(query("select text from orders where text like '_' escape ''", [{ text: '😀' }, { text: 'ab' }])).toEqual([
    { text: '😀' },
  ])
})

it('uses SQL simple lowercase semantics for ILIKE rather than regular-expression case folding', () => {
  const rows = ['İ', 'i', 'I', 'ı', 'ſ', 'S', 's', 'K', 'k', 'K', 'Σ', 'σ', 'ς', 'ΟΣ', 'οσ', 'ος'].map((text) => ({
    text,
  }))
  for (const [pattern, values] of [
    ['i', ['İ', 'i', 'I']],
    ['s', ['S', 's']],
    ['k', ['K', 'k', 'K']],
    ['σ', ['Σ', 'σ']],
    ['οσ', ['ΟΣ', 'οσ']],
    ['ος', ['ος']],
  ] as const) {
    expect(query(`select text from orders where text ilike '${pattern}' escape ''`, rows)).toEqual(
      values.map((text) => ({ text })),
    )
    expect(query(`select text from orders where text not ilike '${pattern}' escape ''`, rows)).toEqual(
      rows.filter((row) => !(values as readonly string[]).includes(row.text)),
    )
  }
})

it('resolves GROUP BY source columns before colliding SELECT aliases', () => {
  const rows = [
    { category: 'A', n: 1 },
    { category: 'A', n: 2 },
    { category: 'B', n: 4 },
    { category: 'B', n: 5 },
  ]
  expect(
    query('select sum(n) as category, count(*) as rows from orders group by category order by category', rows),
  ).toEqual([
    { category: 3, rows: 2 },
    { category: 9, rows: 2 },
  ])
  const tied = query('select sum(n) as category, count(*) as rows from orders group by category order by rows', rows)
  expect(tied.sort((a, b) => Number(a.category) - Number(b.category))).toEqual([
    { category: 3, rows: 2 },
    { category: 9, rows: 2 },
  ])
  expect(
    query(
      "select strftime(cast(d as timestamp), '%Y-%m') as d, count(*) as rows from orders group by d order by rows",
      [{ d: '2026-10-01' }, { d: '2026-10-02' }, { d: '2026-10-02' }],
    ),
  ).toEqual([
    { d: '2026-10', rows: 1 },
    { d: '2026-10', rows: 2 },
  ])
  expect(query('select count(*) as rows from orders group by category', [{}, {}])).toEqual([{ rows: 2 }])
})

it('preserves prototype-like column and alias names as ordinary own properties', () => {
  const row = JSON.parse('{"__proto__":2,"constructor":3,"toString":4}')
  expect(query('select * from orders', [row])).toEqual([row])
  expect(query('select "__proto__", constructor, "toString" from orders', [row])).toEqual([row])
  const [result] = query('select sum("__proto__") as "__proto__" from orders', [row, row])
  expect(Object.hasOwn(result, '__proto__')).toBe(true)
  expect(Object.getPrototypeOf(result)).toBe(Object.prototype)
  expect(JSON.stringify(result)).toBe('{"__proto__":4}')
})

it('retains SQL three-valued logic when BETWEEN has a null boundary', () => {
  const rows = [null, 1, 3, 5].map((n) => ({ n }))
  expect(query('select n from orders where n not between null and 3', rows)).toEqual([{ n: 5 }])
  expect(query('select n from orders where n not between 3 and null', rows)).toEqual([{ n: 1 }])
  for (const bounds of ['null and 3', '3 and null', 'null and null']) {
    expect(query(`select n from orders where n between ${bounds}`, rows)).toEqual([])
    expect(query(`select n from orders where n not between ${bounds}`, [{ n: null }])).toEqual([])
  }
})
