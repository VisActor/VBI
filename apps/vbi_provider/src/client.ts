import { createRemoteChartProvider } from './chart/remote-provider'
import { createRemoteInsightProvider } from './insight/remote-provider'
import { requestRemote } from './remote/http'
import type { ChartSummary, InsightSummary, VBIProviderClient, VBIProviderClientOptions } from './types'

export const createVBIProviderClient = (config: VBIProviderClientOptions): VBIProviderClient => {
  return {
    chart: (id?: string) => createRemoteChartProvider(config, id),
    insight: (id?: string) => createRemoteInsightProvider(config, id),
    listCharts: () => requestRemote<ChartSummary[]>(config, '/charts'),
    listInsights: () => requestRemote<InsightSummary[]>(config, '/insights'),
  }
}
