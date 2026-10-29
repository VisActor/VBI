---
'@visactor/vbi': patch
---

Expose chart.query() for direct query results and persist aggregate/detail queryMode in chart DSL. Detail table queries preserve source records and field IDs while reusing existing query execution, filtering, sorting and limits.
