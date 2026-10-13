# 测试流程

VQuery 使用 `rstest` 框架进行测试。**所有命令需在根目录执行。**

## 测试机制

- **Unit**：工具函数、编译器逻辑与内存查询引擎。
- **examples**：SQL 生成与内存数据查询流程。
- **dialects**：共用一套 DSL，快照校验 MySQL 和 DuckDB 的 SQL 生成结果，不连接数据库。

## 常用命令

### 运行所有测试

```bash
pnpm --filter @visactor/vquery run test
```

### 更新快照

确认 SQL 变化符合预期后更新快照，并审阅生成的差异：

```bash
pnpm --filter @visactor/vquery run test:update
```

### 覆盖率报告

```bash
pnpm --filter @visactor/vquery run test:coverage
```

## 方言 SQL 快照

方言测试只有一套共享用例和一份快照：

- `tests/dialects/queries.json`：以 `supermarket` 为查询表，保存真实 CSV 的完整 20 字段逻辑 schema 和共享 DSL 用例。`source` 指向仓库已有的 `tests/unit/assets/supermarket.csv`；该文件与本次提供的 CSV 内容一致，测试无需访问用户的 Downloads 目录。每条用例用唯一且稳定的 `name` 标识，可附 `description` 解释业务场景。
- `tests/dialects/compile.test.ts`：每条 DSL 分别调用 MySQL、DuckDB 的 `compileQuery`，将两种方言的 `{ sql, parameters }` 一起核对快照。
- `tests/dialects/__snapshots__/compile.test.ts.snap`：按用例保存两种方言的 SQL 和参数；通过快照差异审阅编译逻辑变化。

测试纳入现有的 `test`、`test:update`、`test:coverage`，无需专用配置、数据库服务、CLI 或连接凭据。新增方言时复用同一套 DSL，增加对应编译结果即可。

CSV 中 `id`、`sales`、`amount`、`discount`、`profit` 使用 number，`order_date`、`delivery_date` 使用 date，其余列使用 string。日期样例按 SQL DATE 格式表示为 `YYYY-MM-DD`。用例涵盖销售利润、商品层级、省市地域、客户贡献、折扣亏损与配送分析，使用真实字段和业务值；不在业务用例中改写 schema 或虚构源字段。

测试将 schema 字段与 CSV 表头逐一比较，并逐条检查 SELECT、WHERE、HAVING 的源字段；GROUP BY、ORDER BY 可以引用真实字段或 SELECT 输出别名。聚合查询中的维度必须参与分组，聚合结果别名不能作为分组键。别名是输出名称，不视为新的源字段。

只运行方言快照测试：

```bash
pnpm --filter @visactor/vquery exec rstest --include 'tests/dialects/**/*.test.ts' --coverage.enabled=false
```

覆盖率沿用包现有的四项 100% 门槛，非法 DSL 的拒绝分支由 Unit 测试覆盖，不维护另一套方言覆盖率配置。

## 功能与组合覆盖

源码覆盖率 100% 不等于所有 DSL 组合都被验证。嵌套层数、条件数量和参数值没有有限的穷举集合；用例库持续积累实际场景和历史回归，不以数量代替覆盖范围。

共享 JSON 用例库持续扩充，测试同时检查以下明确的组合要求，删除必要用例会失败。功能与操作符清单通过 DSL 类型约束；现有 `typecheck` 同时检查源码和测试，新增功能时需要同步补充清单与用例。

| 范围 | 覆盖要求 |
| --- | --- |
| SELECT | 11 种基础聚合、8 种日期聚合，以及字段、别名与全部字段投影 |
| HAVING | 11 种基础聚合 × 12 种比较操作符，共 132 种组合 |
| 日期分组 | 8 种日期聚合 × 11 种基础聚合，共 88 种组合 |
| 排序 | 11 种基础聚合 × 升降序 × 默认/first/last NULL 位置，共 66 种组合 |
| WHERE | 16 种操作符分别位于 AND、OR 嵌套树中，共 32 种组合 |
| 完整查询 | SELECT、WHERE、GROUP BY、HAVING、ORDER BY、limit 同时出现 |

另包含商品名称 MIN/MAX 的 HAVING、下单日与配送日分组、多日期多字段分组、销售与利润跨字段统计、未投影 HAVING、别名冲突、2/4/8 层嵌套等回归场景。这些场景不代表任意组合均已穷尽。

追加场景时，直接在 `queries.json` 的 `queries` 数组中增加基于这份 schema 的完整 DSL，用 `description` 说明触发条件或历史问题，再运行 `test:update` 并审阅两种方言的 SQL 差异。不要复制方言专属用例或加入随机生成步骤。无 schema、特殊标识符、JS `Date`、`Infinity` 等编译器边界由 Unit 测试维护。
