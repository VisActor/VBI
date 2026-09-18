export type ApplicationRouteName = 'agent' | 'chart' | 'chartDetail' | 'insight' | 'insightDetail'

export type ApplicationRouteTarget =
  | { name: 'agent'; conversationId?: string }
  | { name: 'chart' }
  | { name: 'chartDetail'; id: string }
  | { name: 'insight' }
  | { name: 'insightDetail'; id: string }
  | string

export type ApplicationRouteMatch =
  | { name: 'agent'; conversationId?: string }
  | { name: 'chart' }
  | { name: 'chartDetail'; id: string }
  | { name: 'insight' }
  | { name: 'insightDetail'; id: string }
