import { inlineParameters } from '../../../../src/sql/compiler/inlineParameters'

describe('inlineParameters extra paths', () => {
  it('params exist but no placeholders', () => {
    const sql = 'select 1'
    const out = inlineParameters(sql, [123])
    expect(out).toBe('select 1')
  })

  it('uses MySQL string literals independent of NO_BACKSLASH_ESCAPES', () => {
    expect(inlineParameters('select ?', ['中\\😀'], 'mysql')).toBe('select convert(0xe4b8ad5cf09f9880 using utf8mb4)')
    expect(inlineParameters('select ?', ["O'Reilly"], 'mysql')).toBe("select 'O''Reilly'")
    expect(inlineParameters('select ?', ['a\\b'], 'duckdb')).toBe("select 'a\\b'")
  })
})
