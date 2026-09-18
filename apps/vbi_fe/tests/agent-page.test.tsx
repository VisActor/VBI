import { afterEach, beforeEach, describe, expect, rs, test } from '@rstest/core'
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'

type ConversationMetadata = {
  createdAt: string
  id: string
  lastModified: string
  messageCount: number
  preview: string
  thinkingLevel: 'high'
  title: string
  usage: {
    cacheRead: number
    cacheWrite: number
    cost: { cacheRead: number; cacheWrite: number; input: number; output: number; total: number }
    input: number
    output: number
    totalTokens: number
  }
}

type RuntimeSnapshot = {
  isRunning: boolean
  messages: unknown[]
  modelId: 'deepseek-v4-flash' | 'deepseek-v4-pro'
  thinkingLevel: 'high' | 'xhigh'
  usageText: string
}

type Runtime = {
  cancel: ReturnType<typeof rs.fn>
  conversationId: string
  destroy: ReturnType<typeof rs.fn>
  emitSnapshot: (next?: Partial<RuntimeSnapshot>) => void
  getSnapshot: ReturnType<typeof rs.fn>
  persist: ReturnType<typeof rs.fn>
  send: ReturnType<typeof rs.fn>
  setModel: ReturnType<typeof rs.fn>
  setThinkingLevel: ReturnType<typeof rs.fn>
  setTitle: ReturnType<typeof rs.fn>
  subscribe: ReturnType<typeof rs.fn>
}

const emptyUsage = {
  cacheRead: 0,
  cacheWrite: 0,
  cost: { cacheRead: 0, cacheWrite: 0, input: 0, output: 0, total: 0 },
  input: 0,
  output: 0,
  totalTokens: 0,
}

let metadataList: ConversationMetadata[] = []
let persistCounter = 5
let resizeObserverObservedTargets: Element[] = []
let storageGate: Promise<void> | null = null

const createMetadata = (id: string, lastModified: string): ConversationMetadata => ({
  id,
  title: `Conversation ${id}`,
  createdAt: '2026-05-26T01:00:00.000Z',
  lastModified,
  messageCount: 1,
  preview: `Preview ${id}`,
  thinkingLevel: 'high',
  usage: emptyUsage,
})

const createDeferred = <T,>() => {
  let resolve!: (value: T) => void
  const promise = new Promise<T>((next) => {
    resolve = next
  })
  return { promise, resolve }
}

const setupVbiAgentIndexedDBStorage = rs.fn(async () => {
  if (storageGate) await storageGate

  return {
    conversations: {
      getAllMetadata: rs.fn(async () => metadataList),
    },
  }
})

const randomUUID = rs.fn(() => 'conversation-new')
const readAgentContentText = (content: unknown) => {
  if (typeof content === 'string') return content
  if (!Array.isArray(content)) return ''
  return content
    .map((part) => (typeof part === 'object' && part && 'text' in part ? String(part.text) : ''))
    .filter(Boolean)
    .join(' ')
}

const pendingRuntimes = new Map<string, ReturnType<typeof createDeferred<Runtime>>>()
const createRuntime = (
  conversationId: string,
  options: { isRunning?: boolean; messages?: unknown[] } = {},
): Runtime => {
  const snapshot: RuntimeSnapshot = {
    isRunning: options.isRunning ?? false,
    messages: options.messages ?? [
      {
        role: 'user',
        content: [{ type: 'text', text: `panel:${conversationId}` }],
        timestamp: 1,
      },
    ],
    modelId: 'deepseek-v4-flash',
    thinkingLevel: 'high',
    usageText: '0 / 1K · 0%',
  }
  const listeners = new Set<(value: RuntimeSnapshot) => void>()

  return {
    cancel: rs.fn(async () => {
      snapshot.isRunning = false
      listeners.forEach((listener) => listener({ ...snapshot }))
    }),
    conversationId,
    destroy: rs.fn(),
    emitSnapshot: (next = {}) => {
      Object.assign(snapshot, next)
      listeners.forEach((listener) => listener({ ...snapshot }))
    },
    getSnapshot: rs.fn(() => snapshot),
    persist: rs.fn(async (options?: { touch?: boolean }) => {
      const lastModified =
        options?.touch === false
          ? conversationId === 'conversation-b'
            ? '2026-05-26T01:01:00.000Z'
            : '2026-05-26T01:00:00.000Z'
          : `2026-05-26T01:${String(persistCounter++).padStart(2, '0')}:00.000Z`
      return createMetadata(conversationId, lastModified)
    }),
    send: rs.fn(),
    setModel: rs.fn(async (modelId: RuntimeSnapshot['modelId']) => {
      snapshot.modelId = modelId
    }),
    setThinkingLevel: rs.fn(async (thinkingLevel: RuntimeSnapshot['thinkingLevel']) => {
      snapshot.thinkingLevel = thinkingLevel
    }),
    setTitle: rs.fn(),
    subscribe: rs.fn((listener: (value: RuntimeSnapshot) => void) => {
      listeners.add(listener)
      listener(snapshot)
      return rs.fn(() => listeners.delete(listener))
    }),
  }
}

const createAgentConversationRuntime = rs.fn(({ conversationId }: { conversationId: string }) => {
  const deferred = createDeferred<Runtime>()
  pendingRuntimes.set(conversationId, deferred)
  return deferred.promise
})

rs.mock('../src/application/agent/agent-storage', () => ({
  readAgentContentText,
  setupVbiAgentIndexedDBStorage,
}))

rs.mock('../src/application/agent/agent-runtime', () => ({
  createAgentConversationRuntime,
}))

const { useAppPreferencesStore } = await import('./application-test-stores')
const { useAgentConversationsStore } = await import('./application-test-stores')
const { useNavigationStore } = await import('./application-test-stores')
const { AgentPage } = await import('../src/views/agent/AgentPage')

describe('AgentPage', () => {
  beforeEach(() => {
    rs.clearAllMocks()
    resizeObserverObservedTargets = []
    Object.defineProperty(globalThis, 'crypto', {
      configurable: true,
      value: { ...globalThis.crypto, randomUUID },
    })
    Object.defineProperty(globalThis, 'ResizeObserver', {
      configurable: true,
      value: class ResizeObserver {
        disconnect() {}
        observe(target: Element) {
          resizeObserverObservedTargets.push(target)
        }
        unobserve() {}
      },
    })
    Element.prototype.scrollTo = rs.fn()
    window.localStorage.clear()
    pendingRuntimes.clear()
    persistCounter = 5
    storageGate = null
    metadataList = [
      createMetadata('conversation-a', '2026-05-26T01:00:00.000Z'),
      createMetadata('conversation-b', '2026-05-26T01:01:00.000Z'),
    ]
    useAppPreferencesStore.setState({ locale: 'en-US', themeMode: 'slate' })
    useAgentConversationsStore.setState({
      activeConversationId: '',
      conversations: [],
      handledNewConversationRequestSeq: 0,
      isInitialized: false,
      isLoading: false,
      newConversationRequestSeq: 0,
    })
    useNavigationStore.setState({
      navigate: null,
      pathname: '/agent/conversation-b',
    })
  })

  afterEach(() => {
    cleanup()
  })

  test('keeps the latest selected conversation visible when an older activation resolves later', async () => {
    render(<AgentPage />)

    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({ conversationId: 'conversation-b' }),
      ),
    )

    await act(async () => {
      useNavigationStore.setState({ pathname: '/agent/conversation-a' })
    })

    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({ conversationId: 'conversation-a' }),
      ),
    )

    await act(async () => {
      pendingRuntimes.get('conversation-a')?.resolve(createRuntime('conversation-a'))
    })
    await waitFor(() => expect(screen.getByText('panel:conversation-a')).toBeTruthy())

    await act(async () => {
      pendingRuntimes.get('conversation-b')?.resolve(createRuntime('conversation-b'))
    })

    await waitFor(() => expect(screen.getByText('panel:conversation-a')).toBeTruthy())
    expect(screen.queryByText('panel:conversation-b')).toBeNull()
    expect(useAgentConversationsStore.getState().activeConversationId).toBe('conversation-a')
  })

  test('shows a centered welcome composer when no conversation has content yet', async () => {
    metadataList = []
    useNavigationStore.setState({ pathname: '/agent' })

    render(<AgentPage />)

    expect(await screen.findByRole('heading', { name: /what should we do/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /flash.*high/i })).toBeInTheDocument()
    expect(screen.queryByText(/deepseek-v3\.1|volcengine/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/chart and insight resources/i)).not.toBeInTheDocument()
    const composerInput = screen.getByRole('textbox')
    expect(composerInput).toHaveAttribute('rows', '2')
    const composerDock = composerInput.closest('.vbi-agent-composer-dock')
    const viewport = document.querySelector('.vbi-agent-thread-viewport')
    const transcript = document.querySelector('.vbi-agent-thread-transcript')
    expect(composerDock).toBeTruthy()
    expect(transcript).toBeTruthy()
    expect(viewport).toBeTruthy()
    expect(composerDock?.parentElement).toBe(transcript?.parentElement)
    expect(composerInput.closest('.vbi-agent-thread-viewport')).toBeNull()
    expect(viewport?.compareDocumentPosition(composerDock!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(document.querySelector('.vbi-agent-thread-scroll-spacer')).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText(/attach an image/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /attach image/i })).toBeInTheDocument()
  })

  test('uses concise Chinese reasoning labels in the chat composer', async () => {
    metadataList = []
    useAppPreferencesStore.setState({ locale: 'zh-CN', themeMode: 'slate' })
    useNavigationStore.setState({ pathname: '/agent' })

    render(<AgentPage />)

    expect(await screen.findByRole('heading', { name: '我们该做什么？' })).toBeInTheDocument()
    const configButton = screen.getByRole('button', { name: 'Flash，高' })
    expect(configButton).toHaveTextContent('Flash，高')
    expect(screen.queryByText('智能 高')).not.toBeInTheDocument()

    fireEvent.pointerDown(configButton)

    expect(await screen.findByText('推理强度')).toBeInTheDocument()
    expect(screen.queryByText('智能')).not.toBeInTheDocument()
  })

  test('keeps the root composer mounted while agent bootstrap is pending', async () => {
    metadataList = []
    const gate = createDeferred<void>()
    storageGate = gate.promise
    useNavigationStore.setState({ pathname: '/agent' })

    render(<AgentPage />)

    const composerInput = await screen.findByRole('textbox', { name: /agent/i })
    const composerDock = composerInput.closest('.vbi-agent-composer-dock')
    expect(composerDock).toBeTruthy()
    expect(screen.queryByText('Connecting agent...')).not.toBeInTheDocument()

    await act(async () => {
      gate.resolve(undefined)
      await gate.promise
    })

    await waitFor(() => expect(setupVbiAgentIndexedDBStorage).toHaveBeenCalled())
    const nextComposerInput = screen.getByRole('textbox', { name: /agent/i })
    expect(nextComposerInput).toBe(composerInput)
    expect(nextComposerInput.closest('.vbi-agent-composer-dock')).toBe(composerDock)
    expect(screen.queryByText('Connecting agent...')).not.toBeInTheDocument()
  })

  test('keeps the new conversation route as a draft until the first message is sent', async () => {
    metadataList = []
    const navigatedTo: string[] = []
    useNavigationStore.setState({ pathname: '/agent' })
    useNavigationStore.getState().setNavigate((path) => {
      navigatedTo.push(path)
      useNavigationStore.setState({ pathname: path })
    })

    render(<AgentPage />)

    expect(await screen.findByRole('heading', { name: /what should we do/i })).toBeInTheDocument()
    expect(createAgentConversationRuntime).not.toHaveBeenCalled()

    const composerInput = screen.getByRole('textbox', { name: /agent/i })
    fireEvent.change(composerInput, {
      target: { value: '当前洞察资源列表' },
    })
    fireEvent.click(screen.getByRole('button', { name: /^send$/i }))
    composerInput.focus()
    const composerDock = composerInput.closest('.vbi-agent-composer-dock')
    expect(composerInput).toHaveFocus()

    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({
          conversationId: 'conversation-new',
          fallbackTitle: '当前洞察资源列表',
        }),
      ),
    )
    expect(screen.queryByText('Connecting agent...')).not.toBeInTheDocument()

    const runtime = createRuntime('conversation-new', { messages: [] })
    await act(async () => {
      pendingRuntimes.get('conversation-new')?.resolve(runtime)
    })

    await waitFor(() => expect(runtime.send).toHaveBeenCalledWith('当前洞察资源列表'))
    expect(runtime.destroy).not.toHaveBeenCalled()
    expect(screen.getByRole('textbox')).toBe(composerInput)
    expect(screen.getByRole('textbox').closest('.vbi-agent-composer-dock')).toBe(composerDock)
    expect(composerInput).toHaveFocus()
    expect(navigatedTo).toEqual([])
    expect(useAgentConversationsStore.getState().activeConversationId).toBe('conversation-new')
  })

  test('applies selected DeepSeek model and thinking depth to the first draft message', async () => {
    metadataList = []
    const navigatedTo: string[] = []
    useNavigationStore.setState({ pathname: '/agent' })
    useNavigationStore.getState().setNavigate((path) => {
      navigatedTo.push(path)
      useNavigationStore.setState({ pathname: path })
    })

    render(<AgentPage />)

    expect(await screen.findByRole('heading', { name: /what should we do/i })).toBeInTheDocument()

    fireEvent.pointerDown(screen.getByRole('button', { name: /flash.*high/i }))
    fireEvent.click(await screen.findByRole('menuitem', { name: /pro/i }))
    fireEvent.pointerDown(screen.getByRole('button', { name: /pro.*high/i }))
    fireEvent.click(await screen.findByRole('menuitem', { name: /max/i }))
    fireEvent.change(screen.getByRole('textbox', { name: /agent/i }), {
      target: { value: 'Build a sales chart' },
    })
    fireEvent.click(screen.getByRole('button', { name: /^send$/i }))

    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({
          conversationId: 'conversation-new',
          modelId: 'deepseek-v4-pro',
          thinkingLevel: 'xhigh',
        }),
      ),
    )

    const runtime = createRuntime('conversation-new', { messages: [] })
    await act(async () => {
      pendingRuntimes.get('conversation-new')?.resolve(runtime)
    })

    await waitFor(() => expect(runtime.send).toHaveBeenCalledWith('Build a sales chart'))
    expect(navigatedTo).toEqual([])
  })

  test('opens slash commands for model switching', async () => {
    metadataList = [createMetadata('conversation-commands', '2026-05-26T01:00:00.000Z')]
    useNavigationStore.setState({ pathname: '/agent/conversation-commands' })

    render(<AgentPage />)

    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({ conversationId: 'conversation-commands' }),
      ),
    )
    const runtime = createRuntime('conversation-commands')
    await act(async () => {
      pendingRuntimes.get('conversation-commands')?.resolve(runtime)
    })

    const composerInput = await screen.findByRole('textbox', { name: /agent/i })
    fireEvent.change(composerInput, { target: { value: '/' } })

    expect(await screen.findByRole('option', { name: /\/pro/i })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('option', { name: /\/pro/i }))
    expect(runtime.setModel).toHaveBeenCalledWith('deepseek-v4-pro')
    await waitFor(() => expect(composerInput).toHaveValue(''))

    fireEvent.change(composerInput, { target: { value: '/' } })
    expect(await screen.findByRole('option', { name: /\/flash/i })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('option', { name: /\/flash/i }))
    expect(runtime.setModel).toHaveBeenCalledWith('deepseek-v4-flash')
    await waitFor(() => expect(composerInput).toHaveValue(''))
  })

  test('uses one composer action slot for sending and stopping', async () => {
    metadataList = [createMetadata('conversation-running', '2026-05-26T01:00:00.000Z')]
    useNavigationStore.setState({ pathname: '/agent/conversation-running' })

    render(<AgentPage />)

    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({ conversationId: 'conversation-running' }),
      ),
    )
    const runtime = createRuntime('conversation-running', { isRunning: true })
    await act(async () => {
      pendingRuntimes.get('conversation-running')?.resolve(runtime)
    })

    await waitFor(() => expect(screen.getByRole('button', { name: /^stop$/i })).toBeInTheDocument())
    expect(screen.queryByRole('button', { name: /^send$/i })).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /^stop$/i }))

    await waitFor(() => expect(runtime.cancel).toHaveBeenCalledTimes(1))
    await waitFor(() => expect(screen.getByRole('button', { name: /^send$/i })).toBeInTheDocument())
  })

  test('shows failed assistant messages without a pending spinner', async () => {
    metadataList = [createMetadata('conversation-error', '2026-05-26T01:00:00.000Z')]
    useNavigationStore.setState({ pathname: '/agent/conversation-error' })

    render(<AgentPage />)

    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({ conversationId: 'conversation-error' }),
      ),
    )
    await act(async () => {
      pendingRuntimes.get('conversation-error')?.resolve(
        createRuntime('conversation-error', {
          isRunning: true,
          messages: [
            {
              role: 'assistant',
              content: [],
              errorMessage: 'Proxy error: fetch failed',
              timestamp: 10_000,
            },
          ],
        }),
      )
    })

    const errorText = await screen.findByText('Proxy error: fetch failed')
    const messageRoot = errorText.closest('.vbi-agent-message')
    expect(messageRoot).toBeTruthy()
    expect(messageRoot?.querySelector('.vbi-agent-message-pending')).toBeNull()
    expect(messageRoot?.querySelector('.animate-spin')).toBeNull()
  })

  test('renders very large user messages as abbreviated previews', async () => {
    metadataList = [createMetadata('conversation-large', '2026-05-26T01:00:00.000Z')]
    useNavigationStore.setState({ pathname: '/agent/conversation-large' })
    const largeText = `${'a'.repeat(25_000)} tail-marker`

    render(<AgentPage />)

    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({ conversationId: 'conversation-large' }),
      ),
    )
    await act(async () => {
      pendingRuntimes.get('conversation-large')?.resolve(
        createRuntime('conversation-large', {
          messages: [{ role: 'user', content: [{ type: 'text', text: largeText }], timestamp: 1 }],
        }),
      )
    })

    expect(await screen.findByText(/25K chars/)).toBeInTheDocument()
    expect(screen.queryByText(/tail-marker/)).not.toBeInTheDocument()
  })

  test('shows user message copy and sent time only on hover', async () => {
    metadataList = [createMetadata('conversation-user-actions', '2026-05-26T01:00:00.000Z')]
    useAppPreferencesStore.setState({ locale: 'zh-CN' })
    useNavigationStore.setState({ pathname: '/agent/conversation-user-actions' })

    render(<AgentPage />)

    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({ conversationId: 'conversation-user-actions' }),
      ),
    )
    await act(async () => {
      pendingRuntimes.get('conversation-user-actions')?.resolve(createRuntime('conversation-user-actions'))
    })

    const userMessage = await screen.findByText('panel:conversation-user-actions')
    const messageRoot = userMessage.closest('.vbi-agent-message')
    expect(messageRoot).toBeTruthy()
    expect(messageRoot?.querySelector('.vbi-agent-message-action-slot')).toBeTruthy()
    expect(screen.queryByRole('button', { name: /复制消息/ })).not.toBeInTheDocument()

    fireEvent.mouseEnter(messageRoot!)

    const copyMessageButton = await screen.findByRole('button', { name: /复制消息/ })
    expect(copyMessageButton).toBeInTheDocument()
    expect(copyMessageButton.textContent).toBe('')
    expect(copyMessageButton.querySelector('[data-slot="copy-icon"]')).toBeTruthy()
    expect(copyMessageButton.querySelector('[data-slot="copied-icon"]')).toBeTruthy()
    expect(screen.getByLabelText(/\d{2}:\d{2} 发送/)).toBeInTheDocument()

    const writeText = rs.fn(async () => undefined)
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    })
    fireEvent.click(copyMessageButton)

    await waitFor(() => expect(copyMessageButton).toHaveAttribute('data-copied', 'true'))
    expect(writeText).toHaveBeenCalledWith('panel:conversation-user-actions')
  })

  test('groups resource tool calls and keeps technical tool result logs out of the transcript', async () => {
    metadataList = [createMetadata('conversation-tools', '2026-05-26T01:00:00.000Z')]
    useAppPreferencesStore.setState({ locale: 'zh-CN' })
    useNavigationStore.setState({ pathname: '/agent/conversation-tools' })
    const resourceToolMessages = [
      {
        role: 'user',
        content: [{ type: 'text', text: '当前有多少数据资源?' }],
        timestamp: 0,
      },
      {
        role: 'assistant',
        content: [
          { type: 'text', text: '我来查看一下当前的数据资源数量。' },
          { type: 'thinking', thinking: '先查询图表资源。' },
          {
            type: 'toolCall',
            id: 'tool-chart',
            name: 'vbi_resource',
            arguments: { action: 'list', resource: 'chart' },
          },
          { type: 'thinking', thinking: '继续查询洞察资源。' },
          {
            type: 'toolCall',
            id: 'tool-insight',
            name: 'vbi_resource',
            arguments: { action: 'list', resource: 'insight' },
          },
          { type: 'reasoning', reasoning: '最后查看图表详情。' },
          {
            type: 'toolCall',
            id: 'tool-chart-detail',
            name: 'vbi_resource',
            arguments: { action: 'get', resource: 'chart', id: 'chart-1' },
          },
        ],
        timestamp: 10_000,
      },
      {
        role: 'toolResult',
        toolCallId: 'tool-chart',
        toolName: 'vbi_resource',
        content: [{ type: 'text', text: '{"items":[{"name":"我的折线图"}]}' }],
        details: {
          display: '{"items":[{"name":"我的折线图"}]}',
          summary: 'vbi_resource chart.list completed',
        },
        timestamp: 40_000,
      },
      {
        role: 'toolResult',
        toolCallId: 'tool-insight',
        toolName: 'vbi_resource',
        content: [{ type: 'text', text: '{"items":[{"name":"关于公式"}]}' }],
        details: {
          display: '{"items":[{"name":"关于公式"}]}',
          summary: 'vbi_resource insight.list completed',
        },
        timestamp: 70_000,
      },
      {
        role: 'toolResult',
        toolCallId: 'tool-chart-detail',
        toolName: 'vbi_resource',
        content: [{ type: 'text', text: '{"items":[]}' }],
        details: {
          display: '{"items":[]}',
          summary: 'vbi_resource chart.get completed',
        },
        timestamp: 100_000,
      },
      {
        role: 'assistant',
        content: [
          {
            type: 'text',
            text: '当前共有 **2 个数据资源**：\n\n类型\t名称\t创建时间\n图表\t我的折线图\t2026-05-26\n洞察\t关于公式\t2026-05-26',
          },
        ],
        timestamp: 120_000,
      },
    ]

    render(<AgentPage />)

    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({ conversationId: 'conversation-tools' }),
      ),
    )
    await act(async () => {
      pendingRuntimes
        .get('conversation-tools')
        ?.resolve(createRuntime('conversation-tools', { messages: resourceToolMessages }))
    })

    expect(await screen.findByRole('table')).toBeInTheDocument()
    const progressGroup = document.querySelector('.vbi-agent-progress-group')
    expect(progressGroup).toBeTruthy()
    expect(progressGroup).toHaveAttribute('data-state', 'closed')
    expect(screen.getByText('我来查看一下当前的数据资源数量。')).toBeInTheDocument()
    expect(screen.queryByText('Actions')).not.toBeInTheDocument()

    fireEvent.click(progressGroup!.querySelector('summary')!)

    expect(await screen.findByText('推理过程')).toBeInTheDocument()
    expect(screen.getByText('先查询图表资源。')).toBeInTheDocument()
    expect(screen.getByText('继续查询洞察资源。')).toBeInTheDocument()
    expect(screen.getByText('最后查看图表详情。')).toBeInTheDocument()
    expect(screen.getByText('6 步')).toBeInTheDocument()

    expect(screen.getByText('chart.list')).toBeInTheDocument()
    expect(screen.getByText('insight.list')).toBeInTheDocument()
    expect(screen.getByText('chart.get')).toBeInTheDocument()
    expect(progressGroup?.querySelectorAll('.vbi-agent-tool-order')).toHaveLength(6)
    expect(screen.queryByText('vbi_resource chart.list completed')).not.toBeInTheDocument()
    expect(screen.queryByText('vbi_resource insight.list completed')).not.toBeInTheDocument()
    expect(screen.queryByText('vbi_resource chart.get completed')).not.toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: '类型' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /复制回复/ })).toHaveLength(1)
    expect(screen.getByRole('button', { name: /复制回复/ }).textContent).toBe('')
    expect(screen.getByLabelText(/\d{2}:\d{2} 完成/)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /message timing/i })).not.toBeInTheDocument()

    expect(screen.getAllByRole('button', { name: /复制回复/ })).toHaveLength(1)
  })

  test('opens reasoning while running and auto-collapses after completion', async () => {
    metadataList = [createMetadata('conversation-thinking', '2026-05-26T01:00:00.000Z')]
    useNavigationStore.setState({ pathname: '/agent/conversation-thinking' })

    render(<AgentPage />)

    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({ conversationId: 'conversation-thinking' }),
      ),
    )
    const streamingRuntime = createRuntime('conversation-thinking', {
      isRunning: true,
      messages: [
        {
          role: 'assistant',
          content: [{ type: 'thinking', thinking: 'I am checking the chart resources.' }],
          timestamp: 10_000,
        },
      ],
    })
    await act(async () => {
      pendingRuntimes.get('conversation-thinking')?.resolve(streamingRuntime)
    })

    const runningReasoning = await screen.findByText('I am checking the chart resources.')
    const runningDetails = runningReasoning.closest('.vbi-agent-progress-group')
    expect(runningDetails).toHaveAttribute('data-state', 'open')
    expect(runningDetails?.querySelector('.animate-spin')).toBeTruthy()
    expect(screen.getByText('Reasoning')).toBeInTheDocument()
    expect(screen.queryByText('Thinking steps')).not.toBeInTheDocument()

    await act(async () => {
      streamingRuntime.emitSnapshot({ isRunning: false })
    })

    expect(runningDetails).toHaveAttribute('data-state', 'closed')
    expect(runningDetails?.querySelector('.animate-spin')).toBeNull()
    expect(screen.queryByText('I am checking the chart resources.')).not.toBeInTheDocument()

    await act(async () => {
      useNavigationStore.setState({ pathname: '/agent/conversation-tools' })
    })
    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({ conversationId: 'conversation-tools' }),
      ),
    )
    await act(async () => {
      pendingRuntimes.get('conversation-tools')?.resolve(
        createRuntime('conversation-tools', {
          messages: [
            {
              role: 'assistant',
              content: [{ type: 'thinking', thinking: 'I found the chart resources.' }],
              timestamp: 20_000,
            },
          ],
        }),
      )
    })

    expect(screen.queryByText('I found the chart resources.')).not.toBeInTheDocument()
    const completedDetails = screen.getByText('Reasoning').closest('.vbi-agent-progress-group')
    expect(completedDetails).toHaveAttribute('data-state', 'closed')

    fireEvent.click(completedDetails!.querySelector('summary')!)
    expect(completedDetails).toHaveAttribute('data-state', 'open')
    expect(screen.getByText('I found the chart resources.')).toBeInTheDocument()
  })

  test('keeps long streaming conversations responsive by rendering one final action bar', async () => {
    metadataList = [createMetadata('conversation-long', '2026-05-26T01:00:00.000Z')]
    useAppPreferencesStore.setState({ locale: 'zh-CN' })
    useNavigationStore.setState({ pathname: '/agent/conversation-long' })
    const completedTurns = Array.from({ length: 10 }, (_, index) => [
      {
        role: 'user',
        content: [{ type: 'text', text: `question ${index + 1}` }],
        timestamp: index * 2 + 1,
      },
      {
        role: 'assistant',
        content: [{ type: 'text', text: `answer ${index + 1}` }],
        timestamp: index * 2 + 2,
      },
    ]).flat()
    const runtime = createRuntime('conversation-long', { messages: completedTurns })

    render(<AgentPage />)

    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({ conversationId: 'conversation-long' }),
      ),
    )
    await act(async () => {
      pendingRuntimes.get('conversation-long')?.resolve(runtime)
    })

    expect(await screen.findByText('answer 10')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /复制回复/ })).toHaveLength(1)
    const composerInput = screen.getByRole('textbox')
    composerInput.focus()
    const composerDock = composerInput.closest('.vbi-agent-composer-dock')

    await act(async () => {
      runtime.emitSnapshot({
        isRunning: true,
        messages: [
          ...completedTurns,
          {
            role: 'user',
            content: [{ type: 'text', text: 'question 11' }],
            timestamp: 21,
          },
          {
            role: 'assistant',
            content: [{ type: 'text', text: 'streaming answer 11' }],
            timestamp: 22,
          },
        ],
      })
    })

    expect(await screen.findByText('streaming answer 11')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /复制回复/ })).toHaveLength(1)
    expect(screen.getByRole('textbox')).toBe(composerInput)
    expect(screen.getByRole('textbox').closest('.vbi-agent-composer-dock')).toBe(composerDock)
    expect(composerInput).toHaveFocus()
  })

  test('keeps the composer mounted when only the conversation sidebar state changes', async () => {
    metadataList = []
    useNavigationStore.setState({ pathname: '/agent' })

    render(<AgentPage />)

    const composerInput = await screen.findByRole('textbox', { name: /agent/i })
    composerInput.focus()
    const composerDock = composerInput.closest('.vbi-agent-composer-dock')

    await act(async () => {
      useAgentConversationsStore
        .getState()
        .upsertConversation(createMetadata('conversation-sidebar', '2026-05-26T01:03:00.000Z'), 'running')
    })

    expect(screen.getByRole('textbox', { name: /agent/i })).toBe(composerInput)
    expect(screen.getByRole('textbox', { name: /agent/i }).closest('.vbi-agent-composer-dock')).toBe(composerDock)
    expect(composerInput).toHaveFocus()
  })

  test('keeps streaming transcript and composer in separate layout regions', async () => {
    metadataList = [createMetadata('conversation-scroll', '2026-05-26T01:00:00.000Z')]
    useNavigationStore.setState({ pathname: '/agent/conversation-scroll' })
    const runtime = createRuntime('conversation-scroll', {
      isRunning: true,
      messages: [
        { role: 'user', content: [{ type: 'text', text: 'older prompt' }], timestamp: 1 },
        { role: 'assistant', content: [{ type: 'text', text: 'older response' }], timestamp: 2 },
        { role: 'user', content: [{ type: 'text', text: 'new prompt' }], timestamp: 3 },
        { role: 'assistant', content: [{ type: 'text', text: 'running response' }], timestamp: 4 },
      ],
    })

    render(<AgentPage />)

    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({ conversationId: 'conversation-scroll' }),
      ),
    )
    await act(async () => {
      pendingRuntimes.get('conversation-scroll')?.resolve(runtime)
    })

    await screen.findByText('running response')
    const viewport = document.querySelector('.vbi-agent-thread-viewport')
    const composerDock = screen.getByRole('textbox', { name: /agent/i }).closest('.vbi-agent-composer-dock')
    const runningMessage = screen.getByText('running response').closest('.vbi-agent-message')
    expect(viewport).toBeTruthy()
    expect(composerDock).toBeTruthy()
    expect(runningMessage).toBeTruthy()
    expect(composerDock?.parentElement).toBe(viewport?.parentElement?.parentElement)
    expect(composerDock?.contains(viewport)).toBe(false)
    expect(viewport?.contains(composerDock)).toBe(false)
    expect(viewport?.contains(runningMessage)).toBe(true)
  })

  test('does not reorder conversations just because the user switches between them', async () => {
    render(<AgentPage />)

    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({ conversationId: 'conversation-b' }),
      ),
    )
    await act(async () => {
      pendingRuntimes.get('conversation-b')?.resolve(createRuntime('conversation-b'))
    })
    await waitFor(() => expect(screen.getByText('panel:conversation-b')).toBeTruthy())

    await act(async () => {
      useNavigationStore.setState({ pathname: '/agent/conversation-a' })
    })
    await waitFor(() =>
      expect(createAgentConversationRuntime).toHaveBeenCalledWith(
        expect.objectContaining({ conversationId: 'conversation-a' }),
      ),
    )
    await act(async () => {
      pendingRuntimes.get('conversation-a')?.resolve(createRuntime('conversation-a'))
    })
    await waitFor(() => expect(screen.getByText('panel:conversation-a')).toBeTruthy())

    await act(async () => {
      useNavigationStore.setState({ pathname: '/agent/conversation-b' })
    })
    await waitFor(() => expect(screen.getByText('panel:conversation-b')).toBeTruthy())

    expect(pendingRuntimes.get('conversation-a')).toBeDefined()
    expect(createAgentConversationRuntime).toHaveBeenCalledWith(
      expect.objectContaining({ conversationId: 'conversation-a' }),
    )

    expect(useAgentConversationsStore.getState().conversations.map((conversation) => conversation.id)).toEqual([
      'conversation-b',
      'conversation-a',
    ])
  })
})
