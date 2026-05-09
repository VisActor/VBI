# DimensionNodeBuilder

ディメンションノード Builder。単一のディメンションを設定するために使用します。

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

### getEncoding

チャートエンコーディング位置を取得します

**定義**:

```typescript
getEncoding(): VBIDimension['encoding'] | undefined
```

**戻り値**: `VBIDimension['encoding'] \| undefined`

### getSort

ソート設定を取得します

**定義**:

```typescript
getSort(): VBISort | undefined
```

**戻り値**: `VBISort \| undefined`

### setAlias

表示名を設定します

**定義**:

```typescript
setAlias(alias: string): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `alias` | string | - 表示名 |

### setEncoding

チャートエンコーディング位置を設定します

**定義**:

```typescript
setEncoding(encoding: NonNullable<VBIDimension['encoding']>): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `encoding` | `NonNullable<VBIDimension['encoding']>` | - ディメンションエンコーディング位置 |

### setSort

ソート設定を設定します

**定義**:

```typescript
setSort(sort: VBISort): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `sort` | `VBISort` | - ソート設定 |

### setAggregate

日付集約関数を設定します

**定義**:

```typescript
setAggregate(aggregate: NonNullable<VBIDimension['aggregate']>): this
```

**戻り値**: `this`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `aggregate` | `NonNullable<VBIDimension['aggregate']>` | - 日付集約設定 |

### clearAggregate

日付集約関数をクリアします

**定義**:

```typescript
clearAggregate(): this
```

**戻り値**: `this`

### clearSort

ソート設定をクリアします

**定義**:

```typescript
clearSort(): this
```

**戻り値**: `this`

### toJSON

JSON としてエクスポートします

**定義**:

```typescript
toJSON(): VBIDimension
```

**戻り値**: `VBIDimension`
