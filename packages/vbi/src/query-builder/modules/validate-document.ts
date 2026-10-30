import * as Y from 'yjs'
import { zVBIQueryDSL } from 'src/types/queryDSL'

const validateGroup = (group: unknown): void => {
  if (!(group instanceof Y.Map) || !(group.get('conditions') instanceof Y.Array)) {
    throw new Error('Query filter groups must use Y.Map and Y.Array containers')
  }
  for (const node of group.get('conditions').toArray()) {
    if (!(node instanceof Y.Map)) throw new Error('Query filters must use Y.Map containers')
    if (node.has('conditions')) validateGroup(node)
  }
}

/** @description 校验已有协作文档，禁止绑定时用空容器覆盖原生 JSON 数据。 */
export const validateQueryDocument = (dsl: Y.Map<any>): void => {
  zVBIQueryDSL.parse(dsl.toJSON())
  for (const key of ['dimensions', 'measures']) {
    const fields = dsl.get(key)
    if (!(fields instanceof Y.Array) || fields.toArray().some((node) => !(node instanceof Y.Map))) {
      throw new Error('Query fields must use Y.Array and Y.Map containers')
    }
  }
  const calculations = dsl.get('calculations')
  if (
    calculations !== undefined &&
    (!(calculations instanceof Y.Array) || calculations.toArray().some((node) => !(node instanceof Y.Map)))
  )
    throw new Error('Query calculations must use Y.Array and Y.Map containers')
  validateGroup(dsl.get('whereFilter'))
  validateGroup(dsl.get('havingFilter'))
}
