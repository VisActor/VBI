import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import { createVBIResourceTools, type VBIAgentWorkspace } from '@visactor/vbi-agent'
import { adaptAgentTools } from './adapter.js'
import { createSkillResources } from './resources.js'

export interface VBIMcpServerOptions {
  workspace: VBIAgentWorkspace
  /** Server name shown to MCP clients. Default: 'vbi-mcp-server' */
  name?: string
  /** Server version shown to MCP clients. Default: '0.0.1' */
  version?: string
}

export const createVBIMcpServer = (options: VBIMcpServerOptions): Server => {
  const { workspace, name = 'vbi-mcp-server', version = '0.0.1' } = options

  const agentTools = createVBIResourceTools({ workspace })
  const { toolDefinitions, executeTool } = adaptAgentTools(agentTools)
  const { resourceDefinitions, readResource } = createSkillResources()

  const server = new Server({ name, version }, { capabilities: { tools: {}, resources: {} } })

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: toolDefinitions,
  }))

  server.setRequestHandler(CallToolRequestSchema, async (request) =>
    executeTool(request.params.name, request.params.arguments ?? {}),
  )

  server.setRequestHandler(ListResourcesRequestSchema, async () => ({
    resources: resourceDefinitions,
  }))

  server.setRequestHandler(ReadResourceRequestSchema, async (request) => readResource(request.params.uri))

  return server
}
