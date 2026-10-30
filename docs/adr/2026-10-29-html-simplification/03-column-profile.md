# 03 · 完整列概况：VBI 入口、VQuery 统计、VSeed 呈现

状态：待评审；合并原 03、08，列概况尚未实现。体积计量基线：`03aa5a8bf3`。

## 解决什么

模板目前手动组织统计查询、分箱和频数，再生成 chartSpec、CUSTOM 汇总、customRender 与固定行。目标是一次 VBI 操作取得概况，构建表格时自动带上概况呈现；用户无需取得 VQuery Dataset 或手工转换统计 DTO。

## VBI 用户如何使用

```ts
table.queryMode.setMode('detail')
table.columnProfiles.setConfig({
  enable: true,
  bins: { maxBins: 12, discreteMax: 20 },
  topK: 3,
  emptyString: 'missing',
})

// 只需要统计结果：
const stats = await table.profile({ signal })
// 需要表格：选择这条路径，默认适配器自动填入 seed.columnProfiles.data。
const seed = await table.buildVSeed({ signal })
```

两条路径按需选择，分别调用是两次独立操作。`profile()` 显式执行统计；enable 只控制默认 buildVSeed 是否自动附带概况。无需新增 `vbi.dataset` 模型。

## 范围与结果合同

- 统计**当前图表查询结果**，遵循 queryMode、WHERE、GROUP BY、HAVING 和 limit；不隐式切换为源数据统计。detail 保留逐条记录，aggregate 统计聚合后的结果列。
- 统计完整查询结果，虚拟滚动可见行不影响统计。若 DSL 设置 limit，统计也受该 limit 约束，不能标称源数据全量概况。
- 可在 columnProfiles 配置中用 columns 指定图表投影列 ID，省略时统计全部支持列；失效 ID 明确报错。结果为 VBI 自有 `VBIProfileResult = { rowCount, columns }`；columns 按 ID 索引，保留 field、alias、类型和统计值，同源字段不同聚合不会覆盖。
- 第一版支持 number/string：有效/缺失数、数值范围与 bins，或高频项与 otherCount。结果不含文案、颜色或 VChart Spec。

## 三个库的 API 变化

| 库     | 草案                                                                                                                                                                                            |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| VBI    | 新增 `chart.profile({ signal? })`、columnProfiles Builder、Chart DSL 可选 columnProfiles 配置、`VBIProfileResult` 与可选 `adapters.profile(context)`；不向用户暴露 VQuery 类型。                |
| VQuery | 新增 `dataset.profile({ query?, columns?, bins?, topK?, emptyString?, signal? })`；query 为既有 VQueryDSL，省略时统计源记录。导出共用纯统计核 `profileRows(rows, options)`，避免 VBI 重写算法。 |
| VSeed  | Table 新增 columnProfiles、totalsData；TableMeasure 新增 `totals?: TotalType \| false`。独立 Pipe 负责概况行、迷你图、分类摘要及布局，不执行查询。                                              |

columnProfiles 的启用、选列和统计参数入 VBI DSL，支持保存恢复；统计结果和执行状态不入 DSL。VBI adapter 内部将统计结果转换为 VSeed 展示 DTO，取消原方案面向用户的 `toTableColumnProfiles()` 步骤。

## 执行与适配边界

```text
chart.profile() → profile adapter → query adapter → profileRows → VBIProfileResult
buildVSeed()   → query adapter 一次 → 同一结果交给 profile adapter → VSeed DSL
VQuery Dataset.profile() → 执行 query → 同一个 profileRows
```

profile context 复用查询上下文与固定图表快照，新增可选 queryResult。默认 profile adapter 无结果时通过当前 query adapter 查询，有结果时直接统计；默认 seed adapter 传入已经取得的 queryResult，避免重复取数和范围不一致。

Connector 现有 query 合同保持。数据源需要下推时，可覆写 profile adapter，在内部调用 dataset.profile 或远程统计接口；传入 queryResult 时必须统计该结果，不能重新取数。自定义 seed adapter 保留原合同，新概况能力由其显式接入。

## 表格呈现

默认 VBI seed adapter 自动填入 columnProfiles.data；VSeed 复用表格主题生成顶端概况行。字段 totals 未设置时继承全局，false 关闭该列；提供 totalsData 时只展示给出的字段，不自动补算或推断比率。统计归 VQuery，字段翻译归 VBI adapter，呈现归 VSeed。

## 合并后的收益计算

- 实测：[表格适配器](../../../skills/visactor-dashboard/references/visual-query/assets/dashboard-table.js) 统计段 L696–700、712–724、739–837 为 **117 行 / 5,784 B**；呈现段 L865–944、947–948、208–210 为 **85 行 / 4,095 B**，两组不重叠。
- 合计每份 **202 行 / 9,879 B**，四份 **808 行 / 39,516 B**。新配置、调用和保留的 UI 适配估计 40–60 行/份，净删 `202 − (40…60) = 142…162 行`。
- 按原段密度约净省 **6.9–7.9 KB/份，四份 27.8–31.7 KB**。这是估算；UTF-8 含空行/注释，只计四份源 HTML，不含库代码。替代原 03/08 的分别估算，不再相加，也不叠加其他 ADR 的收益。

## 代价与取舍

- 成本中高：跨三个库建立统计/展示合同，但不新增数据源或分析资源模型。默认路径可能需要完整拉取查询结果；大数据下推另行验收，不能用采样替代。
- 必须定义非有限数值、空字符串、常量、末箱上界、同频排序和全部缺失。signal 支持取消/丢弃结果，不承诺所有执行器都能中断 SQL。默认关闭概况，旧 DSL、Spec、Connector 及 adapter 路径保持。
- CSS token、菜单、复制、模块注册及实例更新仍由 UI 管理；不统计这些代码的删除收益。

**建议：合并为第一批完整能力，复用 [01](01-query-execution.md)、[02](02-record-view.md) 的当前接口；优先确认 profile 与 query 的粒度一致，以及启用概况时默认 buildVSeed 仍只查询一次。**

验收：仅使用 VBI 公共入口即可取得统计和带概况的 VSeed；同一查询结果与 VQuery 统计一致；无手写概况 Spec；取消、保存恢复、空数据、换色与旧普通表/PivotTable 回归通过。
