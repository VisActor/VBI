import { IndexedDBAdapter, InMemoryAdapter } from './adapters'
import { InMemoryQueryAdapter } from './adapters/query-adapter/inMemoryQueryAdapter'
import { VQuery as VQueryCore } from './VQuery'

export interface VQueryOptions {
  /** Persist datasets in IndexedDB. Defaults to false; requires IndexedDB support. */
  enableIndexedDB?: boolean
}

export class VQuery extends VQueryCore {
  constructor({ enableIndexedDB = false }: VQueryOptions = {}) {
    super(new InMemoryQueryAdapter(), enableIndexedDB ? new IndexedDBAdapter() : new InMemoryAdapter())
  }
}
