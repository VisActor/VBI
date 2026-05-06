import { LitElement } from 'lit'

const VERSION = __VDASH_VERSION__
const CONFIG_KEY = '__vdash_disableRegistryWarning__'

const warn = (message: string, componentInstance?: VdashElement): void => {
  console.warn(message, componentInstance)
}

const error = (message: string): Error => {
  return new Error(message)
}

export class VdashElement extends LitElement {
  get version(): string {
    return VERSION
  }

  warn(message: string): void {
    warn(message, this)
  }

  error(message: string): never {
    throw error(message)
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
