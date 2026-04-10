# Architecture

VSeed is a chart generator based on semantic configuration, designed to connect user intent with underlying rendering engines (VChart/VTable).

> [Deep Wiki](https://deepwiki.com/VisActor/VSeed)

## Core Concepts

### 1. Pipeline Architecture

VSeed uses a pipeline pattern to progressively build the chart Spec. The process consists of two main stages:

* **AdvancedPipeline**:
  * Input: Initial `VSeed` object.
  * Responsibilities: Data reshaping, applying themes, inferring default configurations.
  * Output: `AdvancedVSeed` (intermediate template).

* **SpecPipeline**:
  * Input: `AdvancedVSeed`.
  * Responsibilities: Convert the intermediate template into concrete VChart/VTable configuration.
  * Output: Final renderable Spec.

### 2. Builder Pattern

The `VSeedBuilder` class is the core coordinator, responsible for managing Context, registering plugins, and executing the pipeline.

### 3. Plugin-based Extensibility

VSeed's core capabilities (such as supported chart types) are fully implemented via a plugin registration mechanism.

* **Chart Type Registration**: Each chart type (e.g., `bar`, `line`) is a registered plugin.
* **Theme Registration**: Custom themes can be registered.
