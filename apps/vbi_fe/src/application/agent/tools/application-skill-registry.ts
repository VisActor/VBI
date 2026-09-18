import { vbiApplicationSkill } from './skills/SKILL'

const skillLoaders = {
  agent: () => import('./skills/references/agent').then((module) => module.agentApplicationSkill),
  application_overview: () =>
    import('./skills/references/application-overview').then((module) => module.applicationOverviewSkill),
  builder_api: () => import('./skills/references/builder-api').then((module) => module.builderApiSkill),
  layout_preferences: () =>
    import('./skills/references/layout-preferences').then((module) => module.layoutPreferencesSkill),
  resources: () => import('./skills/references/resources').then((module) => module.resourcesSkill),
} as const

export type VBIApplicationSkillName = keyof typeof skillLoaders

export const vbiApplicationSkillNames = Object.keys(skillLoaders) as VBIApplicationSkillName[]

const isVBIApplicationSkillName = (name: string): name is VBIApplicationSkillName =>
  (vbiApplicationSkillNames as readonly string[]).includes(name)

export const readVBIApplicationSkillIndex = () => vbiApplicationSkill

export const readVBIApplicationSkill = async (name: string) => {
  if (isVBIApplicationSkillName(name)) {
    return skillLoaders[name]()
  }
  throw new Error(`Unknown VBI application skill: ${name}`)
}
