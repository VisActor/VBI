import { executeSQL } from '../../../src/adapters/query/in-memory/execute'
import { parseSQL } from '../../../src/sql/parser'

it('consumes a complete query and rejects truncated literals or hidden trailing statements', () => {
  expect(executeSQL(parseSQL("select 'a; b' as value;"), [{}])).toEqual([{ value: 'a; b' }])
  expect(executeSQL(parseSQL("select 'it''s' as value"), [{}])).toEqual([{ value: "it's" }])
  for (const sql of ["select 'unfinished", "select 'a''", 'select 1; select 2', 'select 1;;', 'select 1; ignored'])
    expect(() => parseSQL(sql)).toThrow()
  for (const sql of ['select 1--', 'select 1-- comment', 'select 1/* comment */'])
    expect(() => parseSQL(sql)).toThrow('SQL comments')
  expect(executeSQL(parseSQL('select 1--2 as value'), [{}])).toEqual([{ value: 3 }])
})
