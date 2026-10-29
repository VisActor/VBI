import { useCallback } from 'react'
import type { VBIChartBuilder, VBIHavingAggregate, VBIHavingClause } from '@visactor/vbi'
import { useBuilderDocState } from './useBuilderDocState'

export const useVBIHavingFilter = (builder: VBIChartBuilder | undefined) => {
  const filters = useBuilderDocState({
    builder,
    fallback: [] as VBIHavingClause[],
    getSnapshot: (activeBuilder) => activeBuilder.havingFilter.toJSON().conditions as VBIHavingClause[],
  })
  const rootOperator = useBuilderDocState({
    builder,
    fallback: 'and' as 'and' | 'or',
    getSnapshot: (activeBuilder) => activeBuilder.havingFilter.getOperator(),
  })

  const replaceFilters = useCallback(
    (
      nextFilters: Array<{
        field: string
        aggregate: VBIHavingAggregate
        operator: string
        value: unknown
      }>,
    ) => {
      if (!builder) {
        return
      }

      builder.doc.transact(() => {
        builder.havingFilter.clear()
        nextFilters.forEach((filter) => {
          builder.havingFilter.add(filter.field, (node) => {
            node.setAggregate(filter.aggregate)
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
      builder?.havingFilter.setOperator(operator)
    },
    [builder],
  )

  return {
    filters,
    rootOperator,
    setRootOperator,
    replaceFilters,
  }
}
