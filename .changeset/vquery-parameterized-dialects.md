---
'@visactor/vquery': patch
---

Expose parameterized `compileQuery` with MySQL as the default dialect and explicit `convertDSLToMysql` / `convertDSLToDuckDB` helpers, replacing `convertDSLToSQL`. Keep dataset queries on the DuckDB strategy.

Align MySQL and DuckDB aggregation, date grouping, string matching, NULL ordering, and median/quantile behavior. Add a shared real-schema DSL catalog that snapshots both dialects without database test dependencies.

Default browser and Node dataset storage to memory. Share the same constructor options across both entrypoints, and enable IndexedDB persistence only with `new VQuery({ enableIndexedDB: true })`.
