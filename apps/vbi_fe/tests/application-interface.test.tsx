import { beforeEach, describe, expect, rs, test } from '@rstest/core'
import { act, cleanup, render, waitFor } from '@testing-library/react'

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
  connectResourceSession: rs.fn(),
  releaseResourceSession: rs.fn(),
}))

const resourceApi = await import('../src/services/resourceApi')
const insightApi = await import('../src/services/insightApi')
const resourceSession = await import('../src/application/resources/session')
const { application, applicationShallowEqual, bindApplicationNavigation, setApplicationPathname, useApplication } =
  await import('../src/application')
const { runLazyLifecycleCommand } = await import('../src/application/core/lazy')
const { agentApplicationStore } = await import('../src/application/agent/store')
const { chartApplicationStore } = await import('../src/application/chart/store')
const { i18nApplicationStore } = await import('../src/application/i18n/store')
const { insightApplicationStore } = await import('../src/application/insight/store')
const { layoutApplicationStore } = await import('../src/application/layout/store')
const { themeApplicationStore } = await import('../src/application/theme/store')
const { VbiAppProviders } = await import('../src/app/providers')
const { appLocales } = await import('../src/i18n')
const { darkVbiThemeModes, lightVbiThemeModes } = await import('../src/theme/palette')
const { useAppPreferencesStore } = await import('./application-test-stores')
const { useAgentConversationsStore } = await import('./application-test-stores')
const {
  defaultWorkspaceSidePanelWidth,
  minWorkspaceSidePanelWidth,
  useWorkspaceSidePanelStore,
  workspaceSidePanelFloatingPositionStorageKey,
  workspaceSidePanelModeStorageKey,
  workspaceSidePanelWidthStorageKey,
} = await import('./application-test-stores')
const {
  defaultManageSidebarWidth,
  defaultWorkspacePlacement,
  manageSidebarWidthStorageKey,
  useManageSidebarStore,
  workspacePlacementStorageKey,
} = await import('./application-test-stores')
const { useManageChartsStore } = await import('./application-test-stores')
const { useManageInsightsStore } = await import('./application-test-stores')
const { useNavigationStore } = await import('./application-test-stores')
const initialPreferencesState = useAppPreferencesStore.getState()
const initialAgentConversationsState = useAgentConversationsStore.getState()
const initialManageSidebarState = useManageSidebarStore.getState()
const initialWorkspaceSidePanelState = useWorkspaceSidePanelStore.getState()
const initialChartsState = useManageChartsStore.getState()
const initialInsightsState = useManageInsightsStore.getState()
const initialNavigationState = useNavigationStore.getState()
const navigate = rs.fn()

const createResourceItem = (id: string, name: string) => ({
  createdAt: '2026-01-01T00:00:00.000Z',
  id,
  name,
  updatedAt: '2026-01-02T00:00:00.000Z',
})

describe('application interface', () => {
  beforeEach(() => {
    cleanup()
    rs.clearAllMocks()
    Reflect.deleteProperty(window, 'VBIApplication')
    Reflect.deleteProperty(window, 'VBIApplicationAPI')
    Reflect.deleteProperty(window, 'useApplication')
    window.localStorage.removeItem(manageSidebarWidthStorageKey)
    window.localStorage.removeItem(workspacePlacementStorageKey)
    window.localStorage.removeItem(workspaceSidePanelFloatingPositionStorageKey)
    window.localStorage.removeItem(workspaceSidePanelModeStorageKey)
    window.localStorage.removeItem(workspaceSidePanelWidthStorageKey)
    window.history.replaceState(null, '', '/manage/chart')
    useAppPreferencesStore.setState(initialPreferencesState, true)
    useAgentConversationsStore.setState(initialAgentConversationsState, true)
    useWorkspaceSidePanelStore.setState(initialWorkspaceSidePanelState, true)
    useWorkspaceSidePanelStore.setState({
      collapsed: false,
      floatingPosition: null,
      mode: 'fixed',
      width: defaultWorkspaceSidePanelWidth,
    })
    useManageSidebarStore.setState(initialManageSidebarState, true)
    useManageSidebarStore.setState({
      collapsed: false,
      workspacePlacement: defaultWorkspacePlacement,
      width: defaultManageSidebarWidth,
    })
    useManageChartsStore.setState(initialChartsState, true)
    useManageInsightsStore.setState(initialInsightsState, true)
    useNavigationStore.setState(initialNavigationState, true)
    bindApplicationNavigation(navigate)
    setApplicationPathname('/manage/chart')
  })

  test('reads fresh imperative state before any React subscription is mounted', () => {
    expect('theme' in (application as unknown as Record<string, unknown>)).toBe(false)
    expect('layout' in (application as unknown as Record<string, unknown>)).toBe(false)
    expect('agent' in (application as unknown as Record<string, unknown>)).toBe(false)

    const listedThemes = application.getState().theme.list()

    expect(listedThemes).toEqual({ dark: darkVbiThemeModes, light: lightVbiThemeModes })
    expect(listedThemes.light).toHaveLength(6)
    expect(listedThemes.dark).toHaveLength(6)
    listedThemes.light.pop()
    listedThemes.dark.pop()
    expect(application.getState().theme.list()).toEqual({ dark: darkVbiThemeModes, light: lightVbiThemeModes })

    application.getState().theme.change('blue')

    expect(application.getState().theme.mode).toBe('blue')

    const listedLocales = application.getState().i18n.list()

    expect(listedLocales).toEqual(appLocales)
    listedLocales.pop()
    expect(application.getState().i18n.list()).toEqual(appLocales)
  })

  test('composes public application state from dedicated domain stores', () => {
    const state = application.getState()
    expect(Object.keys(state).sort()).toEqual(['agent', 'chart', 'i18n', 'insight', 'layout', 'theme'])
    expect(state.agent).toBe(agentApplicationStore.getState())
    expect(state.chart.records).toBe(chartApplicationStore.getState().records)
    expect('sessions' in (state.chart as unknown as Record<string, unknown>)).toBe(false)
    expect(state.i18n).toBe(i18nApplicationStore.getState())
    expect(state.insight.records).toBe(insightApplicationStore.getState().records)
    expect('sessions' in (state.insight as unknown as Record<string, unknown>)).toBe(false)
    expect(state.layout).toBe(layoutApplicationStore.getState())
    expect(state.theme).toBe(themeApplicationStore.getState())
  })

  test('rejects selectable changes that are not returned from list commands', async () => {
    expect(() => application.getState().theme.change('missing-theme' as never)).toThrow(
      /application\.getState\(\)\.theme\.list/,
    )
    expect(application.getState().theme.mode).toBe(initialPreferencesState.themeMode)

    expect(() => application.getState().i18n.change('missing-locale' as never)).toThrow(
      /application\.getState\(\)\.i18n\.list/,
    )
    expect(application.getState().i18n.locale).toBe(initialPreferencesState.locale)

    expect(() => application.getState().layout.sidePanel.changeMode('missing-mode' as never)).toThrow(
      /application\.getState\(\)\.layout\.sidePanel\.listMode/,
    )
    expect(application.getState().layout.sidePanel.mode).toBe('fixed')

    expect(() => application.getState().layout.workspacePlacement.change('missing-placement' as never)).toThrow(
      /application\.getState\(\)\.layout\.workspacePlacement\.list/,
    )
    expect(application.getState().layout.workspacePlacement.value).toBe(defaultWorkspacePlacement)

    await expect(application.getState().agent.model.change('missing-model')).rejects.toThrow(
      /application\.getState\(\)\.agent\.model\.list/,
    )
    expect(application.getState().agent.model.selectedId).toBe('deepseek-v4-flash')

    await expect(application.getState().agent.model.changeThinking('missing-thinking' as never)).rejects.toThrow(
      /application\.getState\(\)\.agent\.model\.listThinking/,
    )
    expect(application.getState().agent.model.thinkingLevel).toBe('high')
  })

  test('selects and subscribes to semantic application state', () => {
    const changes: string[] = []
    const unsubscribe = application.subscribe(
      (state) => state.theme.mode,
      (mode) => changes.push(mode),
    )

    application.getState().i18n.change('en-US')
    application.getState().theme.change('blue')
    application.getState().theme.change('blue')

    unsubscribe()
    expect(changes).toEqual(['blue'])
    expect(application.getState().i18n.locale).toBe('en-US')
  })

  test('useApplication only re-renders when the selected state changes', () => {
    let renderCount = 0

    const ThemeReader = () => {
      renderCount += 1
      const theme = useApplication((state) => state.theme.mode)
      return <div>{theme}</div>
    }

    render(<ThemeReader />)
    expect(renderCount).toBe(1)

    act(() => {
      application.getState().i18n.change('ja-JP')
    })
    expect(renderCount).toBe(1)

    act(() => {
      application.getState().theme.change('midnight')
    })
    expect(renderCount).toBe(2)
  })

  test('keeps agent model projections stable across unrelated application updates', async () => {
    await application.getState().agent.model.change('deepseek-v4-flash')
    const initialOptions = application.getState().agent.model.options
    let renderCount = 0

    const AgentModelReader = () => {
      renderCount += 1
      const model = useApplication(
        (state) => ({
          options: state.agent.model.options,
          selectedId: state.agent.model.selectedId,
          thinkingLevel: state.agent.model.thinkingLevel,
        }),
        { equality: applicationShallowEqual },
      )

      return <div>{model.options.map((option) => option.id).join(',')}</div>
    }

    render(<AgentModelReader />)
    expect(renderCount).toBe(1)

    act(() => {
      application.getState().theme.change(application.getState().theme.mode === 'blue' ? 'slate' : 'blue')
    })
    act(() => {
      application.getState().i18n.change(application.getState().i18n.locale === 'en-US' ? 'ja-JP' : 'en-US')
    })
    act(() => {
      setApplicationPathname('/manage/chart')
    })
    act(() => {
      useManageChartsStore.setState({ loading: !useManageChartsStore.getState().loading })
    })

    expect(application.getState().agent.model.options).toBe(initialOptions)
    expect(renderCount).toBe(1)
  })

  test('app providers expose application to window for React-external commands', async () => {
    ;(resourceApi.listResources as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue([])
    render(
      <VbiAppProviders initialLocale='zh-CN' initialThemeMode='slate'>
        <div>Workspace</div>
      </VbiAppProviders>,
    )

    await waitFor(() => expect(window.VBIApplication).toBe(application))
    expect('VBIApplicationAPI' in window).toBe(false)
    expect('useApplication' in window).toBe(false)
    expect('theme' in (window.VBIApplication as unknown as Record<string, unknown>)).toBe(false)
    expect(window.VBIApplication?.getState().theme.list()).toEqual({
      dark: darkVbiThemeModes,
      light: lightVbiThemeModes,
    })
    expect(window.VBIApplication?.getState().i18n.list()).toEqual(appLocales)

    act(() => {
      window.VBIApplication?.getState().theme.change('blue')
      window.VBIApplication?.getState().i18n.change('en-US')
    })
    const cleanup = window.VBIApplication?.getState().chart.activate()

    expect(window.VBIApplication?.getState().theme.mode).toBe('blue')
    expect(window.VBIApplication?.getState().i18n.locale).toBe('en-US')
    await waitFor(() => expect(document.documentElement.lang).toBe('en-US'))
    await waitFor(() => expect(window.location.pathname).toBe('/manage/chart'))

    const windowTheme = window.VBIApplication?.getState().theme

    act(() => {
      windowTheme?.change('midnight')
    })

    expect(window.VBIApplication?.getState().theme.mode).toBe('midnight')
    expect('navigation' in (window.VBIApplication as unknown as Record<string, unknown>)).toBe(false)
    cleanup?.()
  })

  test('reports lazy lifecycle load failures instead of swallowing them', async () => {
    const error = new Error('lazy lifecycle failed')
    const consoleError = rs.spyOn(console, 'error').mockImplementation(() => undefined)

    const cleanup = runLazyLifecycleCommand(
      () => Promise.reject(error),
      (module: unknown) => module,
      () => () => undefined,
    )

    await waitFor(() => expect(consoleError).toHaveBeenCalledWith('VBI application lazy lifecycle failed', error))
    cleanup()
  })

  test('routes semantic application actions through the bound router adapter', async () => {
    ;(resourceApi.listResources as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue([])
    await application.getState().chart.open('chart 1')
    await application.getState().insight.open('insight-1')
    setApplicationPathname('/agent')
    const cleanup = application.getState().chart.activate()
    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/manage/chart'))
    cleanup()

    expect(navigate).toHaveBeenNthCalledWith(1, '/manage/chart/chart%201')
    expect(navigate).toHaveBeenNthCalledWith(2, '/manage/insight/insight-1')
    expect(navigate).toHaveBeenNthCalledWith(3, '/manage/chart')
    expect('navigation' in (application as unknown as Record<string, unknown>)).toBe(false)
  })

  test('exposes grouped agent chat, conversation, model, and panel interfaces', async () => {
    useAgentConversationsStore.setState({
      activeConversationId: 'conversation-1',
      conversations: [
        {
          createdAt: '2026-01-01T00:00:00.000Z',
          id: 'conversation-1',
          lastModified: '2026-01-02T00:00:00.000Z',
          status: 'completed',
          title: 'Conversation 1',
        },
      ],
      isInitialized: true,
    })

    expect(Object.keys(application.getState().agent).sort()).toEqual(['chat', 'conversations', 'model', 'panel'])
    expect(application.getState().agent.conversations.activeId).toBe('conversation-1')
    expect(application.getState().agent.conversations.items.map((item) => item.id)).toEqual(['conversation-1'])
    expect(application.getState().agent.chat.runtime).toBeNull()
    expect(application.getState().agent.chat.snapshot.messages).toEqual([])
    expect(application.getState().agent.model.selectedId).toBe('deepseek-v4-flash')
    expect(application.getState().agent.panel.collapsed).toBe(false)
    expect(application.getState().agent.panel.mode).toBe('fixed')
    expect(application.getState().agent.panel.width).toBe(defaultWorkspaceSidePanelWidth)
    expect(application.getState().agent.panel).toMatchObject({
      collapsed: application.getState().layout.sidePanel.collapsed,
      mode: application.getState().layout.sidePanel.mode,
      width: application.getState().layout.sidePanel.width,
    })

    application.getState().agent.chat.clear()
    expect(application.getState().agent.conversations.activeId).toBe('')

    await application.getState().agent.conversations.open('conversation-1')
    expect(application.getState().agent.conversations.activeId).toBe('conversation-1')
    expect(navigate).not.toHaveBeenCalledWith('/agent/conversation-1')

    application.getState().agent.panel.changeMode('floating')
    expect(application.getState().agent.panel.mode).toBe('floating')
    expect(application.getState().layout.sidePanel.mode).toBe('floating')
    expect(window.localStorage.getItem(workspaceSidePanelModeStorageKey)).toBe('floating')
    application.getState().agent.panel.toggleMode()
    expect(application.getState().agent.panel.mode).toBe('fixed')
    application.getState().agent.panel.setCollapsed(true)
    expect(application.getState().agent.panel.collapsed).toBe(true)
    application.getState().agent.panel.toggleCollapsed()
    expect(application.getState().agent.panel.collapsed).toBe(false)
    application.getState().agent.panel.setWidth(520)
    expect(application.getState().agent.panel.width).toBe(520)
    expect(application.getState().layout.sidePanel.width).toBe(520)
    expect(window.localStorage.getItem(workspaceSidePanelWidthStorageKey)).toBe('520')
    application.getState().agent.panel.setWidth(240)
    expect(application.getState().agent.panel.width).toBe(minWorkspaceSidePanelWidth)
    expect(window.localStorage.getItem(workspaceSidePanelWidthStorageKey)).toBe(String(minWorkspaceSidePanelWidth))
    application.getState().agent.panel.setFloatingPosition({ x: 240, y: 96 })
    expect(application.getState().agent.panel.floatingPosition).toEqual({ x: 240, y: 96 })
    expect(application.getState().layout.sidePanel.floatingPosition).toEqual({ x: 240, y: 96 })
    expect(window.localStorage.getItem(workspaceSidePanelFloatingPositionStorageKey)).toBe('{"x":240,"y":96}')
    application.getState().agent.panel.setFloatingPosition(null)
    expect(application.getState().agent.panel.floatingPosition).toBeNull()
    expect(window.localStorage.getItem(workspaceSidePanelFloatingPositionStorageKey)).toBeNull()

    await application.getState().agent.model.change('deepseek-v4-pro')
    expect(application.getState().agent.model.selectedId).toBe('deepseek-v4-pro')
    expect(application.getState().agent.model.list()).toEqual(application.getState().agent.model.options)
    expect(application.getState().agent.model.list()).not.toBe(application.getState().agent.model.options)
    expect(application.getState().agent.model.listThinking()).toEqual(['high', 'xhigh'])
    await application.getState().agent.model.changeThinking('xhigh')
    expect(application.getState().agent.model.thinkingLevel).toBe('xhigh')
    expect('changeThinkingLevel' in (application.getState().agent.model as unknown as Record<string, unknown>)).toBe(
      false,
    )

    const legacyAgent = application.getState().agent as unknown as Record<string, unknown>
    expect('activeRuntime' in legacyAgent).toBe(false)
    expect('selectedSnapshot' in legacyAgent).toBe(false)
    expect('modelOptions' in legacyAgent).toBe(false)
    expect('setModel' in legacyAgent).toBe(false)
    expect('setThinkingLevel' in legacyAgent).toBe(false)
    expect('bootstrap' in application.getState().agent.chat).toBe(false)
    expect('dispose' in application.getState().agent.chat).toBe(false)
    const cleanup = application.getState().agent.chat.activate()
    cleanup()
  })

  test('exposes persistent layout controls through application.getState().layout', () => {
    expect(application.getState().layout.sidebar.collapsed).toBe(false)
    expect(application.getState().layout.sidebar.width).toBe(defaultManageSidebarWidth)
    expect(application.getState().layout.sidePanel.collapsed).toBe(false)
    expect(application.getState().layout.sidePanel.mode).toBe('fixed')
    expect(application.getState().layout.sidePanel.width).toBe(defaultWorkspaceSidePanelWidth)
    expect(application.getState().layout.workspacePlacement.value).toBe('resource-center')

    application.getState().layout.sidebar.setWidth(360)
    expect(application.getState().layout.sidebar.width).toBe(360)
    expect(window.localStorage.getItem(manageSidebarWidthStorageKey)).toBe('360')

    application.getState().layout.sidebar.setCollapsed(true)
    expect(application.getState().layout.sidebar.collapsed).toBe(true)
    application.getState().layout.sidebar.toggleCollapsed()
    expect(application.getState().layout.sidebar.collapsed).toBe(false)

    application.getState().layout.sidebar.resetWidth()
    expect(application.getState().layout.sidebar.width).toBe(defaultManageSidebarWidth)
    expect(window.localStorage.getItem(manageSidebarWidthStorageKey)).toBe(String(defaultManageSidebarWidth))

    expect(application.getState().layout.sidePanel.listMode()).toEqual(['fixed', 'floating'])
    application.getState().layout.sidePanel.changeMode('floating')
    expect(application.getState().layout.sidePanel.mode).toBe('floating')
    expect(application.getState().agent.panel.mode).toBe('floating')
    expect('setMode' in (application.getState().layout.sidePanel as unknown as Record<string, unknown>)).toBe(false)
    application.getState().layout.sidePanel.toggleMode()
    expect(application.getState().layout.sidePanel.mode).toBe('fixed')
    application.getState().layout.sidePanel.setWidth(540)
    expect(application.getState().layout.sidePanel.width).toBe(540)
    expect(window.localStorage.getItem(workspaceSidePanelWidthStorageKey)).toBe('540')
    application.getState().layout.sidePanel.resetWidth()
    expect(application.getState().layout.sidePanel.width).toBe(defaultWorkspaceSidePanelWidth)

    application.getState().layout.workspacePlacement.toggle()
    expect(application.getState().layout.workspacePlacement.value).toBe('agent-center')
    expect(window.localStorage.getItem(workspacePlacementStorageKey)).toBe('agent-center')

    expect(application.getState().layout.workspacePlacement.list()).toEqual(['resource-center', 'agent-center'])
    application.getState().layout.workspacePlacement.change('resource-center')
    expect(application.getState().layout.workspacePlacement.value).toBe('resource-center')
    expect(window.localStorage.getItem(workspacePlacementStorageKey)).toBe('resource-center')
    expect('set' in (application.getState().layout.workspacePlacement as unknown as Record<string, unknown>)).toBe(
      false,
    )
  })

  test('exposes chart resource list commands through application.getState().chart', async () => {
    const items = [createResourceItem('chart-1', 'Sales'), createResourceItem('chart-2', 'Ops')]
    useManageChartsStore.setState({
      filteredItems: items,
      items,
    })
    ;(resourceApi.listResources as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(items)
    ;(resourceApi.createResource as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(
      createResourceItem('chart-3', 'Revenue'),
    )
    ;(resourceApi.removeResource as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(undefined)
    ;(resourceApi.renameResource as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(undefined)

    expect((await application.getState().chart.list()).map((item) => item.id)).toEqual(['chart-1', 'chart-2'])

    application.getState().chart.records.search('sales')
    expect(application.getState().chart.records.visibleItems.map((item) => item.id)).toEqual(['chart-1'])

    application.getState().chart.records.select(['chart-1'])
    expect(application.getState().chart.records.selectedIds).toEqual(['chart-1'])

    await application.getState().chart.create({ name: 'Revenue' })
    expect(resourceApi.createResource).toHaveBeenCalledWith('chart', 'Revenue')

    await application.getState().chart.rename({ id: 'chart-1', name: 'Sales 2026' })
    expect(resourceApi.renameResource).toHaveBeenCalledWith('chart', 'chart-1', 'Sales 2026')

    await application.getState().chart.delete('chart-1')
    expect(resourceApi.removeResource).toHaveBeenCalledWith('chart', 'chart-1')

    const disconnectChartEditor = application.getState().chart.editor.connect('chart-1', 'user-1')
    await waitFor(() =>
      expect(resourceSession.connectResourceSession).toHaveBeenCalledWith('chart', 'chart-1', 'user-1'),
    )
    disconnectChartEditor()
    await waitFor(() => expect(resourceSession.releaseResourceSession).toHaveBeenCalledWith('chart', 'chart-1'))

    const legacyChart = application.getState().chart as unknown as Record<string, unknown>
    expect('bootstrap' in legacyChart).toBe(false)
    expect('dispose' in legacyChart).toBe(false)
    expect('setSearchText' in legacyChart).toBe(false)
    expect('filteredItems' in legacyChart).toBe(false)
    expect('selectedRowKeys' in legacyChart).toBe(false)
    expect('connectSession' in legacyChart).toBe(false)
    expect('openCreate' in legacyChart).toBe(false)
    expect('createDraft' in legacyChart).toBe(false)
  })

  test('exposes resource workflow commands through application.getState().chart', async () => {
    const items = [createResourceItem('chart-1', 'Sales'), createResourceItem('chart-2', 'Ops')]
    useManageChartsStore.setState({
      filteredItems: items,
      items,
      selectedRowKeys: ['chart-1', 'chart-2'],
    })
    ;(resourceApi.removeResource as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(undefined)
    ;(resourceApi.listResources as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(items)

    application.getState().chart.records.select(['chart-1'])
    application.getState().chart.records.select([])
    await application.getState().chart.open('chart-1')
    application.getState().chart.records.select(['chart-1', 'chart-2'])
    await application.getState().chart.records.deleteSelected()
    const cleanup = application.getState().chart.activate()
    cleanup()

    expect(navigate).toHaveBeenCalledWith('/manage/chart/chart-1')
    expect(resourceApi.removeResource).toHaveBeenCalledWith('chart', 'chart-1')
    expect(resourceApi.removeResource).toHaveBeenCalledWith('chart', 'chart-2')
  })

  test('exposes chart and insight resource-specific create behavior', async () => {
    ;(insightApi.createInsight as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(
      createResourceItem('insight-1', 'Finding'),
    )
    ;(insightApi.fetchInsights as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue([])
    ;(resourceApi.createResource as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue(
      createResourceItem('chart-1', 'Chart'),
    )
    ;(resourceApi.listResources as unknown as { mockResolvedValue(value: unknown): void }).mockResolvedValue([])

    useAppPreferencesStore.setState({ locale: 'zh-CN' })
    await application.getState().chart.create()
    expect(resourceApi.createResource).toHaveBeenCalledWith('chart', '未命名图表')

    await application.getState().insight.create()
    expect(insightApi.createInsight).toHaveBeenCalledWith({
      content: '',
      name: '未命名洞察',
    })
    await application.getState().insight.create({ content: 'Insight body', name: 'Finding' })
    expect(insightApi.createInsight).toHaveBeenCalledWith({
      content: 'Insight body',
      name: 'Finding',
    })
  })
})
