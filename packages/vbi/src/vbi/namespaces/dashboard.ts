import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIDashboardBuilderOptions, VBIChartBuilderOptions } from 'src/types'
import { createEmptyDashboard } from '../create-empty-dashboard'
import { createDashboardBuilderFromVBIDashboardDSLInput } from '../from/from-vbi-dashboard-dsl-input'
import type { VBIResourceRegistry } from '../resources/resource-registry'
import type { VBIDashboardNamespace } from '../types'
import { mergeChartBuilderOptions } from './chart'

const mergeDashboardBuilderOptions = <TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL>(
  base?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>,
  overrides?: VBIDashboardBuilderOptions<TQueryDSL, TSeedDSL>,
) => {
  const chart = mergeChartBuilderOptions(base, overrides?.chart)
  return { ...overrides, chart }
}

export const createVBIDashboardNamespace = <TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL>(
  defaultBuilderOptions: VBIChartBuilderOptions<TQueryDSL, TSeedDSL> | undefined,
  resourceRegistry: VBIResourceRegistry<TQueryDSL, TSeedDSL>,
): VBIDashboardNamespace<TQueryDSL, TSeedDSL> => ({
  create: (dashboard, builderOptions) => {
    const options = mergeDashboardBuilderOptions(defaultBuilderOptions, builderOptions)
    return createDashboardBuilderFromVBIDashboardDSLInput<TQueryDSL, TSeedDSL>(dashboard, options, resourceRegistry)
  },
  createEmpty: createEmptyDashboard,
})
