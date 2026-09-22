import type * as Y from 'yjs'
import type {
  ObserveCallback,
  VBIDashboardMeta,
  VBIDashboardThemeDefinition,
  VBIDashboardResolvedTheme,
  VBIDashboardThemeOption,
} from 'src/types'
import { zVBIDashboardTheme } from 'src/types/dashboardDSL/meta'
import { zVBIDashboardThemeDefinition } from 'src/types/dashboardDSL/theme'
import { presetDashboardThemes } from './presets'
import { ensureBuiltinTheme, registerVSeedTheme } from './vseed-theme'

/**
 * @description 仪表盘主题构建器。统一管理主题配置、预设、订阅与 VSeed 注册，组件只消费解析结果。
 */
export class DashboardThemeBuilder {
  constructor(private dsl: Y.Map<any>) {}

  /**
   * @description 监听本地、撤销和协同同步引起的主题名称或配置变化，返回取消监听的函数。
   * @param callback - 主题变化回调
   */
  observe(callback: ObserveCallback): () => void {
    const listener: ObserveCallback = (event, transaction) => {
      const change = event.changes.keys.get('meta')
      const meta = this.dsl.get('meta')
      if (
        change &&
        ((change.oldValue?.theme ?? 'light') !== this.getTheme() ||
          JSON.stringify(change.oldValue?.themes) !== JSON.stringify(meta?.themes))
      ) {
        callback(event, transaction)
      }
    }
    this.dsl.observe(listener)
    return () => this.dsl.unobserve(listener)
  }

  /**
   * @description 设置主题；传入配置时在同一次变更中保存配置并选中，无需预先注册，不修改引用的图表资源。
   * @param theme - 非空主题名称
   * @param definition - 可选的完整主题配置，保存于当前 Dashboard
   */
  setTheme(theme: string, definition?: VBIDashboardThemeDefinition): void {
    const name = zVBIDashboardTheme.parse(theme)
    const meta: VBIDashboardMeta = this.dsl.get('meta')
    this.updateMeta({
      ...meta,
      theme: name,
      ...(definition !== undefined
        ? { themes: { ...meta.themes, [name]: zVBIDashboardThemeDefinition.parse(definition) } }
        : {}),
    })
  }

  /**
   * @description 在当前 Dashboard 中注册或更新主题配置，不切换当前主题；配置随文档保存和同步。
   * @param theme - 非空主题名称
   * @param definition - 完整主题配置
   */
  registerTheme(theme: string, definition: VBIDashboardThemeDefinition): void {
    const name = zVBIDashboardTheme.parse(theme)
    const meta: VBIDashboardMeta = this.dsl.get('meta')
    this.updateMeta({ ...meta, themes: { ...meta.themes, [name]: zVBIDashboardThemeDefinition.parse(definition) } })
  }

  /**
   * @description 读取主题配置，文档配置优先于内置预设；未定义时返回 undefined，返回副本不会影响原配置。
   * @param theme - 主题名称，默认当前主题
   */
  getThemeConfig(theme: string = this.getTheme()): VBIDashboardThemeDefinition | undefined {
    const definitions = this.dsl.get('meta')?.themes
    const definition =
      definitions && Object.hasOwn(definitions, theme)
        ? definitions[theme]
        : Object.hasOwn(presetDashboardThemes, theme)
          ? presetDashboardThemes[theme as keyof typeof presetDashboardThemes]
          : undefined
    return definition ? structuredClone(definition) : undefined
  }

  /** @description 读取文档内全部主题配置的副本，可配合 observe 订阅可选主题列表。 */
  getThemeDefinitions(): Record<string, VBIDashboardThemeDefinition> {
    return structuredClone(this.dsl.get('meta')?.themes ?? {})
  }

  /** @description 获取内置与文档主题的名称、明暗模式和色板，文档内同名配置优先。 */
  getThemeOptions(): VBIDashboardThemeOption[] {
    const names = new Set([
      'light',
      'dark',
      ...Object.keys(presetDashboardThemes),
      ...Object.keys(this.dsl.get('meta')?.themes ?? {}),
    ])
    return [...names].map((name) => {
      const definition = this.getThemeConfig(name)
      const baseTheme = definition?.tokens.baseTheme ?? (name === 'dark' ? 'dark' : 'light')
      return {
        name,
        baseTheme,
        label: definition?.label,
        colors: [
          ...(definition?.tokens.colorScheme ?? ensureBuiltinTheme(baseTheme).config?.column?.color?.colorScheme ?? []),
        ],
      }
    })
  }

  /**
   * @description 解析主题并确保 VSeed 主题可用，返回隔离的运行时名称；未知名称回退 light，不修改文档。
   * @param theme - 主题名称，默认当前主题；可用于临时预览其他主题
   */
  resolveTheme(theme: string = this.getTheme()): VBIDashboardResolvedTheme {
    const definition = this.getThemeConfig(theme)
    if (!definition && theme !== 'light' && theme !== 'dark') return this.resolveTheme('light')
    const baseTheme = definition?.tokens.baseTheme ?? (theme === 'dark' ? 'dark' : 'light')
    if (!definition) ensureBuiltinTheme(baseTheme)
    return {
      name: theme,
      baseTheme,
      definition,
      chartTheme: definition ? registerVSeedTheme(definition.tokens) : theme,
    }
  }

  /** @description 获取主题名称，默认 light。 */
  getTheme(): string {
    return this.dsl.get('meta')?.theme ?? 'light'
  }

  /** @description 导出主题名称。 */
  toJSON(): string {
    return this.getTheme()
  }

  private updateMeta(meta: VBIDashboardMeta): void {
    if (JSON.stringify(meta) !== JSON.stringify(this.dsl.get('meta'))) this.dsl.set('meta', meta)
  }
}
