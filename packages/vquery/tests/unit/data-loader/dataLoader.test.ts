import { loadRows } from '../../../src/dataset/source/loadRows'

describe('loadRows', () => {
  it('handles an empty CSV and fills missing trailing columns', async () => {
    await expect(loadRows({ type: 'csv', blob: new Blob([]) }, [])).resolves.toEqual([])

    await expect(loadRows({ type: 'csv', blob: new Blob(['first,second\nvalue\n']) }, [])).resolves.toEqual([
      { first: 'value', second: '' },
    ])
  })
})
