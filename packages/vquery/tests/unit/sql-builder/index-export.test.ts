import * as convert from '../../../src/sql/compiler'

describe('convert index export', () => {
  it('has convertDSLToDuckDB function', () => {
    expect(typeof convert.convertDSLToDuckDB).toBe('function')
  })
})
