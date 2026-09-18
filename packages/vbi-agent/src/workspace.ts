import type { VBIChartBuilder, VBIInsightBuilder } from '@visactor/vbi'
import type { VBIAgentWorkspace, VBIWorkspaceConnectors, VBIWorkspaceSlot } from './types/index'

type Buildable = {
  build(): unknown
}

export type VBIWorkspaceSlotInput<TBuilder> = TBuilder | VBIWorkspaceSlot<TBuilder>

export interface VBIBuilderWorkspaceInput {
  chart?: VBIWorkspaceSlotInput<VBIChartBuilder>
  connectors?: VBIWorkspaceConnectors
  insight?: VBIWorkspaceSlotInput<VBIInsightBuilder>
}

const hasBuild = (value: unknown): value is Buildable =>
  typeof value === 'object' && value !== null && 'build' in value && typeof value.build === 'function'

const isWorkspaceSlot = <TBuilder>(value: VBIWorkspaceSlotInput<TBuilder>): value is VBIWorkspaceSlot<TBuilder> =>
  typeof value === 'object' && value !== null && 'open' in value && typeof value.open === 'function'

export const createStaticBuilderSlot = <TBuilder>(builder: TBuilder): VBIWorkspaceSlot<TBuilder> => ({
  open: async () => builder,
  snapshot: async () => (hasBuild(builder) ? { dsl: builder.build() } : undefined),
})

const toWorkspaceSlot = <TBuilder>(input: VBIWorkspaceSlotInput<TBuilder>): VBIWorkspaceSlot<TBuilder> =>
  isWorkspaceSlot(input) ? input : createStaticBuilderSlot(input)

export const createBuilderWorkspace = ({
  chart,
  connectors,
  insight,
}: VBIBuilderWorkspaceInput): VBIAgentWorkspace => ({
  ...(chart ? { chart: toWorkspaceSlot(chart) } : {}),
  ...(connectors ? { connectors } : {}),
  ...(insight ? { insight: toWorkspaceSlot(insight) } : {}),
})
