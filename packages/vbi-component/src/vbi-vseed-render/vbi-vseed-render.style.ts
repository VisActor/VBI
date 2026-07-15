import { css, type CSSResultGroup } from 'lit'
import { defaultStyles } from 'src/shared/styles'

const styles: CSSResultGroup = [
  defaultStyles,
  css`
    :host {
      display: block;
    }

    .vbi-vseed-render__container {
      height: 100%;
      width: 100%;
    }
  `,
]

export default styles
