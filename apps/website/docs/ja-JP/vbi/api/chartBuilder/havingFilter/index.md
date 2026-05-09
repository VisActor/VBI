# HavingFilterBuilder

Having フィルター Builder。グループ化後のフィルター条件の追加、変更、削除に使用します。Having フィルターはデータ集約後に有効になり、グループ化結果を絞り込むために使用します。

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

### getConditions

**定義**:

```typescript
getConditions(): Y.Array<any>
```

**戻り値**: `Y.Array<any>`

### add

Having フィルター条件を 1 つ追加します

**定義**:

```typescript
add(field: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**戻り値**: `HavingFilterBuilder`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `field` | string | - フィールド名 |
| `callback` | (node: HavingFilterNodeBuilder) => void | - コールバック関数 |

### addGroup

Having グループを 1 つ追加します

**定義**:

```typescript
addGroup(op: 'and' | 'or', callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**戻り値**: `HavingFilterBuilder`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `op` | 'and' \| 'or' | - 論理演算子 |
| `callback` | (group: HavingGroupBuilder) => void | - コールバック関数 |

### update

指定した ID のフィルター条件を更新します

**定義**:

```typescript
update(id: string, callback: (node: HavingFilterNodeBuilder) => void): HavingFilterBuilder
```

**戻り値**: `HavingFilterBuilder`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `id` | string | - フィルター条件 ID |
| `callback` | (node: HavingFilterNodeBuilder) => void | - コールバック関数 |

### updateGroup

指定した ID のグループを更新します

**定義**:

```typescript
updateGroup(id: string, callback: (group: HavingGroupBuilder) => void): HavingFilterBuilder
```

**戻り値**: `HavingFilterBuilder`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `id` | string | - グループ ID |
| `callback` | (group: HavingGroupBuilder) => void | - コールバック関数 |

### remove

指定した ID の条件、または指定したインデックスの項目を削除します

**定義**:

```typescript
remove(idOrIndex: string | number): HavingFilterBuilder
```

**戻り値**: `HavingFilterBuilder`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `idOrIndex` | string \| number | - ID またはインデックス |

### find

コールバック条件に一致する最初の条件（フィルターまたはグループ）を検索します。挙動は Array.find と同じです。

**定義**:

```typescript
find(predicate: (entry: HavingFilterNodeBuilder | HavingGroupBuilder, index: number) => boolean): HavingFilterNodeBuilder | HavingGroupBuilder | undefined
```

**戻り値**: `HavingFilterNodeBuilder \| HavingGroupBuilder \| undefined`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `predicate` | (entry: HavingFilterNodeBuilder \| HavingGroupBuilder, index: number) => boolean | - 検索条件 |

### clear

すべての Having フィルター条件をクリアします

**定義**:

```typescript
clear()
```

### toJSON

完全な Having フィルター設定をエクスポートします

**定義**:

```typescript
toJSON(): VBIHavingGroup
```

**戻り値**: `VBIHavingGroup`

### observe

フィルター条件の変更を監視し、監視を解除する関数を返します

**定義**:

```typescript
observe(callback: ObserveDeepCallback): () => void
```

**戻り値**: `() => void`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `callback` | ObserveDeepCallback | - コールバック関数 |

### static isGroup

グループノードかどうかを判定します

**定義**:

```typescript
static isGroup(yMap: Y.Map<any>): boolean
```

**戻り値**: `boolean`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `yMap` | `Y.Map<any>` | - |

### static isNode

リーフノードかどうかを判定します

**定義**:

```typescript
static isNode(yMap: Y.Map<any>): boolean
```

**戻り値**: `boolean`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `yMap` | `Y.Map<any>` | - |
