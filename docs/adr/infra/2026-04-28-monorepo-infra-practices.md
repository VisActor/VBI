# ADR: Monorepo Engineering Practice Baseline

Status: Accepted; Date: 2026-04-28

## Context

VBI is a monorepo managed by pnpm workspace and Turborepo. The repository contains reusable packages in `packages/`, agent skills in `.agents/skills/`, integration examples in `practices/`, development tools in `tools/`, and the documentation site in `apps/website/`. If engineering configuration is scattered, several direct problems appear:

- Root scripts, Turbo tasks, and CI steps drift semantically, causing local development and CI to run different task sets.
- The artifact semantics of `build`, `typecheck`, `test`, and `lint` become mixed together, making it hard to decide whether a cached result is trustworthy.
- Multiple TS base configs force every new package to copy `target`, `lib`, `paths`, `references`, `noEmit`, and `composite` in a shotgun pattern.
- If the workspace scope is described by both `package.json.workspaces` and `pnpm-workspace.yaml`, the repository ends up with two sources of truth.

This ADR records the current repository engineering baseline. Future tasks, packages, CI jobs, and TS configuration should follow it by default.

## Decision

### Keep Root Scripts To Stable Entry Points

The root `package.json` should be the unified entry point for developers and CI. Commands that belong in root scripts must satisfy these conditions:

- The repository-level behavior is clear, such as `build`, `typecheck`, and `test`.
- Local development and CI can reuse the same command.
- Side effects are explicit. Commands that modify files use dedicated entry points, for example `lint` performs fixes while `lint:check` only checks.

Current convention:

```json
{
  "build": "turbo build",
  "typecheck": "turbo typecheck",
  "test": "turbo test",
  "test:update": "turbo test:update",
  "format": "oxfmt .",
  "format:check": "oxfmt --check .",
  "lint": "oxlint --fix .",
  "lint:check": "oxlint ."
}
```

`dev` starts the documentation website through `pnpm --filter=website run dev`
directly, so the Turbo task graph does not carry this long-running workflow.

### Turbo Caches Only Real Artifacts

Turbo tasks must distinguish "produces files" from "only validates":

- `build` declares real artifacts, defaulting to `outputs: ["dist/**"]`.
- Special packages override artifacts individually, for example `website#build` uses `outputs: ["doc_build/**"]`.
- `typecheck` and `test` only validate and declare no artifacts, using `outputs: []`.
- `test:update` updates snapshots or fixtures and must disable caching.
- Upstream package `dist` output is still a real dependency for current TS references and package `types`, so `typecheck` and `test` continue to use `dependsOn: ["^build"]`.

The core rule is: cache reusable artifacts, not command names. Validation tasks must not pretend that `dist/**` or `doc_build/**` is their own output, because cache hits would then hide real verification.

### Put Global Inputs In `globalDependencies`

Files that affect results for whole-repository tasks must be placed in `turbo.json.globalDependencies`. The current set should cover at least:

- `pnpm-lock.yaml`
- `pnpm-workspace.yaml`
- `tsconfig.base.json`
- `tsconfig.test.json`
- `.oxlintrc.json`
- `.oxfmtrc.json`

When adding global configuration, first decide whether it affects build/typecheck/test results. If it does, add it to `globalDependencies`; otherwise, do not widen the cache invalidation surface.

### CI Checks Only, It Does Not Fix

CI must not run commands that modify files. Format and lint must use check entry points in CI:

```yaml
- run: pnpm run format:check
- run: pnpm run lint:check
```

Locally, `pnpm run lint` can be used for automatic fixes, but CI should only report failures. This prevents CI from producing uncommitted changes in PRs and keeps lint failures reproducible.

Turbo cache in CI uses the GitHub Actions local cache first:

```yaml
path: .turbo/cache
key: turbo-${{ runner.os }}-${{ github.job }}-${{ github.sha }}
restore-keys: |
  turbo-${{ runner.os }}-${{ github.job }}-
  turbo-${{ runner.os }}-
```

This approach prioritizes local cache reuse for build/typecheck/test. Whether to introduce remote cache should be evaluated separately later, including permissions, isolation, cost, and cache poisoning risk.

### Keep One TS Configuration Baseline

The root keeps only two general-purpose configs:

- `tsconfig.base.json`: Default baseline for production and library builds.
- `tsconfig.test.json`: Overlay for test type checking, overriding only options that must differ for tests.

`target` and `lib` should be unified across the repository. The current baseline is:

```json
{
  "target": "ES2022",
  "lib": ["ES2022", "DOM"]
}
```

Unless there is a clear compile failure or runtime constraint, packages, apps, and practices should not redeclare `target` and `lib`. After extending the base, keep only locally necessary configuration, such as:

- Apps need `jsx`, `noEmit`, and `composite: false`.
- Libraries need `outDir`, `rootDir`, `paths`, and `references`.
- Test configs need `noEmit: true` and `emitDeclarationOnly: false`.
- NodeNext or CommonJS tools that cannot extend the base yet must still manually keep the same `target/lib` pair.

Do not split out intermediate layers such as `tsconfig.app.json` or `tsconfig.library.json` again unless several stable type families emerge that cannot be expressed with local overrides. Before adding an intermediate layer, prove that it reduces duplication rather than adding inheritance depth.

### Workspace Scope Belongs To pnpm

The workspace scope is managed only by `pnpm-workspace.yaml`. Do not add a `workspaces` field to the root `package.json`. A repository should have only one workspace source of truth.

### Do Not Fake Test Scripts

Only packages with real test suites should add `test` or `test:update`. Packages without tests should not add no-op scripts, because Turbo would make "no tests" look like "tests passed."

When tests exist but an update entry point is missing, add the command for the framework:

- Rstest uses `rstest --update`.
- Jest uses `jest --updateSnapshot`.

## Maintenance Rules

When adding or adjusting engineering configuration, evaluate it in this order:

1. Does this change alter root entry points, the Turbo task graph, CI behavior, or the global TS baseline?
2. If it does, update the single source of truth first, then remove duplicate local configuration.
3. If it adds a cached output, confirm that the output is a real artifact.
4. If it adds a validation task, default to `outputs: []`.
5. If it adds a task that modifies files, do not run it directly in CI.
6. If it adds a package, prefer extending `tsconfig.base.json` and write only local differences.

## Validation Checklist

Engineering changes must run at least:

```bash
pnpm run format:check
pnpm run lint:check
pnpm run typecheck
pnpm run build
pnpm run test
```

For TS configuration changes, additionally check:

```bash
rg '"target"|"lib"' --glob 'tsconfig*.json'
rg 'tsconfig\.app|tsconfig\.library' --glob 'tsconfig*.json' --glob 'turbo.json'
```

For Turbo configuration changes, additionally check:

```bash
pnpm turbo build --dry
pnpm turbo typecheck --dry
pnpm turbo test --dry
pnpm turbo test:update --dry
```

Focus areas:

- website build artifacts declare only `doc_build/**`.
- Other build artifacts default to only `dist/**`.
- `typecheck` and `test` have empty `outputs`.
- `test:update` is not cached.
- `globalDependencies` covers all configuration files that affect whole-repository results.

## Consequences

Benefits:

- Local development and CI use the same entry points, shortening the validation path.
- Turbo cache semantics are more trustworthy, with a clear boundary between build artifacts and validation tasks.
- TS configuration is smaller, and new packages no longer copy large blocks of compiler options.
- workspace, TS base, and Turbo global input each have a single source of truth.

Costs:

- `typecheck` and `test` still depend on `^build`, so clean environments build upstream packages first.
- Apps need to explicitly override `noEmit`, `emitDeclarationOnly`, and `composite` to avoid inheriting library build semantics.
- remote cache is not included yet and needs a separate follow-up decision.
