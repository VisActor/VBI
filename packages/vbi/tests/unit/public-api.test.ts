import * as api from '@visactor/vbi'

describe('public builder API', () => {
  it('exposes charts, insights and dashboards without the retired report API', () => {
    expect(Object.keys(api.createVBI()).sort()).toEqual(['chart', 'connectors', 'dashboard', 'insight', 'resources'])
    expect(Object.keys(api).filter((name) => /Report/.test(name))).toEqual([])
  })
})
