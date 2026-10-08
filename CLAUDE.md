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

Repository-level development guidelines are maintained in
`.agents/skills/development/SKILL.md`.

Coding, refactoring, software entropy control, generated artifact handling, source
of truth decisions, and validation gates all follow the development skill. Local
`AGENTS.md` files only provide directory-specific additions and do not override the
development skill.
