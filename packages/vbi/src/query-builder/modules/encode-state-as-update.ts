import * as Y from 'yjs'

export const encodeDocStateAsUpdate = (doc: Y.Doc, targetStateVector?: Uint8Array) => {
  return Y.encodeStateAsUpdate(doc, targetStateVector)
}
