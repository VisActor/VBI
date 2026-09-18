# Implementation Plan: VBI `createChart` and Chart Naming Alignment

> Based on ADR: `./adr.md`
> Strategy: write tests to lock the new API first, then perform compatibility-preserving renames. In the first phase, prioritize symbols and exports over large directory moves.

## Scope

This plan only covers `packages/vbi`: the `createChart` root entry point, unified `VBIChartBuilder` / `VBIChartDSL` naming, deprecated aliases, tests, and generated artifact updates. It does not implement `createDashboard`, change the runtime field structure of chart DSL, or rename feature builders such as `MeasuresBuilder` / `DimensionsBuilder`.

## Phase 1: Lock Public API Behavior First

### 1.1 Add public API tests

**Changed file**: `packages/vbi/tests/builder/builder.test.ts`

Test coverage:

1. `VBI.chart.create(vbiChart)` behaves the same as the current `VBI.from(vbi)`.
2. `createVBI(...).chart.create(...)` correctly inherits and overrides default `builderOptions`.
3. `VBI.from(...)` / `VBI.create(...)` remain available, but only as aliases of `VBI.chart.create(...)`.
4. `VBI.chart.createEmpty(...)` produces the same output as `createEmptyChart(...)`.

### 1.2 Add root schema tests

**Changed file**: `packages/vbi/tests/types/runtimeSchemas.test.ts`

Test coverage:

1. `zVBIChartDSL` correctly parses a complete chart DSL.
2. `zVBIDSL` remains an alias that can parse the same input.
3. Runtime tests and example code use the new names by default.

## Phase 2: Root DSL Naming Alignment

**Changed files**:

- `packages/vbi/src/types/dsl/vbi/vbi.ts`
- `packages/vbi/src/types/dsl/index.ts`
- `packages/vbi/src/types/index.ts`
- `packages/vbi/src/vbi/create-empty-chart.ts`
- `packages/vbi/src/builder/modules/build.ts`
- `packages/vbi/src/builder/modules/is-empty.ts`
- `packages/vbi/src/builder/modules/index.ts`

Changes:

1. Export `VBIChartDSL`, `VBIChartDSLInput`, and `zVBIChartDSL`.
2. Keep `VBIDSL`, `VBIDSLInput`, and `zVBIDSL` as deprecated aliases.
3. Add `createEmptyChart`, `buildVBIChartDSL`, and `isEmptyVBIChartDSL`.
4. Prefer new names internally; keep old names only in compatibility layers.

## Phase 3: Builder and Adapter Type Alignment

**Changed files**:

- `packages/vbi/src/builder/builder.ts`
- `packages/vbi/src/builder/index.ts`
- `packages/vbi/src/types/builder/VBIInterface.ts`
- `packages/vbi/src/types/builder/adapter.ts`
- `packages/vbi/src/types/builder/index.ts`
- `packages/vbi/src/pipeline/vqueryDSL/index.ts`
- `packages/vbi/src/pipeline/vqueryDSL/types.ts`

Changes:

1. Rename `VBIBuilder` to `VBIChartBuilder`.
2. Rename `VBIBuilderInterface` / `VBIBuilderOptions` / `VBIBuilderAdapters` to `VBIChart*`.
3. Rename `VBIBuildVQueryContext` / `VBIBuildVSeedContext` / `VBIQueryBuilder` / `VBISeedBuilder` to the corresponding `VBIChart*` names.
4. Keep old builder type names as deprecated aliases.
5. Keep feature builder names such as `MeasuresBuilder`, `DimensionsBuilder`, and `ChartTypeBuilder` unchanged.

## Phase 4: Move Root Entry to `createChart`

**Changed files**:

- `packages/vbi/src/vbi/create-vbi.ts`
- `packages/vbi/src/vbi/from/from-vbi-dsl-input.ts`
- `packages/vbi/src/vbi.ts`
- `packages/vbi/src/index.ts`

Changes:

1. Add `chart.create(...)` to the object returned by `createVBI()`.
2. Make `from(...)` / `create(...)` delegate to `chart.create(...)`.
3. Expose `createEmptyChart` as `chart.createEmpty(...)`.
4. Reorder `src/index.ts` exports so new names come before old aliases.

## Phase 5: Migrate Internal Consumers

**Changed scope**:

- `packages/vbi/tests/**/*.ts`
- `packages/vbi/tests/examples/**/*.ts`
- `packages/vbi/tests/examples/**/*.json`
- `packages/vbi/src/**/*.ts`

Changes:

1. Default package source to `VBIChartDSL`, `VBIChartBuilder`, and `VBI.chart.create(...)`.
2. Default tests to the new API, while keeping a small set of compatibility cases for old aliases.
3. Update `VBIBuilder` snippets in examples to `VBIChartBuilder`.
4. Check for missed direct references to `VBIDSL` / `VBI.from` / `createEmptyChart`.

Note: the first phase does not physically move the `builder/`, `types/builder/`, or `vbi/from/` directories. Complete symbol alignment and compatibility layers first, then reassess directory restructuring when `dashboardBuilder` lands to avoid meaningless churn.

## Phase 6: Generated Artifacts and Verification

**Commands**:

```bash
pnpm --filter=@visactor/vbi run g
pnpm --filter=@visactor/vbi run test
pnpm run lint
pnpm run typecheck
```

Acceptance criteria:

1. New documentation, tests, and examples default to `VBI.chart.create` / `VBIChartBuilder` / `VBIChartDSL`.
2. Old aliases still compile and pass key compatibility tests.
3. Generated diffs only reflect naming alignment and do not introduce unrelated runtime behavior changes.

## Execution Order

| Step | Action                                       | File                                             |
| ---- | -------------------------------------------- | ------------------------------------------------ |
| 1    | Write `chart.create` / alias tests           | `tests/builder/builder.test.ts`                  |
| 2    | Write `zVBIChartDSL` / alias tests           | `tests/types/runtimeSchemas.test.ts`             |
| 3    | Implement new root DSL names and aliases     | `src/types/dsl/vbi/vbi.ts` and related files     |
| 4    | Implement `VBIChartBuilder` type family      | `src/builder/builder.ts` + `src/types/builder/*` |
| 5    | Implement the `chart.create` root entry      | `src/vbi/create-vbi.ts` + `src/index.ts`         |
| 6    | Switch package source and tests to new names | `src/**` + `tests/**`                            |
| 7    | Run `pnpm --filter=@visactor/vbi run g`      | Update examples / API / snapshots                |
| 8    | Full verification                            | `test + lint + typecheck`                        |
