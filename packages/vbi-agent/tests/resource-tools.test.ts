import { describe, expect, rs, test } from '@rstest/core'
import { createVBIResourceTools, readVBIAgentSkill } from '../src/index'
import type { AgentToolResult, VBIAgentWorkspace } from '../src/index'

type ResourceToolResult = AgentToolResult<unknown>

const readText = (result: ResourceToolResult) => result.content.find((part) => part.type === 'text')?.text ?? ''

describe('createVBIResourceTools', () => {
  test('reads complete built-in skills and lists resources through workspace slots', async () => {
    const workspace: VBIAgentWorkspace = {
      chart: {
        list: rs.fn(async () => [
          { id: 'chart-1', name: 'Regional margin review', createdAt: '2026-04-09', updatedAt: '2026-04-09' },
          { id: 'chart-2', name: 'Customer discount scatter', createdAt: '2026-04-09', updatedAt: '2026-04-09' },
        ]),
        open: rs.fn(),
      },
      insight: {
        list: rs.fn(async () => [
          { id: 'insight-1', name: 'Retention risk summary', createdAt: '2026-04-09', updatedAt: '2026-04-09' },
        ]),
        open: rs.fn(),
      },
    }
    const tools = createVBIResourceTools({ workspace })
    expect(tools.map((tool) => tool.name)).toEqual(['read_skill', 'vbi_resource_lookup', 'vbi_chart', 'vbi_insight'])
    const readSkill = tools.find((tool) => tool.name === 'read_skill')
    const lookup = tools.find((tool) => tool.name === 'vbi_resource_lookup')

    const allResult = await lookup?.execute('call-all', { resource: 'all' })
    expect(Object.keys(JSON.parse(readText(allResult as ResourceToolResult))).sort()).toEqual(['charts', 'insights'])
    await expect(lookup?.execute('call-retired', { resource: 'report' })).rejects.toThrow(
      'vbi_resource_lookup.resource must be all, chart, or insight',
    )

    const skillResult = await readSkill?.execute('call-skill', { action: 'read', skill: 'chart' })
    const skillPayload = JSON.parse(readText(skillResult as ResourceToolResult)) as { content: string; skill: string }
    expect(skillPayload.skill).toBe('chart')
    expect(skillPayload.content).toContain('const chartBuilder = await chart.open();')
    expect(skillPayload.content).toContain('regional sales and profit')
    expect(readVBIAgentSkill('chart')).toBe(skillPayload.content)

    const lookupResult = await lookup?.execute('call-lookup', { query: 'regional', resource: 'chart' })
    expect(JSON.parse(readText(lookupResult as ResourceToolResult))).toEqual({
      resource: 'chart',
      items: [{ id: 'chart-1', name: 'Regional margin review', createdAt: '2026-04-09', updatedAt: '2026-04-09' }],
    })
  })

  test('runs scoped chart scripts and resource management actions through workspace slots', async () => {
    const chartBuilder = { build: () => ({ chartType: 'line' }) }
    const rename = rs.fn(async (_id: string, name: string) => ({ id: 'chart-1', name }))
    const workspace: VBIAgentWorkspace = {
      chart: {
        create: rs.fn(async () => ({ id: 'chart-1', name: 'Chart' })),
        describe: rs.fn(async () => ({ dsl: { chartType: 'line' }, id: 'chart-1', name: 'Chart' })),
        list: rs.fn(),
        open: rs.fn(async () => chartBuilder as never),
        remove: rs.fn(async () => ({ id: 'chart-1', name: 'Chart' })),
        rename,
      },
    }
    const chartTool = createVBIResourceTools({ workspace }).find((tool) => tool.name === 'vbi_chart')

    const runResult = await chartTool?.execute('call-run', {
      action: 'run',
      code: 'const chartBuilder = await chart.open(); return json({ chartType: chartBuilder.build().chartType });',
      id: 'chart-1',
    })
    expect(JSON.parse(readText(runResult as ResourceToolResult))).toEqual({
      logs: [],
      result: { chartType: 'line' },
    })
    expect(workspace.chart?.open).toHaveBeenCalledWith('chart-1')

    const renameResult = await chartTool?.execute('call-rename', {
      action: 'rename',
      id: 'chart-1',
      name: 'Updated Chart',
    })
    expect(JSON.parse(readText(renameResult as ResourceToolResult))).toEqual({ id: 'chart-1', name: 'Updated Chart' })
    expect(rename).toHaveBeenCalledWith('chart-1', 'Updated Chart')
  })
})
