# Rslib project

## Embedding a chart

Use `mode="view"` for a read-only chart. The optional `border` prop defaults to `true`; set it to `false` to remove the view's border and rounded frame when embedding it inside a dashboard card.

```tsx
import { APP as Standard } from 'standard'
;<Standard builder={chartBuilder} mode='view' border={false} />
```

The chart fills its container's width and height. Give the parent a defined height (including a size assigned by flex or grid layout); the renderer does not impose a minimum chart height.

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
