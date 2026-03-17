# 测试流程

VSeed 采用严格的测试驱动开发流程。**所有测试命令必须在项目根目录执行。**

## 测试分类

### 1. 单元测试 (Unit Tests)

* **目标**: 测试独立的工具函数、Pipeline 节点逻辑。
* **位置**: `packages/vseed/tests/unit`
* **运行**:
  ```bash
  pnpm --filter=@visactor/vseed run test:unit
  ```

### 2. 集成测试 (Integration Tests)

* **目标**: 测试完整的图表生成流程 (VSeed Spec -> VChart Spec)。
* **机制**: 数据驱动。通过读取 `packages/vseed/tests/integrations` 下的 JSON 文件自动生成测试用例并比对快照。
* **运行**:
  ```bash
  pnpm --filter=@visactor/vseed run test:integration
  ```

## 核心工作流 (Workflow)

### 步骤 1: 运行测试

在开发过程中，频繁运行相关测试以验证逻辑。

```bash
# 运行所有测试
pnpm --filter=@visactor/vseed run test
```

### 步骤 2: 处理快照变更

如果修改了代码导致输出 Spec 发生变化（例如修复了 Bug 或新增了 Feature）：

1. 检查控制台输出的 Diff，确认变化是否符合预期。
2. 如果符合预期，运行更新命令：
   ```bash
   pnpm --filter=@visactor/vseed run test:update
   ```

### 步骤 3: 覆盖率检查

提交代码前，建议检查测试覆盖率。

```bash
pnpm --filter=@visactor/vseed run test:coverage
```

## 注意事项

* **自动生成**: 集成测试的 `.test.ts` 文件是由 `g` 脚本生成的，**请勿手动修改**。
* **新增用例**: 若要新增集成测试，只需在 `packages/vseed/tests/integrations` 下对应的分类目录中添加新的 JSON 配置文件，然后运行 `pnpm run g`。
