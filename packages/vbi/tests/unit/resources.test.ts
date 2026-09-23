import { createVBI } from '@visactor/vbi'

describe('resource registry lifecycle', () => {
  it('registers, lists and removes chart and insight DSLs before resolving builders', () => {
    const vbi = createVBI()
    const chart = vbi.chart.createEmpty('local', 'chart-1')
    const insight = { uuid: 'insight-1', content: 'Sales increased', version: 0 }

    expect(vbi.resources.chart.has(chart.uuid)).toBe(false)
    expect(vbi.resources.insight.has(insight.uuid)).toBe(false)
    expect(vbi.resources.register({ charts: [chart], insights: [insight] })).toEqual({
      charts: [chart],
      insights: [insight],
    })
    expect(vbi.resources.chart.has(chart.uuid)).toBe(true)
    expect(vbi.resources.insight.has(insight.uuid)).toBe(true)
    expect(vbi.resources.chart.list()).toEqual([chart])
    expect(vbi.resources.insight.list()).toEqual([insight])
    expect(vbi.resources.chart.get(chart.uuid)).toEqual(chart)
    expect(vbi.resources.insight.get(insight.uuid)).toEqual(insight)
    expect(vbi.resources.snapshot()).toEqual({
      charts: { [chart.uuid]: chart },
      insights: { [insight.uuid]: insight },
    })

    expect(vbi.resources.chart.unregister(chart.uuid)).toBe(true)
    expect(vbi.resources.insight.unregister(insight.uuid)).toBe(true)
    expect(vbi.resources.chart.unregister(chart.uuid)).toBe(false)
    expect(vbi.resources.insight.unregister(insight.uuid)).toBe(false)
    expect(vbi.resources.snapshot()).toEqual({ charts: {}, insights: {} })
  })

  it('rejects missing resource identities without changing the registry', () => {
    const vbi = createVBI()
    expect(() => vbi.resources.chart.register({ ...vbi.chart.createEmpty('local'), uuid: '' })).toThrow(
      'Chart resource requires a uuid',
    )
    expect(() => vbi.resources.insight.register({ content: 'Missing identity' })).toThrow(
      'Insight resource requires a uuid',
    )
    expect(vbi.resources.snapshot()).toEqual({ charts: {}, insights: {} })
  })

  it('clears both live builders and stored DSLs without affecting another VBI instance', () => {
    const vbi = createVBI()
    const other = createVBI()
    const chart = vbi.chart.createEmpty('local', 'chart-1')
    const insight = { uuid: 'insight-1', content: 'Sales increased', version: 0 }
    vbi.chart.create(chart)
    vbi.resources.insight.register(insight)
    other.resources.chart.register(chart)

    vbi.resources.clear()
    expect(vbi.resources.chart.list()).toEqual([])
    expect(vbi.resources.insight.list()).toEqual([])
    expect(vbi.resources.chart.has(chart.uuid)).toBe(false)
    expect(vbi.resources.insight.has(insight.uuid)).toBe(false)
    expect(other.resources.chart.list()).toEqual([chart])
  })
})
