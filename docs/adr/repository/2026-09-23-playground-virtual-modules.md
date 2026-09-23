# Playground virtual-module lifetime

The website's running development server reported that
`_rspress_playground_imports` could not be resolved after a separate website build
finished. Restarting restored it, but a subsequent build could break it again.

The official [Playground documentation](https://rspress.rs/zh/plugin/official-plugins/playground)
identifies this module as the plugin-generated dependency registry. The existing
plugin registration and `include` configuration are correct. On 2026-09-23, npm
still reports 2.0.22 as the latest stable Rspress/Playground release and 1.0.1 as
the latest `rspack-plugin-virtual-module`; updating to `latest` does not fix this.

[Upstream virtual-module source](https://github.com/rstackjs/rspack-plugin-virtual-module/blob/main/src/index.ts)
chooses a directory by hashing the initial module map and removes it on compiler
shutdown. Playground passes an empty map, so separate plugin instances and
processes share `node_modules/rspack-virtual-module-99914b93`. One process can
replace the other's dependency registry or delete it while it is still in use.

## Resolution

Keep the official dependencies unchanged and use one Rspress dev/build process at
any time for this website. Different HTTP ports do not isolate the virtual-module
files. Reuse the user's existing dev server for browser acceptance. Before a
production build, stop the dev server, finish the build, then restart development
on the original port. A browser hard refresh removes the stale error overlay.

This workflow is recorded in `apps/website/AGENTS.md`. No dependency patch, runtime
monkey patch, copied module, custom alias or disabled error overlay is required.
The package manifest and lockfile keep the official published versions.

The website has no `g` script; this is a development-process recovery and workflow
correction. Package source and generated DSL/API artifacts are unchanged by this fix.

## Validation

- Frozen-lockfile installation restores the official virtual-module implementation;
  root `package.json` and `pnpm-lock.yaml` have no changes from this recovery.
- Website coverage suite: all 3 tests pass. Connector coverage remains 96% statements,
  75% branches, 85.71% functions and 95.65% lines; report:
  `apps/website/coverage/index.html`.
- Website typecheck, repository lint, formatting and whitespace checks pass.
- A production build run with no development server passes client/server compilation
  and static rendering of all languages. Development is restarted afterward, with
  only one Rspress process on `http://localhost:3000/VBI/`.
- Browser acceptance on `/VBI/vbi/playground` passes: the page and chart render,
  editing the measure alias recompiles and updates the builder, and no uncaught
  page errors occur. The single development server remains available for the user.
