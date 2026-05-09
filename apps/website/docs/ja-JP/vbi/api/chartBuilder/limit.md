# LimitBuilder

データ件数上限 Builder。現在の limit の設定と取得に使用します。

## プロパティ

## メソッド

### constructor

コンストラクタ

**定義**:

```typescript
constructor(_doc: Y.Doc, dsl: Y.Map<any>)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `_doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### observe

limit の変更を監視し、監視を解除する関数を返します

**定義**:

```typescript
observe(callback: ObserveCallback): () => void
```

**戻り値**: `() => void`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `callback` | ObserveCallback | - コールバック関数 |

### setLimit

limit を設定します

**定義**:

```typescript
setLimit(limit: number)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `limit` | number | - データ件数上限 |

### getLimit

現在の limit を取得します

**定義**:

```typescript
getLimit(): number | undefined
```

**戻り値**: `number \| undefined`

### toJSON

JSON としてエクスポートします

**定義**:

```typescript
toJSON(): number | undefined
```

**戻り値**: `number \| undefined`
