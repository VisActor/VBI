import { createSkillResources } from '../src/index'
import { adaptAgentTools } from '../src/index'
import { createVBIResourceTools } from '@visactor/vbi-agent'

describe('createSkillResources', () => {
  it('exposes all 4 VBI skills as resources', () => {
    const { resourceDefinitions } = createSkillResources()

    expect(resourceDefinitions).toHaveLength(4)
    const uris = resourceDefinitions.map((r) => r.uri)
    expect(uris).toContain('vbi://skill/resource_lookup')
    expect(uris).toContain('vbi://skill/chart')
    expect(uris).toContain('vbi://skill/insight')
    expect(uris).toContain('vbi://skill/report')
  })

  it('reads a skill resource by URI', () => {
    const { readResource } = createSkillResources()
    const result = readResource('vbi://skill/chart')

    expect(result.contents).toHaveLength(1)
    expect(result.contents[0].uri).toBe('vbi://skill/chart')
    expect(result.contents[0].mimeType).toBe('text/plain')
    const content = result.contents[0]
    expect('text' in content && typeof content.text === 'string' && content.text.length > 0).toBe(true)
  })

  it('throws for unknown resource URI', () => {
    const { readResource } = createSkillResources()

    expect(() => readResource('vbi://unknown/foo')).toThrow('Unknown resource URI')
  })

  it('throws for unknown skill name', () => {
    const { readResource } = createSkillResources()

    expect(() => readResource('vbi://skill/nonexistent')).toThrow()
  })
})

describe('vbi-agent tools via adapter', () => {
  it('adapts all 5 VBI resource tools', () => {
    const agentTools = createVBIResourceTools({ workspace: {} })
    const { toolDefinitions } = adaptAgentTools(agentTools)

    expect(toolDefinitions).toHaveLength(5)
    const names = toolDefinitions.map((t) => t.name)
    expect(names).toContain('read_skill')
    expect(names).toContain('vbi_resource_lookup')
    expect(names).toContain('vbi_chart')
    expect(names).toContain('vbi_insight')
    expect(names).toContain('vbi_report')
  })

  it('each tool has a valid inputSchema', () => {
    const agentTools = createVBIResourceTools({ workspace: {} })
    const { toolDefinitions } = adaptAgentTools(agentTools)

    for (const tool of toolDefinitions) {
      expect(tool.inputSchema.type).toBe('object')
      expect(tool.inputSchema.properties).toBeDefined()
    }
  })

  it('executes read_skill list via adapter', async () => {
    const agentTools = createVBIResourceTools({ workspace: {} })
    const { executeTool } = adaptAgentTools(agentTools)

    const result = await executeTool('read_skill', { action: 'list' })

    expect(result.isError).toBeUndefined()
    expect(result.content).toHaveLength(1)
    expect(result.content[0].type).toBe('text')
    const first = result.content[0]
    const parsed = JSON.parse('text' in first ? first.text : '')
    expect(Array.isArray(parsed)).toBe(true)
    expect(parsed.length).toBe(4)
  })

  it('executes read_skill read via adapter', async () => {
    const agentTools = createVBIResourceTools({ workspace: {} })
    const { executeTool } = adaptAgentTools(agentTools)

    const result = await executeTool('read_skill', { action: 'read', skill: 'chart' })

    expect(result.isError).toBeUndefined()
    expect(result.content).toHaveLength(1)
    const first = result.content[0]
    const parsed = JSON.parse('text' in first ? first.text : '')
    expect(parsed.skill).toBe('chart')
    expect(typeof parsed.content).toBe('string')
    expect(parsed.content.length).toBeGreaterThan(0)
  })
})
