# VQuery 代码重构实现计划

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 VQuery 代码重构为更易读、易理解的模块化结构

**Architecture:** 提取共享工具函数，拆分大文件为小模块，保持 index.ts 仅用于导出

**Tech Stack:** TypeScript, Kysely

---

## 文件结构变更

```
packages/vquery/src/
├── sql-builder/
│   ├── utils/
│   │   ├── index.ts           # 索引
│   │   └── operator.ts        # 共享的 toSqlOperator
│   └── builders/
│       ├── index.ts           # 索引
│       ├── select/
│       │   ├── index.ts
│       │   └── applySelect.ts # ~40 行
│       ├── where/
│       │   ├── index.ts
│       │   └── applyWhere.ts  # ~35 行（调用共享工具）
│       ├── having/
│       │   ├── index.ts
│       │   └── applyHaving.ts # ~35 行（调用共享工具）
│       ├── groupBy.ts        # ~20 行
│       ├── order.ts          # ~15 行
│       └── limit.ts          # ~10 行
├── dataset/
│   ├── index.ts              # 索引
│   ├── dataset.ts            # ~80 行
│   └── constants.ts          # READ_FUNCTION_MAP, DATA_TYPE_MAP
└── src/index.ts              # 更新导出
```

---

## Chunk 1: 创建共享工具层

### Task 1: 创建 sql-builder/utils/operator.ts

**Files:**

- Create: `packages/vquery/src/sql-builder/utils/operator.ts`
- Test: `packages/vquery/tests/sql-builder/utils/operator.test.ts`

- [ ] **Step 1: 创建工具目录和文件**

```typescript
// packages/vquery/src/sql-builder/utils/operator.ts
const operatorMap: Record<string, string> = {
  gt: '>',
  gte: '>=',
  lt: '<',
  lte: '<=',
  eq: '=',
  neq: '!=',
}

export const toSqlOperator = (op: string): string => {
  return operatorMap[op] ?? op
}
```

- [ ] **Step 2: 创建 index.ts**

```typescript
// packages/vquery/src/sql-builder/utils/index.ts
export { toSqlOperator } from './operator'
```

- [ ] **Step 3: 验证**

Run: `pnpm --filter=@visactor/vquery run test`
Expected: PASS

---

### Task 2: 更新 where.ts 使用共享工具

**Files:**

- Modify: `packages/vquery/src/sql-builder/builders/where.ts`
- Test: 现有测试

- [ ] **Step 1: 移除重复的 operatorMap 和 toSqlOperator**

删除:

```typescript
const operatorMap: Record<string, string> = { ... }
const toSqlOperator = (op: string): string => { ... }
```

- [ ] **Step 2: 添加 import**

```typescript
import { toSqlOperator } from '../utils'
```

- [ ] **Step 3: 验证**

Run: `pnpm --filter=@visactor/vquery run test && pnpm --filter=@visactor/vquery run lint`
Expected: PASS

---

### Task 3: 更新 having.ts 使用共享工具

**Files:**

- Modify: `packages/vquery/src/sql-builder/builders/having.ts`
- Test: 现有测试

- [ ] **Step 1: 移除重复的 operatorMap 和 toSqlOperator**

删除:

```typescript
const operatorMap: Record<string, string> = { ... }
const toSqlOperator = (op: string): string => { ... }
```

- [ ] **Step 2: 添加 import**

```typescript
import { toSqlOperator } from '../utils'
```

- [ ] **Step 3: 验证**

Run: `pnpm --filter=@visactor/vquery run test && pnpm --filter=@visactor/vquery run lint`
Expected: PASS

---

## Chunk 2: 重构 SQL Builders

### Task 4: 重构 select.ts

**Files:**

- Modify: `packages/vquery/src/sql-builder/builders/select.ts`
- Test: 现有测试

- [ ] **Step 1: 分析 select.ts 当前结构**

当前文件 70 行，需要检查是否可以进一步拆分或简化

- [ ] **Step 2: 如需要，拆分大函数**

如果 select.ts 中的 applySelect 超过 50 行，考虑拆分聚合函数处理逻辑

- [ ] **Step 3: 验证**

Run: `pnpm --filter=@visactor/vquery run test`
Expected: PASS

---

## Chunk 3: 重构 Dataset 模块

### Task 5: 拆分 dataset/constants.ts

**Files:**

- Create: `packages/vquery/src/dataset/constants.ts`
- Modify: `packages/vquery/src/dataset/dataset.ts`
- Test: 现有测试

- [ ] **Step 1: 创建 constants.ts**

```typescript
// packages/vquery/src/dataset/constants.ts
export const READ_FUNCTION_MAP: Record<string, string> = {
  csv: 'read_csv_auto',
  json: 'read_json_auto',
  parquet: 'read_parquet',
}

export const DATA_TYPE_MAP: Record<string, string> = {
  number: 'DOUBLE',
  string: 'VARCHAR',
  date: 'DATE',
  datetime: 'TIMESTAMP',
  timestamp: 'TIMESTAMP',
}
```

- [ ] **Step 2: 更新 dataset.ts import**

```typescript
import { READ_FUNCTION_MAP, DATA_TYPE_MAP } from './constants'
```

- [ ] **Step 3: 验证**

Run: `pnpm --filter=@visactor/vquery run test`
Expected: PASS

---

### Task 6: 简化 dataset.ts

**Files:**

- Modify: `packages/vquery/src/dataset/dataset.ts`
- Test: 现有测试

- [ ] **Step 1: 检查当前行数**

当前 123 行，目标 < 120 行

- [ ] **Step 2: 拆分 createOrReplaceView 为独立方法**

将 createOrReplaceView 中的逻辑拆分为更小的辅助方法

- [ ] **Step 3: 验证**

Run: `pnpm --filter=@visactor/vquery run test`
Expected: PASS

---

## Chunk 4: 更新 index.ts 导出

### Task 7: 更新 src/index.ts

**Files:**

- Modify: `packages/vquery/src/index.ts`
- Test: 现有测试

- [ ] **Step 1: 检查当前导出**

```typescript
export * from './VQuery'
export * from './dataset'
export * from './sql-builder'
export * from './types'
export * from './data-source-builder'
export * from './utils'
```

- [ ] **Step 2: 添加新的导出**

确保 utils 被正确导出

- [ ] **Step 3: 验证**

Run: `pnpm --filter=@visactor/vquery run test`
Expected: PASS

---

## Chunk 5: 最终验证

### Task 8: 运行全量验证

**Files:**

- Test: 所有测试

- [ ] **Step 1: 运行测试**

Run: `pnpm --filter=@visactor/vquery run test`
Expected: PASS

- [ ] **Step 2: 运行 lint**

Run: `pnpm --filter=@visactor/vquery run lint`
Expected: PASS

- [ ] **Step 3: 运行 typecheck**

Run: `pnpm run typecheck`
Expected: PASS

- [ ] **Step 4: 运行 format**

Run: `pnpm --filter=@visactor/vquery run format`
Expected: PASS

- [ ] **Step 5: 统计文件行数**

Run: `wc -l packages/vquery/src/**/*.ts | sort -rn | head -20`
Expected: 所有文件 < 120 行

---

## 验证清单

- [ ] 函数不超过 50 行
- [ ] 单个 class 不超过 100 行
- [ ] 单个文件不超过 120 行
- [ ] index.ts 仅用于索引（导出）
- [ ] test 通过
- [ ] lint 通过
- [ ] typecheck 通过
- [ ] format 通过
- [ ] 无 breaking change（src/index 全部导出）
