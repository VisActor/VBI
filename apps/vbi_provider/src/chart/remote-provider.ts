import { VBIChartBuilder, type VBIChartDSL } from '@visactor/vbi'
import { createChartRemoteApi } from './remote-api'
import { createRemoteBuilderCore } from '../remote/builder-provider'
import type { ChartProvider, ChartSummary, VBIProviderClientOptions } from '../types'

export const createRemoteChartProvider = (config: VBIProviderClientOptions, resourceId?: string): ChartProvider => {
  const core = createRemoteBuilderCore<
    VBIChartBuilder,
    VBIChartDSL,
    ChartSummary,
    ReturnType<typeof createChartRemoteApi>
  >({
    config,
    createApi: (state) => createChartRemoteApi(config, state),
    createBuilder: (doc) => new VBIChartBuilder(doc),
    resourceId,
  })

  return {
    getResourceId: core.getResourceId,
    create: core.api.create,
    remove: core.remove,
    rename: core.api.rename,
    open: core.getBuilder,
    close: core.close,
    getBuilder: core.getBuilder,
    getCollaborationProvider: core.getCollaborationProvider,
    getSummary: core.api.getSummary,
    getDetail: () => (core.state.builder ? core.getLocalDetail() : core.api.getDetail()),
    snapshot: () => (core.state.builder ? core.getLocalSnapshot() : core.api.getSnapshot()),
  }
}
