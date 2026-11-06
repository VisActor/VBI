# AGENTS.md

This file provides guidance to Coding Agent when working with code in this repository.

## Structure

- `packages/` owns reusable capabilities: `vbi` manages DSL configuration and Builders, `vquery` handles queries, and `vseed` builds VChart/VTable specs.
- `apps/website` hosts documentation, examples, and the playground; `practices/` contains independent example applications.
- `tools/` contains development utilities; `.agents/skills/` maintains agent workflows and development guidelines.

## Capability Ownership

VBI's core capabilities are exposed through DSLs and Builders and must be usable without a UI.
Model chart or dashboard state that must be saved, restored, or reused across integrations in the owning DSL, and expose operations through its Builder.
React integrations, components, and practices consume these public capabilities; transient interface state and concrete rendering remain in the UI layer.

Builders own domain operations and DSL consistency; adapters translate at integration boundaries without owning domain rules.
Use consistent domain terminology across DSLs, Builders, and adapters; introduce abstractions only for concrete responsibilities.

Acceptance criterion: if all UI components were removed, would the VBI capability still exist and be usable through its DSL and Builder? If not, the headless capability is incomplete.

## Development Guidelines

Use `.agents/skills/development/SKILL.md` for code, test, build, or dependency changes.
Skip it for changes limited to skills, prompts, or agent instructions.

Skill documents and references describe current capabilities, usage, and constraints without narrating past changes, removals, or migrations.

## PR and visual verification

- Read [Contributing](./CONTRIBUTING.md#pr-checks-and-merge-process) before submitting. The VSeed advisory workflow is enabled for eligible new same-repository main PRs touching `packages/vseed/`; stable CR has a wider scope.
- Product, dependency and visual-case changes require relevant unit tests and the default full official-main visual comparison: `node packages/vseed/scripts/visual-test.mjs`. Preserve the development skill's coverage, generation and website checks. Markdown/agent-guidance-only changes require document/link validation and an explicit not-run explanation.
- Add or strengthen deterministic regression cases for features, fixes and gaps. Follow the [case guide](./packages/vseed/__tests__/visual/cases/README.md); real interactions need semantic assertions. Self-comparison is not a baseline pass. Do not relax thresholds, skip cases or hide errors.
- Follow the [Photo collaboration guide](./packages/vseed/__tests__/visual/BUGSERVER_CASE_WORKFLOW.md). Local cases do not sync to BugServer; only product administrators create platform cases, and IDs must be real.
- Check current head/base and report scope before using Bot results. Photo is report-only and manually reviewed; completed does not mean all Photo tests passed. Never approve/merge, edit managed summaries/markers, automatically update baselines or bypass unknown-request deduplication.
- Stop test servers, browsers and child processes you started when finished.
