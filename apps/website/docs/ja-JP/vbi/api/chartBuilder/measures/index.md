# MeasuresBuilder

メジャー Builder。メジャー設定の追加、変更、削除に使用します。メジャーは、売上、利益、数量のようなデータの数値フィールドです。

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

メジャーを 1 つ追加します

**定義**:

```typescript
add(field: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**戻り値**: `MeasuresBuilder`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `field` | string | - フィールド名 |
| `callback` | (node: MeasureNodeBuilder) => void | - コールバック関数 |

### remove

指定した ID のメジャーを削除します

**定義**:

```typescript
remove(id: string): MeasuresBuilder
```

**戻り値**: `MeasuresBuilder`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `id` | string | - メジャー ID |

### update

メジャー設定を更新します

**定義**:

```typescript
update(id: string, callback: (node: MeasureNodeBuilder) => void): MeasuresBuilder
```

**戻り値**: `MeasuresBuilder`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `id` | string | - メジャー ID |
| `callback` | (node: MeasureNodeBuilder) => void | - コールバック関数 |

### find

コールバック条件に一致する最初のメジャーを検索します。挙動は Array.find と同じです。

**定義**:

```typescript
find(predicate: (node: MeasureNodeBuilder, index: number) => boolean): MeasureNodeBuilder | undefined
```

**戻り値**: `MeasureNodeBuilder \| undefined`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `predicate` | (node: MeasureNodeBuilder, index: number) => boolean | - 検索条件 |

### findAll

すべてのメジャーを取得します

**定義**:

```typescript
findAll(): MeasureNodeBuilder[]
```

**戻り値**: `MeasureNodeBuilder[]`

### toJSON

すべてのメジャーを JSON 配列としてエクスポートします

**定義**:

```typescript
toJSON(): VBIMeasure[]
```

**戻り値**: `VBIMeasure[]`

### observe

メジャーの変更を監視します

**定義**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**戻り値**: `() => void`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - コールバック関数 |

### static isMeasureNode

**定義**:

```typescript
static isMeasureNode(node: VBIMeasureTree[0]): node is VBIMeasure
```

**戻り値**: `node is VBIMeasure`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `node` | `VBIMeasureTree[0]` | - |

### static isMeasureGroup

**定義**:

```typescript
static isMeasureGroup(node: VBIMeasureTree[0]): node is VBIMeasureGroup
```

**戻り値**: `node is VBIMeasureGroup`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `node` | `VBIMeasureTree[0]` | - |
