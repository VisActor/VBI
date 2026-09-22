---
name: development
description: >
  Use for VBI monorepo development, refactoring, and maintenance: software
  entropy control and task completion with generation, documentation and test
  updates, full package tests, fresh coverage, and website acceptance testing.
---

# VBI Development

Read [Software Entropy Control](references/software-entropy.md) for ownership,
source-of-truth decisions, maintainability, refactoring, and deletion rules.
It is the only supporting reference for this skill.

## Required Task Completion

Before finishing every task:

1. Identify all changed packages and affected consumers. Read their
   `package.json` scripts and test configuration to determine the actual
   generation, full-test, and coverage commands.
2. Update relevant documentation, examples, and test cases to match the final
   behavior. Cover changed behavior and regressions; remove obsolete cases and
   references. Change the owning source or generator for generated artifacts.
3. Run the `g` script for each affected package to refresh generated docs,
   examples, tests, and other outputs. Use `pnpm run g` from the repository root
   when repository-wide generation is required. Inspect the generated diff,
   including any updated snapshots, for correctness.
4. After generation and all edits, run the complete test suite for every
   affected package and generate fresh coverage for the final state. Focused
   tests, cached results, and existing coverage reports do not satisfy this
   gate. A full-suite coverage run may satisfy both requirements if it includes
   every test suite; run any omitted suites separately.
5. Review test failures, coverage gaps in changed behavior, and generated
   outputs. Fix task-related issues, update relevant tests and docs, then rerun
   generation and validation for the affected scope. Do not lower coverage
   thresholds or exclude changed code to make validation pass.
   Apply the package coverage requirements below.
6. Start the website with `pnpm dev` from the repository root and perform
   browser acceptance testing against the running website. Follow the workflow
   below; a successful build or passing unit tests alone do not satisfy this gate.
7. Report the packages checked, generation and full-test results, fresh coverage
   summaries and report locations, and website acceptance results (URL, pages,
   interactions, and outcome). Explicitly report missing scripts, unavailable
   coverage support, or blocked commands and their reasons; do not silently skip
   them or claim incomplete validation passed.

Typical package commands, adjusted to the scripts actually defined:

```bash
pnpm --filter <package-name> run g
pnpm --filter <package-name> run test
pnpm --filter <package-name> run test:coverage
```

If a package has no `g` script, report generation as not applicable. If it has no
coverage script, use the configured test runner's coverage command when
supported; otherwise report the missing coverage setup.

## Website Development and Acceptance Testing

Run these commands from the repository root. Use the Node.js and pnpm versions
declared in the root `package.json`; on a fresh checkout or after dependency
changes, install dependencies first:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

The root `dev` script delegates to `pnpm --filter=website run dev`, which starts
the Rspress development server in `apps/website`. Keep it running while testing.
Open the local URL printed by the server, including the configured `/VBI/` base
path; use the actual reported port rather than assuming a fixed one.

- Wait for compilation to finish, then open the website in a browser. Verify
  the home page and the documentation, examples, or playground affected by the
  change. Exercise the changed behavior and relevant interactions; check for
  rendering failures, browser console errors, and failed requests. For changes
  without visible UI impact, smoke-test the home page and a relevant example or
  playground. An HTTP response alone does not prove browser acceptance.
- Read `apps/website/AGENTS.md` for preview-service and stale-process guidance.
  If output is stale or startup reports a port conflict, inspect the website
  process and preview port `7890`; stop the confirmed stale website process and
  restart `pnpm dev`. After restarting, hard-refresh the browser and remind the
  user to do the same (`Ctrl+Shift+R`).
- Keep browser acceptance separate from coverage runs, which must not open a
  browser. Fix task-related failures and repeat the affected checks before
  reporting acceptance as passed. If startup or browser access is blocked,
  report the blocker and the checks that remain unverified.
- Stop the development server you started after validation unless the user
  needs it left running; report any server left running and its URL.

## Package Coverage Requirements

- `@visactor/vbi` and `@visactor/vquery`: unit tests must achieve **100%**
  statements, branches, functions, and lines. Run each package's complete
  `test:coverage` suite and keep all four thresholds at 100% in its test
  configuration.
- `@visactor/vseed`: unit-test coverage must **never decrease** in any of the
  four metrics. Before changing code or tooling, run fresh unit-only coverage
  on the starting revision and record the summary. After generation and edits,
  rerun with the same source scope and compare every metric with that baseline.
  Preserve full-suite coverage too; do not substitute it for unit-only coverage.
  Raise committed thresholds when coverage improves; never lower them.
- Keep coverage providers and inclusion/exclusion rules comparable. A tooling
  upgrade that changes instrumentation requires an explicit before/after review;
  it is not permission to remove files, ignore branches, or relax thresholds.
- Coverage checks must run without updating snapshots or opening a browser.
  Use explicit snapshot-update commands only after reviewing behavior changes.
- Report the before/after percentages and report locations. Existing gaps must
  be fixed before claiming these requirements pass.
