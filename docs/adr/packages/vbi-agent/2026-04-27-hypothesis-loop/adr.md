# ADR: Add a Hypothesis-Experiment-Validation Loop to `@visactor/vbi-agent`

Status: Accepted; Date: 2026-04-27

## Context

`@visactor/vbi-agent` already has Builder operation capabilities, but it lacks an analysis methodology. When facing questions such as "why is this chart result wrong", "why did this field not take effect", or "which DSL change is more reasonable", the Agent can easily bet on a single explanation, directly modify the DSL, or give a verbal answer.

This creates three problems:

1. There is no explicit hypothesis list, so the reasoning process cannot be verified.
2. There is no batch experiment tool, so multiple hypotheses can only be executed manually and piecemeal.
3. There is no unified validation standard, making it easy to mistake intuition for a conclusion.

## Decision

Add one built-in skill and one batch experiment tool inside `@visactor/vbi-agent` to form a stable analysis loop.

### Skill

Add a built-in skill, `hypothesis-loop`, with one responsibility: converge analysis tasks into a "hypothesis-experiment-validation" loop.

It requires the Agent to:

- Propose 2-4 distinguishable hypotheses by default.
- Sort them by information value and cost.
- Test only one hypothesis per experiment.
- Validate through `build()`, `buildVQuery()`, `buildVSeed()`, or structured results.
- Mark conclusions with `supported` / `rejected` / `inconclusive`.

### Tool

Add the tool `vbi_experiment`.

The input is an array of experiments. Each experiment contains at least:

- `hypothesis`
- `code`
- `goal` (optional)

Execution behavior:

- Execute each experiment script sequentially.
- Inject `workspace`, `chart`, and `experiment` into each experiment.
- Capture logs, results, and errors.
- Do not stop the whole batch when a single experiment fails.

Output behavior:

- Return the `status` of each experiment.
- Return a structured `result` or `error`.
- Summarize success / failure counts.

## Boundaries

1. `vbi_experiment` is responsible for batch execution, not for automatically deciding business truth on behalf of the model.
2. Experiment conclusions must still be based on structured evidence from DSL or tool output.
3. Opening a Builder resource does not mean saving the resource; by default, validation happens when inspecting DSL, not when writing back.
4. The skill owns methodology constraints, and the tool owns the execution vehicle. The two remain separate.

## Consequences

Positive impacts:

- The Agent is no longer limited to single-path inference in analysis tasks.
- Multiple hypotheses can be compared in one tool call.
- Conclusions can be traced back to concrete DSL, QueryDSL, VSeedDSL, or experiment artifacts.

Costs:

- Tool-call input becomes longer, and the model must follow the structured experiment format.
- If experiment scripts are too broad, they may still produce mixed evidence, so the skill must constrain experiment granularity.

## Verification Requirements

At minimum, cover the following validation:

1. `read_skill` can list and read `hypothesis-loop`.
2. `vbi_experiment` can execute experiments in batches.
3. When a single experiment fails, results from other experiments are still returned.
4. Repository-level `lint` and `typecheck` pass.
