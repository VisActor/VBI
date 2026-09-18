# VBI Frontend Development

Use for `apps/vbi_fe`, `docker/vbi_fe/*`, and frontend service configuration in
`docker/docker-compose.dev.yml`. `apps/vbi_fe` owns the Rsbuild React shell,
the typed application API, stores, services, collaboration wiring, preferences,
and chart/insight/agent views.

The frontend is not only a human-operated UI. Every durable Web capability must
be reachable through the composable `src/application` API, selected in React with
`useApplication`, and exposed consistently to non-human callers through the same
semantic interface. A button click, route loader, drawer flow, or page-specific
handler is not a feature unless the corresponding application capability exists.

## Non-Negotiable Runtime Rules

- Develop, run, debug, test, typecheck, lint, and build `vbi_fe` through Docker.
- Do not start the frontend dev server, frontend validation, or frontend builds
  on the host.
- Host `pnpm --filter @visactor/headless-bi-fe ...` commands are off-limits
  unless the user explicitly overrides this rule.
- If a root script is missing, call `docker compose` directly.
- Keep the Docker dev runtime on Rsbuild. Do not add Next.js, Turbopack,
  webpack fallback switches, scripts, commands, or docs.
- `apps/vbi_fe/rsbuild.config.ts` owns the frontend entry, dev server, and
  proxy configuration.

## Application API First

- All Web functionality belongs behind `src/application` before it becomes UI.
  Pages and components may render state, collect user input, and bind events,
  but durable behavior must be callable through `application` and selectable
  through `useApplication`.
- Implement capabilities as composable domain modules such as `agent`,
  `chart`, `insight`, `i18n`, and `theme`. Add a new
  module or submodule when a workflow has a stable domain name; do not hide it
  inside a page, modal, drawer, hook, or store as a one-off action.
- The public shape is semantic and command-oriented: expose grouped state
  projections plus verbs such as `activate`, `open`, `list`, `create`,
  `rename`, `delete`, `select`, `search`, `prompt`, or `change`. Do not expose
  router objects, raw zustand stores, implementation-only lifecycle names, or
  DOM-only operations as the public API.
- React code uses `useApplication(selector, options?)` for application state and
  commands. Use narrow selectors and `applicationShallowEqual` for object
  projections so unrelated application updates do not re-render tool surfaces.
- Non-React callers use the same Zustand StoreApi through `application` or
  `window.VBIApplication`, reading current capabilities with `getState()`. Keep
  this external surface functional for browser automation, agents, scripted QA,
  and future non-human Web operators.
- The root `application` store only aggregates public domain stores. The six
  public capabilities `agent`, `chart`, `i18n`, `insight`, `layout`, and `theme` each have a dedicated application zustand store
  under `src/application/<domain>/store.ts`. Shared implementation is allowed,
  but public capability ownership should stay split by domain.
- Navigation is a capability, not a component detail. Application commands route
  through typed route targets and the bound router adapter; do not let callers
  depend on React Router internals or page-local `navigate` closures.
- Lifecycle work returns `ApplicationCleanup` when activation owns subscriptions,
  collaboration sessions, runtimes, polling, or loaded state. Avoid leaking
  `bootstrap` and `dispose` as public UI commands; wrap them in semantic
  `activate` flows.
- Lazy-load heavy runtime modules behind application command adapters when the
  feature does not need to be in the first chunk. The public command shape must
  stay stable whether implementation is eager or lazy.
- A feature implemented only as a click handler, component-local effect,
  private hook, or ad hoc service call is not acceptable. Promote it into the
  application API or delete it.

## Capability Design Checklist

When adding or changing a frontend capability, update the application layer in
the same change:

- Add or revise the typed contract under `src/application/<domain>/contract.ts`.
- Add state projections and commands to the domain application store under
  `src/application/<domain>/store.ts`.
- Add a lazy adapter when the implementation imports heavy runtime, Builder,
  collaboration, assistant, or editor code.
- Add route targets or route helpers when the command changes location.
- Bind presentation components through `useApplication`; keep page components
  thin and declarative.
- Keep service calls and Provider mapping in services or stores, then expose the
  workflow as application commands.
- Extend `tests/application-interface.test.tsx` for public state, commands,
  external window exposure, route behavior, and removal of legacy one-off fields.
- Add focused page tests only after the application interface behavior is
  covered.

Reject changes that add a UI-only workflow without this application contract,
even if the human interaction appears to work in the browser.

## Docker Entrypoints

```bash
pnpm run vbi:dev:build
pnpm run vbi:dev
docker compose -f ./docker/docker-compose.dev.yml logs -f vbi_fe
pnpm run vbi:dev:down
pnpm run vbi:dev:rebuild
```

Build or rebuild after Dockerfile, dependency, lockfile, package, Rsbuild config,
or compose changes. Use `vbi:dev` for mounted source-only changes.

## Services

- Browser verification uses the Docker-served frontend at `http://localhost:3000`.
- In Docker, backend traffic uses `VBI_API_ORIGIN=http://vbi_be:3030`.
- In Docker, collaboration uses `VBI_COLLABORATION_ORIGIN=http://vbi_be:1234`.
- Host frontend port override: `VBI_FE_PORT`.

## Validation

Run final frontend validation from the repository root:

```bash
docker compose -f ./docker/docker-compose.dev.yml exec vbi_fe pnpm --filter @visactor/headless-bi-fe lint
docker compose -f ./docker/docker-compose.dev.yml exec vbi_fe pnpm --filter @visactor/headless-bi-fe format
docker compose -f ./docker/docker-compose.dev.yml exec vbi_fe pnpm --filter @visactor/headless-bi-fe typecheck
docker compose -f ./docker/docker-compose.dev.yml exec vbi_fe pnpm --filter @visactor/headless-bi-fe test
docker compose -f ./docker/docker-compose.dev.yml exec vbi_fe pnpm --filter @visactor/headless-bi-fe build
```

Treat these five commands as atomic for final frontend validation: either run
all five in order, or report that frontend validation was not run. Do not report
a partial subset as passed validation.

## Docker Runtime Ownership

- `docker/docker-compose.dev.yml` owns local full-stack VBI development.
- `docker/vbi_fe/Dockerfile.dev` owns the frontend image and `0.0.0.0` Rsbuild
  dev server.
- Mounted volumes cover frontend source/public/config, provider code, packages,
  and practices, but not every file.
- After dependency, lockfile, package, or test file changes, rebuild or use a
  one-off container before trusting in-container results.
- Avoid host-specific Dockerfile or compose assumptions.

## Frontend Contracts

- Active UI uses the SPA route shell in `src/App.tsx`, shared providers in
  `src/app/*`, and page implementations in `src/views/*`; do not revive Next
  App Router routes or legacy `src/pages/*`.
- `src/application/index.ts` is the public frontend capability entrypoint.
  Keep exports intentional, typed, and organized by domain.
- `src/app/providers.tsx` owns application exposure to the browser window,
  preference reconciliation, navigation binding, and global UI roots.
- API changes must stay synchronized with backend contracts and `src/services`.
- Service mappers should tolerate partially populated Provider detail responses
  and normalize optional nested DSL payloads.
- Collaboration spans frontend sessions and backend handlers; verify HTTP and
  collaboration flows in Docker when touched.
- Validate mounted workspace dependency behavior in the running Docker frontend.

## UI Stack

- Use Tailwind utilities and shadcn/ui components.
- `components.json` owns the stack: `radix-nova`, Tailwind v4 variables, lucide,
  and `src/components/ui`.
- Add reusable primitives through the shadcn CLI from `apps/vbi_fe`, then adapt
  generated files to local aliases and tokens.
- Do not introduce CSS modules, page stylesheets, handwritten class systems,
  inline styles, or raw Radix when shadcn/local wrappers fit.
- Use semantic tokens and shadcn variables; keep `src/app/globals.css`
  token/global-only.
- Keep Tailwind classes static, use `cn()`, use lucide through local exports,
  and keep controls accessible.
- Operational UI stays compact, scannable, stable, and restrained; avoid nested
  card layouts for app chrome.

## Resource Architecture

- Chart and insight management pages are adapters over one typed
  resource application workflow.
- `application.chart` and `application.insight` expose
  the shared resource contract: list/detail activation, create, delete, rename,
  open, record search/selection, and editor connect/release.
- Shared search, selection, create, delete, rename, drawer, list reload, empty,
  and loading behavior belongs in common modules.
- Keep Provider-first ownership: views consume Provider, sessions, and
  Builder-facing commands.
- React presentation components receive application projections and commands;
  they do not rebuild DSL payloads, duplicate lifecycle logic, or call resource
  stores as private escape hatches.
- Public exports from `src/i18n`, `src/theme`, `src/models`, and `src/types`
  should be intentional.

## Agent UI

- Use `@assistant-ui/react`, `@earendil-works/pi-agent-core`, and
  `@earendil-works/pi-ai`.
- Do not hand-roll chat protocol, composer lifecycle, scrolling, message status,
  or tool-call rendering when existing primitives fit.
- shadcn/Tailwind owns product chrome; assistant-ui owns chat surface.
- Runtime, storage, stream proxying, and Provider/Builder tool wiring stay
  outside React presentation components and are exposed through
  `application.agent.chat`, `application.agent.conversations`, and
  `application.agent.model`.
- Tool calls, reasoning, attachments, usage, abort/retry, and streaming states
  are typed adapter states, not console-only diagnostics.
- Prompting, cancellation, conversation open/rename/delete/refresh, and model
  changes must be callable without clicking the visible chat UI.

## Embedded Standard App

- `src/components/StandardChartApp.tsx` owns embedded `standard` runtime
  integration.
- Chart view/edit are intents over the same embedded runtime.
- Drawer wrappers must preserve `height: 100%`, `min-height: 0`, and
  `overflow: hidden`.
- Heavy runtime modules stay behind dynamic imports unless needed first.

## Internationalization, Preferences, and Performance

- Locale resolution has first-render default plus stored user preference; avoid
  hydration language flicker.
- Store selected locale/theme in browser storage; resolve defaults from
  `Accept-Language` and `navigator.languages`.
- Runtime translation helpers read the current preference store at call time.
- Theme palettes should affect real UI tokens while preserving readability.
- Optimize from route and chunk behavior first; load heavy editors/runtime on
  demand.
- Frontend app dependencies should be used directly by the app, not duplicated
  from `standard`, `@visactor/vbi`, or provider packages.

Report the Docker start/rebuild command, passed in-container validation, and any
skipped validation.
