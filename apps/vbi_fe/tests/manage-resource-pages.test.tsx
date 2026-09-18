import { afterEach, beforeEach, describe, expect, rs, test } from '@rstest/core'
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import type { ComponentType } from 'react'

type ResourceKind = 'chart' | 'insight'

type ResourceItem = {
  createdAt: string
  id: string
  name: string
  updatedAt: string
}

type ResourceScenario = {
  createButton: string
  defaultName: string
  kind: ResourceKind
  pageTitle: string
  renderPage: ComponentType
  route: string
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

rs.mock('../src/services/insightApi', () => ({
  createInsight: rs.fn(),
  deleteInsight: rs.fn(),
  fetchInsights: rs.fn(),
  updateInsight: rs.fn(),
}))

rs.mock('../src/application/resources/session', () => ({
  connectResourceSession,
  releaseResourceSession,
}))

const resourceApi = await import('../src/services/resourceApi')
const insightApi = await import('../src/services/insightApi')
const { useAppPreferencesStore } = await import('./application-test-stores')
const { useManageChartsStore } = await import('./application-test-stores')
const { useManageInsightsStore } = await import('./application-test-stores')
const { useNavigationStore } = await import('./application-test-stores')
const { ManageChartsPage } = await import('../src/views/resources/chart/ManageChartsPage')
const { ManageInsightsPage } = await import('../src/views/resources/insight/ManageInsightsPage')
const initialChartsState = useManageChartsStore.getState()
const initialInsightsState = useManageInsightsStore.getState()
const resourcesByKind: Record<ResourceKind, ResourceItem[]> = {
  chart: [],
  insight: [],
}

const createResourceItem = (kind: ResourceKind, index: number): ResourceItem => ({
  id: `${kind}-${index}`,
  name: `${kind} resource ${index}`,
  createdAt: `2026-05-${String(index).padStart(2, '0')}T01:00:00.000Z`,
  updatedAt: `2026-05-${String(index).padStart(2, '0')}T02:00:00.000Z`,
})

const seedResourceItems = (kind: ResourceKind, count = 9) => {
  resourcesByKind[kind] = Array.from({ length: count }, (_, index) => createResourceItem(kind, index + 1))
}

const createDeferred = <T,>() => {
  let resolve!: (value: T) => void
  const promise = new Promise<T>((next) => {
    resolve = next
  })
  return { promise, resolve }
}

const getRowForText = (text: string) => {
  const row = screen.getByText(text).closest('tr')
  expect(row).toBeTruthy()
  return row as HTMLTableRowElement
}

const clickVisibleDeleteConfirmation = async () => {
  const confirmationButton = await waitFor(() => {
    const deleteButtons = screen.getAllByRole('button', { name: /^Delete$/ })
    const button = deleteButtons.at(-1)
    expect(button).toBeTruthy()
    expect(button).toBeEnabled()
    return button as HTMLButtonElement
  })
  expect(confirmationButton).toBeTruthy()
  fireEvent.click(confirmationButton as HTMLButtonElement)
  await waitFor(() => expect(confirmationButton).not.toBeInTheDocument())
}

const setupResourceMocks = () => {
  ;(
    resourceApi.listResources as unknown as {
      mockImplementation(implementation: (kind: ResourceKind) => Promise<ResourceItem[]>): void
    }
  ).mockImplementation(async (kind) => resourcesByKind[kind])
  ;(
    insightApi.fetchInsights as unknown as {
      mockImplementation(implementation: () => Promise<ResourceItem[]>): void
    }
  ).mockImplementation(async () => resourcesByKind.insight)
  ;(resourceApi.createResource as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(undefined)
  ;(resourceApi.removeResource as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(undefined)
  ;(resourceApi.renameResource as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(undefined)
  ;(insightApi.createInsight as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(undefined)
  ;(insightApi.deleteInsight as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(undefined)
  ;(insightApi.updateInsight as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(undefined)
  connectResourceSession.mockResolvedValue(undefined)
  releaseResourceSession.mockResolvedValue(undefined)
}

const renderScenarioPage = (scenario: ResourceScenario) => {
  const Page = scenario.renderPage
  render(<Page />)
}

const scenarios: ResourceScenario[] = [
  {
    createButton: 'New Chart',
    defaultName: 'Untitled Chart',
    kind: 'chart',
    pageTitle: 'Charts',
    renderPage: ManageChartsPage,
    route: '/manage/chart/chart-1',
  },
  {
    createButton: 'New Insight',
    defaultName: 'Untitled Insight',
    kind: 'insight',
    pageTitle: 'Insights',
    renderPage: ManageInsightsPage,
    route: '/manage/insight/insight-1',
  },
]

describe('resource management pages', () => {
  beforeEach(() => {
    rs.clearAllMocks()
    useAppPreferencesStore.setState({ locale: 'en-US', themeMode: 'slate' })
    useManageChartsStore.setState(initialChartsState, true)
    useManageInsightsStore.setState(initialInsightsState, true)
    useNavigationStore.setState({ navigate, pathname: '' })
    resourcesByKind.chart = []
    resourcesByKind.insight = []
    setupResourceMocks()
  })

  afterEach(() => {
    cleanup()
  })

  scenarios.forEach((scenario) => {
    test(`${scenario.kind} management supports list, search, pagination, selection, create, edit navigation, and delete`, async () => {
      seedResourceItems(scenario.kind)
      renderScenarioPage(scenario)

      expect(await screen.findByRole('heading', { name: scenario.pageTitle })).toBeInTheDocument()
      expect(screen.getByText('9 Visible')).toBeInTheDocument()
      expect(screen.getByText(`${scenario.kind} resource 1`)).toBeInTheDocument()
      expect(screen.queryByText(`${scenario.kind} resource 9`)).not.toBeInTheDocument()
      expect(screen.getByRole('table').closest('.vbi-motion-resource-table')).toBeTruthy()
      expect(getRowForText(`${scenario.kind} resource 1`)).not.toHaveClass('vbi-motion-row')

      fireEvent.click(screen.getByRole('button', { name: 'Next' }))
      expect(screen.getByText(`${scenario.kind} resource 9`)).toBeInTheDocument()
      fireEvent.click(screen.getByRole('button', { name: 'Previous' }))
      expect(screen.getByText(`${scenario.kind} resource 1`)).toBeInTheDocument()

      fireEvent.change(screen.getByRole('textbox', { name: 'Search name or ID' }), {
        target: { value: `${scenario.kind} resource 2` },
      })
      expect(screen.getByText(`${scenario.kind} resource 2`)).toBeInTheDocument()
      expect(screen.queryByText(`${scenario.kind} resource 1`)).not.toBeInTheDocument()

      fireEvent.click(screen.getByRole('button', { name: 'Clear' }))
      expect(screen.getByRole('textbox', { name: 'Search name or ID' })).toHaveValue('')
      expect(screen.getByText(`${scenario.kind} resource 1`)).toBeInTheDocument()

      fireEvent.click(within(getRowForText(`${scenario.kind} resource 1`)).getByRole('button', { name: 'Edit' }))
      expect(navigate).toHaveBeenCalledWith(scenario.route)
      expect(navigate).toHaveBeenCalledTimes(1)

      fireEvent.click(screen.getByRole('button', { name: scenario.createButton }))
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

      if (scenario.kind === 'insight') {
        await waitFor(() =>
          expect(insightApi.createInsight).toHaveBeenCalledWith({
            content: '',
            name: scenario.defaultName,
          }),
        )
      } else {
        await waitFor(() =>
          expect(resourceApi.createResource).toHaveBeenCalledWith(scenario.kind, scenario.defaultName),
        )
      }

      fireEvent.click(
        within(getRowForText(`${scenario.kind} resource 2`)).getByRole('button', {
          name: `Delete ${scenario.kind} resource 2`,
        }),
      )
      await clickVisibleDeleteConfirmation()
      if (scenario.kind === 'insight') {
        await waitFor(() => expect(insightApi.deleteInsight).toHaveBeenCalledWith(`${scenario.kind}-2`))
      } else {
        await waitFor(() =>
          expect(resourceApi.removeResource).toHaveBeenCalledWith(scenario.kind, `${scenario.kind}-2`),
        )
      }

      fireEvent.click(within(getRowForText(`${scenario.kind} resource 3`)).getByRole('checkbox'))
      const toolbarDelete = screen
        .getAllByRole('button', { name: 'Delete' })
        .find((button) => button.textContent === 'Delete')
      expect(toolbarDelete).toBeEnabled()
      fireEvent.click(toolbarDelete as HTMLButtonElement)
      await clickVisibleDeleteConfirmation()
      if (scenario.kind === 'insight') {
        await waitFor(() => expect(insightApi.deleteInsight).toHaveBeenCalledWith(`${scenario.kind}-3`))
      } else {
        await waitFor(() =>
          expect(resourceApi.removeResource).toHaveBeenCalledWith(scenario.kind, `${scenario.kind}-3`),
        )
      }
    })
  })

  test('restarts the resource table route animation when switching resource categories', async () => {
    seedResourceItems('chart')
    seedResourceItems('insight')

    const { rerender } = render(<ManageChartsPage />)

    expect(await screen.findByText('chart resource 1')).toBeInTheDocument()
    const chartTablePanel = screen.getByRole('table').closest('.vbi-motion-resource-table')
    expect(chartTablePanel).toBeTruthy()

    rerender(<ManageInsightsPage />)

    expect(await screen.findByText('insight resource 1')).toBeInTheDocument()
    const insightTablePanel = screen.getByRole('table').closest('.vbi-motion-resource-table')
    expect(insightTablePanel).toBeTruthy()
    expect(insightTablePanel).not.toBe(chartTablePanel)
  })

  test('keeps cached resource rows visible while a reload is pending', async () => {
    seedResourceItems('chart')
    const { container } = render(<ManageChartsPage />)

    expect(await screen.findByText('chart resource 1')).toBeInTheDocument()

    const pendingReload = createDeferred<ResourceItem[]>()
    ;(
      resourceApi.listResources as unknown as {
        mockImplementation(implementation: (kind: ResourceKind) => Promise<ResourceItem[]>): void
      }
    ).mockImplementation(async (kind) => {
      if (kind === 'chart') return pendingReload.promise
      return resourcesByKind[kind]
    })

    let reloadPromise!: Promise<void>
    await act(async () => {
      reloadPromise = useManageChartsStore.getState().load()
      await Promise.resolve()
    })

    expect(screen.getByText('chart resource 1')).toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(container.querySelector('.animate-spin')).toBeNull()

    pendingReload.resolve(resourcesByKind.chart)
    await act(async () => {
      await reloadPromise
    })
  })
})
