# Dashboard practice

`DashboardRenderer` renders a `VBIDashboardBuilder` as a read-only, responsive dashboard. Chart widgets resolve their chart builder with `dashboardBuilder.getChartBuilder()` and pass it to `APP` from `standard` in `mode="view"`. Chart querying, loading states, and rendering use Standard's existing behavior. Insights render their text content.

```tsx
import { createVBI } from '@visactor/vbi'
import { DashboardRenderer } from 'dashboard'

const vbi = createVBI()
const insight = vbi.insight.create(vbi.insight.createEmpty())
insight.setContent('Sales and profit are growing together.')
const builder = vbi.dashboard.create({
  ...vbi.dashboard.createEmpty(),
  meta: { title: 'Sales overview', theme: 'light' },
})
builder.insight.add((widget) => {
  widget
    .setInsightId(insight)
    .setTitle('Key insight')
    .setLayouts({
      lg: { x: 0, y: 0, w: 12, h: 3 },
      md: { x: 0, y: 0, w: 6, h: 3 },
    })
})

export function Dashboard() {
  return <DashboardRenderer builder={builder} locale='en-US' theme='light' />
}
```

## Props

| Prop      | Type                            | Default                      |
| --------- | ------------------------------- | ---------------------------- |
| `builder` | `VBIDashboardBuilder`           | Required                     |
| `locale`  | `Locale` from `@visactor/vseed` | `zh-CN`                      |
| `theme`   | `'light' \| 'dark'`             | `builder.build().meta.theme` |

Supported locales: `zh-CN`, `en-US`, `ja-JP`, `de-DE`, `id-ID`, `fr-FR`, `ko-KR`, `vi-VN`. Locale and theme override presentation without mutating the dashboard or chart DSL. User-authored titles and insight text are displayed as supplied.

Create the dashboard and its resources with the same `createVBI()` instance. Register a chart connector before rendering chart widgets. Missing resources are shown within the affected card. Changes through Builder APIs or Yjs updates are reflected automatically. Dashboard does not add query retry or cancellation behavior to Standard.

Internally, a chart widget renders Standard through its public API:

```tsx
import { APP as Standard } from 'standard'

const chartBuilder = builder.getChartBuilder(chartId)
return chartBuilder ? <Standard builder={chartBuilder} mode='view' border={false} locale='en-US' theme='light' /> : null
```

## Layout

Breakpoints measure the grid container, not the browser window. Columns are `xxl/xl/lg: 12`, `md: 6`, `sm: 4`, `xs: 2`, with 56px rows and 16px gaps. Coordinates are zero-based. A missing breakpoint uses the closest smaller defined layout, including that layout's column count; without one, widgets stack in one column. Widgets missing from a partial layout are appended below it. Fallback charts occupy five rows and insights three rows. Explicit overlapping positions are preserved.

Dashboard disables Standard's chart frame with `border={false}`. Charts fill the space remaining below the card heading and resize with the card, without a fixed minimum height. Long insight text can scroll within its card.

To put multiple cards in the same row, give them the same `y` and non-overlapping `x`/`w` ranges. For example, a 12-column layout can place four cards at `x: 0, 3, 6, 9`, each with `w: 3`. Define smaller layouts as well: documentation content can be much narrower than the browser window.

The [retail operations example](../../packages/vbi/tests/examples/dashboard/retail-operations-dashboard.json) combines ten cards, including query-derived summaries, donut charts, a dual-axis trend, rankings, a table, and action notes. It uses four cards across on a wide dashboard, paired summaries in a narrow document, and a single column on mobile. Its website preview includes a fullscreen toggle to inspect the large-screen layout. All resources and widget placements are constructed through Builder APIs.

There are no drag or resize editing controls. Configure layouts through the Builder. Dashboard cleans up its dashboard and insight subscriptions and its container observer; Standard manages chart subscriptions and rendering instances. Callers retain ownership of Builder documents and connectors.

## Development

```sh
pnpm --filter dashboard test
pnpm --filter dashboard typecheck
pnpm --filter dashboard lint
pnpm --filter dashboard build
```

Dashboard examples are sourced from `packages/vbi/tests/examples` and generated with:

```sh
pnpm --filter @visactor/vbi build:examples --builder=dashboard
pnpm --filter @visactor/vbi build:test --builder=dashboard
```
