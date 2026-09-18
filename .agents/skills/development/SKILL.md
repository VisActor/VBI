---
name: development
description: >
  Use for VBI monorepo development: apps, packages, practices, website
  documentation, repository-level workflows, generated artifacts, validation
  commands, source-of-truth decisions, software entropy control,
  maintainability, refactoring, dead-code deletion, and constraining messy
  LLM-generated code.
---

# VBI Development Handbook

Repository-level rules for VBI work. Keep this file as the routing layer: use it
for the non-negotiable principles, then load only the reference that matches the
package, practice, or entropy risk in front of you.

## Core Rules

- Work from the owner and source of truth: DSL, Builder, Provider API, generator,
  example JSON, or local utility.
- Reduce maintenance cost. Prefer deletion, simplification, extraction, or moving
  ownership over adding compatibility layers.
- Use real needs to drive abstraction, deletion to fight entropy, and naming and
  boundaries to make code explain itself. See
  `references/software-entropy.md#optimization-habits`.
- Builder owns DSL mutation. UI, CLI, agent, app, and practice code should use
  Builder or public package APIs instead of rebuilding internals.
- Generated artifacts are outputs, not primary fixes. Change the source and
  regenerate when needed.
- Do not cross ownership boundaries casually: packages must not depend on apps,
  and practices must not import another practice's private `src/*`.
- For `apps/vbi_be` and `apps/vbi_fe`, use the Docker-only workflows in
  `references/apps/vbi-be.md` and `references/apps/vbi-fe.md` for runtime,
  debugging, validation, and build commands. Do not run those app workflows
  directly on the host unless the user explicitly overrides this rule.
- When deleting or renaming, clean imports, calls, types, comments, tests, docs,
  generated references, and old names in the same change.

## Ownership Map

- `packages/vbi`: VBIChartDSL, Builder, dashboard/insight state, and
  collaborative editing.
- `packages/vquery`: QueryDSL-to-SQL and query execution.
- `packages/vseed`: VSeed examples, lowering, and rendering specs.
- `packages/vbi-agent`: Builder Agent runtime and tool protocol.
- `packages/vbi-component`: shared component layer for VBI.
- `packages/vbi-react`: React integration.
- `apps/*`: product applications, docs website, backend, provider, and CLI.
- `practices/*`: independent practice examples. Treat
  `practices/vbi-react-starter` as the `@visactor/vbi-react` integration starter,
  separate from the self-contained practice apps.

Run repository-level commands from the repo root unless a package script requires
otherwise.

## References

Load only the relevant reference:

Keep generic guidance directly under `references/`. Put app-specific guidance
under `references/apps/`, package-specific guidance under
`references/packages/`, and practice-specific guidance under
`references/practices/`.

- `references/software-entropy.md`: maintainability, refactoring, cleanup,
  deletion, generated-surface control, and optimization habits.
- `references/apps/website.md`: `apps/website`, Rspress docs, generated
  API/example docs, and multilingual documentation synchronization.
- `references/apps/vbi-be.md`: `apps/vbi_be`, NestJS backend, Prisma,
  collaboration server, and Docker-only backend development workflow.
- `references/apps/vbi-fe.md`: `apps/vbi_fe`, Next.js frontend, UI state,
  service clients, and Docker-only frontend development workflow.
- `references/packages/vbi.md`: `packages/vbi`, VBI DSL,
  Builder/sub-builder design, headless logic boundaries, and TDD expectations.
- `references/packages/vquery.md`: `packages/vquery`, QueryDSL-to-SQL, DuckDB
  execution, example-driven tests, and coverage expectations.
- `references/packages/vseed.md`: `packages/vseed`, VSeed examples, and
  generated VSeed documentation.
- `references/practices/minimalist.md`: `practices/minimalist`.
- `references/practices/standard.md`: `practices/standard`.
- `references/practices/streamlined.md`: `practices/streamlined`.
- `references/practices/professional.md`: `practices/professional`.

## Validation

Prefer the narrowest proving command first, then repository gates when practical:

For `apps/vbi_be` and `apps/vbi_fe`, use the in-container commands from
`references/apps/vbi-be.md` and `references/apps/vbi-fe.md` instead of the
host-local examples below.

```bash
pnpm --filter <package-name> run test
pnpm --filter <package-name> run lint
pnpm --filter <package-name> run typecheck
pnpm run lint:check
pnpm run typecheck
```

If generated artifacts are affected, run the generator first and inspect the
generated diff. Report any validation that could not run and why.
