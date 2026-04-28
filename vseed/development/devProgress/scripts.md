# 常用脚本

为了保持 Monorepo 的一致性，**所有脚本必须在项目根目录执行**。

## 核心脚本 (g)

`g` (Generator) 是 VSeed 开发中最关键的辅助脚本。

```bash
pnpm run g
```

**功能说明**:
该命令是 `build:test`、`build:docs` 、`build:api` 的组合，用于确保开发环境的资源同步：

1. **生成测试用例**: 解析 `tests/integrations` 下的 JSON Spec，生成对应的 `.test.ts` 文件。
2. **生成文档**: 解析 TypeScript 类型定义，更新 `apps/website` 中的 API 文档。

**使用场景**:

- 修改了图表逻辑或添加了新图表类型后。
- 修改了 TypeScript 类型定义后。
- 提交代码前。

## 开发与构建

### 启动开发环境

同时启动 VSeed 监听与文档站点。

```bash
pnpm run dev
```

### 构建项目

构建 VSeed 核心库。

```bash
pnpm --filter=@visactor/vseed run build
```

## 测试相关

### 运行所有测试

```bash
pnpm --filter=@visactor/vseed run test
```

### 运行单元测试

```bash
pnpm --filter=@visactor/vseed run test:unit
```

### 运行集成测试

```bash
pnpm --filter=@visactor/vseed run test:integration
```

### 更新测试快照

当你的代码变更导致快照变化（且符合预期）时运行：

```bash
pnpm --filter=@visactor/vseed run test:update
```

## 代码质量

### Lint 检查

```bash
pnpm run lint
```

### 类型检查

```bash
pnpm run typecheck
```
