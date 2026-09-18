import type { ApplicationRouteMatch, ApplicationRouteTarget } from './contract'

const agentConversationRoutePrefix = '/agent/'
const manageResourceRoutes = {
  chart: {
    legacyListPath: '/manage/charts',
    listPath: '/manage/chart',
  },
  insight: {
    legacyListPath: '/manage/insights',
    listPath: '/manage/insight',
  },
} as const

const readRouteId = (pathname: string, prefix: string) => {
  const segment = pathname.slice(prefix.length).split('/')[0] ?? ''
  try {
    return decodeURIComponent(segment)
  } catch {
    return segment
  }
}

export const resolveApplicationRoute = (target: ApplicationRouteTarget) => {
  if (typeof target === 'string') return target

  switch (target.name) {
    case 'agent':
      return target.conversationId ? `/agent/${encodeURIComponent(target.conversationId)}` : '/agent'
    case 'chartDetail':
      return `${manageResourceRoutes.chart.listPath}/${encodeURIComponent(target.id)}`
    case 'chart':
      return manageResourceRoutes.chart.listPath
    case 'insightDetail':
      return `${manageResourceRoutes.insight.listPath}/${encodeURIComponent(target.id)}`
    case 'insight':
      return manageResourceRoutes.insight.listPath
  }
}

export const matchApplicationRoute = (pathname: string): ApplicationRouteMatch => {
  if (pathname === '/' || pathname === '/manage') return { name: 'chart' }
  if (isAgentRoute(pathname)) {
    return {
      name: 'agent',
      conversationId: readAgentConversationRouteId(pathname) || undefined,
    }
  }
  if (pathname === manageResourceRoutes.chart.listPath || pathname === manageResourceRoutes.chart.legacyListPath) {
    return { name: 'chart' }
  }
  if (pathname.startsWith(`${manageResourceRoutes.chart.listPath}/`)) {
    return { name: 'chartDetail', id: readRouteId(pathname, `${manageResourceRoutes.chart.listPath}/`) }
  }
  if (pathname.startsWith(`${manageResourceRoutes.chart.legacyListPath}/`)) {
    return { name: 'chartDetail', id: readRouteId(pathname, `${manageResourceRoutes.chart.legacyListPath}/`) }
  }
  if (pathname === manageResourceRoutes.insight.listPath || pathname === manageResourceRoutes.insight.legacyListPath) {
    return { name: 'insight' }
  }
  if (pathname.startsWith(`${manageResourceRoutes.insight.listPath}/`)) {
    return { name: 'insightDetail', id: readRouteId(pathname, `${manageResourceRoutes.insight.listPath}/`) }
  }
  if (pathname.startsWith(`${manageResourceRoutes.insight.legacyListPath}/`)) {
    return { name: 'insightDetail', id: readRouteId(pathname, `${manageResourceRoutes.insight.legacyListPath}/`) }
  }
  return { name: 'chart' }
}

export const canonicalizeApplicationPathname = (pathname: string) => {
  const legacyResourceRoute = Object.values(manageResourceRoutes).find(
    (route) => pathname === route.legacyListPath || pathname.startsWith(`${route.legacyListPath}/`),
  )

  if (!legacyResourceRoute) return pathname
  return `${legacyResourceRoute.listPath}${pathname.slice(legacyResourceRoute.legacyListPath.length)}`
}

export const matchRouteBranch = (pathname: string, route: string) =>
  pathname === route || pathname.startsWith(`${route}/`)

export const isNewConversationRoute = (pathname: string) => pathname === '/agent' || pathname === '/manage/agent'

export const createAgentConversationRoute = (conversationId: string) =>
  `${agentConversationRoutePrefix}${encodeURIComponent(conversationId)}`

export const readAgentConversationRouteId = (pathname: string) => {
  if (!pathname.startsWith(agentConversationRoutePrefix)) return ''
  return readRouteId(pathname, agentConversationRoutePrefix)
}

export const isAgentConversationRoute = (pathname: string, conversationId?: string) => {
  const routeConversationId = readAgentConversationRouteId(pathname)

  if (!conversationId) return Boolean(routeConversationId)
  return routeConversationId === conversationId
}

export const isAgentRoute = (pathname: string) => isNewConversationRoute(pathname) || isAgentConversationRoute(pathname)
