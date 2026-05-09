# WhereFilterNodeBuilder

Where フィルターノード Builder。単一の Where フィルター条件を設定するために使用します。

## プロパティ

## メソッド

### constructor

**定義**:

```typescript
constructor(yMap: Y.Map<any>)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `yMap` | `Y.Map<any>` | - |

### getId

ノード ID を取得します

**定義**:

```typescript
getId(): string
```

**戻り値**: `string`

### getField

フィールド名を取得します

**定義**:

```typescript
getField(): string
```

**戻り値**: `string`

### setField

フィールド名を設定します

**定義**:

```typescript
setField(field: string): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `field` | string | - フィールド名 |

### getOperator

フィルター演算子を取得します

**定義**:

```typescript
getOperator(): string | undefined
```

**戻り値**: `string \| undefined`

### setOperator

フィルター演算子を設定します

**定義**:

```typescript
setOperator(operator: string): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `operator` | string | - 演算子 |

### setValue

フィルター値を設定します

**定義**:

```typescript
setValue(value: unknown): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `value` | unknown | - フィルター値 |

### setDate

日付フィルター条件を設定します

**定義**:

```typescript
setDate(predicate: VBIWhereDatePredicate): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `predicate` | `VBIWhereDatePredicate` | - 日付述語 |

### getDate

日付フィルター条件を取得します。日付フィルターでない場合は undefined を返します。

**定義**:

```typescript
getDate(): VBIWhereDatePredicate | undefined
```

**戻り値**: `VBIWhereDatePredicate \| undefined`

### toJSON

JSON としてエクスポートします

**定義**:

```typescript
toJSON(): VBIWhereFilter
```

**戻り値**: `VBIWhereFilter`
