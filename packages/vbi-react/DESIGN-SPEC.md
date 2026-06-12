# @visactor/vbi-react Component UI Contract

## Visual Direction

The component module follows a Precision Workbench direction: compact, calm,
scan-friendly controls for building charts. Starter pages can add a small
Editorial Analytics layer around chart surfaces and empty states, but package
components stay neutral and composable.

## Scope

- `@visactor/vbi-react` owns light integration components and their styling
  contract.
- Product-grade applications should compose these primitives or implement their
  own workbench components; the package must not depend on app or practice UI.
- `practices/vbi-react-starter` is the canonical package integration demo.

## Tokens

All component styling should flow through CSS variables exposed by
`@visactor/vbi-react/components.css`.

- Surface tokens: `--vbi-react-surface`, `--vbi-react-surface-muted`,
  `--vbi-react-surface-raised`, `--vbi-react-canvas`.
- Text tokens: `--vbi-react-text`, `--vbi-react-text-soft`,
  `--vbi-react-text-muted`.
- Structure tokens: `--vbi-react-border`, `--vbi-react-border-strong`,
  `--vbi-react-shadow`, `--vbi-react-radius-sm`,
  `--vbi-react-radius-md`, `--vbi-react-radius-lg`.
- Role tokens: `--vbi-react-dimension`, `--vbi-react-dimension-soft`,
  `--vbi-react-measure`, `--vbi-react-measure-soft`,
  `--vbi-react-filter`, `--vbi-react-filter-soft`.
- Control tokens: `--vbi-react-accent`, `--vbi-react-accent-hover`,
  `--vbi-react-accent-contrast`, `--vbi-react-control-height`.

Consumers may override these tokens on a wrapper such as `.starter-page`.

## Layout Rules

- The outer layout owns page grid decisions. Inner panels own only their own
  scroll regions.
- Every scrollable panel must use `min-height: 0` and a bounded
  `overflow: auto`.
- Narrow sidebars must stack controls vertically instead of squeezing large
  multi-column forms into one row.
- Long field, token, and filter labels must truncate rather than expand layout.

## Component Contract

- Components keep the existing public props unless a breaking change is planned
  explicitly.
- Components expose stable BEM-like class names under the `vbi-react-` prefix.
- Inline styles are reserved for dynamic caller overrides and CSS custom
  properties, not hard-coded colors, borders, or large layout systems.
- `style` remains an escape hatch and is merged last.

## Starter Demo Rules

- Starter layout should prove package composability, not replace package
  components with private duplicates.
- Starter-specific CSS should set page-level atmosphere and token overrides.
- Starter should avoid `!important`; website-level fixes must be scoped and
  justified by real docs-page constraints.

## Do Not Do

- Do not add app or practice dependencies to `packages/vbi-react`.
- Do not copy private components across practices.
- Do not hardcode white text, purple gradients, or decorative card piles.
- Do not make chart configuration depend on source-order CSS hacks.
