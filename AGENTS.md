# AGENTS.md

本文档旨在为 AI Agent 及项目贡献者提供关键的开发与验证指引。

## Agent 上下文入口

- VSeed（核心库）Agent 上下文：`packages/vseed/AGENTS.md`
- VSeed（站点版上下文）入口：`apps/website/docs/zh-CN/vseed/development/agentContext.md`

## 项目概览

VSeed 是一个 Monorepo 项目，包含核心数据可视化组合器库及其周边生态。

- **@visactor/vseed**: 核心库，负责将语义化配置转换为 VChart/VTable Spec。
- **@visactor/vquery**: 数据查询与转换引擎，支持 DSL 到 SQL 的编译与执行。
- **apps/website**: 项目文档与 Playground 站点。

## 关键指引

### 1. 包管理器与执行环境

**必须使用 `pnpm` 且所有命令必须在根目录执行。**

- **锁定版本**: `pnpm` (版本 >= 10.26.1)
- **禁止**: 使用 `npm` 或 `yarn`。
- **执行规则**: 所有命令（构建、测试、开发）**必须**在项目根目录执行。使用 `pnpm --filter=<package>` 定位特定包。

### 2. 验证阶段 (Verification Phase)

在提交代码或认为任务完成之前，**必须** 执行以下验证步骤，并确保全部通过。

#### 2.1 代码风格与类型检查

确保代码符合 ESLint 规则且无类型错误。

```bash
pnpm run lint          # 全量 Lint
pnpm run typecheck     # 全量类型检查
```

#### 2.2 测试验证

根据修改的模块执行对应的测试：

**VSeed (核心库)**

```bash
# 运行单元测试 (Unit Tests)
pnpm --filter=@visactor/vseed run test:unit

# 运行集成测试 (Integration Tests)
pnpm --filter=@visactor/vseed run test:integration
```

**VQuery (查询引擎)**

```bash
# 运行测试 (基于 Rstest)
pnpm --filter=@visactor/vquery run test
```

### 3. 常用命令与功能 (g)

#### 3.1 生成器 (g 功能)

项目包含一个关键的生成脚本 `g`，用于自动生成测试用例与文档。
**修改代码后，建议运行此命令以确保资源同步。**

```bash
pnpm run g
```

该命令会自动执行：

- `build:test`: 根据 Spec 生成测试用例。
- `build:docs`: 根据类型定义生成 API 文档。

#### 3.2 其他命令

- **构建所有**: `pnpm run build`
- **启动网站**: `pnpm run dev` (启动 apps/website)

## VBI Docker 容器

### 4.1 启动与关闭 VBI Docker 容器

- **启动VBI Docker容器**: `pnpm run vbi:up`
- **关闭VBI Docker容器**: `pnpm run vbi:down`
- **构建VBI Docker容器**: `pnpm run vbi:up --build`
- **删除VBI Docker容器**: `pnpm run vbi:down -v`
