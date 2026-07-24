import { Type } from 'typebox'
import { adaptAgentTools } from '../src/index'
import type { AgentTool, AgentToolResult } from '@visactor/vbi-agent'

const createMockTool = (name: string, result: AgentToolResult<unknown>): AgentTool => ({
  name,
  description: `Test tool: ${name}`,
  label: name,
  parameters: Type.Object({
    action: Type.Union([Type.Literal('list'), Type.Literal('read')]),
    value: Type.Optional(Type.String()),
  }),
  execute: async () => result,
})

describe('adaptAgentTools', () => {
  it('converts AgentTool definitions to MCP tool definitions', () => {
    const tool = createMockTool('test_tool', {
      content: [{ type: 'text', text: 'hello' }],
      details: null,
    })

    const { toolDefinitions } = adaptAgentTools([tool])

    expect(toolDefinitions).toHaveLength(1)
    expect(toolDefinitions[0].name).toBe('test_tool')
    expect(toolDefinitions[0].description).toBe('Test tool: test_tool')
    expect(toolDefinitions[0].inputSchema.type).toBe('object')
    expect(toolDefinitions[0].inputSchema.properties).toBeDefined()
  })

  it('maps multiple tools', () => {
    const tool1 = createMockTool('tool_a', {
      content: [{ type: 'text', text: 'a' }],
      details: null,
    })
    const tool2 = createMockTool('tool_b', {
      content: [{ type: 'text', text: 'b' }],
      details: null,
    })

    const { toolDefinitions } = adaptAgentTools([tool1, tool2])

    expect(toolDefinitions).toHaveLength(2)
    expect(toolDefinitions.map((t) => t.name)).toEqual(['tool_a', 'tool_b'])
  })

  it('executes a tool and maps the result', async () => {
    const tool = createMockTool('test_tool', {
      content: [{ type: 'text', text: 'result text' }],
      details: { summary: 'done' },
    })

    const { executeTool } = adaptAgentTools([tool])
    const result = await executeTool('test_tool', { action: 'list' })

    expect(result.isError).toBeUndefined()
    expect(result.content).toHaveLength(1)
    expect(result.content[0]).toEqual({ type: 'text', text: 'result text' })
  })

  it('returns isError for unknown tool', async () => {
    const { executeTool } = adaptAgentTools([])
    const result = await executeTool('nonexistent', {})

    expect(result.isError).toBe(true)
    expect(result.content[0]).toEqual({ type: 'text', text: 'Unknown tool: nonexistent' })
  })

  it('returns isError when tool throws', async () => {
    const tool: AgentTool = {
      name: 'failing_tool',
      description: 'A tool that fails',
      label: 'failing_tool',
      parameters: Type.Object({}),
      execute: async () => {
        throw new Error('Something went wrong')
      },
    }

    const { executeTool } = adaptAgentTools([tool])
    const result = await executeTool('failing_tool', {})

    expect(result.isError).toBe(true)
    expect(result.content[0]).toEqual({ type: 'text', text: 'Something went wrong' })
  })

  it('preserves TypeBox schema structure in inputSchema', () => {
    const tool = createMockTool('schema_tool', {
      content: [{ type: 'text', text: '' }],
      details: null,
    })

    const { toolDefinitions } = adaptAgentTools([tool])
    const schema = toolDefinitions[0].inputSchema

    expect(schema.type).toBe('object')
    expect(schema.required).toContain('action')
    expect(schema.properties).toHaveProperty('action')
    expect(schema.properties).toHaveProperty('value')
  })
})
