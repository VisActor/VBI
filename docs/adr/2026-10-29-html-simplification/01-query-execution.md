# 01 · 图表 Builder 公开 query()

状态：已实现，待 review。基线：`03aa5a8bf3`。

## 解决什么

图表的维度、度量和筛选本来就能生成 query；目前执行查询的步骤在 `buildVSeed()` 内。外部只需要查询结果时，也必须构建 VSeed。应直接公开同一个图表的查询操作，继续以图表 DSL 为查询配置源。

## 收益计算

- 实测：[DashboardData.rows](../../../skills/visactor-dashboard/references/visual-query/assets/dashboard-data.js) L42–48，7 行 / 278 B，复制于四份模板；[经营模板 rowsOf](../../../skills/visactor-dashboard/scenarios/light-dashboard/templates/template-business-overview.html) L6226–6230，5 行 / 246 B。
- 现有映射包装成本：`7 × 4 + 5 = 33 行`，`278 × 4 + 246 = 1,358 B`。query() 保留字段 ID，这些映射不能据此整段删除。
- 单纯把调用入口改为 query()，预计 HTML 净减少接近 **0 KB**。主要收益是查询入口完整，以及省去查询场景中 VSeed 配置的组装；性能收益尚未实测。
- 口径：UTF-8 源码含空行/注释，只计四份源 HTML，不含库代码；本案不再计入字段投影的收益。

## API 如何变化

| 库     | 草案                                                                                                                                              |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| VBI    | 新增 `chart.query({ signal? }) → Promise<VBIQueryResult>`、QueryOptions 和可选 `adapters.query(context)`；返回既有 `{ dataset }`，图表 DSL 不变。 |
| VQuery | 不变，执行图表生成的查询 DSL。                                                                                                                    |
| VSeed  | 不变；VBI 的 VSeed 构建适配器消费查询结果，负责可视化配置组装。                                                                                   |

```ts
const chart = vbi.chart.create(vbi.chart.createEmpty(connectorId))
chart.dimensions.add('region', (node) => node.setAlias('地区'))
chart.measures.add('sales', (node) => node.setAggregate({ func: 'sum' }))
const { dataset } = await chart.query({ signal })
```

- `buildVQuery()`：根据当前图表构建 query DSL，不执行。
- `query()`：固定当前图表配置，由 buildVQuery adapter 编译，再交给 query adapter 执行，原样返回结果。
- 默认 `buildVSeed()`：固定同一份图表配置并编译查询，由默认 seed adapter 调用 query adapter 一次，再组装 VSeed；Builder 不区分默认或自定义 adapter。

```text
query()      → adapters.buildVQuery → adapters.query → 查询结果
buildVSeed() → adapters.buildVQuery → adapters.buildVSeed
                                     └→ adapters.query → 查询结果 + 图表配置 → VSeed DSL
```

结果继续按图表维度/度量 ID 命名，保持现有查询与 VSeed 数据合同。query adapter 的 context 包含 dsl、vbiDSL、builder、queryDSL 与 options，返回 VBIQueryResult；不增加 resultKey、columns 或独立查询模型，字段投影另行评估。

## 代价与取舍

- 查询执行集中到 query adapter；默认 seed adapter 复用查询并消费结果。只覆盖 query 时，直接查询和默认 VSeed 构建都会使用它。
- 同一次 buildVSeed 的查询和配置转换必须共享图表快照，不能在 await 后重新读取变化了的 Builder。
- query 是可选扩展，旧 adapter 自动补齐默认执行器；自定义 buildVQuery 与 buildVSeed 保留原有上下文与顺序，框架不预先查询。包装默认 seed adapter 仍只查询一次，自行返回 seed 的 adapter 可继续不查询；直接调用公开默认 seed adapter 也保留原合同。
- 默认 buildVSeed 每次仍只查询一次；分别调用 query()、buildVSeed() 是两次独立操作，不引入隐式缓存。

**建议：作为图表 Builder 的基础能力补齐，并供 [02](02-record-view.md)、[07](07-analysis-session.md) 使用；按查询边界的完整性评审。**

验收：同一图表配置下 query().dataset 与默认 buildVSeed().dataset 一致；默认路径各查询一次；自定义路径不增加查询；并发执行使用固定配置，取消及原 adapter 合同保持。
