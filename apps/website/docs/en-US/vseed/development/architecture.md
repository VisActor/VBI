# Architecture design

VSeed is a diagram generator based on semantic configuration, designed to connect user intent and the underlying rendering engine (VChart/VTable).

> [Deep Wiki](https://deepwiki.com/VisActor/VSeed) 

## Core concepts

### 1. Pipeline Architecture
VSeed uses pipeline mode to gradually build the chart Spec. The entire process is divided into two main stages:

- **AdvancedPipeline**: 
  - Input: Initial `VSeed` object.
  - Responsibilities: Data Reshape, apply themes, infer default configuration.
  - Output: `AdvancedVSeed` (intermediate state template).
  
- **SpecPipeline**:
  - Input: `AdvancedVSeed`.
  - Responsibility: Convert the intermediate state template into specific VChart/VTable configuration items.
  - Output: Final renderable Spec.

### 2. Builder mode
The `VSeedBuilder` class is the core coordinator, responsible for managing Context, registering plug-ins, and executing the pipeline.

### 3. Plug-in extension (Extensibility)
The core capabilities of VSeed (such as supported chart types) are entirely implemented through the plug-in registration mechanism.
- **Chart Type Registration**: Each chart type (such as `bar`, `line`) is a registration plug-in.
- **Theme Registration**: Supports registration of custom themes.

 