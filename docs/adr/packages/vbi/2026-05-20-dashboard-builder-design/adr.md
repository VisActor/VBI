# ADR: Dashboard Builder And Resource-Oriented Composition

## Summary

`@visactor/vbi` introduces Dashboard as a headless, Yjs-backed resource
composition layer. Dashboard does not own chart configuration, insight content,
rendering, or host UI behavior. It owns a dashboard DSL made of widget
references, responsive layout, metadata, and collaborative state updates.

The staged implementation keeps Chart and Insight as independent resources and
lets Dashboard compose them through resource ids. A shared VBI resource registry
resolves those ids back to builders when callers need to inspect or mutate the
referenced resource.

## Context

VBI already has chart, insight, and report builders. Dashboard needs to support a
different use case: assembling multiple reusable resources into a responsive
workspace. This creates several design pressures:

- Dashboard must compose existing resources without copying chart DSL or insight
  DSL into every dashboard widget.
- Dashboard state must remain collaborative and serializable through the same
  Yjs update model used by other builders.
- Dashboard widgets need ergonomic builder APIs for add, update, remove, find,
  toJSON, and resource lookup.
- Layout needs to be independent from widget content so responsive placement can
  evolve without changing chart or insight ownership.
- Public VBI APIs need a coherent namespace shape instead of a growing flat
  object.

## Decision

### 1. Treat Dashboard As A Composition DSL, Not A Rendering Layer

Dashboard DSL stores:

- `uuid`: dashboard resource identity.
- `widgets`: ordered widget references.
- `breakpoints`: named responsive breakpoint widths.
- `layout`: per-breakpoint layout arrays.
- `meta`: dashboard title and theme.
- `version`: DSL version.

The builder initializes missing defaults for empty Yjs documents and keeps the
mutation boundary inside `VBIDashboardBuilder` and its sub-builders. Rendering,
DOM layout, chart instances, and application state stay outside `packages/vbi`.

### 2. Model Widgets As Resource References

Dashboard supports two widget types:

- Chart widget: `{ type: 'chart', chartId, title, description }`.
- Insight widget: `{ type: 'insight', insightId, title, description }`.

Widget builders accept either a resource id string or a resource builder object
with `getUUID()`. The stored DSL remains id-based, while caller ergonomics allow:

- `chart.setChart(chartBuilder)`
- `insight.setInsightId(insightBuilder)`

This keeps the dashboard snapshot compact and prevents dashboard from becoming a
second owner of chart or insight DSL.

### 3. Resolve Cross-Resource Builders Through A Shared Registry

`createVBI()` now creates one resource registry and passes it into chart,
insight, dashboard, report, and resource namespaces.

The registry stores chart and insight resources as either builders or normalized
DSL. Dashboard and Report both resolve referenced resources through the same
registry path:

- existing builder: return it directly.
- stored DSL: create and cache a builder from that DSL.
- missing resource or empty id: return `undefined`.

This makes resource resolution consistent between dashboard widgets and report
pages while preserving chart builder options through namespace-level option
merging.

### 4. Keep Layout Separate From Widget Content

Widget builders collect responsive layout input through `setLayouts()`, then
merge it into root `layout[breakpoint]` arrays. Layout items point back to
widgets by `widgetId`.

This separation means:

- Widget content can be updated without rewriting layout.
- Layout can be updated without changing chart or insight references.
- Removing a widget also removes its layout entries.
- Each breakpoint can evolve independently.

`layouts.lg` is required when adding a widget. Without the primary desktop
layout, the add operation rolls back the widget and fails early. This makes
dashboard DSL valid by construction for the minimum supported layout.

### 5. Split Public VBI APIs Into Namespaces

The staged change moves `createVBI()` toward explicit namespaces:

- `connectors`
- `resources`
- `chart`
- `insight`
- `dashboard`
- `report`

Legacy connector fields remain as deprecated compatibility exports, but new
composition flows use the namespace APIs. This reduces the pressure to keep
adding unrelated functions to one flat VBI instance and gives Dashboard a clear
public entry point:

```ts
const vbi = createVBI()
const chart = vbi.chart.create(vbi.chart.createEmpty('demo'))
const insight = vbi.insight.create(vbi.insight.createEmpty())
const dashboard = vbi.dashboard.create(vbi.dashboard.createEmpty())

dashboard.chart.add((widget) => {
  widget.setChart(chart).setLayouts({ lg: { x: 0, y: 0, w: 8, h: 6 } })
})

dashboard.insight.add((widget) => {
  widget.setInsightId(insight).setLayouts({ lg: { x: 8, y: 0, w: 4, h: 6 } })
})
```

## Consequences

### Positive Impact

- Dashboard becomes a reusable composition primitive rather than an application
  feature hidden in UI code.
- Chart and Insight ownership stays explicit; Dashboard references them instead
  of duplicating their internal DSL.
- Report and Dashboard share resource resolution behavior, reducing cross-resource
  drift.
- Responsive layout is easy to inspect and update because it is stored at the
  dashboard root.
- Yjs updates, undo management, and builder APIs stay aligned with the rest of
  `packages/vbi`.
- Namespace APIs make future resources easier to add without expanding a flat
  public surface.

### Tradeoffs

- Dashboard snapshots require a resource registry when callers want to resolve
  referenced chart or insight builders.
- A widget can reference a missing resource id; builder access returns
  `undefined` instead of throwing, so callers must handle absent resources.
- Layout validity is enforced at builder time for `lg`, but deeper overlap or
  grid packing rules are intentionally left to host UI or a future layout
  validation layer.
- The resource registry adds shared state inside a VBI instance, so independent
  dashboards should use independent `createVBI()` instances when isolation is
  required.

## Validation

The staged test coverage records these intended behaviors:

- Dashboard constructor fills defaults for empty Yjs documents.
- Dashboard builders sync through encoded Yjs updates.
- Chart and Insight widgets can add, update, remove, find by widget id, and find
  by referenced resource id.
- Widget builders can resolve referenced chart and insight builders.
- Removing widgets removes their layout entries.
- Missing `layouts.lg` rolls back an add operation.
- Example tests cover basic dashboard composition and update/remove workflows.

## Follow-Ups

- Add a public resource-read API if callers need to distinguish "registered DSL"
  from "built DSL snapshot".
- Consider layout validation for overlap, bounds, and breakpoint completeness
  once host UI requirements are stable.
- Decide whether Dashboard needs a snapshot format that embeds referenced chart
  and insight DSL, similar to Report snapshots.
