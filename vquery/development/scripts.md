# 常用脚本

为了保持 Monorepo 的一致性，**所有脚本必须在项目根目录执行**。

## 核心脚本 (g)

```bash
pnpm run g
```

**功能说明**: VQuery 的 `g` 脚本负责：

1. `build:test`: 编译测试资源。
2. `build:docs`: 生成 API 文档。

## 开发与构建

### 构建

```bash
pnpm --filter=@visactor/vquery run build
```

## 测试

### 运行测试

VQuery 使用 Rstest 进行测试。

```bash
pnpm --filter=@visactor/vquery run test
```

### 更新快照

```bash
pnpm --filter=@visactor/vquery run test:update
```

### 覆盖率

```bash
pnpm --filter=@visactor/vquery run test:coverage
```
