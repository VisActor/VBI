import { html } from 'lit'
import { customElement, VdashElement } from '../_shared/element'
import styles from './vdash-header.style'

/**
 * Header container for dashboard-level content.
 *
 * @tag vdash-header
 *
 * @cssprop [--vdash-header-background=#ffffff] - Header background color.
 * @cssprop [--vdash-header-border=#e2e8f0] - Header border color.
 * @cssprop [--vdash-header-radius=8px] - Header border radius.
 *
 * @slot - Default slot for custom header content.
 *
 * @example
 * ```html
 * <vdash-header>
 *   <h2>Executive KPI</h2>
 * </vdash-header>
 * ```
 */
@customElement('vdash-header')
export class VdashHeader extends VdashElement {
  static override styles = styles

  render() {
    return html`<div class="root">
      <slot></slot>
    </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vdash-header': VdashHeader
  }
}
