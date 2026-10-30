import * as Y from 'yjs'

export function createHavingGroup(op: 'and' | 'or' = 'and', groupId = 'root'): Y.Map<any> {
  const yMap = new Y.Map<any>()
  yMap.set('id', groupId)
  yMap.set('op', op)
  yMap.set('conditions', new Y.Array<any>())
  return yMap
}

export type HavingEntryMatch = {
  collection: Y.Array<any>
  index: number
  item: Y.Map<any>
}

export function isHavingGroup(yMap: Y.Map<any>): boolean {
  return yMap.get('op') !== undefined && yMap.get('conditions') !== undefined
}

export function findEntry(collection: Y.Array<any>, entryId: string): HavingEntryMatch | undefined {
  const items = collection.toArray() as Y.Map<any>[]

  for (let index = 0; index < items.length; index++) {
    const item = items[index]

    if (item.get('id') === entryId) {
      return { collection, index, item }
    }

    if (isHavingGroup(item)) {
      const nestedCollection = item.get('conditions') as Y.Array<any>
      const nestedMatch = findEntry(nestedCollection, entryId)
      if (nestedMatch) {
        return nestedMatch
      }
    }
  }

  return undefined
}
