# Agent development context (VSeed)

This document is intended for agent-code and contributors. It summarizes the core architecture, data flow and extension methods of the VSeed sub-package to facilitate rapid establishment of global understanding during automated development.

> This is a "context index" designed for use by Agents. For more detailed engineering instructions, please refer to: `packages/vseed/AGENTS.md`.

## 1. Goals and positioning

VSeed is a **Spec Builder**, which converts `VSeed DSL` into `VChart` / `VTable` to render Spec, supporting the ability to intelligently generate and edit charts.

- Input: `VSeed DSL`
- Output: `VChart` / `VTable` Spec
- Core process: `AdvancedPipeline` + `SpecPipeline`

## 2. Two-stage Pipeline

1. **AdvancedPipeline**

- Input: `VSeed DSL`
- Output: `AdvancedVSeed` (serializable intermediate state)
- Responsible for: data reshaping, default inference, coding modeling, themes and styles, analysis configuration

2. **SpecPipeline**

- Input: `VSeed DSL`
- Output: final Spec (not serializable, rendered directly)
- Responsible for: mapping intermediate states to specific VChart / VTable configurations

## 3. Builder entrance

- Use `Builder.from(vseed).build()` to generate Spec
- `prepare()` executes dynamicFilter (if needed)

Source code entry:
- `packages/vseed/src/builder/builder/builder.ts`
- `packages/vseed/src/builder/builder/build.ts`
- `packages/vseed/src/builder/builder/prepare.ts`

## 4. Data reshaping (core)

- `foldMeasures`: Multiple measures are collapsed into a single measure, generating `foldInfo`
- `unfoldDimensions`: merge dimensions by visual channel to generate `unfoldInfo`
- `dataReshapeByEncoding`: combined call (fold + unfold)

Source code entry:
- `packages/vseed/src/dataReshape/foldMeasures.ts`
- `packages/vseed/src/dataReshape/unfoldDimensions.ts`
- `packages/vseed/src/dataReshape/dataReshapeByEncoding.ts`

## 5. Extension and registration

- `registerAll()`: Register all charts and topics
- `registerXxx()`: Register single chart type pipeline
- `updateAdvanced()`/`updateSpec()`: Insert custom Pipe

Source code entry:
- `packages/vseed/src/builder/register/all.ts`
- `packages/vseed/src/builder/register/chartType/*`
- `packages/vseed/src/builder/register/custom.ts`

## 6. Pipeline design principles

- Pipe should be as atomic as possible to reduce if/else
- Combine conditional processes through Adapter
- Chart type is determined by Pipe combination

Reference:
- `apps/website/docs/zh-CN/vseed/development/designPhilosophy/pipeline/pipelineDesign.md`

## 7. More complete context

- `packages/vseed/AGENTS.md`
- `apps/website/docs/zh-CN/vseed/development/architecture.md`
- `apps/website/docs/zh-CN/vseed/development/designPhilosophy/vseed.md`

