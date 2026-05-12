import * as Y from 'yjs'

import type { VBIDashboardMeta, VBISetDashboardMetaInput } from 'src/types'
import { getOrCreateDashboardMeta } from 'src/vbi/from'

const stripUndefined = <T extends object>(input: T): Partial<T> => {
  const result: Partial<T> = {}
  for (const [key, value] of Object.entries(input) as [keyof T, T[keyof T]][]) {
    if (value !== undefined) {
      result[key] = value
    }
  }
  return result
}

export class DashboardMetaBuilder {
  constructor(
    private doc: Y.Doc,
    private dsl: Y.Map<any>,
  ) {
    doc.transact(() => {
      getOrCreateDashboardMeta(this.dsl)
    })
  }

  set(patch: VBISetDashboardMetaInput): this {
    const sanitizedPatch = stripUndefined(patch)

    this.doc.transact(() => {
      const meta = getOrCreateDashboardMeta(this.dsl)
      for (const [key, value] of Object.entries(sanitizedPatch)) {
        meta.set(key, value)
      }
    })

    return this
  }

  get(): VBIDashboardMeta {
    return this.toJSON()
  }

  toJSON(): VBIDashboardMeta {
    return getOrCreateDashboardMeta(this.dsl).toJSON() as VBIDashboardMeta
  }
}
