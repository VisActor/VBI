import { useCallback } from 'react'
import type { VBIChartBuilder, VBIWhereClause } from '@visactor/vbi'
import { isVBIFilter } from '@visactor/vbi'
import { useBuilderDocState } from './useBuilderDocState'

export const useVBIWhereFilter = (builder: VBIChartBuilder | undefined) => {
  const filters = useBuilderDocState({
    builder,
    fallback: [] as VBIWhereClause[],
    getSnapshot: (activeBuilder) => activeBuilder.whereFilter.toJSON().conditions as VBIWhereClause[],
  })
  const rootOperator = useBuilderDocState({
    builder,
    fallback: 'and' as 'and' | 'or',
    getSnapshot: (activeBuilder) => activeBuilder.whereFilter.getOperator(),
  })

  const replaceFilters = useCallback(
    (nextFilters: { field: string; operator: string; value: unknown }[]) => {
      if (!builder) {
        return
      }

      builder.doc.transact(() => {
        builder.whereFilter.clear()
        nextFilters.forEach((filter) => {
          builder.whereFilter.add(filter.field, (node) => {
            node.setOperator(filter.operator)
            node.setValue(filter.value)
          })
        })
      })
    },
    [builder],
  )

  const setRootOperator = useCallback(
    (operator: 'and' | 'or') => {
      builder?.whereFilter.setOperator(operator)
    },
    [builder],
  )

  return {
    filters,
    flatFilters: filters.filter(isVBIFilter),
    rootOperator,
    setRootOperator,
    replaceFilters,
  }
}
