import type { buildPipe } from './types'

const toOrderItem = (node: { id: string; sort?: { order: 'asc' | 'desc' } }) => ({
  field: node.id,
  order: node.sort?.order,
})

export const buildOrderBy: buildPipe = (queryDSL, context) => {
  const result = { ...queryDSL }
  const { dimensions, measures, calculations = [] } = context.vbiDSL
  const sortedNodes = [...dimensions, ...measures, ...calculations].filter((node) => node.sort)

  if (sortedNodes.length > 0) {
    result.orderBy = sortedNodes.map(toOrderItem)
    return result
  }

  const firstDimension = dimensions[0]
  if (firstDimension) {
    result.orderBy = [{ field: firstDimension.id, order: 'asc' }]
  }

  return result
}
