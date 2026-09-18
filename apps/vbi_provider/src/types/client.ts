import type { ChartProvider, ChartSummary } from './chart'
import type { InsightProvider, InsightSummary } from './insight'

export interface RemoteRequestInit {
  body?: string
  headers?: Record<string, string>
  method?: string
}

export interface RemoteResponse {
  json(): Promise<unknown>
  ok: boolean
  status: number
  text(): Promise<string>
}

export type RemoteFetch = (url: string, init?: RemoteRequestInit) => Promise<RemoteResponse>
export type RemoteHeaders = Record<string, string>
export type RemoteHeadersFactory = () => Promise<RemoteHeaders> | RemoteHeaders

export interface VBIProviderClient {
  chart(id?: string): ChartProvider
  insight(id?: string): InsightProvider
  listCharts(): Promise<ChartSummary[]>
  listInsights(): Promise<InsightSummary[]>
}

export interface VBIProviderClientOptions {
  baseUrl: string
  fetch?: RemoteFetch
  headers?: RemoteHeaders | RemoteHeadersFactory
  syncTimeoutMs?: number
  webSocketPolyfill?: unknown
}
