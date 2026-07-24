import { listVBIAgentSkills, readVBIAgentSkill } from '@visactor/vbi-agent'
import type { ReadResourceResult, Resource } from '@modelcontextprotocol/sdk/types.js'

export interface McpResourceAdapter {
  resourceDefinitions: Resource[]
  readResource: (uri: string) => ReadResourceResult
}

const skillUriPrefix = 'vbi://skill/'

const skillDescriptions: Record<string, string> = {
  resource_lookup: 'Skill for discovering VBI chart, insight, and report resources by ID or name.',
  chart: 'Skill for using VBI ChartBuilder — chart types, dimensions, measures, filters, and themes.',
  insight: 'Skill for using VBI InsightBuilder — content editing and insight management.',
  report: 'Skill for using VBI ReportBuilder — pages, snapshots, and report composition.',
}

export const createSkillResources = (): McpResourceAdapter => {
  const skills = listVBIAgentSkills()

  const resourceDefinitions: Resource[] = skills.map((skill) => ({
    uri: `${skillUriPrefix}${skill.name}`,
    name: skill.title,
    description: skillDescriptions[skill.name] ?? skill.title,
    mimeType: 'text/plain',
  }))

  const readResource = (uri: string): ReadResourceResult => {
    if (!uri.startsWith(skillUriPrefix)) {
      throw new Error(`Unknown resource URI: ${uri}`)
    }

    const skillName = uri.slice(skillUriPrefix.length)
    const text = readVBIAgentSkill(skillName)

    return {
      contents: [{ uri, text, mimeType: 'text/plain' }],
    }
  }

  return { resourceDefinitions, readResource }
}
