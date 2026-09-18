import { afterEach, beforeEach, describe, expect, rs, test } from '@rstest/core'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'

rs.mock('../src/views/agent/AgentPage', () => ({
  AgentChatSurface: ({ className }: { className?: string }) => (
    <div className={className} data-testid='agent-chat-surface' />
  ),
}))

const { ManageLayoutPage } = await import('../src/views/workspace/ManageLayoutPage')
const { useAgentConversationsStore } = await import('./application-test-stores')
const { useAppPreferencesStore } = await import('./application-test-stores')
const {
  defaultManageSidebarWidth,
  defaultWorkspacePlacement,
  manageSidebarWidthStorageKey,
  useManageSidebarStore,
  workspacePlacementStorageKey,
} = await import('./application-test-stores')
const { useNavigationStore } = await import('./application-test-stores')
const {
  defaultWorkspaceSidePanelWidth,
  useWorkspaceSidePanelStore,
  workspaceSidePanelFloatingPositionStorageKey,
  workspaceSidePanelModeStorageKey,
  workspaceSidePanelWidthStorageKey,
} = await import('./application-test-stores')
const { setVbiAgentIndexedDBFactoryForTests } = await import('../src/application/agent/agent-storage')

const emptyUsage = {
  cacheRead: 0,
  cacheWrite: 0,
  cost: { cacheRead: 0, cacheWrite: 0, input: 0, output: 0, total: 0 },
  input: 0,
  output: 0,
  totalTokens: 0,
}

const conversationMetadata = {
  id: 'conversation-1',
  title: 'Revenue follow-up',
  createdAt: '2026-05-26T01:00:00.000Z',
  lastModified: '2026-05-26T01:02:00.000Z',
  messageCount: 4,
  preview: 'Continue the revenue analysis',
  thinkingLevel: 'high' as const,
  usage: emptyUsage,
}

const seedConversationStorage = () => {
  const records = new Map([
    [
      conversationMetadata.id,
      {
        metadata: conversationMetadata,
        schemaVersion: 1 as const,
        session: {
          id: conversationMetadata.id,
          title: conversationMetadata.title,
          createdAt: conversationMetadata.createdAt,
          lastModified: conversationMetadata.lastModified,
          messages: [],
          model: { id: 'test-model' },
          thinkingLevel: conversationMetadata.thinkingLevel,
        },
      },
    ],
  ])
  setVbiAgentIndexedDBFactoryForTests(async () => ({
    get: async (id) => records.get(id) ?? null,
    getAll: async () => [...records.values()],
    put: async (record) => {
      records.set(record.session.id, record as never)
    },
    delete: async (id) => {
      records.delete(id)
    },
  }))
}

describe('manage layout navigation', () => {
  beforeEach(() => {
    seedConversationStorage()
    window.localStorage.removeItem(manageSidebarWidthStorageKey)
    window.localStorage.removeItem(workspacePlacementStorageKey)
    window.localStorage.removeItem(workspaceSidePanelFloatingPositionStorageKey)
    window.localStorage.removeItem(workspaceSidePanelModeStorageKey)
    window.localStorage.removeItem(workspaceSidePanelWidthStorageKey)
    useAppPreferencesStore.setState({ locale: 'en-US', themeMode: 'slate' })
    useAgentConversationsStore.setState({
      activeConversationId: '',
      conversations: [],
      handledNewConversationRequestSeq: 0,
      isInitialized: true,
      isLoading: false,
      newConversationRequestSeq: 0,
    })
    useManageSidebarStore.setState({ collapsed: false, width: defaultManageSidebarWidth })
    useManageSidebarStore.setState({ workspacePlacement: defaultWorkspacePlacement })
    useWorkspaceSidePanelStore.setState({
      collapsed: false,
      floatingPosition: null,
      mode: 'fixed',
      width: defaultWorkspaceSidePanelWidth,
    })
    useNavigationStore.setState({
      navigate: null,
      pathname: '/agent/conversation-1',
    })
  })

  afterEach(() => {
    cleanup()
  })

  test('places conversations in the sidebar and removes the agent nav route', () => {
    const navigatedTo: string[] = []
    useNavigationStore.getState().setNavigate((path) => navigatedTo.push(path))
    useAgentConversationsStore.getState().upsertConversation(
      {
        ...conversationMetadata,
        lastModified: new Date(Date.now() - 16 * 60 * 1000).toISOString(),
      },
      'completed',
    )
    useAgentConversationsStore.getState().selectConversation('conversation-1')

    render(
      <ManageLayoutPage>
        <div>Workspace</div>
      </ManageLayoutPage>,
    )

    const newConversation = screen.getByRole('button', { name: /new conversation/i })
    const resources = screen.getByRole('button', { name: /resources/i })
    const conversations = screen.getByRole('button', { name: /conversations/i })
    const conversation = screen.getByRole('button', { name: /^Revenue follow-up$/i })
    const sectionSeparator = document.querySelector('[data-slot="separator"]')

    expect(screen.queryByText('VBI Console')).not.toBeInTheDocument()
    expect(screen.queryByText('Resource Management')).not.toBeInTheDocument()
    expect(newConversation).toHaveAttribute('data-active', 'false')
    expect(resources).toHaveAttribute('aria-expanded', 'false')
    expect(resources).toHaveAttribute('data-active', 'false')
    expect(conversations).toHaveAttribute('aria-expanded', 'true')
    expect(conversations).toHaveAttribute('data-active', 'false')
    expect(conversation.closest('[data-active]')).toHaveAttribute('data-active', 'true')
    expect(newConversation.compareDocumentPosition(resources) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(resources.compareDocumentPosition(conversations) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(sectionSeparator).not.toBeNull()
    const separator = sectionSeparator as Element
    expect(resources.compareDocumentPosition(separator) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(separator.compareDocumentPosition(conversations) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(conversations.compareDocumentPosition(conversation) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Agent' })).not.toBeInTheDocument()
    expect(screen.queryByText('Continue the revenue analysis')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Charts' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Insights' })).not.toBeInTheDocument()
    expect(conversation.querySelector('svg')).toBeNull()
    expect(screen.getByText('16m')).toBeInTheDocument()
    expect(screen.getByTestId('agent-chat-surface')).toBeInTheDocument()
    expect(document.querySelector('[data-workspace-slot="center"]')).toHaveAttribute('data-workspace-content', 'agent')
    expect(document.querySelector('[data-workspace-slot="sidePanel"]')).toBeNull()

    fireEvent.click(resources)
    expect(resources).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: 'Charts' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Insights' })).toBeInTheDocument()

    fireEvent.click(conversation)
    expect(navigatedTo).toEqual([])
    expect(useAgentConversationsStore.getState().activeConversationId).toBe('conversation-1')

    fireEvent.click(newConversation)
    expect(navigatedTo).toEqual(['/agent'])
    expect(useAgentConversationsStore.getState().activeConversationId).toBe('')
    expect(useAgentConversationsStore.getState().newConversationRequestSeq).toBe(0)
  })

  test('toggles resource and conversation disclosure groups consistently', () => {
    useAgentConversationsStore.getState().upsertConversation(conversationMetadata, 'completed')

    render(
      <ManageLayoutPage>
        <div>Workspace</div>
      </ManageLayoutPage>,
    )

    const resources = screen.getByRole('button', { name: /resources/i })
    const conversations = screen.getByRole('button', { name: /conversations/i })

    expect(resources).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('button', { name: 'Charts' })).not.toBeInTheDocument()
    expect(conversations).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: /^Revenue follow-up$/i })).toBeInTheDocument()

    fireEvent.click(conversations)
    expect(conversations).toHaveAttribute('aria-expanded', 'false')
    expect(conversations).toHaveAttribute('data-active', 'false')
    expect(screen.queryByRole('button', { name: /^Revenue follow-up$/i })).not.toBeInTheDocument()

    fireEvent.click(conversations)
    fireEvent.click(resources)
    expect(resources).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: 'Charts' })).toBeInTheDocument()

    fireEvent.click(resources)
    expect(resources).toHaveAttribute('data-active', 'false')
  })

  test('auto-expands resource navigation when landing on a resource list route', () => {
    useNavigationStore.setState({ pathname: '/manage/chart' })

    render(
      <ManageLayoutPage>
        <div>Workspace</div>
      </ManageLayoutPage>,
    )

    expect(screen.getByRole('button', { name: /resources/i })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: /resources/i })).toHaveAttribute('data-active', 'false')
    expect(screen.getByRole('button', { name: 'Charts' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Charts' })).toHaveAttribute('data-active', 'true')
    expect(screen.getByRole('button', { name: 'Insights' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /conversations/i })).toHaveAttribute('data-active', 'false')

    fireEvent.click(screen.getByRole('button', { name: /resources/i }))
    expect(screen.getByRole('button', { name: /resources/i })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('button', { name: 'Charts' })).not.toBeInTheDocument()
  })

  test('keeps the resource route active while the selected conversation remains active in the agent list', () => {
    useNavigationStore.setState({ pathname: '/manage/chart' })
    useAgentConversationsStore.getState().upsertConversation(conversationMetadata, 'completed')
    useAgentConversationsStore.getState().selectConversation('conversation-1')

    render(
      <ManageLayoutPage>
        <div>Workspace</div>
      </ManageLayoutPage>,
    )

    expect(screen.getByRole('button', { name: /new conversation/i })).toHaveAttribute('data-active', 'false')
    expect(screen.getByRole('button', { name: /resources/i })).toHaveAttribute('data-active', 'false')
    expect(screen.getByRole('button', { name: 'Charts' })).toHaveAttribute('data-active', 'true')
    expect(screen.getByRole('button', { name: /conversations/i })).toHaveAttribute('data-active', 'false')
    expect(screen.getByRole('button', { name: /^Revenue follow-up$/i }).closest('[data-active]')).toHaveAttribute(
      'data-active',
      'true',
    )
  })

  test('toggles the resource and agent placement from the resource header and persists it', () => {
    useNavigationStore.setState({ pathname: '/manage/chart' })

    render(
      <ManageLayoutPage>
        <div>Workspace</div>
      </ManageLayoutPage>,
    )

    const centerPane = document.querySelector('[data-workspace-slot="center"]')
    const sidePanel = document.querySelector('[data-workspace-slot="sidePanel"]')
    expect(centerPane).toHaveAttribute('data-workspace-content', 'resource')
    expect(sidePanel).toHaveAttribute('data-workspace-content', 'agent')
    expect(screen.getByText('Workspace')).toBeInTheDocument()
    expect(screen.getByTestId('agent-chat-surface')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /swap workspace layout/i }))

    expect(window.localStorage.getItem(workspacePlacementStorageKey)).toBe('agent-center')
    expect(document.querySelector('[data-workspace-slot="center"]')).toHaveAttribute('data-workspace-content', 'agent')
    expect(document.querySelector('[data-workspace-slot="sidePanel"]')).toHaveAttribute(
      'data-workspace-content',
      'resource',
    )
    expect(document.querySelector('[data-workspace-slot="sidePanel"]')).toHaveClass('border-l')
    expect(screen.getByRole('heading', { name: 'Agent' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Charts' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Float Panel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Collapse Panel' })).toBeInTheDocument()
    expect(screen.getByRole('separator', { name: 'Resize Panel' })).toBeInTheDocument()
  })
  test('marks chart navigation active on chart detail routes', () => {
    useNavigationStore.setState({ pathname: '/manage/chart/chart-1' })

    render(
      <ManageLayoutPage>
        <div>Workspace</div>
      </ManageLayoutPage>,
    )

    expect(screen.getByRole('button', { name: /resources/i })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: 'Charts' })).toHaveAttribute('data-active', 'true')
    expect(screen.getByRole('button', { name: 'Insights' })).toHaveAttribute('data-active', 'false')
    expect(screen.getByRole('heading', { name: 'Charts' })).toBeInTheDocument()
  })

  test('marks insight navigation active on insight detail routes', () => {
    useNavigationStore.setState({ pathname: '/manage/insight/insight-1' })

    render(
      <ManageLayoutPage>
        <div>Workspace</div>
      </ManageLayoutPage>,
    )

    expect(screen.getByRole('button', { name: /resources/i })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: 'Charts' })).toHaveAttribute('data-active', 'false')
    expect(screen.getByRole('button', { name: 'Insights' })).toHaveAttribute('data-active', 'true')
    expect(screen.getByRole('heading', { name: 'Insights' })).toBeInTheDocument()
  })

  test('marks the new conversation item active on the agent root route', () => {
    useNavigationStore.setState({ pathname: '/agent' })

    render(
      <ManageLayoutPage>
        <div>Workspace</div>
      </ManageLayoutPage>,
    )

    expect(screen.getByRole('button', { name: /new conversation/i })).toHaveAttribute('data-active', 'true')
    expect(screen.getByRole('button', { name: /resources/i })).toHaveAttribute('data-active', 'false')
    expect(screen.getByRole('button', { name: /conversations/i })).toHaveAttribute('data-active', 'false')
    expect(screen.getAllByTestId('agent-chat-surface')).toHaveLength(1)
    expect(document.querySelector('[data-workspace-slot="center"]')).toHaveAttribute('data-workspace-content', 'agent')
    expect(document.querySelector('[data-workspace-slot="sidePanel"]')).toBeNull()
    expect(screen.queryByText('Workspace')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /swap workspace layout/i })).not.toBeInTheDocument()
  })

  test('hides the resource workspace on agent routes', () => {
    useNavigationStore.setState({ pathname: '/agent' })

    render(
      <ManageLayoutPage>
        <div>Workspace</div>
      </ManageLayoutPage>,
    )

    expect(screen.queryByText('Workspace')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Agent' })).toBeInTheDocument()
    expect(screen.getAllByTestId('agent-chat-surface')).toHaveLength(1)
    expect(document.querySelector('[data-workspace-slot="sidePanel"]')).toBeNull()
  })

  test('toggles sidebar visibility and keeps workspace slots visible', () => {
    useNavigationStore.setState({ pathname: '/manage/chart' })
    useAgentConversationsStore.getState().upsertConversation(conversationMetadata, 'completed')
    useAgentConversationsStore.getState().selectConversation('conversation-1')

    render(
      <ManageLayoutPage>
        <div>Workspace</div>
      </ManageLayoutPage>,
    )

    const hideSidebarButton = screen.getByRole('button', { name: /hide sidebar/i })
    expect(hideSidebarButton).toBeInTheDocument()
    expect(hideSidebarButton.closest('aside')).not.toBeNull()
    expect(hideSidebarButton.closest('header')).toBeNull()
    expect(document.querySelector('[data-workspace-slot="center"]')).toHaveAttribute(
      'data-workspace-content',
      'resource',
    )
    expect(document.querySelector('[data-workspace-slot="sidePanel"]')).toHaveAttribute(
      'data-workspace-content',
      'agent',
    )

    fireEvent.click(hideSidebarButton)

    const showSidebarButton = screen.getByRole('button', { name: /show sidebar/i })
    expect(showSidebarButton).toBeInTheDocument()
    expect(showSidebarButton.closest('aside')).toHaveAttribute('data-sidebar-collapsed', 'true')
    expect(showSidebarButton.closest('header')).toBeNull()
    expect(showSidebarButton.closest('[data-manage-sidebar-rail]')).not.toBeNull()
    expect(screen.getByRole('button', { name: /new conversation/i })).toHaveAttribute('data-active', 'false')
    expect(screen.getByRole('button', { name: 'Charts' })).toHaveAttribute('data-active', 'true')
    fireEvent.click(showSidebarButton)

    expect(screen.getByRole('button', { name: /hide sidebar/i }).closest('aside')).toHaveAttribute(
      'data-sidebar-collapsed',
      'false',
    )
    expect(screen.getByRole('button', { name: /new conversation/i })).toBeInTheDocument()
  })

  test('resizes the sidebar, persists width, and resets width on separator double click', () => {
    render(
      <ManageLayoutPage>
        <div>Workspace</div>
      </ManageLayoutPage>,
    )

    const separator = screen.getByRole('separator', { name: /resize sidebar/i })
    const sidebar = screen.getByRole('button', { name: /hide sidebar/i }).closest('aside')
    expect(sidebar).toHaveStyle('--manage-sidebar-width: 300px')

    fireEvent.pointerDown(separator, { clientX: 300 })
    fireEvent.pointerMove(document, { clientX: 360 })
    fireEvent.pointerUp(document)

    expect(sidebar).toHaveStyle('--manage-sidebar-width: 360px')
    expect(window.localStorage.getItem(manageSidebarWidthStorageKey)).toBe('360')

    fireEvent.doubleClick(separator)
    expect(window.localStorage.getItem(manageSidebarWidthStorageKey)).toBe('300')
  })

  test('keeps the running conversation indicator on the row action side', () => {
    useAgentConversationsStore.getState().upsertConversation(conversationMetadata, 'running')

    render(
      <ManageLayoutPage>
        <div>Workspace</div>
      </ManageLayoutPage>,
    )

    const conversation = screen.getByRole('button', { name: /^Revenue follow-up$/i })
    const runningStatus = screen.getByRole('status', { name: /running/i })

    expect(conversation.querySelector('svg')).toBeNull()
    expect(conversation.compareDocumentPosition(runningStatus) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(screen.queryByText(/\d+m|\d+h|\d+d/)).not.toBeInTheDocument()
  })

  test('opens a conversation from another route and switches to the agent conversation route', () => {
    const navigatedTo: string[] = []
    useNavigationStore.setState({ pathname: '/manage/chart' })
    useNavigationStore.getState().setNavigate((path) => navigatedTo.push(path))
    useAgentConversationsStore.getState().upsertConversation(conversationMetadata, 'completed')

    render(
      <ManageLayoutPage>
        <div>Workspace</div>
      </ManageLayoutPage>,
    )

    fireEvent.click(screen.getByRole('button', { name: /^Revenue follow-up$/i }))
    expect(navigatedTo).toEqual(['/agent/conversation-1'])
    expect(useAgentConversationsStore.getState().activeConversationId).toBe('conversation-1')
  })

  test('renames conversations in a modal and deletes them from a confirmation popover', async () => {
    useAgentConversationsStore.getState().upsertConversation(conversationMetadata, 'completed')

    render(
      <ManageLayoutPage>
        <div>Workspace</div>
      </ManageLayoutPage>,
    )

    fireEvent.click(screen.getByRole('button', { name: /rename revenue follow-up/i }))
    expect(screen.getByRole('dialog', { name: /rename conversation/i })).toBeInTheDocument()

    const input = screen.getByRole('textbox', { name: /conversation title/i })
    fireEvent.change(input, { target: { value: 'Renamed analysis' } })
    fireEvent.click(screen.getByRole('button', { name: /^save$/i }))

    expect(await screen.findByRole('button', { name: /^Renamed analysis$/i })).toBeInTheDocument()

    const deleteButton = screen.getByRole('button', { name: /delete renamed analysis/i })
    expect(
      screen.getByRole('button', { name: /rename renamed analysis/i }).closest('[data-tooltip-side]'),
    ).toHaveAttribute('data-tooltip-side', 'right')
    expect(deleteButton.closest('[data-tooltip-side]')).toHaveAttribute('data-tooltip-side', 'right')

    fireEvent.click(deleteButton)
    expect(screen.getByText(/delete conversation/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^Renamed analysis$/i })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /^delete$/i }))

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /^Renamed analysis$/i })).not.toBeInTheDocument()
    })
  })
})
