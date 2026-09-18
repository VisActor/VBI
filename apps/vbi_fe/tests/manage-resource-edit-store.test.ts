import { beforeEach, describe, expect, rs, test } from '@rstest/core'

const connectResourceSession = rs.fn()
const releaseResourceSession = rs.fn()

rs.mock('../src/services/insightApi', () => ({
  createInsight: rs.fn(),
  deleteInsight: rs.fn(),
  fetchInsights: rs.fn(),
  updateInsight: rs.fn(),
}))

rs.mock('../src/services/resourceApi', () => ({
  createResource: rs.fn(),
  listResources: rs.fn(),
  removeResource: rs.fn(),
  renameResource: rs.fn(),
}))

rs.mock('../src/application/resources/session', () => ({
  connectResourceSession,
  releaseResourceSession,
}))

const insightApi = await import('../src/services/insightApi')
const resourceApi = await import('../src/services/resourceApi')
const { useManageChartsStore } = await import('./application-test-stores')
const { useManageInsightsStore } = await import('./application-test-stores')
const initialChartsState = useManageChartsStore.getState()
const initialInsightsState = useManageInsightsStore.getState()
const createResourceItem = (id: string, name: string) => ({
  id,
  name,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-02T00:00:00.000Z',
})

describe('manage resource edit stores', () => {
  beforeEach(() => {
    rs.clearAllMocks()
    connectResourceSession.mockResolvedValue(undefined)
    releaseResourceSession.mockResolvedValue(undefined)
    ;(insightApi.fetchInsights as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue([])
    ;(resourceApi.listResources as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue([])
    useManageChartsStore.setState(initialChartsState, true)
    useManageInsightsStore.setState(initialInsightsState, true)
  })
  test('renames chart resources from route editor state', async () => {
    useManageChartsStore.setState({
      items: [createResourceItem('chart-1', 'Old Chart'), createResourceItem('chart-2', 'Revenue Chart')],
      editorName: 'Revenue Chart Updated',
      selectedId: 'chart-2',
      userName: 'user-1',
    })

    await useManageChartsStore.getState().renameSelected()

    expect(resourceApi.renameResource).toHaveBeenCalledWith('chart', 'chart-2', 'Revenue Chart Updated')
  })

  test('renames insight resources from route editor state', async () => {
    useManageInsightsStore.setState({
      items: [createResourceItem('insight-1', 'Old Insight'), createResourceItem('insight-2', 'Insight')],
      editorName: 'Insight Updated',
      selectedId: 'insight-2',
      userName: 'user-1',
    })

    await useManageInsightsStore.getState().renameSelected()

    expect(insightApi.updateInsight).toHaveBeenCalledWith('insight-2', {
      name: 'Insight Updated',
    })
  })
})
