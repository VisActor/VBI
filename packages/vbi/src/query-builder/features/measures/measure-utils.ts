import * as Y from 'yjs'
import { id } from 'src/utils/id'

export const getOrCreateMeasures = (dsl: Y.Map<any>): Y.Array<any> => {
  const measures = dsl.get('measures')
  if (measures instanceof Y.Array) {
    return measures
  }

  const yMeasures = new Y.Array<any>()
  dsl.set('measures', yMeasures)
  return yMeasures
}

export const normalizeMeasureNodeIds = (measures: Y.Array<any>) => {
  measures.toArray().forEach((item: any) => {
    if (item instanceof Y.Map && typeof item.get('field') === 'string' && !item.get('id')) {
      item.set('id', id.uuid())
    }
  })
}

export const locateMeasureIndexById = (measures: Y.Array<any>, measureId: string): number => {
  return measures.toArray().findIndex((item: any) => item.get('id') === measureId)
}
