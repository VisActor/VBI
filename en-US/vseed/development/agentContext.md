# Agent Development Context (VSeed)

This document is for agent-code and contributors. It summarizes the core architecture, data flow, and extension patterns of the VSeed package to help quickly establish a global understanding during automated development.

> This is a "context index" designed for Agent use. For more detailed engineering notes, refer to: `packages/vseed/AGENTS.md`.

## 1. Goal and Purpose

VSeed is a **Spec Builder** that converts `VSeed DSL` into `VChart` / `VTable` renderable Specs, supporting the capability to intelligently generate and edit charts.

* Input: `VSeed DSL`
* Output: `VChart` / `VTable` Spec
* Core flow: `AdvancedPipeline` + `SpecPipeline`

## 2. Two-Stage Pipeline

1. **AdvancedPipeline**

* Input: `VSeed DSL`
* Output: `AdvancedVSeed` (serializable intermediate state)
* Responsibilities: Data reshaping, default inference, encoding modeling, themes & styles, analytics configuration

2. **SpecPipeline**

* Input: `AdvancedVSeed`
* Output: Final Spec (not serializable, rendered directly)
* Responsibilities: Map intermediate state to concrete VChart / VTable configuration

## 3. Builder Entry Point

* Use `Builder.from(vseed).build()` to generate a Spec
* `prepare()` executes dynamicFilter (when needed)

Source entry points:

* `packages/vseed/src/builder/builder/builder.ts`
* `packages/vseed/src/builder/builder/build.ts`
* `packages/vseed/src/builder/builder/prepare.ts`

## 4. Data Reshaping (Core)

* `foldMeasures`: Fold multiple measures into a single measure; generates `foldInfo`
* `unfoldDimensions`: Merge dimensions by visual encoding channel; generates `unfoldInfo`
* `dataReshapeByEncoding`: Combined call (fold + unfold)

Source entry points:

* `packages/vseed/src/dataReshape/foldMeasures.ts`
* `packages/vseed/src/dataReshape/unfoldDimensions.ts`
* `packages/vseed/src/dataReshape/dataReshapeByEncoding.ts`

## 5. Extension & Registration

* `registerAll()`: Register all charts and themes
* `registerXxx()`: Register individual chart type pipeline
* `updateAdvanced()` / `updateSpec()`: Insert custom Pipes

Source entry points:

* `packages/vseed/src/builder/register/all.ts`
* `packages/vseed/src/builder/register/chartType/*`
* `packages/vseed/src/builder/register/custom.ts`

## 6. Pipeline Design Principles

* Pipes should be as atomic as possible, minimizing if/else
* Combine conditional flows via Adapters
* Chart type determined by Pipe composition

Reference:

* `apps/website/docs/en-US/vseed/development/designPhilosophy/pipeline/pipelineDesign.md`

## 7. More Context

* `packages/vseed/AGENTS.md`
* `apps/website/docs/en-US/vseed/development/architecture.md`
* `apps/website/docs/en-US/vseed/development/designPhilosophy/vseed.md`
