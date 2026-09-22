import type * as Y from 'yjs'
import type { ObserveCallback } from 'src/types'
import { zVBIDashboardTheme } from 'src/types/dashboardDSL/meta'

/**
 * @description 仪表盘主题构建器。保存主题名称，具体样式由渲染层注册和解析。
 */
export class DashboardThemeBuilder {
  constructor(private dsl: Y.Map<any>) {}

  /**
   * @description 监听本地、撤销和协同同步引起的主题变化，返回取消监听的函数。
   * @param callback - 主题变化回调
   */
  observe(callback: ObserveCallback): () => void {
    const listener: ObserveCallback = (event, transaction) => {
      const change = event.changes.keys.get('meta')
      if (change && (change.oldValue?.theme ?? 'light') !== this.getTheme()) {
        callback(event, transaction)
      }
    }
    this.dsl.observe(listener)
    return () => this.dsl.unobserve(listener)
  }

  /**
   * @description 设置主题名称，支持 light、dark 或已注册的自定义主题，不修改引用的图表资源。
   * @param theme - 非空主题名称
   */
  setTheme(theme: string): void {
    const name = zVBIDashboardTheme.parse(theme)
    if (name === this.getTheme()) return
    this.dsl.set('meta', { ...this.dsl.get('meta'), theme: name })
  }

  /** @description 获取主题名称，默认 light。 */
  getTheme(): string {
    return this.dsl.get('meta')?.theme ?? 'light'
  }

  /** @description 导出主题名称。 */
  toJSON(): string {
    return this.getTheme()
  }
}
