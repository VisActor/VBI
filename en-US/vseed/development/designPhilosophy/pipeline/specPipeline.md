# Spec Pipeline

## Spec pipeline

The `spec pipeline` receives an advancedVSeed DSL and outputs a spec.

A `spec` is the input data structure for VChart or VTable, used to describe the configuration options of a chart.

The `spec` itself cannot be fully serialized, so it cannot be constructed in a Node.js environment; it can only be used in a browser environment.
