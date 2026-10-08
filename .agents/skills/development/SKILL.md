---
name: development
description: >
  Use for VBI monorepo development, refactoring, and maintenance: software
  entropy control and task completion with generation, documentation and test
  updates, full package tests, fresh coverage, and website acceptance testing.
---

# Development

Read [Software Entropy Control](references/software-entropy.md) for shared
ownership, source-of-truth, refactoring, and deletion rules. Module conventions
below apply to their owning packages and integrations.

## Repository-wide Coverage

- Unit-test coverage must **never decrease** in statements, branches, functions,
  or lines for any affected package. Before changing code or tooling, record a
  fresh unit-only baseline; after generation and edits, rerun with the same
  source scope and compare each metric per package. Full-suite coverage does
  not replace unit-only coverage.
- Keep providers and inclusion/exclusion rules comparable; explicitly review
  instrumentation changes. Do not remove files, ignore branches, or lower
  thresholds to pass. Raise committed thresholds when coverage improves.
- `@visactor/vbi` and `@visactor/vquery` retain **100%** coverage and thresholds
  in all four metrics.
- Coverage runs must not update snapshots or open a browser. Review behavior
  changes before explicitly updating snapshots. Report before/after percentages,
  report locations, and unresolved gaps; do not claim incomplete checks passed.

## VBI Module (`packages/vbi`)

- VBIChartDSL, VQueryDSL, and VSeedDSL remain the sources of truth for their
  respective domains. State that must be saved, restored, or reused belongs in
  the owning DSL; Builders own domain operations and DSL consistency.
- Adapters translate at integration boundaries; UI owns rendering and transient
  state. Consumers use public APIs, and capabilities must remain usable without UI.
- Keep domain terminology consistent. Practices stay independent; move shared
  capabilities into their owning packages or local utilities.

## VSeed Module (`packages/vseed`)

- Keep each pipe atomic and focused on one responsibility. Do not branch on
  chart type inside a pipe; select and compose pipes or inject strategies when
  assembling the pipeline.
- Preserve the pipeline design philosophy: concise code, high cohesion, low
  coupling, and composition over special cases. Extend the smallest owning pipe
  or shared mechanism; avoid duplicated logic and unnecessary abstractions.
- Assess the impact on shared pipes, chart families, and downstream consumers
  before changing behavior. Preserve existing DSL/API semantics, defaults,
  rendering, and interactions; **no breaking changes**. Cover affected existing
  configurations with regression tests and visual acceptance, not only new cases.

## Required Task Completion

1. Identify changed packages and affected consumers. Read their `package.json`
   scripts and test configuration for generation, full-test, and coverage commands.
2. Update relevant docs, examples, and regression tests; remove obsolete cases.
   Edit the owning source or generator for generated artifacts.
3. Run each affected package's `g` script (root `pnpm run g` for repository-wide
   generation). Inspect generated diffs, including snapshots. Report absent `g`
   scripts as not applicable.
4. After all edits and generation, run every affected package's complete tests
   and fresh coverage. A full-suite coverage run can satisfy both; run omitted
   suites separately. Focused tests, caches, and old reports do not satisfy this
   gate. If no coverage script exists, use the runner's coverage command or report
   unavailable support.
5. Fix task-related failures and coverage gaps, then repeat affected generation
   and checks. Run root `lint:check` and `typecheck` when available.
6. Complete website browser acceptance below; a successful build or unit test
   alone is insufficient.
7. Report checked packages, generation, tests, coverage comparisons and report
   paths, plus browser URLs, interactions, and outcomes. State blockers and
   unverified checks explicitly.

## Website Acceptance

- Use the Node.js and pnpm versions in root `package.json`. On a fresh checkout
  or after dependency changes, run `pnpm install --frozen-lockfile`.
- Read `apps/website/AGENTS.md`, then run `pnpm dev` from the root. It starts the
  Rspress website. Wait for compilation and use the printed URL and port with
  `/VBI/`; keep the server running during acceptance.
- Verify the home page and affected docs, examples, or playground in a browser.
  Exercise changed behavior and interactions; check rendering, console errors,
  and failed requests. Without visible UI changes, smoke-test the home page and
  a relevant example. An HTTP response alone is not browser acceptance.
- For stale output or port conflicts, inspect website processes and preview port
  `7890`; stop only the confirmed stale process and restart `pnpm dev`. Hard-refresh
  and remind the user to do the same (`Ctrl+Shift+R`).
- Keep browser acceptance separate from coverage. Fix task-related failures and
  repeat affected checks; report startup/access blockers and unverified behavior.
- Stop servers you started after validation unless the user needs them; report
  any server left running and its URL.
