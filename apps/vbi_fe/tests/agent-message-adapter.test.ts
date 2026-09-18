import { describe, expect, test } from '@rstest/core'
import { projectAgentMessagesForAssistantUi } from '../src/views/agent/chat/agent-message-adapter'

describe('agent message adapter', () => {
  test('projects tool results into assistant tool-call parts', () => {
    const [converted] = projectAgentMessagesForAssistantUi({
      conversationId: 'conversation-1',
      messages: [
        {
          role: 'assistant',
          content: [
            {
              type: 'toolCall',
              id: 'tool-1',
              name: 'vbi_resource',
              arguments: { action: 'list', resource: 'chart' },
            },
          ],
          timestamp: 1,
        },
        {
          role: 'toolResult',
          toolCallId: 'tool-1',
          toolName: 'vbi_resource',
          content: [{ type: 'text', text: '{"items":[]}' }],
          details: { display: '{"items":[]}' },
        },
      ] as never,
    })

    expect(converted.content).toEqual([
      expect.objectContaining({
        result: expect.objectContaining({
          details: { display: '{"items":[]}' },
        }),
        toolCallId: 'tool-1',
        toolName: 'vbi_resource',
        type: 'tool-call',
      }),
    ])
  })

  test('preserves standalone tool-result errors as incomplete assistant messages', () => {
    const [converted] = projectAgentMessagesForAssistantUi({
      conversationId: 'conversation-1',
      messages: [
        {
          role: 'toolResult',
          toolCallId: 'tool-1',
          toolName: 'vbi_resource',
          isError: true,
          content: [{ type: 'text', text: 'failed' }],
        },
      ] as never,
    })

    expect(converted.status).toEqual({ type: 'incomplete', reason: 'error', error: 'Tool execution failed' })
    expect(converted.content).toEqual([
      expect.objectContaining({
        isError: true,
        toolCallId: 'tool-1',
        type: 'tool-call',
      }),
    ])
  })

  test('maps reasoning parts', () => {
    const [converted] = projectAgentMessagesForAssistantUi({
      conversationId: 'conversation-1',
      messages: [
        {
          role: 'assistant',
          content: [{ type: 'thinking', thinking: 'Checking resources.' }],
        },
      ] as never,
    })

    expect(converted.content).toEqual([{ type: 'reasoning', text: 'Checking resources.' }])
  })

  test('preserves assistant content order for streaming text, reasoning, and tool calls', () => {
    const [converted] = projectAgentMessagesForAssistantUi({
      conversationId: 'conversation-1',
      messages: [
        {
          role: 'assistant',
          content: [
            { type: 'text', text: 'I will inspect resources.' },
            { type: 'thinking', thinking: 'List charts.' },
            {
              type: 'toolCall',
              id: 'tool-chart',
              name: 'vbi_resource',
              arguments: { action: 'list', resource: 'chart' },
            },
            { type: 'reasoning', reasoning: 'List insights.' },
            {
              type: 'toolCall',
              id: 'tool-insight',
              name: 'vbi_resource',
              arguments: { action: 'list', resource: 'insight' },
            },
            { type: 'thinking', thinking: 'Summarize totals.' },
            { type: 'text', text: 'Done.' },
          ],
        },
      ] as never,
    })

    expect(converted.content).toEqual([
      { type: 'text', text: 'I will inspect resources.' },
      { type: 'reasoning', text: 'List charts.' },
      expect.objectContaining({ toolCallId: 'tool-chart', type: 'tool-call' }),
      { type: 'reasoning', text: 'List insights.' },
      expect.objectContaining({ toolCallId: 'tool-insight', type: 'tool-call' }),
      { type: 'reasoning', text: 'Summarize totals.' },
      { type: 'text', text: 'Done.' },
    ])
    expect((converted.content as { type: string }[]).filter((part) => part.type === 'reasoning')).toHaveLength(3)
  })

  test('projects same-name tool results by call order when ids are unavailable', () => {
    const [converted] = projectAgentMessagesForAssistantUi({
      conversationId: 'conversation-1',
      messages: [
        {
          role: 'assistant',
          content: [
            { type: 'toolCall', name: 'vbi_resource', arguments: { action: 'list', resource: 'chart' } },
            { type: 'toolCall', name: 'vbi_resource', arguments: { action: 'list', resource: 'insight' } },
          ],
        },
        {
          role: 'toolResult',
          toolName: 'vbi_resource',
          content: [{ type: 'text', text: 'chart-result' }],
        },
        {
          role: 'toolResult',
          toolName: 'vbi_resource',
          content: [{ type: 'text', text: 'insight-result' }],
        },
      ] as never,
    })
    const content = converted.content as Array<{ result?: { content?: Array<{ text?: string }> } }>

    expect(content[0]?.result?.content?.[0]?.text).toBe('chart-result')
    expect(content[1]?.result?.content?.[0]?.text).toBe('insight-result')
  })

  test('projects VBI messages into assistant-ui messages through a single pure entrypoint', () => {
    const projected = projectAgentMessagesForAssistantUi({
      conversationId: 'conversation-1',
      messages: [
        {
          role: 'assistant',
          content: [
            { type: 'thinking', thinking: 'Read charts.' },
            { type: 'toolCall', id: 'tool-1', name: 'vbi_resource', arguments: { resource: 'chart' } },
          ],
          timestamp: 1,
        },
        {
          role: 'toolResult',
          toolCallId: 'tool-1',
          toolName: 'vbi_resource',
          content: [{ type: 'text', text: 'chart-result' }],
          timestamp: 2,
        },
      ] as never,
    })

    expect(projected).toHaveLength(1)
    expect(projected[0]).toEqual(
      expect.objectContaining({
        content: [
          { type: 'reasoning', text: 'Read charts.' },
          expect.objectContaining({
            result: expect.objectContaining({ content: [{ type: 'text', text: 'chart-result' }] }),
            toolCallId: 'tool-1',
            type: 'tool-call',
          }),
        ],
        id: 'conversation-1:0:1:assistant',
        role: 'assistant',
      }),
    )
  })
})
