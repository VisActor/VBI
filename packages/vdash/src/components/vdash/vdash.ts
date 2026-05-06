import { html, type PropertyValues } from 'lit'
import { property } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'
import type { DashboardWidget, VBIDashboardDSL } from '../../types'
import { customElement, VdashElement } from '../_shared/element'
import '../vdash-grid/vdash-grid'
import '../vdash-header/vdash-header'
import styles from './vdash.styles'
import { renderSlot } from './widget-renderer'

@customElement('vdash-app')
export class VdashApp extends VdashElement {
  static override styles = styles

  @property({ type: Object, attribute: false }) dashboard!: VBIDashboardDSL

  private widgetMap = new Map<string, DashboardWidget>()

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (!this.dashboard) {
      this.error('<vdash-app> requires .dashboard to be provided')
    }

    if (changed.has('dashboard')) {
      this.widgetMap = new Map(this.dashboard.widgets.map((w) => [w.id, w]))
    }
  }

  protected override render() {
    return html`${this.renderHeader(this.dashboard.meta)} ${this.renderGrid()}`
  }

  private renderHeader(meta: VBIDashboardDSL['meta']) {
    return html`<header>
      <slot name="header">
        <vdash-header>
          <h1 style="margin: 0">${meta.title}</h1>
        </vdash-header>
      </slot>
    </header>`
  }

  private renderGrid() {
    const layouts = this.dashboard.layout.layouts.lg

    return html`
      <vdash-grid .items=${layouts}>
        ${repeat(
          layouts,
          (item) => item.id,
          (item) => renderSlot(item, this.widgetMap),
        )}
      </vdash-grid>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vdash-app': VdashApp
  }
}
