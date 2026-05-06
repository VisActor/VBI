import { html } from 'lit'
import { property } from 'lit/decorators.js'
import type { VBIDashboardDSL } from '../../types'
import { customElement, VdashElement } from '../_shared/element'
import '../vdash-grid/vdash-grid'
import '../vdash-header/vdash-header'
import styles from './vdash.styles'

@customElement('vdash-app')
export class VdashApp extends VdashElement {
  static override styles = styles

  @property({ type: Object, attribute: false }) dashboard!: VBIDashboardDSL

  protected override willUpdate(): void {
    if (!this.dashboard) {
      this.error('<vdash-app> requires .dashboard to be provided')
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
    return html`<vdash-grid .items=${this.dashboard.layout.layouts.lg}></vdash-grid>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vdash-app': VdashApp
  }
}
