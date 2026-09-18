# ADR-005: VBI ChartBuilder and VBIChartDSL Naming Alignment

## Context

`@visactor/vbi` currently exposes only single-chart capability, but its public naming is still generic: `VBI.from(...)`, `VBI.create(...)`, `VBIBuilder`, `VBIDSL`, `zVBIDSL`, and `createEmptyChart`.

That can work while VBI only has charts, but it becomes confusing as soon as `VBI.dashboard.create(...)` is introduced:

1. `from` exposes the implementation detail that a builder is created from DSL; it does not express the intent to create a chart.
2. `VBIBuilder` / `VBIDSL` look like top-level VBI concepts, but they actually describe a single chart.
3. When `chartBuilder` and `dashboardBuilder` both exist, generic names will mix API, type, zod schema, and directory responsibilities.

This ADR only addresses naming and layering. It does not change the chart DSL JSON structure or the `buildVQuery()` / `buildVSeed()` lowering behavior.

## Decision

### 1. Use `createChart(...)` as the root API

Add and document the primary entry point:

```ts
VBI.chart.create(vbiChart, options)
createVBI(...).chart.create(vbiChart, options)
```

Keep `from` and `create` for one migration window, but only as deprecated aliases of `VBI.chart.create`. They should no longer appear in examples, documentation, or new tests.

### 2. Move generic builder names under chart semantics

Public names change to:

```ts
VBIBuilder -> VBIChartBuilder
VBIBuilderInterface -> VBIChartBuilderInterface
VBIBuilderOptions -> VBIChartBuilderOptions
VBIBuilderAdapters -> VBIChartBuilderAdapters
```

Feature builders such as `MeasuresBuilder`, `DimensionsBuilder`, and `ChartTypeBuilder` do not get an extra `Chart` prefix. They already belong to `VBIChartBuilder`, and keeping the shorter names avoids mechanical churn.

### 3. Rename the root DSL to `VBIChart*`

Root DSL names change to:

```ts
VBIDSL -> VBIChartDSL
VBIDSLInput -> VBIChartDSLInput
zVBIDSL -> zVBIChartDSL
legacy empty helper -> createEmptyChart
buildVBIDSL -> buildVBIChartDSL
isEmptyVBIDSL -> isEmptyVBIChartDSL
```

Any zod schema or helper that only serves the chart root DSL should also use the `VBIChart` prefix. The first phase does not force every leaf node type to be mechanically renamed to `VBIChart*`; focus on the root object, root schema, and public entry points to avoid unnecessary churn.

### 4. Compatibility strategy

Keep deprecated aliases in the first phase:

1. `VBI.from` / `VBI.create` delegate to `VBI.chart.create`.
2. `VBIBuilder` delegates to `VBIChartBuilder`.
3. `VBIDSL` / `VBIDSLInput` / `zVBIDSL` remain as type or schema aliases.
4. Documentation, examples, tests, and export ordering all move to the new names.

The compatibility layer only gives downstream users a migration window. Old names should not continue to spread.

### 5. Directory and responsibility boundaries

The current chart implementation under generic `builder` / `types/builder` / `vbi/from` paths should be reorganized around chart semantics. Principles:

1. Chart-specific implementation belongs in the chart builder namespace and should not occupy generic top-level names.
2. `VBI` remains the product-level entry container that organizes `chart.create` and future `dashboard.create`.
3. Only capabilities truly shared across chart and dashboard should keep generic naming.

This lets dashboard become a peer capability of chart instead of being squeezed into the old `VBIBuilder` / `VBIDSL` semantics.

### 6. Non-goals

1. Do not change the runtime field structure of `VBIChartDSL`.
2. Do not redesign the `buildVQuery()` / `buildVSeed()` pipeline.
3. Do not force all leaf types such as `VBIDimension` / `VBIMeasure` to be renamed in the first phase.
4. Do not expand this naming pass into dashboard DSL design.

## Reference

- `packages/vbi/src/vbi/create-vbi.ts`
- `packages/vbi/src/vbi/from/from-vbi-dsl-input.ts`
- `packages/vbi/src/vbi/create-empty-chart.ts`
- `packages/vbi/src/builder/builder.ts`
- `packages/vbi/src/builder/modules/build.ts`
- `packages/vbi/src/builder/modules/is-empty.ts`
- `packages/vbi/src/types/builder/VBIInterface.ts`
- `packages/vbi/src/types/builder/adapter.ts`
- `packages/vbi/src/types/dsl/vbi/vbi.ts`
- `packages/vbi/src/index.ts`

## Rejected Designs

- Do not keep `from(...)` as the primary chart creation API.
- Do not name the single-chart builder with the generic `VBIBuilder`.
- Do not name the single-chart root DSL with the generic `VBIDSL`.
- Do not let chart-specific schemas and helpers keep occupying domainless top-level names.
