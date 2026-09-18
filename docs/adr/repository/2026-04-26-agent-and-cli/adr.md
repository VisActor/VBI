# ADR-001: CLI Composes Toolsets, Agent Core Only Operates Builder

Status: Accepted; Date: 2026-04-26

## Context

- `packages/vbi` owns VBIChartDSL, Builder, and DSL transformation; `packages/vquery` owns QueryDSL to SQL; `packages/vseed` owns VSeedDSL to VChart/VTable Spec.
- `apps/vbi_provider`, `apps/vbi_fe`, and `apps/vbi_be` own platform resources, remote collaboration, authorization, and concrete business flows.
- `apps/vbi_agent` currently contains agent runtime, model provider, TUI, platform provider integration, resource CRUD, and builder operation tools at the same time.

LLMs need both Builder capabilities and platform resource capabilities. The issue is not whether an agent should exist, but that agent, CLI, provider, and resource CRUD are mixed in the same application directory. That makes atomic capabilities in `packages` reverse-depend on platform implementation details, which hurts independent open sourcing and reuse.

## Decision

Rename and narrow the existing `apps/vbi_agent` into `apps/vbi_tui`. CLI is an application shell: it only connects providers, handles platform resources, and hosts concrete interaction flows.

Add `packages/vbi-agent`. The Agent package provides general runtime/tool abstractions and BuilderToolset. Resource CRUD is created by the CLI as ResourceToolset from provider and then injected into runtime. Dependency inversion happens at the general tool layer, not in the resource domain layer.

### Responsibility Boundaries

`apps/vbi_tui`:

- Integrates with `apps/vbi_provider`, `@visactor/vbi-provider`, or other platform providers.
- Opens remote resources and obtains `VBIChartBuilder` or other Builder instances.
- Adapts Builder into the workspace required by `packages/vbi-agent`.
- Creates a controlled ResourceToolset and injects it into LLM runtime together with BuilderToolset.
- Integrates with model providers and hosts resource CRUD, authorization, TUI, command parsing, and app business flows.

`packages/vbi-agent`:

- Receives a caller-injected Builder workspace.
- Reads, modifies, generates, and checks VBIChartDSL, VQueryDSL, and VSeedDSL held by Builder.
- Provides BuilderToolset, context descriptions, agent runtime abstractions, and runs caller-injected generic tools.
- Does not create platform clients, define ResourceToolset, read environment variables, or know about `resourceId`, HTTP, Hocuspocus, authorization, or resource lists.

```text
apps/vbi_tui -> packages/vbi-agent
apps/vbi_tui -> @visactor/vbi-provider or apps/vbi_provider
apps/vbi_tui -> model provider SDK
packages/vbi-agent -> @visactor/vbi
@visactor/vbi -> @visactor/vquery -> @visactor/vseed
```

## Core Interfaces

Agent obtains Builder through an abstract workspace. The workspace is created by the CLI, and Agent does not know whether Builder comes from a local file, remote collaboration, or a test fixture. Resource capabilities are injected through generic tools and do not enter `VBIAgentWorkspace`.

```ts
export type VBITool = {
  name: string
  description: string
  execute(input: unknown): Promise<unknown>
}

export interface VBIAgentWorkspace {
  getActiveChartBuilder(): Promise<VBIChartBuilder>
  close?(): Promise<void>
}

export type VBIBuilderAgentInput = { workspace: VBIAgentWorkspace; tools?: VBITool[] }
```

CLI composes BuilderToolset and ResourceToolset:

```ts
const provider = client.chart(resourceId)

const workspace: VBIAgentWorkspace = {
  getActiveChartBuilder: () => provider.open(),
  close: () => provider.close(),
}

await runAgent({
  model,
  tools: [...createBuilderTools(workspace), ...createResourceTools(client)],
})
```

## Consequences

Positive impact:

- `packages/vbi`, `packages/vquery`, and `packages/vseed` remain platform-agnostic and easier to open source independently.
- `packages/vbi-agent` can be reused independently as the Builder intelligence layer.
- `apps/vbi_tui` can compose different platform providers, model providers, permission systems, and resource tools.
- Platform resource logic does not pollute Builder and Agent; adding a new mode only requires a new CLI adapter.

Costs:

- CLI must explicitly implement the provider-to-Builder adapter layer and ResourceToolset.
- Agent runtime needs a stable generic tool protocol.
- The existing `apps/vbi_agent` must be split into `apps/vbi_tui` and `packages/vbi-agent`.

## Migration Plan

1. Extract `VBIAgentWorkspace` and builder operation tools from `apps/vbi_agent`, making the tools depend only on Builder.
2. Create `packages/vbi-agent` and move runtime, history, activity-log, agent types, context building, and builder tools into it.
3. Rename `apps/vbi_agent` to `apps/vbi_tui`, keeping `cli.ts`, `parse.ts`, `tui/*`, model provider, and platform provider integration.
4. Implement the provider-to-`VBIAgentWorkspace` adapter layer and ResourceToolset in `apps/vbi_tui`.
5. Add unit tests for `packages/vbi-agent` that do not depend on platform provider.
6. Clean up old `apps/vbi_agent` paths, package names, scripts, imports, docs, and test references.
