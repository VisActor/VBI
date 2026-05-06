import { css, type CSSResultGroup } from 'lit'
import { defaultStyles } from '../_shared/styles'

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      display: grid;
      gap: 12px;
    }
  `,
]

export default styles
