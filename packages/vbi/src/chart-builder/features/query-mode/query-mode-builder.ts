import type * as Y from 'yjs'
import type { ObserveCallback, VBIQueryMode } from 'src/types'
import { zVBIQueryMode } from 'src/types/chartDSL/queryMode'

/** @description 查询模式构建器。未配置时按 aggregate 查询；detail 仅用于普通表。 */
export class QueryModeBuilder {
  constructor(private dsl: Y.Map<any>) {}

  /** @description 设置查询模式，保留已有字段和筛选配置。 */
  setMode(mode: VBIQueryMode): this {
    this.dsl.set('queryMode', zVBIQueryMode.parse(mode))
    return this
  }

  /** @description 获取查询模式，未配置时返回 aggregate。 */
  getMode(): VBIQueryMode {
    return zVBIQueryMode.default('aggregate').parse(this.dsl.get('queryMode'))
  }

  /** @description 监听查询模式变化，返回取消监听的函数。 */
  observe(callback: ObserveCallback): () => void {
    const wrapper: ObserveCallback = (event, transaction) => {
      if (event.keysChanged.has('queryMode')) callback(event, transaction)
    }
    this.dsl.observe(wrapper)
    return () => this.dsl.unobserve(wrapper)
  }

  /** @description 导出当前查询模式。 */
  toJSON(): VBIQueryMode {
    return this.getMode()
  }
}
