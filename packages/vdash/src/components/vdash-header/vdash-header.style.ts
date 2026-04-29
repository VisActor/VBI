import { css, type CSSResultGroup } from 'lit'
import { defaultStyles } from '../_shared/styles'

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      display: block;
    }

    .root {
      padding: 20px;
      background-color: var(--vdash-header-background, #ffffff);
      border-radius: var(--vdash-header-radius, 8px);
      border-color: var(--vdash-header-border, #e2e8f0);
      border-style: solid;
      border-width: 1px;
    }
  `,
]

export default styles
