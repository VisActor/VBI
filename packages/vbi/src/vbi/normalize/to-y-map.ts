import * as Y from 'yjs'
import { id } from 'src/utils/id'

export type EnsureIdMode = boolean | 'field'

const shouldEnsureIdForObject = (obj: Record<string, any>, ensureId: EnsureIdMode): boolean => {
  if (ensureId === true) {
    return true
  }

  return ensureId === 'field' && typeof obj.field === 'string'
}

export const toYMap = (obj: Record<string, any>, ensureId: EnsureIdMode = false): Y.Map<any> => {
  const yMap = new Y.Map<any>()

  if (shouldEnsureIdForObject(obj, ensureId) && !obj.id) {
    yMap.set('id', id.uuid())
  }

  for (const [key, value] of Object.entries(obj)) {
    if ((key === 'conditions' || key === 'children') && Array.isArray(value)) {
      const yArr = new Y.Array<any>()
      for (const child of value) {
        yArr.push([toYMap(child as Record<string, any>, ensureId)])
      }
      yMap.set(key, yArr)
      continue
    }

    yMap.set(key, value)
  }

  return yMap
}
