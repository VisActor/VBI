import type * as Y from 'yjs'
import { createWhereGroup } from 'src/query-builder/features/whereFilter/where-utils'
import { ensureYArray } from './ensure-y-array'
import type { FilterGroupInput } from './types'

export const ensureWhereGroup = (whereFilter?: unknown): Y.Map<any> => {
  const source = (whereFilter as FilterGroupInput) ?? { id: 'root', op: 'and', conditions: [] }
  const whereGroup = createWhereGroup()

  whereGroup.set('id', source.id)
  whereGroup.set('op', source.op)
  whereGroup.set('conditions', ensureYArray(source.conditions, true))

  return whereGroup
}
