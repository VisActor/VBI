import os from 'node:os'
import path from 'node:path'
import { getModel } from '@earendil-works/pi-ai'
import {
  CombinedAutocompleteProvider,
  Editor,
  Key,
  Markdown,
  matchesKey,
  SelectList,
  truncateToWidth,
  visibleWidth,
  ProcessTerminal,
  TUI,
  type Component,
  type EditorTheme,
  type Focusable,
  type MarkdownTheme,
  type OverlayHandle,
  type SelectItem,
  type SelectListTheme,
  type SlashCommand,
} from '@earendil-works/pi-tui'
import { AgentTranscriptView, type AgentTranscriptItem } from '../pi-event-view.js'
import { estimateContextTokens, type Agent, type AgentMessage } from '@visactor/vbi-agent'

export interface AgentAppProps {
  agent: Agent
  task?: string
}

const ansi = (code: number) => `\x1b[${code}m`
const reset = ansi(0)
const style = (code: number) => (text: string) => `${ansi(code)}${text}${reset}`

const bold = style(1)
const dim = style(37)
const underline = style(4)
const cyan = style(36)
const green = style(32)
const yellow = style(33)
const red = style(31)
const magenta = style(35)
const gray = style(37)
const white = style(97)

const selectListTheme: SelectListTheme = {
  description: dim,
  noMatch: dim,
  scrollInfo: dim,
  selectedPrefix: cyan,
  selectedText: bold,
}

const editorTheme: EditorTheme = {
  borderColor: cyan,
  selectList: selectListTheme,
}

const markdownTheme: MarkdownTheme = {
  bold,
  code: yellow,
  codeBlock: (text) => text,
  codeBlockBorder: dim,
  heading: cyan,
  hr: dim,
  italic: dim,
  link: underline,
  linkUrl: dim,
  listBullet: cyan,
  quote: dim,
  quoteBorder: cyan,
  strikethrough: dim,
  underline,
}

const truncate = (line: string, width: number) => truncateToWidth(line, Math.max(1, width))

const pad = (line: string, width: number) => {
  const safeLine = truncate(line, width)
  return `${safeLine}${' '.repeat(Math.max(0, width - visibleWidth(safeLine)))}`
}

const toErrorMessage = (error: unknown) => (error instanceof Error ? error.message : String(error))

const activityStyle = (kind: AgentTranscriptItem['kind']) => {
  if (kind === 'user') return cyan
  if (kind === 'assistant') return green
  if (kind === 'tool') return magenta
  if (kind === 'error') return red
  return yellow
}

const statusStyle = (status?: AgentTranscriptItem['status']) => {
  if (status === 'failed') return red
  if (status === 'running') return yellow
  if (status === 'succeeded') return green
  return dim
}

const activityText = (item: AgentTranscriptItem) =>
  [item.text, item.detail ? `${dim('Details')}\n\n${item.detail}` : undefined].filter(Boolean).join('\n\n')

const renderMarkdown = (text: string, width: number) =>
  new Markdown(text, 2, 0, markdownTheme, { color: gray }).render(Math.max(1, width))

const renderUserActivity = (item: AgentTranscriptItem, width: number) => {
  const contentWidth = Math.max(1, width - 2)
  const lines = renderMarkdown(item.text, contentWidth)
  return lines.length
    ? lines.map((line, index) => pad(`${index === 0 ? gray('›') : ' '} ${line}`, width))
    : [pad(`${gray('›')} `, width)]
}

const toolPrefix = (item: AgentTranscriptItem) => {
  if (item.kind === 'error' || item.status === 'failed') return red('●')
  if (item.status === 'running') return yellow('○')
  if (item.status === 'succeeded') return green('✓')
  return magenta('●')
}

const renderLogActivity = (item: AgentTranscriptItem, width: number) => {
  const textWidth = Math.max(1, width - 2)
  if (item.kind === 'assistant') {
    const prefix = item.status === 'running' ? yellow('●') : gray('●')
    return renderMarkdown(activityText(item), textWidth).map((line, index) =>
      pad(`${index === 0 ? prefix : ' '} ${line}`, width),
    )
  }

  const repeatedStatus = item.status ? item.text.toLowerCase().endsWith(item.status) : false
  const status = item.status && !repeatedStatus ? ` ${statusStyle(item.status)(item.status)}` : ''
  const title = `${toolPrefix(item)} ${activityStyle(item.kind)(item.text)}${status}`
  if (!item.detail) return [pad(title, width)]
  return [
    pad(title, width),
    ...renderMarkdown(item.detail, Math.max(1, width - 4)).map((line) => pad(`  ${line}`, width)),
  ]
}

const renderActivity = (item: AgentTranscriptItem, width: number) => {
  if (width < 8) return renderMarkdown(activityText(item), width)
  if (item.kind === 'user') return renderUserActivity(item, width)
  return renderLogActivity(item, width)
}

type AgentModel = Agent['state']['model']

interface ModelOption {
  description: string
  id: string
  label: string
  aliases: string[]
}

const modelOptions: ModelOption[] = [
  {
    aliases: ['deepseek-flash', 'flash', 'deepseek-v4-flash'],
    description: 'fast default model',
    id: 'deepseek-v4-flash',
    label: 'DeepSeek V4 Flash',
  },
  {
    aliases: ['deepseek-pro', 'pro', 'deepseek-v4-pro'],
    description: 'stronger reasoning model',
    id: 'deepseek-v4-pro',
    label: 'DeepSeek V4 Pro',
  },
]

const modelCompletionItems = modelOptions.map((option) => ({
  description: option.description,
  label: option.aliases[0]!,
  value: option.aliases[0]!,
}))

const modelPickerItems: SelectItem[] = modelOptions.map((option) => ({
  description: option.description,
  label: option.label,
  value: option.aliases[0]!,
}))

const resolveModelOption = (value: string) => {
  const normalized = value.trim().toLowerCase()
  return modelOptions.find((option) => option.aliases.includes(normalized))
}

const createSelectedModel = (option: ModelOption, currentModel: AgentModel): AgentModel => {
  const model = getModel('deepseek' as never, option.id as never)
  if (!model) throw new Error(`Unsupported agent model: deepseek/${option.id}`)
  return currentModel.baseUrl ? ({ ...model, baseUrl: currentModel.baseUrl } as AgentModel) : (model as AgentModel)
}

const formatTokenCount = (tokens: number) => {
  if (tokens >= 1_000_000) return `${(tokens / 1_000_000).toFixed(1)}m`
  if (tokens >= 1000) return `${(tokens / 1000).toFixed(tokens >= 10_000 ? 0 : 1)}k`
  return String(tokens)
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const finiteNumber = (value: unknown) => (typeof value === 'number' && Number.isFinite(value) ? value : 0)

const usageTokenCount = (usage: unknown) => {
  if (!isRecord(usage)) return 0
  const totalTokens = finiteNumber(usage.totalTokens)
  if (totalTokens > 0) return totalTokens
  return (
    finiteNumber(usage.input) +
    finiteNumber(usage.output) +
    finiteNumber(usage.cacheRead) +
    finiteNumber(usage.cacheWrite)
  )
}

const ignoreZeroUsage = (message: AgentMessage): AgentMessage => {
  if (message.role !== 'assistant' || !('usage' in message) || usageTokenCount(message.usage) > 0) return message
  const sanitized = { ...message } as Record<string, unknown>
  delete sanitized.usage
  return sanitized as unknown as AgentMessage
}

const tokenUsageLabel = (agent: Agent) => {
  const messages = agent.state.streamingMessage
    ? [...agent.state.messages, agent.state.streamingMessage]
    : agent.state.messages
  const usage = estimateContextTokens(messages.map(ignoreZeroUsage))
  const contextWindow = agent.state.model.contextWindow || 0
  const source = usage.usageTokens > 0 ? 'reported + estimated' : 'estimated'
  const total = formatTokenCount(usage.tokens)
  if (!contextWindow) return `${white('tokens')} ${yellow(total)} ${dim(source)}`
  const percent = Math.min(999, Math.round((usage.tokens / contextWindow) * 100))
  return `${white('tokens')} ${yellow(total)} / ${formatTokenCount(contextWindow)} ${dim(`${percent}% · ${source}`)}`
}

const fillLines = (lines: string[], limit: number, align: 'bottom' | 'top') => {
  const safeLimit = Math.max(0, limit)
  const visible = lines.slice(0, safeLimit)
  const padding = Array.from({ length: Math.max(0, safeLimit - visible.length) }, () => '')
  return align === 'bottom' ? [...padding, ...visible] : [...visible, ...padding]
}

const modelLabel = (agent: Agent) => {
  const model = agent.state.model
  return model.name || model.id
}

const statusLabel = (agent: Agent) => {
  if (agent.state.errorMessage) return red('(error)')
  return agent.state.isStreaming ? yellow('(running)') : gray('(ready)')
}

const directoryLabel = () => {
  const cwd = process.cwd()
  const home = os.homedir()
  if (cwd === home) return '~'
  return cwd.startsWith(`${home}${path.sep}`) ? `~${cwd.slice(home.length)}` : cwd
}

const renderBoxLine = (content: string, boxWidth: number) => {
  const innerWidth = Math.max(1, boxWidth - 4)
  return `${gray('│')} ${pad(content, innerWidth)} ${gray('│')}`
}

const renderHeader = (agent: Agent, width: number) => {
  if (width < 8) return [pad(bold('VBI'), width)]

  const title = `${gray('>_')} ${bold(white('VBI Agent'))} ${statusLabel(agent)}`
  const model = `${dim('model:')}     ${white(modelLabel(agent))}   ${cyan('/model')} ${dim('to change')}`
  const directory = `${dim('directory:')} ${gray(directoryLabel())}`
  const longest = Math.max(visibleWidth(title), visibleWidth(model), visibleWidth(directory))
  const boxWidth = Math.min(width, Math.max(42, Math.min(72, longest + 4)))
  const top = `${gray('╭')}${gray('─'.repeat(Math.max(0, boxWidth - 2)))}${gray('╮')}`
  const bottom = `${gray('╰')}${gray('─'.repeat(Math.max(0, boxWidth - 2)))}${gray('╯')}`
  return [
    pad(top, width),
    pad(renderBoxLine(title, boxWidth), width),
    pad(renderBoxLine('', boxWidth), width),
    pad(renderBoxLine(model, boxWidth), width),
    pad(renderBoxLine(directory, boxWidth), width),
    pad(bottom, width),
  ]
}

const renderEmptyState = (width: number) => {
  if (width < 8) return [pad(dim('Ready.'), width)]
  return [
    '',
    pad(
      `${bold('Tip:')} Ask VBI Agent to list resources, inspect DSL, update Builder state, or answer directly.`,
      width,
    ),
    '',
    pad(`${gray('›')} ${dim('Try: list charts, inspect Chart1, or update an insight')}`, width),
  ]
}

const createSlashCommands = (): SlashCommand[] => [
  {
    argumentHint: 'deepseek-flash | deepseek-pro',
    description: 'open model selector or switch directly',
    getArgumentCompletions: (argumentPrefix) => {
      const normalized = argumentPrefix.trim().toLowerCase()
      return modelCompletionItems.filter(
        (item) => !normalized || item.value.includes(normalized) || item.label.includes(normalized),
      )
    },
    name: 'model',
  },
  {
    description: 'show available slash commands',
    name: 'help',
  },
  {
    description: 'show current token usage',
    name: 'tokens',
  },
  {
    description: 'clear transcript and reset agent context',
    name: 'clear',
  },
  {
    description: 'exit VBI Agent',
    name: 'exit',
  },
]

export class AgentApp implements Component, Focusable {
  private readonly editor: Editor
  private exited = false
  private modelPicker?: OverlayHandle
  private readonly view = new AgentTranscriptView()
  private readonly tui: TUI
  private readonly agent: Agent
  private readonly onExit: (code: number) => void
  private readonly unsubscribe: () => void

  constructor(tui: TUI, agent: Agent, onExit: (code: number) => void) {
    this.tui = tui
    this.agent = agent
    this.onExit = onExit
    this.editor = new Editor(tui, editorTheme, { autocompleteMaxVisible: 8, paddingX: 1 })
    this.editor.setAutocompleteProvider(new CombinedAutocompleteProvider(createSlashCommands(), process.cwd()))
    this.editor.onSubmit = (value) => void this.submit(value)
    this.unsubscribe = agent.subscribe((event) => {
      this.view.apply(event)
      this.tui.requestRender()
    })
  }

  static run({ agent, task }: AgentAppProps) {
    return new Promise<number>((resolve) => {
      const terminal = new ProcessTerminal()
      const tui = new TUI(terminal, true)
      const app = new AgentApp(tui, agent, (code) => {
        tui.stop()
        resolve(code)
      })
      tui.addChild(app)
      tui.setFocus(app)
      tui.addInputListener((data) => {
        if (matchesKey(data, Key.ctrl('c'))) {
          if (tui.hasOverlay()) return undefined
          app.exit()
          return { consume: true }
        }
        if (!tui.hasOverlay() && !app.isBusy() && !app.editor.getText().trim() && data === 'q') {
          app.exit()
          return { consume: true }
        }
        return undefined
      })
      tui.start()
      if (task) void app.submit(task)
    })
  }

  get focused() {
    return this.editor.focused
  }

  set focused(value: boolean) {
    this.editor.focused = value
  }

  isBusy() {
    return this.agent.state.isStreaming
  }

  exit() {
    if (this.exited) return
    this.exited = true
    this.unsubscribe()
    this.onExit(this.agent.state.errorMessage ? 1 : 0)
  }

  async submit(value: string) {
    const prompt = value.trim()
    if (!prompt || this.isBusy()) return
    if (prompt.startsWith('/')) {
      this.handleSlashCommand(prompt)
      return
    }
    this.editor.addToHistory(prompt)
    this.tui.requestRender()
    try {
      await this.agent.prompt(prompt)
    } catch (error) {
      this.view.items.push({ kind: 'error', text: toErrorMessage(error) })
    } finally {
      this.tui.requestRender()
    }
  }

  private handleSlashCommand(prompt: string) {
    const [command = '', ...rest] = prompt.slice(1).split(/\s+/)
    const argument = rest.join(' ').trim()
    this.editor.addToHistory(prompt)
    if (command === 'model') {
      this.handleModelCommand(argument)
      return
    }
    if (command === 'help') {
      this.showSlashHelp()
      return
    }
    if (command === 'tokens') {
      this.view.items.push({ kind: 'assistant', text: tokenUsageLabel(this.agent) })
      this.tui.requestRender()
      return
    }
    if (command === 'clear') {
      this.clearSession()
      return
    }
    if (command === 'exit' || command === 'quit') {
      this.exit()
      return
    }
    this.view.items.push({ kind: 'error', text: `Unknown command "${prompt}". Type / for available commands.` })
    this.tui.requestRender()
  }

  private showSlashHelp() {
    this.view.items.push({
      kind: 'assistant',
      text: [
        'Available commands:',
        '',
        '- `/model` open model selector',
        '- `/tokens` show current token usage',
        '- `/clear` clear transcript and reset agent context',
        '- `/exit` exit VBI Agent',
      ].join('\n'),
    })
    this.tui.requestRender()
  }

  private clearSession() {
    if (this.isBusy()) {
      this.view.items.push({ kind: 'error', text: 'Cannot clear while the agent is running.' })
      this.tui.requestRender()
      return
    }
    this.agent.reset()
    this.view.clear()
    this.editor.setText('')
    this.tui.requestRender()
  }

  private handleModelCommand(modelInput: string) {
    if (!modelInput) {
      this.showModelPicker()
      return
    }
    const option = resolveModelOption(modelInput)
    if (!option) {
      this.view.items.push({
        kind: 'error',
        text: `Unknown model "${modelInput}". Use /model and select deepseek-flash or deepseek-pro.`,
      })
      this.tui.requestRender()
      return
    }
    this.selectModel(option)
  }

  private showModelPicker() {
    if (this.modelPicker && !this.modelPicker.isHidden()) {
      this.modelPicker.focus()
      return
    }
    this.modelPicker?.hide()

    const list = new SelectList(modelPickerItems, modelPickerItems.length, selectListTheme, {
      minPrimaryColumnWidth: 20,
      maxPrimaryColumnWidth: 24,
    })
    let handle: OverlayHandle | undefined
    const close = () => {
      handle?.hide()
      if (this.modelPicker === handle) this.modelPicker = undefined
    }

    list.onSelect = (item) => {
      close()
      const option = resolveModelOption(item.value)
      if (option) this.selectModel(option)
    }
    list.onCancel = close

    handle = this.tui.showOverlay(list, {
      anchor: 'bottom-left',
      margin: { bottom: 3, left: 2, right: 2, top: 1 },
      maxHeight: modelPickerItems.length,
      offsetY: -1,
      width: 56,
    })
    this.modelPicker = handle
  }

  private selectModel(option: ModelOption) {
    try {
      this.agent.state.model = createSelectedModel(option, this.agent.state.model)
      this.view.items.push({ kind: 'assistant', text: `Model switched to ${option.label}.` })
    } catch (error) {
      this.view.items.push({ kind: 'error', text: toErrorMessage(error) })
    } finally {
      this.tui.requestRender()
    }
  }

  handleInput(data: string) {
    if (matchesKey(data, Key.escape)) {
      this.editor.setText('')
      this.tui.requestRender()
      return
    }
    if (!this.isBusy()) this.editor.handleInput(data)
  }

  invalidate() {
    this.editor.invalidate()
  }

  render(width: number) {
    const safeWidth = Math.max(1, width)
    const busy = this.isBusy()
    this.editor.disableSubmit = busy
    this.editor.borderColor = busy ? yellow : gray

    const header = renderHeader(this.agent, safeWidth)
    const editor = this.editor.render(safeWidth)
    const transcript = [
      ...this.view.items.flatMap((item) => [...renderActivity(item, safeWidth), '']),
      ...(this.view.streamingAssistant
        ? renderActivity({ kind: 'assistant', status: 'running', text: this.view.streamingAssistant }, safeWidth)
        : []),
    ]
    const statusLine = pad(
      [
        yellow(modelLabel(this.agent)),
        tokenUsageLabel(this.agent),
        gray(directoryLabel()),
        busy ? yellow('running') : '',
      ]
        .filter(Boolean)
        .join(dim(' · ')),
      safeWidth,
    )
    const transcriptLimit = Math.max(1, this.tui.terminal.rows - header.length - editor.length - 1)
    const transcriptPanel = transcript.length
      ? fillLines(transcript, Math.max(transcriptLimit, transcript.length), 'bottom')
      : fillLines(renderEmptyState(safeWidth), transcriptLimit, 'top')
    return [...header, ...transcriptPanel, ...editor, statusLine].map((line) => pad(line, safeWidth))
  }
}
