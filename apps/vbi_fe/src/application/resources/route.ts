import type { ResourceKind } from '../../types'
import { resolveApplicationRoute } from '../routing/route'

export const resolveResourceDetailRoute = (kind: ResourceKind, id: string) =>
  resolveApplicationRoute({ name: kind === 'chart' ? 'chartDetail' : 'insightDetail', id })

export const resolveResourceListRoute = (kind: ResourceKind) => resolveApplicationRoute({ name: kind })
