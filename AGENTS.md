# AGENTS.md

This file provides comprehensive guidance to Coding Agents when working with code in this repository. Agents must STRICTLY adhere to these guidelines to ensure consistency, correct usage of commands, and high code quality.

## 项目规范 (Project Guidelines & Core Principles)

- **Single Source of Truth 原则**：VBIChartDSL, VQueryDSL, and VSeedDSL are the sole drivers of core functionality. Treat them as immutable where possible.
- **第一性原理**：Design and implement intuitively. Avoid overly complex abstractions.
- **小函数, 小文件理念**：Aim for files under 150 lines, and functions under 50 lines. Keep components and functions focused on a single responsibility.
- **状态不可变 (Immutability)**：When dealing with React state or DSL transformations, never mutate objects directly. Always return new references.

## 项目概览 (Architecture Overview)

VBI 是 VisActor 生态的 Monorepo，实现从数据配置到图表渲染的完整可视化流水线。

**Data Flow Pipeline:**
`用户配置 → VBI (配置层/VBIChartDSL) → VQuery (查询层/QueryDSL→SQL) → VSeed (渲染层/VSeedDSL→Spec)`

| 包 (Package) | 职责 (Role) |
|---|---|
| **@visactor/vbi** | BI 构建器，基于 Yjs 协同编辑 DSL，依赖 vseed + vquery |
| **@visactor/vquery** | 通用查询引擎，JSON DSL → SQL，支持 DuckDB/Postgres |
| **@visactor/vseed** | 声明式图表生成器，语义配置 → VChart/VTable Spec |
| **@visactor/vbi-react**| React 适配与集成层 |

### 数据流 (Data Flow)
1. 用户配置图表（chartType, measures, dimensions, etc.）
2. `VBIChartBuilder.buildVQuery()` 将 VBIChartDSL → VQueryDSL
3. Connector 调用 VQuery 执行 SQL，返回数据集
4. 合并 VBIChartDSL + 数据集，通过 VSeed Builder → VChart/VTable Spec
5. 前端使用对应框架渲染

## 常用命令 (Commands)

**所有 `pnpm` 命令必须在项目根目录执行，针对特定包用 `--filter`。** 

### 1. 构建与本地运行 (Build & Run)
```bash
pnpm run build                  # 构建所有包 (uses turbo)
pnpm run dev                    # 启动文档站点，自动监听所有包源码
pnpm run vbi:up                 # 启动本地 Docker 环境 (Postgres 等服务)
pnpm run format                 # 格式化全量代码 (Prettier)
```

### 2. 代码质量验证 (Linting & Types)
```bash
pnpm run lint                   # 全量 Lint (ESLint)
pnpm run typecheck              # 全量类型检查 (tsc)
pnpm run g                      # 生成测试脚手架, 文档等并自动 format
```

### 3. 测试 (Testing - CRITICAL for Agents)
我们提倡先写测试用例 (TDD)，再进行代码实现。始终确保已有测试通过。

```bash
# 运行全部测试
pnpm run test

# 运行指定包的所有测试
pnpm --filter=@visactor/[pkg] run test

# 更新测试快照 / 覆盖率
pnpm --filter=@visactor/[pkg] run test:update
pnpm --filter=@visactor/[pkg] run test:coverage

# vseed 额外命令
pnpm --filter=@visactor/vseed run test:unit
pnpm --filter=@visactor/vseed run test:integration
```

**⚠️ 运行单个测试文件 (重要)**
When modifying code, run ONLY the relevant test file to get fast feedback. Use the exact relative path after the `--` separator:
```bash
pnpm --filter=@visactor/[pkg] run test -- src/__tests__/path/to/your-file.test.ts
```

## 开发流程与验证指南 (Workflow & Validation)

1. **Understand**: Use `grep`/`glob` to explore existing usages of the code you will touch.
2. **Test First**: 写测试用例（单元测试或集成测试 JSON Spec）。
3. **Implement**: 开发实现代码。
4. **Scaffold**: 运行 `pnpm --filter=@visactor/[pkg] run g` 生成文档和补充文件。
5. **Verify Local**: 单包修改时执行 `pnpm --filter=@visactor/[pkg] run test -- [file]` -> `pnpm run lint` -> `pnpm run typecheck`。
6. **Verify Global**: 多包/破坏性变更时必须执行全量 `pnpm run test` + `pnpm run lint` + `pnpm run format` + `pnpm run typecheck`。

## 代码风格与规范 (Code Style & Standards)

### 1. 导入规范 (Imports)
- **Local Imports**: 同一目录或同包内的引用使用相对路径 (`./`, `../`)。
- **Cross-Package**: 跨包引用必须使用 npm 包名 (如 `import { X } from '@visactor/vquery'`)。绝对禁止直接使用相对路径跨域到其他包的 `src` (例如 `../../vquery/src/...` is BAD)。
- **顺序**: Node内置库 -> 外部依赖 (react, lodash) -> VisActor生态包 -> 内部相对路径。

### 2. 格式化 (Formatting)
- **Spacing**: 缩进使用 2 个空格。使用单引号 `'` (除了 JSX 属性使用 `"` )。句末添加分号 `;`。
- **Automatic Fixes**: 提交代码前必须执行 `pnpm run format` 自动格式化。不要和 linter 争论。

### 3. 类型规范 (Types)
- **Strict Types**: 开启 `strict: true`，禁止隐式的 `any`。尽可能使用 `unknown` 代替 `any`。
- **DSL 定义**: VBIChartDSL, VQueryDSL 等数据结构跨层级流转，必须提供详尽的接口定义 (interface) 与字段注释 (TSDoc)。
- **Interface vs Type**: 公开 API 和对象结构优先使用 `interface`，联合类型 (Union) 或函数签名使用 `type`。

### 4. 命名约定 (Naming Conventions)
- **文件与目录 (Files)**：使用小写中划线 `kebab-case`（如 `chart-builder.ts`）。React 组件文件使用 `PascalCase`（如 `ChartContainer.tsx`）。
- **类名与接口 (Classes/Interfaces)**：使用 `PascalCase`（如 `QueryEngine`）。
- **变量与函数 (Vars/Funcs)**：使用小驼峰 `camelCase`（如 `parseConfig`）。
- **布尔值 (Booleans)**：应加 `is`、`has`、`should` 前缀（如 `isValid`）。
- **常量 (Constants)**：全局/导出常量使用全大写加下划线 `UPPER_SNAKE_CASE`。

### 5. 错误处理 (Error Handling)
- **Fail Fast**: 在解析 DSL 和数据库连接时，必须做非空与类型有效性检查。
- **No Swallowing**: 不要吞掉错误 (Swallow errors)。`catch` 块不能为空。
- **Contextual Context**: `try/catch` 中应当抛出携带上下文信息的自定义错误传递给上层：
  ```typescript
  try {
    await connector.execute(sql);
  } catch (err) {
    // Note: ensure err is stringified properly
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`Execution failed for [${connector.name}]: ${msg}`);
  }
  ```

### 6. React / Frontend 规范 (React Specifics)
- **Hooks**: Use proper dependency arrays for `useEffect` and `useCallback`. Do not omit dependencies to bypass lint warnings.
- **Separation of Concerns**: Keep components purely presentational where possible. Move heavy business logic, DSL transformation, or complex state management to pure utility functions or custom hooks.
