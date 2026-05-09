# ChartTypeBuilder

チャートタイプ Builder。チャートタイプの切り替えと取得に使用します。テーブル、棒グラフ、折れ線グラフ、円グラフ、散布図など、複数のチャートタイプに対応しています。

## プロパティ

## メソッド

### constructor

コンストラクタ

**定義**:

```typescript
constructor(doc: Y.Doc, dsl: Y.Map<any>)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `doc` | `Y.Doc` | - |
| `dsl` | `Y.Map<any>` | - |

### observe

チャートタイプの変更を監視します

**定義**:

```typescript
observe(callback: ObserveCallback): () => void
```

**戻り値**: `() => void`

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `callback` | ObserveCallback | - コールバック関数 |

### changeChartType

チャートタイプを設定します

**定義**:

```typescript
changeChartType(chartType: string)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `chartType` | string | - チャートタイプ |

### getChartType

現在のチャートタイプを取得します

**定義**:

```typescript
getChartType(): string
```

**戻り値**: `string`

### getSupportedDimensionEncodings

現在のチャートタイプが対応しているディメンションエンコーディングを取得します

**定義**:

```typescript
getSupportedDimensionEncodings()
```

### getRecommendedDimensionEncodings

現在のチャートタイプに基づき、ディメンションの順序に沿って推奨ディメンションエンコーディングを返します

**定義**:

```typescript
getRecommendedDimensionEncodings(dimensionCount: number)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `dimensionCount` | number | - ディメンション数。デフォルトでは現在の DSL 内のディメンション数を使用します |

### getSupportedMeasureEncodings

現在のチャートタイプが対応しているメジャーエンコーディングを取得します

**定義**:

```typescript
getSupportedMeasureEncodings()
```

### getRecommendedMeasureEncodings

現在のチャートタイプに基づき、メジャーの順序に沿って推奨メジャーエンコーディングを返します

**定義**:

```typescript
getRecommendedMeasureEncodings(measureCount: number)
```

**パラメータ**:

| パラメータ | 型 | 説明 |
| --- | --- | --- |
| `measureCount` | number | - メジャー数。デフォルトでは現在の DSL 内のメジャー数を使用します |

### toJSON

JSON としてエクスポートします

**定義**:

```typescript
toJSON(): string
```

**戻り値**: `string`

### getAvailableChartTypes

対応しているすべてのチャートタイプを取得します

**定義**:

```typescript
getAvailableChartTypes(): string[]
```

**戻り値**: `string[]`
