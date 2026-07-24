import { createVBIMcpServer } from './server.js'
import { startStdioServer } from './transport.js'

const mockWorkspace = {
  chart: {
    create: async (input: any) => ({ id: 'chart-1', name: input?.name || 'New Chart' }),
    describe: async () => ({ id: 'chart-1', name: 'Mock Chart' }),
    list: async () => [{ id: 'chart-1', name: 'Mock Chart' }],
    rename: async () => {},
    remove: async () => {},
    references: async () => [],
    open: async () => ({}), // Dummy builder
  },
  insight: {
    create: async (input: any) => ({ id: 'insight-1', name: input?.name || 'New Insight' }),
    describe: async () => ({ id: 'insight-1', name: 'Mock Insight' }),
    list: async () => [{ id: 'insight-1', name: 'Mock Insight' }],
    rename: async () => {},
    remove: async () => {},
    references: async () => [],
    open: async () => ({}), // Dummy builder
  },
  report: {
    create: async (input: any) => ({ id: 'report-1', name: input?.name || 'New Report' }),
    describe: async () => ({ id: 'report-1', name: 'Mock Report' }),
    list: async () => [{ id: 'report-1', name: 'Mock Report' }],
    rename: async () => {},
    remove: async () => {},
    createPage: async () => {},
    removePage: async () => {},
    reorderPages: async () => {},
    updatePage: async () => {},
    exportSnapshot: async () => {},
    open: async () => ({}), // Dummy builder
  },
}

const server = createVBIMcpServer({ workspace: mockWorkspace as any })
await startStdioServer(server)
