import { afterEach, beforeEach, describe, expect, rs, test } from '@rstest/core'
import { act, cleanup, render, screen } from '@testing-library/react'

type ResourceItem = {
  createdAt: string
  id: string
  name: string
  updatedAt: string
}

const connectResourceSession = rs.fn()
const releaseResourceSession = rs.fn()
const navigate = rs.fn()

rs.mock('../src/services/resourceApi', () => ({
  createResource: rs.fn(),
  listResources: rs.fn(),
  removeResource: rs.fn(),
  renameResource: rs.fn(),
}))

rs.mock('../src/stores/resource-session.store', () => ({
  connectResourceSession,
  releaseResourceSession,
}))

const resourceApi = await import('../src/services/resourceApi')
const { useAppPreferencesStore } = await import('../src/stores/app-preferences.store')
const { useManageChartsStore } = await import('../src/stores/manage-charts.store')
const { useNavigationStore } = await import('../src/stores/navigation.store')
const { ManageChartsPage } = await import('../src/views/ManageChartsPage')

const initialChartsState = useManageChartsStore.getState()

let chartResources: ResourceItem[] = []

const createChartResourceItem = (index: number): ResourceItem => ({
  id: `chart-${index}`,
  name: `chart resource ${index}`,
  createdAt: `2026-05-${String(index).padStart(2, '0')}T01:00:00.000Z`,
  updatedAt: `2026-05-${String(index).padStart(2, '0')}T02:00:00.000Z`,
})

const seedChartResources = (count = 9) => {
  chartResources = Array.from({ length: count }, (_, index) => createChartResourceItem(index + 1))
}

const createDeferred = <T,>() => {
  let resolve!: (value: T) => void
  const promise = new Promise<T>((next) => {
    resolve = next
  })
  return { promise, resolve }
}

const setupResourceMocks = () => {
  ;(
    resourceApi.listResources as unknown as {
      mockImplementation(implementation: () => Promise<ResourceItem[]>): void
    }
  ).mockImplementation(async () => chartResources)
  ;(resourceApi.createResource as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(undefined)
  ;(resourceApi.removeResource as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(undefined)
  ;(resourceApi.renameResource as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(undefined)
  connectResourceSession.mockResolvedValue(undefined)
  releaseResourceSession.mockResolvedValue(undefined)
}

describe('resource management pages', () => {
  beforeEach(() => {
    rs.clearAllMocks()
    useAppPreferencesStore.setState({ locale: 'en-US', themeMode: 'slate' })
    useManageChartsStore.setState(initialChartsState, true)
    useNavigationStore.setState({ navigate, pathname: '' })
    chartResources = []
    setupResourceMocks()
  })

  afterEach(() => {
    cleanup()
  })

  test('keeps cached resource rows visible while a reload is pending', async () => {
    seedChartResources()
    const { container } = render(<ManageChartsPage />)

    expect(await screen.findByText('chart resource 1')).toBeInTheDocument()

    const pendingReload = createDeferred<ResourceItem[]>()
    ;(
      resourceApi.listResources as unknown as {
        mockImplementation(implementation: () => Promise<ResourceItem[]>): void
      }
    ).mockImplementation(async () => pendingReload.promise)

    let reloadPromise!: Promise<void>
    await act(async () => {
      reloadPromise = useManageChartsStore.getState().load()
      await Promise.resolve()
    })

    expect(screen.getByText('chart resource 1')).toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(container.querySelector('.animate-spin')).toBeNull()

    pendingReload.resolve(chartResources)
    await act(async () => {
      await reloadPromise
    })
  })
})
