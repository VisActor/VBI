---
name: development
description: >
  Use for VBI monorepo development, refactoring, and maintenance: software
  entropy control and task completion with generation, documentation and test
  updates, full package tests, and fresh coverage.
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
6. Report the packages checked, generation and full-test results, and fresh
   coverage summaries and report locations. Explicitly report missing scripts,
   unavailable coverage support, or blocked commands and their reasons; do not
   silently skip them or claim incomplete validation passed.

Typical package commands, adjusted to the scripts actually defined:

```bash
pnpm --filter <package-name> run g
pnpm --filter <package-name> run test
pnpm --filter <package-name> run test:coverage
```

If a package has no `g` script, report generation as not applicable. If it has no
coverage script, use the configured test runner's coverage command when
supported; otherwise report the missing coverage setup.
