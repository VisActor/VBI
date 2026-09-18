import { setCollaborativeUser } from '../../utils/collaboration'
import { chartApplicationStore } from '../chart/store'
import { insightApplicationStore } from '../insight/store'
import type { ResourceKind } from '../../types'
import type { BuilderByKind, BuilderStoreState } from './resource-builder.types'

type BuilderModelAdapter<TBuilder> = {
  getState(): BuilderStoreState<TBuilder>
}

const modelByKind: {
  [TKind in ResourceKind]: BuilderModelAdapter<BuilderByKind[TKind]>
} = {
  chart: chartApplicationStore,
  insight: insightApplicationStore,
}

const getBuilderModel = <TKind extends ResourceKind>(kind: TKind) =>
  modelByKind[kind] as BuilderModelAdapter<BuilderByKind[TKind]>

export const connectResourceSession = async (kind: ResourceKind, resourceId: string, userName: string) => {
  if (!resourceId) return
  const model = getBuilderModel(kind)
  model.getState().retain(resourceId)
  await model.getState().connect(resourceId)
  setCollaborativeUser(model.getState().sessions[resourceId]?.provider, userName)
}

export const releaseResourceSession = async (kind: ResourceKind, resourceId: string) => {
  if (!resourceId) return
  await getBuilderModel(kind).getState().release(resourceId)
}
