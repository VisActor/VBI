# ADR: Provider-Oriented Platform-Level Headless BI Architecture

## Summary

VBI's next-stage goal is no longer only to provide atomic capabilities under `packages/`, nor only to finish the validation applications `vbi_fe` and `vbi_be`. It is to evolve into a real platform-level Headless BI system.

To reach this goal, the system must move from "page-driven resources" to "Provider-driven resources hosted by `@visactor/vbi-provider`":

- `chart` and `insight` are two independent resources.
- `@visactor/vbi-provider` is the platform-level application SDK.
- `ChartProvider` and `InsightProvider` are the two first-class SDK entry points.
- Pages, CLI, and any JS runtime obtain resource capabilities through Provider.
- Provider can directly return the corresponding Builder.
- The editable body of a resource is built on collaborative documents, not REST detail DTOs.

The core decisions in this ADR are:

- The platform exposes Provider semantics through `@visactor/vbi-provider`, not UI semantics.
- Provider owns Builder creation.
- REST is the management plane, and the collaboration protocol is the data plane.
- `Bytes` stays inside persistence and collaboration paths; the business layer uniformly exposes JSON and Builder.

## Context

The current system already has this foundation:

- `@visactor/vbi` owns configuration DSL and Builder.
- `@visactor/vquery` owns query DSL and SQL execution.
- `@visactor/vseed` owns rendering DSL and Spec generation.
- `apps/vbi_be` has basic backend capabilities for the two resource types: `chart / insight`.
- `apps/vbi_fe` has basic management pages and collaborative editing pages.

But the current model still has these problems:

### 1. Scattered Call Entry Points

Resource capabilities are currently exposed mainly through page interactions. If CLI is introduced later, it can easily split off a second call path. Later support for Node.js scripts, embedded applications, or other hosts could introduce a third path.

This causes:

- Inconsistent capability semantics.
- Scattered Builder initialization logic.
- Different runtimes operating the same resource differently.

### 2. Unstable Boundary Between Resource Body And Business Interfaces

The resource body is actually a collaborative document at the lower layer, but business interfaces can easily degrade into "project database content to pages," resulting in:

- Pages assembling collaboration connections themselves.
- Consumers constructing Builder themselves.
- Storage details leaking into the business layer.

### 3. Headless BI Platform Capability Has Not Converged

If a capability can only be called by pages, but not by CLI or any JS runtime, it is still an application capability rather than a platform capability.

Therefore, resource capabilities must converge into a unified SDK abstraction, and that SDK is `@visactor/vbi-provider`.

## Decision

### 1. Adopt Provider First Architecture Hosted By `@visactor/vbi-provider`

The VBI platform exposes first-class Providers through `@visactor/vbi-provider`, instead of using page components, page services, or specific application APIs as entry points.

Provider is the runtime entry point for resources and directly owns:

- Establishing backend connections.
- Opening collaborative documents.
- Obtaining Builder.
- Providing resource CRUD.
- Providing resource detail, snapshot, and export capabilities.
- Providing resource-specific business actions.

### 2. Only Three First-Class Providers Exist

The platform defines only these two first-class Providers:

- `ChartProvider`
- `InsightProvider`

Do not expose an overly generic `ResourceProvider<T>` as the main public model. Internal reuse is allowed, but public semantics must clearly distinguish the two resource types.

Reasons:

- `chart` is a configuration, query, and rendering resource.
- `insight` is a semantic content resource.

They share part of the resource lifecycle semantics, but not the complete operation set.

### 3. Provider Can Directly Return The Corresponding Builder

Provider must support directly returning the corresponding Builder:

- `ChartProvider -> VBIChartBuilder`
- `InsightProvider -> VBIInsightBuilder`

This means:

- Provider owns Builder creation.
- Pages, CLI, and scripts should not instantiate Builder themselves and restore documents themselves.
- Consumers only care about obtaining an operable Builder; they do not care how the underlying YDoc is restored.

### 4. All Resource Operations Can Run In Any JS Runtime

Provider design must be pure TypeScript / JavaScript runtime objects consumable by:

- `apps/vbi_fe`
- `apps/vbi_tui`
- Node.js scripts
- regular browser JS runtimes
- future host applications

This means Provider must not bind to:

- React
- DOM
- a specific page state-management solution

Pages are Provider consumers, not where Provider is defined.

### 5. Resource Editing Centers On Collaboration Connections

The editable body of a resource is a collaborative document, not REST detail.

Therefore:

- When Provider opens a resource, the collaboration connection is primary.
- Builder is bound to the collaborative document.
- Continuous editing and state synchronization happen through the collaboration path.

REST continues to exist, but its responsibilities converge to:

- Creating / deleting resources.
- Resource summary queries.
- Resource metadata queries.
- Reference checks.
- Structural orchestration commands.
- Command-style capabilities such as snapshot export.

### 6. The Backend Splits Into Management Plane And Data Plane

The backend must explicitly split into two planes:

- Management plane: REST or equivalent command interface.
- Data plane: collaboration protocol interface.

Where:

- The management plane owns metadata, commands, and queries.
- The data plane owns document opening, snapshot restoration, and incremental synchronization.

Provider is the client abstraction that consumes both planes.

### 7. `Bytes` Stays Only In Persistence And Collaboration Paths

Using `Bytes` in the database to store Yjs snapshots and increments is reasonable.

But the business layer must keep boundaries clear:

- `Bytes` belongs to persistence and collaboration protocols.
- JSON belongs to business semantic projection.
- Builder belongs to the operable runtime view.

REST business interfaces should not directly expose raw `Bytes`.

## Detailed Decisions

### A. Platform Object Model

`@visactor/vbi-provider` provides the top-level platform client:

```ts
const client = await createVBIProviderClient(config)

const chartProvider = client.chart(chartId)
const insightProvider = client.insight(insightId)
```

The three-layer relationship is fixed:

`client -> provider -> builder`

Responsibility layers:

- `client`: authentication, configuration, transport assembly.
- `provider`: resource-level capabilities.
- `builder`: DSL-level operations.

### B. Minimum Capability Set For The Three Providers

All Providers should share minimum resource semantics:

- `create`
- `remove`
- `rename`
- `open`
- `close`
- `getBuilder`
- `getSummary`
- `getDetail`
- `snapshot`

Then each resource type extends them.

#### ChartProvider

Additional responsibilities:

- Return `VBIChartBuilder`.
- Expose derived capabilities related to `VQuery` / `VSeed`.

#### InsightProvider

Additional responsibilities:

- Return `VBIInsightBuilder`.
- Handle insight content projection.

### D. Relationship Between Pages, CLI, And Scripts

#### Pages

Pages are only responsible for:

- Display.
- Interaction.
- Lifecycle management.
- Translating user actions into Provider calls.

#### CLI

CLI is only responsible for:

- Parsing commands.
- Calling Provider.
- Outputting results.

CLI should not bypass Provider to implement a second set of resource semantics.

#### Regular Scripts / External Runtimes

Scripts are only responsible for:

- Initializing the platform client.
- Obtaining Provider.
- Calling Provider or Builder.

If a capability can only be done in pages and not in scripts, it is not yet a platform capability.

## Consequences

### Positive Impact

#### 1. Unified Capability Entry Point

Pages, CLI, scripts, and host applications all access the same capabilities through Provider, stabilizing platform semantics.

#### 2. Unified Builder Lifecycle

Builder creation, restoration, and connection are managed uniformly by Provider, avoiding inconsistent behavior across runtimes.

#### 3. Better Fit For Headless BI

The system truly moves from "frontend application driven" to "resource runtime driven," making it more suitable for embedding and automation.

#### 4. Easier SDK Productization

Once the Provider interface is stable, `vbi_tui` and external SDKs can be built on the same model.

### Costs And Risks

#### 1. Current Frontend Calls Need Migration

Existing direct API calls and direct collaboration connection assembly in `vbi_fe` must be gradually migrated to Provider.

#### 2. Backend Interfaces Need Re-Layering

The backend must more clearly distinguish the management plane and data plane, avoiding continued mixing of "business detail" and "collaborative resource body."

#### 3. Provider Design Must Stay Restrained

Provider is a first-class entry point, but it must not become a new "god object." The responsibility boundaries of the two Providers must remain clear.

## Alternatives Considered

### Option 1: Continue With Page Services As The Main Path

Approach:

- Frontend pages continue calling APIs directly.
- CLI wraps another service layer.
- Each side constructs Builder itself.

Rejected because:

- Capability entry points keep splitting.
- Builder lifecycle remains scattered.
- It does not support platformization or Headless direction well.

### Option 2: Expose Only Generic `ResourceProvider<T>`

Approach:

- Unify both resource types into one abstract provider.

Rejected because:

- The capabilities of `chart / insight` differ significantly.
- Over-abstraction reduces readability and platform semantic clarity.

### Option 3: Make REST Primary And Collaboration Only A Page Enhancement

Approach:

- Resource detail mainly relies on REST.
- Collaboration is only enabled in a few page scenarios.

Rejected because:

- The editable resource body would degrade into DTO-driven behavior.
- Provider could not truly unify pages, CLI, and scripts.
- It conflicts with the goal that "the resource body is a collaborative document."

## Package Placement

`@visactor/vbi-provider` is a new subpackage placed under:

- `apps/packages/vbi-provider`

Reasons:

- This package is not part of the low-level DSL atomic capabilities themselves.
- This package targets application runtime and platform integration.
- It naturally sits closer to the `apps/` side than to the pure `packages/` kernel capability side.

This package should follow existing monorepo conventions:

- Build with `rslib`.
- Use conventions consistent with existing packages for `eslint` / `prettier` / `typescript`.
- Provide stable exports as a pure TypeScript SDK.

## Scope

This ADR includes:

- Positioning of `@visactor/vbi-provider`.
- Provider First platform direction.
- Boundaries of the two first-class Providers.
- Platform client object model.
- Management-plane / data-plane layering principles.
- Builder ownership and acquisition model.

This ADR does not include:

- Concrete TypeScript interface signature details.
- Authorization model.
- Multi-tenancy model.
- Provider cache strategy and connection reuse details.
- CLI subcommand list.

## Follow-up

Based on this ADR, the following should be produced next:

1. `plan.md`
   - Clarify the execution order for Provider First.
2. `@visactor/vbi-provider` interface design draft
   - Clarify `VBIProviderClient` and the refined interfaces for the two Providers.
3. `vbi_tui` target command set
   - Clarify how CLI maps to Provider.
4. Frontend/backend migration plan
   - Migrate pages from direct API / hook calls to Provider calls.

## Final Position

The core direction for the next evolution of the VBI platform is:

- Use `@visactor/vbi-provider`, not page services, as the first-class platform capability entry point.
- Use two Providers, not a vague generic abstraction, to carry resource semantics.
- Use collaborative documents, not REST detail, as the editable resource body.
- Use Builder as the resource operation surface.
- Use pages, CLI, and scripts as different consumers of Provider.

This is the core architecture decision that moves VBI from a "capability collection" to "platform-level Headless BI."
