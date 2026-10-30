import type * as Y from 'yjs'
import { id } from 'src/utils/id'

const UUID_KEY = 'uuid'

export const ensureResourceUUID = (dsl: Y.Map<any>): string => {
  const uuid = dsl.get(UUID_KEY)
  if (typeof uuid === 'string' && uuid.length > 0) {
    return uuid
  }
  const nextUUID = id.resourceUUID()
  dsl.set(UUID_KEY, nextUUID)
  return nextUUID
}

export const getResourceUUID = (dsl: Y.Map<any>): string => {
  const uuid = dsl.get(UUID_KEY)
  if (typeof uuid !== 'string' || uuid.length === 0) {
    throw new Error('Resource UUID has not been initialized')
  }
  return uuid
}
