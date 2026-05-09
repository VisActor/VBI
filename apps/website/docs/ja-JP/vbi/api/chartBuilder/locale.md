# LocaleBuilder

ロケール Builder。現在のロケールの設定と取得に使用します。

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

ロケールの変更を監視し、監視を解除する関数を返します

**定義**:

```typescript
observe(callback: ObserveCallback): () => void
```

**戻り値**: `() => void`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `callback` | ObserveCallback | - コールバック関数 |

### setLocale

ロケールを設定します

**定義**:

```typescript
setLocale(locale: string)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `locale` | string | - ロケール名 |

### getLocale

現在のロケールを取得します

**定義**:

```typescript
getLocale(): string
```

**戻り値**: `string`

### toJSON

JSON としてエクスポートします

**定義**:

```typescript
toJSON(): string
```

**戻り値**: `string`
