import type { VBIChartBuilder } from '@visactor/vbi'
import { useCallback } from 'react'
import { useBuilderDocState } from '../../../hooks/useBuilderDocState'
import type { RootOperator } from '../common/ShelfRootOperatorButton'

export const useFilterRootOperator = (params: { builder: VBIChartBuilder | undefined; type: 'where' | 'having' }) => {
  const { builder, type } = params

  const operator = useBuilderDocState<RootOperator>({
    builder,
    fallback: 'and',
    getSnapshot: (activeBuilder) => activeBuilder[type === 'where' ? 'whereFilter' : 'havingFilter'].getOperator(),
  })

  const setOperator = useCallback(
    (nextOperator: RootOperator) => {
      if (!builder || nextOperator === operator) {
        return
      }

      builder[type === 'where' ? 'whereFilter' : 'havingFilter'].setOperator(nextOperator)
    },
    [builder, operator, type],
  )

  return {
    operator,
    setOperator,
  }
}
