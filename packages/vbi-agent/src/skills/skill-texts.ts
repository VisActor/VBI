import { chartBuilderSkill } from './how-to-use-chart-builder-skill'
import { insightBuilderSkill } from './how-to-use-insight-builder-skill'
import { vbiSourcesLookupSkill } from './how-to-use-vbi-sources-lookup-skill'

export const vbiAgentSkillNames = ['resource_lookup', 'chart', 'insight'] as const

export type VBIAgentSkillName = (typeof vbiAgentSkillNames)[number]

const vbiAgentSkillTexts: Record<VBIAgentSkillName, string> = {
  resource_lookup: vbiSourcesLookupSkill,
  chart: chartBuilderSkill,
  insight: insightBuilderSkill,
}

const vbiAgentSkillTitles: Record<VBIAgentSkillName, string> = {
  resource_lookup: 'VBI sources lookup skill',
  chart: 'how to use chart builder skill',
  insight: 'how to use insight builder skill',
}

const isVBIAgentSkillName = (name: string): name is VBIAgentSkillName =>
  (vbiAgentSkillNames as readonly string[]).includes(name)

export const listVBIAgentSkills = () =>
  vbiAgentSkillNames.map((name) => ({
    name,
    title: vbiAgentSkillTitles[name],
  }))

export const readVBIAgentSkill = (name: string) => {
  if (isVBIAgentSkillName(name)) {
    return vbiAgentSkillTexts[name]
  }
  throw new Error(`Unknown VBI skill: ${name}`)
}
