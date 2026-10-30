import * as Y from 'yjs'

export const applyUpdateToDoc = (doc: Y.Doc, update: Uint8Array, transactionOrigin?: any) => {
  Y.applyUpdate(doc, update, transactionOrigin)
}
