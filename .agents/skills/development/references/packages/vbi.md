# VBI Package Development Reference

Use for `packages/vbi` and for app, Provider, CLI, agent, or React code that
mutates or consumes VBI resources.

## Role and Boundaries

`packages/vbi` is the headless logic layer. It owns `VBIChartDSL`,
`VBIDashboardDSL`, `VBIInsightDSL`, Yjs-backed documents, Builder APIs, defaults,
normalization, snapshots, and lowering to `VQueryDSL` and `VSeedDSL`.

It does not own DOM, React state, page layout, VChart/VTable instances,
transport setup, product workflow code, or generated docs.

## Rules

- Work TDD-first in the owning scope, then make the smallest passing production
  change.
- Design DSL-first: types, zod schemas, defaults, normalization, and lowering
  come before consumer affordances.
- Builder is the mutation boundary. Use `VBIChartBuilder`, `VBIDashboardBuilder`,
  `VBIInsightBuilder`, and cohesive sub-builders instead of hand-writing DSL
  mutations in UI, CLI, agent, Provider, or app code.
- Prefer focused sub-builders, pipeline stages, adapters, or stores over god
  Builders.
- Chart owns chart config, query, and seed lowering; insight owns semantic
  content; dashboard owns widget composition, responsive layout, and references.

## Change Shape

Change DSL/defaults/normalization/Yjs helpers first, then Builder APIs, lowering
pipelines, and focused tests for Builder JSON, Yjs updates, lowering, snapshots,
and public exports.

## Validation

```bash
pnpm --filter @visactor/vbi run test
pnpm --filter @visactor/vbi run typecheck
pnpm --filter @visactor/vbi run lint
```

When downstream behavior changes, add focused consumer validation, then run
`pnpm run lint:check` and `pnpm run typecheck`.
