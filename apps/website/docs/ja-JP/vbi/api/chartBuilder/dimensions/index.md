# DimensionsBuilder

ディメンション Builder。ディメンション設定の追加、変更、削除に使用します。ディメンションは、時間、地域、商品カテゴリのようなデータの分類フィールドです。

## プロパティ

## メソッド

### constructor

**定義**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### add

ディメンションを 1 つ追加します

**定義**:

```typescript
add(field: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**戻り値**: `DimensionsBuilder`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `field` | string | - フィールド名 |
| `callback` | (node: DimensionNodeBuilder) => void | - コールバック関数 |

### remove

指定した ID のディメンションを削除します

**定義**:

```typescript
remove(id: string): DimensionsBuilder
```

**戻り値**: `DimensionsBuilder`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `id` | string | - ディメンション ID |

### update

指定したディメンション ID の設定を更新します

**定義**:

```typescript
update(id: string, callback: (node: DimensionNodeBuilder) => void): DimensionsBuilder
```

**戻り値**: `DimensionsBuilder`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `id` | string | - ディメンション ID |
| `callback` | (node: DimensionNodeBuilder) => void | - コールバック関数 |

### find

コールバック条件に一致する最初のディメンションを検索します。挙動は Array.find と同じです。

**定義**:

```typescript
find(predicate: (node: DimensionNodeBuilder, index: number) => boolean): DimensionNodeBuilder | undefined
```

**戻り値**: `DimensionNodeBuilder \| undefined`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `predicate` | (node: DimensionNodeBuilder, index: number) => boolean | - 検索条件 |

### findAll

すべてのディメンションを取得します

**定義**:

```typescript
findAll(): DimensionNodeBuilder[]
```

**戻り値**: `DimensionNodeBuilder[]`

### toJSON

すべてのディメンションを JSON 配列としてエクスポートします

**定義**:

```typescript
toJSON(): VBIDimension[]
```

**戻り値**: `VBIDimension[]`

### observe

ディメンションの変更を監視し、監視を解除する関数を返します

**定義**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**戻り値**: `() => void`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - コールバック関数 |

### static isDimensionNode

**定義**:

```typescript
static isDimensionNode(node: VBIDimensionTree[0]): node is VBIDimension
```

**戻り値**: `node is VBIDimension`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `node` | `VBIDimensionTree[0]` | - |

### static isDimensionGroup

**定義**:

```typescript
static isDimensionGroup(node: VBIDimensionTree[0]): node is VBIDimensionGroup
```

**戻り値**: `node is VBIDimensionGroup`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `node` | `VBIDimensionTree[0]` | - |
