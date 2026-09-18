'use client'

import { useMemo } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { applicationShallowEqual, goApplicationPath, useApplication, useApplicationPathname } from '../../application'
import {
  ArrowLeftRight,
  BarChart3,
  FolderKanban,
  Lightbulb,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
} from '../../components/ui/icons'
import { Separator } from '../../components/ui/separator'
import { Tooltip } from '../../components/ui/tooltip'
import { useResizableWidth } from '../../hooks/useResizableWidth'
import { useTranslation } from '../../i18n'
import { cn } from '../../lib/utils'
import { AgentConversationSidebarSection } from '../agent/AgentConversationSidebarSection'
import { AgentChatSurface } from '../agent/AgentPage'
import { isAgentRoute, matchRouteBranch } from '../../application'
import { ManageRouteChromeProvider, useManageRouteChromeState } from './ManageRouteChrome'
import { ManageSidebarButton, ManageSidebarGroup, manageSidebarChildListClassName } from './ManageSidebarNav'
import { ManagePreferences } from './ManagePreferences'
import { WorkspaceCenterPane } from './WorkspaceCenterPane'
import { WorkspaceSidePanel } from './WorkspaceSidePanel'

const hideSidebarButtonClassName =
  'grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-md bg-transparent text-vbi-text-muted transition-[background-color,color,box-shadow] duration-150 ease-out hover:bg-vbi-hover-bg hover:text-vbi-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vbi-primary/35'
const placementToggleButtonClassName =
  'grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-md bg-transparent text-vbi-text-muted transition-[background-color,color,box-shadow] duration-150 ease-out hover:bg-vbi-hover-bg hover:text-vbi-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vbi-primary/35'
const sidebarRailButtonClassName =
  'grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-md border-0 bg-transparent text-vbi-text-muted transition-[background-color,color,box-shadow] duration-150 ease-out hover:bg-vbi-hover-bg hover:text-vbi-text-strong data-[active=true]:bg-vbi-active-bg data-[active=true]:text-vbi-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vbi-primary/35'
const sidebarResizeHandleClassName =
  'absolute bottom-0 right-0 top-0 z-10 w-2 translate-x-1/2 cursor-ew-resize touch-none bg-transparent outline-none max-[720px]:hidden'

export const ManageLayoutPage = ({ children }: { children: ReactNode }) => {
  return (
    <ManageRouteChromeProvider>
      <ManageLayoutContent>{children}</ManageLayoutContent>
    </ManageRouteChromeProvider>
  )
}

const ManageLayoutContent = ({ children }: { children: ReactNode }) => {
  const { activeConversationId, clearActiveConversation } = useApplication(
    (state) => ({
      activeConversationId: state.agent.conversations.activeId,
      clearActiveConversation: state.agent.chat.clear,
    }),
    { equality: applicationShallowEqual },
  )
  const { resetSidebarWidth, setSidebarCollapsed, setSidebarWidth, sidebarCollapsed, sidebarWidth } = useApplication(
    (state) => ({
      resetSidebarWidth: state.layout.sidebar.resetWidth,
      setSidebarCollapsed: state.layout.sidebar.setCollapsed,
      setSidebarWidth: state.layout.sidebar.setWidth,
      sidebarCollapsed: state.layout.sidebar.collapsed,
      sidebarWidth: state.layout.sidebar.width,
    }),
    { equality: applicationShallowEqual },
  )
  const { toggleWorkspacePlacement, workspacePlacement } = useApplication(
    (state) => ({
      toggleWorkspacePlacement: state.layout.workspacePlacement.toggle,
      workspacePlacement: state.layout.workspacePlacement.value,
    }),
    { equality: applicationShallowEqual },
  )
  const navigate = goApplicationPath
  const pathname = useApplicationPathname()
  const routeChrome = useManageRouteChromeState()
  const { t } = useTranslation()
  const resourceNavItems = [
    {
      href: '/manage/chart',
      icon: <BarChart3 className='h-4 w-4' />,
      label: t('nav.charts'),
    },
    {
      href: '/manage/insight',
      icon: <Lightbulb className='h-4 w-4' />,
      label: t('nav.insights'),
    },
  ]
  const activeResourceHref = resourceNavItems.find((item) => matchRouteBranch(pathname, item.href))?.href ?? ''
  const isResourcePath = Boolean(activeResourceHref)
  const isAgentPath = isAgentRoute(pathname)
  const showResourceWorkspace = !isAgentPath && children !== null && children !== undefined
  const isNewConversationActive = isAgentPath && !activeConversationId
  const currentPageLabel = resourceNavItems.find((item) => item.href === activeResourceHref)?.label ?? ''
  const resourceDetailBackHref = (() => {
    const [root, resource, id, ...rest] = pathname.split('/').filter(Boolean)
    if (root !== 'manage' || !id || rest.length) return ''
    if (!['chart', 'insight'].includes(resource ?? '')) return ''
    return `/manage/${resource}`
  })()
  const headerTitle = routeChrome.title ?? currentPageLabel
  const headerBackLabel = routeChrome.backLabel ?? (resourceDetailBackHref ? t('common.back') : undefined)
  const handleHeaderBack =
    routeChrome.onBack ?? (resourceDetailBackHref ? () => navigate(resourceDetailBackHref) : undefined)
  const agentLabel = t('nav.agent')
  const resizeSidebarLabel = t('layout.resizeSidebar')
  const showSidebarLabel = t('layout.showSidebar')
  const hideSidebarLabel = t('layout.hideSidebar')

  const handleNewConversation = () => {
    clearActiveConversation()
    navigate('/agent')
  }
  const swapWorkspaceLabel = t('layout.swapWorkspace')
  const placementToggle = showResourceWorkspace ? (
    <Tooltip side='left' title={swapWorkspaceLabel}>
      <button
        aria-label={swapWorkspaceLabel}
        className={placementToggleButtonClassName}
        data-workspace-placement-toggle=''
        type='button'
        onClick={toggleWorkspacePlacement}
      >
        <ArrowLeftRight className='h-3.5 w-3.5' aria-hidden='true' />
      </button>
    </Tooltip>
  ) : undefined
  const sidebarStyle = useMemo(
    () =>
      ({
        '--manage-sidebar-width': `${sidebarWidth}px`,
      }) as CSSProperties,
    [sidebarWidth],
  )
  const { resizeHandleProps: sidebarResizeHandleProps } = useResizableWidth({
    direction: 'right',
    disabled: sidebarCollapsed,
    onResize: setSidebarWidth,
    onReset: resetSidebarWidth,
    width: sidebarWidth,
  })
  const railItems = [
    {
      active: isNewConversationActive,
      icon: <Plus className='h-4 w-4' />,
      label: t('nav.newConversation'),
      onClick: handleNewConversation,
    },
    ...resourceNavItems.map((item) => ({
      active: activeResourceHref === item.href,
      icon: item.icon,
      label: item.label,
      onClick: () => navigate(item.href),
    })),
  ]
  const agentCenterPane = (
    <WorkspaceCenterPane
      key='agent-center'
      contentClassName='overflow-hidden p-0'
      contentKind='agent'
      slotControls={showResourceWorkspace ? placementToggle : undefined}
      title={agentLabel}
    >
      <AgentChatSurface className='h-full flex-1' />
    </WorkspaceCenterPane>
  )
  const resourceCenterPane = showResourceWorkspace ? (
    <WorkspaceCenterPane
      key='resource-center'
      actions={routeChrome.actions}
      backLabel={headerBackLabel}
      contentClassName={routeChrome.contentClassName}
      contentKind='resource'
      rename={routeChrome.rename}
      slotControls={placementToggle}
      title={headerTitle}
      onBack={handleHeaderBack}
    >
      {children}
    </WorkspaceCenterPane>
  ) : null
  const agentSidePanel = showResourceWorkspace ? (
    <WorkspaceSidePanel
      key='agent-side-panel'
      ariaLabel={agentLabel}
      contentClassName='overflow-hidden'
      contentKind='agent'
      title={agentLabel}
    >
      <AgentChatSurface className='h-full flex-1' />
    </WorkspaceSidePanel>
  ) : null
  const resourceSidePanel = showResourceWorkspace ? (
    <WorkspaceSidePanel
      key='resource-side-panel'
      actions={routeChrome.actions}
      backLabel={headerBackLabel}
      contentClassName={routeChrome.contentClassName}
      contentKind='resource'
      rename={routeChrome.rename}
      title={headerTitle}
      onBack={handleHeaderBack}
    >
      {children}
    </WorkspaceSidePanel>
  ) : null
  const centerPane = isAgentPath || workspacePlacement === 'agent-center' ? agentCenterPane : resourceCenterPane
  const sidePanel = isAgentPath ? null : workspacePlacement === 'agent-center' ? resourceSidePanel : agentSidePanel

  return (
    <div
      className='flex min-h-screen bg-vbi-bg text-vbi-text transition-colors duration-300 max-[720px]:flex-col'
      data-workspace-placement={isAgentPath ? 'agent-only' : workspacePlacement}
    >
      <aside
        aria-label={t('app.nav.primary')}
        className={cn(
          'vbi-static-sidebar sticky top-0 flex h-screen shrink-0 flex-col overflow-hidden border-r border-vbi-border bg-[color-mix(in_srgb,var(--vbi-control-muted)_58%,var(--vbi-secondary))] opacity-100 transition-[width,height,border-color,background-color] duration-300 ease-out max-[720px]:relative max-[720px]:h-auto max-[720px]:border-b max-[720px]:border-r-0',
          sidebarCollapsed
            ? 'w-11 max-[720px]:h-11 max-[720px]:w-full'
            : 'w-[var(--manage-sidebar-width)] max-[720px]:w-full',
        )}
        data-sidebar-collapsed={sidebarCollapsed}
        style={sidebarStyle}
      >
        {!sidebarCollapsed ? (
          <div aria-label={resizeSidebarLabel} className={sidebarResizeHandleClassName} {...sidebarResizeHandleProps} />
        ) : null}
        {sidebarCollapsed ? (
          <div
            className='flex h-full min-h-0 flex-col items-center gap-2 bg-[color-mix(in_srgb,var(--vbi-control-muted)_58%,var(--vbi-secondary))] px-1.5 py-3 transition-colors duration-300 max-[720px]:h-11 max-[720px]:flex-row max-[720px]:px-2 max-[720px]:py-1.5'
            data-manage-sidebar-rail=''
          >
            <Tooltip side='right' title={showSidebarLabel}>
              <button
                aria-label={showSidebarLabel}
                className={sidebarRailButtonClassName}
                type='button'
                onClick={() => setSidebarCollapsed(false)}
              >
                <PanelLeftOpen className='h-3.5 w-3.5' />
              </button>
            </Tooltip>
            {railItems.map((item) => (
              <Tooltip key={item.label} side='right' title={item.label}>
                <button
                  aria-label={item.label}
                  className={sidebarRailButtonClassName}
                  data-active={item.active}
                  type='button'
                  onClick={item.onClick}
                >
                  {item.icon}
                </button>
              </Tooltip>
            ))}
          </div>
        ) : (
          <>
            <div className='flex h-12 w-full shrink-0 items-center justify-between px-4 pt-3'>
              <div className='min-w-0 pl-1 text-[15px] font-semibold leading-8 text-vbi-text-strong'>VBI</div>
              <Tooltip side='right' title={hideSidebarLabel}>
                <button
                  aria-label={hideSidebarLabel}
                  className={hideSidebarButtonClassName}
                  type='button'
                  onClick={() => setSidebarCollapsed(true)}
                >
                  <PanelLeftClose className='h-3.5 w-3.5' />
                </button>
              </Tooltip>
            </div>
            <nav
              className='grid w-full shrink-0 gap-0.5 px-3 pt-2 max-[720px]:flex max-[720px]:gap-2 max-[720px]:overflow-x-auto max-[720px]:pb-3 max-[720px]:pt-1'
              aria-label={t('app.nav.primary')}
            >
              <ManageSidebarButton
                active={isNewConversationActive}
                icon={<Plus className='h-4 w-4' />}
                onClick={handleNewConversation}
              >
                {t('nav.newConversation')}
              </ManageSidebarButton>
              <ManageSidebarGroup
                autoExpandWhen={isResourcePath}
                defaultExpanded={isResourcePath}
                icon={<FolderKanban className='h-4 w-4' />}
                label={t('nav.resources')}
              >
                {({ expanded }) => (
                  <div className={manageSidebarChildListClassName}>
                    {resourceNavItems.map((item) => (
                      <ManageSidebarButton
                        active={activeResourceHref === item.href}
                        icon={item.icon}
                        key={item.href}
                        tabIndex={expanded ? undefined : -1}
                        onClick={() => navigate(item.href)}
                      >
                        {item.label}
                      </ManageSidebarButton>
                    ))}
                  </div>
                )}
              </ManageSidebarGroup>
            </nav>
            <div className='flex min-h-0 w-full flex-1 flex-col'>
              <Separator className='mt-4 max-[720px]:mt-0' />
              <AgentConversationSidebarSection />
              <ManagePreferences />
            </div>
          </>
        )}
      </aside>
      {centerPane}
      {sidePanel}
    </div>
  )
}
