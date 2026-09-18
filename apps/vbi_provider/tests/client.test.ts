import { createVBIProviderAgentKit, createVBIProviderClient } from '../src'
import { describe, expect, rs, test } from '@rstest/core'

const jsonResponse = <T>(data: T) => ({
  ok: true,
  status: 200,
  json: async () => ({ data }),
  text: async () => JSON.stringify({ data }),
})

describe('createVBIProviderClient', () => {
  test('creates resource providers and list methods from baseUrl', async () => {
    const fetch = rs.fn(async (url: string) => {
      if (url.endsWith('/charts'))
        return jsonResponse([{ id: 'chart-1', name: null, createdAt: '2026-04-09', updatedAt: '2026-04-09' }])
      if (url.endsWith('/insights'))
        return jsonResponse([{ id: 'insight-1', name: null, createdAt: '2026-04-09', updatedAt: '2026-04-09' }])
      throw new Error(`Unexpected request: ${url}`)
    })
    const client = createVBIProviderClient({ baseUrl: 'http://localhost:3030/api/v1', fetch })

    expect(Object.keys(client).sort()).toEqual(['chart', 'insight', 'listCharts', 'listInsights'])

    expect(client.chart('chart-1').getResourceId()).toBe('chart-1')
    expect(client.insight('insight-1').getResourceId()).toBe('insight-1')
    expect(client.chart().getResourceId()).toBeNull()
    await expect(client.listCharts()).resolves.toHaveLength(1)
    await expect(client.listInsights()).resolves.toHaveLength(1)
    expect(fetch.mock.calls.map(([url]) => url)).toEqual([
      'http://localhost:3030/api/v1/charts',
      'http://localhost:3030/api/v1/insights',
    ])
  })

  test('creates an agent kit with client and default workspace ids', async () => {
    const fetch = rs.fn(async (url: string) => {
      if (url.endsWith('/charts/chart-1'))
        return jsonResponse({ id: 'chart-1', name: 'Chart', createdAt: '2026-04-09', updatedAt: '2026-04-09' })
      throw new Error(`Unexpected request: ${url}`)
    })

    const kit = createVBIProviderAgentKit({
      baseUrl: 'http://localhost:3030/api/v1',
      chartId: 'chart-1',
      fetch,
    })

    expect(kit.client.chart('chart-2').getResourceId()).toBe('chart-2')
    expect(kit.tools.map((tool) => tool.name)).toEqual([
      'read_skill',
      'vbi_resource_lookup',
      'vbi_chart',
      'vbi_insight',
    ])
    await expect(kit.workspace.chart.describe()).resolves.toMatchObject({ id: 'chart-1' })
  })
})
