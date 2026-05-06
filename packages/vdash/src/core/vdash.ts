import type {
  AddWidgetInput,
  CreateDashboardInput,
  DashboardWidget,
  SetMetaInput,
  UpdateWidgetInput,
  UpdateWidgetLayoutInput,
  VBIDashboardDSL,
  VdashBuilder,
} from '../types'
import { clone, stripUndefined } from '../utils'
import { createDashboardData } from './factory'
import { applyLayouts, removeWidgetLayouts } from './layout'
import { patchWidget, pushWidget, removeWidgetById } from './widget'

export class Vdash implements VdashBuilder {
  private data: VBIDashboardDSL

  constructor(data: VBIDashboardDSL) {
    this.data = clone(data)
  }

  setMeta(patch: SetMetaInput): this {
    this.data.meta = { ...this.data.meta, ...stripUndefined(patch) }
    return this
  }

  addWidget(input: AddWidgetInput): this {
    const { layouts, ...fields } = input
    pushWidget(this.data, stripUndefined(fields) as DashboardWidget)
    applyLayouts(this.data, input.id, layouts)
    return this
  }

  updateWidget(widgetId: string, patch: UpdateWidgetInput): this {
    patchWidget(this.data, widgetId, patch)
    return this
  }

  updateWidgetLayout(widgetId: string, layouts: UpdateWidgetLayoutInput): this {
    applyLayouts(this.data, widgetId, layouts)
    return this
  }

  removeWidget(widgetId: string): this {
    removeWidgetById(this.data, widgetId)
    removeWidgetLayouts(this.data, widgetId)
    return this
  }

  getDashboard(): VBIDashboardDSL {
    return clone(this.data)
  }

  static create(init: CreateDashboardInput): Vdash {
    return new Vdash(createDashboardData(init))
  }

  static fromDSL(dsl: VBIDashboardDSL): Vdash {
    return new Vdash(dsl)
  }
}

export function vdash(init: CreateDashboardInput): Vdash {
  return Vdash.create(init)
}
