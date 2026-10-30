import { escapeValue } from '../../../../src/sql/compiler/utils'

describe('escapeValue branches', () => {
  it('null', () => {
    expect(escapeValue(null)).toBe('null')
  })
  it('string', () => {
    expect(escapeValue("O'Reilly")).toBe("'O''Reilly'")
  })
  it('number', () => {
    expect(escapeValue(123)).toBe('123')
  })
  it('boolean', () => {
    expect(escapeValue(true)).toBe('TRUE')
    expect(escapeValue(false)).toBe('FALSE')
  })
  it('object', () => {
    expect(escapeValue({ a: 1 })).toBe("'[object Object]'")
  })
})
