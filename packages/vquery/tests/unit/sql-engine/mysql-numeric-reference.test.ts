import { convertDSLToDuckDB } from '@visactor/vquery'
import { executeSQL } from '../../../src/adapters/query/in-memory/execute'
import { parseSQL } from '../../../src/sql/parser'
import reference from '../../fixtures/mysql-numeric-reference.json'

for (const test of reference.cases) {
  it(`${test.name}: ${test.expr}`, () => {
    const sql = convertDSLToDuckDB({ select: [{ expr: test.expr, alias: 'value' }] }, 'numbers')
    const value = executeSQL(parseSQL(sql), [{}])[0].value
    if (test.expected === null) expect(value).toBeNull()
    else
      expect(Math.abs(Number(value) - test.expected)).toBeLessThanOrEqual(1e-9 * Math.max(1, Math.abs(test.expected)))
  })
}
