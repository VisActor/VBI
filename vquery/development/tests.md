# 测试流程

VQuery 使用 `rstest` 框架进行测试。**所有命令需在根目录执行。**

## 测试机制

VQuery 的测试覆盖了：

- **Unit**: 工具函数与编译器逻辑。
- **examples**: 完整的 SQL 生成与数据查询流程。

## 常用命令

### 运行所有测试

```bash
pnpm --filter=@visactor/vquery run test
```

### 更新快照

如果 SQL 生成逻辑变更符合预期，需更新快照：

```bash
pnpm --filter=@visactor/vquery run test:update
```

### 覆盖率报告

生成并查看测试覆盖率：

```bash
pnpm --filter=@visactor/vquery run test:coverage
```
