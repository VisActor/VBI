---
'@visactor/vbi': patch
'@visactor/vquery': patch
---

Add an independent VBI QueryBuilder with persistent, collaborative query state, calculated fields, queryProfile() and queryBins(). Reuse query capabilities in ChartBuilder while preserving existing chart APIs.

Extend VQuery with FROM subqueries, conditional projections and validated numeric expressions for period comparisons, percentages and other BI calculations. Improve in-memory execution performance and organize SQL parsing, compilation and adapters without changing public package entrypoints.
