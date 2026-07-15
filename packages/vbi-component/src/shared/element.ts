import { LitElement } from 'lit'

const VERSION = __VBI_COMPONENT_VERSION__
const CONFIG_KEY = '__vbiComponent_disableRegistryWarning__'

const warn = (message: unknown, componentInstance?: VdashElement): void => {
  console.warn(message, componentInstance)
}

const error = (message: unknown, componentInstance?: VdashElement): void => {
  console.error(message, componentInstance)
}

export class VdashElement extends LitElement {
  get version(): string {
    return VERSION
  }

  warn(message: unknown): void {
    warn(message, this)
  }

  error(message: unknown): void {
    error(message, this)
  }
}

type CustomElementClass = Omit<typeof HTMLElement, 'new'>

/**
 * Own implementation of Lit's customElement decorator.
 */
export const customElement = (tagName: string) => {
  return (classOrTarget: CustomElementClass) => {
    if (typeof customElements === 'undefined') return
    const customElementClass = customElements.get(tagName)

    if (!customElementClass) {
      customElements.define(tagName, classOrTarget as CustomElementConstructor)
      return
    }

    if (CONFIG_KEY in window) {
      return
    }

    const el = document.createElement(tagName)
    const anotherVersion = (el as VdashElement)?.version
    let message = ''

    if (!anotherVersion) {
      message += 'is already registered by an unknown custom element handler class.'
    } else if (anotherVersion !== VERSION) {
      message += 'is already registered by a different version of Vdash. '
      message += `This version is "${VERSION}", while the other one is "${anotherVersion}".`
    } else {
      message += `is already registered by the same version of Vdash (${VERSION}).`
    }

    warn(`The custom element "${tagName}" ${message}\nTo suppress this warning, set window.${CONFIG_KEY} to true`)
  }
}
