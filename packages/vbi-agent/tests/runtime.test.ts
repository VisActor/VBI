import { describe, expect, test } from '@rstest/core'
import { Agent } from '@earendil-works/pi-agent-core'
import { Type } from 'typebox'
import { VBIAgent } from '../src/index'
import type { AgentEvent, AgentOptions, AgentTool, StreamFn } from '../src/index'

const usage = {
  cacheRead: 0,
  cacheWrite: 0,
  cost: { cacheRead: 0, cacheWrite: 0, input: 0, output: 0, total: 0 },
  input: 0,
  output: 0,
  totalTokens: 0,
}

type InitialState = NonNullable<AgentOptions['initialState']>

const model = {
  api: 'test-api',
  baseUrl: '',
  contextWindow: 1000,
  cost: { cacheRead: 0, cacheWrite: 0, input: 0, output: 0 },
  id: 'test-model',
  input: ['text'],
  maxTokens: 1000,
  name: 'Test Model',
  provider: 'test-provider',
  reasoning: false,
} as Exclude<InitialState['model'], undefined>

type ScriptedAssistantMessage = {
  stopReason: 'stop' | 'toolUse'
}

const assistantMessage = (content: unknown[], stopReason: 'stop' | 'toolUse' = 'stop'): ScriptedAssistantMessage =>
  ({
    api: model.api,
    content,
    model: model.id,
    provider: model.provider,
    role: 'assistant',
    stopReason,
    timestamp: Date.now(),
    usage,
  }) as unknown as ScriptedAssistantMessage

const createStreamResult = (message: ScriptedAssistantMessage) =>
  ({
    async *[Symbol.asyncIterator]() {
      yield { message, reason: message.stopReason, type: 'done' }
    },
    result: async () => message,
  }) as unknown as ReturnType<StreamFn>

const createOptions = (...messages: ScriptedAssistantMessage[]) => {
  const contexts: unknown[] = []
  const streamFn: StreamFn = (_model, context) => {
    contexts.push(context)
    const message = messages.shift()
    if (!message) throw new Error('no scripted assistant message left')
    return createStreamResult(message)
  }
  return {
    contexts,
    options: {
      initialState: { model },
      streamFn,
    } satisfies AgentOptions & { initialState: { model: typeof model } },
  }
}

describe('VBIAgent', () => {
  test('returns a Pi Agent and runs built-in VBI resource tool calls before the final response', async () => {
    const builder = { build: () => ({ chartType: 'line' }) }
    const { options } = createOptions(
      assistantMessage(
        [
          { text: '查询 Chart1', type: 'text' },
          {
            arguments: {
              action: 'run',
              code: "const b = await chart.open('Chart1'); return json({ chartType: b.build().chartType })",
            },
            id: 'call-1',
            name: 'vbi_chart',
            type: 'toolCall',
          },
        ],
        'toolUse',
      ),
      assistantMessage([{ text: 'Chart1 的图表类型是 line', type: 'text' }]),
    )
    const agent = new VBIAgent(options, { chart: { open: async () => builder as never } })
    const events: AgentEvent[] = []
    agent.subscribe((event) => {
      events.push(event)
    })

    await agent.prompt('查询Chart1的图表类型')

    expect(agent).toBeInstanceOf(VBIAgent)
    expect(agent).toBeInstanceOf(Agent)
    expect(agent.state.tools.map((tool) => tool.name)).toEqual([
      'read_skill',
      'vbi_resource_lookup',
      'vbi_chart',
      'vbi_insight',
    ])
    expect(events.map((event) => event.type)).toContain('tool_execution_end')
    expect(agent.state.messages.map((message) => message.role)).toEqual([
      'user',
      'assistant',
      'toolResult',
      'assistant',
    ])
    const toolResult = agent.state.messages.find((message) => message.role === 'toolResult')
    expect(toolResult?.content.find((part) => part.type === 'text')?.text).toContain('"chartType": "line"')
    expect(agent.state.messages.at(-1)).toMatchObject({ role: 'assistant' })
  })

  test('keeps the Pi Agent transcript across follow-up turns', async () => {
    const { contexts, options } = createOptions(
      assistantMessage([{ text: 'first response', type: 'text' }]),
      assistantMessage([{ text: 'second response', type: 'text' }]),
    )
    const agent = new VBIAgent(options, {})

    await agent.prompt('first')
    await agent.prompt('second')

    expect(contexts).toHaveLength(2)
    expect(agent.state.messages.filter((message) => message.role === 'user').map((message) => message.content)).toEqual(
      [[{ text: 'first', type: 'text' }], [{ text: 'second', type: 'text' }]],
    )
    expect(agent.state.messages.at(-1)).toMatchObject({ role: 'assistant' })
  })

  test('replaces default VBI resource tools when custom tools are provided', () => {
    const replacementTools: AgentTool[] = [
      {
        description: 'Run trusted VBI application scripts.',
        execute: async () => ({
          content: [{ text: '{"ok":true}', type: 'text' }],
          details: { display: '{"ok":true}', summary: 'vbi_application completed' },
        }),
        label: 'VBI Application',
        name: 'vbi_application',
        parameters: Type.Object({
          code: Type.String(),
        }),
      },
    ]
    const agent = new VBIAgent({
      initialState: {
        model,
        tools: [{ name: 'stale_tool' }],
      } as unknown as AgentOptions['initialState'],
      tools: replacementTools,
    })

    expect(agent.state.tools).toEqual(replacementTools)
    expect(agent.state.tools.map((tool) => tool.name)).toEqual(['vbi_application'])
  })
})
