import { inlineParameters } from '../../../../src/sql/compiler/inlineParameters'

describe('inlineParameters', () => {
  it('replaces question marks sequentially', () => {
    const sql = 'select * from t where a = ? and b = ?'
    const out = inlineParameters(sql, [1, 'x'])
    expect(out).toBe("select * from t where a = 1 and b = 'x'")
  })
  it('replaces postgres $n placeholders', () => {
    const sql = 'select * from t where a = $1 and b = $2 and a = $1'
    const out = inlineParameters(sql, [1, 'x'])
    expect(out).toBe("select * from t where a = 1 and b = 'x' and a = 1")
  })
  it('no params returns original', () => {
    const sql = 'select * from t'
    const out = inlineParameters(sql, [])
    expect(out).toBe(sql)
  })
})
