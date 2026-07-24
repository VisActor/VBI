import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import type { Server } from '@modelcontextprotocol/sdk/server/index.js'

export const startStdioServer = async (server: Server): Promise<void> => {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}
