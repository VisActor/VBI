export interface ProviderResource {
  id: string
  name: string | null
  createdAt: string
  updatedAt: string
}

export interface ResourceCreateInput {
  name?: string
}

export interface ResourceSnapshot<TDSL> {
  resource: ProviderResource
  dsl: TDSL
}
