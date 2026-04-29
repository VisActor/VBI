import { css } from "lit";

export const defaultStyles = css`
  :host([hidden]) {
    display: none;
  }

  :host([disabled]),
  :host(:disabled) {
    cursor: not-allowed;
    pointer-events: none;
  }
`;
