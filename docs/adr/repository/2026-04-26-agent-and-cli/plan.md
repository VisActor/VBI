# Plan: Split `vbi_agent` Into A CLI Shell And Builder Agent Package

> Based on [`./adr.md`](./adr.md)
> This file guides the migration order from `apps/vbi_agent` to `apps/vbi_tui` + `packages/vbi-agent`.

## Goal

Separate the agent runtime, model integration, TUI, platform provider, resource CRUD, and builder tools currently mixed inside the application directory:

- `packages/vbi-agent` becomes a general Agent package that only operates Builder.
- `apps/vbi_tui` becomes the application shell that connects provider, model provider, resource tools, and TUI.
- `packages/vbi`, `packages/vquery`, and `packages/vseed` remain platform-agnostic.
- Resource CRUD is injected into generic tools through the CLI and does not enter the Agent package or Builder workspace abstraction.

## Scope

Includes: renaming and narrowing `apps/vbi_agent`, the new `packages/vbi-agent` package, migration of runtime / history / activity-log / types / builder tools, CLI provider adapter layer, ResourceToolset, and old reference cleanup.

Does not include: permission system, multi-tenancy, resource version history, productizing new model providers, or business semantic changes in `packages/vbi` / `vquery` / `vseed`.

## Smell Scan

1. `apps/vbi_agent` owns runtime, TUI, model provider, provider integration, resource capabilities, and builder tools at the same time, so its responsibility is too broad.
2. The package name is `@visactor/vbi-agent`, but README and usage examples already show `vbi_tui` semantics, so naming facts are inconsistent.
3. Builder tools live inside an application directory, blocking package-level reuse.
4. The CLI build script directly depends on the provider build, creating tight coupling between the application shell and platform integration.

## Development Principles

### Builder First

`packages/vbi-agent` only receives caller-injected `VBIAgentWorkspace` and only works around VBIChartDSL, VQueryDSL, and VSeedDSL held by Builder.

Forbidden: creating platform clients, reading environment variables, knowing about `resourceId` / HTTP / Hocuspocus / authorization / resource lists, or defining ResourceToolset inside `VBIAgentWorkspace` in the Agent package.

### CLI Composition

`apps/vbi_tui` composes the provider workspace adapter layer, BuilderToolset, ResourceToolset, model provider, TUI, command parsing, and concrete application flow.

### Quality Constraints

1. Every migration behavior must have corresponding unit tests or a minimal executable validation.
2. At the end of each phase, run that module's smallest validation command.
3. Before merge, repository-level `lint` and `typecheck` must pass.
4. Old dead paths, dead imports, dead scripts, or dead docs for `apps/vbi_agent` are not allowed.
5. `packages/vbi-agent` must not depend on `@visactor/vbi-provider`, React, Ink, dotenv, or concrete model SDKs.

## Execution Order

1. Define the public interface for `packages/vbi-agent`.
2. Extract BuilderToolset and Agent runtime.
3. Rename and narrow `apps/vbi_tui`.
4. Implement the provider workspace adapter layer and ResourceToolset in CLI.
5. Complete tests and boundary validation.
6. Clean up old references and complete repository-level validation.

Reason: stabilize the Agent package contract first so CLI can compose platform capabilities against that contract; extract Builder tools first to stop resource CRUD from polluting the Agent core; clean old paths last so migration interruptions do not leave commands unrunnable.

## Execution Checklist

### Step 1: Establish `packages/vbi-agent`

Definition of done: add package name `@visactor/vbi-agent`; export `VBITool`, `VBIAgentWorkspace`, and `VBIBuilderAgentInput`; export the minimal public entry points for runtime, history, activity-log, and agent types; dependencies include only what the generic runtime needs plus `@visactor/vbi`; package-level typecheck passes. Use consistent rslib and provide runtime agent support for Node and browser environments.

Blockers: none

### Step 2: Migrate BuilderToolset

Definition of done: `createBuilderTools(workspace)` does not depend on CLI, provider, environment variables, or resource ID; chart and insight builder read, modify, generate, and check tools are moved into the package; tests use local fixtures or mock workspace; the application directory does not keep duplicate builder tools.

Blockers: depends on Step 1

### Step 3: Migrate Generic Agent runtime

Definition of done: runtime, history, activity-log, tool protocol, and context building move into `packages/vbi-agent`; runtime receives caller-injected model provider and tools; the generic provider-script executor enters the package, while CLI-specific loading logic stays in the application shell; original runtime tests move into the package.

Blockers: depends on Step 1

### Step 4: Narrow `apps/vbi_tui`

Definition of done: `apps/vbi_agent` is renamed to `apps/vbi_tui`; the TUI application no longer occupies the `@visactor/vbi-agent` package name; `cli.ts`, `parse.ts`, `tui/*`, model provider, and platform provider integration are retained; CLI imports runtime and BuilderToolset from `@visactor/vbi-agent`; README, bin, scripts, and test paths all change to `apps/vbi_tui`.

Blockers: depends on Step 2 and Step 3

### Step 5: Implement Workspace Adapter Layer And ResourceToolset

Definition of done: CLI opens resources through `@visactor/vbi-provider` or `apps/vbi_provider`; provider is adapted into `VBIAgentWorkspace`; ResourceToolset is defined only in CLI; the agent entry point injects `[...createBuilderTools(workspace), ...createResourceTools(client)]`; Agent package source does not contain provider, HTTP, Hocuspocus, authorization, or resource list types.

Blockers: depends on Step 4

### Step 6: Cleanup, Validation, And Acceptance

Definition of done: old `apps/vbi_agent` paths, imports, scripts, docs, and test references are all cleaned up; `packages/vbi-agent` unit tests do not depend on platform provider; `apps/vbi_tui` unit tests cover command parsing, model configuration, workspace adapter, and ResourceToolset; repository-level `pnpm run lint` and `pnpm run typecheck` pass.

## Acceptance Scenarios

1. Local test fixtures can run `@visactor/vbi-agent` directly and operate chart builder.
2. CLI can open a remote chart through provider and inject builder into Agent.
3. CLI can inject ResourceToolset and BuilderToolset at the same time.
4. Agent package source does not contain platform provider, `resourceId`, HTTP, Hocuspocus, dotenv, Ink, or React.
5. The repository has no old main-path references to `apps/vbi_agent`.
6. Validate VBI Docker configuration and ensure resources are copied correctly.
