import type { ObserveCallback } from 'src/types/builder/observe'
import type * as Y from 'yjs'

/**
 * @description 数据量限制构建器，用于设置和获取当前 limit
 */
export class LimitBuilder {
  private dsl: Y.Map<any>

  /**
   * @description 构造函数
   */
  constructor(_doc: Y.Doc, dsl: Y.Map<any>) {
    this.dsl = dsl
  }

  /**
   * @description 监听 limit 变化，返回取消监听的函数
   * @param callback - 回调函数
   * @returns 取消监听的函数
   */
  observe(callback: ObserveCallback): () => void {
    const wrapper: ObserveCallback = (e, trans) => {
      if (e.keysChanged.has('limit')) {
        callback(e, trans)
      }
    }
    this.dsl.observe(wrapper)
    return () => {
      this.dsl.unobserve(wrapper)
    }
  }

  /**
   * @description 设置 limit
   * @param limit - 数据量限制
   */
  setLimit(limit: number) {
    this.dsl.set('limit', limit)
  }

  /**
   * @description 获取当前 limit
   */
  getLimit(): number | undefined {
    return this.dsl.get('limit')
  }

  /**
   * @description 导出为 JSON
   */
  toJSON(): number | undefined {
    return this.getLimit()
  }
}
