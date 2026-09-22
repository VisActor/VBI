# Rslib project

## Embedding a chart

Use `mode="view"` for a read-only chart. The optional `border` prop defaults to `true`; set it to `false` to remove the view's border and rounded frame when embedding it inside a dashboard card.

```tsx
import { APP as Standard } from 'standard'
;<Standard builder={chartBuilder} mode='view' border={false} />
```

The chart fills its container's width and height. Give the parent a defined height (including a size assigned by flex or grid layout); the renderer does not impose a minimum chart height.

For a registered VSeed brand theme, pass `chartTheme` alongside the UI's `theme` (`light` or `dark`). Optional `themeToken` overrides Ant Design tokens after Standard's defaults. These presentation props apply in both view and edit modes without changing the chart DSL or repeating its data query:

```tsx
;<Standard
  builder={chartBuilder}
  mode='view'
  theme='dark'
  chartTheme='emerald'
  themeToken={{ colorPrimary: '#34d399', colorText: '#edfdf5', colorBgContainer: '#102b22' }}
/>
```

The host registers the VSeed theme before rendering. Without `chartTheme`, the existing `theme` prop supplies both the UI mode and chart theme.

## Setup

Install the dependencies:

```bash
pnpm install
```

## Get started

Build the library:

```bash
pnpm run build
```

Build the library in watch mode:

```bash
pnpm run dev
```
