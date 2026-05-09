# HavingFilterNodeBuilder

Having フィルターノード Builder。単一の Having フィルター条件を設定するために使用します。

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

### getOperator

フィルター演算子を取得します

**定義**:

```typescript
getOperator(): string | undefined
```

**戻り値**: `string \| undefined`

### getAggregate

集約設定を取得します

**定義**:

```typescript
getAggregate(): VBIHavingAggregate | undefined
```

**戻り値**: `VBIHavingAggregate \| undefined`

### setValue

フィルター条件の値を設定します

**定義**:

```typescript
setValue(value: unknown): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `value` | unknown | - フィルター値 |

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

### setAggregate

集約設定を設定します

**定義**:

```typescript
setAggregate(aggregate: VBIHavingAggregate): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `aggregate` | `VBIHavingAggregate` | - 集約設定 |

### toJSON

JSON としてエクスポートします

**定義**:

```typescript
toJSON(): VBIHavingFilter
```

**戻り値**: `VBIHavingFilter`
