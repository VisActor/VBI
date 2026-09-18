import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIChartBuilder } from 'src/chart-builder/builder'
import type { VBIDashboardBreakpoint, VBIDashboardItemLayout, VBIDashboardWidget } from 'src/types'
import type * as Y from 'yjs'

type ResourceReference = string | { getUUID: () => string }

const resolveResourceReference = (value: ResourceReference): string => {
  return typeof value === 'string' ? value : value.getUUID()
}

export type DashboardWidgetLayouts = Partial<
  Record<VBIDashboardBreakpoint, Omit<VBIDashboardItemLayout, 'id' | 'widgetId'>>
>

export interface DashboardChartBuilderOptions<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  getBuilder?: (chartId: string) => VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined
}

export class DashboardChartBuilder<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  private _layouts: DashboardWidgetLayouts = {}

  constructor(
    private widget: Y.Map<any>,
    private options: DashboardChartBuilderOptions<TQueryDSL, TSeedDSL> = {},
  ) {}

  getId(): string {
    return this.widget.get('id')
  }

  getBuilder(): VBIChartBuilder<TQueryDSL, TSeedDSL> | undefined {
    return this.options.getBuilder?.(this.widget.get('chartId') ?? '')
  }

  setTitle(title: string): this {
    this.widget.set('title', title)
    return this
  }

  setDescription(description: string): this {
    this.widget.set('description', description)
    return this
  }

  setChart(chart: ResourceReference): this {
    this.widget.set('chartId', resolveResourceReference(chart))
    return this
  }

  setLayouts(layouts: DashboardWidgetLayouts): this {
    this._layouts = layouts
    return this
  }

  /** @internal */
  getLayouts(): DashboardWidgetLayouts {
    return this._layouts
  }

  toJSON(): VBIDashboardWidget {
    return this.widget.toJSON() as VBIDashboardWidget
  }
}
