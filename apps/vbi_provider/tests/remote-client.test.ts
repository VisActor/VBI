import { createVBIProviderClient } from '../src'
import { describe, expect, rs, test } from '@rstest/core'

const jsonResponse = <T>(data: T) => ({
  ok: true,
  status: 200,
  json: async () => ({ data }),
  text: async () => JSON.stringify({ data }),
})

describe('remote VBI client', () => {
  test('routes chart CRUD through REST endpoints', async () => {
    const fetch = rs.fn(async (url: string, init?: { method?: string; body?: string }) => {
      if (url.endsWith('/charts') && init?.method === 'POST') {
        return jsonResponse({
          id: 'chart-1',
          name: 'Revenue',
          createdAt: '2026-04-09',
          updatedAt: '2026-04-09',
        })
      }
      if (url.endsWith('/charts/chart-1')) {
        return jsonResponse({
          id: 'chart-1',
          name: 'Revenue',
          createdAt: '2026-04-09',
          updatedAt: '2026-04-09',
          dsl: { uuid: 'chart-1' },
        })
      }
      throw new Error(`Unexpected request: ${url}`)
    })
    const client = createVBIProviderClient({ baseUrl: 'http://localhost:3030/api/v1', fetch })

    const provider = client.chart()
    await provider.create({ name: 'Revenue' })

    await expect(provider.getSummary()).resolves.toMatchObject({ id: 'chart-1' })
    await expect(provider.getDetail()).resolves.toMatchObject({ dsl: { uuid: 'chart-1' } })
  })
  test('reads insight snapshots through REST without exposing provider-level content update', async () => {
    const fetch = rs.fn(async (url: string) => {
      if (url.endsWith('/insights/insight-1')) {
        return jsonResponse({
          id: 'insight-1',
          name: 'Insight',
          createdAt: '2026-04-09',
          updatedAt: '2026-04-09',
          content: 'Use the builder for content edits',
        })
      }
      if (url.endsWith('/insights/insight-1/collaboration')) {
        throw new Error('snapshot should not open collaboration')
      }
      throw new Error(`Unexpected request: ${url}`)
    })
    const provider = createVBIProviderClient({ baseUrl: 'http://localhost:3030/api/v1', fetch }).insight('insight-1')

    expect('update' in provider).toBe(false)
    await expect(provider.snapshot()).resolves.toEqual({
      resource: {
        id: 'insight-1',
        name: 'Insight',
        createdAt: '2026-04-09',
        updatedAt: '2026-04-09',
      },
      dsl: {
        uuid: 'insight-1',
        version: 0,
        content: 'Use the builder for content edits',
      },
    })
  })
})
