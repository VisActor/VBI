import { requireRemoteResourceId } from './collaboration'
import { requestRemote } from './http'
import type {
  ProviderResource,
  RemoteBuilderState,
  RemoteSessionConnection,
  ResourceCreateInput,
  VBIProviderClientOptions,
} from '../types'

interface ResourceApiInput<TSummary extends ProviderResource> {
  config: VBIProviderClientOptions
  label: string
  path: string
  state: RemoteBuilderState<unknown>
  toSummary(response: ProviderResource): TSummary
}

export const pickResourceSummary = <TResource extends ProviderResource>({
  createdAt,
  id,
  name,
  updatedAt,
}: TResource): ProviderResource => ({
  createdAt,
  id,
  name,
  updatedAt,
})

export const createRemoteResourceApi = <
  TResponse extends ProviderResource,
  TSummary extends ProviderResource,
  TCreateInput extends ResourceCreateInput = ResourceCreateInput,
>({
  config,
  label,
  path,
  state,
  toSummary,
}: ResourceApiInput<TSummary>) => {
  const requireId = () => requireRemoteResourceId(state, label)
  const resourcePath = () => `${path}/${requireId()}`
  const getResponse = () => requestRemote<TResponse>(config, resourcePath())

  return {
    create: async (input?: TCreateInput) => {
      const created = await requestRemote<ProviderResource>(config, path, { body: input, method: 'POST' })
      state.resourceId = created.id
      return toSummary(await getResponse())
    },
    getResponse,
    getSession: () => requestRemote<RemoteSessionConnection>(config, `${resourcePath()}/collaboration`),
    getSummary: async () => toSummary(await getResponse()),
    remove: async () => toSummary(await requestRemote<ProviderResource>(config, resourcePath(), { method: 'DELETE' })),
    rename: async (name: string) =>
      toSummary(await requestRemote<ProviderResource>(config, resourcePath(), { body: { name }, method: 'PATCH' })),
  }
}
