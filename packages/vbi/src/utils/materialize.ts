import * as Y from 'yjs'

/**
 * 将JavaScript对象转换为Yjs数据结构
 * @param value - 要转换的值
 * @returns 转换后的Yjs对象或原值
 */
export function materialize(value: any): any {
  // 处理null和undefined
  if (value === null || value === undefined) {
    return value
  }

  // 处理基本类型
  if (typeof value !== 'object') {
    return value
  }

  // 处理数组 -> Y.Array
  if (Array.isArray(value)) {
    const yArray = new Y.Array()
    value.forEach((item) => {
      yArray.push([materialize(item)])
    })
    return yArray
  }

  // 处理普通对象 -> Y.Map
  const yMap = new Y.Map()
  Object.entries(value).forEach(([key, val]) => {
    yMap.set(key, materialize(val))
  })
  return yMap
}

/**
 * 将Yjs数据结构转换为JavaScript对象
 * @param value - 要转换的值
 * @returns 转换后的JavaScript对象
 */
export function hydrate(value: any): any {
  // 处理null和undefined
  if (value === null || value === undefined) {
    return value
  }

  // 处理Y.Map
  if (value instanceof Y.Map) {
    const obj: Record<string, any> = {}
    value.forEach((val, key) => {
      obj[key] = hydrate(val)
    })
    return obj
  }

  // 处理Y.Array
  if (value instanceof Y.Array) {
    const arr: any[] = []
    value.forEach((val) => {
      arr.push(hydrate(val))
    })
    return arr
  }

  // 基本类型直接返回
  return value
}
