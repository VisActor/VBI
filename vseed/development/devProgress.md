# 开发流程

## 启动项目

```bash title=启动项目
pnpm install && pnpm dev
```

## 理解需求并编写代码

这是一个复杂的过程, 但一般情况, 就是三件事情:

1. 明确输入, `vseed`
2. 明确输出, `vseed` 转为 `advancedVSeed`, 或 `advancedVSeed` 转为 `spec`
3. 编写代码, 确保新的输入有符合预期的输出

:::tip
`playground(apps/website/docs/zh-CN/playground/index.mdx)`, 可以进行调试与开发.

:::

## 新建测试用例

若有必要, 则可以考虑新建测试用例

:::tip
覆盖率降低时, 则需要新建测试用例

:::

在`packages/vseed/tests/*`目录下, 新建一个`testName.json`, 并写入vseed DSL.

执行

```bash title=创建测试用例
pnpm build:canvasTest
```

## 执行单元测试并更新覆盖率

```bash title=执行单元测试并更新覆盖率
pnpm test:coverage
```

确保3件事情

1. 所有的测试都通过
2. 快照变动都符合预期
3. 覆盖率没有下降

> 覆盖率变化情况, 会自动更新至README.md

## 更新配置项文档

如果修改了图表类型的Typescript定义, 请更新配置项文档.

:::tip
`packages/vseed/src/types/chartType` 下的所有类型定义, 对应着每一个图表的配置项文档, 如有变化, 请务必更新

:::

```bash title=更新配置项文档
pnpm build:docs
```

## 发布与提交

```bash title=描述变更内容
pnpm changeset
```

执行 `pnpm changeset` 命令后会，根据提示选择进行以下操作

1. 选择需要变化的包, 一般情况下, 只有vseed
2. 遵循语义化版本, 选择变更类型, 绝大多数情况, 连续2次回车键, 跳过 `major` 和 `minor` 后, 选择 `patch` 即可.
3. 输入变更描述, 例如: `fix: chart render error caused by only one measure`

:::tip 建议
一个功能或Bugfix, 对应一个`changeset`, 对应一个`commit`

一个 `Pull Request`, 对应 一个`issue`

一个 `Pull Request`, 对应多个功能或多个Bugfix, 对应多个`changeset`, 对应多个`commit`

:::

## 提交

```bash title=提交所有内容
git add .
git commit -m "fix: chart render error caused by only one measure"
git push
```
