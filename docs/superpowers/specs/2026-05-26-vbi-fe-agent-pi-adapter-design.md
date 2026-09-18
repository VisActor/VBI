# VBI FE Agent Pi Adapter Design

## Goal

Refactor the `apps/vbi_fe` Agent module to follow the official Pi Web UI integration path first, while keeping VBI's product-specific resource tools, backend streaming proxy, and conversation sidebar behavior.

## Current Context

`apps/vbi_fe` currently integrates Pi through these frontend-owned modules:

- `src/views/agent/agent-runtime.ts` creates `ChatPanel`, `VBIAgent`, model config, stream proxy wiring, persistence, and panel refresh behavior.
- `src/views/agent/agent-storage.ts` creates Pi Web UI `AppStorage` and maintains VBI conversation metadata helpers.
- `src/views/agent/agent-provider-kit.ts` builds VBI resource tools and collaboration-backed Builder workspace slots.
- `src/views/agent/agent-stream-proxy.ts` adapts VBI backend stream events to Pi agent stream events.
- `src/views/AgentPage.tsx` owns the React host, runtime switching, and conversation activation flow.
- `src/stores/agent-conversations.store.ts` owns sidebar-visible conversation summaries and active conversation state.

The official Pi Web UI path is:

`ChatPanel.setAgent()` -> `Agent` state and tools -> `AppStorage` with `SessionsStore` -> IndexedDB session metadata.

The VBI frontend must stay on this path where possible, adding only the minimum browser and product adapters required by VBI.

## Design

### 1. Page-Level Pi Boundary

Do not use `next.config.ts` aliases for the Agent integration. Keep `turbopack.resolveAlias` empty.

Avoid large SSR/page builds by making `apps/vbi_fe/src/app/manage/agent/page.tsx` a small dynamic boundary:

- The route page dynamically imports `src/views/AgentPage`.
- `AgentPage` and its runtime modules remain client-only.
- Pi Web UI loading stays behind runtime-level dynamic imports so the route's SSR graph does not eagerly include Pi Web UI, attachments, PDF handling, or agent runtime code.
- If Pi Web UI's package `exports` blocks subpath imports and the public package entry eagerly pulls heavyweight modules, load the needed Pi Web UI dist files from the Agent runtime instead of adding Next aliases.

### 2. Runtime Boundary

Split the runtime concerns so each file has one clear owner:

- Runtime factory: creates the Pi `ChatPanel`, `VBIAgent`, stream function, and lifecycle subscriptions.
- Session repository: wraps Pi `AppStorage` and `SessionsStore` setup, load, save, metadata, and sorting.
- Model config: resolves public backend config, environment overrides, legacy DeepSeek aliases, and persisted model defaults.
- Usage display: remains a small DOM adapter because Pi Web UI does not expose this VBI-specific context usage surface.
- Provider kit: owns VBI resource and Builder workspace tools only.

`AgentPage.tsx` should stay a React container. It should mount/destroy runtime instances and update the conversation store, but it should not know Pi storage internals or VBI Builder details.

### 3. Session Persistence

Use official Pi Web UI storage primitives:

- `AppStorage`
- `IndexedDBStorageBackend`
- `SettingsStore`
- `ProviderKeysStore`
- `SessionsStore`
- `CustomProvidersStore`
- `setAppStorage`

The VBI layer may still compute metadata title, preview, usage, and running/completed status for the management sidebar. That logic should remain a narrow adapter around official `SessionsStore.save`, `get`, `loadSession`, and `getAllMetadata`.

### 4. Stream Proxy

Keep VBI's backend stream proxy. Browser-side Pi should not call provider APIs directly from the frontend.

The stream adapter must:

- Send `{ model, context, options }` to `/api/v1/agent/stream` through the resolved proxy URL.
- Preserve abort behavior through `AbortSignal`.
- Pass through the native `AssistantMessageEvent` stream expected by `pi-agent-core`.
- Forward only serializable stream options.

### 5. VBI Resource Tools

Keep VBI resource ownership in the frontend provider kit:

- The `vbi_resource` tool calls Provider REST APIs for list/create/get/rename/remove.
- Builder tools from `@visactor/vbi-agent` operate on collaboration-backed VBI builders.
- Collaboration connection creation, sync wait, cleanup, and connector registration stay behind workspace slots.

React views must not rebuild VBI DSL directly. Builder mutation remains owned by `@visactor/vbi-agent` and `@visactor/vbi` builder APIs.

### 6. Dependency Upgrade Policy

Before implementation, check the npm latest versions for:

- `@earendil-works/pi-agent-core`
- `@earendil-works/pi-ai`
- `@earendil-works/pi-web-ui`

If `apps/vbi_fe/package.json` already matches latest, do not churn dependency versions or lockfile. If a newer compatible version exists, update `apps/vbi_fe/package.json` and `pnpm-lock.yaml`, then rebuild the frontend container before trusting validation.

### 7. Testing And Validation

Add or update focused frontend tests for:

- Pi storage initialization through the public Pi Web UI entry.
- Conversation metadata and persistence behavior.
- Runtime model/proxy config resolution.
- Agent page conversation activation race handling.
- Provider kit collaboration URL and workspace slot behavior.
- Stream proxy event conversion and abort/error handling if the refactor touches stream parsing.

Run validation through Docker:

Run the five Docker commands documented in
`.agents/skills/development/references/apps/vbi-fe.md`. They cover `lint`,
`format`, `typecheck`, `test`, and `build`. If containers are not running, use
the documented `vbi_fe` Docker workflow from the repository root.

## Non-Goals

- Do not replace the VBI conversation sidebar with the stock Pi session dialog.
- Do not move browser Agent execution to `@earendil-works/pi-coding-agent`; that SDK is CLI/session oriented and would expand the browser integration surface.
- Do not remove the VBI backend stream proxy.
- Do not hand-edit generated artifacts as the source of truth.
- Do not refactor unrelated management pages, backend migrations, or Provider contracts.

## Open Decisions Resolved

- The integration should be official-Pi-first, not a custom standalone chat UI.
- Pi dependencies should be upgraded only when npm latest is newer than the current pinned versions.
- Existing uncommitted user changes in Agent-related files are treated as baseline work and must not be reverted.
