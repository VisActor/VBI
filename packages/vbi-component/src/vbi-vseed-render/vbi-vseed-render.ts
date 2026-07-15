import type { VSeed } from '@visactor/vseed'
import { html, type PropertyValues } from 'lit'
import { property } from 'lit/decorators.js'
import { createRef, ref } from 'lit/directives/ref.js'
import { customElement, VdashElement } from 'src/shared/element'
import styles from './vbi-vseed-render.style'
import { renderVSeed, type VBIVSeedRenderCleanup } from './renderer'

/**
 * Chart container for rendering VChart specifications.
 *
 * @tag vbi-vseed-render
 *
 * @prop {VSeed | undefined} vseed - VSeed DSL rendered inside the container.
 */
@customElement('vbi-vseed-render')
export class VBIVSeedRender extends VdashElement {
  static override get styles() {
    return styles
  }

  @property({ attribute: false }) accessor vseed: VSeed | undefined = undefined
  private readonly chartContainerRef = createRef<HTMLDivElement>()
  private cleanup: VBIVSeedRenderCleanup = undefined

  override disconnectedCallback(): void {
    this.cleanupRender()
    super.disconnectedCallback()
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (!changedProperties.has('vseed')) {
      return
    }
    this.renderContent()
  }

  private cleanupRender(): void {
    this.cleanup?.()
    this.cleanup = undefined
  }

  private renderContent(): void {
    this.cleanupRender()
    const container = this.chartContainerRef.value
    if (!container) {
      return
    }

    this.cleanup = renderVSeed({
      container,
      onError: (error) => this.error(`VBI render error: ${String(error)}`),
      vseed: this.vseed,
    })
  }

  override render() {
    return html`<div class="vbi-vseed-render__container" ${ref(this.chartContainerRef)}></div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vbi-vseed-render': VBIVSeedRender
  }
}
