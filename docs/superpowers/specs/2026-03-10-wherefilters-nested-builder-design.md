# WhereFilters Nested Builder 设计文档

## 概述

重构 whereFilters 构建器，支持嵌套分组（AND/OR）条件，DSL 从扁平数组升级为嵌套对象结构。

## DSL 类型定义

### 接口

```typescript
// 单个条件节点
interface WhereFilterCondition {
  field: string
  operator?: string
  value?: unknown
}

// 条件组（AND/OR）
interface WhereFilterGroup {
  logic: 'and' | 'or'
  conditions: (WhereFilterCondition | WhereFilterGroup)[]
}

// 顶层 whereFilters
type WhereFilters = WhereFilterGroup
```

### JSON 示例

```json
// 简单条件（AND）
{
  "logic": "and",
  "conditions": [
    { "field": "age", "operator": ">", "value": 18 },
    { "field": "name", "operator": "=", "value": "test" }
  ]
}

// 嵌套条件（AND + OR 混合）
{
  "logic": "and",
  "conditions": [
    { "field": "age", "operator": ">", "value": 18 },
    {
      "logic": "or",
      "conditions": [
        { "field": "role", "operator": "=", "value": "admin" },
        { "field": "role", "operator": "=", "value": "super" }
      ]
    }
  ]
}
```

## Builder 类设计

### WhereFilterGroupBuilder

条件组 Builder，顶层和嵌套共用同一个类。

```typescript
class WhereFilterGroupBuilder {
  constructor(
    private yMap: Y.Map<any>,
    private conditionsArray: Y.Array<any>,
    private parent?: WhereFilterGroupBuilder,
  ) {}

  // 添加条件
  add(field: string, fn: (node: WhereFilterNodeBuilder) => void): this

  // 添加嵌套组
  addGroup(logic: 'and' | 'or', fn: (group: WhereFilterGroupBuilder) => void): this

  // 递归查找条件
  find(field: string): WhereFilterNodeBuilder | undefined

  // 删除条件
  remove(field: string): this

  // 清空所有条件
  clear(): this

  // 导出 JSON
  toJson(): WhereFilterGroup
}
```

### WhereFilterNodeBuilder

条件节点 Builder，配置单个过滤条件。

```typescript
class WhereFilterNodeBuilder {
  constructor(private yMap: Y.Map<any>) {}

  setOperator(operator: string): this
  setValue(value: unknown): this
  toJson(): WhereFilterCondition
}
```

## Yjs 数据结构

```typescript
// whereFilters 存储为 Y.Map
{
  "whereFilters": Y.Map {
    "logic": "and",                    // Y.Map<string>
    "conditions": Y.Array [           // Y.Array<Y.Map>
      Y.Map { field, operator, value },  // 条件
      Y.Map {                         // 嵌套组
        "logic": "or",
        "conditions": Y.Array [...]
      }
    ]
  }
}
```

## 使用示例

### 简单条件

```typescript
builder.where.add('age', (n) => n.setOperator('>').setValue(18))
```

### 嵌套 OR 组

```typescript
builder.where
  .add('age', (n) => n.setOperator('>').setValue(18))
  .addGroup('or', (g) =>
    g.add('role', (n) => n.setOperator('=').setValue('admin')).add('role', (n) => n.setOperator('=').setValue('super')),
  )
```

### 递归查找和删除

```typescript
builder.where.find('age')
builder.where.remove('age')
builder.where.clear()
```

## 需修改的文件

| 文件                                                      | 变更                                                 |
| --------------------------------------------------------- | ---------------------------------------------------- |
| `types/dsl/whereFilters/filters.ts`                       | 新增 `WhereFilterGroup`, `WhereFilterCondition` 类型 |
| `types/dsl/vbi/vbi.ts`                                    | 更新 `whereFilters` 类型定义                         |
| `builder/sub-builders/whereFilters/where-builder.ts`      | 重构为 `WhereFilterGroupBuilder`                     |
| `builder/sub-builders/whereFilters/where-node-builder.ts` | 保持不变                                             |
| `builder/sub-builders/whereFilters/index.ts`              | 导出新类                                             |
| `builder/sub-builders/index.ts`                           | 更新导出                                             |
| `builder/vbi-builder.ts`                                  | 更新 `where` 属性类型                                |
| `pipeline/vqueryDSL/buildVQuery.ts`                       | 更新 `buildWhere` 适配新 DSL                         |
| `types/builder/VBIInterface.ts`                           | 更新 `where` 类型                                    |

## 破坏性变更

DSL 结构从扁平数组变为嵌套对象，现有数据需要手动迁移：

- 旧：`{ field, operator, value }[]`
- 新：`{ logic, conditions }`，conditions 包含条件和组的混合数组
