# AGENTS.md

This file stores website-specific working notes for Codex.

## Website Dev Server Notes

- If the website page still shows old code after local changes, first suspect a stale `rspress dev` process instead of assuming the latest patch failed.
- The website preview stack uses `@rspress/plugin-preview`, which also starts a preview service and occupies port `7890` by default.
- If port `7890` is already occupied by an older website dev process, a newly started website dev server may fail to reflect the latest page output correctly.
- In that situation, stop the old website `rspress dev` process, then restart the website dev server before continuing debugging.
- After restarting the website dev server, remind the user to do a hard refresh with `Ctrl+Shift+R`.
- When a page still looks stale, prefer verifying the actual running dev server and occupied ports before changing product code again.

## Playground Virtual Modules

- Rspress 2.0.22 uses `rspack-plugin-virtual-module` 1.0.1. Its default
  directory depends only on the static module map, so dev/build processes using
  `{}` share a directory; either process shutting down deletes the other's modules.
- Use the official, unpatched dependencies and run only one Rspress dev/build
  process for this website at a time. Different HTTP ports do not isolate the
  virtual-module directory.
- Before starting acceptance testing, inspect existing website processes and reuse
  the running dev server instead of starting another. Before a production build,
  stop the website dev server; finish the build before restarting development on
  the user's original port. Leave that server running when the user is using it.
- If `_rspress_playground_imports` cannot be resolved, stop duplicate website
  processes, restart a single dev server, then verify Playground rendering and
  editor recompilation. Remind the user to hard-refresh. Do not manually recreate
  the virtual module, alias a cached copy, or disable the error overlay.
