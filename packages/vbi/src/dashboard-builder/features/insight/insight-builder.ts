import type * as Y from 'yjs'
import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIInsightBuilder } from 'src/insight-builder/builder'
import type { VBIDashboardBreakpoint, VBIDashboardItemLayout, VBIDashboardWidget } from 'src/types'

type ResourceReference = string | { getUUID: () => string }

const resolveResourceReference = (value: ResourceReference): string => {
  return typeof value === 'string' ? value : value.getUUID()
}

export type DashboardWidgetLayouts = Partial<
  Record<VBIDashboardBreakpoint, Omit<VBIDashboardItemLayout, 'id' | 'widgetId'>>
>

export interface DashboardInsightBuilderOptions {
  getBuilder?: (insightId: string) => VBIInsightBuilder | undefined
}

export class DashboardInsightBuilder<_TQueryDSL = DefaultVBIQueryDSL, _TSeedDSL = DefaultVBISeedDSL> {
  private _layouts: DashboardWidgetLayouts = {}

  constructor(
    private widget: Y.Map<any>,
    private options: DashboardInsightBuilderOptions = {},
  ) {}

  /** @description 获取仪表盘组件 ID。 */
  getId(): string {
    return this.widget.get('id')
  }

  /** @description 解析组件引用的资源构建器；其文档与撤销历史独立于仪表盘。 */
  getBuilder(): VBIInsightBuilder | undefined {
    return this.options.getBuilder?.(this.widget.get('insightId') ?? '')
  }

  /** @description 设置组件标题，修改由所属仪表盘的 undoManager 追踪。 */
  setTitle(title: string): this {
    this.widget.set('title', title)
    return this
  }

  /** @description 设置组件描述。 */
  setDescription(description: string): this {
    this.widget.set('description', description)
    return this
  }

  /** @description 设置引用的洞察资源或 UUID，不复制或修改资源内容。 */
  setInsightId(insight: ResourceReference): this {
    this.widget.set('insightId', resolveResourceReference(insight))
    return this
  }

  /** @description 设置本次 add / update 回调提交的断点布局；在 collection 回调外调用不会写入仪表盘。 */
  setLayouts(layouts: DashboardWidgetLayouts): this {
    this._layouts = layouts
    return this
  }

  /** @internal */
  getLayouts(): DashboardWidgetLayouts {
    return this._layouts
  }

  /** @description 导出组件的纯 JSON 配置。 */
  toJSON(): VBIDashboardWidget {
    return this.widget.toJSON() as VBIDashboardWidget
  }
}
