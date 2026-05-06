import { GridStack, type GridItemHTMLElement, type GridStackNodesHandler, type GridStackWidget } from 'gridstack'
import { html, type PropertyValues } from 'lit'
import { property } from 'lit/decorators.js'
import { createRef, ref, type Ref } from 'lit/directives/ref.js'
import { repeat } from 'lit/directives/repeat.js'
import type { GridItemLayout } from '../../types'
import { customElement, VdashElement } from '../_shared/element'
import styles from './vdash-grid.styles'

export interface VdashGridChangeDetail {
  items: GridItemLayout[]
}

/**
 * Draggable and resizable dashboard grid powered by GridStack.
 *
 * @tag vdash-grid
 *
 * @property {GridItemLayout[]} items - Grid item layout definitions.
 *
 * @fires {Event} vdash-grid-change - Fired after a drag or resize change is finalized.
 *
 * @slot item:{id} - Slot for rendering a widget inside the matching grid item.
 *
 * @example
 * ```html
 * <vdash-grid>
 *   <section slot="item:sales">Sales widget</section>
 * </vdash-grid>
 * ```
 */
@customElement('vdash-grid')
export class VdashGrid extends VdashElement {
  static override styles = styles

  @property({ type: Array, attribute: false }) items: GridItemLayout[] = []

  private grid?: GridStack
  private readonly gridRef = createRef<HTMLElement>()
  private readonly itemRefs = new Map<string, Ref<GridItemHTMLElement>>()

  protected override render() {
    return html`
      <div ${ref(this.gridRef)} class="grid-stack">
        ${repeat(
          this.items,
          (item) => item.id,
          (item) => html`
            <div ${ref(this.getOrCreateRef(item.id))} class="grid-stack-item" gs-id=${item.id}>
              <div class="grid-stack-item-content">
                <slot name=${`item:${item.id}`}>
                  <div class="slot-fallback">${item.id}</div>
                </slot>
              </div>
            </div>
          `,
        )}
      </div>
    `
  }

  protected override firstUpdated(): void {
    this.initGrid()
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('items') && this.grid) {
      this.syncGrid()
    }
  }

  override disconnectedCallback(): void {
    if (this.grid) {
      this.grid.destroy(false)
      this.grid = undefined
    }
    this.itemRefs.clear()
    super.disconnectedCallback()
  }

  private initGrid(): void {
    const el = this.gridRef.value
    if (!el) return

    this.grid = GridStack.init(
      {
        auto: false,
        animate: true,
      },
      el,
    )
    this.registerNewWidgets()
    this.grid.on('change', this.handleChange)
  }

  private syncGrid(): void {
    if (!this.grid) return

    this.grid.batchUpdate(true)
    try {
      this.removeStaleWidgets()
      this.registerNewWidgets()
      this.grid.load(
        this.items.map((i) => this.toGridWidget(i)),
        false,
      )
    } finally {
      this.grid.batchUpdate(false)
    }
  }

  private removeStaleWidgets(): void {
    if (!this.grid) return
    const activeIds = new Set(this.items.map((i) => i.id))

    for (const node of [...this.grid.engine.nodes]) {
      const id = node.id != null ? String(node.id) : undefined

      if (id && activeIds.has(id)) continue
      if (node.el) this.grid.removeWidget(node.el, false, false)
      if (id) this.itemRefs.delete(id)
    }
  }

  private registerNewWidgets(): void {
    if (!this.grid) return

    const existing = new Set(this.grid.engine.nodes.map((n) => n.id))

    for (const item of this.items) {
      if (existing.has(item.id)) continue

      const el = this.itemRefs.get(item.id)?.value
      if (el) this.grid.makeWidget(el, this.toGridWidget(item))
    }
  }

  private readonly handleChange: GridStackNodesHandler = () => {
    this.emitChange()
  }

  private emitChange(): void {
    if (!this.grid) return

    const nodeMap = new Map(this.grid.engine.nodes.map((n) => [n.id, n]))
    const nextItems = this.items.map((item) => {
      const node = nodeMap.get(item.id)
      if (!node) return { ...item }
      return {
        ...item,
        x: node.x ?? item.x,
        y: node.y ?? item.y,
        w: node.w ?? item.w,
        h: node.h ?? item.h,
      }
    })

    this.dispatchEvent(
      new CustomEvent<VdashGridChangeDetail>('vdash-grid-change', {
        bubbles: true,
        composed: true,
        detail: { items: nextItems },
      }),
    )
  }

  private getOrCreateRef(id: string): Ref<GridItemHTMLElement> {
    let r = this.itemRefs.get(id)
    if (!r) {
      r = createRef<GridItemHTMLElement>()
      this.itemRefs.set(id, r)
    }
    return r
  }

  private toGridWidget(item: GridItemLayout): GridStackWidget {
    return {
      id: item.id,
      x: item.x,
      y: item.y,
      w: item.w,
      h: item.h,
      locked: item.static,
      noMove: item.static,
      noResize: item.static,
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vdash-grid': VdashGrid
  }

  interface HTMLElementEventMap {
    'vdash-grid-change': CustomEvent<VdashGridChangeDetail>
  }
}
