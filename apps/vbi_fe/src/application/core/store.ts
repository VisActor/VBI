import { agentApplicationStore } from '../agent/store'
import type { AgentApplication } from '../agent/contract'
import { chartApplicationStore } from '../chart/store'
import type { ChartApplication } from '../chart/contract'
import { i18nApplicationStore } from '../i18n/store'
import type { I18nApplication } from '../i18n/contract'
import { insightApplicationStore } from '../insight/store'
import type { InsightApplication } from '../insight/contract'
import type { LayoutApplication } from '../layout/contract'
import { layoutApplicationStore } from '../layout/store'
import { themeApplicationStore } from '../theme/store'
import type { ThemeApplication } from '../theme/contract'
import { applicationObjectIs } from './equality'

export type ApplicationSelector<TSelected> = (state: ApplicationState) => TSelected

export type ApplicationEquality<TSelected> = (left: TSelected, right: TSelected) => boolean

export type ApplicationHookOptions<TSelected> = {
  equality?: ApplicationEquality<TSelected>
}

export type ApplicationCleanup = () => void

export type ApplicationState = {
  agent: AgentApplication
  chart: ChartApplication
  i18n: I18nApplication
  insight: InsightApplication
  layout: LayoutApplication
  theme: ThemeApplication
}

type ApplicationListener = () => void
type ApplicationSelectorListener<TSelected> = (selected: TSelected, previous: TSelected) => void
type ApplicationSubscribeOptions<TSelected> = {
  equalityFn?: ApplicationEquality<TSelected>
  fireImmediately?: boolean
}

const listeners = new Set<ApplicationListener>()

const createApplicationState = (): ApplicationState => ({
  agent: agentApplicationStore.getState(),
  chart: {
    activate: chartApplicationStore.getState().activate,
    create: chartApplicationStore.getState().create,
    delete: chartApplicationStore.getState().delete,
    editor: chartApplicationStore.getState().editor,
    list: chartApplicationStore.getState().list,
    open: chartApplicationStore.getState().open,
    records: chartApplicationStore.getState().records,
    rename: chartApplicationStore.getState().rename,
  },
  i18n: i18nApplicationStore.getState(),
  insight: {
    activate: insightApplicationStore.getState().activate,
    create: insightApplicationStore.getState().create,
    delete: insightApplicationStore.getState().delete,
    editor: insightApplicationStore.getState().editor,
    list: insightApplicationStore.getState().list,
    open: insightApplicationStore.getState().open,
    records: insightApplicationStore.getState().records,
    rename: insightApplicationStore.getState().rename,
  },
  layout: layoutApplicationStore.getState(),
  theme: themeApplicationStore.getState(),
})

const emitApplicationChange = () => {
  listeners.forEach((listener) => listener())
}

const bindApplicationSources = () => {
  agentApplicationStore.subscribe(emitApplicationChange)
  chartApplicationStore.subscribe(emitApplicationChange)
  i18nApplicationStore.subscribe(emitApplicationChange)
  insightApplicationStore.subscribe(emitApplicationChange)
  layoutApplicationStore.subscribe(emitApplicationChange)
  themeApplicationStore.subscribe(emitApplicationChange)
}

bindApplicationSources()

const subscribe = <TSelected>(
  selectorOrListener: ApplicationSelector<TSelected> | ApplicationListener,
  selectedListener?: ApplicationSelectorListener<TSelected>,
  options: ApplicationSubscribeOptions<TSelected> = {},
) => {
  if (!selectedListener) {
    const listener = selectorOrListener as ApplicationListener
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  const selector = selectorOrListener as ApplicationSelector<TSelected>
  const equality = options.equalityFn ?? applicationObjectIs
  let current = selector(createApplicationState())
  const listener = () => {
    const next = selector(createApplicationState())
    if (equality(current, next)) return
    const previous = current
    current = next
    selectedListener(next, previous)
  }

  listeners.add(listener)
  if (options.fireImmediately) selectedListener(current, current)
  return () => listeners.delete(listener)
}

export const application = {
  getInitialState: createApplicationState,
  getState: createApplicationState,
  setState: () => {
    throw new Error('application is a non-owning aggregate. Mutate a domain application store instead.')
  },
  subscribe,
}

export type Application = typeof application
