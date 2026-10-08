# Software Entropy Control

Use for maintainability, refactoring, cleanup, generated-surface control, and
changes that could expand the repository's long-term maintenance cost.

## Entropy Signals

Inspect these as risk signals, not automatic defects:

- Generated files patched as the fix source instead of regenerated output.
- Large files, long methods, duplicated logic, or mixed responsibilities.
- Legacy branches, TODO paths, compatibility aliases, stale comments, or dead
  exports.
- Cross-boundary shortcuts: packages depending on apps, UI rebuilding Builder
  internals, practices importing another practice's `src/*`, or LLM-created
  parallel abstractions that ignore existing boundaries.

## Optimization Habits

- Prefer deletion, simplification, extraction, or moving ownership before adding
  compatibility layers.
- Delete or inline abstractions that do not remove concrete complexity.
- Let abstractions emerge from stable repetition, not imagined flexibility.
- Keep APIs direct; add callbacks, fallbacks, generics, or configuration only
  when they make real behavior simpler.
- Name code by true semantic scope; split files by domain, builder type, or
  ownership boundary when concerns mix.
- Invert dependencies to the smallest capability the caller needs.
- Treat "compatibility" and "depends" as insufficient reasons without a concrete
  migration need.

## Pre-Edit Questions

Identify the owner, source of truth, generated surface, deletion impact, and
validation before changing code. Deletion impact includes imports, calls,
exports, types, tests, docs, comments, generated references, and old names.

## Validation

Prove both removal and behavior: use `rg` to check deleted symbols and old names,
then follow the generation and validation gates in [SKILL.md](../SKILL.md).
