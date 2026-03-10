# WhereFilters Nested Builder Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 重构 whereFilters 构建器，支持嵌套分组（AND/OR）条件，DSL 从扁平数组升级为嵌套对象结构

**Architecture:** 使用 WhereFilterGroupBuilder 和 WhereFilterNodeBuilder 双类分离设计，Yjs 数据结构从 Y.Array 改为 Y.Map 包含 Y.Array

**Tech Stack:** TypeScript, Yjs, Zod

---

## File Structure

| 文件                                                      | 职责                           |
| --------------------------------------------------------- | ------------------------------ |
| `types/dsl/whereFilters/filters.ts`                       | 新增 DSL 类型定义              |
| `types/dsl/vbi/vbi.ts`                                    | 更新 whereFilters 类型         |
| `builder/sub-builders/whereFilters/where-builder.ts`      | 重构为 WhereFilterGroupBuilder |
| `builder/sub-builders/whereFilters/where-node-builder.ts` | 保持不变                       |
| `builder/sub-builders/whereFilters/index.ts`              | 更新导出                       |
| `builder/sub-builders/index.ts`                           | 更新导出                       |
| `builder/vbi-builder.ts`                                  | 更新 where 属性类型            |
| `pipeline/vqueryDSL/buildVQuery.ts`                       | 更新 buildWhere 适配新 DSL     |
| `types/builder/VBIInterface.ts`                           | 更新 where 类型                |

---

## Chunk 1: DSL 类型定义

### Task 1: 更新 filters.ts 类型定义

**Files:**

- Modify: `packages/vbi/src/types/dsl/whereFilters/filters.ts`

- [ ] **Step 1: 读取现有文件内容**

```bash
cat packages/vbi/src/types/dsl/whereFilters/filters.ts
```

- [ ] **Step 2: 添加新类型定义**

```typescript
import { z } from 'zod'

// 现有类型（保留用于兼容）
export const zVBIFilter = z.object({
  field: z.string(),
  operator: z.string().optional(),
  value: z.any().optional(),
})

export type VBIFilter = z.infer<typeof zVBIFilter>

// 新增：条件节点
export const zWhereFilterCondition = z.object({
  field: z.string(),
  operator: z.string().optional(),
  value: z.any().optional(),
})

export type WhereFilterCondition = z.infer<typeof zWhereFilterCondition>

// 新增：条件组
export const zWhereFilterGroup = z.object({
  logic: z.enum(['and', 'or']),
  conditions: z.array(z.lazy(() => zWhereFilterCondition.or(zWhereFilterGroup))),
})

export type WhereFilterGroup = z.infer<typeof zWhereFilterGroup>

// 新增：顶层 whereFilters
export const zWhereFilters = zWhereFilterGroup

export type WhereFilters = z.infer<typeof zWhereFilters>
```

- [ ] **Step 3: 运行 typecheck 验证**

```bash
cd packages/vbi && pnpm run typecheck
```

Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add packages/vbi/src/types/dsl/whereFilters/filters.ts
git commit -m "feat(vbi): add WhereFilterGroup types for nested where builder

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 2: 更新 vbi.ts 中的 whereFilters 类型

**Files:**

- Modify: `packages/vbi/src/types/dsl/vbi/vbi.ts`

- [ ] **Step 1: 读取现有文件**

```bash
cat packages/vbi/src/types/dsl/vbi/vbi.ts
```

- [ ] **Step 2: 更新导入和类型**

```typescript
import { z } from 'zod'
import { zVBIFilter, zWhereFilters } from '../whereFilters/filters'

// 旧类型（保留用于兼容）
// export const zVBIDSL = z.object({
//   ...
//   whereFilters: z.array(zVBIFilter).optional().default([]),
//   ...
// })

// 新类型
export const zVBIDSL = z.object({
  connectorId: z.string().optional(),
  chartType: z.string().optional(),
  dimensions: z.array(z.any()).optional().default([]),
  measures: z.array(z.any()).optional().default([]),
  havingFilters: z.array(zVBIFilter).optional().default([]),
  whereFilters: zWhereFilters.optional(), // 改为嵌套结构
  theme: z.enum(['light', 'dark']).optional().default('light'),
  locale: z.string().optional().default('en-US'),
  version: z.number().optional().default(1),
  limit: z.number().optional().default(1000),
})

export type VBIDSL = z.infer<typeof zVBIDSL>
```

- [ ] **Step 3: 运行 typecheck 验证**

```bash
cd packages/vbi && pnpm run typecheck
```

Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add packages/vbi/src/types/dsl/vbi/vbi.ts
git commit -m "feat(vbi): update whereFilters type to use WhereFilters

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Chunk 2: Builder 实现

### Task 3: 重构 WhereFilterGroupBuilder

**Files:**

- Modify: `packages/vbi/src/builder/sub-builders/whereFilters/where-builder.ts`

- [ ] **Step 1: 读取现有实现**

```bash
cat packages/vbi/src/builder/sub-builders/whereFilters/where-builder.ts
```

- [ ] **Step 2: 重写为 WhereFilterGroupBuilder**

```typescript
import * as Y from 'yjs'
import type { WhereFilterCondition, WhereFilterGroup } from 'src/types'
import { WhereFilterNodeBuilder } from './where-node-builder'

/**
 * @description Where 过滤条件组构建器，支持嵌套 AND/OR 分组
 */
export class WhereFilterGroupBuilder {
  private _logic: 'and' | 'or' = 'and'

  constructor(
    private yMap: Y.Map<any>,
    private conditionsArray: Y.Array<any>,
    private parent?: WhereFilterGroupBuilder,
  ) {
    // 初始化 logic 字段
    if (!this.yMap.get('logic')) {
      this.yMap.set('logic', 'and')
    }
    this._logic = this.yMap.get('logic')
  }

  /**
   * @description 添加一个过滤条件
   * @param field - 字段名
   * @param callback - 回调函数
   */
  add(field: string, callback: (node: WhereFilterNodeBuilder) => void): this {
    const filter: WhereFilterCondition = { field }

    const yMap = new Y.Map<any>()
    for (const [key, value] of Object.entries(filter)) {
      yMap.set(key, value)
    }

    this.conditionsArray.push([yMap])

    const node = new WhereFilterNodeBuilder(yMap)
    callback(node)

    return this
  }

  /**
   * @description 添加一个嵌套条件组
   * @param logic - 组逻辑类型 (and/or)
   * @param callback - 回调函数
   */
  addGroup(logic: 'and' | 'or', callback: (group: WhereFilterGroupBuilder) => void): this {
    const groupYMap = new Y.Map<any>()
    groupYMap.set('logic', logic)

    const conditionsArray = new Y.Array<any>()
    groupYMap.set('conditions', conditionsArray)

    this.conditionsArray.push([groupYMap])

    const groupBuilder = new WhereFilterGroupBuilder(groupYMap, conditionsArray, this)
    callback(groupBuilder)

    return this
  }

  /**
   * @description 递归查找指定字段的条件
   * @param field - 字段名
   */
  find(field: string): WhereFilterNodeBuilder | undefined {
    const conditions = this.conditionsArray.toArray()

    for (const condition of conditions) {
      // 检查是否是条件节点（有 field 属性）
      if (condition.get('field') === field) {
        return new WhereFilterNodeBuilder(condition)
      }

      // 检查是否是嵌套组
      const nestedConditions = condition.get('conditions')
      if (nestedConditions) {
        const nestedBuilder = new WhereFilterGroupBuilder(condition, nestedConditions, this)
        const found = nestedBuilder.find(field)
        if (found) {
          return found
        }
      }
    }

    return undefined
  }

  /**
   * @description 删除指定字段的条件
   * @param field - 字段名
   */
  remove(field: string): this {
    const conditions = this.conditionsArray.toArray()
    const index = conditions.findIndex((c: any) => c.get('field') === field)

    if (index !== -1) {
      this.conditionsArray.delete(index, 1)
    } else {
      // 递归删除嵌套组中的条件
      for (let i = 0; i < conditions.length; i++) {
        const condition = conditions[i]
        const nestedConditions = condition.get('conditions')
        if (nestedConditions) {
          const nestedBuilder = new WhereFilterGroupBuilder(condition, nestedConditions, this)
          nestedBuilder.remove(field)
        }
      }
    }

    return this
  }

  /**
   * @description 清空所有条件
   */
  clear(): this {
    this.conditionsArray.delete(0, this.conditionsArray.length)
    return this
  }

  /**
   * @description 导出为 JSON
   */
  toJson(): WhereFilterGroup {
    const conditions = this.conditionsArray.toArray()
    const result: WhereFilterGroup = {
      logic: this.yMap.get('logic') || 'and',
      conditions: conditions.map((condition: any) => {
        // 检查是否是嵌套组
        if (condition.get('conditions')) {
          const nestedBuilder = new WhereFilterGroupBuilder(condition, condition.get('conditions'), this)
          return nestedBuilder.toJson()
        }
        // 条件节点
        return {
          field: condition.get('field'),
          operator: condition.get('operator'),
          value: condition.get('value'),
        } as WhereFilterCondition
      }),
    }
    return result
  }

  /**
   * @description 设置逻辑类型
   * @param logic - 逻辑类型 (and/or)
   */
  setLogic(logic: 'and' | 'or'): this {
    this.yMap.set('logic', logic)
    this._logic = logic
    return this
  }

  /**
   * @description 获取当前逻辑类型
   */
  getLogic(): 'and' | 'or' {
    return this._logic
  }
}

/**
 * @description 创建 WhereFilterGroupBuilder 实例
 */
export function createWhereFilterBuilder(doc: Y.Doc, dsl: Y.Map<any>): WhereFilterGroupBuilder {
  if (!dsl.get('whereFilters')) {
    doc.transact(() => {
      const whereFiltersMap = new Y.Map<any>()
      whereFiltersMap.set('logic', 'and')
      whereFiltersMap.set('conditions', new Y.Array<any>())
      dsl.set('whereFilters', whereFiltersMap)
    })
  }

  const whereFilters = dsl.get('whereFilters') as Y.Map<any>
  const conditionsArray = whereFilters.get('conditions') as Y.Array<any>

  return new WhereFilterGroupBuilder(whereFilters, conditionsArray)
}
```

- [ ] **Step 3: 更新 index.ts 导出**

```bash
cat packages/vbi/src/builder/sub-builders/whereFilters/index.ts
```

修改为:

```typescript
export { WhereFilterGroupBuilder, createWhereFilterBuilder } from './where-builder'
export { WhereFilterNodeBuilder } from './where-node-builder'
```

- [ ] **Step 4: 运行 typecheck 验证**

```bash
cd packages/vbi && pnpm run typecheck
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add packages/vbi/src/builder/sub-builders/whereFilters/
git commit -m "feat(vbi): refactor WhereFiltersBuilder to support nested groups

- Add WhereFilterGroupBuilder with addGroup support
- Add recursive find and remove
- Add setLogic for changing group logic
- Update Yjs structure to nested Map/Array

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 4: 更新 sub-builders 导出

**Files:**

- Modify: `packages/vbi/src/builder/sub-builders/index.ts`

- [ ] **Step 1: 读取并更新导出**

```bash
cat packages/vbi/src/builder/sub-builders/index.ts
```

更新为:

```typescript
export { WhereFilterGroupBuilder, createWhereFilterBuilder } from './whereFilters'
export { WhereFilterNodeBuilder } from './whereFilters'
// 保留其他导出...
```

- [ ] **Step 2: Commit**

```bash
git add packages/vbi/src/builder/sub-builders/index.ts
git commit -m "chore(vbi): update sub-builders exports

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Chunk 3: VBI Builder 集成

### Task 5: 更新 VBIBuilder 中的 where 属性

**Files:**

- Modify: `packages/vbi/src/builder/vbi-builder.ts`

- [ ] **Step 1: 查找 where 属性定义**

```bash
grep -n "where" packages/vbi/src/builder/vbi-builder.ts | head -20
```

- [ ] **Step 2: 读取文件了解结构**

```bash
cat packages/vbi/src/builder/vbi-builder.ts
```

- [ ] **Step 3: 更新 where 类型**

将 `where: WhereFiltersBuilder` 改为 `where: WhereFilterGroupBuilder`

- [ ] **Step 4: 更新初始化代码**

```typescript
// 旧代码
this.where = new WhereFiltersBuilder(this.doc, this._dsl)

// 新代码
import { createWhereFilterBuilder } from './sub-builders/whereFilters'
this.where = createWhereFilterBuilder(this.doc, this._dsl)
```

- [ ] **Step 5: 运行 typecheck**

```bash
cd packages/vbi && pnpm run typecheck
```

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add packages/vbi/src/builder/vbi-builder.ts
git commit -m "feat(vbi): integrate WhereFilterGroupBuilder in VBIBuilder

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 6: 更新 VBIInterface 类型

**Files:**

- Modify: `packages/vbi/src/types/builder/VBIInterface.ts`

- [ ] **Step 1: 读取文件**

```bash
cat packages/vbi/src/types/builder/VBIInterface.ts
```

- [ ] **Step 2: 更新 where 类型**

```typescript
// 旧
whereFilters: WhereFiltersBuilder

// 新
where: WhereFilterGroupBuilder
```

- [ ] **Step 3: Commit**

```bash
git add packages/vbi/src/types/builder/VBIInterface.ts
git commit -m "types(vbi): update VBIInterface where type

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Chunk 4: Pipeline 适配

### Task 7: 更新 buildVQuery 中的 buildWhere

**Files:**

- Modify: `packages/vbi/src/pipeline/vqueryDSL/buildVQuery.ts`

- [ ] **Step 1: 读取现有 buildWhere 实现**

```bash
cat packages/vbi/src/pipeline/vqueryDSL/buildVQuery.ts
```

- [ ] **Step 2: 重写 buildWhere 函数适配新 DSL**

```typescript
const buildWhere: buildPipe = (queryDSL, context) => {
  const { vbiDSL } = context
  const whereFilters = vbiDSL.whereFilters

  if (!whereFilters || !whereFilters.conditions || whereFilters.conditions.length === 0) {
    return queryDSL
  }

  const result = { ...queryDSL }

  // 递归转换条件
  const convertConditions = (conditions: (WhereFilterCondition | WhereFilterGroup)[]): any[] => {
    return conditions.flatMap((condition: any) => {
      // 嵌套组
      if (condition.conditions) {
        return {
          op: condition.logic || 'and',
          conditions: convertConditions(condition.conditions),
        }
      }

      // 单个条件
      const filter = condition as WhereFilterCondition

      if (
        filter.operator === 'between' &&
        filter.value &&
        typeof filter.value === 'object' &&
        !Array.isArray(filter.value)
      ) {
        const conditions = []
        if (filter.value.min !== undefined && filter.value.min !== null && filter.value.min !== '') {
          conditions.push({
            field: filter.field,
            op: filter.value.leftOp === '<' ? '>' : '>=',
            value: filter.value.min,
          })
        }
        if (filter.value.max !== undefined && filter.value.max !== null && filter.value.max !== '') {
          conditions.push({
            field: filter.field,
            op: filter.value.rightOp === '<' ? '<' : '<=',
            value: filter.value.max,
          })
        }
        return conditions
      }

      let mappedOp = filter.operator ?? '='
      if (Array.isArray(filter.value)) {
        if (mappedOp === '=') mappedOp = 'in'
        if (mappedOp === '!=') mappedOp = 'not in'
      }

      return [
        {
          field: filter.field,
          op: mappedOp,
          value: filter.value,
        },
      ]
    })
  }

  result.where = {
    op: whereFilters.logic || 'and',
    conditions: convertConditions(whereFilters.conditions),
  }

  return result as VQueryDSL
}
```

- [ ] **Step 3: 添加类型导入**

```typescript
import type { WhereFilterCondition, WhereFilterGroup } from 'src/types'
```

- [ ] **Step 4: 运行 typecheck**

```bash
cd packages/vbi && pnpm run typecheck
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add packages/vbi/src/pipeline/vqueryDSL/buildVQuery.ts
git commit -m "feat(vbi): update buildWhere to support nested WhereFilterGroup

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Chunk 5: 验证

### Task 8: 运行全量验证

- [ ] **Step 1: 运行 typecheck**

```bash
pnpm run typecheck
```

Expected: PASS

- [ ] **Step 2: 运行 lint**

```bash
pnpm run lint
```

Expected: PASS

- [ ] **Step 3: 运行 vbi 测试**

```bash
pnpm --filter=@visactor/vbi run test
```

Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: run full verification

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## 执行总结

完成所有任务后，whereFilters 将支持：

1. **嵌套分组** — 使用 `addGroup('or', g => {...})` 创建嵌套 AND/OR 组
2. **递归查找** — `find(field)` 自动递归查找所有嵌套层级
3. **递归删除** — `remove(field)` 自动递归删除所有嵌套层级
4. **新 DSL** — `{ logic: 'and', conditions: [...] }` 嵌套结构
