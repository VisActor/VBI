import { IndexedDBAdapter, InMemoryAdapter } from './adapters'
import { InMemoryQueryAdapter } from './adapters/query/in-memory/adapter'
import { VQuery as VQueryCore } from './VQuery'
import type { VQueryOptions } from './types'

export class VQuery extends VQueryCore {
  constructor({ enableIndexedDB = false }: VQueryOptions = {}) {
    super(new InMemoryQueryAdapter(), enableIndexedDB ? new IndexedDBAdapter() : new InMemoryAdapter())
  }
}
