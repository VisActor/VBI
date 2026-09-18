import {
  getAgentConversationsState,
  setAgentConversationsState,
  subscribeAgentConversations,
} from '../src/application/agent/conversations'
import { i18nApplicationStore, setI18nApplicationLocale } from '../src/application/i18n/store'
import { layoutApplicationStore, setLayoutApplicationState } from '../src/application/layout/store'
import {
  bindApplicationNavigation,
  getApplicationPathname,
  goApplicationPath,
  setApplicationPathname,
  subscribeApplicationNavigation,
} from '../src/application/routing/navigation-bridge'
import { themeApplicationStore, setThemeApplicationMode } from '../src/application/theme/store'
import { chartApplicationStore } from '../src/application/chart/store'
import { insightApplicationStore } from '../src/application/insight/store'
import type { BuilderByKind, BuilderStoreState } from '../src/application/resources/resource-builder.types'
import type { ResourceKind } from '../src/types'
import {
  defaultManageSidebarWidth,
  defaultWorkspacePlacement,
  defaultWorkspaceSidePanelWidth,
  manageSidebarWidthStorageKey,
  minWorkspaceSidePanelWidth,
  workspacePlacementStorageKey,
  workspaceSidePanelFloatingPositionStorageKey,
  workspaceSidePanelModeStorageKey,
  workspaceSidePanelWidthStorageKey,
  type WorkspacePlacement,
  type WorkspaceSidePanelFloatingPosition,
  type WorkspaceSidePanelMode,
} from '../src/application/layout/constants'

export {
  defaultManageSidebarWidth,
  defaultWorkspacePlacement,
  defaultWorkspaceSidePanelWidth,
  manageSidebarWidthStorageKey,
  minWorkspaceSidePanelWidth,
  workspacePlacementStorageKey,
  workspaceSidePanelFloatingPositionStorageKey,
  workspaceSidePanelModeStorageKey,
  workspaceSidePanelWidthStorageKey,
}

type TestPreferencesState = {
  locale: ReturnType<typeof i18nApplicationStore.getState>['locale']
  themeMode: ReturnType<typeof themeApplicationStore.getState>['mode']
  setLocale(locale: TestPreferencesState['locale']): void
  setThemeMode(themeMode: TestPreferencesState['themeMode']): void
}

const createPreferencesState = (): TestPreferencesState => {
  const i18n = i18nApplicationStore.getState()
  const theme = themeApplicationStore.getState()

  return {
    locale: i18n.locale,
    themeMode: theme.mode,
    setLocale: i18n.change,
    setThemeMode: theme.change,
  }
}

export const useAppPreferencesStore: any = {
  getState: createPreferencesState,
  setState: (partial: Partial<TestPreferencesState>) => {
    if (partial.locale) setI18nApplicationLocale(partial.locale)
    if (partial.themeMode) setThemeApplicationMode(partial.themeMode)
  },
}

let testNavigate: ((path: string) => void) | null = null
bindApplicationNavigation((path) => testNavigate?.(path))

export const useNavigationStore: any = {
  getState: () => ({
    navigate: testNavigate,
    pathname: getApplicationPathname(),
    go: goApplicationPath,
    openChart: (id: string) => goApplicationPath(`/manage/chart/${id}`),
    openInsight: (id: string) => goApplicationPath(`/manage/insight/${id}`),
    setNavigate: (navigate: (path: string) => void) => {
      testNavigate = navigate
    },
    setPathname: setApplicationPathname,
  }),
  setState: (partial: { navigate?: ((path: string) => void) | null; pathname?: string }) => {
    if ('navigate' in partial) testNavigate = partial.navigate ?? null
    if (partial.pathname !== undefined) setApplicationPathname(partial.pathname)
  },
  subscribe: subscribeApplicationNavigation,
}

export const useAgentConversationsStore: any = {
  getState: getAgentConversationsState,
  setState: setAgentConversationsState,
  subscribe: subscribeAgentConversations,
}

export const useManageSidebarStore: any = {
  getState: () => {
    const layout = layoutApplicationStore.getState()
    return {
      collapsed: layout.sidebar.collapsed,
      workspacePlacement: layout.workspacePlacement.value,
      width: layout.sidebar.width,
      resetWidth: layout.sidebar.resetWidth,
      setCollapsed: layout.sidebar.setCollapsed,
      setWorkspacePlacement: layout.workspacePlacement.change,
      setWidth: layout.sidebar.setWidth,
      toggleCollapsed: layout.sidebar.toggleCollapsed,
      toggleWorkspacePlacement: layout.workspacePlacement.toggle,
    }
  },
  setState: (partial: { collapsed?: boolean; workspacePlacement?: WorkspacePlacement; width?: number }) =>
    setLayoutApplicationState({
      sidebar: {
        collapsed: partial.collapsed,
        width: partial.width,
      },
      workspacePlacement: partial.workspacePlacement,
    }),
  subscribe: layoutApplicationStore.subscribe,
}

export const useWorkspaceSidePanelStore: any = {
  getState: () => {
    const sidePanel = layoutApplicationStore.getState().sidePanel
    return {
      collapsed: sidePanel.collapsed,
      floatingPosition: sidePanel.floatingPosition,
      mode: sidePanel.mode,
      width: sidePanel.width,
      resetWidth: sidePanel.resetWidth,
      setCollapsed: sidePanel.setCollapsed,
      setFloatingPosition: sidePanel.setFloatingPosition,
      setMode: sidePanel.changeMode,
      setWidth: sidePanel.setWidth,
      toggleCollapsed: sidePanel.toggleCollapsed,
      toggleMode: sidePanel.toggleMode,
    }
  },
  setState: (partial: {
    collapsed?: boolean
    floatingPosition?: WorkspaceSidePanelFloatingPosition | null
    mode?: WorkspaceSidePanelMode
    width?: number
  }) =>
    setLayoutApplicationState({
      sidePanel: {
        collapsed: partial.collapsed,
        floatingPosition: 'floatingPosition' in partial ? partial.floatingPosition : undefined,
        mode: partial.mode,
        width: partial.width,
      },
    }),
  subscribe: layoutApplicationStore.subscribe,
}

export const useManageChartsStore: any = chartApplicationStore
export const useManageInsightsStore: any = insightApplicationStore
const storeByKind = {
  chart: chartApplicationStore,
  insight: insightApplicationStore,
}

const createBuilderModel = <TKind extends ResourceKind>(kind: TKind) => {
  const store = storeByKind[kind]
  return {
    getState: () => {
      const state = store.getState()
      return {
        connect: state.connect,
        release: state.release,
        retain: state.retain,
        sessions: state.sessions,
      } as BuilderStoreState<BuilderByKind[TKind]>
    },
    setState: (partial: Partial<BuilderStoreState<BuilderByKind[TKind]>>) => {
      if (partial.sessions) {
        ;(store.setState as (partial: never) => void)({ sessions: partial.sessions } as never)
      }
    },
    subscribe: store.subscribe,
  }
}

export const useChartBuilderModel: any = createBuilderModel('chart')
export const useInsightBuilderModel: any = createBuilderModel('insight')
