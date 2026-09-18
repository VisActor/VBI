import type { AgentTool } from '@earendil-works/pi-agent-core'
import type { VBIAgentWorkspace } from '../types/index'

export const vbiResourceToolNames = ['read_skill', 'vbi_resource_lookup', 'vbi_chart', 'vbi_insight'] as const

export type VBIResourceToolName = (typeof vbiResourceToolNames)[number]

export type VBIResourceToolsOptions = {
  workspace: VBIAgentWorkspace
}

export type VBIResourceToolExecutors = Record<VBIResourceToolName, AgentTool['execute']>
