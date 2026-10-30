import * as Y from 'yjs'
import { id } from 'src/utils/id'

export const getOrCreateDimensions = (dsl: Y.Map<any>): Y.Array<any> => {
  const dimensions = dsl.get('dimensions')
  if (dimensions instanceof Y.Array) {
    return dimensions
  }

  const yDimensions = new Y.Array<any>()
  dsl.set('dimensions', yDimensions)
  return yDimensions
}

export const normalizeDimensionNodeIds = (dimensions: Y.Array<any>) => {
  dimensions.toArray().forEach((item: any) => {
    if (item instanceof Y.Map && typeof item.get('field') === 'string' && !item.get('id')) {
      item.set('id', id.uuid())
    }
  })
}

export const locateDimensionIndexById = (dimensions: Y.Array<any>, dimensionId: string): number => {
  return dimensions.toArray().findIndex((item: any) => item.get('id') === dimensionId)
}
