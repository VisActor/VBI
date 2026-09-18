export type ResourceKind = 'chart' | 'insight'

export type ResourceItem = {
  id: string
  name: string | null
  createdAt: string
  updatedAt: string
}
