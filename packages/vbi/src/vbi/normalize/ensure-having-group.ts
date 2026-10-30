import type * as Y from 'yjs'
import { createHavingGroup } from 'src/query-builder/features/havingFilter/having-utils'
import { ensureYArray } from './ensure-y-array'
import type { FilterGroupInput } from './types'

export const ensureHavingGroup = (havingFilter?: unknown): Y.Map<any> => {
  const source = (havingFilter as FilterGroupInput) ?? { id: 'root', op: 'and', conditions: [] }
  const havingGroup = createHavingGroup()

  havingGroup.set('id', source.id)
  havingGroup.set('op', source.op)
  havingGroup.set('conditions', ensureYArray(source.conditions, true))

  return havingGroup
}
