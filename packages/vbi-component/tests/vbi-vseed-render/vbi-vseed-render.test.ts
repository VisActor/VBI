import { rs } from '@rstest/core'
import { fixture, fixtureCleanup } from '@open-wc/testing'
import { html } from 'lit'
import type { Line, Bar } from '@visactor/vseed'

rs.mock('src/vbi-vseed-render/renderer', () => ({
  renderVSeed: rs.fn(),
}))

const { VBIVSeedRender } = await import('src/vbi-vseed-render/vbi-vseed-render')
const { renderVSeed } = await import('src/vbi-vseed-render/renderer')

type VBIVSeedRenderInstance = InstanceType<typeof VBIVSeedRender>

const mockRenderVSeed = renderVSeed as ReturnType<typeof rs.fn>

const MOCK_VSEED: Line = {
  chartType: 'line',
  dataset: [
    { date: '2024-01', sales: 100 },
    { date: '2024-02', sales: 200 },
  ],
  dimensions: [{ id: 'date', alias: 'Date' }],
  measures: [{ id: 'sales', alias: 'Sales' }],
}

const ANOTHER_VSEED: Bar = {
  chartType: 'bar',
  dataset: [{ category: 'A', revenue: 500 }],
  dimensions: [{ id: 'category', alias: 'Category' }],
  measures: [{ id: 'revenue', alias: 'Revenue' }],
}

describe('vbi-vseed-render', () => {
  afterEach(() => {
    fixtureCleanup()
    mockRenderVSeed.mockClear()
  })

  it('should register as a custom element and render shadow DOM container', async () => {
    expect(customElements.get('vbi-vseed-render')).toBeDefined()

    const el = await fixture<VBIVSeedRenderInstance>(html`<vbi-vseed-render></vbi-vseed-render>`)
    expect(el).toBeInstanceOf(VBIVSeedRender)
    expect(el.vseed).toBeUndefined()

    const container = el.shadowRoot?.querySelector('.vbi-vseed-render__container')
    expect(container).toBeInstanceOf(HTMLDivElement)
  })

  it('should call renderVSeed when vseed is set', async () => {
    const el = await fixture<VBIVSeedRenderInstance>(html`<vbi-vseed-render></vbi-vseed-render>`)
    expect(mockRenderVSeed).not.toHaveBeenCalled()

    el.vseed = MOCK_VSEED
    await el.updateComplete

    expect(mockRenderVSeed).toHaveBeenCalledTimes(1)
    expect(mockRenderVSeed).toHaveBeenCalledWith(
      expect.objectContaining({
        container: el.shadowRoot?.querySelector('.vbi-vseed-render__container'),
        vseed: MOCK_VSEED,
        onError: expect.any(Function),
      }),
    )
  })

  it('should cleanup previous render when vseed changes', async () => {
    const mockCleanup = rs.fn()
    mockRenderVSeed.mockReturnValue(mockCleanup)

    const el = await fixture<VBIVSeedRenderInstance>(html`<vbi-vseed-render></vbi-vseed-render>`)
    el.vseed = MOCK_VSEED
    await el.updateComplete
    expect(mockCleanup).not.toHaveBeenCalled()

    el.vseed = ANOTHER_VSEED
    await el.updateComplete
    expect(mockCleanup).toHaveBeenCalledTimes(1)
    expect(mockRenderVSeed).toHaveBeenCalledTimes(2)
  })

  it('should cleanup on disconnect', async () => {
    const mockCleanup = rs.fn()
    mockRenderVSeed.mockReturnValue(mockCleanup)

    const el = await fixture<VBIVSeedRenderInstance>(html`<vbi-vseed-render></vbi-vseed-render>`)
    el.vseed = MOCK_VSEED
    await el.updateComplete

    el.remove()
    expect(mockCleanup).toHaveBeenCalledTimes(1)
  })

  it('should delegate render errors to console.error via onError', async () => {
    const errorSpy = rs.spyOn(console, 'error').mockImplementation(() => {})

    const el = await fixture<VBIVSeedRenderInstance>(html`<vbi-vseed-render></vbi-vseed-render>`)
    el.vseed = MOCK_VSEED
    await el.updateComplete

    const { onError } = mockRenderVSeed.mock.calls[0][0]
    onError(new Error('test render failure'))

    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('VBI render error:'), el)

    errorSpy.mockRestore()
  })
})
