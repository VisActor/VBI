import { withApiErrorToast } from './apiClient'
import { requestProvider } from './providerHttp'
import { getResourceLabel, tRuntime } from '../i18n/runtime'
import type { ResourceItem, ResourceKind } from '../types'

const resourcePaths = {
  chart: '/charts',
  insight: '/insights',
} satisfies Record<ResourceKind, string>

const requestResource = <T>(kind: ResourceKind, path = '', init?: { body?: unknown; method?: string }) =>
  requestProvider<T>(`${resourcePaths[kind]}${path}`, init)

type ResourceCreateInput = {
  name: string
}

export const listResources = (kind: ResourceKind) =>
  withApiErrorToast(
    requestResource<ResourceItem[]>(kind),
    tRuntime('api.listFailed', { resource: getResourceLabel(kind) }),
  )

export const createResource = (kind: ResourceKind, name: string) =>
  withApiErrorToast(
    requestResource<ResourceItem>(kind, '', { body: { name } satisfies ResourceCreateInput, method: 'POST' }),
    tRuntime('api.createFailed', { resource: getResourceLabel(kind) }),
  )

export const renameResource = (kind: ResourceKind, id: string, name: string) =>
  withApiErrorToast(
    requestResource<ResourceItem>(kind, `/${id}`, { body: { name }, method: 'PATCH' }),
    tRuntime('api.saveFailed', { resource: getResourceLabel(kind) }),
  )

export const removeResource = (kind: ResourceKind, id: string) =>
  withApiErrorToast(
    requestResource<ResourceItem>(kind, `/${id}`, { method: 'DELETE' }),
    tRuntime('api.deleteFailed', { resource: getResourceLabel(kind) }),
  )
