import type { AgentToolResult } from '@earendil-works/pi-agent-core'
import { listVBIAgentSkills, readVBIAgentSkill, type VBIAgentSkillName } from '../skills/skill-texts'
import { stringifyJson } from '../text-format'
import type {
  VBIAgentWorkspace,
  VBIWorkspaceSlot,
  VBIResourceCreateInput,
  VBIResourceKind,
  VBIResourceSummary,
} from '../types/index'
import type { VBIResourceToolExecutors } from './resource-tool-types'
import { clipOutput, createWorkspaceScriptToolResult, runScopedWorkspaceScript } from './workspace-script'

type VBIResourceLookupKind = VBIResourceKind | 'all'
type VBIResourceToolInput = Record<string, unknown>
type ResourceToolMethod = (...args: any[]) => unknown

const stripDsl = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(stripDsl)
  if (typeof value !== 'object' || value === null) return value
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => key !== 'dsl')
      .map(([key, entry]) => [key, stripDsl(entry)]),
  )
}

const createResult = (summary: string, value: unknown): AgentToolResult<unknown> => {
  const text = stringifyJson(value)
  return {
    content: [{ text, type: 'text' }],
    details: { display: clipOutput(text), summary },
  }
}

const asObject = (toolName: string, input: unknown): VBIResourceToolInput => {
  if (typeof input === 'object' && input !== null && !Array.isArray(input)) return input as VBIResourceToolInput
  throw new Error(`${toolName} input must be an object`)
}

const readString = (input: VBIResourceToolInput, key: string) => {
  const value = input[key]
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

const requireString = (toolName: string, input: VBIResourceToolInput, key: string) => {
  const value = readString(input, key)
  if (!value) throw new Error(`${toolName}.${key} is required`)
  return value
}

const readLimit = (input: VBIResourceToolInput) => {
  const value = input.limit
  if (typeof value !== 'number' || !Number.isFinite(value)) return 20
  return Math.max(1, Math.min(100, Math.floor(value)))
}

const readLookupResource = (input: VBIResourceToolInput): VBIResourceLookupKind => {
  const resource = input.resource ?? 'all'
  if (resource === 'all' || resource === 'chart' || resource === 'insight') return resource
  throw new Error('vbi_resource_lookup.resource must be all, chart, or insight')
}

const createInput = (resource: VBIResourceKind, input: VBIResourceToolInput): VBIResourceCreateInput => {
  const name = readString(input, 'name')
  const base = name ? { name } : {}
  return resource === 'insight' ? { ...base, content: readString(input, 'content') } : base
}
const filterSummaries = (items: VBIResourceSummary[], query: string | undefined, limit: number) => {
  const normalizedQuery = query?.toLowerCase()
  const filtered = normalizedQuery
    ? items.filter((item) => {
        const id = item.id.toLowerCase()
        const name = typeof item.name === 'string' ? item.name.toLowerCase() : ''
        return id.includes(normalizedQuery) || name.includes(normalizedQuery)
      })
    : items
  return filtered.slice(0, limit)
}

const requireSlot = <TSlot extends VBIWorkspaceSlot>(
  workspace: VBIAgentWorkspace,
  resource: VBIResourceKind,
  toolName: string,
) => {
  const slot = workspace[resource] as TSlot | undefined
  if (!slot) throw new Error(`${toolName} requires workspace.${resource}`)
  return slot
}

const requireMethod = <TMethod extends ResourceToolMethod>(toolName: string, target: object, methodName: string) => {
  const method = (target as unknown as Record<string, unknown>)[methodName]
  if (typeof method !== 'function') throw new Error(`${toolName} requires workspace method ${methodName}`)
  return method as TMethod
}

const createDefaultedSlot = <TBuilder>(slot: VBIWorkspaceSlot<TBuilder>, id: string | undefined) => ({
  ...slot,
  close: (nextId?: string) => slot.close?.(nextId ?? id),
  describe: (nextId?: string) => slot.describe?.(nextId ?? id),
  open: (nextId?: string) => slot.open(nextId ?? id),
  snapshot: (nextId?: string) => slot.snapshot?.(nextId ?? id),
})

const runBuilderScript = async <TBuilder>({
  code,
  id,
  slot,
  slotGlobal,
  toolName,
  workspace,
}: {
  code: string
  id?: string
  slot: VBIWorkspaceSlot<TBuilder> | undefined
  slotGlobal: VBIResourceKind
  toolName: string
  workspace: VBIAgentWorkspace
}) => {
  if (!slot) throw new Error(`${toolName} requires workspace.${slotGlobal}`)
  const scopedSlot = createDefaultedSlot(slot, id)
  const scopedWorkspace = { ...workspace, [slotGlobal]: scopedSlot }
  const scriptResult = await runScopedWorkspaceScript(scopedWorkspace, code, {
    builder: scopedSlot,
    [slotGlobal]: scopedSlot,
  })
  return createWorkspaceScriptToolResult(`${toolName} run succeeded`, scriptResult.logs, scriptResult.result)
}
export const createVBIResourceToolExecutors = (workspace: VBIAgentWorkspace): VBIResourceToolExecutors => ({
  read_skill: async (_toolCallId, input) => {
    const params = asObject('read_skill', input)
    const action = requireString('read_skill', params, 'action')
    if (action === 'list') return createResult('read_skill list completed', listVBIAgentSkills())
    if (action === 'read') {
      const skill = requireString('read_skill', params, 'skill') as VBIAgentSkillName
      return createResult(`read_skill ${skill} completed`, { skill, content: readVBIAgentSkill(skill) })
    }
    throw new Error('read_skill.action must be list or read')
  },

  vbi_resource_lookup: async (_toolCallId, input) => {
    const params = asObject('vbi_resource_lookup', input)
    const resource = readLookupResource(params)
    const query = readString(params, 'query')
    const limit = readLimit(params)
    const read = async (kind: VBIResourceKind) => {
      const slot = requireSlot(workspace, kind, 'vbi_resource_lookup')
      const list = requireMethod<() => Promise<VBIResourceSummary[]> | VBIResourceSummary[]>(
        'vbi_resource_lookup',
        slot,
        'list',
      )
      return filterSummaries(await list.call(slot), query, limit)
    }

    if (resource !== 'all') {
      return createResult(`vbi_resource_lookup ${resource} completed`, {
        resource,
        items: await read(resource),
      })
    }

    const [charts, insights] = await Promise.all([read('chart'), read('insight')])
    return createResult('vbi_resource_lookup all completed', { charts, insights })
  },

  vbi_chart: async (_toolCallId, input) => {
    const params = asObject('vbi_chart', input)
    const action = requireString('vbi_chart', params, 'action')
    const chart = requireSlot<VBIWorkspaceSlot>(workspace, 'chart', 'vbi_chart')
    if (action === 'run') {
      return runBuilderScript({
        code: requireString('vbi_chart', params, 'code'),
        id: readString(params, 'id'),
        slot: chart,
        slotGlobal: 'chart',
        toolName: 'vbi_chart',
        workspace,
      })
    }
    if (action === 'create') {
      const create = requireMethod<(input?: VBIResourceCreateInput) => Promise<unknown> | unknown>(
        'vbi_chart',
        chart,
        'create',
      )
      return createResult(
        'vbi_chart create completed',
        stripDsl(await create.call(chart, createInput('chart', params))),
      )
    }

    const id = requireString('vbi_chart', params, 'id')
    if (action === 'get') return createResult('vbi_chart get completed', stripDsl(await chart.describe?.(id)))
    if (action === 'rename') {
      const rename = requireMethod<(id: string, name: string) => Promise<unknown> | unknown>(
        'vbi_chart',
        chart,
        'rename',
      )
      return createResult(
        'vbi_chart rename completed',
        stripDsl(await rename.call(chart, id, requireString('vbi_chart', params, 'name'))),
      )
    }
    if (action === 'remove') {
      const remove = requireMethod<(id: string) => Promise<unknown> | unknown>('vbi_chart', chart, 'remove')
      return createResult('vbi_chart remove completed', stripDsl(await remove.call(chart, id)))
    }
    throw new Error('vbi_chart.action must be create, get, rename, remove, or run')
  },

  vbi_insight: async (_toolCallId, input) => {
    const params = asObject('vbi_insight', input)
    const action = requireString('vbi_insight', params, 'action')
    const insight = requireSlot<VBIWorkspaceSlot>(workspace, 'insight', 'vbi_insight')
    if (action === 'run') {
      return runBuilderScript({
        code: requireString('vbi_insight', params, 'code'),
        id: readString(params, 'id'),
        slot: insight,
        slotGlobal: 'insight',
        toolName: 'vbi_insight',
        workspace,
      })
    }
    if (action === 'create') {
      const create = requireMethod<(input?: VBIResourceCreateInput) => Promise<unknown> | unknown>(
        'vbi_insight',
        insight,
        'create',
      )
      return createResult(
        'vbi_insight create completed',
        stripDsl(await create.call(insight, createInput('insight', params))),
      )
    }

    const id = requireString('vbi_insight', params, 'id')
    if (action === 'get') return createResult('vbi_insight get completed', stripDsl(await insight.describe?.(id)))
    if (action === 'rename') {
      const rename = requireMethod<(id: string, name: string) => Promise<unknown> | unknown>(
        'vbi_insight',
        insight,
        'rename',
      )
      return createResult(
        'vbi_insight rename completed',
        stripDsl(await rename.call(insight, id, requireString('vbi_insight', params, 'name'))),
      )
    }
    if (action === 'remove') {
      const remove = requireMethod<(id: string) => Promise<unknown> | unknown>('vbi_insight', insight, 'remove')
      return createResult('vbi_insight remove completed', stripDsl(await remove.call(insight, id)))
    }
    throw new Error('vbi_insight.action must be create, get, rename, remove, or run')
  },
})
