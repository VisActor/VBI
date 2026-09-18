# Plan: Platform-Level Headless BI Execution Plan Based On `@visactor/vbi-provider`

> Based on [`./adr.md`](./adr.md)
> This file guides the implementation order, with the goal of evolving the current `vbi_fe / vbi_be` prototype into real platform-level Headless BI.

## Goal

Build a unified platform access layer around `@visactor/vbi-provider`, so pages, CLI, and any JS runtime all operate `chart / insight` resources through the same Provider model.

After completion, the system should have:

- `apps/packages/vbi-provider` as the platform-level application SDK.
- Three first-class entry points: `ChartProvider / InsightProvider`.
- Provider can directly return the corresponding Builder.
- The backend is clearly split into management plane and data plane.
- `vbi_fe` accesses resources through SDK rather than page-private logic.
- A new `vbi_tui` acts as a command-line consumer of SDK.

## Scope

Includes:

- `apps/packages/vbi-provider`
- `packages/vbi`
- `apps/vbi_be`
- `apps/vbi_fe`
- `apps/vbi_tui`

Does not include:

- permission system, multi-tenancy, version history
- non-JS runtime SDKs
- complex cache strategies and offline sync
- third-party open protocol adapters

## Development Principles

### Provider First

For every new resource capability, first ask:

1. Should this capability enter the Provider interface of `@visactor/vbi-provider` first?
2. Are pages and CLI only its consumers?
3. Is it built on collaborative documents and Builder?

Forbidden:

- Build a private capability in pages first, then consider extracting SDK later.
- Build private command logic in CLI first, then consider reuse later.

### TDD Constraint

All tasks with behavioral changes follow:

1. Write a failing test first.
2. Write the minimal implementation.
3. Refactor and converge naming last.

### Quality Constraints

1. Provider interface changes must have corresponding tests or minimal executable validation.
2. At the end of each phase, run that module's smallest validation command.
3. Before merge, repository-level `lint` and `typecheck` must pass.
4. `Bytes` must not keep leaking into business-layer REST interfaces.
5. Pages must not bypass SDK as a long-term main path.

## Execution Order

Proceed in this order:

1. Stabilize the `vbi-provider` package.
2. Converge backend management-plane / data-plane layering.
3. Implement SDK remote Provider runtime.
4. Connect `vbi_fe` to SDK.
5. Connect `vbi_tui` to SDK.
6. Perform integration acceptance and documentation examples.

Reasons:

- Without a stable SDK contract, frontend and backend will each invent interfaces.
- Without backend dual planes, Provider cannot become a real first-class entry point.
- Without SDK runtime, frontend and CLI cannot reuse the same path.

## Execution Checklist

### Step 1: Stabilize `apps/packages/vbi-provider` Package Structure And Interface Boundaries

Goal:

- Upgrade `@visactor/vbi-provider` from scaffold to formal contract package.

Includes:

- Package directory structure, build config, and lint / typecheck aligned with the monorepo.
- `VBIProviderClient`.
- `ChartProvider / InsightProvider`.
- Shared resource semantics: `create / remove / rename / open / close / getBuilder / getSummary / getDetail / snapshot`.
- Type contract for Provider returning Builder.

Definition of done:

- `apps/packages/vbi-provider` can independently run `build / lint / typecheck`.
- Public exports are stable.
- README and docs explain the package positioning.
- No dependency on React / DOM.

Blockers:

- none

### Step 2: Converge Backend Dual-Plane Capabilities

Goal:

- Converge `apps/vbi_be` from "page backend" to "Provider backend."

Includes:

- Management plane:
  - resource creation / deletion / rename
  - resource summary / detail queries
  - reference checks and snapshot export
- Data plane:
  - opening `chart / insight` collaborative documents
  - snapshot restoration
  - incremental sync

Definition of done:

- REST exposes only business JSON.
- Hocuspocus / Yjs protocol only handles the collaboration data plane.
- All two resource types, `chart / insight`, can independently connect to collaborative documents.

Blockers:

- depends on initial stabilization of SDK interface boundaries from Step 1

### Step 3: Implement Remote Provider Runtime In `vbi-provider`

Goal:

- Make SDK a real backend-connected runtime, not only a type contract.

Includes:

- Real implementation of `createVBIProviderClient(config)`.
- transport abstraction:
  - management-plane requests
  - data-plane collaboration connections
- Provider lifecycle:
  - `open / close`
  - Builder caching and reuse
  - detail / snapshot retrieval

Definition of done:

- `ChartProvider.open()` can return an operable `VBIChartBuilder`.
- `InsightProvider.open()` can return an operable `VBIInsightBuilder`.
- SDK can run in both browser and Node.js environments.

Blockers:

- depends on backend dual-plane capabilities from Step 2

### Step 4: Migrate `vbi_fe` From Page-Private Logic To SDK

Goal:

- Pages no longer assemble REST calls and collaboration hooks directly; they uniformly consume `@visactor/vbi-provider`.

Includes:

- Converge existing resource services into SDK calls.
- Converge existing collaboration hooks into Provider consumption.
- Management pages perform resource CRUD through Provider.

Definition of done:

- The `vbi_fe` page main path no longer directly depends on private resource access logic.
- Pages obtain Builder through SDK.
- Resource operation semantics in pages remain consistent with CLI.

Blockers:

- depends on SDK runtime from Step 3

### Step 5: Create `apps/vbi_tui` As A Command-Line SDK Consumer

Goal:

- Make CLI the second formal entry point for platform capabilities.

Includes:

- Create `apps/vbi_tui`.
- Design the first command set:
  - `chart create/get/update/remove`
  - `insight create/get/update/remove`
- CLI internally calls Provider through `@visactor/vbi-provider`.

Definition of done:

- CLI does not bypass SDK to access private backend logic directly.
- Common resource operations can be completed through command line.
- CLI outputs stable JSON or readable text.

Blockers:

- depends on SDK runtime from Step 3

### Step 6: Integration Acceptance And Documentation Examples

Goal:

- Verify that SDK is truly the platform's first-class entry point.

Required scenarios:

1. Pages can independently manage chart through SDK.
2. Pages can independently manage insight through SDK.
3. CLI can create and operate both resource types.
4. Node.js scripts can directly open Builder through SDK.
5. Builder edit results correctly synchronize through the collaboration path.
6. REST no longer leaks raw `Bytes`.

Definition of done:

- Pages, CLI, and scripts can all operate resources through SDK.
- Builder lifecycle is managed by Provider.
- No page-private main-path remnants remain.

## Suggested Parallelization

Allowed in parallel:

- Step 2 backend dual-plane design and Step 3 SDK transport design can proceed with overlap.
- Step 4 page migration and Step 5 CLI skeleton setup can proceed in parallel.

Do not parallelize:

- Do not advance page and CLI main-path refactors simultaneously before Step 1 is stable.
- Do not lock Provider remote implementation details before Step 2 is stable.

## Validation Commands

Prefer the smallest commands for staged validation:

```bash
pnpm --filter=@visactor/vbi-provider run build
pnpm --filter=@visactor/vbi-provider run lint
pnpm --filter=@visactor/vbi-provider run typecheck
pnpm --filter=vbi_be run lint
pnpm --filter=vbi_be run typecheck
pnpm --filter=vbi_fe run lint
pnpm --filter=vbi_fe run typecheck
```

Before integration, run repository-level validation:

```bash
pnpm run lint
pnpm run typecheck
```

## Exit Criteria

This topic is complete only when all of the following are true:

1. `@visactor/vbi-provider` has become a stable first-class platform entry point.
2. The two Provider boundaries are clear and can directly return Builder.
3. The backend has completed management-plane / data-plane layering.
4. `vbi_fe` uses SDK as the main path.
5. `vbi_tui` can operate resources through SDK.
6. Any JS runtime can connect resources through SDK.
7. The business layer no longer leaks raw collaboration binary data.
