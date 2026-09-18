import { application } from '../../core/store'

type ProjectableResource = {
  editor: {
    builders: Record<string, { builder: unknown; version: number }>
  }
  records: {
    loading: boolean
    searchText: string
    selectedIds: string[]
    visibleItems: unknown[]
  }
}

const projectBuilderSessions = (builders: ProjectableResource['editor']['builders']) =>
  Object.fromEntries(
    Object.entries(builders).map(([id, projection]) => [
      id,
      {
        hasBuilder: Boolean(projection.builder),
        version: projection.version,
      },
    ]),
  )

const projectResource = (resource: ProjectableResource) => ({
  editor: {
    builders: projectBuilderSessions(resource.editor.builders),
  },
  records: {
    loading: resource.records.loading,
    searchText: resource.records.searchText,
    selectedIds: resource.records.selectedIds,
    visibleItems: resource.records.visibleItems,
  },
})
export const createApplicationSnapshot = () => {
  const state = application.getState()
  const agentSnapshot = state.agent.chat.snapshot

  return {
    agent: {
      chat: {
        errorMessage: state.agent.chat.errorMessage,
        isBootstrapping: state.agent.chat.isBootstrapping,
        isLoading: state.agent.chat.isLoading,
        isOpeningConversation: state.agent.chat.isOpeningConversation,
        isRunning: agentSnapshot.isRunning,
        messageCount: agentSnapshot.messages.length,
        modelId: agentSnapshot.modelId,
        thinkingLevel: agentSnapshot.thinkingLevel,
        usageText: agentSnapshot.usageText,
      },
      conversations: {
        activeId: state.agent.conversations.activeId,
        isInitialized: state.agent.conversations.isInitialized,
        isLoading: state.agent.conversations.isLoading,
        items: state.agent.conversations.items,
      },
      model: {
        options: state.agent.model.options,
        selectedId: state.agent.model.selectedId,
        thinkingLevel: state.agent.model.thinkingLevel,
      },
      panel: {
        collapsed: state.agent.panel.collapsed,
        floatingPosition: state.agent.panel.floatingPosition,
        mode: state.agent.panel.mode,
        width: state.agent.panel.width,
      },
    },
    chart: projectResource(state.chart),
    i18n: {
      locale: state.i18n.locale,
    },
    insight: projectResource(state.insight),
    layout: {
      sidebar: {
        collapsed: state.layout.sidebar.collapsed,
        width: state.layout.sidebar.width,
      },
      sidePanel: {
        collapsed: state.layout.sidePanel.collapsed,
        floatingPosition: state.layout.sidePanel.floatingPosition,
        mode: state.layout.sidePanel.mode,
        width: state.layout.sidePanel.width,
      },
      workspacePlacement: {
        value: state.layout.workspacePlacement.value,
      },
    },
    theme: {
      mode: state.theme.mode,
    },
  }
}
