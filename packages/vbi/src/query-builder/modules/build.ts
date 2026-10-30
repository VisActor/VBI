import type * as Y from 'yjs'

/** @description 导出独立配置快照，空计算列按缺省配置保存。 */
export const buildQueryDocument = <TDSL>(dsl: Y.Map<any>): TDSL => {
  const snapshot = structuredClone(dsl.toJSON())
  if (snapshot.calculations?.length === 0) delete snapshot.calculations
  return snapshot as TDSL
}
