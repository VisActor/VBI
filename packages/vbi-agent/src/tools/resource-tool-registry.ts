import { Type } from 'typebox'
import type { AgentTool } from '@earendil-works/pi-agent-core'
import { vbiAgentSkillNames } from '../skills/skill-texts'
import { createVBIResourceToolExecutors } from './resource-tool-executors'
import { vbiResourceToolNames, type VBIResourceToolName, type VBIResourceToolsOptions } from './resource-tool-types'

type VBIResourceToolRegistration = Omit<AgentTool, 'execute' | 'name'> & {
  name: VBIResourceToolName
}

const vbiAgentSkillNameSchema = Type.Union(vbiAgentSkillNames.map((skillName) => Type.Literal(skillName)))

const vbiResourceToolRegistrations: Record<VBIResourceToolName, VBIResourceToolRegistration> = {
  read_skill: {
    description: 'Read built-in VBI operation skills before using VBI resource tools.',
    label: 'Read VBI Skill',
    name: 'read_skill',
    parameters: Type.Object(
      {
        action: Type.Union([Type.Literal('list'), Type.Literal('read')]),
        skill: Type.Optional(vbiAgentSkillNameSchema),
      },
      { additionalProperties: false },
    ),
  },
  vbi_resource_lookup: {
    description: 'List and search VBI chart and insight resources. Use returned ids with resource tools.',
    label: 'VBI Resource Lookup',
    name: 'vbi_resource_lookup',
    parameters: Type.Object(
      {
        limit: Type.Optional(Type.Number()),
        query: Type.Optional(Type.String()),
        resource: Type.Optional(Type.Union([Type.Literal('all'), Type.Literal('chart'), Type.Literal('insight')])),
      },
      { additionalProperties: false },
    ),
  },
  vbi_chart: {
    description: 'Manage one VBI chart resource or run chart Builder JavaScript. Read the chart skill first.',
    label: 'VBI Chart',
    name: 'vbi_chart',
    parameters: Type.Object(
      {
        action: Type.Union([
          Type.Literal('create'),
          Type.Literal('get'),
          Type.Literal('rename'),
          Type.Literal('remove'),
          Type.Literal('run'),
        ]),
        code: Type.Optional(Type.String()),
        id: Type.Optional(Type.String()),
        name: Type.Optional(Type.String()),
      },
      { additionalProperties: false },
    ),
  },
  vbi_insight: {
    description: 'Manage one VBI insight resource or run insight Builder JavaScript. Read the insight skill first.',
    label: 'VBI Insight',
    name: 'vbi_insight',
    parameters: Type.Object(
      {
        action: Type.Union([
          Type.Literal('create'),
          Type.Literal('get'),
          Type.Literal('rename'),
          Type.Literal('remove'),
          Type.Literal('run'),
        ]),
        code: Type.Optional(Type.String()),
        content: Type.Optional(Type.String()),
        id: Type.Optional(Type.String()),
        name: Type.Optional(Type.String()),
      },
      { additionalProperties: false },
    ),
  },
}

export const createVBIResourceTools = ({ workspace }: VBIResourceToolsOptions): AgentTool[] => {
  const executors = createVBIResourceToolExecutors(workspace)
  return vbiResourceToolNames.map((name) => ({
    ...vbiResourceToolRegistrations[name],
    execute: executors[name],
  }))
}
