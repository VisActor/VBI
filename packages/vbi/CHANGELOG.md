# @visactor/vbi

## 0.5.7

### Patch Changes

- Updated dependencies
  - @visactor/vseed@0.5.7

## 0.5.6

### Patch Changes

- 70d97e5: feat: add sankey and hierarchySankey
- Updated dependencies [70d97e5]
  - @visactor/vseed@0.5.6

## 0.5.5

### Patch Changes

- Updated dependencies [c3dec4e]
  - @visactor/vseed@0.5.5

## 0.5.4

### Patch Changes

- Updated dependencies [54b7f82]
  - @visactor/vseed@0.5.4

## 0.5.3

### Patch Changes

- Updated dependencies [54b7f82]
  - @visactor/vseed@0.5.3

## 0.5.2

### Patch Changes

- Updated dependencies [6bd030c]
  - @visactor/vseed@0.5.2

## 0.5.1

### Patch Changes

- Updated dependencies [c49b8f8]
  - @visactor/vseed@0.5.1

## 0.5.0

### Patch Changes

- Updated dependencies [adb1d8b]
  - @visactor/vseed@0.5.0

## 0.4.28

### Patch Changes

- Updated dependencies [f271ae9]
  - @visactor/vseed@0.4.28

## 0.4.27

### Patch Changes

- Updated dependencies [6e299be]
  - @visactor/vseed@0.4.27

## 0.4.26

### Patch Changes

- Updated dependencies [8b330c5]
  - @visactor/vseed@0.4.26

## 0.4.25

### Patch Changes

- Updated dependencies [04cb09c]
  - @visactor/vseed@0.4.25

## 0.4.24

### Patch Changes

- d2f4f33: Refactor the VBI runtime API around explicit `chart` / `insight` / `report` namespaces and align report resource handling with dedicated resource stores.

  Breaking changes:
  - Rename empty DSL helpers on the namespace API:
    - `chart.generateEmptyDSL(...)` -> `chart.createEmpty(...)`
    - `insight.generateEmptyDSL(...)` -> `insight.createEmpty(...)`
    - `report.generateEmptyDSL(...)` -> `report.createEmpty(...)`
    - `report.generateEmptyPageDSL(...)` -> `report.createEmptyPage(...)`
  - Remove the old `generate-empty-*` source files and helper names from `@visactor/vbi`.
  - Split the internal resource registry into explicit chart and insight stores and move the implementation under `src/vbi/resources/`.

  This change also updates the in-repo downstream usages in practices and apps to the new API.
  - @visactor/vseed@0.4.24

## 0.4.23

### Patch Changes

- f5a9ad0: Refactor the VBI runtime API around `chart`/`insight`/`report` namespaces and align report APIs with the resource model.

  Breaking changes:
  - `createVBI()` no longer returns flat helpers such as `createChart`, `createInsight`, or `createReport`, and the old empty helper names were removed. Use `chart.create`, `insight.create`, `report.create`, `chart.createEmpty`, `insight.createEmpty`, `report.createEmpty`, and `report.createEmptyPage` instead.
  - Legacy report text DSL exports were removed. `VBIReportTextDSL`, `VBIReportTextDSLInput`, `zVBIReportTextDSL`, and the old `ReportTextBuilder` are no longer available.
  - @visactor/vseed@0.4.23

## 0.4.22

### Patch Changes

- Updated dependencies [238fd91]
  - @visactor/vseed@0.4.22

## 0.4.21

### Patch Changes

- Updated dependencies
  - @visactor/vseed@0.4.21

## 0.4.20

### Patch Changes

- Updated dependencies [dbaada2]
  - @visactor/vseed@0.4.20

## 0.4.19

### Patch Changes

- 76dbf5c: feat: add adapters options for vbi create method, for custom buildQuery and buildChart
  - @visactor/vseed@0.4.19

## 0.4.18

### Patch Changes

- Updated dependencies
  - @visactor/vseed@0.4.18

## 0.4.17

### Patch Changes

- Updated dependencies
  - @visactor/vseed@0.4.17

## 0.4.16

### Patch Changes

- fba7871: feat: vtable allow empty dataset
- Updated dependencies [fba7871]
  - @visactor/vseed@0.4.16

## 0.4.15

### Patch Changes

- fix: ci not working
- Updated dependencies
  - @visactor/vseed@0.4.15

## 0.4.14

### Patch Changes

- 0179551: feat: vbi add undoManager
  - @visactor/vseed@0.4.14

## 0.4.13

### Patch Changes

- Updated dependencies
  - @visactor/vseed@0.4.13

## 0.4.12

### Patch Changes

- release vbi
- Updated dependencies
  - @visactor/vseed@0.4.12

## 0.4.11

### Patch Changes

- release packages/vbi
- Updated dependencies
  - @visactor/vseed@0.4.11

## 0.0.1

### Patch Changes

- d42ef8e: feat: release @visactor/vbi
- Updated dependencies [d42ef8e]
  - @visactor/vseed@0.4.10
