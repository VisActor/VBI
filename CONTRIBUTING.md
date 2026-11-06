# Contributing

[简体中文](./CONTRIBUTING.zh-CN.md)

The canonical repository is [VisActor/VBI](https://github.com/VisActor/VBI); VSeed lives in `packages/vseed`. The old VisActor/VSeed address is not a second workflow entry. Branch from `main` and target `main`. Use [Issues](https://github.com/VisActor/VBI/issues) for problems and proposals, the English/Chinese PR templates for submissions, and Conventional Commits.

## Local development and validation

Use Node.js >=24.12.0 and pnpm10.26.1 as specified by root package.json. Code, test, build and dependency changes follow the [development guidelines](.agents/skills/development/SKILL.md), including existing coverage, generation and website acceptance requirements.

```sh
pnpm install --frozen-lockfile
# Record affected-package unit coverage before changes; VSeed example:
pnpm --filter @visactor/vseed run test:unit:coverage
# After changes, generate and run complete tests, coverage and checks:
pnpm --filter @visactor/vseed run g
pnpm --filter @visactor/vseed run test:coverage
pnpm --filter @visactor/vseed run test:unit:coverage
pnpm run format:check
pnpm run lint:check
pnpm run typecheck
```

Include all affected packages and consumers; use `pnpm run g` for repository-wide generation. Compare statements, branches, functions and lines per package with the same source scope. No metric may decrease; full-suite coverage does not replace the unit-only baseline. VBI/VQuery retain 100% in all four metrics. Inspect generated and snapshot diffs rather than accepting behavior changes blindly. Product CI runs `pnpm run build` and `pnpm run test:coverage`; existing Lint, Typecheck and changeset checks also apply.

For code changes, follow the development guidelines to inspect the website home page and affected examples, exercise real interactions, and check console/network errors. Stop the `pnpm dev` server afterward. Website acceptance does not replace VSeed's frozen two-sided comparison below. Markdown/agent-guidance-only changes require document and link checks, not product builds, coverage reruns or a website server; changes to generators, examples or site behavior require the corresponding development checks.

## PR checks and merge process

**Activation snapshot (2026-11-06):** the advisory workflow was enabled at **2026-11-06 22:05 Asia/Shanghai (UTC+8)**. Integration: [#595](https://github.com/VisActor/VBI/pull/595). Activation and a designated PR validation do not establish long-term reliability; the first natural PR and at least 24 hours/3 natural executions remain to be observed.

### Scope

The workflow handles non-draft PRs created after initialization and strictly after the cutoff, with both branches in `VisActor/VBI`, targeting `main` and whose complete diff touches `packages/vseed/` (including renames or deletions). “Internal” means same-repository branches, not employee status. Eligible new drafts enter after Ready for review. Existing PRs, forks and out-of-scope PRs are not backfilled by updates, reopening or changing draft status. Do not recreate a PR to bypass this boundary.

Stable CR and GitHub Actions have independent scopes. Stable CR covers new and revised non-draft PRs across the repository after its initial baseline; the advisory workflow's branch and path restrictions do not narrow CR. Missing workflow output does not waive tests or human review. Legacy Photo CI handles unclaimed PRs and push events only under its existing triggers; maintainers coordinate screenshot ownership, so do not dispatch a duplicate batch.

### Before submitting

- Run relevant unit tests, build/type and style checks. For features, fixes or coverage gaps, add deterministic regression cases or strengthen existing ones. Interactions must exercise real actions and assert the resulting state.
- For product, rendering, interaction, dependency or visual-case changes, run the default full comparison in the [visual guide](packages/vseed/__tests__/visual/README.md) before submitting. Focused cases/directories help during development; self-comparison only checks determinism and cannot replace the official baseline comparison. “Full” means the current manifest, not all product behavior.
- For documentation-only changes, check links, commands, versions and actual behavior. Explain why product tests were not run; do not manually rerun models or dispatch Photo just for documentation. Existing CI and automated workflow triggers still apply after submission.
- Report commands, outcomes, report scope, head/base when available, expected visual changes, skipped checks and blockers. Errors are not passes. Do not skip assertions, relax thresholds or replace baselines to hide failures.
- Follow the [case authoring guide](packages/vseed/__tests__/visual/cases/README.md). Only administrators of the corresponding product may create platform cases; other contributors supply reproduction material. Never invent IDs. See [BugServer case collaboration](packages/vseed/__tests__/visual/BUGSERVER_CASE_WORKFLOW.md) (Chinese).

### After submitting

Check the current head, comparison base and report version before reading the Bot Review, Actions runs and PR summary. The three automated recommendations are CR, unit tests and Playwright; other repository CI checks may also apply.

| Result          | Action                                                                                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CR Review       | Fix findings or provide evidence; closing a discussion does not prove a fix                                                                                                     |
| Unit tests      | Check `test.yml`, the `Tests` job and `Run tests and enforce coverage thresholds`; also check Lint and Typecheck; missing, skipped, running or failed results are not passes    |
| Playwright      | Inspect full comparison images, assertions and difference analysis; execution errors are not acceptable visual changes                                                          |
| BugServer Photo | Automatically executed, manually reviewed, report-only; differences, missing baselines, errors and incomplete results remain visible without blocking the three recommendations |

Passing all three checks or reaching completed does not mean every Photo test passed. Contributors without platform access should request maintainer help; do not publish internal reports, business data, private logs or credentials.

### Status and next action

| Summary status                    | Action                                                                                         |
| --------------------------------- | ---------------------------------------------------------------------------------------------- |
| Queued / running                  | Wait for the current stage; no result is not a pass                                            |
| Changes or investigation needed   | Fix the issue, add coverage or provide verifiable evidence                                     |
| Blocked                           | Read the action item; ask maintainers about permissions, services or recovery                  |
| Awaiting approval                 | Maintainer checks all three results and manually reviews Photo for the current revision        |
| Awaiting merge                    | A valid current-commit approval was recognized; a maintainer merges manually                   |
| Merged / baseline processing      | Wait for cleanup; skipping automatic baseline updates is expected in report-only mode          |
| Completed                         | Workflow cleanup finished; original Photo differences and errors remain                        |
| Superseded / closed without merge | Read the new revision's result, or treat the PR as unmerged; neither implies a baseline update |

A new head or comparison base requires version checks and necessary reruns. Old results cannot prove the new revision passed; a new commit needs its own valid approval. If a summary is missing, check repository, target, creation time, draft status and changed paths before contacting maintainers.

### Approval, merge and recovery

The workflow recognizes a valid GitHub Approve from a repository Maintain/Admin user for the **current commit**, including their manual Photo verification. The Bot never approves or merges. GitHub protection rules and other checks still apply; the workflow does not add required Checks or change branch protection.

Automatic Photo difference assessment and baseline updates are paused. Approve/Merge does not authorize automatic adoption of screenshots. Early merge does not turn incomplete or failed checks into passes. Shared baseline changes require separate explicit authorization, administrator review and a new verification; retain original reports.

For help, provide the PR, current SHA, Review/CI links and a public-safe error description. Do not edit managed summaries or hidden markers, repeatedly reopen PRs, delete state, change request IDs or dispatch duplicate batches. Maintainers recover the original task. Stop test servers, browsers and child processes you started when finished.
