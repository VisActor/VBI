import { createVBIProviderAgentAdapter } from '../src'
import { describe, expect, rs, test } from '@rstest/core'

const readText = (result: { content: Array<{ text: string; type: string }> }) =>
  result.content.find((part) => part.type === 'text')?.text ?? ''

describe('createVBIProviderAgentAdapter', () => {
  test('exposes provider workspace slots and explicit resource tools', async () => {
    const chartBuilder = { build: () => ({ chartType: 'line' }) }
    const insightBuilder = { build: () => ({ content: 'summary' }) }
    const client = {
      chart: rs.fn(() => ({
        getSummary: rs.fn(async () => ({ id: 'chart-1', name: 'Chart' })),
        open: rs.fn(async () => chartBuilder),
        snapshot: rs.fn(async () => ({ dsl: { chartType: 'line' }, resource: { id: 'chart-1' } })),
      })),
      insight: rs.fn(() => ({
        open: rs.fn(async () => insightBuilder),
        snapshot: rs.fn(async () => ({ dsl: { content: 'summary' }, resource: { id: 'insight-1' } })),
      })),
    }

    const adapter = createVBIProviderAgentAdapter({
      chartId: 'chart-1',
      client: client as never,
      insightId: 'insight-1',
    })

    expect(adapter.tools.map((tool) => tool.name)).toEqual([
      'read_skill',
      'vbi_resource_lookup',
      'vbi_chart',
      'vbi_insight',
    ])
    await expect(adapter.workspace.chart.open()).resolves.toBe(chartBuilder)
    await expect(adapter.workspace.insight.open()).resolves.toBe(insightBuilder)
    await expect(adapter.workspace.chart.describe()).resolves.toEqual({ id: 'chart-1', name: 'Chart' })
    expect(client.chart).toHaveBeenCalledWith('chart-1')
    expect(client.insight).toHaveBeenCalledWith('insight-1')
  })
})

describe('createVBIProviderAgentTools', () => {
  test('reads complete built-in skills and lists provider resources', async () => {
    const client = {
      chart: rs.fn(),
      insight: rs.fn(),
      listCharts: rs.fn(async () => [
        { id: 'chart-1', name: 'Regional margin review', createdAt: '2026-04-09', updatedAt: '2026-04-09' },
        { id: 'chart-2', name: 'Customer discount scatter', createdAt: '2026-04-09', updatedAt: '2026-04-09' },
      ]),
      listInsights: rs.fn(async () => [
        { id: 'insight-1', name: 'Retention risk summary', createdAt: '2026-04-09', updatedAt: '2026-04-09' },
      ]),
    }
    const adapter = createVBIProviderAgentAdapter({ client: client as never })
    const readSkill = adapter.tools.find((tool) => tool.name === 'read_skill')
    const lookup = adapter.tools.find((tool) => tool.name === 'vbi_resource_lookup')

    const skillResult = await readSkill?.execute('call-skill', { action: 'read', skill: 'chart' })
    const skillPayload = JSON.parse(readText(skillResult as never)) as { content: string; skill: string }
    expect(skillPayload.skill).toBe('chart')
    expect(skillPayload.content).toContain('const chartBuilder = await chart.open();')
    expect(skillPayload.content).toContain('regional sales and profit')

    const lookupResult = await lookup?.execute('call-lookup', { query: 'regional', resource: 'chart' })
    expect(JSON.parse(readText(lookupResult as never))).toEqual({
      resource: 'chart',
      items: [{ id: 'chart-1', name: 'Regional margin review', createdAt: '2026-04-09', updatedAt: '2026-04-09' }],
    })
  })

  test('runs scoped chart scripts and resource management actions', async () => {
    const chartBuilder = { build: () => ({ chartType: 'line' }) }
    const rename = rs.fn(async (name: string) => ({ id: 'chart-1', name }))
    const client = {
      chart: rs.fn(() => ({
        create: rs.fn(async () => ({ id: 'chart-1', name: 'Chart' })),
        getSummary: rs.fn(async () => ({ id: 'chart-1', name: 'Chart' })),
        remove: rs.fn(async () => ({ id: 'chart-1', name: 'Chart' })),
        rename,
      })),
      insight: rs.fn(),
      listCharts: rs.fn(),
      listInsights: rs.fn(),
    }
    const adapter = createVBIProviderAgentAdapter({
      chartId: 'chart-1',
      client: client as never,
    })
    adapter.workspace.chart.open = rs.fn(async () => chartBuilder as never)
    const chartTool = adapter.tools.find((tool) => tool.name === 'vbi_chart')

    const runResult = await chartTool?.execute('call-run', {
      action: 'run',
      code: 'const chartBuilder = await chart.open(); return json({ chartType: chartBuilder.build().chartType });',
      id: 'chart-1',
    })
    expect(JSON.parse(readText(runResult as never))).toEqual({
      logs: [],
      result: { chartType: 'line' },
    })
    expect(adapter.workspace.chart.open).toHaveBeenCalledWith('chart-1')

    const renameResult = await chartTool?.execute('call-rename', {
      action: 'rename',
      id: 'chart-1',
      name: 'Updated Chart',
    })
    expect(JSON.parse(readText(renameResult as never))).toEqual({ id: 'chart-1', name: 'Updated Chart' })
    expect(rename).toHaveBeenCalledWith('Updated Chart')
  })
})
