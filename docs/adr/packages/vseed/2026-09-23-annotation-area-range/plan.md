# Annotation area coordinate ranges

## Agreed contract

- Keep selector-based category bands and add a mutually exclusive `range` mode.
- `range` requires x, y, or both; each specified axis requires explicit min and max.
- Export `AxisBoundaryEnum = { Min: 'axisMin', Max: 'axisMax' }` as a const object.
- Numeric boundaries use raw data coordinates. Sentinels use the final visible axis domain, including nice limits and inverse axes.
- Omitted axes span the plot. Clip to the visible domain; omit rectangles with no intersection. Numeric min >= max is invalid.
- Support ordinary linear numeric axes in line/area/column/bar/boxPlot/histogram/scatter, including applicable percentage and grouped variants. Diagnose category/log ranges, dual-axis, pivot/combination, race and other unsupported charts. BoxPlot supports its numeric y axis; its category x axis remains unsupported. Histogram supports both numeric axes.
- Share existing label/fill/border handling. Pixel outerPadding only applies to selectors.
- Preserve selector geometry: line/area category centers plus padding; column/bar band extents plus padding.
- No Story runtime/dependency update or release in this task. Starting VSeed version is 0.6.0; Story remains pinned to 0.5.5.

## Execution

- [x] Inspect public types, schemas, pipelines, VChart marker APIs and existing examples.
- [x] Install the frozen workspace dependencies using pnpm 10.26.1.
- [x] Record fresh unit coverage before changing source.
- [x] Add behavior tests for validation, exact bounds, clipping, sentinels, reverse axes, empty selections, resize and update/removal.
- [x] Implement public types/schema/exports, build diagnostics and shared range geometry.
- [x] Add runnable examples and regenerate owning documentation and tests.
- [x] Run relevant formatting, lint, type checks, package tests and final coverage.
- [x] Verify affected examples and interactions in the website browser.

## Baseline

Revision: d73947efc1b5364175126022aa413f1151cc8740.

`pnpm --filter @visactor/vseed run test:unit:coverage`: 42 files, 339 tests passed.
Statements/lines: 73.01%; branches: 70.57%; functions: 72.08%.
Baseline log: `/tmp/vseed-annotation-area-baseline.log`.

## Verification results

### Implementation and generated outputs

- Added shared coordinate geometry to both existing area-marker pipelines, preserving selector geometry and shared styles.
- Added strict public ranges, exported boundary constants, schema validation and descriptive unsupported-axis/chart diagnostics.
- Added seven range examples and a grouped-area selector regression example; regenerated the feature tests, example page and all affected option references with the package `g` script.
- Fixed the documentation generator to ignore the forbidden `never` branches of mutually exclusive properties, rather than overwrite the real selector documentation. The regression test exercises the generator without rewriting documentation.
- Tests exercise actual VChart rendering, resize, inverse axes, adding/removing annotations and clearing fully outside geometry, in addition to geometry and schema unit tests.

### Browser acceptance

Started the root `dev` script using pnpm 10.26.1 and checked:

- `http://localhost:3000/VBI/`: home page rendered.
- `http://localhost:3000/VBI/vseed/examples/features/annotationArea.html`: all seven range examples rendered; x-only and y-only regions span the omitted axis, the 0–100 × 20%–40% rectangle has exact boundaries, and the 70%–100% target is visible despite containing no data points.
- The line/column 10-to-axisMax horizontal risk bands and the bar 10-to-axisMax vertical band match their numeric axes.
- Existing area-selector category-center padding and bar-selector full-band padding remain visible and unchanged.
- Navigated through the page's table of contents. Browser console contained no warnings or errors on the checked page. Resize and live marker add/remove are separately covered by actual VChart render tests, not claimed as browser interactions.

Direct navigation initially returned `ERR_BLOCKED_BY_CLIENT`; after documentation generation completed, normal website navigation loaded the page and permitted the visual checks above. This did not require a second browser or an external browser-control mechanism.

### Existing tooling limitations

- Package-wide `lint` reports the pre-existing unused `updatePackageReadme` function in `scripts/build-coverage-badge.mjs:65`, confirmed against the base revision. This unrelated script was not changed. Lint passes for the files changed by this task.
- The existing `tsconfig.test.json` replaces rather than merges the source path aliases, so running it across all old tests produces unresolved `src/*` imports. New tests were type-checked with the package source compiler options plus both source/public aliases; package source type-check and declaration build pass.
- The example generator already emits a trailing space after preview code fences. Full `git diff --check` reports those generated lines; source/script/test/config diffs pass. Generated examples were not hand-edited to diverge from their owner.
- Direct Node ESM loading reaches a pre-existing extensionless import in `@visactor/vdataset`. CJS loading successfully exposes `AxisBoundaryEnum`; the website bundler and ESM declaration build pass. No dependency or packaging changes were made for this unrelated issue.

### Final package verification

- VSeed full suite: **72 files, 1,197 tests passed**. Log: `/tmp/vseed-annotation-area-full-tests.log`.
- VSeed unit suite: **45 files, 392 tests passed**. Log: `/tmp/vseed-annotation-area-unit-final.log`.
- Website full suite: **1 file, 3 tests passed** with fresh coverage in its configured `components/demoConnector` scope: statements 96%, branches 75%, functions 85.71%, lines 95.65%. This coverage is not a claim of whole-website or visual coverage. Log: `/tmp/vseed-annotation-area-website-tests.log`. The website has no `g` script; its changed docs are owned and generated by VSeed.
- Generation: all four package generators passed. Log: `/tmp/vseed-annotation-area-generate-final.log`.
- Package ESM/CJS/UMD builds and declaration generation passed. Log: `/tmp/vseed-annotation-area-build.log`.
- Changed-file lint and formatting passed. Source/script/test/config whitespace checks passed.
- Source type-check and the focused source + new-test type-check passed. Focused log: `/tmp/vseed-annotation-area-focused-typecheck.log`.
- Raised unit/full coverage floors while retaining the existing tolerance for variable V8 branch counts.

| Metric     | Unit baseline | Final unit | Final full suite |
| ---------- | ------------: | ---------: | ---------------: |
| Statements |        73.01% |     75.58% |           89.66% |
| Lines      |        73.01% |     75.58% |           89.66% |
| Branches   |        70.57% |     71.28% |           78.96% |
| Functions  |        72.08% |     74.06% |           81.15% |

Fresh HTML reports: `packages/vseed/coverage/index.html` and `packages/vseed/coverage/unit/index.html`.
Website report: `apps/website/coverage/index.html`.

The task-created website process was stopped after acceptance; its temporary browser tab was closed. No commit, push, release, Story runtime change or unrelated process termination was performed.

## Workspace migration

At the user's request, development now continues directly in `/Users/bytedance/Desktop/WorkSpace/VSeed` on `feat/vseed-region-annotation`, not in a linked worktree.

- The 44 implementation files were restored with identical SHA-256 hashes and file modes; the branch base remains `d73947efc1b5364175126022aa413f1151cc8740`.
- The original `feat/theme` branch and all other local branch refs were preserved without rewriting any commits.
- The original `.vscode/launch.json` was restored byte-for-byte. The new base ignores `.vscode/*`, so it remains local configuration and does not appear in Git's changes list.
- Recovery stashes were retained: implementation `5180a20f9471262636c71bd1ea04cbd304190934`; original launch configuration `a60e8cfaab1186c8db36193262e57ccf9e894fed`.
- The old worktree registration was removed. Its clean directory, dependencies, build products and previous coverage reports were moved to `/Users/bytedance/.Trash/vseed-region-annotation-migration.GIWyAG/workspace`, without permanent deletion. Its old `.git` pointer is no longer an active worktree registration.
- The preceding verification results describe the unchanged implementation before migration. Dependency synchronization and focused migration checks are recorded below; this move does not introduce new feature behavior or regenerate documentation.

## BoxPlot follow-up

- Extend `range.y` to ordinary box plots using their existing linear y axis and area-marker pipeline; retain category-axis and pivot rejection.
- Remove the trailing space in the example generator's preview fence, then regenerate affected documentation rather than editing generated MDX by hand.
- Added a rendered box-plot band test, category-axis rejection test, an invalid-domain regression test, and a runnable box-plot example. The category axis is filled while the numeric y boundaries follow the final VChart axis mapping.
- Ran VSeed `g` after source changes. The generator fix removed trailing whitespace from preview fences across 53 generated example pages (189 fences); `git diff --check` now passes.
- Final VSeed suite and full-suite coverage: 72 files, 1,203 tests passed; statements/lines 89.69%, branches 78.97%, functions 81.23%. Log: `/tmp/vseed-boxplot-range-full-coverage-final3.log`; report: `packages/vseed/coverage/index.html`.
- Fresh unit-only baseline before this follow-up: statements/lines 75.58%, branches 71.30%, functions 74.06%. Final unit coverage: 45 files, 397 tests passed; statements/lines 76.98%, branches 71.31%, functions 75.04%. Log: `/tmp/vseed-boxplot-range-unit-coverage-final3.log`; report: `packages/vseed/coverage/unit/index.html`. Raised the stable unit/full coverage floors without reducing branch floors.
- VSeed package build, VSeed and website source type-checks, changed-code lint/format checks, website full test-with-coverage (3 tests), and whitespace check passed. The website coverage remains scoped to its existing demo-connector tests; it does not measure the generated docs visually.
- Browser acceptance on the existing website dev server at `http://[::1]:3000/VBI/`: home page and `vseed/examples/features/annotationArea.html#箱线图高危险区间` rendered. The box-plot risk band crossed both categories at the numeric threshold; the generated support text included box plots. Two Rspress hot-reload WebSocket failures appeared in the console with direct-connection fallback, but no chart-rendering failure was observed. The user's existing dev server was left running.
- Website production build was not run: `apps/website/AGENTS.md` prohibits simultaneous Rspress dev/build processes, and the user's dev server was already active. No user process was stopped.

Migration checks completed in the primary workspace:

- `pnpm@10.26.1 install --frozen-lockfile` passed without changing either the package manifest or lockfile. Log: `/tmp/vseed-workspace-migration-install.log`.
- All 53 annotation geometry/rendering/documentation regression tests passed. Log: `/tmp/vseed-workspace-migration-tests.log`.
- VSeed source type-check passed. Log: `/tmp/vseed-workspace-migration-typecheck.log`.
- Git lists only the primary workspace, on the requested feature branch. No changes are staged, committed or pushed.
- Functional files were moved without edits. Full generation, coverage and browser validation were not repeated for a location-only migration; the original results remain above, with archived reports at the recovery location.

## Histogram and generated-type follow-up

- Add ordinary histogram to the supported range chart types. Both axes are linear numeric axes; pivot histogram remains rejected by the existing facet guard.
- Add a runnable x-only histogram example and tests for both-axis geometry, percentage thresholds, grouped colors, pivot and logarithmic-axis rejection, custom marker styling, and actual VChart rendering.
- Fix the option-document generator's flattened union display: shared fields that are optional in one branch now show `| undefined`. This applies to both `selector`/`range` and `range.x`/`range.y`, while the type description continues to state the required either/or constraint.
- Regenerate VSeed tests, examples, and option docs from their owning inputs. The existing website process had a stale configuration-page index after regeneration; restart the single confirmed Rspress process on the same port and keep it available to the user.
- VSeed full coverage suite passed: 72 files, 1,211 tests; statements/lines 89.74%, branches 79.01%, functions 81.48%. Final unit coverage: statements/lines 78.81%, branches 71.31%, functions 76.32%, compared with the pre-follow-up unit baseline of 76.98%, 71.31%, and 75.04% respectively. Reports: `packages/vseed/coverage/index.html` and `packages/vseed/coverage/unit/index.html`.
- VSeed package build and source type-check, website source type-check and focused website tests, changed-code lint/format, and `git diff --check` passed. The generated histogram example rendered the x-only pale-red band over the bars in the website browser. The histogram and scatter option pages showed `selector`/`range` and `range.x`/`range.y` as optional, alongside the exact-one rule. Only Rspress hot-reload WebSocket fallback messages were observed; no chart-rendering errors appeared. The user's website dev server remains running. Website production build was not run while that dev server is active.

## Builder validation follow-up

- The prior review found that the public schema rejected an empty `annotationArea` while `Builder.build()` silently accepted it and could produce infinite selector-band coordinates. Require a non-null selector when no range is present, keeping the existing selector parsing behavior otherwise.
- Add Builder-level regression cases for empty objects, undefined/null selectors, and an empty member inside an annotation array; retain the existing valid selector and range tests.
- The four new regression cases failed before the Builder fix and passed afterward. VSeed `g`, the full coverage suite, VSeed/website source type-checks, website tests with coverage, and changed-file lint/format checks passed. Unit coverage versus the fresh pre-edit baseline: statements/lines 78.81% to 78.81%, branches 71.31% to 71.38%, functions 76.32% to 76.32%. Full coverage: statements/lines 89.74%, branches 79.03%, functions 81.48%. Reports: `packages/vseed/coverage/index.html` and `packages/vseed/coverage/unit/index.html`. Keep the already-raised branch floors at 78.9% full and 71.2% unit rather than tuning them to small V8 coverage fluctuations.
- Browser acceptance at `http://[::1]:3000/VBI/` confirmed the home page, the rendered histogram range band on the annotationArea example page, and the histogram option page's exact-one description and optional union fields. Regeneration temporarily left the old Rspress route index stale; the single confirmed workspace dev process was restarted on the original port, then the option page loaded. Console errors were limited to Rspress WebSocket fallback messages. Keep the replacement dev server running for the user.
- For the public package-contract change, the single confirmed website dev process was stopped, `pnpm --filter website run build` passed, and the dev server was restarted on its original port. The website type-check also passed when rerun after the VSeed build; its initial concurrent run failed only while the package build was cleaning `dist`.
