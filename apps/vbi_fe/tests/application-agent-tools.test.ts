import { beforeEach, describe, expect, rs, test } from '@rstest/core'

const { application, bindApplicationNavigation, setApplicationPathname } = await import('../src/application')
const { createVBIApplicationTools } = await import('../src/application/agent/tools/application-tools')
const { appLocales } = await import('../src/i18n')
const { darkVbiThemeModes, lightVbiThemeModes } = await import('../src/theme/palette')
const { useAppPreferencesStore } = await import('./application-test-stores')
const { defaultManageSidebarWidth, defaultWorkspacePlacement, useManageSidebarStore } =
  await import('./application-test-stores')
const { useNavigationStore } = await import('./application-test-stores')
const { defaultWorkspaceSidePanelWidth, useWorkspaceSidePanelStore } = await import('./application-test-stores')
const initialPreferencesState = useAppPreferencesStore.getState()
const initialManageSidebarState = useManageSidebarStore.getState()
const initialNavigationState = useNavigationStore.getState()
const initialWorkspaceSidePanelState = useWorkspaceSidePanelStore.getState()

const readText = (result: { content: Array<{ text: string; type: string }> }) =>
  result.content.find((part) => part.type === 'text')?.text ?? ''

const readJson = <T>(result: { content: Array<{ text: string; type: string }> }) => JSON.parse(readText(result)) as T

const getTool = (name: string) => {
  const tool = createVBIApplicationTools().find((entry) => entry.name === name)
  expect(tool).toBeDefined()
  return tool
}
describe('VBI application agent tools', () => {
  beforeEach(() => {
    rs.clearAllMocks()
    window.localStorage.clear()
    useAppPreferencesStore.setState(initialPreferencesState, true)
    useManageSidebarStore.setState(initialManageSidebarState, true)
    useManageSidebarStore.setState({
      collapsed: false,
      width: defaultManageSidebarWidth,
      workspacePlacement: defaultWorkspacePlacement,
    })
    useNavigationStore.setState(initialNavigationState, true)
    useWorkspaceSidePanelStore.setState(initialWorkspaceSidePanelState, true)
    useWorkspaceSidePanelStore.setState({
      collapsed: false,
      floatingPosition: null,
      mode: 'fixed',
      width: defaultWorkspaceSidePanelWidth,
    })
    setApplicationPathname('/manage/chart')
  })

  test('lists and lazy-loads application skills without legacy resource tool contracts', async () => {
    const readSkill = getTool('read_skill')

    const listResult = await readSkill?.execute('call-list', { action: 'list' })
    const skillIndex = readText(listResult as never)
    expect(skillIndex).toContain('# VBI Application Skill')
    expect(skillIndex).toContain('References:')
    expect(skillIndex).toContain('application_overview: Tool usage rules')
    expect(skillIndex).toContain('resources: application.getState().chart and application.getState().insight')
    expect(skillIndex).toContain(
      'layout_preferences: application.getState().layout, application.getState().theme, and application.getState().i18n',
    )
    expect(skillIndex).toContain('agent: application.getState().agent conversation')
    expect(skillIndex).toContain('builder_api: VBI namespace and Builder API')
    expect(skillIndex).toContain('Call read_skill with { "action": "read", "skill": "<reference_name>" }')

    const skillResult = await readSkill?.execute('call-read', { action: 'read', skill: 'builder_api' })
    const skill = readText(skillResult as never)
    expect(skill).toContain('application.getState().chart.editor.builders')
    expect(skill).not.toContain('vbi_chart')

    const applicationOverviewResult = await readSkill?.execute('call-read-overview', {
      action: 'read',
      skill: 'application_overview',
    })
    const applicationOverview = readText(applicationOverviewResult as never)
    expect(applicationOverview).toContain('application.getState().theme.list()')
    expect(applicationOverview).toContain('application.getState().i18n.list()')
    expect(applicationOverview).toContain('derive and verify ids')

    const layoutResult = await readSkill?.execute('call-read-layout', {
      action: 'read',
      skill: 'layout_preferences',
    })
    const layout = readText(layoutResult as never)
    expect(layout).toContain('application.getState().layout.sidePanel.listMode()')
    expect(layout).toContain('application.getState().layout.workspacePlacement.list()')
    expect(layout).toContain('application.getState().theme.change(mode)')
    expect(layout).toContain('application.getState().i18n.change(locale)')

    const agentResult = await readSkill?.execute('call-read-agent', { action: 'read', skill: 'agent' })
    const agent = readText(agentResult as never)
    expect(agent).toContain('application.getState().agent.model.list()')
    expect(agent).toContain('application.getState().agent.model.listThinking()')
    expect(agent).toContain('application.getState().agent.model.changeThinking(thinkingLevel)')

    const resourcesResult = await readSkill?.execute('call-read-resources', { action: 'read', skill: 'resources' })
    const resources = readText(resourcesResult as never)
    expect(resources).toContain('Call list() before open(id)')
    expect(resources).toContain('Do not invent ids')
    const allApplicationSkillContent = [skillIndex, applicationOverview, layout, agent, resources].join('\n')
    expect(allApplicationSkillContent).not.toContain('changeTheme')
    expect(allApplicationSkillContent).not.toContain('listTheme')
    expect(allApplicationSkillContent).not.toContain('setLocale')
    expect(allApplicationSkillContent).not.toContain('changeThinkingLevel')
    expect(allApplicationSkillContent).not.toContain('workspacePlacement.set')
  })

  test('runs trusted scripts against theme and layout application APIs with full JSON content', async () => {
    const applicationTool = getTool('vbi_application')
    const allThemeModes = [...lightVbiThemeModes, ...darkVbiThemeModes]
    const expectedThemeMode =
      allThemeModes.find((mode) => mode !== application.getState().theme.mode) ?? application.getState().theme.mode

    const result = await applicationTool?.execute('call-application', {
      code: `
const themes = application.getState().theme.list();
const locales = application.getState().i18n.list();
const allThemes = [...themes.light, ...themes.dark];
const nextTheme = allThemes.find((mode) => mode !== snapshot().theme.mode) ?? snapshot().theme.mode;
application.getState().theme.change(nextTheme);
application.getState().i18n.change("en-US");
application.getState().layout.sidePanel.changeMode("floating");
application.getState().layout.sidePanel.setWidth(520);
console.log("theme", snapshot().theme.mode);
return json({
  i18n: { ...snapshot().i18n, available: locales },
  layout: snapshot().layout.sidePanel,
  theme: { ...snapshot().theme, available: themes },
});
`,
    })
    const payload = readJson<{
      logs: string[]
      result: {
        i18n: { available: string[]; locale: string }
        layout: { mode: string; width: number }
        theme: { available: { dark: string[]; light: string[] }; mode: string }
      }
    }>(result as never)

    expect(payload.logs).toEqual([`theme ${expectedThemeMode}`])
    expect(payload.result).toEqual({
      i18n: { available: appLocales, locale: 'en-US' },
      layout: expect.objectContaining({ mode: 'floating', width: 520 }),
      theme: { available: { dark: darkVbiThemeModes, light: lightVbiThemeModes }, mode: expectedThemeMode },
    })
    expect(application.getState().theme.mode).toBe(expectedThemeMode)
    expect(application.getState().i18n.locale).toBe('en-US')
    expect(application.getState().layout.sidePanel.mode).toBe('floating')
    expect(readText(result as never)).toContain('"width": 520')
  })

  test('runs resource navigation and snapshots through the semantic application API', async () => {
    const navigate = rs.fn()
    bindApplicationNavigation(navigate)
    const applicationTool = getTool('vbi_application')
    const result = await applicationTool?.execute('call-application', {
      code: `
await application.getState().chart.open("chart 1");
await application.getState().insight.open("insight-1");
return json(Object.keys(snapshot()));
`,
    })
    expect(navigate).toHaveBeenNthCalledWith(1, '/manage/chart/chart%201')
    expect(navigate).toHaveBeenNthCalledWith(2, '/manage/insight/insight-1')
    expect(readJson<{ result: string[] }>(result as never).result).not.toContain('reportDetail')
  })
})
