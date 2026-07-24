import type { AgentTool } from '@visactor/vbi-agent'
import type { CallToolResult, Tool } from '@modelcontextprotocol/sdk/types.js'

export interface McpToolAdapter {
  toolDefinitions: Tool[]
  executeTool: (name: string, args: Record<string, unknown>) => Promise<CallToolResult>
}

const toJsonSchema = (typeboxSchema: unknown): Tool['inputSchema'] => {
  const raw = JSON.parse(JSON.stringify(typeboxSchema))
  return { type: 'object' as const, ...raw }
}

const toMcpContent = (
  content: Array<{ type: string; text?: string; data?: string; mimeType?: string }>,
): CallToolResult['content'] =>
  content.map((item) => {
    if (item.type === 'image' && item.data && item.mimeType) {
      return { type: 'image' as const, data: item.data, mimeType: item.mimeType }
    }
    return { type: 'text' as const, text: item.text ?? '' }
  })

export const adaptAgentTools = (agentTools: AgentTool[]): McpToolAdapter => {
  const toolMap = new Map<string, AgentTool>()

  const toolDefinitions: Tool[] = agentTools.map((tool) => {
    toolMap.set(tool.name, tool)
    return {
      name: tool.name,
      description: tool.description,
      inputSchema: toJsonSchema(tool.parameters),
    }
  })

  const executeTool = async (name: string, args: Record<string, unknown>): Promise<CallToolResult> => {
    const tool = toolMap.get(name)
    if (!tool) {
      return {
        content: [{ type: 'text', text: `Unknown tool: ${name}` }],
        isError: true,
      }
    }

    try {
      const toolCallId = `mcp-${name}-${Date.now()}`
      const result = await tool.execute(toolCallId, args)
      return {
        content: toMcpContent(result.content),
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return {
        content: [{ type: 'text', text: message }],
        isError: true,
      }
    }
  }

  return { toolDefinitions, executeTool }
}
