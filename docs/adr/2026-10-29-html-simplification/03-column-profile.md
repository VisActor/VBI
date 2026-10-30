# 03 · 列概况：QueryBuilder 操作与表格呈现

状态：QueryBuilder/Chart 的 queryProfile()、queryBins() 已实现，待 review；表格呈现未实现。依赖 [09](09-query-builder.md)，合并原 03/08。体积计量基线：`03aa5a8bf3`。

## 解决什么与 API

模板自行统计范围、分箱和分类频次。VBI 提供完整查询操作，用户无需取得 VQuery Dataset，也无需拉取明细自行计算。

```ts
const stats = await query.queryProfile({
  columns: [ageId, sexId], // 查询输出列名，默认编译使用字段 ID
  bins: { maxBins: 12, discreteMax: 20 },
  topK: 3,
  emptyString: 'missing',
  signal,
})
const bins = await query.queryBins({ columns: [ageId], maxBins: 12, signal })
// ChartBuilder 提供相同方法。
```

`queryProfile()` 返回 `{ rowCount, columns }`，包含有效/缺失数、数值范围与 bins，或分类 top 与 otherCount。`queryBins()` 仅处理数值列，返回行数及各列的有效/缺失数、范围和 bins。分箱与分类频次独立实现；结果不含显示文案或图形配置。

## 三个库的变化

| 库     | API / DSL                                                                                                                                                                    |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| VBI    | QueryBuilderBase 提供 queryProfile/queryBins，Chart 与 Query 共用；统计选项为调用参数，查询编辑状态仍归 VBIQueryDSL。                                                        |
| VQuery | 增强通用 Query DSL：`from?: VQueryDSL` 显式表达 SQL 子查询，`select[].when` 按条件保留字段值、否则为 NULL，可配合既有聚合；支持 count(\*)。导出投影 schema 推导与 DSL 校验。 |
| VSeed  | 本次无变化。待评审：Table.columnProfiles、totalsData 与概况呈现 Pipe。                                                                                                       |

## 查询合同

VBI 将当前编译结果作为 `from`，用标准 Query DSL 组合行数/范围、分类频次与分箱计数，经现有 `Connector.query()` 执行。Connector 仍负责表名、方言及 SQL 执行；无需专用 profile adapter。VQuery 仅负责通用语法与 SQL 编译。

```text
query / chart.queryProfile() → summary + category + bins → Connector.query(Query DSL)
query / chart.queryBins()    → summary + bins            → Connector.query(Query DSL)
```

- 原查询的 WHERE、GROUP BY、HAVING、排序与 limit 均保留。统计的是查询结果，不能标称源数据全量。
- 每次调用固定查询、连接和选项；仅返回聚合行及有界频次表，不通过普通 query adapter 拉明细。不接受自定义非 Query DSL 协议的统计请求；原 query/buildVSeed 自定义适配保持。
- 统计按声明的输出 schema 识别 number/string；其他类型及无有效值的列返回 unknown。显式失效列名报错；queryBins 显式选择非数值列报错。
- 数值有效值为有限数；少量离散值逐值计数，否则等宽分箱，左闭右开、末箱包含最大值。同频分类按值升序。空字符串默认有效，可设 missing；数据源已规范为空值的数据遵循源数据。
- 查询结果、调用选项和 signal 不进入 Yjs 或 Undo；多次调用独立执行，不缓存。多条 SQL 共用固定连接，但不保证数据源事务快照。取消停止后续查询与结果交付，底层中断能力由 Connector 决定。

## 表格呈现与收益（待评审）

建议通过 Chart 配置控制概况显示，VSeed 消费 DTO 并生成概况行；本次不实现显示开关或默认 buildVSeed 联动。需另评估统计 SQL 与明细查询的一致性及成本。

历史实测：[表格适配器](../../../skills/visactor-dashboard/references/visual-query/assets/dashboard-table.js) 统计段 **117 行 / 5,784 B**，呈现段 **85 行 / 4,095 B**。合计每份候选 **202 行 / 9,879 B**；若保留 40–60 行调用，估计四份净删 **27.8–31.7 KB**。须在新调用方式下重测，不与 09 或其他 ADR 相加。

验收：VBI 公开入口可独立统计和分箱；SQL 只返回聚合结果；查询粒度与 limit 保持；空值、常量、边界及同频排序确定；统计不改 Yjs，原 Chart 查询与 Spec 回归通过。
