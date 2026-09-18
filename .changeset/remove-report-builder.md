---
'@visactor/vbi': minor
---

Breaking change: remove Report Builder, its DSL and snapshot types, page builders,
creation helpers, and the `VBI.report` namespace. Use Dashboard Builder to compose
chart and insight resources. Existing chart, insight, and dashboard APIs remain available.

The platform also removes report management, Provider and Agent report APIs, and
report-reference queries. Existing report database tables remain archived and are
excluded from Prisma Client; this change does not delete or migrate their data.
